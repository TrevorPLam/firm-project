"use client";

import { useEffect, useRef, useState } from "react";

interface UseScrollRevealOptions {
  delay?: number;
}

interface ScrollRevealProps extends UseScrollRevealOptions {
  children: React.ReactNode;
  className?: string;
}

export function useScrollReveal({ delay = 0 }: UseScrollRevealOptions = {}) {
  const [isVisible, setIsVisible] = useState(true); // Default visible for progressive enhancement
  const [isEnhanced, setIsEnhanced] = useState(false); // Track if JS enhancement has run
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // If user prefers reduced motion, keep content visible and skip animation
    if (prefersReducedMotion) {
      return;
    }

    // Check if IntersectionObserver is available
    if (typeof IntersectionObserver === "undefined") {
      return;
    }

    // JS enhancement: hide content initially, then reveal on scroll
    // Use requestAnimationFrame to ensure initial render shows visible content first
    const rafId = requestAnimationFrame(() => {
      setIsEnhanced(true);
      setIsVisible(false);
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      cancelAnimationFrame(rafId);
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [delay]);

  return { ref, isVisible, isEnhanced };
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
}: ScrollRevealProps) {
  const { ref, isVisible, isEnhanced } = useScrollReveal({ delay });

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isEnhanced
          ? isVisible
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-8 scale-95 opacity-0"
          : "translate-y-0 scale-100 opacity-100"
      } ${className}`}
    >
      {children}
    </div>
  );
}
