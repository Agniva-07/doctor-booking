import { useState, useEffect } from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { authService } from '../services/auth';
import './AdminLayout.css';

export default function AdminLayout() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    let mounted = true;

    async function checkAuth() {
      try {
        const currentUser = await authService.getCurrentUser();
        if (mounted) {
          setUser(currentUser);
        }
      } catch {
        if (mounted) setUser(null);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    checkAuth();

    const { data: { subscription } } = authService.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        // Double check admin status on auth change
        const currentUser = await authService.getCurrentUser();
        if (mounted) setUser(currentUser);
      } else {
        if (mounted) setUser(null);
      }
    });

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await authService.logout();
    setUser(null);
  };

  if (loading) {
    return <div className="admin-loading">Loading Admin Panel...</div>;
  }

  if (!user && location.pathname !== '/admin/login') {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (!user && location.pathname === '/admin/login') {
    return <Outlet />; // Render login page
  }

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <h2>Doctor Admin</h2>
          <p>Dr. Suman Pandab</p>
        </div>
        <nav className="admin-nav">
          <Link to="/admin" className={location.pathname === '/admin' ? 'active' : ''}>Dashboard</Link>
          <Link to="/admin/appointments" className={location.pathname === '/admin/appointments' ? 'active' : ''}>Appointments</Link>
          <Link to="/admin/schedule" className={location.pathname === '/admin/schedule' ? 'active' : ''}>Schedule</Link>
        </nav>
        <div className="admin-footer">
          <button onClick={handleLogout} className="admin-logout-btn">Logout</button>
        </div>
      </aside>
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}
