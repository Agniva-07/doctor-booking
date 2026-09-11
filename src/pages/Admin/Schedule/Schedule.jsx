import { useState, useEffect } from 'react';
import { scheduleService } from '../../../services/schedule';
import Button from '../../../components/Button/Button';
import './Schedule.css';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function Schedule() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function fetchData() {
      try {
        const data = await scheduleService.fetchSchedule();
        if (mounted) setSchedules(data || []);
      } catch (err) {
        if (mounted) setError(err.message || 'Failed to load schedules.');
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchData();
    return () => mounted = false;
  }, []);

  const handleChange = (dayOfWeek, field, value) => {
    setSchedules(prev => prev.map(s => s.day_of_week === dayOfWeek ? { ...s, [field]: value } : s));
  };

  const handleSave = async (schedule) => {
    setSaving(schedule.day_of_week);
    try {
      await scheduleService.updateSchedule(schedule.day_of_week, {
        start_time: schedule.start_time,
        end_time: schedule.end_time,
        slot_duration_minutes: schedule.slot_duration_minutes,
        is_active: schedule.is_active
      });
      alert(`Schedule for ${DAYS[schedule.day_of_week]} saved successfully.`);
    } catch (err) {
      alert("Failed to save schedule: " + err.message);
    } finally {
      setSaving(null);
    }
  };

  if (loading) return <div className="admin-loading">Loading Schedule...</div>;
  if (error) return <div className="admin-card"><p className="error-text">{error}</p></div>;

  return (
    <div className="admin-schedule">
      <h1 className="admin-page-title">Chamber Schedule</h1>
      
      <div className="admin-card">
        <p style={{ marginBottom: 'var(--space-6)', color: 'var(--color-text-muted)' }}>
          Configure the weekly recurring schedule. Changing this will only affect new bookings.
        </p>

        <div className="schedule-list">
          {schedules.map(sch => (
            <div key={sch.day_of_week} className={`schedule-item ${!sch.is_active ? 'inactive' : ''}`}>
              <div className="schedule-header">
                <h3>{DAYS[sch.day_of_week]}</h3>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={sch.is_active} 
                    onChange={(e) => handleChange(sch.day_of_week, 'is_active', e.target.checked)} 
                  />
                  <span className="slider"></span>
                  <span className="toggle-label">{sch.is_active ? 'Active' : 'Off'}</span>
                </label>
              </div>

              {sch.is_active && (
                <div className="schedule-fields">
                  <div className="form-group">
                    <label>Start Time</label>
                    <input 
                      type="time" 
                      value={sch.start_time} 
                      onChange={(e) => handleChange(sch.day_of_week, 'start_time', e.target.value)} 
                    />
                  </div>
                  <div className="form-group">
                    <label>End Time</label>
                    <input 
                      type="time" 
                      value={sch.end_time} 
                      onChange={(e) => handleChange(sch.day_of_week, 'end_time', e.target.value)} 
                    />
                  </div>
                  <div className="form-group">
                    <label>Duration (mins)</label>
                    <input 
                      type="number" 
                      min="5" 
                      step="5"
                      value={sch.slot_duration_minutes} 
                      onChange={(e) => handleChange(sch.day_of_week, 'slot_duration_minutes', parseInt(e.target.value))} 
                    />
                  </div>
                </div>
              )}
              
              <div className="schedule-actions">
                <Button 
                  size="sm" 
                  onClick={() => handleSave(sch)}
                  disabled={saving === sch.day_of_week}
                >
                  {saving === sch.day_of_week ? 'Saving...' : 'Save'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
