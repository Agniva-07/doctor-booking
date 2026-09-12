import React, { useState, useEffect, useMemo } from 'react';
import './Dashboard.css';
import { appointmentsService } from '../../../services/appointments';

const Icons = {
  Calendar: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
  ),
  Clock: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  ),
  CheckCircle: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  )
};

// Normalize time strings from DB which might be '19:30:00' or '07:30 PM' or '19:30'
const normalizeTime = (timeStr) => {
  if (!timeStr) return '';
  const upper = timeStr.toUpperCase();
  if (upper.includes('PM')) {
    const [time] = upper.split(' ');
    const [h, m] = time.split(':');
    let hour = parseInt(h, 10);
    if (hour !== 12) hour += 12;
    return `${hour.toString().padStart(2, '0')}:${m}:00`;
  }
  if (upper.includes('AM')) {
    const [time] = upper.split(' ');
    const [h, m] = time.split(':');
    let hour = parseInt(h, 10);
    if (hour === 12) hour = 0;
    return `${hour.toString().padStart(2, '0')}:${m}:00`;
  }
  if (timeStr.length === 5) return `${timeStr}:00`;
  return timeStr;
};

// Generate exactly 15 slots (10 mins each) from 7:30 PM to 10:00 PM
const generateSlots = () => {
  const slots = [];
  let currentHour = 19;
  let currentMinute = 30;
  
  for (let i = 1; i <= 15; i++) {
    const startStr = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}:00`;
    const start12Hour = currentHour > 12 ? currentHour - 12 : currentHour;
    const startDisplay = `${start12Hour}:${currentMinute.toString().padStart(2, '0')} PM`;
    
    currentMinute += 10;
    if (currentMinute >= 60) {
      currentMinute -= 60;
      currentHour += 1;
    }
    
    const endStr = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}:00`;
    const end12Hour = currentHour > 12 ? currentHour - 12 : currentHour;
    const endDisplay = `${end12Hour}:${currentMinute.toString().padStart(2, '0')} PM`;
    
    slots.push({
      id: i,
      number: `#${i.toString().padStart(2, '0')}`,
      startStr,
      endStr,
      displayRange: `${startDisplay} - ${endDisplay}`,
      appointment: null
    });
  }
  return slots;
};

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const todayStr = `${yyyy}-${mm}-${dd}`;
  
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  useEffect(() => {
    let mounted = true;
    const loadAppointments = async () => {
      try {
        setLoading(true);
        // Fetch only today's appointments
        const data = await appointmentsService.fetchAppointments(todayStr);
        if (mounted) {
          setAppointments(data || []);
        }
      } catch (err) {
        console.error("Failed to load appointments:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    loadAppointments();
    return () => { mounted = false; };
  }, [todayStr]);

  const timelineSlots = useMemo(() => {
    const baseSlots = generateSlots();
    // Map appointments into base slots
    appointments.forEach(apt => {
      if (!apt.slot_start) return;
      const normalizedAptStart = normalizeTime(apt.slot_start);
      const targetSlot = baseSlots.find(s => s.startStr === normalizedAptStart);
      if (targetSlot) {
        targetSlot.appointment = apt;
      }
    });
    return baseSlots;
  }, [appointments]);

  const bookedCount = timelineSlots.filter(s => s.appointment).length;
  const availableCount = 15 - bookedCount;
  const isFull = bookedCount === 15;

  const getInitials = (name) => {
    if (!name) return '?';
    const parts = name.split(' ');
    return parts.length > 1 ? `${parts[0][0]}${parts[parts.length-1][0]}`.toUpperCase() : name[0].toUpperCase();
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Good morning, Dr. Suman</h1>
        <p>Here's your chamber schedule for {formattedDate}.</p>
      </div>

      <div className="summary-cards-grid">
        <div className="summary-card">
          <div className="summary-card-header">
            <h3 className="summary-card-title">Today's Appointments</h3>
            <span className="summary-card-icon"><Icons.Calendar /></span>
          </div>
          <p className="summary-card-value">{bookedCount} / 15</p>
          <p className="summary-card-subtitle">{isFull ? "Today is fully booked" : "Total booked"}</p>
        </div>
        <div className="summary-card">
          <div className="summary-card-header">
            <h3 className="summary-card-title">Available Slots</h3>
            <span className="summary-card-icon"><Icons.CheckCircle /></span>
          </div>
          <p className="summary-card-value">{availableCount}</p>
          <p className="summary-card-subtitle">Available for new bookings</p>
        </div>
        <div className="summary-card">
          <div className="summary-card-header">
            <h3 className="summary-card-title">Chamber Hours</h3>
            <span className="summary-card-icon"><Icons.Clock /></span>
          </div>
          <p className="summary-card-value" style={{fontSize: '1.25rem'}}>7:30 PM – 10:00 PM</p>
          <p className="summary-card-subtitle">Daily schedule</p>
        </div>
        <div className="summary-card">
          <div className="summary-card-header">
            <h3 className="summary-card-title">Slot Duration</h3>
            <span className="summary-card-icon"><Icons.Clock /></span>
          </div>
          <p className="summary-card-value">10 min</p>
          <p className="summary-card-subtitle">Fixed duration</p>
        </div>
      </div>

      <div className="dashboard-section-card full-width">
        <div className="section-header">
          <h2>Timeline</h2>
          {isFull && <div className="status-badge error">TODAY IS FULL</div>}
        </div>
        
        <div className="timeline-view">
          {loading ? (
            <div className="loading-state">Loading timeline...</div>
          ) : (
            <div className="slots-grid">
              {timelineSlots.map(slot => (
                <div key={slot.id} className={`slot-item ${slot.appointment ? 'booked' : 'available'}`}>
                  <div className="slot-time-col">
                    <div className="slot-number">{slot.number}</div>
                    <div className="slot-range">{slot.displayRange}</div>
                  </div>
                  <div className="slot-details-col">
                    {slot.appointment ? (
                      <div className="slot-booked-card">
                        <div className="patient-avatar-small">
                          {getInitials(slot.appointment.patient_name || slot.appointment.name)}
                        </div>
                        <div className="booked-info">
                          <h4 className="patient-name">{slot.appointment.patient_name || slot.appointment.name}</h4>
                          <span className="patient-phone">{slot.appointment.patient_phone || slot.appointment.phone || 'No phone'}</span>
                        </div>
                        <div className="booked-meta">
                          <div className="apt-id">{slot.appointment.appointment_number || slot.appointment.id}</div>
                          <div className={`status-indicator ${slot.appointment.status || 'confirmed'}`}>
                            <span className="status-dot"></span>
                            {slot.appointment.status || 'confirmed'}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="slot-available-card">
                        <span className="available-text">AVAILABLE</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
