import React, { useState } from 'react';
import { X } from 'lucide-react';

const AddLeadModal = ({ isOpen, onClose, onAdd }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        source: 'Website',
        notes: ''
    });

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(formData);
        setFormData({ name: '', email: '', source: 'Website', notes: '' });
        onClose();
    };

    return (
        <div style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
            <div className="glass-panel" style={{ width: '100%', maxWidth: '500px', padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <h2>Add New Lead</h2>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <input
                            required
                            className="form-input"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g. John Doe"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input
                            required
                            type="email"
                            className="form-input"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            placeholder="john@example.com"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Source</label>
                        <select
                            className="form-input"
                            value={formData.source}
                            onChange={e => setFormData({ ...formData, source: e.target.value })}
                        >
                            <option value="Website">Website Form</option>
                            <option value="LinkedIn">LinkedIn</option>
                            <option value="Referral">Referral</option>
                            <option value="Cold Call">Cold Call</option>
                        </select>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
                        <button type="button" onClick={onClose} className="btn" style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Save Lead
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddLeadModal;
