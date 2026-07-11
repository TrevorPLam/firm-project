"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle Escape key to close menu and return focus to toggle button
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        toggleButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMobileMenuOpen]);

  // Move focus into menu when opened
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    // Small delay to ensure menu is rendered
    const timer = setTimeout(() => {
      const firstLink = menuRef.current?.querySelector("a");
      firstLink?.focus();
    }, 0);

    return () => clearTimeout(timer);
  }, [isMobileMenuOpen]);

  // Focus trap within menu when open
  useEffect(() => {
    if (!isMobileMenuOpen || !menuRef.current) return;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const focusableElements = menuRef.current?.querySelectorAll(
        'a[href], button:not([disabled])'
      );
      if (!focusableElements || focusableElements.length === 0) return;

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement;

      if (e.shiftKey) {
        // Shift+Tab: if on first element, move to last
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab: if on last element, move to first
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, [isMobileMenuOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-foreground/10 py-4"
          : "bg-background/0 backdrop-blur-none border-b border-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight">
          Elevate Digital
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/services"
            className="text-foreground/80 hover:text-foreground transition-colors hover:scale-105 transform inline-block"
          >
            Services
          </Link>
          <Link
            href="/about"
            className="text-foreground/80 hover:text-foreground transition-colors hover:scale-105 transform inline-block"
          >
            About
          </Link>
          <Link
            href="/portfolio"
            className="text-foreground/80 hover:text-foreground transition-colors hover:scale-105 transform inline-block"
          >
            Portfolio
          </Link>
          <Link
            href="/pricing"
            className="text-foreground/80 hover:text-foreground transition-colors hover:scale-105 transform inline-block"
          >
            Pricing
          </Link>
          <Link
            href="/blog"
            className="text-foreground/80 hover:text-foreground transition-colors hover:scale-105 transform inline-block"
          >
            Blog
          </Link>
          <Link
            href="/contact"
            className="text-foreground/80 hover:text-foreground transition-colors hover:scale-105 transform inline-block"
          >
            Contact
          </Link>
        </div>

        <div className="hidden md:block">
          <Link
            href="/contact"
            className="px-6 py-2.5 bg-primary text-white rounded-full font-medium hover:bg-primary-dark transition-all hover:scale-105"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          ref={toggleButtonRef}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div ref={menuRef} className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-foreground/10 py-4 px-6">
          <div className="flex flex-col gap-4">
            <Link
              href="/services"
              className="text-foreground/80 hover:text-foreground transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/about"
              className="text-foreground/80 hover:text-foreground transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/portfolio"
              className="text-foreground/80 hover:text-foreground transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Portfolio
            </Link>
            <Link
              href="/pricing"
              className="text-foreground/80 hover:text-foreground transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/blog"
              className="text-foreground/80 hover:text-foreground transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="text-foreground/80 hover:text-foreground transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/contact"
              className="px-6 py-2.5 bg-primary text-white rounded-full font-medium hover:bg-primary-dark transition-colors text-center mt-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
