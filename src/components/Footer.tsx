// app/components/Footer.tsx
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Smartphone, Mail } from "lucide-react";
import IconSocial from "./ui/IconSocial";

export function Footer() {
  return (
    <footer className="bg-secondary border-t text-primary border-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Store Info */}
        <div className="space-y-4">
          <h1 className="text-2xl text-white font-bold cursor-pointer">
            Saydaliyya
          </h1>
          <p className="text-white">
            We offer a wide range of medicines and health products to help you
            stay healthy and happy. Our team is dedicated to providing you with
            the best service and support.
          </p>
        </div>

        {/* Customer Service */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white hover:font-bold cursor-pointer">
            Help & Support
          </h2>

          {/* ✅ UPDATED LIST */}
          <ul className="space-y-2 text-white">
            <li>
              <Link
                href="/help-and-support/how-to-order"
                className="hover:text-white cursor-pointer hover:font-semibold transition"
              >
                How to Order
              </Link>
            </li>

            <li>
              <Link
                href="/return-policy"
                className="hover:text-white cursor-pointer hover:font-semibold transition"
              >
                Exchange & Return Policy
              </Link>
            </li>

            <li>
              <Link
                href="/payment-options"
                className="hover:text-white cursor-pointer hover:font-semibold transition"
              >
                Payment Options
              </Link>
            </li>

            <li>
              <Link
                href="/contact-us"
                className="hover:text-white cursor-pointer hover:font-semibold transition"
              >
                Contact Us
              </Link>
            </li>

            <li>
              <Link
                href="/contact-us"
                className="hover:text-white cursor-pointer hover:font-semibold transition"
              >
              Privacy Policy
              </Link>
            </li>

            <li>
              <Link
                href="/about-us"
                className="hover:text-white cursor-pointer hover:font-semibold transition"
              >
                About Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Contacts */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold hover:font-bold text-white cursor-pointer">
            Contacts
          </h2>
          <address className="not-italic space-y-4 cursor-pointer transition text-white">
            <div className="flex items-start hover:font-bold transition">
              <MapPin className="mr-2 h-7 w-7 mt-1" />
              <p>Canal Road, Faisalabad, Pakistan</p>
            </div>
            <div className="flex items-center hover:font-bold transition">
              <Phone className="mr-2 h-7 w-7" />
              <p>(41) 456-78-90</p>
            </div>
            <div className="flex items-center hover:font-bold transition">
              <Smartphone className="mr-2 h-7 w-7" />
              <p>+92 3269850071</p>
            </div>
            <div className="flex items-center hover:font-bold transition">
              <Mail className="mr-2 h-7 w-7" />
              <p>alishahzaib3132@gmail.com</p>
            </div>
          </address>
        </div>

        {/* Newsletter */}
        <div className="space-y-4 flex flex-col md:items-start">
          <h2 className="text-lg font-semibold text-white">Newsletter</h2>
          <p className="text-white">
            Join our newsletter and receive 10% off your first purchase.
          </p>
          <div className="space-x-2">
            <IconSocial
              containerstyle="flex lg:gap-6 gap-3 lg:mb-0 mb-10 justify-center md:justify-start"
              iconstyle="w-9 h-9 border border-white rounded-full flex justify-center items-center text-white text-base hover:bg-white hover:text-[#75aa22] hover:transition-all duration-500"
            />
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-12 pt-8 border-t border-white text-center text-gray-500">
        <p className="text-white">
          © {new Date().getFullYear()} Saydaliyya. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
