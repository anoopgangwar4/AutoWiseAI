import React from "react";

const reviews = [
  {
    name: "Rohit Kumar",
    image: "https://i.pravatar.cc/100?img=3",
    rating: 5,
    text: "Very accurate product price prediction. Helped me decide the right selling price.",
  },
  {
    name: "Anjali Singh",
    image: "https://i.pravatar.cc/100?img=5",
    rating: 4,
    text: "Simple and fast valuation tool. The interface works smoothly on my phone.",
  },
  {
    name: "Vikas Patel",
    image: "https://i.pravatar.cc/100?img=8",
    rating: 5,
    text: "Clean design and reliable predictions. Great project for real-world usage.",
  },
];

const Stars = ({ count }) => (
  <div className="stars">
    {"★".repeat(count)}
    {"☆".repeat(5 - count)}
  </div>
);

export default function ReviewsSection() {
  return (
    <section className="reviews-section">
      <h2 className="title">What Users Say</h2>

      <div className="reviews-grid">
        {reviews.map((review, index) => (
          <div className="review-card" key={index}>
            <div className="user-info">
              <img src={review.image} alt={review.name} />
              <div>
                <h3>{review.name}</h3>
                <Stars count={review.rating} />
              </div>
            </div>

            <p className="review-text">{review.text}</p>
          </div>
        ))}
      </div>

      <style>{`
        .reviews-section {
          padding: 50px 18px;
          background: linear-gradient(to bottom, #f8fafc, #eef2f7);
          text-align: center;
          font-family: system-ui, -apple-system, sans-serif;
        }

        .title {
          font-size: 1.8rem;
          margin-bottom: 30px;
          font-weight: 600;
          color: #111827;
        }

        .reviews-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 18px;
          max-width: 1100px;
          margin: auto;
        }

        .review-card {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(8px);
          border-radius: 16px;
          padding: 20px;
          text-align: left;
          box-shadow: 0 10px 25px rgba(0,0,0,0.08);
          transition: all 0.3s ease;
        }

        .review-card:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 18px 35px rgba(0,0,0,0.12);
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .user-info img {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          object-fit: cover;
        }

        .user-info h3 {
          font-size: 1rem;
          margin: 0;
          font-weight: 600;
          color: #111827;
        }

        .stars {
          font-size: 14px;
          color: #f59e0b;
        }

        .review-text {
          font-size: 0.92rem;
          color: #4b5563;
          line-height: 1.5;
        }

        /* Tablet */
        @media (min-width: 600px) {
          .reviews-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* Desktop */
        @media (min-width: 900px) {
          .reviews-grid {
            grid-template-columns: repeat(3, 1fr);
          }

          .title {
            font-size: 2rem;
          }
        }
      `}</style>
    </section>
  );
}
