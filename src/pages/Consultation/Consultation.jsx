import { useState } from 'react';
import SectionHeading from '../../components/SectionHeading/SectionHeading';
import BlueprintBackground from '../../components/BlueprintBackground/BlueprintBackground';
import Button from '../../components/Button/Button';
import './Consultation.css';

export default function Consultation() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    concern: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const getWhatsAppLink = () => {
    const phone = "918900012992"; // Clinic phone number
    const message = `Hello Dr. Suman Pandab,\nI would like to consult regarding:\n\nName: ${formData.name}\nPhone: ${formData.phone}\nAddress: ${formData.address}\nConcern: ${formData.concern}`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="consultation-page">
      <BlueprintBackground motif="ecg" opacity={0.05} position="center" scale={1.2}>
        <div className="container consultation-container section">
          <SectionHeading 
            eyebrow="Consultation" 
            title="Online Consultation" 
            subtitle="Share your concern from wherever you are and connect directly with the doctor via WhatsApp."
          />
          
          <div className="consultation-form-wrapper">
            <div className="consultation-form-card">
              <h3 className="form-title">Your Details</h3>
              <p className="form-desc">Please fill out the details below. We will redirect you to WhatsApp to continue the consultation.</p>
              
              <form className="consultation-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                    placeholder="e.g. Jane Doe"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    required 
                    placeholder="e.g. +91 9876543210"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input 
                    type="text" 
                    id="address" 
                    name="address" 
                    value={formData.address} 
                    onChange={handleChange} 
                    required 
                    placeholder="City, Area"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="concern">Health Concern / Message</label>
                  <textarea 
                    id="concern" 
                    name="concern" 
                    value={formData.concern} 
                    onChange={handleChange} 
                    required 
                    rows="4"
                    placeholder="Please describe your symptoms briefly"
                  ></textarea>
                </div>
                
                <div className="form-actions">
                  <Button 
                    href={getWhatsAppLink()} 
                    size="lg" 
                    fullWidth 
                    disabled={!formData.name || !formData.phone || !formData.concern}
                  >
                    Continue on WhatsApp &rarr;
                  </Button>
                </div>
                <p className="form-notice">
                  * There is no automatic online appointment scheduling in V1. 
                  The doctor will directly contact you to decide the consultation timing.
                </p>
              </form>
            </div>
          </div>
        </div>
      </BlueprintBackground>
    </div>
  );
}
