"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export default function ContactPage() {
  const router = useRouter();
  const form = useRef();
  const [loading, setLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "service_xm62smd",   // 🔴 replace
        "template_mkb2879",  // 🔴 replace
        form.current,
        "bc02lGMCwWTGyHl5L"    // 🔴 replace
      )
      .then(
        () => {
          setLoading(false);
          alert("Message sent successfully!");
          form.current.reset();
        },
        () => {
          setLoading(false);
          alert("Failed to send message. Try again.");
        }
      );
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[var(--color-secondary)] via-green-600 to-[var(--color-primary)] py-10 px-4">

      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden flex flex-col md:flex-row">

        {/* LEFT SIDE - FORM */}
        <div className="w-full md:w-1/2 p-8 border-r border-gray-200">

          <h1 className="text-2xl font-bold text-green-500 mb-4">
            SEND US A MESSAGE
          </h1>

          <p className="text-gray-600 mb-6">
            Your comments and suggestions will be appreciated. Please complete the form below.
          </p>

          <form ref={form} onSubmit={sendEmail} className="space-y-4">

            <input
              type="text"
              name="user_name"
              placeholder="Your Name (required)"
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            <input
              type="email"
              name="user_email"
              placeholder="Your Email (required)"
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            <input
              type="text"
              name="user_phone"
              placeholder="Your Phone Number"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            <textarea
              name="message"
              rows="5"
              placeholder="Your Message"
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            ></textarea>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 text-white py-3 rounded-lg transition-all duration-300 hover:bg-green-700"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

          </form>
        </div>

        {/* RIGHT SIDE - INFO */}
        <div className="w-full md:w-1/2 p-8 bg-secondary">

          <h2 className="text-xl font-bold text-white mb-4">
            CONTACT INFORMATION
          </h2>

          <p className="text-white mb-6">
            We love to hear from you on our customer service, products, website or any topics you want to share with us.
          </p>

          <div className="space-y-4 text-white">

            <p>📍 101-B/III MM Alam Rd, Block B3, Gulberg III, Lahore</p>
            <p>📞 03400687687</p>
            <p>📧 contact@myvitaminstore.pk</p>

            {/* Back Button */}
            <button
              onClick={() => router.push("/")}
              className="mt-4 px-4 py-2 bg-white text-green-600 rounded shadow-md transition-all duration-300 hover:bg-green-700 hover:text-white hover:shadow-[0_10px_25px_rgba(0,0,0,0.2)] hover:-translate-y-1"
            >
              ← Back to Store
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}