"use client";

import { useState } from "react";
import { SITE, SOCIAL_LINKS } from "@/data/content";

const NAV_ITEMS = [
  { label: "Work", href: "#work" },
  { label: "Timeline", href: "#timeline" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href="#top" className="wordmark">
          {SITE.name}
        </a>

        <nav className="header-nav" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href} className="header-nav-link">
              {item.label}
            </a>
          ))}

          <div className="header-external" aria-label="External profiles">
            <a
              href={SOCIAL_LINKS.linkedin.href}
              target="_blank"
              rel="noreferrer"
              className="header-external-link"
            >
              {SOCIAL_LINKS.linkedin.label}
            </a>
            <a
              href={SOCIAL_LINKS.github.href}
              target="_blank"
              rel="noreferrer"
              className="header-external-link"
            >
              {SOCIAL_LINKS.github.label}
            </a>
            <a href={SOCIAL_LINKS.email.href} className="header-external-link">
              {SOCIAL_LINKS.email.label}
            </a>
          </div>
        </nav>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-navigation"
          className="mobile-drawer"
          aria-label="Mobile navigation"
        >
          <ul className="mobile-drawer-list">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="mobile-drawer-link"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="mobile-drawer-external">
            <a
              href={SOCIAL_LINKS.linkedin.href}
              target="_blank"
              rel="noreferrer"
              className="text-link"
            >
              {SOCIAL_LINKS.linkedin.label}
            </a>
            <a
              href={SOCIAL_LINKS.github.href}
              target="_blank"
              rel="noreferrer"
              className="text-link"
            >
              {SOCIAL_LINKS.github.label}
            </a>
            <a href={SOCIAL_LINKS.email.href} className="text-link">
              {SOCIAL_LINKS.email.label}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
