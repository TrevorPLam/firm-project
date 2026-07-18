"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { SearchBar } from "./search-bar";
import { LanguageSwitcher } from "./language-switcher";

export function Navigation() {
  const locale = useLocale();
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
        "a[href], button:not([disabled])",
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
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 border-foreground/10 border-b py-4 backdrop-blur-lg"
          : "bg-background/0 border-b border-transparent py-6 backdrop-blur-none"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
          <Link href="/" className="text-xl font-bold tracking-tight">
            Elevate Digital
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Link
              href="/services"
              className="text-foreground/80 inline-block transition-colors hover:text-foreground"
            >
              Services
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Link
              href="/about"
              className="text-foreground/80 inline-block transition-colors hover:text-foreground"
            >
              About
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Link
              href="/portfolio"
              className="text-foreground/80 inline-block transition-colors hover:text-foreground"
            >
              Portfolio
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Link
              href="/pricing"
              className="text-foreground/80 inline-block transition-colors hover:text-foreground"
            >
              Pricing
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Link
              href="/blog"
              className="text-foreground/80 inline-block transition-colors hover:text-foreground"
            >
              Blog
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Link
              href="/contact"
              className="text-foreground/80 inline-block transition-colors hover:text-foreground"
            >
              Contact
            </Link>
          </motion.div>
          <SearchBar locale={locale} />
          <LanguageSwitcher />
        </div>

        <div className="hidden md:block">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Link
              href="/contact"
              className="rounded-full bg-primary px-6 py-2.5 font-medium text-white transition-colors hover:bg-primary-dark"
            >
              Get Started
            </Link>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          ref={toggleButtonRef}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 md:hidden"
          aria-label="Toggle menu"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          <svg
            className="h-6 w-6"
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
        </motion.button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          ref={menuRef}
          className="border-foreground/10 absolute left-0 right-0 top-full border-b bg-background px-6 py-4 md:hidden"
        >
          <div className="flex flex-col gap-4">
            <Link
              href="/services"
              className="text-foreground/80 py-2 transition-colors hover:text-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/about"
              className="text-foreground/80 py-2 transition-colors hover:text-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/portfolio"
              className="text-foreground/80 py-2 transition-colors hover:text-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Portfolio
            </Link>
            <Link
              href="/pricing"
              className="text-foreground/80 py-2 transition-colors hover:text-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/blog"
              className="text-foreground/80 py-2 transition-colors hover:text-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="text-foreground/80 py-2 transition-colors hover:text-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="flex items-center gap-2 py-2">
              <SearchBar
                locale={locale}
                onClose={() => setIsMobileMenuOpen(false)}
              />
              <LanguageSwitcher />
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href="/contact"
                className="mt-2 rounded-full bg-primary px-6 py-2.5 text-center font-medium text-white transition-colors hover:bg-primary-dark"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </motion.div>
          </div>
        </div>
      )}
    </nav>
  );
}
