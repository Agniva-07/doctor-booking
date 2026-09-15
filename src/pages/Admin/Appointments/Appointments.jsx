import React, { useState, useEffect, useMemo } from 'react';
import './Appointments.css';
import { appointmentsService } from '../../../services/appointments';

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

const normalizeTime = (timeStr) => {
  if (!timeStr) return '';
  const upper = timeStr.toUpperCase();
  if (upper.includes('PM') || upper.includes('AM')) return timeStr;
  if (timeStr.length >= 5) {
    const [h, m] = timeStr.split(':');
    let hour = parseInt(h, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    if (hour > 12) hour -= 12;
    if (hour === 0) hour = 12;
    return `${hour}:${m} ${ampm}`;
  }
  return timeStr;
};

const formatYMD = (d) => {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null); 
  
  const [searchTerm, setSearchTerm] = useState('');
  
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date()); 

  const [selectedApt, setSelectedApt] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    const loadAppointments = async () => {
      try {
        setLoading(true);
        // Fetch all appointments for client-side filtering
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

  const getInitials = (name) => {
    if (!name) return '?';
    const parts = name.split(' ');
    return parts.length > 1 ? `${parts[0][0]}${parts[parts.length-1][0]}`.toUpperCase() : name[0].toUpperCase();
  };

  const filteredAppointments = useMemo(() => {
    const selectedYMD = formatYMD(selectedDate);
    return appointments.filter(apt => {
      const patientName = apt.patient_name || apt.name || '';
      const phone = apt.patient_phone || apt.phone || '';
      const aptId = apt.appointment_number || apt.id || '';
      const aptDate = apt.appointment_date || apt.date;
      
      const matchSearch = patientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          phone.includes(searchTerm) ||
                          aptId.toString().toLowerCase().includes(searchTerm.toLowerCase());
                          
      const matchDate = aptDate === selectedYMD;

      if (searchTerm.trim() !== '') {
        return matchSearch;
      }

      return matchDate;
    });
  }, [appointments, searchTerm, selectedDate]);

  const openDrawer = (apt) => {
    setSelectedApt(apt);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => setSelectedApt(null), 250);
  };

  const handleCheckboxChange = async (e, apt) => {
    e.stopPropagation();
    const isCompleted = apt.status === 'completed';
    const isCancelled = apt.status === 'cancelled';
    
    if (isCompleted || isCancelled || updatingId === apt.id) return;
    
    try {
      setUpdatingId(apt.id);
      await appointmentsService.updateAppointmentStatus(apt.id, 'completed');
      setAppointments(prev => prev.map(a => 
        a.id === apt.id ? { ...a, status: 'completed' } : a
      ));
      if (selectedApt && selectedApt.id === apt.id) {
        setSelectedApt({ ...selectedApt, status: 'completed' });
      }
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Failed to mark appointment as completed.");
    } finally {
      setUpdatingId(null);
    }
  };

  // Calendar rendering
  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const numDays = daysInMonth(year, month);
    const startDay = firstDayOfMonth(year, month);
    
    const days = [];
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }
    
    const todayYMD = formatYMD(new Date());
    const selectedYMD = formatYMD(selectedDate);
    
    const appointmentDates = new Set(appointments.map(a => a.appointment_date || a.date));

    for (let d = 1; d <= numDays; d++) {
      const dateObj = new Date(year, month, d);
      const dateYMD = formatYMD(dateObj);
      const isToday = dateYMD === todayYMD;
      const isSelected = dateYMD === selectedYMD;
      const hasAppointment = appointmentDates.has(dateYMD);
      let dayClass = '';
      if (isToday) {
        dayClass = 'calendar-day-today';
      } else if (isSelected) {
        dayClass = 'calendar-day-selected';
      }
      
      days.push(
        <button 
          key={d} 
          className={`calendar-day ${dayClass}`}
          onClick={() => {
            setSelectedDate(dateObj);
            // reset current month to the selected date's month if clicking from another view somehow, 
            // though here we only show current month's days.
          }}
        >
          <span className="day-number">{d}</span>
          {hasAppointment && <span className="appointment-dot"></span>}
        </button>
      );
    }
    
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    return (
      <div className="calendar-card dashboard-section-card">
        <div className="calendar-header">
          <button className="calendar-nav-btn" onClick={() => setCurrentMonth(new Date(year, month - 1, 1))} aria-label="Previous month">
            <Icons.ChevronLeft />
          </button>
          <h3>{monthNames[month]} {year}</h3>
          <button className="calendar-nav-btn" onClick={() => setCurrentMonth(new Date(year, month + 1, 1))} aria-label="Next month">
            <Icons.ChevronRight />
          </button>
        </div>
        <div className="calendar-grid">
          <div className="calendar-dow">Su</div>
          <div className="calendar-dow">Mo</div>
          <div className="calendar-dow">Tu</div>
          <div className="calendar-dow">We</div>
          <div className="calendar-dow">Th</div>
          <div className="calendar-dow">Fr</div>
          <div className="calendar-dow">Sa</div>
          {days}
        </div>
      </div>
    );
  };

  return (
    <div className="appointments-container">
      <div className="appointments-header">
        <div className="appointments-header-text">
          <h1>Appointments</h1>
          <p>Manage and review patient appointments.</p>
        </div>
        <div className="appointments-count">
          <strong>{filteredAppointments.length}</strong> appointment{filteredAppointments.length !== 1 ? 's' : ''}
        </div>
      </div>

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
      </div>

      <div className="appointments-main-layout">
        <div className="appointments-table-wrapper">
          <div className="dashboard-section-card">
            {loading ? (
              <div style={{padding: '40px', textAlign: 'center', color: 'var(--text-muted)'}}>Loading appointments...</div>
            ) : (
              <div className="table-responsive">
                <table className="appointments-table">
                  <thead>
                    <tr>
                      <th>Appt No.</th>
                      <th>Patient Name</th>
                      <th>Contact</th>
                      <th>Date</th>
                      <th>Assigned Slot</th>
                      {/* <th style={{width: '120px'}}>Done</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAppointments.length > 0 ? filteredAppointments.map(apt => {
                      const patientName = apt.patient_name || apt.name || 'Unknown';
                      const phone = apt.patient_phone || apt.phone || '-';
                      const date = apt.appointment_date || apt.date;
                      const time = normalizeTime(apt.slot_start);
                      const aptNo = apt.appointment_number || apt.id;
                      
                      const isCompleted = apt.status === 'completed';
                      const isCancelled = apt.status === 'cancelled';
                      const isUpdating = updatingId === apt.id;
                      
                      return (
                        <tr key={apt.id} onClick={() => openDrawer(apt)} style={{cursor: 'pointer'}}>
                          <td data-label="Appointment No" style={{fontFamily: 'monospace', color: 'var(--text-muted)'}}>{aptNo}</td>
                          <td data-label="Patient Name">
                            <div className="patient-cell">
                              <div className="patient-avatar">{getInitials(patientName)}</div>
                              <span className="patient-name">{patientName}</span>
                            </div>
                          </td>
                          <td data-label="Contact">{phone}</td>
                          <td data-label="Date">{date ? new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '-'}</td>
                          <td data-label="Assigned Slot">
                            <span className="slot-badge">{time || '-'}</span>
                          </td>
                          {/* 
                          <td data-label="Done" onClick={e => e.stopPropagation()}>
                            <label className={`done-action-wrapper ${isCompleted ? 'is-completed' : ''} ${isCancelled ? 'disabled-cancelled' : ''} ${isUpdating ? 'updating' : ''}`}>
                              <div className="done-checkbox">
                                <input 
                                  type="checkbox"
                                  checked={isCompleted}
                                  disabled={isCompleted || isCancelled || isUpdating}
                                  onChange={(e) => handleCheckboxChange(e, apt)}
                                  title={isCancelled ? "Cannot mark cancelled appointment as done" : "Mark as completed"}
                                />
                                <span className="done-checkmark"></span>
                              </div>
                              <span className="done-label">Done</span>
                            </label>
                          </td>
                          */}
                        </tr>
                      );
                    }) : (
                      <tr>
                        <td colSpan="6" style={{textAlign: 'center', color: 'var(--text-muted)', padding: '40px'}}>
                          No appointments found for {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <div className="appointments-calendar-wrapper">
          {renderCalendar()}
        </div>
      </div>

      {isDrawerOpen && selectedApt && (
        <div className="drawer-overlay" onClick={closeDrawer}>
          <div className="drawer-content" onClick={e => e.stopPropagation()}>
            <div className="drawer-header">
              <div className="drawer-header-left">
                <h2>Appointment Details</h2>
                <span className="drawer-subtitle">
                  {selectedApt.appointment_number || selectedApt.id}
                </span>
              </div>
              <button className="drawer-close-btn" onClick={closeDrawer}>
                <Icons.X />
              </button>
            </div>
            
            <div className="drawer-body">
              <div className="drawer-section">
                <div className="patient-profile">
                  <div className="patient-avatar">{getInitials(selectedApt.patient_name || selectedApt.name)}</div>
                  <div>
                    <h3>{selectedApt.patient_name || selectedApt.name}</h3>
                    <p>{selectedApt.patient_phone || selectedApt.phone}</p>
                  </div>
                </div>
              </div>

              <div className="drawer-section">
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Date</span>
                    <span className="detail-value">
                      {(selectedApt.appointment_date || selectedApt.date) 
                        ? new Date(selectedApt.appointment_date || selectedApt.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
                        : '-'}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Time</span>
                    <span className="detail-value">{normalizeTime(selectedApt.slot_start)} {selectedApt.slot_end ? `- ${normalizeTime(selectedApt.slot_end)}` : ''}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Internal Status</span>
                    <span className="detail-value" style={{textTransform: 'capitalize'}}>{selectedApt.status || 'confirmed'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Booked On</span>
                    <span className="detail-value">
                      {selectedApt.created_at ? new Date(selectedApt.created_at).toLocaleDateString() : '-'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="drawer-section">
                <div className="detail-item" style={{marginBottom: '12px'}}>
                  <span className="detail-label">Address</span>
                  <span className="detail-value">{selectedApt.patient_address || selectedApt.address || '-'}</span>
                </div>
              </div>
            </div>

            <div className="drawer-actions">
              <button className="btn-secondary" onClick={closeDrawer} style={{gridColumn: '1 / -1'}}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
