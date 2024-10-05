"use client";

import { useState } from "react";
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

export default function MobileNav() {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  const toggleMobileNav = () => setMobileNavOpen(!isMobileNavOpen);
  const closeMobileNav = () => setMobileNavOpen(false);

  return (
    <div className="md:hidden">
      {/* Mobile Navigation Toggle Button */}
      <button
        onClick={toggleMobileNav}
        aria-label="Toggle navigation"
        className="text-white"
      >
        {isMobileNavOpen ? (
          <XMarkIcon className="w-8 h-8" />
        ) : (
          <Bars3Icon className="w-8 h-8" />
        )}
      </button>

      {/* Mobile Navigation Menu */}
      <div
        className={`fixed inset-0 bg-blue-500 z-50 transition-transform transform ${
          isMobileNavOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 flex justify-between items-center">
          {/* Close button */}
          <button
            onClick={closeMobileNav}
            aria-label="Close navigation"
            className="text-white"
          >
            <XMarkIcon className="w-8 h-8" />
          </button>
        </div>

        <nav className="flex flex-col items-center space-y-4 p-4 text-white">
          <Link
            href="/job-seeker/jobs"
            onClick={closeMobileNav}
            className="hover:text-gray-200"
          >
            Find Job
          </Link>
          <Link
            href="/talents"
            onClick={closeMobileNav}
            className="hover:text-gray-200"
          >
            Find Talent
          </Link>
          <Link
            href="/register"
            onClick={closeMobileNav}
            className="hover:text-gray-200"
          >
            Register
          </Link>
          <Link
            href="/login"
            onClick={closeMobileNav}
            className="hover:text-gray-200"
          >
            Login
          </Link>
        </nav>
      </div>
    </div>
  );
}
