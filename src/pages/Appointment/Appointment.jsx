import { useState } from 'react';
import SectionHeading from '../../components/SectionHeading/SectionHeading';
import BlueprintBackground from '../../components/BlueprintBackground/BlueprintBackground';
import Button from '../../components/Button/Button';
import './Appointment.css';

export default function Appointment() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    date: ''
  });
  
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [appointmentDetails, setAppointmentDetails] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.phone || !formData.address || !formData.date) {
      setStatus('error');
      return;
    }

    setStatus('loading');
    
    // Simulate API call for booking
    setTimeout(() => {
      // Mock success state
      const mockId = `A-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
      setAppointmentDetails({
        id: mockId,
        name: formData.name,
        date: formData.date,
        time: '7:30 PM - 8:00 PM', // Mocked auto-allocated time
        location: 'Chotobazar, Midnapore',
        doctor: 'Dr. Suman Pandab'
      });
      setStatus('success');
    }, 1500);
  };

  const handleReset = () => {
    setFormData({ name: '', phone: '', address: '', date: '' });
    setStatus('idle');
    setAppointmentDetails(null);
  };

  return (
    <div className="appointment-page">
      <BlueprintBackground motif="stethoscope" opacity={0.05} position="right" scale={1.2}>
        <div className="container appointment-container section">
          
          <div className="appointment-layout">
            <div className="appointment-info">
              <SectionHeading 
                eyebrow="Visit Us" 
                title="Book Your Chamber Visit" 
                subtitle="Share your details and we will assign the earliest available appointment time based on the doctor's chamber schedule."
                align="left"
              />
              
              <div className="allocation-notice">
                <div className="allocation-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <div className="allocation-text">
                  <h4>Automatic Time Allocation</h4>
                  <p>You don't need to choose a time. After submitting your details, the system will assign the earliest available slot.</p>
                </div>
              </div>
            </div>
            
            <div className="appointment-form-col">
              <div className="appointment-card">
                {status === 'success' && appointmentDetails ? (
                  <div className="success-state">
                    <div className="success-icon">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    </div>
                    <h3>Appointment Confirmed</h3>
                    <p className="success-msg">Your appointment has been reserved successfully.</p>
                    
                    <div className="ticket">
                      <div className="ticket-row">
                        <span className="ticket-label">Appointment No:</span>
                        <span className="ticket-value highlight">{appointmentDetails.id}</span>
                      </div>
                      <div className="ticket-row">
                        <span className="ticket-label">Patient:</span>
                        <span className="ticket-value">{appointmentDetails.name}</span>
                      </div>
                      <div className="ticket-row">
                        <span className="ticket-label">Date:</span>
                        <span className="ticket-value">{new Date(appointmentDetails.date).toLocaleDateString('en-GB')}</span>
                      </div>
                      <div className="ticket-row">
                        <span className="ticket-label">Time:</span>
                        <span className="ticket-value highlight">{appointmentDetails.time}</span>
                      </div>
                      <div className="ticket-row">
                        <span className="ticket-label">Location:</span>
                        <span className="ticket-value">{appointmentDetails.location}</span>
                      </div>
                    </div>
                    
                    <p className="mock-notice">* This is a frontend demo. No actual booking was made.</p>
                    
                    <Button onClick={handleReset} fullWidth variant="secondary">Book Another Appointment</Button>
                  </div>
                ) : (
                  <form className="booking-form" onSubmit={handleSubmit}>
                    <h3 className="form-title">Patient Details</h3>
                    
                    {status === 'error' && (
                      <div className="error-alert">Please fill in all required fields.</div>
                    )}
                    
                    <div className="form-group">
                      <label htmlFor="name">Full Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        required 
                        disabled={status === 'loading'}
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
                        disabled={status === 'loading'} 
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
                        disabled={status === 'loading'}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="date">Preferred Date</label>
                      <input 
                        type="date" 
                        id="date" 
                        name="date" 
                        value={formData.date} 
                        onChange={handleChange} 
                        required 
                        disabled={status === 'loading'}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    
                    <div className="form-actions mt-4">
                      <Button 
                        type="submit" 
                        size="lg" 
                        fullWidth 
                        disabled={status === 'loading'}
                      >
                        {status === 'loading' ? 'Confirming Appointment...' : 'Submit Request'}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
          
        </div>
      </BlueprintBackground>
    </div>
  );
}
