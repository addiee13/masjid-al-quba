"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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
    label: "Masjid Info",
    href: "/about",
    type: "dropdown",
    dropdown: [
      { label: "About Us", href: "/about" },
      { label: "Board Members", href: "/about/board-members" },
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
          { label: "Zakat/Sadaqah", href: "/services/zakat-sadaqah" },
          { label: "Outreach/Dawa", href: "/services/outreach-dawa" },
        ],
      },
      {
        name: "Support Services",
        links: [
          { label: "Juma Dua Request", href: "/services/juma-dua-request" },
          { label: "Ask Imam", href: "/services/ask-imam" },
          { label: "Religious Counseling", href: "/services/counseling" },
        ],
      },
    ],
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
      { label: "Weekly Breakfast", href: "/events/weekly-breakfast" },
      { label: "Monthly Halaqa", href: "/events/monthly-halaqa" },
    ],
  },
  {
    label: "Get Involved",
    href: "/get-involved",
    type: "dropdown",
    dropdown: [
      { label: "Volunteer", href: "/get-involved/volunteer" },
      { label: "Donate", href: "https://square.link/u/9S5UK6T3" },
    ],
  },
  {
    label: "Contact Us",
    href: "/contact",
    type: "link",
  },
];

// Simple dropdown component for desktop
function DesktopDropdown({ item }: { item: NavItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className="font-heading font-semibold text-primary-dark hover:text-primary-green transition-all duration-300 px-4 py-2 flex items-center gap-1.5 text-lg xl:text-xl relative group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="relative">
          {item.label}
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-green group-hover:w-full transition-all duration-300" />
        </span>
        <ChevronDown
          className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && item.dropdown && (
        <div className="absolute top-full left-0 min-w-[240px] bg-white rounded-xl shadow-xl shadow-primary-dark/10 py-3 border border-light-sage/50 mt-1 animate-in fade-in slide-in-from-top-2 duration-200">
          {item.dropdown.map((subItem) => (
            <Link
              key={subItem.href}
              href={subItem.href}
              className="block px-5 py-3 font-body text-base text-primary-dark hover:bg-gradient-to-r hover:from-bg-beige hover:to-transparent hover:text-primary-green transition-all duration-200 relative group"
            >
              <span className="relative z-10">{subItem.label}</span>
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-primary-green group-hover:h-6 rounded-r transition-all duration-200" />
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
      <button
        className="font-heading font-semibold text-primary-dark hover:text-primary-green transition-all duration-300 px-4 py-2 flex items-center gap-1.5 text-lg xl:text-xl relative group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="relative">
          {item.label}
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-green group-hover:w-full transition-all duration-300" />
        </span>
        <ChevronDown
          className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && item.categories && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-[520px] bg-white rounded-2xl shadow-2xl shadow-primary-dark/15 border border-light-sage/50 overflow-hidden mt-1 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-5">
            {/* Left Column - Categories */}
            <div className="col-span-2 bg-gradient-to-b from-bg-beige/50 to-bg-beige/30 border-r border-light-sage/30 py-3">
              {item.categories.map((category, index) => (
                <button
                  key={category.name}
                  className={`w-full text-left px-5 py-3.5 font-body text-base transition-all duration-200 ${
                    activeCategory === index
                      ? "bg-primary-green text-white shadow-md shadow-primary-green/30"
                      : "text-primary-dark hover:bg-white/50 hover:pl-6"
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
            <div className="col-span-3 py-4 px-5">
              <h3 className="font-heading text-primary-green font-semibold text-base mb-4 pb-2 border-b border-light-sage/30 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-green" />
                {item.categories[activeCategory].name}
              </h3>
              <div className="space-y-1">
                {item.categories[activeCategory].links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block py-3 px-3 font-body text-base text-primary-dark hover:text-primary-green hover:bg-bg-beige/50 rounded-lg transition-all duration-200 hover:translate-x-1"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Footer - View All */}
          <div className="border-t border-light-sage/30 px-5 py-4 bg-gradient-to-r from-bg-beige/30 to-transparent">
            <Link
              href={item.href}
              className="font-body text-base text-primary-green hover:text-primary-dark transition-all duration-200 flex items-center gap-1.5 group"
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

// Desktop nav item renderer
function DesktopNavItem({ item }: { item: NavItem }) {
  if (item.type === "link") {
    return (
      <Link
        href={item.href}
        className="font-heading font-semibold text-primary-dark hover:text-primary-green transition-all duration-300 px-4 py-2 text-lg xl:text-xl relative group"
      >
        <span className="relative">
          {item.label}
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-green group-hover:w-full transition-all duration-300" />
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
    return (
      <Link
        href={item.href}
        onClick={onClose}
        className="block font-heading font-semibold text-primary-dark hover:text-primary-green transition-colors px-4 py-3 text-lg border-b border-light-sage/30"
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
              className="block px-8 py-2 font-body text-accent-sage hover:text-primary-green transition-colors"
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
                      className="block px-10 py-2 font-body text-sm text-accent-sage hover:text-primary-green transition-colors"
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

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        hasScrolled 
          ? "bg-white/95 backdrop-blur-md shadow-lg shadow-primary-dark/5" 
          : "bg-bg-beige"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <Link
            href="/"
            className="font-heading text-3xl md:text-5xl font-black text-primary-dark hover:text-primary-green transition-all duration-300 flex items-center gap-3 group"
          >
            <span className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary-green flex items-center justify-center text-white text-lg md:text-xl font-black group-hover:scale-110 transition-transform duration-300">
              Q
            </span>
            <span className="hidden sm:inline">Masjid Al-Quba</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((item) => (
              <DesktopNavItem key={item.label} item={item} />
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Link
              href="https://square.link/u/9S5UK6T3"
              className="bg-primary-green text-white font-body font-semibold rounded-full px-8 py-3 text-lg hover:shadow-lg hover:shadow-primary-green/30 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
            >
              <Heart className="w-5 h-5" />
              Donate
            </Link>
          </div>

          {/* Mobile: Donate Button + Hamburger Menu */}
          <div className="flex items-center gap-3 lg:hidden">
            {/* Mobile Donate Button (visible next to hamburger) */}
            <Link
              href="https://square.link/u/9S5UK6T3"
              className="bg-primary-green text-white font-body font-semibold rounded-full px-5 py-2.5 text-base hover:shadow-lg hover:shadow-primary-green/30 transition-all duration-300 flex items-center gap-1.5"
            >
              <Heart className="w-4 h-4" />
              Donate
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="p-2 text-primary-dark hover:text-primary-green transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-7 h-7" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Slide-out Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[320px] max-w-[85vw] bg-gradient-to-b from-bg-beige to-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden shadow-2xl ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-5 border-b border-light-sage/50 bg-white/50">
          <span className="font-heading text-xl font-bold text-primary-dark flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-primary-green flex items-center justify-center text-white text-xs">Q</span>
            Menu
          </span>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 text-primary-dark hover:text-primary-green hover:bg-bg-beige rounded-full transition-all duration-200"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="overflow-y-auto h-[calc(100%-80px)]">
          {/* Home Link */}
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block font-heading font-semibold text-primary-dark hover:text-primary-green transition-colors px-4 py-3 text-lg border-b border-light-sage/30"
          >
            Home
          </Link>

          {/* Navigation Links */}
          {navLinks.map((item) => (
            <MobileNavItem
              key={item.label}
              item={item}
              onClose={() => setIsMobileMenuOpen(false)}
            />
          ))}
        </div>
      </div>
    </header>
  );
}
