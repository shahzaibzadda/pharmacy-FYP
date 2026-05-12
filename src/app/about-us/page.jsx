"use client";

import { useRouter } from "next/navigation";

export default function AboutPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-r from-[var(--color-primary)] via-green-600 to-[var(--color-secondary)] py-10 px-4">
      <div className="max-w-4xl border-1 mx-auto bg-gradient-to-br bg-white text-black shadow-xl rounded-2xl p-8">
        {/* Back Button */}
        <button
          onClick={() => router.push("/")}
          className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800"
        >
          ← Back to Store
        </button>

        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          About Us
        </h1>

        <div className="space-y-5 text-gray-700 leading-relaxed">
          <p>
            Welcome to{" "}
            <span className="font-semibold">Saydaliyya Pharmacy</span>, your
            trusted online pharmacy and wellness store. We are committed to
            providing high-quality healthcare, beauty, and personal care
            products at affordable prices.
          </p>

          <p>
            Our goal is to make healthcare and wellness products easily
            accessible to everyone with genuine quality and fast delivery
            service. We carefully ensure that every product meets safety and
            authenticity standards.
          </p>

          <h2 className="font-bold text-lg mt-4">What We Offer</h2>

          <ul className="list-disc ml-5 space-y-2">
            <li>
              <b>Medicines:</b> Genuine and trusted pharmaceutical products
            </li>

            <li>
              <b>Vitamins Supplements:</b> Health boosters for daily wellness
              and immunity
            </li>

            <li>
              <b>Medicated Cosmetics:</b> Dermatologist recommended skincare
              solutions
            </li>

            <li>
              <b>Surgical Support Braces:</b> Orthopedic and recovery support
              products
            </li>

            <li>
              <b>Medical Devices:</b> Reliable tools for home healthcare
              monitoring
            </li>

            <li>
              <b>Personal Care:</b> Daily hygiene and grooming essentials
            </li>

            <li>
              <b>Skin Care:</b> Quality skincare products for healthy and
              glowing skin
            </li>
          </ul>

          <h2 className="font-bold text-lg mt-4">Our Commitment</h2>

          <p>
            At My Vitamin Store, we focus on customer satisfaction, product
            quality, and reliable service. We ensure safe packaging, fast
            delivery, and easy return policies for a smooth shopping experience.
          </p>

          <p>
            Your health and trust are our top priority, and we continuously work
            to improve our services for you.
          </p>
          {/* LICENSE SECTION */}
          <div className="mt-10 border-t pt-8">
            <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
              Pharmacy License
            </h2>

            <p className="text-center text-gray-600 mb-6">
              Saydaliyya Pharmacy is a registered and licensed healthcare
              provider, committed to delivering authentic and trusted
              pharmaceutical products.
            </p>

            <div className="flex justify-center">
              <div className="bg-white p-4 rounded-xl shadow-lg border hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] transition duration-300">
                <img
                  src="/assets/license/license.png"
                  alt="Pharmacy License"
                  className="w-full max-w-md rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
