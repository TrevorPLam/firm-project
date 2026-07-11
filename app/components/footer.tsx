import { Link } from '../../i18n/navigation';
import { CopyrightYear } from "./copyright-year";
import { motion } from "motion/react";

export function Footer() {
  return (
    <footer className="border-foreground/10 border-t px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-4 text-xl font-bold tracking-tight">
              Elevate Digital
            </div>
            <p className="text-foreground/60 mb-4 max-w-md">
              Transform your digital presence with expert web design, SEO, and
              analytics services. We create experiences that convert visitors
              into customers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                <Link
                  href="/services"
                  className="text-foreground/60 hover:text-foreground transition-colors"
                >
                  Services
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                <Link
                  href="/about"
                  className="text-foreground/60 hover:text-foreground transition-colors"
                >
                  About
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                <Link
                  href="/portfolio"
                  className="text-foreground/60 hover:text-foreground transition-colors"
                >
                  Portfolio
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                <Link
                  href="/pricing"
                  className="text-foreground/60 hover:text-foreground transition-colors"
                >
                  Pricing
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                <Link
                  href="/blog"
                  className="text-foreground/60 hover:text-foreground transition-colors"
                >
                  Blog
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                <Link
                  href="/contact"
                  className="text-foreground/60 hover:text-foreground transition-colors"
                >
                  Contact
                </Link>
              </motion.div>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 font-semibold">Legal</h4>
            <ul className="space-y-2">
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                <Link
                  href="/legal/privacy"
                  className="text-foreground/60 hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                <Link
                  href="/legal/terms"
                  className="text-foreground/60 hover:text-foreground transition-colors"
                >
                  Terms of Service
                </Link>
              </motion.div>
            </ul>
          </div>
        </div>

        <div className="border-foreground/10 flex flex-col items-center justify-center gap-4 border-t pt-8 md:flex-row">
          <div className="text-foreground/60 text-sm">
            © <CopyrightYear /> Elevate Digital. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
