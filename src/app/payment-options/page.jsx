"use client";

import { useRouter } from "next/navigation";

export default function PaymentOptionsPage() {
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
                Secure Checkout
              </span>
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight pt-2">
                Payment & Delivery Options
              </h1>
            </div>
          </div>

          {/* Content Body */}
          <div className="p-8 sm:p-12 space-y-8">
            
            {/* Top Welcome Alert */}
            <div className="p-5 rounded-2xl bg-[#25671E] border-2 border-[#48A111]/40 text-center text-gray-100 font-medium">
              We provide flexible and convenient payment options to make your shopping experience smooth and secure.
            </div>

            {/* Methods Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Cash on Delivery (COD) */}
              <div className="p-6 rounded-2xl bg-[#25671E] border-2 border-[#48A111]/40 space-y-3 flex flex-col justify-between">
                <div>
                  <h2 className="font-extrabold text-xl text-white flex items-center gap-2">
                    <span>💵</span> 1. Cash on Delivery (COD)
                  </h2>
                  <p className="text-gray-200 text-sm sm:text-base leading-relaxed mt-3">
                    You can place your order and pay in cash at the time of delivery. 
                    Our delivery rider will collect the payment when your order is delivered to your doorstep.
                  </p>
                </div>
                <div className="mt-4 text-xs font-bold text-[#48A111] bg-white px-3 py-1.5 rounded-lg text-center uppercase tracking-wider">
                  No advance payment needed
                </div>
              </div>

              {/* JazzCash / Easypaisa */}
              <div className="p-6 rounded-2xl bg-[#25671E] border-2 border-[#48A111]/40 space-y-3">
                <h2 className="font-extrabold text-xl text-white flex items-center gap-2">
                  <span>📱</span> 2. JazzCash / Easypaisa
                </h2>
                <p className="text-gray-200 text-sm leading-relaxed">
                  If you choose JazzCash or Easypaisa, please follow the steps below:
                </p>
                <ul className="space-y-1.5 text-xs sm:text-sm text-gray-200 list-decimal ml-4">
                  <li>Place your order on our website.</li>
                  <li>Get our payment account number at checkout.</li>
                  <li>Send the payment via JazzCash or Easypaisa.</li>
                  <li>Take a screenshot of the confirmation.</li>
                  <li>Send the screenshot to our <span className="text-green-300 font-bold">WhatsApp</span>.</li>
                  <li>Once verified, your order will be processed.</li>
                </ul>
              </div>

            </div>

            {/* Delivery Information Block */}
            <div className="p-6 rounded-2xl bg-[#25671E] border-2 border-[#48A111] space-y-2">
              <h2 className="font-extrabold text-xl text-white flex items-center gap-2">
                <span>🚛</span> Delivery Information
              </h2>
              <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
                Orders are processed after confirmation and delivered within the estimated delivery time. 
                For prepaid orders (JazzCash/Easypaisa), delivery will be initiated only after payment verification.
              </p>
            </div>

            {/* Important Note (Solid Warning Box) */}
            <div className="p-5 rounded-2xl bg-[#25671E] border-2 border-red-500/40 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-red-500"></div>
              <h2 className="font-extrabold text-lg text-white flex items-center gap-2 ml-2">
                ⚠️ Important Note
              </h2>
              <p className="text-gray-200 text-sm mt-1 ml-2 leading-relaxed">
                Please make sure to send the correct payment screenshot for quick verification. 
                Orders without payment confirmation (in case of prepaid method) may be delayed or cancelled.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}