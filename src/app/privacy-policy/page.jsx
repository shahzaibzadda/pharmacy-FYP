"use client";

import { useRouter } from "next/navigation";

export default function PrivacyPolicyPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#25671E] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Back Button */}
        <div className="mb-8">
          <button
            onClick={() => router.push("/")}
            className="group flex items-center gap-2 px-5 py-2.5 bg-[#48A111] text-white font-medium rounded-xl border border-[#48A111] hover:bg-white hover:text-[#25671E] transition-all duration-200 shadow-xl"
          >
            <span className="transform group-hover:-translate-x-1 transition-transform duration-200">←</span> 
            Back to Store
          </button>
        </div>

        {/* Main Card (Solid Dark Green Background) */}
        <div className="bg-[#1b4e16] rounded-3xl shadow-2xl border-2 border-[#48A111] overflow-hidden">
          
          {/* Header Banner (Solid Primary Green) */}
          <div className="bg-[#48A111] py-16 px-8 text-center text-white border-b-2 border-[#1b4e16]">
            <div className="space-y-2">
              <span className="uppercase tracking-widest text-xs font-bold text-[#1b4e16] bg-white px-4 py-1.5 rounded-full">
                Data Protection
              </span>
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight pt-2">
                Privacy Policy
              </h1>
            </div>
          </div>

          {/* Content Body */}
          <div className="p-8 sm:p-12 space-y-8">
            
            {/* Top Overview Box */}
            <div className="p-5 rounded-2xl bg-[#25671E] border-2 border-[#48A111]/40 text-gray-100 text-sm sm:text-base leading-relaxed">
              At <span className="font-bold text-white">Saydaliyya Pharmacy</span>, we value your trust and are highly committed to protecting your personal data. This Privacy Policy explains how we collect, use, and secure your information when you visit or make a purchase from our store.
            </div>

            {/* 1. Information We Collect */}
            <div className="p-6 rounded-2xl bg-[#25671E] border-2 border-[#48A111]/40 space-y-3">
              <h2 className="font-extrabold text-xl text-white flex items-center gap-2">
                <span>📋</span> 1. Information We Collect
              </h2>
              <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
                When you place an order or create an account, we collect necessary personal details to process your transaction smoothly. This includes:
              </p>
              <ul className="space-y-1.5 text-xs sm:text-sm text-gray-200 list-disc ml-5">
                <li>Your full name and contact information.</li>
                <li>Delivery address for shipping your orders.</li>
                <li>Email address for order confirmations and notifications.</li>
                <li>Payment details and verification documents (like screenshots for custom billing transfers).</li>
              </ul>
            </div>

            {/* 2. How We Use Your Data */}
            <div className="p-6 rounded-2xl bg-[#25671E] border-2 border-[#48A111]/40 space-y-3">
              <h2 className="font-extrabold text-xl text-white flex items-center gap-2">
                <span>⚙️</span> 2. How We Use Your Data
              </h2>
              <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
                Your data helps us offer a seamless shopping experience. We use it strictly to:
              </p>
              <ul className="space-y-1.5 text-xs sm:text-sm text-gray-200 list-disc ml-5">
                <li>Process, package, and safely deliver your pharmaceutical and wellness products.</li>
                <li>Verify your payments quickly for prepaid orders.</li>
                <li>Communicate order status updates or handle any return/exchange queries.</li>
                <li>Improve our inventory and customer service baselines.</li>
              </ul>
            </div>

            {/* 3. Security and Third-Party Sharing */}
            <div className="p-6 rounded-2xl bg-[#25671E] border-2 border-[#48A111]/40 space-y-3">
              <h2 className="font-extrabold text-xl text-white flex items-center gap-2">
                <span>🔒</span> 3. Security & Data Protection
              </h2>
              <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
                We implement robust security measures to keep your personal data completely safe. 
                We <span className="font-bold text-white bg-[#48A111] px-1 rounded">never sell or rent</span> your information to third-party companies. 
                Your information is only shared with authorized delivery operators or payment processors to fulfill your checkout orders.
              </p>
            </div>

            {/* 4. Contact and Updates Block */}
            <div className="p-6 rounded-2xl bg-[#25671E] border-2 border-[#48A111] space-y-4">
              <div>
                <h2 className="font-extrabold text-xl text-white flex items-center gap-2">
                  <span>✉️</span> Privacy Queries
                </h2>
                <p className="text-gray-200 text-sm sm:text-base leading-relaxed mt-2">
                  If you have any questions regarding how your data is handled, want to update your account details, or wish to request data erasure, feel free to contact our privacy desk at:
                </p>
                <span className="font-bold text-white block bg-[#1b4e16] p-2 rounded border border-[#48A111]/20 mt-3 select-all text-center sm:text-left sm:w-max">
                  alishahzaib3132@gmail.com
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}