"use client";

import { useRouter } from "next/navigation";

export default function HowToOrderPage() {
  const router = useRouter();

  // Steps data array for professional mapping
  const steps = [
    { num: "01", title: "Browse Products", desc: "Select medicines or products from our store.", icon: "🔍" },
    { num: "02", title: "Add to Cart", desc: "Add your selected items to the shopping cart.", icon: "🛒" },
    { num: "03", title: "Go to Checkout", desc: "Click checkout and fill your shipping details.", icon: "📋" },
    { num: "04", title: "Choose Payment Method", desc: "Pay using Cash on Delivery or Card (Stripe).", icon: "💳" },
    { num: "05", title: "Place Order", desc: "Confirm your order and wait for delivery.", icon: "📦" },
  ];

  return (
    <div className="min-h-screen bg-[#25671E] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Back to Store Button */}
        <div className="mb-8">
          <button
            onClick={() => router.push("/")}
            className="group flex items-center gap-2 px-5 py-2.5 bg-[#48A111] text-white font-medium rounded-xl border border-[#48A111] hover:bg-white hover:text-[#25671E] transition-all duration-200 shadow-xl"
          >
            <span className="transform group-hover:-translate-x-1 transition-transform duration-200">←</span> 
            Back to Store
          </button>
        </div>

        {/* Main Card (Solid Deep Green) */}
        <div className="bg-[#1b4e16] rounded-3xl shadow-2xl border-2 border-[#48A111] overflow-hidden">
          
          {/* Header Banner (Solid Primary Green) */}
          <div className="bg-[#48A111] py-16 px-8 text-center text-white border-b-2 border-[#1b4e16]">
            <div className="space-y-2">
              <span className="uppercase tracking-widest text-xs font-bold text-[#1b4e16] bg-white px-4 py-1.5 rounded-full">
                Easy Step-by-Step Guide
              </span>
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight pt-2">
                How to Order
              </h1>
            </div>
          </div>

          {/* Content Body */}
          <div className="p-8 sm:p-12 space-y-8">
            
            <p className="text-center text-gray-200 max-w-xl mx-auto mb-6 text-base sm:text-lg">
              Follow these simple steps to place your order and get your healthcare products delivered right to your doorstep.
            </p>

            {/* Vertical Flow Steps Container */}
            <div className="space-y-4 relative">
              {steps.map((step, index) => (
                <div 
                  key={index} 
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-6 rounded-2xl bg-[#25671E] border-2 border-[#48A111]/40 hover:border-[#48A111] hover:shadow-xl transition-all duration-300"
                >
                  {/* Step Badge & Number */}
                  <div className="flex items-center gap-3 w-full sm:w-auto shrink-0 border-b border-[#48A111]/30 sm:border-b-0 pb-3 sm:pb-0">
                    <span className="text-xs font-black text-[#1b4e16] bg-[#48A111] px-2.5 py-1 rounded-md">
                      STEP
                    </span>
                    <span className="text-3xl font-black text-white/40 tracking-tight">
                      {step.num}
                    </span>
                  </div>

                  {/* Icon Frame */}
                  <div className="text-2xl bg-[#1b4e16] w-12 h-12 rounded-xl flex items-center justify-center border border-[#48A111]/30 shrink-0 hidden sm:flex">
                    {step.icon}
                  </div>

                  {/* Text Details */}
                  <div className="flex-1">
                    <h2 className="font-extrabold text-xl text-white tracking-tight flex items-center gap-2">
                      <span className="sm:hidden">{step.icon}</span> {/* Mobile icon placeholder */}
                      {step.title}
                    </h2>
                    <p className="text-gray-200 text-sm sm:text-base mt-0.5 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Accent Banner */}
            <div className="bg-[#25671E] rounded-2xl p-6 border-2 border-[#48A111] text-center mt-8">
              <p className="text-sm text-gray-200 font-medium">
                Need help with your order? Our support team is always available to assist you.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}