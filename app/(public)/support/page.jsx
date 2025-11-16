'use client';

export default function SupportPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-[1300px] mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
          Customer Support
        </h1>
        <p className="text-center text-gray-600 mb-10 text-lg">
          We’re here to help you with any questions or issues regarding your orders, products, or services. 
          Browse our resources below or contact us directly at{' '}
          <a href="mailto:support@Quickfynd.com" className="text-orange-600 underline">
            support@Quickfynd.com
          </a>
          . Our team is committed to providing fast and friendly support for all customers.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          
          <a
            href="/faq"
            className="block bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all"
          >
            <h2 className="font-semibold text-gray-900 text-lg mb-2">Read FAQs</h2>
            <p className="text-gray-600 text-sm">
              Find quick answers to common questions about products, orders, delivery, payments, and more. 
              Our FAQ section helps you save time with step-by-step guidance.
            </p>
          </a>

          <a
            href="mailto:support@Quickfynd.com"
            className="block bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all"
          >
            <h2 className="font-semibold text-gray-900 text-lg mb-2">Email Support</h2>
            <p className="text-gray-600 text-sm">
              Contact our support team for personalized assistance regarding your orders, returns, payments, or any other issues. 
              We usually respond within 24–48 hours.
            </p>
          </a>

          <a
            href="/return-policy"
            className="block bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all"
          >
            <h2 className="font-semibold text-gray-900 text-lg mb-2">Return & Replacement Policy</h2>
            <p className="text-gray-600 text-sm">
              Learn about our return and replacement eligibility, timelines, and procedures. 
              Ensure your products meet criteria for smooth refunds or replacements.
            </p>
          </a>

          <a
            href="/shipping-policy"
            className="block bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all"
          >
            <h2 className="font-semibold text-gray-900 text-lg mb-2">Shipping & Delivery Policy</h2>
            <p className="text-gray-600 text-sm">
              Understand our shipping methods, delivery timelines, fees, and tracking procedures. 
              Quickfynd ensures timely delivery across Kerala and other serviceable areas.
            </p>
          </a>

          <a
            href="/terms-conditions"
            className="block bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all"
          >
            <h2 className="font-semibold text-gray-900 text-lg mb-2">Terms & Conditions</h2>
            <p className="text-gray-600 text-sm">
              Review the rules and guidelines for using Quickfynd.com, including account responsibilities, order management, and liability.
            </p>
          </a>

          <a
            href="/privacy-policy"
            className="block bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all"
          >
            <h2 className="font-semibold text-gray-900 text-lg mb-2">Privacy Policy</h2>
            <p className="text-gray-600 text-sm">
              Learn how we collect, store, and protect your personal information. 
              Quickfynd.com follows strict guidelines to maintain data security and privacy.
            </p>
          </a>
          
        </div>
      </div>
    </div>
  );
}
