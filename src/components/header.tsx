"use client";

import { ArrowUpRight, Menu, Sprout, X } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  { href: "#ritual", label: "The ritual" },
  { href: "#menu", label: "The menu" },
  { href: "#story", label: "Our roots" },
  { href: "#visit", label: "Find us" },
];

export function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <a
      href="#home"
      className={`brand ${footer ? "brand-footer" : ""}`}
      aria-label="Root and Ritual home"
    >
      <Sprout size={29} strokeWidth={1.45} aria-hidden="true" />
      <span>
        root <span className="brand-and">&amp;</span> ritual
        <span className="brand-caption">VEGETARIAN KITCHEN & CAFÉ</span>
      </span>
    </a>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, []);
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className={`site-header ${scrolled || open ? "is-scrolled" : ""}`}>
        <div className="header-inner">
          <Brand />
          <nav aria-label="Main navigation" className="desktop-nav">
            {links.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
          <a href="#reservations" className="button button-small header-reserve">
            A table for you <ArrowUpRight size={14} aria-hidden="true" />
          </a>
          <button
            type="button"
            className="mobile-toggle icon-button"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close navigation" : "Open navigation"}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="mobile-nav"
          hidden={!open}
        >
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
              <ArrowUpRight size={20} aria-hidden="true" />
            </a>
          ))}
          <a href="#reservations" onClick={() => setOpen(false)}>
            Request a table
            <ArrowUpRight size={20} aria-hidden="true" />
          </a>
        </nav>
      </header>
    </>
  );
}
