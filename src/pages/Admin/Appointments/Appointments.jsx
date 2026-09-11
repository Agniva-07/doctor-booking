import React, { useState, useMemo } from 'react';
import './Appointments.css';
import { mockAppointments } from '../mockData';

const Icons = {
  Search: () => (
    <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  ),
  X: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  )
};

const mockTimeSlots = [
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM"
];

const Appointments = () => {
  const [appointments, setAppointments] = useState(mockAppointments);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');

  const [selectedApt, setSelectedApt] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isRescheduleMode, setIsRescheduleMode] = useState(false);
  
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [rescheduleTime, setRescheduleTime] = useState('');

  const getInitials = (name) => {
    const parts = name.split(' ');
    return parts.length > 1 ? `${parts[0][0]}${parts[parts.length-1][0]}` : name[0];
  };

  const filteredAppointments = useMemo(() => {
    return appointments.filter(apt => {
      const matchSearch = apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          apt.phone.includes(searchTerm) ||
                          apt.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = statusFilter === 'all' || apt.status === statusFilter;
      const matchDate = !dateFilter || apt.date === dateFilter;

      return matchSearch && matchStatus && matchDate;
    });
  }, [appointments, searchTerm, statusFilter, dateFilter]);

  const openDrawer = (apt) => {
    setSelectedApt(apt);
    setIsRescheduleMode(false);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => setSelectedApt(null), 250); // wait for animation
  };

  const updateStatus = (id, newStatus) => {
    setAppointments(prev => prev.map(apt => 
      apt.id === id ? { ...apt, status: newStatus } : apt
    ));
    if (selectedApt && selectedApt.id === id) {
      setSelectedApt({ ...selectedApt, status: newStatus });
    }
  };

  const handleConfirm = () => updateStatus(selectedApt.id, 'confirmed');
  const handleCancel = () => {
    updateStatus(selectedApt.id, 'cancelled');
    closeDrawer();
  };
  const handleComplete = () => updateStatus(selectedApt.id, 'completed');

  const enterRescheduleMode = () => {
    setRescheduleDate(selectedApt.date);
    setRescheduleTime('');
    setIsRescheduleMode(true);
  };

  const submitReschedule = () => {
    if (!rescheduleDate || !rescheduleTime) return;
    
    setAppointments(prev => prev.map(apt => 
      apt.id === selectedApt.id 
        ? { ...apt, date: rescheduleDate, time: rescheduleTime, status: 'confirmed' } 
        : apt
    ));
    
    setSelectedApt({ ...selectedApt, date: rescheduleDate, time: rescheduleTime, status: 'confirmed' });
    setIsRescheduleMode(false);
  };

  return (
    <div className="appointments-container">
      <div className="appointments-header">
        <div className="appointments-header-text">
          <h1>Appointments</h1>
          <p>Manage and review patient appointments.</p>
        </div>
        <div className="appointments-count">
          <strong>{filteredAppointments.length}</strong> appointments
        </div>
      </div>

      {/* Controls */}
      <div className="appointments-controls">
        <div className="control-group">
          <label htmlFor="search">Search</label>
          <div className="input-with-icon">
            <Icons.Search />
            <input 
              type="text" 
              id="search"
              className="control-input"
              placeholder="Patient name, phone, or ID" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="control-group">
          <label htmlFor="status">Status</label>
          <select 
            id="status" 
            className="control-input"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <div className="control-group">
          <label htmlFor="date">Date</label>
          <input 
            type="date" 
            id="date" 
            className="control-input"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="dashboard-section-card">
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Contact</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th style={{textAlign: 'right'}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.length > 0 ? filteredAppointments.map(apt => (
              <tr key={apt.id} onClick={() => openDrawer(apt)} style={{cursor: 'pointer'}}>
                <td data-label="Patient Name">
                  <div className="patient-cell">
                    <div className="patient-avatar">{getInitials(apt.patientName)}</div>
                    <span className="patient-name">{apt.patientName}</span>
                  </div>
                </td>
                <td data-label="Contact">{apt.phone}</td>
                <td data-label="Date">{new Date(apt.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                <td data-label="Time">{apt.time}</td>
                <td data-label="Status">
                  <div className={`status-indicator ${apt.status}`}>
                    <span className="status-dot"></span>
                    {apt.status}
                  </div>
                </td>
                <td data-label="Actions" style={{textAlign: 'right'}} onClick={e => e.stopPropagation()}>
                  <button className="btn-secondary" style={{padding: '6px 12px', fontSize: '0.8125rem'}} onClick={() => openDrawer(apt)}>
                    Review
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="6" style={{textAlign: 'center', color: 'var(--text-muted)', padding: '40px'}}>
                  No appointments match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Slide-out Drawer */}
      {isDrawerOpen && (
        <div className="drawer-overlay" onClick={closeDrawer}>
          <div className="drawer-content" onClick={e => e.stopPropagation()}>
            <div className="drawer-header">
              <div className="drawer-header-left">
                <h2>{isRescheduleMode ? 'Reschedule Appointment' : 'Appointment Details'}</h2>
                <span className="drawer-subtitle">{selectedApt.id} • <span style={{textTransform: 'capitalize'}}>{selectedApt.status}</span></span>
              </div>
              <button className="drawer-close-btn" onClick={closeDrawer}>
                <Icons.X />
              </button>
            </div>
            
            <div className="drawer-body">
              {!isRescheduleMode ? (
                <>
                  <div className="drawer-section">
                    <div className="patient-profile">
                      <div className="patient-avatar">{getInitials(selectedApt.patientName)}</div>
                      <div>
                        <h3>{selectedApt.patientName}</h3>
                        <p>{selectedApt.phone}</p>
                      </div>
                    </div>
                  </div>

                  <div className="drawer-section">
                    <div className="detail-grid">
                      <div className="detail-item">
                        <span className="detail-label">Date</span>
                        <span className="detail-value">{new Date(selectedApt.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Time</span>
                        <span className="detail-value">{selectedApt.time}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Status</span>
                        <span className="detail-value" style={{textTransform: 'capitalize'}}>{selectedApt.status}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Booked On</span>
                        <span className="detail-value">{new Date(selectedApt.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="drawer-section">
                    <div className="detail-item" style={{marginBottom: '12px'}}>
                      <span className="detail-label">Reason for visit</span>
                      <span className="detail-value">{selectedApt.reason}</span>
                    </div>
                    {selectedApt.notes && (
                      <div className="detail-item">
                        <span className="detail-label">Additional Notes</span>
                        <div className="notes-box">{selectedApt.notes}</div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="drawer-section">
                     <p style={{color: 'var(--text-muted)', marginBottom: '16px'}}>Select a new date and time for <strong>{selectedApt.patientName}</strong>.</p>
                     
                     <div className="control-group" style={{ marginBottom: '24px' }}>
                        <label htmlFor="rescheduleDate">New Date</label>
                        <input 
                          type="date" 
                          id="rescheduleDate" 
                          className="control-input"
                          value={rescheduleDate}
                          onChange={(e) => {
                            setRescheduleDate(e.target.value);
                            setRescheduleTime(''); 
                          }}
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>

                      {rescheduleDate && (
                        <div className="control-group">
                          <label>Available Slots</label>
                          <div className="time-slots-grid">
                            {mockTimeSlots.map(slot => (
                              <button 
                                key={slot}
                                className={`time-slot-btn ${rescheduleTime === slot ? 'selected' : ''}`}
                                onClick={() => setRescheduleTime(slot)}
                              >
                                {slot}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                  </div>
                </>
              )}
            </div>

            <div className="drawer-actions">
              {!isRescheduleMode ? (
                <>
                  {selectedApt.status !== 'completed' && selectedApt.status !== 'cancelled' ? (
                    <>
                      <button className="btn-secondary" onClick={enterRescheduleMode}>Reschedule</button>
                      {selectedApt.status === 'pending' && <button className="btn-primary" onClick={handleConfirm}>Confirm</button>}
                      {selectedApt.status === 'confirmed' && <button className="btn-primary" onClick={handleComplete}>Complete</button>}
                      <button className="btn-danger" onClick={handleCancel} style={{gridColumn: '1 / -1'}}>Cancel Appointment</button>
                    </>
                  ) : (
                     <button className="btn-secondary" onClick={closeDrawer} style={{gridColumn: '1 / -1'}}>Close</button>
                  )}
                </>
              ) : (
                <>
                  <button className="btn-secondary" onClick={() => setIsRescheduleMode(false)}>Back</button>
                  <button 
                    className="btn-primary" 
                    disabled={!rescheduleDate || !rescheduleTime}
                    onClick={submitReschedule}
                    style={{ opacity: (!rescheduleDate || !rescheduleTime) ? 0.5 : 1 }}
                  >
                    Save Changes
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
