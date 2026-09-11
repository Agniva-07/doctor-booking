import { useState, useEffect } from 'react';
import { appointmentsService } from '../../../services/appointments';
import './Dashboard.css';

export default function Dashboard() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    async function fetchDashboardData() {
      try {
        const data = await appointmentsService.fetchAppointments();
        if (mounted) setAppointments(data || []);
      } catch (err) {
        if (mounted) setError(err.message || 'Failed to load dashboard data.');
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchDashboardData();
    return () => mounted = false;
  }, []);

  if (loading) return <div className="admin-loading">Loading Dashboard...</div>;
  if (error) return <div className="admin-card"><p className="error-text">{error}</p></div>;

  const todayStr = new Date().toISOString().split('T')[0];
  const todaysAppointments = appointments.filter(a => a.appointment_date === todayStr);
  const upcomingAppointments = appointments.filter(a => a.appointment_date > todayStr);

  return (
    <div className="admin-dashboard">
      <h1 className="admin-page-title">Dashboard</h1>
      
      <div className="dashboard-stats">
        <div className="admin-card stat-card">
          <h3>Today's Appointments</h3>
          <span className="stat-number">{todaysAppointments.length}</span>
        </div>
        <div className="admin-card stat-card">
          <h3>Upcoming Appointments</h3>
          <span className="stat-number">{upcomingAppointments.length}</span>
        </div>
      </div>

      <div className="admin-card">
        <h3>Today's Schedule</h3>
        {todaysAppointments.length === 0 ? (
          <p className="empty-state">No appointments scheduled for today.</p>
        ) : (
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Patient Name</th>
                  <th>Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {todaysAppointments.map(app => (
                  <tr key={app.id}>
                    <td>{app.appointment_number}</td>
                    <td>{app.patient_name}</td>
                    <td>{app.slot_start.substring(0, 5)} - {app.slot_end.substring(0, 5)}</td>
                    <td><span className={`status-badge status-${app.status}`}>{app.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
