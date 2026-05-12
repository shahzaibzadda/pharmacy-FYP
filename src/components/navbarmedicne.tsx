"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavbarMedicine = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const categories = [
    { name: "Medicines", slug: "medicines" },
    // { name: "Baby & Child", slug: "baby-child" },
    { name: "Electronics", slug: "electronics" },
    { name: "Vitamins & Supplements", slug: "vitamins-supplements" },
    { name: "Medicated Cosmetics", slug: "medicated-cosmetics" },
    { name: "Surgical Support Braces", slug: "surgical-support-braces" },
    { name: "Medical Devices", slug: "medical-devices" },
    { name: "Personal Care", slug: "personal-care" },
    { name: "Skin Care", slug: "skin-care" },
  ];

  const getCategoryLink = (slug: string) => {
    return `/store/${slug}`;
  };

  return (
    <div>
      {/* Desktop Navigation */}
      <nav className="bg-secondary hidden md:block">
        <div className=" mx-auto px-2">
          <ul className="flex overflow-x-auto py-2 items-center justify-between hide-scrollbar">
            {/* PRODUCTS SECTION */}
            <div className="flex items-center gap-2 lg:gap-4">
              {categories.map((category, index) => {
                const link = getCategoryLink(category.slug);
                const isActive = pathname?.startsWith(link);

                return (
                  <li key={index} className="whitespace-nowrap">
                    <Link
                      href={link}
                      className={`px-3 py-1 text-sm hover:bg-primary hover:text-secondary rounded transition block ${
                        isActive ? "bg-primary text-secondary" : ""
                      }`}
                    >
                      {category.name}
                    </Link>
                  </li>
                );
              })}
            </div>

            {/* BORDER */}
            <div className="h-6 w-px bg-white/40 mx-4 shadow-[0_0_10px_rgba(255,255,255,0.4)]"></div>

            {/* ABOUT / CONTACT SECTION */}
            <div className="flex items-center gap-3 whitespace-nowrap">
              <Link
                href="/about-us"
                className="px-3 py-1 text-sm hover:bg-primary hover:text-secondary rounded transition block"
              >
                About Us
              </Link>
              <Link
                href="/contact-us"
                className="px-3 py-1 text-sm hover:bg-primary hover:text-secondary rounded transition block"
              >
                Contact Us
              </Link>
            </div>
          </ul>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="bg-[#48A111] text-white px-4 py-2 w-full text-left"
        >
          Categories
        </button>

        {isMenuOpen && (
          <ul className="bg-teal-700">
            {/* CATEGORY LINKS */}
            {categories.map((category, index) => {
              const link = getCategoryLink(category.slug);

              return (
                <li key={index}>
                  <Link
                    href={link}
                    className="block px-6 py-3 hover:bg-teal-600 transition text-white"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                </li>
              );
            })}

            {/* BORDER */}
            <div className="border-t border-white/30 mx-4"></div>

            {/* ABOUT / CONTACT */}
            <li>
              <Link
                href="/about-us"
                className="block px-6 py-3 hover:bg-teal-600 transition text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/contact-us"
                className="block px-6 py-3 hover:bg-teal-600 transition text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default NavbarMedicine;
