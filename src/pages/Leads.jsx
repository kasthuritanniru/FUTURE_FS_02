import React, { useState } from 'react';
import { useCRM } from '../context/CRMContext';
import { Search, Filter, MoreHorizontal, Trash2, CheckCircle, XCircle } from 'lucide-react';

const Leads = () => {
    const { leads, updateStatus, deleteLead } = useCRM();
    const [filter, setFilter] = useState('All');
    const [search, setSearch] = useState('');

    const filteredLeads = leads.filter(lead => {
        const matchesFilter = filter === 'All' || lead.status === filter;
        const matchesSearch = lead.name.toLowerCase().includes(search.toLowerCase()) || lead.email.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'New': return 'text-blue-400 bg-blue-400/10';
            case 'Contacted': return 'text-yellow-400 bg-yellow-400/10';
            case 'Won': return 'text-emerald-400 bg-emerald-400/10';
            case 'Lost': return 'text-red-400 bg-red-400/10';
            default: return 'text-slate-400 bg-slate-400/10';
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', alignItems: 'center' }}>
                <h1 style={{ margin: 0 }}>Leads</h1>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <div className="glass-panel" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Search size={16} className="text-secondary" />
                        <input
                            type="text"
                            placeholder="Search leads..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{ background: 'none', border: 'none', color: 'var(--text-primary)', outline: 'none' }}
                        />
                    </div>
                    <select
                        className="glass-panel"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        style={{ color: 'var(--text-secondary)', padding: '0.5rem 1rem', outline: 'none' }}
                    >
                        <option value="All">All Status</option>
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Won">Won</option>
                        <option value="Lost">Lost</option>
                    </select>
                </div>
            </div>

            <div className="glass-panel" style={{ overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: 'var(--glass-border)', color: 'var(--text-secondary)' }}>
                            <th style={{ padding: '1rem' }}>Name</th>
                            <th style={{ padding: '1rem' }}>Status</th>
                            <th style={{ padding: '1rem' }}>Source</th>
                            <th style={{ padding: '1rem' }}>Date</th>
                            <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredLeads.map(lead => (
                            <tr key={lead.id} style={{ borderBottom: 'var(--glass-border)', transition: 'background 0.2s' }} className="hover:bg-white/5">
                                <td style={{ padding: '1rem' }}>
                                    <div style={{ fontWeight: 500 }}>{lead.name}</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{lead.email}</div>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '99px',
                                        fontSize: '0.75rem',
                                        fontWeight: 600,
                                        ...styleForStatus(lead.status)
                                    }}>
                                        {lead.status}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem' }}>{lead.source}</td>
                                <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>
                                    {new Date(lead.date).toLocaleDateString()}
                                </td>
                                <td style={{ padding: '1rem', textAlign: 'right' }}>
                                    <button onClick={() => updateStatus(lead.id, 'Won')} title="Mark Won" style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer', marginRight: '0.5rem' }}><CheckCircle size={18} /></button>
                                    <button onClick={() => updateStatus(lead.id, 'Lost')} title="Mark Lost" style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', marginRight: '0.5rem' }}><XCircle size={18} /></button>
                                    <button onClick={() => deleteLead(lead.id)} title="Delete" style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer' }}><Trash2 size={18} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// Helper for inline styles since we aren't using Tailwind utility classes for these dynamic badges yet
const styleForStatus = (status) => {
    const map = {
        New: { color: '#60a5fa', background: 'rgba(96, 165, 250, 0.1)' },
        Contacted: { color: '#facc15', background: 'rgba(250, 204, 21, 0.1)' },
        Won: { color: '#34d399', background: 'rgba(52, 211, 153, 0.1)' },
        Lost: { color: '#f87171', background: 'rgba(248, 113, 113, 0.1)' }
    };
    return map[status] || {};
};

export default Leads;
