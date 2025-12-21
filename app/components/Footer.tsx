"use client";

import React from "react";
import { useStore } from "@/app/store/useStore";
import { locales } from "@/app/locales";

import { FaFacebook, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";

const Footer: React.FC = () => {
  const { language } = useStore();
  const t = locales[language].footer;

  const socialLinks = [
    { icon: FaFacebook, href: "https://www.facebook.com/share/1QvW31mNy3/", label: "Facebook" },
    { icon: FaInstagram, href: "https://www.instagram.com/uvdecode", label: "Instagram" },
    { icon: FaYoutube, href: "http://www.youtube.com/@U.V.DECODE", label: "YouTube" },
    { icon: FaTiktok, href: "https://www.tiktok.com/@u.v.decode", label: "TikTok" },
  ];

  return (
    <footer className="bg-morocco-dark text-morocco-neutral py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left rtl:md:text-right">
          <h3 className="text-2xl font-bold tracking-widest text-morocco-neutral uppercase">
            UV DECODE
          </h3>
          <p className="text-morocco-gold text-sm mt-1">CAF 2025 Collection</p>
        </div>

        {/* Social Media Icons */}
        <div className="flex items-center gap-6">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-morocco-neutral/70 hover:text-morocco-red transition-colors transform hover:scale-110"
              aria-label={social.label}
            >
              <social.icon size={24} />
            </a>
          ))}
        </div>

        <div className="text-xs text-morocco-neutral/50">
          &copy; 2025 UV DECODE. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
