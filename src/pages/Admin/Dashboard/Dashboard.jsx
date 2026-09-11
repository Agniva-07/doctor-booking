import React, { useMemo } from 'react';
import './Dashboard.css';
import { mockAppointments, mockDoctorProfile } from '../mockData';

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
  Archive: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line>
    </svg>
  ),
  MoreHorizontal: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle>
    </svg>
  )
};

const Dashboard = () => {
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const getInitials = (name) => {
    const parts = name.split(' ');
    return parts.length > 1 ? `${parts[0][0]}${parts[parts.length-1][0]}` : name[0];
  };

  const stats = useMemo(() => {
    let todaysCount = 0;
    let pendingCount = 0;
    let confirmedCount = 0;
    let completedCount = 0;

    mockAppointments.forEach(apt => {
      if (apt.date === todayStr) todaysCount++;
      if (apt.status === 'pending') pendingCount++;
      if (apt.status === 'confirmed') confirmedCount++;
      if (apt.status === 'completed') completedCount++;
    });

    return { todaysCount, pendingCount, confirmedCount, completedCount };
  }, [todayStr]);

  const todaysAppointments = mockAppointments
    .filter(apt => apt.date === todayStr)
    .sort((a, b) => a.time.localeCompare(b.time));

  const upcomingAppointments = mockAppointments
    .filter(apt => apt.date > todayStr)
    .sort((a, b) => {
      const dateCompare = a.date.localeCompare(b.date);
      if (dateCompare === 0) return a.time.localeCompare(b.time);
      return dateCompare;
    })
    .slice(0, 4);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Good morning, {mockDoctorProfile.name.split(' ')[1]}</h1>
        <p>Here's what's happening with your appointments on {formattedDate}.</p>
      </div>

      <div className="summary-cards-grid">
        <div className="summary-card">
          <div className="summary-card-header">
            <h3 className="summary-card-title">Today's Appointments</h3>
            <span className="summary-card-icon"><Icons.Calendar /></span>
          </div>
          <p className="summary-card-value">{stats.todaysCount}</p>
          <p className="summary-card-subtitle">Scheduled for today</p>
        </div>
        <div className="summary-card">
          <div className="summary-card-header">
            <h3 className="summary-card-title">Pending</h3>
            <span className="summary-card-icon"><Icons.Clock /></span>
          </div>
          <p className="summary-card-value">{stats.pendingCount}</p>
          <p className="summary-card-subtitle">Requires confirmation</p>
        </div>
        <div className="summary-card">
          <div className="summary-card-header">
            <h3 className="summary-card-title">Confirmed</h3>
            <span className="summary-card-icon"><Icons.CheckCircle /></span>
          </div>
          <p className="summary-card-value">{stats.confirmedCount}</p>
          <p className="summary-card-subtitle">Total upcoming</p>
        </div>
        <div className="summary-card">
          <div className="summary-card-header">
            <h3 className="summary-card-title">Completed</h3>
            <span className="summary-card-icon"><Icons.Archive /></span>
          </div>
          <p className="summary-card-value">{stats.completedCount}</p>
          <p className="summary-card-subtitle">Recent history</p>
        </div>
      </div>

      <div className="dashboard-content-grid">
        {/* Today's Appointments Table */}
        <div className="dashboard-section-card">
          <div className="section-header">
            <h2>Today's Schedule</h2>
            <button className="view-all-btn">View all</button>
          </div>
          
          <table className="appointments-table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Time</th>
                <th>Phone</th>
                <th>Status</th>
                <th style={{textAlign: 'right'}}>Action</th>
              </tr>
            </thead>
            <tbody>
              {todaysAppointments.length > 0 ? todaysAppointments.map(apt => (
                <tr key={apt.id}>
                  <td data-label="Patient">
                    <div className="patient-cell">
                      <div className="patient-avatar">{getInitials(apt.patientName)}</div>
                      <span className="patient-name">{apt.patientName}</span>
                    </div>
                  </td>
                  <td data-label="Time">{apt.time}</td>
                  <td data-label="Phone">{apt.phone}</td>
                  <td data-label="Status">
                    <div className={`status-indicator ${apt.status}`}>
                      <span className="status-dot"></span>
                      {apt.status}
                    </div>
                  </td>
                  <td data-label="Action" style={{textAlign: 'right'}}>
                    <button className="action-btn-compact" aria-label="View Details">
                      <Icons.MoreHorizontal />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" style={{textAlign: 'center', color: 'var(--text-muted)', padding: '32px'}}>
                    No appointments scheduled for today.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Upcoming Appointments Timeline */}
        <div className="dashboard-section-card">
          <div className="section-header">
            <h2>Upcoming</h2>
          </div>
          
          <div className="upcoming-timeline">
            {upcomingAppointments.length > 0 ? upcomingAppointments.map(apt => {
              const dateObj = new Date(apt.date);
              const month = dateObj.toLocaleDateString('en-US', { month: 'short' });
              const day = dateObj.toLocaleDateString('en-US', { day: '2-digit' });
              
              return (
                <div key={apt.id} className="timeline-item">
                  <div className="timeline-date">
                    <span className="timeline-month">{month}</span>
                    <span className="timeline-day">{day}</span>
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-header">
                      <h4 className="timeline-name">{apt.patientName}</h4>
                      <span className="timeline-time">{apt.time}</span>
                    </div>
                    <div className="timeline-status">
                      <div className={`status-indicator ${apt.status}`} style={{fontSize: '0.75rem'}}>
                        <span className="status-dot"></span>
                        {apt.status}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }) : (
              <p style={{color: 'var(--text-muted)'}}>No upcoming appointments.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
