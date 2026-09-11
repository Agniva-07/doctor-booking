import React, { useState } from 'react';
import './AdminLayout.css';
import Dashboard from './Dashboard/Dashboard';
import Appointments from './Appointments/Appointments';
import Schedule from './Schedule/Schedule';
import Settings from './Settings/Settings';
import { mockDoctorProfile } from './mockData';

const Icons = {
  Dashboard: () => (
    <svg className="nav-icon" viewBox="0 0 24 24">
      <rect x="3" y="3" width="7" height="9" rx="1" />
      <rect x="14" y="3" width="7" height="5" rx="1" />
      <rect x="14" y="12" width="7" height="9" rx="1" />
      <rect x="3" y="16" width="7" height="5" rx="1" />
    </svg>
  ),
  Appointments: () => (
    <svg className="nav-icon" viewBox="0 0 24 24">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),
  Schedule: () => (
    <svg className="nav-icon" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  Settings: () => (
    <svg className="nav-icon" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  Menu: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12"></line>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
  )
};

const AdminLayout = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'appointments':
        return <Appointments />;
      case 'schedule':
        return <Schedule />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', Icon: Icons.Dashboard },
    { id: 'appointments', label: 'Appointments', Icon: Icons.Appointments },
    { id: 'schedule', label: 'Schedule', Icon: Icons.Schedule },
    { id: 'settings', label: 'Settings', Icon: Icons.Settings },
  ];

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
  };

  // Extract initials
  const getInitials = (name) => {
    const parts = name.replace('Dr. ', '').split(' ');
    return parts.length > 1 ? `${parts[0][0]}${parts[parts.length-1][0]}` : name[0];
  };

  return (
    <div className="admin-layout-container">
      {/* Mobile Sidebar Overlay */}
      <div 
        className={`admin-sidebar-overlay ${isMobileMenuOpen ? 'mobile-open' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`admin-sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="admin-sidebar-header">
          <div className="admin-avatar">
            {getInitials(mockDoctorProfile.name)}
          </div>
          <div className="admin-doctor-info">
            <h2 className="admin-doctor-name">{mockDoctorProfile.name}</h2>
            <p className="admin-doctor-role">Clinic Admin</p>
          </div>
        </div>

        <nav className="admin-sidebar-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`admin-nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
              aria-label={item.label}
            >
              <item.Icon />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-status-indicator">
            <span className="admin-status-dot"></span>
            Clinic Online
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main-content">
        {/* Mobile Header */}
        <header className="admin-mobile-header">
          <h2 className="admin-doctor-name" style={{margin: 0}}>{navItems.find(i => i.id === activeTab)?.label}</h2>
          <button 
            className="admin-mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Open Menu"
          >
            <Icons.Menu />
          </button>
        </header>

        {/* Page Content */}
        <div className="admin-page-content">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
