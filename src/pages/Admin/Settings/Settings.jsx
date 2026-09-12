import React, { useState } from 'react';
import './Settings.css';
import { mockDoctorProfile, mockClinicInfo, mockAppSettings } from '../mockData';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [profile, setProfile] = useState(mockDoctorProfile);
  const [clinic, setClinic] = useState(mockClinicInfo);
  const [appSettings, setAppSettings] = useState(mockAppSettings.appointmentSettings);
  const [notifications, setNotifications] = useState(mockAppSettings.notifications);

  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setHasUnsavedChanges(false);
      // In a real app we'd show a toast here
    }, 800);
  };

  const handleChange = (setter, obj, key, value) => {
    setter({ ...obj, [key]: value });
    setHasUnsavedChanges(true);
  };

  const toggleNotification = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    setHasUnsavedChanges(true);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <>
            <h2 className="settings-section-title">Doctor Profile</h2>
            <p className="settings-section-desc">Update your personal information and credentials.</p>
            <div className="settings-form-grid">
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={profile.name}
                  onChange={e => handleChange(setProfile, profile, 'name', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Specialization</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={profile.specialization}
                  onChange={e => handleChange(setProfile, profile, 'specialization', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input 
                  type="tel" 
                  className="form-input" 
                  value={profile.phone}
                  onChange={e => handleChange(setProfile, profile, 'phone', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  className="form-input" 
                  value={profile.email}
                  onChange={e => handleChange(setProfile, profile, 'email', e.target.value)}
                />
              </div>
            </div>
          </>
        );
      case 'clinic':
        return (
          <>
            <h2 className="settings-section-title">Clinic Information</h2>
            <p className="settings-section-desc">Details about your practice shown to patients.</p>
            <div className="settings-form-grid">
              <div className="form-group full-width">
                <label>Clinic Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={clinic.name}
                  onChange={e => handleChange(setClinic, clinic, 'name', e.target.value)}
                />
              </div>
              <div className="form-group full-width">
                <label>Clinic Address</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={clinic.address}
                  onChange={e => handleChange(setClinic, clinic, 'address', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Clinic Phone</label>
                <input 
                  type="tel" 
                  className="form-input" 
                  value={clinic.phone}
                  onChange={e => handleChange(setClinic, clinic, 'phone', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Consultation Fee</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={clinic.consultationFee}
                  onChange={e => handleChange(setClinic, clinic, 'consultationFee', e.target.value)}
                />
              </div>
            </div>
          </>
        );
      case 'appointments':
        return (
          <>
            <h2 className="settings-section-title">Appointment Rules</h2>
            <p className="settings-section-desc">Configure how patients can book appointments. Some rules are locked by the system.</p>
            <div className="settings-form-grid">
              <div className="form-group">
                <label>Default Appointment Duration (Locked)</label>
                <div style={{
                  padding: '10px 14px', 
                  background: 'var(--bg-ice)', 
                  border: '1px solid var(--border-light)', 
                  borderRadius: '8px',
                  color: 'var(--text-muted)'
                }}>
                  10 minutes
                </div>
              </div>
              <div className="form-group">
                <label>Max Appointments per Day (Locked)</label>
                <div style={{
                  padding: '10px 14px', 
                  background: 'var(--bg-ice)', 
                  border: '1px solid var(--border-light)', 
                  borderRadius: '8px',
                  color: 'var(--text-muted)'
                }}>
                  15 patients
                </div>
              </div>
              <div className="form-group">
                <label>Advance Booking Period</label>
                <select 
                  className="form-input" 
                  value={appSettings.advanceBookingPeriod}
                  onChange={e => handleChange(setAppSettings, appSettings, 'advanceBookingPeriod', e.target.value)}
                >
                  <option value="7 days">7 days</option>
                  <option value="14 days">14 days</option>
                  <option value="30 days">30 days</option>
                  <option value="60 days">60 days</option>
                </select>
              </div>
            </div>
          </>
        );
      case 'notifications':
        return (
          <>
            <h2 className="settings-section-title">Notifications</h2>
            <p className="settings-section-desc">Manage email and SMS notification preferences.</p>
            
            <div className="settings-toggle-row">
              <div className="toggle-info">
                <strong>Appointment Confirmations</strong>
                <span>Send automatic confirmations when an appointment is booked</span>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={notifications.confirmation}
                  onChange={() => toggleNotification('confirmation')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            
            <div className="settings-toggle-row">
              <div className="toggle-info">
                <strong>Cancellations</strong>
                <span>Send notifications when an appointment is cancelled</span>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={notifications.cancellation}
                  onChange={() => toggleNotification('cancellation')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            
            <div className="settings-toggle-row">
              <div className="toggle-info">
                <strong>Reminders</strong>
                <span>Send a reminder 24 hours before the appointment</span>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={notifications.reminder}
                  onChange={() => toggleNotification('reminder')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1>Settings</h1>
        <p>Manage your account, clinic details, and preferences.</p>
      </div>

      <div className="settings-layout">
        <nav className="settings-nav">
          <button 
            className={`settings-nav-item ${activeTab === 'general' ? 'active' : ''}`}
            onClick={() => setActiveTab('general')}
          >
            General Profile
          </button>
          <button 
            className={`settings-nav-item ${activeTab === 'clinic' ? 'active' : ''}`}
            onClick={() => setActiveTab('clinic')}
          >
            Clinic Details
          </button>
          <button 
            className={`settings-nav-item ${activeTab === 'appointments' ? 'active' : ''}`}
            onClick={() => setActiveTab('appointments')}
          >
            Appointment Rules
          </button>
          <button 
            className={`settings-nav-item ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            Notifications
          </button>
        </nav>

        <div className="settings-content-panel">
          <div className="settings-section-body">
            {renderContent()}
          </div>
          
          {hasUnsavedChanges && (
            <div className="settings-sticky-footer">
              <p>You have unsaved changes</p>
              <div className="settings-actions">
                <button className="btn-secondary" onClick={() => setHasUnsavedChanges(false)}>Discard</button>
                <button 
                  className="btn-primary" 
                  onClick={handleSave}
                  disabled={isSaving}
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
