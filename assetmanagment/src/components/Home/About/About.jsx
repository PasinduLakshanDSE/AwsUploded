import React from "react";
import "./about.css";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="homepage1" style={{ backgroundImage: `url('./Vella.jpg')` }}>
         
    <div className="about-container colorful-bg">
      <div className="about-content colorful-card">
        <h1 className="about-title gradient-text">About Vella</h1>
        <p className="about-text fade-in">
          Vella’s journey began in 1971 with the acquisition of the Uva Halpewatte Tea Estate.
          Inspired by Ella’s natural beauty, the family expanded into leisure, achieving remarkable success.
        </p>
        <h2 className="about-subtitle slide-in-left gradient-text">A Legacy of Excellence</h2>
        <p className="about-text slide-in-right">
          Founded in 1971 by Mr. A. P. D. Abeyrathne, Vella Group started with high-quality tea production.
          Over the years, Vella expanded into leisure, IT, and strategic investments.
        </p>
        <h2 className="about-subtitle slide-in-left gradient-text">Key Milestones</h2>
<ul className="about-list zoom-in colorful-list">
  <li><strong>1971:</strong> Acquisition of Uva Halpewatte Tea Factory</li>
  <li><strong>2009:</strong> Launched Halpé Tea Exports</li>
  <li><strong>2012:</strong> Opened 98 Acres Resort & Spa</li>
  <li><strong>2019:</strong> Flying Ravana Adventure Park launched</li>
  <li><strong>2024:</strong> Expansion into IT with 98 Solutions</li>
</ul>
        <h2 className="about-subtitle slide-in-left gradient-text">Meet Our Leadership</h2>
        
        <div className="about-team">
          <div className="team-member zoom-in colorful-card">
            <h3 className="t1">Chamara Abeyratna</h3>
            <p>Director & Co-Founder</p>
          </div>
          <div className="team-member zoom-in colorful-card">
            
            <h3 className="t1">Ranga Abeyrathne</h3>
            <p>Director & Co-Founder</p>
          </div>
          <div className="team-member zoom-in colorful-card">
            <h3 className="t1">Eranda Aberathna</h3>
            <p>Director & Co-Founder</p>
          </div>
          <div className="team-member zoom-in colorful-card">
            <h3 className="t1">Dr.Kumudu Gunasekera</h3>
            <p>Deputy Chairman</p>
          </div>
        </div>
        <Link to="/" className="about-link fade-in vibrant-link">Back to Home</Link>
      </div>
    </div>
    </div>
  );
};

export default About;
