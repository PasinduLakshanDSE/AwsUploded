import { useState } from "react";
import { Link } from "react-router-dom";
import "./contact.css"; // Import the new CSS file

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
  
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setError("All fields are required");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:8000/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      if (data.success) {
        setSuccess("Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setError("Failed to send message.");
      }
    } catch (error) {
      setError("Something went wrong.");
    }
  };
  

  return (
    <div className='main'>
      
    <div className="homepage" style={{ backgroundImage: `url('./Vella.jpg')` }}>
    <div className="contact-container">
      <div className="contact-box">
        <h2 className="contact-title">Contact Us</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} className="contact-input" />
          <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} className="contact-input" />
          <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} className="contact-input" />
          <textarea name="message" placeholder="Your Message" rows="4" value={formData.message} onChange={handleChange} className="contact-textarea"></textarea>
          <button type="submit" className="contact-button">Send Message</button>
        </form>
        <Link to="/" className="contact-link">Back to Home</Link>
      </div>
    </div>
    </div>
    </div>
  );
};

export default Contact;

