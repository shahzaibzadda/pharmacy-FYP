"use client";

import { useRouter } from "next/navigation";

export default function PaymentOptionsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-r from-[var(--color-primary)] via-green-600 to-[var(--color-secondary)] py-10 px-4">

       <div className="max-w-4xl border-1 mx-auto bg-gradient-to-br from-[#6dea54] to-[#4d9243] text-black shadow-xl rounded-2xl p-8">

        {/* Back Button */}
        <button
          onClick={() => router.push("/")}
          className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800"
        >
          ← Back to Store
        </button>

        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          Payment & Delivery Options
        </h1>

        <div className="space-y-6 text-gray-700 leading-relaxed">


          <div className="p-4  bg-green-50 rounded-lg">
            <p>
            We provide flexible and convenient payment options to make your shopping experience smooth and secure.
          </p>
          </div>

          {/* COD */}
          <div className="p-4 border-l-4 border-green-500 bg-green-50 rounded-lg">
            <h2 className="font-bold text-lg">1. Cash on Delivery (COD)</h2>
            <p>
              You can place your order and pay in cash at the time of delivery.
              Our delivery rider will collect the payment when your order is delivered to your doorstep.
            </p>
          </div>

          {/* JazzCash / Easypaisa */}
          <div className="p-4 border-l-4 border-blue-500 bg-blue-50 rounded-lg">
            <h2 className="font-bold text-lg">2. JazzCash / Easypaisa</h2>
            <p>
              If you choose JazzCash or Easypaisa, please follow the steps below:
            </p>

            <ul className="list-disc ml-5 mt-2 space-y-2">
              <li>Place your order on our website.</li>
              <li>After placing the order, you will be provided with our payment account number.</li>
              <li>Send the payment using JazzCash or Easypaisa.</li>
              <li>Take a screenshot of the payment confirmation.</li>
              <li>Send the screenshot to our WhatsApp number for verification.</li>
              <li>Once your payment is verified, your order will be processed and delivered.</li>
            </ul>
          </div>

          {/* Delivery Info */}
          <div className="p-4 border-l-4 border-purple-500 bg-purple-50 rounded-lg">
            <h2 className="font-bold text-lg">Delivery Information</h2>
            <p>
              Orders are processed after confirmation and delivered within the estimated delivery time.
              For prepaid orders (JazzCash/Easypaisa), delivery will be initiated only after payment verification.
            </p>
          </div>

          {/* Note */}
          <div className="p-4 border-l-4 border-red-500 bg-red-50 rounded-lg">
            <h2 className="font-bold text-lg">Important Note</h2>
            <p>
              Please make sure to send the correct payment screenshot for quick verification.
              Orders without payment confirmation (in case of prepaid method) may be delayed or cancelled.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}