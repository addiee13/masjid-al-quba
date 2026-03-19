import fs from "node:fs/promises";
import path from "node:path";

const BASE_URL = process.env.AUDIT_BASE_URL || "http://127.0.0.1:3000";
const OUTPUT_DIR = path.resolve("audit-results");
const ROUTES = [
  "/",
  "/about",
  "/services",
  "/services/ask-imam",
  "/services/religious-counselling",
  "/services/juma-dua-request",
  "/education",
  "/events",
  "/get-involved",
  "/contact",
  "/donate",
];

const findings = [];
const pageSummaries = [];

function pushFinding(severity, route, category, detail) {
  findings.push({ severity, route, category, detail });
}

function normalizeText(value) {
  return value.replace(/\s+/g, " ").trim();
}

async function collectInteractiveIssues(page, route) {
  const issues = await page.evaluate(() => {
    const toSelector = (element) => {
      if (element.id) {
        return `#${element.id}`;
      }
      if (element.getAttribute("data-testid")) {
        return `[data-testid="${element.getAttribute("data-testid")}"]`;
      }
      const text = (element.textContent || "").trim().replace(/\s+/g, " ").slice(0, 60);
      return `${element.tagName.toLowerCase()}${text ? `("${text}")` : ""}`;
    };

    const invalidButtons = Array.from(document.querySelectorAll("button"))
      .filter((button) => !button.textContent?.trim() && !button.getAttribute("aria-label"))
      .map((button) => ({
        type: "button-name",
        target: toSelector(button),
      }));

    const orphanInputs = Array.from(
      document.querySelectorAll("input:not([type='hidden']), textarea, select")
    )
      .filter((input) => {
        const element = input;
        const hasLabel =
          Boolean(element.getAttribute("aria-label")) ||
          Boolean(element.getAttribute("aria-labelledby")) ||
          (element.id && document.querySelector(`label[for="${element.id}"]`));
        return !hasLabel;
      })
      .map((input) => ({
        type: "input-label",
        target: toSelector(input),
      }));

    const headingSkips = [];
    const headings = Array.from(document.querySelectorAll("h1, h2, h3, h4, h5, h6"));
    let previousLevel = 0;
    for (const heading of headings) {
      const level = Number(heading.tagName.slice(1));
      if (previousLevel && level > previousLevel + 1) {
        headingSkips.push({
          type: "heading-order",
          target: toSelector(heading),
          from: previousLevel,
          to: level,
        });
      }
      previousLevel = level;
    }

    const missingMain = document.querySelectorAll("main").length !== 1;
    const missingLang = !document.documentElement.lang;
    const missingNavName = Array.from(document.querySelectorAll("nav")).some(
      (nav) => !nav.getAttribute("aria-label") && !nav.getAttribute("aria-labelledby")
    );

    return {
      invalidButtons,
      orphanInputs,
      headingSkips,
      missingMain,
      missingLang,
      missingNavName,
      title: document.title,
    };
  });

  for (const issue of issues.invalidButtons) {
    pushFinding("high", route, "accessibility", `Unnamed button at ${issue.target}`);
  }

  for (const issue of issues.orphanInputs) {
    pushFinding("high", route, "accessibility", `Form control missing accessible label at ${issue.target}`);
  }

  for (const issue of issues.headingSkips) {
    pushFinding(
      "medium",
      route,
      "content-structure",
      `Heading order jumps from h${issue.from} to h${issue.to} near ${issue.target}`
    );
  }

  if (issues.missingMain) {
    pushFinding("medium", route, "accessibility", "Page should expose exactly one <main> landmark");
  }

  if (issues.missingLang) {
    pushFinding("medium", route, "accessibility", "Document language is missing");
  }

  if (issues.missingNavName) {
    pushFinding("low", route, "accessibility", "Navigation landmark is missing an accessible name");
  }

  return issues.title;
}

async function collectBrokenLinks(page, route) {
  const anchors = await page.locator("a[href]").evaluateAll((elements) =>
    elements
      .map((element) => ({
        href: element.getAttribute("href") || "",
        text: (element.textContent || "").trim(),
      }))
      .filter((item) => item.href.startsWith("/"))
  );

  for (const anchor of anchors) {
    const url = `${BASE_URL}${anchor.href}`;
    const response = await page.request.get(url, { failOnStatusCode: false });
    if (response.status() >= 400) {
      pushFinding(
        "high",
        route,
        "broken-flow",
        `Link "${normalizeText(anchor.text) || anchor.href}" points to ${anchor.href} and returns ${response.status()}`
      );
    }
  }
}

async function collectConsoleIssues(consoleEntries, route) {
  for (const entry of consoleEntries) {
    const text = normalizeText(entry.text);
    if (!text) {
      continue;
    }
    pushFinding("medium", route, "runtime", `${entry.type}: ${text}`);
  }
}

async function collectTapTargetIssues(page, route) {
  const issues = await page.evaluate(() => {
    const selectors = ["a", "button", "input[type='checkbox']", "input[type='radio']"];
    const nodes = Array.from(document.querySelectorAll(selectors.join(",")));
    return nodes
      .map((node) => {
        const rect = node.getBoundingClientRect();
        return {
          text: (node.textContent || node.getAttribute("aria-label") || node.getAttribute("name") || "").trim(),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          hidden: rect.width === 0 || rect.height === 0,
        };
      })
      .filter((item) => !item.hidden && (item.width < 32 || item.height < 32))
      .slice(0, 12);
  });

  for (const issue of issues) {
    pushFinding(
      "low",
      route,
      "mobile-usability",
      `Interactive target "${normalizeText(issue.text) || "unlabeled control"}" is ${issue.width}x${issue.height}px`
    );
  }
}

async function inspectPage(browser, route) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 960 } });
  const mobilePage = await browser.newPage({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  const consoleEntries = [];
  page.on("console", (message) => {
    if (message.type() === "error" || message.type() === "warning") {
      consoleEntries.push({ type: message.type(), text: message.text() });
    }
  });
  page.on("pageerror", (error) => {
    consoleEntries.push({ type: "pageerror", text: error.message });
  });

  const url = `${BASE_URL}${route}`;
  const response = await page.goto(url, { waitUntil: "networkidle" });
  await mobilePage.goto(url, { waitUntil: "domcontentloaded" });

  if (!response || response.status() >= 400) {
    pushFinding("high", route, "routing", `Page load failed with status ${response ? response.status() : "no-response"}`);
  }

  const title = await collectInteractiveIssues(page, route);
  await collectBrokenLinks(page, route);
  await collectTapTargetIssues(mobilePage, route);
  await collectConsoleIssues(consoleEntries, route);

  const primaryActions = await page.locator("a, button").evaluateAll((elements) =>
    elements
      .map((element) => (element.textContent || element.getAttribute("aria-label") || "").trim())
      .filter(Boolean)
      .slice(0, 20)
  );

  pageSummaries.push({
    route,
    title,
    status: response?.status() ?? null,
    primaryActions,
  });

  await page.screenshot({
    path: path.join(OUTPUT_DIR, `${route === "/" ? "home" : route.slice(1).replaceAll("/", "_")}.png`),
    fullPage: true,
  });

  await page.close();
  await mobilePage.close();
}

async function main() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  let playwright;
  try {
    playwright = await import("playwright");
  } catch (error) {
    console.error("Playwright is not installed. Run `npm install -D playwright` first.");
    process.exit(1);
  }

  const browser = await playwright.chromium.launch({ headless: true });

  try {
    for (const route of ROUTES) {
      await inspectPage(browser, route);
    }
  } finally {
    await browser.close();
  }

  const report = {
    baseUrl: BASE_URL,
    generatedAt: new Date().toISOString(),
    pageSummaries,
    findings,
  };

  await fs.writeFile(path.join(OUTPUT_DIR, "ui-audit.json"), JSON.stringify(report, null, 2));

  const grouped = findings.reduce((acc, finding) => {
    acc[finding.severity] = (acc[finding.severity] || 0) + 1;
    return acc;
  }, {});

  console.log(`Audited ${ROUTES.length} routes at ${BASE_URL}`);
  console.log(`Findings: high=${grouped.high || 0}, medium=${grouped.medium || 0}, low=${grouped.low || 0}`);
  for (const finding of findings) {
    console.log(`[${finding.severity}] ${finding.route} ${finding.category}: ${finding.detail}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
