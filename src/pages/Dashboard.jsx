import React from 'react';
import { useCRM } from '../context/CRMContext';
import { Users, TrendingUp, Activity, UserPlus } from 'lucide-react';

const StatCard = ({ label, value, icon: Icon, color }) => (
    <div className="glass-panel stat-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
                <div className="stat-label">{label}</div>
                <div className="stat-value">{value}</div>
            </div>
            <div style={{
                padding: '0.75rem',
                borderRadius: '12px',
                background: `rgba(${color}, 0.1)`,
                color: `rgb(${color})`
            }}>
                <Icon size={24} />
            </div>
        </div>
    </div>
);

const Dashboard = () => {
    const { stats, leads } = useCRM();

    // Simple "Recent Activity" list
    const recentLeads = [...leads].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

    return (
        <div>
            <h1>Dashboard</h1>

            <div className="stats-grid">
                <StatCard
                    label="Total Leads"
                    value={stats.total}
                    icon={Users}
                    color="99, 102, 241" // Indigo
                />
                <StatCard
                    label="Active Pipeline"
                    value={stats.active}
                    icon={Activity}
                    color="59, 130, 246" // Blue
                />
                <StatCard
                    label="Conversion Rate"
                    value={`${stats.conversion}%`}
                    icon={TrendingUp}
                    color="16, 185, 129" // Emerald
                />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                <div className="glass-panel" style={{ padding: '1.5rem' }}>
                    <h2>Recent Leads</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {recentLeads.map(lead => (
                            <div key={lead.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', borderBottom: 'var(--glass-border)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{
                                        width: '40px', height: '40px', borderRadius: '50%', background: 'var(--bg-secondary)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'
                                    }}>
                                        {lead.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 500 }}>{lead.name}</div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{lead.status}</div>
                                    </div>
                                </div>
                                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                    {new Date(lead.date).toLocaleDateString()}
                                </div>
                            </div>
                        ))}
                        {recentLeads.length === 0 && <p style={{ color: 'var(--text-secondary)' }}>No leads yet.</p>}
                    </div>
                </div>

                <div className="glass-panel" style={{ padding: '1.5rem', background: 'linear-gradient(135deg, rgba(30,41,59,0.7) 0%, rgba(16,185,129,0.1) 100%)' }}>
                    <h2>Quick Actions</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Start managing your pipeline efficiently.</p>
                    <button className="btn btn-primary" style={{ width: '100%' }}>
                        <UserPlus size={18} /> Add New Lead
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
