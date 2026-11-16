import React from 'react';

export default function HeroSection({ totalMovies = 0 }) {
  return (
    <section className="hero-banner">
      <div className="hero-text">
        <span className="hero-badge">✨ კინოკოლექცია</span>
        <h1>აღმოაჩინე მსოფლიო კინოკლასიკა და ჰიტები</h1>
        <p>
          დაათვალიერე შენი საყვარელი ფილმები, გაეცანი რეიტინგებს, 
          შეინახე რჩეულებში და აღმოაჩინე ახალი შედევრები.
        </p>
      </div>

      <div className="hero-stats">
        <div className="stat-card">
          <span className="stat-number">{totalMovies}</span>
          <span className="stat-label">საუკეთესო ფილმი</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">8.8</span>
          <span className="stat-label">საშუალო რეიტინგი</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">100%</span>
          <span className="stat-label">HD ხარისხი</span>
        </div>
      </div>
    </section>
  );
}
