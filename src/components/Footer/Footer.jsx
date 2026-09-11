import { Link } from 'react-router-dom';
import BlueprintBackground from '../BlueprintBackground/BlueprintBackground';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <BlueprintBackground motif="stethoscope" opacity={0.03} position="left" scale={1.5} className="footer-blueprint">
        <div className="container">
          <div className="footer-grid">
            
            <div className="footer-col">
              <h3 className="footer-brand">Dr. Suman Pandab</h3>
              <p className="footer-subtitle">Homoeopathic Physician</p>
              <p className="footer-desc">
                Providing thoughtful homoeopathic care for a healthier tomorrow. Safe, natural, and personalized treatment.
              </p>
            </div>

            <div className="footer-col">
              <h4 className="footer-heading">Quick Links</h4>
              <ul className="footer-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/consultation">Consultation</Link></li>
                <li><Link to="/appointment">Appointment</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4 className="footer-heading">Contact</h4>
              <ul className="footer-contact-list">
                <li>
                  <a href="tel:8900012992">8900012992</a>
                </li>
                <li>
                  <address>
                    Chotobazar, Midnapore<br/>
                    West Bengal
                  </address>
                </li>
              </ul>
            </div>

            <div className="footer-col">
              <h4 className="footer-heading">Visiting Hours</h4>
              <ul className="footer-hours">
                <li>
                  <span>Mon - Sat:</span>
                  <span>7:30 PM - 9:30 PM</span>
                </li>
                <li>
                  <span>Sunday:</span>
                  <span>11:00 AM - 1:00 PM</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Dr. Suman Pandab. All rights reserved.</p>
          </div>
        </div>
      </BlueprintBackground>
    </footer>
  );
}
