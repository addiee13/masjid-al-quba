"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ChevronRight, Heart } from "lucide-react";

// Types for navigation structure
type NavLink = {
  label: string;
  href: string;
};

type Category = {
  name: string;
  links: NavLink[];
};

type NavItem = {
  label: string;
  href: string;
  type: "link" | "dropdown" | "megamenu";
  dropdown?: NavLink[];
  categories?: Category[];
};

// Navigation data structure - Strict compliance with sitemap
const navLinks: NavItem[] = [
  {
    label: "Home",
    href: "/",
    type: "link",
  },
  {
    label: "Masjid Info",
    href: "/about",
    type: "dropdown",
    dropdown: [
      { label: "About Us", href: "/about" },
      { label: "Board Members", href: "/masjid-info/board-members" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    type: "megamenu",
    categories: [
      {
        name: "Community Services",
        links: [
          { label: "Zakat", href: "/services/zakat" },
          { label: "Sadaqah", href: "/services/sadaqah" },
          { label: "Outreach/Dawa", href: "/services/outreach-dawa" },
        ],
      },
      {
        name: "Support Services",
        links: [
          { label: "Juma Dua Request", href: "/services/juma-dua-request" },
          { label: "Ask Imam", href: "/services/ask-imam" },
          { label: "Religious Counselling", href: "/services/religious-counselling" },
        ],
      },
    ],
  },
  {
    label: "Ramadan",
    href: "/ramadan",
    type: "link",
  },
  {
    label: "Education",
    href: "/education",
    type: "dropdown",
    dropdown: [
      { label: "Quran & Islamic School", href: "/education/quran-school" },
      { label: "Sunday School", href: "/education/sunday-school" },
      { label: "Weekly Tafsir", href: "/education/weekly-tafsir" },
    ],
  },
  {
    label: "Future Projects",
    href: "/future-projects",
    type: "link",
  },
  {
    label: "Events",
    href: "/events",
    type: "dropdown",
    dropdown: [
      { label: "Calendar", href: "/events/calendar" },
      { label: "Weekly Tafsir", href: "/events/weekly-tafsir" },
      { label: "Monthly Halaqa", href: "/events/monthly-halaqa" },
    ],
  },
  {
    label: "Get Involved",
    href: "/get-involved",
    type: "dropdown",
    dropdown: [
      { label: "Volunteer", href: "/get-involved/volunteer" },
      { label: "Donate", href: "/donate" },
    ],
  },
  {
    label: "Contact Us",
    href: "/contact",
    type: "link",
  },
];

const desktopPrimaryLabels = new Set([
  "Home",
  "Masjid Info",
  "Services",
  "Ramadan",
  "Future Projects",
  "Events",
  "Contact Us",
]);

const desktopPrimaryLinks = navLinks.filter((item) =>
  desktopPrimaryLabels.has(item.label)
);

const desktopSecondaryLinks = navLinks.filter(
  (item) => !desktopPrimaryLabels.has(item.label)
);

// Simple dropdown component for desktop
function DesktopDropdown({ item }: { item: NavItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="font-heading font-semibold text-primary-dark hover:text-primary-green transition-all duration-300 px-2 xl:px-3 h-10 flex items-center gap-1 text-base xl:text-lg relative group">
        <Link href={item.href} className="relative inline-flex items-center h-full">
          {item.label}
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-green group-hover:w-full transition-all duration-300" />
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center h-full px-1"
          aria-label={`Toggle ${item.label} menu`}
        >
          <ChevronDown
            className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {isOpen && item.dropdown && (
        <div className="absolute left-0 top-full z-[90] mt-2 min-w-[248px] rounded-2xl border border-black/6 bg-white py-3 shadow-[0_18px_40px_rgba(17,24,39,0.14)] animate-in fade-in slide-in-from-top-2 duration-200">
          {item.dropdown.map((subItem) => (
            <Link
              key={subItem.href}
              href={subItem.href}
              className="relative mx-2 block rounded-xl px-4 py-3 font-body text-base font-medium text-primary-dark transition-all duration-200 hover:bg-bg-beige/55 hover:text-primary-green focus-visible:bg-bg-beige/65 focus-visible:text-primary-green group"
            >
              <span className="relative z-10">{subItem.label}</span>
              <span className="absolute left-0 top-1/2 h-0 w-1 -translate-y-1/2 rounded-r bg-primary-green transition-all duration-200 group-hover:h-6 group-focus-visible:h-6" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

// Mega menu component for desktop
function DesktopMegaMenu({ item }: { item: NavItem }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => {
        setIsOpen(false);
        setActiveCategory(0);
      }}
    >
      <div className="font-heading font-semibold text-primary-dark hover:text-primary-green transition-all duration-300 px-2 xl:px-3 h-10 flex items-center gap-1 text-base xl:text-lg relative group">
        <Link href={item.href} className="relative inline-flex items-center h-full">
          {item.label}
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-green group-hover:w-full transition-all duration-300" />
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center h-full px-1"
          aria-label={`Toggle ${item.label} menu`}
        >
          <ChevronDown
            className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {isOpen && item.categories && (
        <div className="absolute left-1/2 top-full z-[90] mt-2 w-[520px] -translate-x-1/2 overflow-hidden rounded-[1.6rem] border border-black/6 bg-white shadow-[0_22px_52px_rgba(17,24,39,0.16)] animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-5">
            {/* Left Column - Categories */}
            <div className="col-span-2 border-r border-black/6 bg-bg-beige/45 py-3">
              {item.categories.map((category, index) => (
                <button
                  key={category.name}
                  className={`w-full text-left px-5 py-3.5 font-body text-base transition-all duration-200 ${
                    activeCategory === index
                      ? "bg-primary-green text-white shadow-md shadow-primary-green/30"
                      : "text-primary-dark hover:bg-white hover:pl-6 focus-visible:bg-white"
                  }`}
                  onMouseEnter={() => setActiveCategory(index)}
                >
                  <span className="flex items-center justify-between">
                    {category.name}
                    <ChevronRight className={`w-5 h-5 transition-transform ${activeCategory === index ? "translate-x-0.5" : ""}`} />
                  </span>
                </button>
              ))}
            </div>

            {/* Right Column - Links */}
            <div className="col-span-3 bg-white py-4 px-5">
              <h3 className="mb-4 flex items-center gap-2 border-b border-black/8 pb-2 font-heading text-base font-semibold text-primary-green">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-green" />
                {item.categories[activeCategory].name}
              </h3>
              <div className="space-y-1">
                {item.categories[activeCategory].links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block rounded-lg px-3 py-3 font-body text-base font-medium text-primary-dark transition-all duration-200 hover:translate-x-1 hover:bg-bg-beige/55 hover:text-primary-green focus-visible:bg-bg-beige/65 focus-visible:text-primary-green"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Footer - View All */}
          <div className="border-t border-black/6 bg-bg-beige/18 px-5 py-4">
            <Link
              href={item.href}
              className="group flex items-center gap-1.5 font-body text-base font-semibold text-primary-green transition-all duration-200 hover:text-primary-dark focus-visible:text-primary-dark"
            >
              View All Services
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function DesktopMoreMenu({ items }: { items: NavItem[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        onClick={() => setIsOpen((open) => !open)}
        className="font-heading font-semibold text-primary-dark hover:text-primary-green transition-all duration-300 px-2 xl:px-3 h-10 flex items-center gap-1 text-base xl:text-lg relative group"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label="Open more navigation links"
      >
        <span className="relative inline-flex items-center h-full">
          More
          <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary-green transition-all duration-300 group-hover:w-full" />
        </span>
        <ChevronDown
          className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 top-full z-[90] mt-2 min-w-[260px] rounded-2xl border border-black/6 bg-white p-2 shadow-[0_18px_40px_rgba(17,24,39,0.14)]"
          role="menu"
          aria-label="Secondary navigation"
        >
          {items.map((item) => {
            const description =
              item.label === "Ramadan"
                ? "Seasonal worship schedule"
                : item.label === "Future Projects"
                  ? "Expansion and building updates"
                  : item.label === "Get Involved"
                    ? "Volunteer and support opportunities"
                    : "";

            return (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-xl px-4 py-3 transition-all duration-200 hover:bg-bg-beige/55 focus-visible:bg-bg-beige/65"
                role="menuitem"
              >
                <span className="font-heading text-base font-semibold text-primary-dark">
                  {item.label}
                </span>
                {description ? (
                  <span className="mt-1 block font-body text-sm text-muted-foreground">
                    {description}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

// Desktop nav item renderer
function DesktopNavItem({
  item,
  isLightHeader,
  isRamadanActive,
}: {
  item: NavItem;
  isLightHeader: boolean;
  isRamadanActive: boolean;
}) {
  if (item.type === "link") {
    const isRamadan = item.label === "Ramadan";
    const ramadanTextClass = isLightHeader
      ? "text-amber-500 group-hover:text-amber-600"
      : "bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent group-hover:from-emerald-700 group-hover:to-green-800";
    const ramadanActiveClass = isRamadanActive
      ? `font-semibold underline underline-offset-4 decoration-2 ${
          isLightHeader ? "decoration-amber-600" : "decoration-emerald-700"
        }`
      : "font-semibold";

    return (
      <Link
        href={item.href}
          className={`font-heading transition-all duration-300 px-2 xl:px-3 h-10 text-base xl:text-lg relative group inline-flex items-center ${
          isRamadan
            ? `${ramadanActiveClass}`
            : "font-semibold text-primary-dark hover:text-primary-green"
        }`}
      >
        <span className={`relative ${isRamadan ? ramadanTextClass : ""}`}>
          {item.label}
          <span
            className={`absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 ${
              isRamadan
                ? isLightHeader
                  ? "bg-amber-500"
                  : "bg-emerald-700"
                : "bg-primary-green"
            }`}
          />
        </span>
      </Link>
    );
  }

  if (item.type === "megamenu") {
    return <DesktopMegaMenu item={item} />;
  }

  return <DesktopDropdown item={item} />;
}

// Mobile simple dropdown (for About, Education, Events, Get Involved)
function MobileSimpleDropdown({
  item,
  onClose,
}: {
  item: NavItem;
  onClose: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  if (item.type === "link") {
    const isRamadan = item.label === "Ramadan";

    return (
      <Link
        href={item.href}
        onClick={onClose}
        className={`px-4 py-3 text-lg border-b border-light-sage/30 transition-colors flex items-center ${
          isRamadan
            ? "font-medium text-amber-500 hover:text-amber-600"
            : "font-heading font-semibold text-primary-dark hover:text-primary-green"
        }`}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="border-b border-light-sage/30">
      <button
        className="w-full font-heading font-semibold text-primary-dark hover:text-primary-green transition-colors px-4 py-3 text-lg flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        {item.label}
        <ChevronDown
          className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && item.dropdown && (
        <div className="bg-white/50 pb-2">
          {item.dropdown.map((subItem) => (
            <Link
              key={subItem.href}
              href={subItem.href}
              onClick={onClose}
              className="block px-8 py-2 font-body text-muted-foreground hover:text-primary-green transition-colors"
            >
              {subItem.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

// Mobile mega menu accordion (for Services)
function MobileMegaMenuAccordion({
  item,
  onClose,
}: {
  item: NavItem;
  onClose: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState<number | null>(null);

  return (
    <div className="border-b border-light-sage/30">
      {/* Main toggle */}
      <button
        className="w-full font-heading font-semibold text-primary-dark hover:text-primary-green transition-colors px-4 py-3 text-lg flex items-center justify-between"
        onClick={() => {
          setIsOpen(!isOpen);
          if (isOpen) setOpenCategory(null);
        }}
      >
        {item.label}
        <ChevronDown
          className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Categories accordion */}
      {isOpen && item.categories && (
        <div className="bg-white/50 pb-2">
          {item.categories.map((category, index) => (
            <div key={category.name}>
              {/* Category toggle */}
              <button
                className={`w-full text-left px-6 py-2.5 font-body flex items-center justify-between transition-colors ${
                  openCategory === index
                    ? "bg-primary-green text-white"
                    : "text-primary-dark hover:bg-light-sage/30"
                }`}
                onClick={() =>
                  setOpenCategory(openCategory === index ? null : index)
                }
              >
                {category.name}
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    openCategory === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Category links */}
              {openCategory === index && (
                <div className="bg-bg-beige/50 py-1">
                  {category.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={onClose}
                      className="block px-10 py-2 font-body text-sm text-muted-foreground hover:text-primary-green transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* View all link */}
          <Link
            href={item.href}
            onClick={onClose}
            className="block px-6 py-2.5 font-body text-primary-green hover:text-primary-dark transition-colors"
          >
            View All Services →
          </Link>
        </div>
      )}
    </div>
  );
}

// Mobile nav item renderer
function MobileNavItem({
  item,
  onClose,
}: {
  item: NavItem;
  onClose: () => void;
}) {
  if (item.type === "megamenu") {
    return <MobileMegaMenuAccordion item={item} onClose={onClose} />;
  }

  return <MobileSimpleDropdown item={item} onClose={onClose} />;
}

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isCompactHeader, setIsCompactHeader] = useState(true);
  const headerRowRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const desktopNavRef = useRef<HTMLDivElement>(null);
  const desktopDonateRef = useRef<HTMLDivElement>(null);
  const previousCompactHeaderRef = useRef(true);
  const pathname = usePathname();
  const isLightHeader = hasScrolled;
  const isRamadanActive = pathname === "/ramadan";

  // Handle scroll effect for shadow
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const updateHeaderMode = useCallback(() => {
    const headerRow = headerRowRef.current;
    const logo = logoRef.current;
    const desktopNav = desktopNavRef.current;
    const desktopDonate = desktopDonateRef.current;

    if (!headerRow || !logo || !desktopNav || !desktopDonate) {
      return;
    }

    const availableWidth = headerRow.clientWidth;
    const logoWidth = logo.offsetWidth;
    const navWidth = desktopNav.scrollWidth;
    const donateWidth = desktopDonate.offsetWidth;
    const safetyBuffer = 48;
    const shouldUseCompactHeader =
      window.innerWidth < 1024 ||
      (window.innerWidth < 1280 &&
        logoWidth + navWidth + donateWidth + safetyBuffer > availableWidth);

    if (previousCompactHeaderRef.current && !shouldUseCompactHeader) {
      setIsMobileMenuOpen(false);
    }

    previousCompactHeaderRef.current = shouldUseCompactHeader;

    setIsCompactHeader((prev) =>
      prev === shouldUseCompactHeader ? prev : shouldUseCompactHeader
    );
  }, []);

  useEffect(() => {
    let frameId = 0;
    const queueMeasurement = () => {
      cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateHeaderMode);
    };

    queueMeasurement();
    window.addEventListener("resize", queueMeasurement);

    const resizeObserver = new ResizeObserver(queueMeasurement);

    if (headerRowRef.current) {
      resizeObserver.observe(headerRowRef.current);
    }

    if (logoRef.current) {
      resizeObserver.observe(logoRef.current);
    }

    if (desktopNavRef.current) {
      resizeObserver.observe(desktopNavRef.current);
    }

    if (desktopDonateRef.current) {
      resizeObserver.observe(desktopDonateRef.current);
    }

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", queueMeasurement);
      resizeObserver.disconnect();
    };
  }, [updateHeaderMode]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-black/6 bg-white shadow-sm">
        <nav
          className="mx-auto max-w-[90rem] px-3 sm:px-5 lg:px-6"
          aria-label="Primary"
        >
          <div ref={headerRowRef} className="relative h-20 lg:h-24">
            {/* Logo */}
            <div ref={logoRef} className="absolute left-0 top-1/2 -translate-y-1/2 shrink-0">
              <Link
                href="/"
                className="flex items-center transition-opacity duration-300 hover:opacity-80"
              >
                <Image
                  src="/masjid_logo.png"
                  alt="Masjid Al-Quba Logo"
                  width={128}
                  height={128}
                  className="h-14 w-14 object-contain sm:h-16 sm:w-16 lg:h-[4.5rem] lg:w-[4.5rem]"
                  priority
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div
              ref={desktopNavRef}
              className={`hidden lg:flex absolute left-1/2 top-1/2 h-full -translate-x-1/2 -translate-y-1/2 items-center ${
                isCompactHeader
                  ? "invisible pointer-events-none"
                  : ""
              }`}
              aria-hidden={isCompactHeader}
            >
              <div className="flex h-full items-center justify-center gap-0 rounded-full bg-bg-beige/35 px-3">
                {desktopPrimaryLinks.map((item) => (
                  <DesktopNavItem
                    key={item.label}
                    item={item}
                    isLightHeader={isLightHeader}
                    isRamadanActive={isRamadanActive}
                  />
                ))}
                <DesktopMoreMenu items={desktopSecondaryLinks} />
              </div>
            </div>

            {/* Desktop CTA */}
            <div
              ref={desktopDonateRef}
              className={`hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 ${
                isCompactHeader ? "invisible pointer-events-none" : ""
              }`}
              aria-hidden={isCompactHeader}
            >
              <div className="shrink-0">
                <Link
                  href="/donate"
                  className="flex items-center gap-2 whitespace-nowrap rounded-full bg-gradient-to-r from-[#476F57] via-[#3D5A45] to-[#2F4636] px-5 py-2.5 font-body text-base font-semibold text-white shadow-[0_10px_22px_rgba(47,70,54,0.18)] ring-1 ring-white/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(47,70,54,0.24)] hover:from-[#4C785D] hover:via-[#42614B] hover:to-[#334D3C] xl:px-6 xl:text-lg"
                >
                  <Heart className="w-5 h-5" />
                  Donate
                </Link>
              </div>
            </div>

            {/* Mobile: Donate Button + Hamburger Menu */}
            <div
              className={`absolute right-0 top-1/2 -translate-y-1/2 flex lg:hidden items-center gap-3 ${
                isCompactHeader ? "flex" : "hidden"
              }`}
              aria-hidden={!isCompactHeader}
            >
              <Link
                href="/donate"
                className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-gradient-to-r from-[#476F57] via-[#3D5A45] to-[#2F4636] px-3.5 py-2 font-body text-sm font-semibold text-white shadow-[0_10px_20px_rgba(47,70,54,0.18)] ring-1 ring-white/20 transition-all duration-300 hover:shadow-[0_14px_24px_rgba(47,70,54,0.24)] hover:from-[#4C785D] hover:via-[#42614B] hover:to-[#334D3C] sm:px-5 sm:text-base"
              >
                <Heart className="w-4 h-4" />
                Donate
              </Link>

              <button
                className="rounded-full border border-black/8 bg-white p-2 text-primary-dark transition-colors hover:bg-bg-beige/45 hover:text-primary-green"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="w-7 h-7" />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {isCompactHeader && isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div
        className={`fixed right-0 top-0 z-[70] h-full w-[320px] max-w-[85vw] border-l border-black/6 bg-white shadow-[0_18px_40px_rgba(17,24,39,0.16)] transform transition-transform duration-300 ease-in-out ${
          isCompactHeader && isMobileMenuOpen ? "translate-x-0" : "translate-x-[110%]"
        }`}
      >
        <div className="flex items-center justify-between border-b border-black/6 bg-bg-beige/18 p-5">
          <span className="font-heading text-xl font-bold text-primary-dark flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-primary-green flex items-center justify-center text-white text-xs">Q</span>
            Menu
          </span>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="rounded-full border border-black/8 bg-white p-2 text-primary-dark transition-all duration-200 hover:bg-bg-beige/45 hover:text-primary-green"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="h-[calc(100%-80px)] overflow-y-auto overscroll-contain">
          {navLinks.map((item) => (
            <MobileNavItem
              key={item.label}
              item={item}
              onClose={() => setIsMobileMenuOpen(false)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
