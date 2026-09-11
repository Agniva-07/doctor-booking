import SectionHeading from '../../components/SectionHeading/SectionHeading';
import BlueprintBackground from '../../components/BlueprintBackground/BlueprintBackground';
import Button from '../../components/Button/Button';
import './Contact.css';

export default function Contact() {
  return (
    <div className="contact-page">
      <BlueprintBackground motif="stethoscope" opacity={0.04} position="center" scale={1.8}>
        <div className="container contact-container section">
          <SectionHeading 
            eyebrow="Reach Out" 
            title="Contact & Location" 
            subtitle="Find us or get in touch for any inquiries regarding your consultation."
          />
          
          <div className="contact-grid">
            <div className="contact-info-col">
              
              <div className="contact-card">
                <h3 className="contact-card-title">Chamber Information</h3>
                
                <div className="contact-item">
                  <div className="contact-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  </div>
                  <div className="contact-text">
                    <a href="tel:9434991914">9434991914</a>
                    <br />
                    <a href="tel:8900012992">8900012992</a>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  </div>
                  <div className="contact-text">
                    <address>
                      Chotobazar, Midnapore<br/>
                      West Bengal
                    </address>
                  </div>
                </div>
              </div>

              <div className="contact-card">
                <h3 className="contact-card-title">Visiting Hours</h3>
                <ul className="hours-list">
                  <li>
                    <span className="day">Monday - Saturday</span>
                    <span className="time">7:30 PM - 9:30 PM</span>
                  </li>
                  <li>
                    <span className="day">Sunday</span>
                    <span className="time">11:00 AM - 1:00 PM <br/><small>(Evening Closed)</small></span>
                  </li>
                </ul>
              </div>

            </div>

            <div className="contact-map-col">
              <div className="map-wrapper">
                {/* Placeholder for actual Google Maps Embed */}
                <div className="map-placeholder">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5, marginBottom: '1rem' }}>
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <p>Map View</p>
                  <span className="text-muted text-sm" style={{ display: 'block', marginTop: '0.5rem' }}>Chotobazar, Midnapore</span>
                </div>
              </div>
              <div className="map-actions">
                <Button 
                  href="https://maps.google.com/?q=Chotobazar,+Midnapore" 
                  fullWidth
                >
                  Get Directions &rarr;
                </Button>
              </div>
            </div>
          </div>
          
        </div>
      </BlueprintBackground>
    </div>
  );
}
