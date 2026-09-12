import Button from '../../components/Button/Button';
import BlueprintBackground from '../../components/BlueprintBackground/BlueprintBackground';
import useScrollReveal from '../../hooks/useScrollReveal';
import heroImage from '../../assets/images/doctor.jpeg';
import { clinicData } from '../../data/clinicData';
import './Home.css';

// A small helper component to avoid repetitive hook calls in the same file
const RevealSection = ({ children, className = '', delayClass = '' }) => {
  const ref = useScrollReveal();
  return (
    <div ref={ref} className={`reveal ${delayClass} ${className}`}>
      {children}
    </div>
  );
};

export default function Home() {
  return (
    <div className="home-page">
      
      {/* 1. HERO SECTION */}
      <section className="hero-section bg-soft-blue">
        <BlueprintBackground absolute motif="stethoscope" opacity={0.06} position="right" scale={1.4} />
        
        <div className="container hero-container">
          <RevealSection className="hero-content">
            <span className="eyebrow">Your Health, Our Commitment</span>
            <h1 className="hero-title">{clinicData.doctorName}</h1>
            
            <div className="hero-credentials-block">
              <p className="hero-degree">B.H.M.S. (WBUHS), D.E.P.H. (VU)</p>
              <p className="hero-role">{clinicData.profession}</p>
              
              <div className="hero-mo-block">
                <span className="mo-label">Medical Officer (Ayush)</span>
                <span className="mo-dept">Dept. of Health & Family Welfare, Govt. of West Bengal</span>
              </div>
            </div>
            
            <p className="hero-statement">
              Thoughtful Homoeopathic Care for a Healthier Tomorrow.
            </p>
            
            <div className="hero-actions">
              <Button to="/appointment" size="lg">Book Appointment</Button>
              <Button href={`tel:${clinicData.phone}`} variant="secondary" size="lg">Call Now</Button>
            </div>
          </RevealSection>
          
          <RevealSection className="hero-image-wrapper" delayClass="reveal-delay-200">
            <div className="hero-image-frame">
              <div className="hero-image-inner">
                <img src={heroImage} alt="Dr. Suman Pandab" className="hero-image" />
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* 2. CREDENTIAL RIBBON */}
      <section className="credential-section bg-white">
        <div className="container">
          <RevealSection className="credential-ribbon">
            <div className="cred-item">
              <span className="cred-title">B.H.M.S.</span>
              <span className="cred-sub">WBUHS</span>
            </div>
            <div className="cred-divider"></div>
            <div className="cred-item">
              <span className="cred-title">D.E.P.H.</span>
              <span className="cred-sub">VU</span>
            </div>
            <div className="cred-divider"></div>
            <div className="cred-item">
              <span className="cred-title">Medical Officer</span>
              <span className="cred-sub">AYUSH</span>
            </div>
            <div className="cred-divider"></div>
            <div className="cred-item">
              <span className="cred-title">Government</span>
              <span className="cred-sub">West Bengal</span>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* 3. CONSULTATION SECTION */}
      <section className="consultation-section bg-light-blue section">
        <div className="container">
          <RevealSection>
            <span className="eyebrow">Consultation Options</span>
            <h2 className="section-title">Expert Advice for Your Health</h2>
            <div className="thin-rule"></div>
          </RevealSection>

          <div className="consultation-editorial">
            
            {/* Option 01 */}
            <RevealSection className="editorial-split" delayClass="reveal-delay-100">
              <div className="ed-number">01</div>
              <div className="ed-content">
                <h3 className="ed-title">Chamber Consultation</h3>
                <p className="ed-desc">
                  Meet the doctor in person for a focused, comprehensive evaluation. 
                  We will automatically assign the earliest available appointment slot 
                  based on the doctor's chamber schedule.
                </p>
                <Button to="/appointment">Book Chamber Appointment</Button>
              </div>
            </RevealSection>

            {/* Option 02 */}
            <RevealSection className="editorial-split ed-reverse" delayClass="reveal-delay-200">
              <div className="ed-number">02</div>
              <div className="ed-content">
                <h3 className="ed-title">Online Consultation</h3>
                <p className="ed-desc">
                  Share your concern from wherever you are. Connect directly with the 
                  doctor via WhatsApp for prompt advice and follow-ups regarding your treatment.
                </p>
                <Button to="/consultation" variant="secondary">Start Online Consultation</Button>
              </div>
            </RevealSection>

          </div>
        </div>
      </section>

      {/* 4. ABOUT PREVIEW */}
      <section className="about-preview-section bg-white section">
        <BlueprintBackground absolute motif="caduceus" opacity={0.03} position="left" scale={1.8} />
        <div className="container">
          <div className="about-editorial-grid">
            <RevealSection className="about-intro">
              <span className="eyebrow">About the Doctor</span>
              <h2 className="section-title">Dr. Suman Pandab</h2>
              <p className="about-desc">
                Dr. Suman Pandab is a qualified Homoeopathic Physician with a commitment to safe, 
                natural, and holistic healing. With experience serving as a Medical Officer (Ayush) 
                under the Department of Health & Family Welfare, Govt. of West Bengal, he provides 
                personalized care to help patients achieve better health and long-term well-being.
              </p>
              <Button to="/about" variant="secondary">Learn More About Dr. Pandab</Button>
            </RevealSection>
            
            <RevealSection className="about-highlights" delayClass="reveal-delay-200">
               <div className="highlight-block">
                 <h4>Dedicated Healing</h4>
                 <p>Focusing on treating the root cause rather than just the symptoms.</p>
               </div>
               <div className="thin-rule"></div>
               <div className="highlight-block">
                 <h4>Government Service</h4>
                 <p>Extensive experience serving public health needs in West Bengal.</p>
               </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* 5. APPOINTMENT CTA (DEEP NAVY) */}
      <section className="cta-section bg-navy section">
        <BlueprintBackground absolute motif="stethoscope" opacity={0.12} position="bottom-right" scale={1.5} />
        <div className="container">
          <RevealSection className="cta-content">
            <h2 className="cta-title">Ready to Consult?</h2>
            <p className="cta-desc">
              Book a chamber appointment today. We will efficiently allocate the earliest available 
              time based on the doctor's current schedule.
            </p>
            <Button to="/appointment" variant="outline-white" size="lg">Book an Appointment</Button>
          </RevealSection>
        </div>
      </section>

      {/* 6. LOCATION & HOURS */}
      <section className="location-section bg-soft-blue section">
        <div className="container">
          <RevealSection>
            <span className="eyebrow">Visit the Chamber</span>
            <h2 className="section-title">Location & Hours</h2>
            <div className="thin-rule"></div>
          </RevealSection>

          <div className="location-grid">
            <RevealSection className="location-info">
              <div className="info-group">
                <h4 className="info-label">Chamber Address</h4>
                <address className="info-text">
                  {clinicData.address.line1}<br/>
                  {clinicData.address.line2}
                </address>
              </div>
              
              <div className="info-group">
                <h4 className="info-label">Contact</h4>
                <a href={`tel:${clinicData.phone}`} className="info-text">{clinicData.phone}</a>
              </div>
              
              <div className="info-group">
                <h4 className="info-label">Visiting Hours</h4>
                <div className="hours-row">
                  <span>Mon - Sat:</span>
                  <span>{clinicData.visitingHours.monToSat}</span>
                </div>
                <div className="hours-row">
                  <span>Sunday:</span>
                  <span>{clinicData.visitingHours.sunday}</span>
                </div>
              </div>
            </RevealSection>
            
            <RevealSection className="location-map" delayClass="reveal-delay-200">
              <div className="map-frame">
                <a 
                  href="https://www.google.com/maps/dir/?api=1&destination=22.4152831,87.3274097" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="map-overlay" 
                  title="Get Directions to Dr. Suman Pandab"
                >
                  <span className="sr-only">Get Directions to Dr. Suman Pandab</span>
                </a>
                <iframe 
                  src="https://maps.google.com/maps?q=22.4152831,87.3274097&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                  className="map-iframe" 
                  allowFullScreen 
                  loading="lazy"
                  title="Doctor Location Map"
                ></iframe>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

    </div>
  );
}
