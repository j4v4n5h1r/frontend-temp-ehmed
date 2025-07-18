"use client";
import Link from "next/link";

export default function GlassNav() {
  return (
    <div className="hidden lg:flex items-center justify-center bg-white/75 backdrop-blur-md rounded-2xl shadow-lg px-4 py-2">
      <div className="flex items-center gap-6 xl:gap-8">
        <Link
          href="/how-to-use"
          className="text-neutral-700 hover:text-primary-600 font-medium text-sm xl:text-base px-3 py-2 rounded-lg hover:bg-primary-50 transition-all duration-200 whitespace-nowrap"
        >
          How to use
        </Link>

        <Link
          href="/locations"
          className="text-neutral-700 hover:text-primary-600 font-medium text-sm xl:text-base px-3 py-2 rounded-lg hover:bg-primary-50 transition-all duration-200 whitespace-nowrap"
        >
          Locations
        </Link>

        <Link
          href="/pricing"
          className="text-neutral-700 hover:text-primary-600 font-medium text-sm xl:text-base px-3 py-2 rounded-lg hover:bg-primary-50 transition-all duration-200 whitespace-nowrap"
        >
          Pricing
        </Link>

        <Link
          href="/about"
          className="text-neutral-700 hover:text-primary-600 font-medium text-sm xl:text-base px-3 py-2 rounded-lg hover:bg-primary-50 transition-all duration-200 whitespace-nowrap"
        >
          About Us
        </Link>
      </div>
    </div>
  );
}
