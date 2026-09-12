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
  ),
  ChevronLeft: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
  ),
  ChevronRight: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  )
};

const formatYMD = (d) => {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const today = new Date();
  const todayStr = formatYMD(today);
  
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
        // Fetch ALL appointments to show counts across the month
        const data = await appointmentsService.fetchAppointments();
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
  }, []);

  const todaysAppointments = useMemo(() => {
    return appointments.filter(apt => {
      const d = apt.appointment_date || apt.date;
      return d === todayStr;
    });
  }, [appointments, todayStr]);

  const bookedCount = todaysAppointments.length;
  const availableCount = Math.max(0, 15 - bookedCount);
  const isFull = bookedCount >= 15;

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const numDays = daysInMonth(year, month);
    const startDay = firstDayOfMonth(year, month);
    
    const days = [];
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="dash-cal-day empty"></div>);
    }
    
    for (let d = 1; d <= numDays; d++) {
      const dateObj = new Date(year, month, d);
      const dateYMD = formatYMD(dateObj);
      const isToday = dateYMD === todayStr;
      
      const dayAppts = appointments.filter(a => (a.appointment_date || a.date) === dateYMD);
      const count = dayAppts.length;
      
      days.push(
        <div key={d} className={`dash-cal-day ${isToday ? 'dash-cal-today' : ''} ${count > 0 ? 'has-appointments' : ''}`}>
          <span className="dash-day-num">{d}</span>
          <div className="dash-day-content">
            {count > 0 ? (
              <span className="dash-apt-count">{count} {count === 1 ? 'apt' : 'apts'}</span>
            ) : null}
          </div>
        </div>
      );
    }
    
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    return (
      <div className="dash-calendar-wrapper">
        <div className="dash-calendar-header">
          <button className="dash-cal-nav" onClick={() => setCurrentMonth(new Date(year, month - 1, 1))} aria-label="Previous Month">
            <Icons.ChevronLeft />
          </button>
          <h3>{monthNames[month]} {year}</h3>
          <button className="dash-cal-nav" onClick={() => setCurrentMonth(new Date(year, month + 1, 1))} aria-label="Next Month">
            <Icons.ChevronRight />
          </button>
        </div>
        <div className="dash-calendar-grid">
          <div className="dash-cal-dow">Su</div>
          <div className="dash-cal-dow">Mo</div>
          <div className="dash-cal-dow">Tu</div>
          <div className="dash-cal-dow">We</div>
          <div className="dash-cal-dow">Th</div>
          <div className="dash-cal-dow">Fr</div>
          <div className="dash-cal-dow">Sa</div>
          {days}
        </div>
      </div>
    );
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
          <h2>Monthly Overview</h2>
        </div>
        
        <div className="monthly-view">
          {loading ? (
            <div className="loading-state">Loading calendar...</div>
          ) : (
            renderCalendar()
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
