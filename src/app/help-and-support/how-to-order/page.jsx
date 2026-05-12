"use client";

import { useRouter } from "next/navigation";

export default function HowToOrderPage() {
  const router = useRouter();

  return (
   <div className="min-h-screen bg-gradient-to-r from-[var(--color-primary)] via-green-600 to-[var(--color-secondary)] py-10 px-4">

      <div className="max-w-4xl border-1 mx-auto bg-gradient-to-br from-[#6dea54] to-[#4d9243] text-black shadow-xl rounded-2xl p-8">

        {/* Back to Store Button */}
        <button
          onClick={() => router.push("/")}
          className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800"
        >
          ← Back to Store
        </button>

        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          How to Order
        </h1>

        <div className="space-y-6">

          {/* Step 1 */}
          <div className="p-4 border-l-4 border-blue-500 bg-blue-50 rounded-lg">
            <h2 className="font-bold text-lg">1. Browse Products</h2>
            <p>Select medicines or products from our store.</p>
          </div>

          {/* Step 2 */}
          <div className="p-4 border-l-4 border-green-500 bg-green-50 rounded-lg">
            <h2 className="font-bold text-lg">2. Add to Cart</h2>
            <p>Add your selected items to the shopping cart.</p>
          </div>

          {/* Step 3 */}
          <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50 rounded-lg">
            <h2 className="font-bold text-lg">3. Go to Checkout</h2>
            <p>Click checkout and fill your shipping details.</p>
          </div>

          {/* Step 4 */}
          <div className="p-4 border-l-4 border-purple-500 bg-purple-50 rounded-lg">
            <h2 className="font-bold text-lg">4. Choose Payment Method</h2>
            <p>Pay using Cash on Delivery or Card (Stripe).</p>
          </div>

          {/* Step 5 */}
          <div className="p-4 border-l-4 border-red-500 bg-red-50 rounded-lg">
            <h2 className="font-bold text-lg">5. Place Order</h2>
            <p>Confirm your order and wait for delivery.</p>
          </div>

        </div>
      </div>
    </div>
  );
}