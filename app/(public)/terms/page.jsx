'use client'

export default function TermsPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-[1300px] mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
          Terms & Conditions
        </h1>
        <p className="text-center text-gray-600 mb-8">
          By using <strong>Quickfynd.com</strong>, you agree to these Terms & Conditions. Quickfynd.com is an e-commerce platform selling a variety of products across multiple categories. We prioritize secure payments, fast delivery, and a safe shopping experience for all our customers.
        </p>

        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">

          {/* Account */}
          <div>
            <h2 className="font-semibold text-gray-900 mb-2">1. Account</h2>
            <p className="text-gray-700">
              Users must provide accurate and complete information when creating an account. You are responsible for maintaining the confidentiality of your login credentials, including username and password. All activities performed under your account are your responsibility. Notify Quickfynd.com immediately if you suspect unauthorized access. We reserve the right to suspend or terminate accounts that violate these terms.
            </p>
          </div>

          {/* Orders & Pricing */}
          <div>
            <h2 className="font-semibold text-gray-900 mb-2">2. Orders & Pricing</h2>
            <p className="text-gray-700">
              Quickfynd.com offers multiple products across a variety of categories. Prices are listed in local currency and may change without prior notice. Orders are accepted subject to stock availability and successful payment authorization. We reserve the right to cancel or modify any order at our discretion. Customers are encouraged to review their orders carefully before confirmation.
            </p>
          </div>

          {/* Payment & Security */}
          <div>
            <h2 className="font-semibold text-gray-900 mb-2">3. Payment & Security</h2>
            <p className="text-gray-700">
              All payments on Quickfynd.com are processed securely through trusted payment gateways. Sensitive card details are encrypted and never stored by our servers. We use industry-standard security measures to protect your data and transactions. Customers are responsible for ensuring their payment methods are valid and authorized. Any disputes regarding transactions should be reported immediately.
            </p>
          </div>

          {/* Delivery & Shipping */}
          <div>
            <h2 className="font-semibold text-gray-900 mb-2">4. Delivery & Shipping</h2>
            <p className="text-gray-700">
              Delivery times provided are estimates and may vary depending on location, product availability, and other factors. Quickfynd.com strives to deliver most orders within 2–3 business days across Kerala. Risk and ownership of the goods pass to the customer upon delivery to the specified address. We are not liable for delays caused by unforeseen circumstances or third-party services. Customers must ensure the delivery address is correct to avoid delays.
            </p>
          </div>

          {/* Returns & Replacements */}
          <div>
            <h2 className="font-semibold text-gray-900 mb-2">5. Returns & Replacements</h2>
            <p className="text-gray-700">
              Returns are accepted within 7 days of delivery, and replacements within 15 days, subject to product eligibility. Products must be unused, in their original packaging, and in the condition received. Certain categories of products may not be eligible for returns, such as perishable goods or personalized items. Customers must follow the return process outlined in our Return Policy. Refunds or replacements are processed after verification and approval by our team.
            </p>
          </div>

          {/* Product Accuracy */}
          <div>
            <h2 className="font-semibold text-gray-900 mb-2">6. Product Accuracy</h2>
            <p className="text-gray-700">
              Quickfynd.com strives to provide accurate descriptions, images, and pricing for all products. Minor variations in color, size, or specifications may occur due to display differences or manufacturer updates. We are not responsible for typographical errors or inaccuracies in product listings. Customers are encouraged to verify product details before purchasing. Product specifications may be updated without prior notice to reflect changes in availability or improvements.
            </p>
          </div>

          {/* User Conduct */}
          <div>
            <h2 className="font-semibold text-gray-900 mb-2">7. User Conduct</h2>
            <p className="text-gray-700">
              Users must not misuse the website in any way, including attempting to hack, disrupt, or access unauthorized areas. Posting offensive, abusive, or illegal content is strictly prohibited. Users should comply with applicable laws while using our services. Any activity that harms Quickfynd.com, its users, or partners may result in account suspension or legal action. Customers are expected to act responsibly when interacting with the platform.
            </p>
          </div>

          {/* Intellectual Property */}
          <div>
            <h2 className="font-semibold text-gray-900 mb-2">8. Intellectual Property</h2>
            <p className="text-gray-700">
              All content on Quickfynd.com, including logos, images, text, and software, is protected by copyright and trademark laws. Users may not reproduce, distribute, or use any material for commercial purposes without explicit permission. Unauthorized use of intellectual property may result in legal action. Quickfynd.com retains ownership of all content and intellectual property unless otherwise stated. Third-party materials used on the site are licensed and must be credited appropriately.
            </p>
          </div>

          {/* Privacy & Data Protection */}
          <div>
            <h2 className="font-semibold text-gray-900 mb-2">9. Privacy & Data Protection</h2>
            <p className="text-gray-700">
              Your personal information is collected, stored, and used in accordance with our Privacy Policy. We implement robust security measures to protect your data from unauthorized access or misuse. By using Quickfynd.com, you consent to the collection and use of data as described. Personal information will not be shared with third parties without consent, except for service providers required to fulfill orders. You have the right to access and manage your data anytime.
            </p>
          </div>

          {/* Cookies & Tracking */}
          <div>
            <h2 className="font-semibold text-gray-900 mb-2">10. Cookies & Tracking</h2>
            <p className="text-gray-700">
              Quickfynd.com uses cookies and tracking technologies to enhance user experience, analyze website traffic, and provide personalized services. Cookies help us remember user preferences and streamline the checkout process. You may disable cookies in your browser, but certain features may not function properly. Analytics data is collected anonymously to improve services. By using the website, you consent to the use of cookies and similar technologies.
            </p>
          </div>

          {/* Third-Party Services */}
          <div>
            <h2 className="font-semibold text-gray-900 mb-2">11. Third-Party Services</h2>
            <p className="text-gray-700">
              Quickfynd.com integrates with third-party services such as payment processors, delivery partners, and analytics providers. We are not responsible for the actions, policies, or security practices of these third parties. Any issues arising from third-party services should be addressed with the respective providers. Quickfynd.com ensures that third-party services meet minimum security standards. Customers remain responsible for providing accurate information to these services.
            </p>
          </div>

          {/* Limitation of Liability */}
          <div>
            <h2 className="font-semibold text-gray-900 mb-2">12. Limitation of Liability</h2>
            <p className="text-gray-700">
              Quickfynd.com is not liable for any indirect, incidental, or consequential damages arising from the use of the website or services. This includes losses of profits, data, or business opportunities. Liability is limited to the maximum extent permitted by law. Customers use the platform at their own risk. Quickfynd.com will, however, take reasonable steps to resolve any direct issues promptly.
            </p>
          </div>

          {/* Governing Law */}
          <div>
            <h2 className="font-semibold text-gray-900 mb-2">13. Governing Law</h2>
            <p className="text-gray-700">
              These Terms & Conditions are governed by the laws of India. Any disputes arising from these terms or the use of Quickfynd.com shall be subject to the jurisdiction of courts in Kerala. Customers agree to comply with all applicable laws. International users must ensure compliance with local laws. Quickfynd.com retains the right to enforce its terms in any applicable jurisdiction.
            </p>
          </div>

          {/* Modification of Terms */}
          <div>
            <h2 className="font-semibold text-gray-900 mb-2">14. Changes to Terms</h2>
            <p className="text-gray-700">
              Quickfynd.com may update or modify these Terms & Conditions at any time without prior notice. Continued use of the website after changes constitutes acceptance of the updated terms. We recommend checking this page periodically. Significant changes may be communicated via email or site notifications. Users are responsible for reviewing the terms regularly.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h2 className="font-semibold text-gray-900 mb-2">15. Contact Information</h2>
            <p className="text-gray-700">
              For questions or concerns regarding these Terms & Conditions or any service offered, please contact us at{' '}
              <a href="mailto:support@Quickfynd.com" className="text-orange-600 underline">
                support@Quickfynd.com
              </a>
              . Our customer support team is available to provide assistance and clarify any terms.
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
