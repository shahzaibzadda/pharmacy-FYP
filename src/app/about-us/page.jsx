"use client";

import { useRouter } from "next/navigation";

export default function AboutPage() {
  const router = useRouter();

  // What We Offer cards structure
  const offers = [
    { title: "Medicines", desc: "Genuine and trusted pharmaceutical products", icon: "💊" },
    { title: "Vitamins Supplements", desc: "Health boosters for daily wellness and immunity", icon: "🌿" },
    { title: "Medicated Cosmetics", desc: "Dermatologist recommended skincare solutions", icon: "✨" },
    { title: "Surgical Support Braces", desc: "Orthopedic and recovery support products", icon: "🩼" },
    { title: "Medical Devices", desc: "Reliable tools for home healthcare monitoring", icon: "🩺" },
    { title: "Personal Care", desc: "Daily hygiene and grooming essentials", icon: "🧼" },
    { title: "Skin Care", desc: "Quality skincare products for healthy and glowing skin", icon: "🧴" },
  ];

  return (
    <div className="min-h-screen bg-[#25671E] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
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
                Trusted Healthcare Partner
              </span>
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight pt-2">
                About Our Pharmacy
              </h1>
            </div>
          </div>

          {/* Content Body */}
          <div className="p-8 sm:p-12 space-y-12">
            
            {/* Welcome Intro */}
            <div className="max-w-3xl mx-auto text-center space-y-5">
              <p className="text-2xl text-white leading-relaxed font-bold">
                Welcome to <span className="text-[#48A111] bg-white px-3 py-1 rounded-lg inline-block sm:inline">Saydaliyya Pharmacy</span>, 
                your premium online pharmacy and wellness store.
              </p>
              <p className="text-gray-200 leading-relaxed text-base sm:text-lg">
                Our goal is to make healthcare and wellness products easily accessible to everyone with genuine quality and fast delivery service. We carefully ensure that every product meets safety and authenticity standards.
              </p>
            </div>

            <div className="border-t-2 border-[#48A111]/30" />

            {/* What We Offer Section */}
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">What We Offer</h2>
                <p className="text-gray-300 text-sm mt-1">Explore our wide range of premium healthcare categories</p>
              </div>

              {/* Solid Grid Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
                {offers.map((item, index) => (
                  <div 
                    key={index} 
                    className="p-6 rounded-2xl bg-[#25671E] border-2 border-[#48A111]/40 hover:border-[#48A111] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="text-4xl mb-4 bg-[#1b4e16] w-14 h-14 rounded-xl flex items-center justify-center border border-[#48A111]/30">
                      {item.icon}
                    </div>
                    <h3 className="font-extrabold text-white text-lg mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-200 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t-2 border-[#48A111]/30" />

            {/* Our Commitment Box (Solid Accent Box) */}
            <div className="bg-[#25671E] rounded-2xl p-6 sm:p-8 border-2 border-[#48A111]">
              <h2 className="font-extrabold text-xl text-white mb-4 flex items-center gap-2.5">
                <span className="text-2xl">🛡️</span> Our Commitment
              </h2>
              <div className="grid sm:grid-cols-2 gap-6 text-gray-200 text-base leading-relaxed">
                <p>
                  At <span className="font-bold text-[#48A111] bg-white px-1.5 py-0.5 rounded">Saydaliyya Pharmacy</span>, we focus on customer satisfaction, product quality, and reliable service. We ensure safe packaging, fast delivery, and easy return policies for a smooth shopping experience.
                </p>
                <p>
                  Your health and trust are our top priority, and we continuously work to improve our services for you. We stand firmly behind the authenticity of everything we deliver.
                </p>
              </div>
            </div>

            {/* LICENSE SECTION */}
            <div className="border-t-2 border-[#48A111]/30 pt-10">
              <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center justify-center gap-2.5">
                  <span>📜</span> Pharmacy License
                </h2>
                <p className="text-gray-200 text-sm sm:text-base">
                  Saydaliyya Pharmacy is a registered and licensed healthcare provider, committed to delivering authentic and trusted pharmaceutical products.
                </p>
              </div>

              {/* License Image Wrapper */}
              <div className="flex justify-center">
                <div className="bg-[#25671E] p-4 rounded-2xl border-2 border-[#48A111] shadow-2xl">
                  <div className="overflow-hidden rounded-xl bg-white p-2">
                    <img
                      src="/assets/license/license1.jpeg"
                      alt="Pharmacy License"
                      className="w-full max-w-md rounded-lg object-cover mx-auto"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}