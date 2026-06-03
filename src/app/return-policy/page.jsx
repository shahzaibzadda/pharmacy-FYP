"use client";

import { useRouter } from "next/navigation";

export default function ReturnPolicyPage() {
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
                Customer Protection
              </span>
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight pt-2">
                Return & Exchange Policy
              </h1>
            </div>
          </div>

          {/* Content Body */}
          <div className="p-8 sm:p-12 space-y-8">
            
            {/* Core Policy Highlight */}
            <div className="p-6 rounded-2xl bg-[#25671E] border-2 border-[#48A111] space-y-4">
              <h2 className="font-extrabold text-xl text-white flex items-center gap-2">
                <span>🛡️</span> Policy Overview
              </h2>
              <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
                My Store is committed to providing fresh and quality products at the time of delivery to ensure customer satisfaction. 
                Products in original, unopened, and un-tampered condition are eligible for exchange or return within <span className="font-bold text-white bg-[#48A111] px-1.5 py-0.5 rounded">7 days</span> from the date of receipt.
              </p>
              <p className="text-sm text-amber-300 font-medium bg-[#1b4e16] p-3 rounded-xl border border-[#48A111]/30">
                ⚠️ <b>Exceptions:</b> This policy does not apply to products purchased on “Special Offer” or fridge items. Opened, used, or damaged items will not be accepted. An original invoice/receipt is mandatory.
              </p>
              <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
                In case of return via courier, the customer will bear the return shipping charges. No charges will be applied if the return is made directly at My Store outlets.
              </p>
            </div>

            {/* Process & Refund Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Process Card */}
              <div className="p-6 rounded-2xl bg-[#25671E] border-2 border-[#48A111]/40 space-y-3">
                <h2 className="font-extrabold text-xl text-white flex items-center gap-2">
                  <span>🔄</span> Return Process
                </h2>
                <div className="space-y-3 text-sm text-gray-200 leading-relaxed">
                  <p>
                    1. Inform us within 7 days by emailing: <br />
                    <span className="font-bold text-white block bg-[#1b4e16] p-2 rounded border border-[#48A111]/20 mt-1 select-all">alishahzaib3132@gmail.com</span>
                  </p>
                  <p>
                    2. Ship to our store address after confirmation: <br />
                    <span className="font-bold text-white block bg-[#1b4e16] p-2 rounded border border-[#48A111]/20 mt-1">
                      My Store (Canal Road, Faisalabad, Pakistan)
                    </span>
                  </p>
                  <p>
                    3. Ensure the original invoice is inside the parcel. Process takes 3 working days.
                  </p>
                </div>
              </div>

              {/* Refund Card */}
              <div className="p-6 rounded-2xl bg-[#25671E] border-2 border-[#48A111]/40 space-y-3 flex flex-col justify-between">
                <div>
                  <h2 className="font-extrabold text-xl text-white flex items-center gap-2">
                    <span>💰</span> Refund Policy
                  </h2>
                  <div className="space-y-3 text-sm text-gray-200 leading-relaxed mt-3">
                    <p>
                      <b>Courier Returns:</b> Refund will be transferred directly to the customer’s bank account after receiving your bank details via email.
                    </p>
                    <p>
                      <b>Store Returns:</b> For returns made at our physical outlets, refunds will also be safely processed via bank transfer after due verification.
                    </p>
                  </div>
                </div>

                {/* Contact Sub-block */}
                <div className="pt-4 border-t border-[#48A111]/30 mt-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-300 block mb-1">
                    Have Queries?
                  </span>
                  <p className="text-xs text-gray-200">
                    Contact us anytime at: <span className="font-bold text-white select-all">alishahzaib3132@gmail.com</span>
                  </p>
                </div>

              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}