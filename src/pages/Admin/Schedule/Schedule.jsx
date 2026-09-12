import React, { useState, useEffect } from 'react';
import './Schedule.css';
import { scheduleService } from '../../../services/schedule';

const Icons = {
  Lock: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
  ),
  Info: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
  )
};

const Schedule = () => {
  const [workingDays, setWorkingDays] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const loadSchedule = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await scheduleService.fetchSchedule();
        if (mounted && data) {
          const wdMap = {};
          data.forEach(day => {
            wdMap[day.day_of_week] = day.is_active;
          });
          setWorkingDays(wdMap);
        }
      } catch (err) {
        console.error("Failed to load schedule:", err);
        if (mounted) setError(err.message || 'Failed to fetch schedule data');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    loadSchedule();
    return () => { mounted = false; };
  }, []);

  const toggleDay = async (dayKey) => {
    const newVal = !workingDays[dayKey];
    // Optimistic update
    setWorkingDays(prev => ({ ...prev, [dayKey]: newVal }));
    try {
      await scheduleService.updateSchedule(dayKey, { is_active: newVal });
    } catch (err) {
      console.error("Failed to update schedule day:", err);
      alert(`Failed to update day.`);
      // Revert on error
      setWorkingDays(prev => ({ ...prev, [dayKey]: !newVal }));
    }
  };

  const daysOfWeek = [
    { key: 1, label: 'MON' },
    { key: 2, label: 'TUE' },
    { key: 3, label: 'WED' },
    { key: 4, label: 'THU' },
    { key: 5, label: 'FRI' },
    { key: 6, label: 'SAT' },
    { key: 0, label: 'SUN' },
  ];

  return (
    <div className="schedule-container">
      <div className="schedule-header">
        <h1>Schedule</h1>
        <p>Manage your working days and availability.</p>
      </div>

      {loading ? (
        <div style={{padding: '40px', color: 'var(--text-muted)'}}>Loading schedule...</div>
      ) : error ? (
        <div style={{padding: '40px', color: '#dc2626', background: 'var(--bg-ice)', borderRadius: '8px'}}>
          Error: {error}. Could not load schedule.
        </div>
      ) : (
        <div className="schedule-grid">
          <div className="schedule-column">
            <div className="schedule-card" style={{ marginBottom: '32px' }}>
              <h2>Working Days</h2>
              <div className="weekly-schedule">
                {daysOfWeek.map(({key, label}) => {
                  const isWorking = !!workingDays[key];
                  // If the day wasn't in the DB at all, it will default to false visually.
                  // We only allow toggling if it exists in the workingDays map or we assume 
                  // it will be upserted. Usually updateSchedule needs a record to exist. 
                  // If it doesn't exist, we'll let it try to update and fail if no row exists, 
                  // or the service might handle it.
                  
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
                          aria-label={`Toggle ${label}`}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="schedule-card locked-card">
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px'}}>
                <h2 style={{marginBottom: 0}}>Chamber Configuration</h2>
                <span className="lock-icon" title="Fixed by business rules"><Icons.Lock /></span>
              </div>
              
              <div className="locked-info-grid">
                <div className="locked-info-item">
                  <span className="locked-label">Opening Time</span>
                  <span className="locked-value">7:30 PM</span>
                </div>
                <div className="locked-info-item">
                  <span className="locked-label">Closing Time</span>
                  <span className="locked-value">10:00 PM</span>
                </div>
                <div className="locked-info-item">
                  <span className="locked-label">Slot Duration</span>
                  <span className="locked-value">10 min</span>
                </div>
                <div className="locked-info-item">
                  <span className="locked-label">Daily Capacity</span>
                  <span className="locked-value">15 patients</span>
                </div>
              </div>
              <p className="locked-note">These rules are locked and govern automatic appointment allocation.</p>
            </div>
          </div>

          <div className="schedule-column">
            <div className="schedule-card">
              <h2>Blocked Dates</h2>
              <p style={{color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '24px'}}>
                Add specific dates when you are unavailable. Patients will not be able to book appointments on these days.
              </p>

              <div className="empty-state" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', padding: '32px' }}>
                <Icons.Info />
                <span>Blocked dates persistence is not currently supported by the backend service.</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Schedule;
