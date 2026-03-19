"use client";

import { useState } from "react";
import {
  MoonStar,
  Building2,
  Settings,
  HandHeart,
  Heart,
  ExternalLink,
  Info,
  Copy,
  Check,
  QrCode,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import cashAppQr from "../../masjid/cashApp.png";
import minbrQr from "../../masjid/minbr.png";
import paypalQr from "../../masjid/paypal.png";
import zelleQr from "../../public/zelle_qr.png";

const ZELLE_ACCOUNT = "masjidalquba@gmail.com";

const DONATION_LINKS = {
  ramadan: "https://square.link/u/uaQVezWs",
  construction: "https://square.link/u/y45ivtFR",
  operations: "https://square.link/u/9S5UK6T3",
  zakat: "https://square.link/u/RveBuPCI",
  sadaqah: "https://square.link/u/MlGg2gg5",
};

type DonationOption = {
  id: string;
  title: string;
  description: string;
  icon: typeof MoonStar;
  link?: string;
  iconColor: string;
  paymentLabel: string;
};

type QrDonationOption = {
  id: string;
  title: string;
  description: string;
  badge: string;
  qr: typeof cashAppQr;
  actionLabel: string;
  eyebrow: string;
  accountValue?: string;
  copyValue?: string;
};

const donationOptions: DonationOption[] = [
  {
    id: "ramadan",
    title: "Ramadan Giving",
    description: "Support urgent Ramadan and community needs.",
    icon: MoonStar,
    link: DONATION_LINKS.ramadan,
    iconColor: "text-primary-green",
    paymentLabel: "Donate via Square",
  },
  {
    id: "construction",
    title: "New Masjid Construction",
    description: "Help build a larger home for the community.",
    icon: Building2,
    link: DONATION_LINKS.construction,
    iconColor: "text-primary-green",
    paymentLabel: "Donate via Square",
  },
  {
    id: "operations",
    title: "Masjid Operations",
    description: "Cover utilities, maintenance, and daily services.",
    icon: Settings,
    link: DONATION_LINKS.operations,
    iconColor: "text-primary-green",
    paymentLabel: "Donate via Square",
  },
  {
    id: "zakat",
    title: "Zakat",
    description: "Fulfill your obligation with dignity and care.",
    icon: HandHeart,
    link: DONATION_LINKS.zakat,
    iconColor: "text-primary-green",
    paymentLabel: "Donate via Square",
  },
  {
    id: "sadaqah",
    title: "Sadaqah",
    description: "Give flexible charity for ongoing community benefit.",
    icon: Heart,
    link: DONATION_LINKS.sadaqah,
    iconColor: "text-primary-green",
    paymentLabel: "Donate via Square",
  },
];

const qrDonationOptions: QrDonationOption[] = [
  {
    id: "cashapp",
    title: "Cash App",
    description: "Use the Cash App QR code for a direct transfer from your phone.",
    badge: "Cash App",
    qr: cashAppQr,
    actionLabel: "Scan to Give",
    eyebrow: "Mobile Transfer",
  },
  {
    id: "minbr",
    title: "Minbr",
    description: "Scan the Minbr QR code to continue the donation flow in their app.",
    badge: "Minbr",
    qr: minbrQr,
    actionLabel: "Scan to Give",
    eyebrow: "Masjid Giving Platform",
  },
  {
    id: "paypal",
    title: "PayPal",
    description: "Use PayPal if you prefer a wallet or a card-backed payment option.",
    badge: "PayPal",
    qr: paypalQr,
    actionLabel: "Scan to Give",
    eyebrow: "Wallet or Card",
  },
  {
    id: "zelle",
    title: "Zelle",
    description: "Scan the QR code or copy the account for a direct bank transfer.",
    badge: "Zelle",
    qr: zelleQr,
    actionLabel: "Copy Zelle Account",
    eyebrow: "Bank Transfer",
    accountValue: ZELLE_ACCOUNT,
    copyValue: ZELLE_ACCOUNT,
  },
];

export default function DonatePageContent() {
  const [copied, setCopied] = useState(false);
  const [selectedQrId, setSelectedQrId] = useState(qrDonationOptions[0].id);

  const selectedQrOption =
    qrDonationOptions.find((option) => option.id === selectedQrId) ?? qrDonationOptions[0];

  const handleCopy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleSelectQr = (id: string) => {
    setSelectedQrId(id);
    window.setTimeout(() => {
      document.getElementById("qr-image-anchor")?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 120);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-bg-beige to-[#C8C6C0]">
      <section className="py-8 md:py-10">
        <div className="mx-auto max-w-[96rem] px-4 sm:px-6">
          <div className="mx-auto mb-8 max-w-4xl text-center">
            <h1 className="font-heading text-4xl font-bold text-primary-dark md:text-[3.15rem]">
              Donate now.
            </h1>
            <p className="mt-3 font-body text-sm font-semibold uppercase tracking-[0.18em] text-primary-green/80">
              “Charity does not decrease wealth.”
            </p>
            <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-primary-green/80" />
          </div>

          <div className="mb-8 rounded-[2rem] border border-black/5 bg-white/72 p-5 shadow-lg backdrop-blur-sm md:p-6">
            <div className="grid gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(280px,0.45fr)] xl:items-start">
              <div>
                <h2 className="font-heading text-2xl font-bold text-primary-dark">
                  Choose a fund.
                </h2>

                <div className="mt-4 grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
                  {donationOptions.map((option) => {
                    const IconComponent = option.icon;

                    return (
                      <a
                        key={option.id}
                        href={option.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex min-h-[13.5rem] h-full flex-col rounded-[1.6rem] border border-black/5 bg-white/88 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-green/30"
                      >
                        <div className="mb-4 flex items-center justify-between gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-black/5 bg-gradient-to-br from-white to-gray-50 transition-transform duration-300 group-hover:scale-105">
                            <IconComponent className={`h-5 w-5 ${option.iconColor}`} strokeWidth={2} />
                          </div>
                          <span className="rounded-full bg-primary-green/10 px-2.5 py-1 font-body text-[10px] font-semibold uppercase tracking-[0.16em] text-primary-green">
                            Square
                          </span>
                        </div>

                        <h3 className="mb-2 font-heading text-[1.15rem] font-bold leading-tight text-primary-dark transition-colors group-hover:text-primary-green">
                          {option.title}
                        </h3>
                        <p className="mb-4 font-body text-sm leading-relaxed text-muted-foreground">
                          {option.description}
                        </p>

                        <div className="mt-auto flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-primary-green text-white font-body text-sm font-semibold shadow-md transition-all duration-300 group-hover:shadow-lg">
                          <span>{option.paymentLabel}</span>
                          <ExternalLink className="w-4 h-4" strokeWidth={2} />
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-[1.6rem] bg-bg-beige/48 p-4">
                <h2 className="font-heading text-2xl font-bold text-primary-dark">
                  Payment methods.
                </h2>

                <div className="mt-4 rounded-2xl bg-white/85 px-4 py-3 text-sm font-semibold text-primary-dark">
                  We accept Square, Cash App, Minbr, PayPal, and Zelle.
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  {qrDonationOptions.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => handleSelectQr(option.id)}
                      className={`rounded-2xl border px-4 py-3 text-left transition-all duration-200 ${
                        selectedQrId === option.id
                          ? "border-primary-green bg-primary-green text-white shadow-[0_14px_28px_rgba(71,111,87,0.18)]"
                          : "border-black/6 bg-white text-primary-dark hover:-translate-y-0.5 hover:border-primary-green/35 hover:bg-bg-beige/35"
                      }`}
                    >
                      <p
                        className={`font-body text-[10px] font-semibold uppercase tracking-[0.18em] ${
                          selectedQrId === option.id ? "text-white/80" : "text-muted-foreground"
                        }`}
                      >
                        {option.eyebrow}
                      </p>
                      <p className="mt-2 font-heading text-lg font-bold">{option.title}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div
            id="qr-showcase"
            className="mb-10 rounded-[2rem] bg-primary-green px-6 pb-6 pt-7 text-white shadow-[0_18px_40px_rgba(71,111,87,0.18)] md:px-8 md:pb-8 md:pt-8"
          >
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_320px] lg:items-center">
              <div>
                <p className="font-body text-xs font-semibold uppercase tracking-[0.22em] text-white/72">
                  {selectedQrOption.eyebrow}
                </p>
                <h2 className="mt-3 font-heading text-4xl font-bold uppercase tracking-[0.02em]">
                  {selectedQrOption.title}
                </h2>
                <div className="mt-4 inline-flex items-center rounded-sm bg-[#6C2BD9] px-4 py-2 font-body text-base font-bold text-white">
                  {selectedQrOption.badge}
                </div>

                {selectedQrOption.accountValue ? (
                  <p className="mt-6 max-w-xl break-all font-body text-xl font-semibold">
                    {selectedQrOption.accountValue}
                  </p>
                ) : (
                  <div className="mt-6 flex items-center gap-2 font-body text-sm font-semibold uppercase tracking-[0.18em] text-white/88">
                    <QrCode className="h-4 w-4" />
                    Scan with your phone camera
                  </div>
                )}

                <p className="mt-6 max-w-2xl font-body text-base leading-relaxed text-white/92 md:text-lg">
                  {selectedQrOption.description}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {qrDonationOptions.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setSelectedQrId(option.id)}
                      className={`rounded-full px-4 py-2 font-body text-sm font-semibold transition-all duration-200 ${
                        selectedQrId === option.id
                          ? "bg-white text-primary-green"
                          : "bg-white/12 text-white hover:bg-white/20"
                      }`}
                    >
                      {option.title}
                    </button>
                  ))}
                </div>
              </div>

              <div id="qr-image-anchor" className="scroll-mt-28 flex flex-col items-center">
                <div className="rounded-[1.75rem] bg-white p-4 shadow-sm">
                  <Image
                    src={selectedQrOption.qr}
                    alt={`${selectedQrOption.title} QR code`}
                    width={260}
                    height={260}
                    sizes="(max-width: 768px) 220px, 260px"
                    className="h-[220px] w-[220px] object-contain md:h-[260px] md:w-[260px]"
                    priority
                  />
                </div>

                <div className="mt-6 w-full max-w-sm">
                  {selectedQrOption.copyValue ? (
                    <button
                      type="button"
                      onClick={() => handleCopy(selectedQrOption.copyValue)}
                      className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white px-4 font-body text-base font-semibold text-primary-green shadow-sm transition-all duration-300 hover:-translate-y-0.5"
                    >
                      {copied ? (
                        <>
                          <Check className="h-4 w-4" />
                          Copied Zelle Account
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          {selectedQrOption.actionLabel}
                        </>
                      )}
                    </button>
                  ) : (
                    <div className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white px-4 font-body text-base font-semibold text-primary-green shadow-sm">
                      <QrCode className="h-4 w-4" />
                      {selectedQrOption.actionLabel}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto mb-10">
            <div className="rounded-2xl border border-black/5 bg-white/50 p-5 text-center backdrop-blur-sm sm:p-6">
              <p className="font-body text-sm leading-relaxed text-muted-foreground sm:text-base">
                Cash App, Minbr, PayPal, and Zelle can be scanned directly from this page. Square options open in a secure external checkout for campaign-specific donations.
              </p>
            </div>
          </div>

          <div className="max-w-3xl mx-auto mt-12">
            <h2 className="font-heading text-3xl font-bold text-primary-dark text-center mb-8">
              Other Ways to Donate
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="rounded-2xl bg-white/70 backdrop-blur-sm border border-black/5 shadow-lg p-6">
                <h3 className="font-heading text-xl font-bold text-primary-dark mb-3">
                  Mail Check
                </h3>
                <p className="font-body text-muted-foreground mb-2">Mail check to:</p>
                <p className="font-body text-primary-dark font-semibold">
                  Masjid Al-Quba
                  <br />
                  PO Box 220
                  <br />
                  Buford, GA 30515
                </p>
              </div>

              <div className="rounded-2xl bg-white/70 backdrop-blur-sm border border-black/5 shadow-lg p-6">
                <h3 className="font-heading text-xl font-bold text-primary-dark mb-3">
                  Need Help?
                </h3>
                <p className="font-body text-muted-foreground mb-2">
                  Call us if you need help completing a donation.
                </p>
                <div className="space-y-2 font-body font-semibold text-primary-dark">
                  <a
                    href="tel:404-933-2943"
                    className="inline-flex min-h-11 items-center rounded-lg px-3 py-2 hover:bg-primary-green/5 hover:text-primary-green"
                  >
                    404-933-2943
                  </a>
                  <a
                    href="tel:678-524-9841"
                    className="inline-flex min-h-11 items-center rounded-lg px-3 py-2 hover:bg-primary-green/5 hover:text-primary-green"
                  >
                    678-524-9841
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto mt-8">
            <div className="rounded-2xl bg-white/50 backdrop-blur-sm border border-black/5 p-6 flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-xl bg-primary-green/10 flex items-center justify-center">
                  <Info className="w-5 h-5 text-primary-green" strokeWidth={2} />
                </div>
              </div>
              <div className="flex-1">
                <p className="font-body text-muted-foreground leading-relaxed">
                  <strong className="text-primary-dark">Secure payment:</strong>{" "}
                  You&apos;ll be redirected to Square to complete your donation securely.
                  All transactions are encrypted and safe.
                </p>
                <p className="font-body text-sm text-muted-foreground mt-3">
                  Need help?{" "}
                  <Link
                    href="/contact"
                    className="inline-flex min-h-11 items-center rounded-lg px-2 py-2 text-primary-green font-medium hover:bg-primary-green/5 hover:underline"
                  >
                    Contact us
                  </Link>{" "}
                  for assistance.
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto mt-8">
            <div className="rounded-2xl bg-white/70 backdrop-blur-sm border border-black/5 shadow-lg p-6">
              <div className="text-center">
                <p className="font-body text-muted-foreground mb-3">
                  For questions or assistance with donations:
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-primary-dark font-body">
                  <a
                    href="tel:404-933-2943"
                    className="inline-flex min-h-11 items-center rounded-lg px-3 py-2 font-semibold hover:bg-primary-green/5 hover:text-primary-green"
                  >
                    404-933-2943
                  </a>
                  <span className="hidden sm:inline text-muted-foreground">|</span>
                  <a
                    href="tel:678-524-9841"
                    className="inline-flex min-h-11 items-center rounded-lg px-3 py-2 font-semibold hover:bg-primary-green/5 hover:text-primary-green"
                  >
                    678-524-9841
                  </a>
                  <span className="hidden sm:inline text-muted-foreground">|</span>
                  <a
                    href="https://masjidalquba.net"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center rounded-lg px-3 py-2 font-semibold hover:bg-primary-green/5 hover:text-primary-green"
                  >
                    masjidalquba.net
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto mt-6 mb-8">
            <div className="rounded-2xl bg-primary-green/10 border border-primary-green/20 p-4">
              <p className="font-body text-center text-primary-dark font-semibold">
                All donations are 100% tax-deductible
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
