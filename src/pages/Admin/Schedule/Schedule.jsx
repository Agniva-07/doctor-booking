import React, { useState } from 'react';
import './Schedule.css';
import { mockScheduleSettings } from '../mockData';

const Icons = {
  Trash: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    </svg>
  )
};

const Schedule = () => {
  const [workingDays, setWorkingDays] = useState(mockScheduleSettings.workingDays);
  const [workingHours, setWorkingHours] = useState(mockScheduleSettings.workingHours);
  const [slotDuration, setSlotDuration] = useState(mockScheduleSettings.slotDuration);
  const [blockedDates, setBlockedDates] = useState(mockScheduleSettings.blockedDates);

  const [newBlockDate, setNewBlockDate] = useState('');
  const [newBlockReason, setNewBlockReason] = useState('');

  const toggleDay = (day) => {
    setWorkingDays(prev => ({
      ...prev,
      [day]: !prev[day]
    }));
  };

  const handleRemoveBlockedDate = (indexToRemove) => {
    setBlockedDates(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleAddBlockedDate = () => {
    if (!newBlockDate) return;
    setBlockedDates(prev => [...prev, {
      date: newBlockDate,
      reason: newBlockReason || 'No reason provided'
    }].sort((a, b) => new Date(a.date) - new Date(b.date)));
    setNewBlockDate('');
    setNewBlockReason('');
  };

  const daysOfWeek = [
    { key: 'Monday', label: 'MON' },
    { key: 'Tuesday', label: 'TUE' },
    { key: 'Wednesday', label: 'WED' },
    { key: 'Thursday', label: 'THU' },
    { key: 'Friday', label: 'FRI' },
    { key: 'Saturday', label: 'SAT' },
    { key: 'Sunday', label: 'SUN' },
  ];

  const slotOptions = ["15 minutes", "20 minutes", "30 minutes", "45 minutes", "60 minutes"];

  return (
    <div className="schedule-container">
      <div className="schedule-header">
        <h1>Schedule</h1>
        <p>Manage your working hours and availability.</p>
      </div>

      <div className="schedule-grid">
        <div className="schedule-column">
          <div className="schedule-card" style={{ marginBottom: '32px' }}>
            <h2>Working Days</h2>
            <div className="weekly-schedule">
              {daysOfWeek.map(({key, label}) => {
                const isWorking = workingDays[key];
                return (
                  <div className={`day-row ${isWorking ? 'is-working' : ''}`} key={key}>
                    <div className="day-label">
                      <span>{label}</span>
                    </div>
                    <div className="day-status">
                      <span className="status-dot" style={{
                        width: '6px', height: '6px', borderRadius: '50%',
                        backgroundColor: isWorking ? 'var(--primary)' : 'var(--text-light)'
                      }}></span>
                      {isWorking ? 'Working' : 'Off'}
                    </div>
                    <label className="toggle-switch">
                      <input 
                        type="checkbox" 
                        checked={isWorking}
                        onChange={() => toggleDay(key)}
                        aria-label={`Toggle ${key}`}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="schedule-card">
            <h2>Working Hours & Slots</h2>
            
            <div style={{display: 'flex', gap: '16px', marginBottom: '24px'}}>
              <div className="form-group" style={{flex: 1, marginBottom: 0}}>
                <label>Opening Time</label>
                <select 
                  className="control-input"
                  value={workingHours.opening}
                  onChange={(e) => setWorkingHours({...workingHours, opening: e.target.value})}
                >
                  <option value="08:00 AM">08:00 AM</option>
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                </select>
              </div>

              <div className="form-group" style={{flex: 1, marginBottom: 0}}>
                <label>Closing Time</label>
                <select 
                  className="control-input"
                  value={workingHours.closing}
                  onChange={(e) => setWorkingHours({...workingHours, closing: e.target.value})}
                >
                  <option value="04:00 PM">04:00 PM</option>
                  <option value="05:00 PM">05:00 PM</option>
                  <option value="06:00 PM">06:00 PM</option>
                  <option value="07:00 PM">07:00 PM</option>
                  <option value="08:00 PM">08:00 PM</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Slot Duration</label>
              <div className="option-group">
                {slotOptions.map(option => (
                  <button
                    key={option}
                    className={`option-pill ${slotDuration === option ? 'active' : ''}`}
                    onClick={() => setSlotDuration(option)}
                  >
                    {option.replace(' minutes', ' min')}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="schedule-column">
          <div className="schedule-card">
            <h2>Blocked Dates</h2>
            <p style={{color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '24px'}}>
              Add specific dates when you are unavailable. Patients will not be able to book appointments on these days.
            </p>

            <div className="blocked-dates-list">
              {blockedDates.length > 0 ? blockedDates.map((block, idx) => (
                <div className="blocked-date-card" key={idx}>
                  <div className="blocked-date-info">
                    <strong>{new Date(block.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</strong>
                    <span>{block.reason}</span>
                  </div>
                  <button 
                    className="btn-icon-danger" 
                    onClick={() => handleRemoveBlockedDate(idx)}
                    aria-label="Remove blocked date"
                  >
                    <Icons.Trash />
                  </button>
                </div>
              )) : (
                <div className="empty-state">
                  No blocked dates configured.
                </div>
              )}
            </div>

            <div className="add-block-form">
              <div className="form-group">
                <label>Date</label>
                <input 
                  type="date" 
                  className="control-input" 
                  value={newBlockDate}
                  onChange={(e) => setNewBlockDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div className="form-group">
                <label>Reason (Optional)</label>
                <input 
                  type="text" 
                  className="control-input" 
                  placeholder="e.g. Conference"
                  value={newBlockReason}
                  onChange={(e) => setNewBlockReason(e.target.value)}
                />
              </div>
              <button 
                className="btn-primary" 
                onClick={handleAddBlockedDate}
                disabled={!newBlockDate}
                style={{height: '42px', opacity: !newBlockDate ? 0.5 : 1}}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
