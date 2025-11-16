'use client';

export default function FAQPage() {
  const faqs = [
    {
      q: 'What is Quickfynd.com?',
      a: 'Quickfynd.com is a trusted online marketplace offering a wide range of products across multiple categories, including electronics, fashion, home essentials, and lifestyle items. We aim to provide high-quality products at competitive prices with fast delivery.'
    },
    {
      q: 'How do I track my order?',
      a: 'You can track your orders by visiting the "My Orders" section from your profile menu. Quickfynd.com provides real-time updates including shipping status, estimated delivery date, and tracking links where available.'
    },
    {
      q: 'What is the return and replacement policy?',
      a: 'Most items are eligible for return within 7 days of delivery and replacement within 15 days, depending on product eligibility. Items must be unused, with original tags and packaging. Check the Return & Replacement Policy page for complete instructions.'
    },
    {
      q: 'How do I contact support?',
      a: 'You can contact our support team via the Support page or directly by email at support@Quickfynd.com. We typically respond within 24–48 hours to assist with any questions regarding orders, payments, or products.'
    },
    {
      q: 'Are payments secure on Quickfynd.com?',
      a: 'Yes. All payments are processed using trusted and encrypted payment gateways. Your card and personal information are never shared with third parties, ensuring a safe and secure shopping experience.'
    },
    {
      q: 'What are the delivery timelines?',
      a: 'Delivery timelines vary depending on product type and location. Most orders within Kerala are delivered within 2–3 business days. For other regions, estimated delivery times will be shown at checkout.'
    },
    {
      q: 'Can I cancel or modify my order?',
      a: 'Orders can be canceled or modified before they are processed and shipped. Once the order is shipped, cancellations are no longer possible. Contact support immediately if you need to make changes.'
    },
    {
      q: 'Do you ship outside Kerala?',
      a: 'Currently, Quickfynd.com primarily serves customers in Kerala. Shipping to other regions may be available depending on product type. Check product details or contact support for more information.'
    },
    {
      q: 'How do I know if a product is in stock?',
      a: 'Product availability is displayed on the product page. We update our stock regularly, but in case of discrepancies, your order confirmation will notify you if an item is unavailable.'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-[1300px] mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
          Frequently Asked Questions
        </h1>
        <p className="text-center text-gray-600 mb-10 text-lg">
          Find answers to common questions about shopping, shipping, returns, payments, and more on Quickfynd.com.
        </p>

        <div className="space-y-4">
          {faqs.map((item, i) => (
            <details key={i} className="group bg-white border border-gray-200 rounded-xl p-5 open:shadow-lg transition-all">
              <summary className="font-medium text-gray-900 cursor-pointer list-none flex items-center justify-between">
                {item.q}
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <p className="text-gray-700 mt-3 leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
