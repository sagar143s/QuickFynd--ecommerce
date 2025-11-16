'use client';

export default function ReturnPolicyPage() {
  return (
    <div style={{ backgroundColor: "#f9fafb", minHeight: "100vh", padding: "40px 16px" }}>
      <div
        style={{
          maxWidth: "1300px",
          margin: "0 auto",
          padding: "40px 20px",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          color: "#111827",
        }}
      >
        <h1 style={{ fontSize: "32px", fontWeight: "700", marginBottom: "20px", textAlign: "center", color: "#FF6B00" }}>
          Return & Replacement Policy
        </h1>

        <p style={{ color: "#6b7280", fontSize: "16px", marginBottom: "30px", textAlign: "center" }}>
          At <strong>Quickfynd.com</strong>, we prioritize customer satisfaction. Our return and replacement policy ensures that
          you have a smooth, reliable, and transparent experience when shopping across multiple product categories.
          We process returns and replacements efficiently while maintaining secure handling of your products and payments.
        </p>

        <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "30px", display: "flex", flexDirection: "column", gap: "30px" }}>
          
          {/* 1. Eligibility */}
          <section>
            <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#111827", marginBottom: "10px" }}>1. Eligibility</h2>
            <p style={{ fontSize: "16px", color: "#374151", lineHeight: "1.8" }}>
              Returns are accepted within <strong>7 days</strong> of delivery for eligible items. Replacements are available for supported products within 7 days.
              Items must be unused, unaltered, and returned with original tags, packaging, and accessories. Orders outside Kerala may have different eligibility timelines.
              Certain products like fashion, electronics, and home essentials may have specific return requirements.
              Always check the product’s eligibility before initiating a return or replacement.
            </p>
          </section>

          {/* 2. Non-returnable items */}
          <section>
            <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#111827", marginBottom: "10px" }}>2. Non-Returnable Items</h2>
            <p style={{ fontSize: "16px", color: "#374151", lineHeight: "1.8" }}>
              Some items cannot be returned or replaced due to hygiene and safety regulations:
              undergarments, lingerie, innerwear, socks; personal hygiene items like razors or epilators once opened; cosmetics or beauty products once opened; and perishable or made-to-order items.
              Non-returnable items ensure compliance with local safety laws and maintain quality standards for all customers.
            </p>
          </section>

          {/* 3. Electronics & Gadgets */}
          <section>
            <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#111827", marginBottom: "10px" }}>3. Electronics & Gadgets</h2>
            <p style={{ fontSize: "16px", color: "#374151", lineHeight: "1.8" }}>
              Electronics are eligible for <strong>replacement</strong> within 7 days if defective or not functioning as expected. Returns for preference, dislike, or cosmetic reasons are not accepted.
              A technical inspection may be required before processing replacements. Customers must retain original packaging and accessories for inspection.
              This ensures fair handling and minimizes disputes. Defective electronics will be replaced or repaired promptly after verification.
            </p>
          </section>

          {/* 4. How to Request */}
          <section>
            <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#111827", marginBottom: "10px" }}>4. How to Request</h2>
            <p style={{ fontSize: "16px", color: "#374151", lineHeight: "1.8" }}>
              To request a return or replacement, go to <strong>My Orders</strong> on Quickfynd.com, select the item, and choose the Return or Replacement option.
              Upload images or videos if requested to help us assess the issue. You will receive updates via email or SMS at each step of the process.
              Our team ensures timely communication to keep you informed about the status of your request and provide a smooth experience.
            </p>
          </section>

          {/* 5. Inspection & Approval */}
          <section>
            <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#111827", marginBottom: "10px" }}>5. Inspection & Approval</h2>
            <p style={{ fontSize: "16px", color: "#374151", lineHeight: "1.8" }}>
              After pickup or return, the product is inspected to confirm eligibility. Approved items are either refunded to the original payment method or replaced promptly.
              Items failing inspection will be returned to the customer. This step ensures that all returns meet quality standards.
              Inspection protects both the customer and Quickfynd.com from fraudulent claims or damage issues. Transparent communication is provided at every stage.
            </p>
          </section>

          {/* 6. Wrong or Damaged Items */}
          <section>
            <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#111827", marginBottom: "10px" }}>6. Wrong or Damaged Items</h2>
            <p style={{ fontSize: "16px", color: "#374151", lineHeight: "1.8" }}>
              If you receive damaged, defective, or incorrect items, report the issue within <strong>48 hours</strong> of delivery. Provide your order ID and photos of the item if possible.
              Quickfynd.com will prioritize your case and arrange replacement or refund swiftly. Early reporting ensures faster resolution and customer satisfaction.
              Our team is committed to resolving all issues efficiently and maintaining a high level of service quality.
            </p>
          </section>

          {/* 7. Contact */}
          <section>
            <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#111827", marginBottom: "10px" }}>7. Contact</h2>
            <p style={{ fontSize: "16px", color: "#374151", lineHeight: "1.8" }}>
              For questions or support regarding returns and replacements, contact Quickfynd.com at{" "}
              <a href="mailto:support@quickfynd.com" style={{ color: "#ea580c", textDecoration: "underline" }}>
                support@quickfynd.com
              </a>. Our support team is available to guide you through every step of the return or replacement process.
              We are committed to providing fast, transparent, and hassle-free assistance to ensure your complete satisfaction with our services.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
