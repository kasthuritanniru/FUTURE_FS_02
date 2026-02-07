import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, PlusCircle, Settings } from 'lucide-react';

const Sidebar = () => {
    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
        { icon: Users, label: 'Leads', path: '/leads' },
    ];

    return (
        <aside className="sidebar">
            <div style={{ padding: '1.5rem 0', marginBottom: '2rem' }}>
                <h2 style={{ color: 'var(--accent-primary)', fontSize: '1.5rem', fontWeight: 'bold' }}>
                    Nexus CRM
                </h2>
            </div>

            <nav>
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                    >
                        <item.icon size={20} />
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div style={{ marginTop: 'auto' }}>
                <button className="nav-item" style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer' }}>
                    <Settings size={20} />
                    <span>Settings</span>
                </button>
            </div>
        </aside>
    );
};

const Layout = ({ onOpenAddLead }) => {
    return (
        <div className="layout">
            <Sidebar />
            <main className="main-content">
                <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="search-bar" style={{ position: 'relative', width: '300px' }}>
                        {/* Search placeholder */}
                    </div>
                    <button className="btn btn-primary" onClick={onOpenAddLead}>
                        <PlusCircle size={18} />
                        Add Lead
                    </button>
                </header>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
