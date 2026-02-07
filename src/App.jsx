import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CRMProvider, useCRM } from './context/CRMContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Leads from './pages/Leads';
import AddLeadModal from './components/AddLeadModal';
import { useState } from 'react';

// Wrapper to provide props to Layout for opening modal
const AppLayout = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { addLead } = useCRM();

  return (
    <>
      <Layout onOpenAddLead={() => setModalOpen(true)} />
      <AddLeadModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={addLead}
      />
    </>
  );
};

function App() {
  return (
    <CRMProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="leads" element={<Leads />} />
          </Route>
        </Routes>
      </Router>
    </CRMProvider>
  );
}

export default App;
