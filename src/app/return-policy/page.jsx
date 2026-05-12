"use client";

import { useRouter } from "next/navigation";

export default function ReturnPolicyPage() {
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
          Return & Exchange Policy
        </h1>

        <div className="space-y-5 text-gray-700 leading-relaxed">

          <p>
            My Store is committed to providing fresh and quality products at the time of delivery to ensure customer satisfaction.
            Products in original, unopened, and un-tampered condition are eligible for exchange or return within 7 days from the date of receipt.
            This policy does not apply to products purchased on “Special Offer” or fridge items. Opened, used, or damaged items will not be accepted for return or exchange.
            An original invoice/receipt is mandatory and must be provided with the returned item(s).
          </p>

          <p>
            In case of return via courier, the customer will bear the return shipping charges. No charges will be applied if the return is made directly at My Store outlets.
          </p>

          <h2 className="font-bold text-lg mt-4">Return / Exchange Process</h2>

          <p>
            Customers must inform us within 7 days of receiving the product by sending an email to
            <span className="font-semibold"> alishahzaib3132@gmail.com </span>
            with the order number in the subject line.
          </p>

          <p>
            After confirmation, the product must be shipped to our store address:
            <br />
            <span className="font-semibold">
              My Store (Canal Road, Faisalabad, Pakistan)
            </span>
          </p>

          <p>
            Please ensure the original invoice is included in the return parcel. Once received, the return will be processed within 3 working days.
          </p>

          <h2 className="font-bold text-lg mt-4">Refund Policy</h2>

          <p>
            For courier returns, refund will be transferred to the customer’s bank account after receiving details via email.
            For store returns, refund will also be processed via bank transfer after verification.
          </p>

          <h2 className="font-bold text-lg mt-4">Contact Information</h2>

          <p>
            For any queries or issues, contact us at:
            <span className="font-semibold"> alishahzaib3132@gmail.com </span>
          </p>

        </div>
      </div>
    </div>
  );
}