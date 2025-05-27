import React from 'react'
import './home.css'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    
    <div className='main'>
      
      
      <div className="homepage" style={{ backgroundImage: `url('./Vella.jpg')` }}>


      {/* Navigation Bar */}

      <header className="navbar">
      <div className="logo">Asset Management System</div>
      

      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/Login">Login</Link>
          </li>
        </ul>
      </nav>
    </header>

       {/* Hero Section */}
       <section className="hero">
        <div className="hero-content">
          <h1>Manage Your Assets Efficiently</h1>
          <p>Track, organize, and manage your assets with ease.</p>
          
        </div>
      </section>
{/* Features Section */}
<section id="features" className="features">
  <h2>Our Features</h2>
  <div className="feature-cards">
    <div className="feature-card">
      <img src="/home1.jpg" alt="Asset Tracking" className="feature-icon" />
      <h3>Asset Register</h3>
      <p>Keep track of all assets in one place.</p>
    </div>
    <div className="feature-card">
      <img src="/home5.jpg" alt="Asset Transfer" className="feature-icon" />
      <h3>AssetTransfer</h3>
      <p>Easily transfer asset.</p>
    </div>
    <div className="feature-card">
      <img src="/home3.jpg" alt="Real-time Dashboard" className="feature-icon" />
      <h3>Real-time Dashboard</h3>
      <p>View key metrics and insights instantly.</p>
    </div>
  </div>
</section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Asset Management System. All rights reserved.</p>
      </footer>
    </div>
    </div>
    
  )
}

export default Home
