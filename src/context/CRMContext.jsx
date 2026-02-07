import React, { createContext, useContext, useState, useEffect } from 'react';

const CRMContext = createContext();

export const useCRM = () => useContext(CRMContext);

export const CRMProvider = ({ children }) => {
    const [leads, setLeads] = useState(() => {
        const saved = localStorage.getItem('crm_leads');
        // Default initial data if empty
        if (!saved) {
            return [
                { id: 1, name: 'kasthuri', email: 'kasthuri@gmail.com', status: 'New', source: 'Website', date: new Date().toISOString() },
                { id: 2, name: 'srivalli', email: 'srivalli@gmail.com', status: 'Contacted', source: 'LinkedIn', date: new Date(Date.now() - 86400000).toISOString() },
                { id: 3, name: 'vyshali', email: 'vyshali@gmail.com', status: 'Won', source: 'Referral', date: new Date(Date.now() - 172800000).toISOString() },
            ];
        }
        return JSON.parse(saved);
    });

    useEffect(() => {
        localStorage.setItem('crm_leads', JSON.stringify(leads));
    }, [leads]);

    const addLead = (lead) => {
        const newLead = { ...lead, id: Date.now(), date: new Date().toISOString(), status: 'New' };
        setLeads([newLead, ...leads]);
    };

    const updateStatus = (id, newStatus) => {
        setLeads(leads.map(l => l.id === id ? { ...l, status: newStatus } : l));
    };

    const deleteLead = (id) => {
        setLeads(leads.filter(l => l.id !== id));
    };

    const activeLeadsCount = leads.filter(l => l.status === 'New' || l.status === 'Contacted').length;
    const matchRate = leads.length ? Math.round((leads.filter(l => l.status === 'Won').length / leads.length) * 100) : 0;

    return (
        <CRMContext.Provider value={{ leads, addLead, updateStatus, deleteLead, stats: { total: leads.length, active: activeLeadsCount, conversion: matchRate } }}>
            {children}
        </CRMContext.Provider>
    );
};
