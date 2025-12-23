"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaShoppingBag, FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { useStore } from "@/app/store/useStore";
import { locales } from "@/app/locales";
import { Language } from "@/app/types";

const Navbar: React.FC = () => {
  const { language, setLanguage, cart, toggleCart } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const router = useRouter();
  const pathname = usePathname();
  const t = locales[language].nav;

  const isHome = pathname === "/";
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Language Config
  const languages: { code: Language; label: string; flag: string }[] = [
    { code: "en", label: "English", flag: "🇺🇸" },
    { code: "fr", label: "Français", flag: "🇫🇷" },
    { code: "ar", label: "العربية", flag: "🇲🇦" },
  ];

  const currentLang =
    languages.find((l) => l.code === language) || languages[0];

  useEffect(() => {

    // Click outside to close lang menu
    const handleClickOutside = (event: MouseEvent) => {
      if (
        langMenuRef.current &&
        !langMenuRef.current.contains(event.target as Node)
      ) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    // Scroll listener
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setLangMenuOpen(false);
  }, [pathname]);

  const handleNavClick = (path: string) => {
    setMobileMenuOpen(false);
    router.push(path);
  };

  const isActive = (path: string) => pathname === path;

  // Navbar Style Logic
  // Home + Top: Transparent / Gradient
  // Home + Scrolled: Dark + Blur
  // Other Pages: Light / Default
  const getNavbarBgClass = () => {
    if (isHome) {
      return isScrolled
        ? "bg-morocco-dark/95 backdrop-blur-md shadow-lg border-b border-morocco-gold/10"
        : "bg-gradient-to-b from-black/60 to-transparent border-transparent";
    }
    return "bg-morocco-neutral/95 backdrop-blur-sm shadow-sm";
  };


  const shouldUseWhiteText =
    isHome && !isScrolled ? true : isHome && isScrolled ? true : false;
  // Actually simpler: Home is always white text (on Hero or Dark Nav), Other pages are Dark text.
  // Wait, if Home Scrolled is Dark BG, White Text is correct.
  // If Home Top is Transparent (on Image), White Text is correct.
  // If Other Page is Light BG, Dark Text is correct.

  const isTextWhite = isHome; // Always white on Home (Hero or Scrolled Dark)

  const navTextClass = isTextWhite
    ? "text-white hover:text-morocco-gold"
    : "text-morocco-dark hover:text-morocco-red";
  const navActiveTextClass = isTextWhite
    ? "text-morocco-gold font-bold"
    : "text-morocco-red font-bold";

  // REMOVED border-b-2 logic
  const getLinkClass = (path: string) => `
    text-sm font-medium uppercase tracking-wide transition-all duration-300 cursor-pointer
    ${isActive(path) ? navActiveTextClass : navTextClass}
  `;

  const buttonClass = `text-sm font-medium uppercase tracking-wide transition-colors cursor-not-allowed opacity-70 ${navTextClass}`;

  return (
    <div className="fixed w-full z-50 flex flex-col items-center">

      {/* Main Navbar */}
      <nav
        className={`w-full transition-all duration-500 ease-in-out ${getNavbarBgClass()}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="flex justify-between items-center h-16 transition-all duration-500"
          >
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 transition-colors ${navTextClass}`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>

            {/* Logo */}
            <Link
              href="/"
              className="flex flex-col items-center md:items-start group"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span
                className={`text-2xl font-bold tracking-widest font-sans uppercase transition-colors ${isTextWhite ? "text-white" : "text-morocco-red"}`}
              >
                UV.Decode
              </span>
              <span
                className={`text-xs tracking-[0.3em] uppercase transition-colors ${isTextWhite ? "text-white/80 group-hover:text-morocco-gold" : "text-morocco-green group-hover:text-morocco-gold"}`}
              >
                Caf Drip Collection
              </span>
            </Link>

            {/* Desktop Links - Centered */}
            <div className="hidden md:flex flex-1 justify-center items-center space-x-12 rtl:space-x-reverse">
              <button
                onClick={() => handleNavClick("/")}
                className={getLinkClass("/")}
              >
                {t.home}
              </button>
              <button
                onClick={() => handleNavClick("/shop")}
                className={getLinkClass("/shop")}
              >
                {t.shop}
              </button>
            </div>

            {/* Right Side: Lang, Cart */}
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              {/* Language Dropdown */}
              <div className="relative hidden sm:block" ref={langMenuRef}>
                <button
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-colors ${isTextWhite ? "border-white/30 hover:bg-white/10 text-white" : "border-morocco-gold/30 hover:bg-morocco-gold/10 text-morocco-dark"}`}
                >
                  <span className="text-lg leading-none">
                    {currentLang.flag}
                  </span>
                  <span className="text-xs font-bold hidden lg:block">
                    {currentLang.label}
                  </span>
                  <FaChevronDown
                    size={10}
                    className={`transition-transform ${langMenuOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {langMenuOpen && (
                  <div className="absolute top-full right-0 rtl:right-auto rtl:left-0 mt-2 w-40 bg-white shadow-xl rounded-lg border border-morocco-gold/20 overflow-hidden animate-fadeIn text-morocco-dark">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setLangMenuOpen(false);
                        }}
                        className={`w-full text-left rtl:text-right px-4 py-3 text-sm flex items-center gap-3 hover:bg-morocco-neutral transition-colors ${language === lang.code ? "bg-morocco-neutral font-bold text-morocco-red" : "text-morocco-dark"}`}
                      >
                        <span className="text-xl">{lang.flag}</span>
                        <span>{lang.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Cart */}
              <button
                onClick={() => toggleCart(true)}
                className={`relative p-2 transition-colors ${navTextClass}`}
              >
                <FaShoppingBag size={20} />
                {mounted && cartItemCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-morocco-red rounded-full">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-morocco-neutral border-t border-morocco-gold/20 absolute w-full left-0 top-full py-4 px-6 shadow-lg flex flex-col space-y-4 h-[calc(100vh-100%)] z-40 animate-slideIn">
          <button
            onClick={() => handleNavClick("/")}
            className={`text-lg font-medium text-left rtl:text-right ${isActive("/") ? "text-morocco-red font-bold" : "text-morocco-dark"}`}
          >
            {t.home}
          </button>
          <button
            onClick={() => handleNavClick("/shop")}
            className={`text-lg font-medium text-left rtl:text-right ${isActive("/shop") ? "text-morocco-red font-bold" : "text-morocco-dark"}`}
          >
            {t.shop}
          </button>
          <button className="text-lg font-medium text-morocco-dark text-left rtl:text-right opacity-70 cursor-not-allowed">
            {t.faq}
          </button>
          <button className="text-lg font-medium text-morocco-dark text-left rtl:text-right opacity-70 cursor-not-allowed">
            {t.contact}
          </button>

          <div className="flex flex-col gap-4 pt-4 border-t border-morocco-gold/20">
            <span className="text-xs font-bold uppercase text-morocco-dark/50">
              Select Language
            </span>
            <div className="flex gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`flex-1 px-3 py-2 rounded border border-morocco-gold/30 text-sm font-bold flex items-center justify-center gap-2 ${language === lang.code ? "bg-morocco-green text-white" : "text-morocco-dark bg-white"}`}
                >
                  <span>{lang.flag}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
