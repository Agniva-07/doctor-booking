import { useState, useEffect } from 'react';
import { appointmentsService } from '../../../services/appointments';
import Button from '../../../components/Button/Button';

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusLoading, setStatusLoading] = useState(null); // track id being updated

  useEffect(() => {
    let mounted = true;
    async function fetchData() {
      try {
        const data = await appointmentsService.fetchAppointments();
        if (mounted) setAppointments(data || []);
      } catch (err) {
        if (mounted) setError(err.message || 'Failed to load appointments.');
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchData();
    return () => mounted = false;
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    setStatusLoading(id);
    try {
      await appointmentsService.updateAppointmentStatus(id, newStatus);
      setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
    } catch (err) {
      alert("Failed to update status: " + err.message);
    } finally {
      setStatusLoading(null);
    }
  };

  if (loading) return <div className="admin-loading">Loading Appointments...</div>;
  if (error) return <div className="admin-card"><p className="error-text">{error}</p></div>;

  return (
    <div className="admin-appointments">
      <h1 className="admin-page-title">All Appointments</h1>

      <div className="admin-card">
        {appointments.length === 0 ? (
          <p className="empty-state">No appointments found in the system.</p>
        ) : (
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Patient Info</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map(app => (
                  <tr key={app.id}>
                    <td>{app.appointment_number}</td>
                    <td>{new Date(app.appointment_date).toLocaleDateString('en-GB')}</td>
                    <td>{app.slot_start.substring(0, 5)} - {app.slot_end.substring(0, 5)}</td>
                    <td>
                      <strong>{app.patient_name}</strong><br/>
                      <a href={`tel:${app.phone}`} style={{ color: 'inherit', textDecoration: 'underline' }}>{app.phone}</a>
                    </td>
                    <td><span className={`status-badge status-${app.status}`}>{app.status}</span></td>
                    <td>
                      {app.status === 'confirmed' ? (
                        <Button 
                          size="sm" 
                          variant="secondary" 
                          onClick={() => handleStatusChange(app.id, 'cancelled')}
                          disabled={statusLoading === app.id}
                        >
                          Cancel
                        </Button>
                      ) : (
                        <Button 
                          size="sm" 
                          onClick={() => handleStatusChange(app.id, 'confirmed')}
                          disabled={statusLoading === app.id}
                        >
                          Confirm
                        </Button>
                      )}
                    </td>
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
