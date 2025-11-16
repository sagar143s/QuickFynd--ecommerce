// pages/about.js (Next.js About Us Page with Inline CSS)

export default function AboutUs() {
  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "40px 20px",
        fontFamily: "Arial, sans-serif",
        lineHeight: "1.6",
        color: "#333",
      }}
    >
      <h1
        style={{
          fontSize: "32px",
          fontWeight: "bold",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        About Us
      </h1>

      <p
        style={{
          fontSize: "16px",
          marginBottom: "20px",
        }}
      >
        Welcome to <strong>Quickfynd.com</strong>, your trusted online shopping platform where you can
        explore and purchase a wide range of high‑quality products. From lifestyle and electronics
        to home essentials and trending items, we focus on offering great value with fast delivery
        and a smooth shopping experience.
      </p>

      <p
        style={{
          fontSize: "16px",
          marginBottom: "20px",
        }}
      >
        At Quickfynd.com, our mission is simple — to make online shopping reliable, affordable, and
        convenient for everyone. We work continuously to expand our product range and ensure you get
        the best deals and top‑notch service.
      </p>

      <p
        style={{
          fontSize: "16px",
          marginBottom: "20px",
        }}
      >
        This platform is proudly developed and maintained by <strong>Nilaas</strong>, ensuring
        high‑performance technology, secure operations, and a user‑friendly interface that makes
        shopping easy for all customers.
      </p>

      <p
        style={{
          fontSize: "16px",
          marginBottom: "20px",
        }}
      >
        Additionally, <strong>Nilaas.in</strong> is our fashion brand, offering high-quality clothing,
        accessories, and lifestyle products designed to keep you stylish and trendy.
      </p>
    </div>
  );
}