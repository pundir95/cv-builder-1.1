import React, { useState } from 'react';
import AddNewPlan from './AddNewPlan';
import PlanPricing from './PlanPricing';
import Products from '../products/Products';

const AdminPlanPricing: React.FC = () => {
  const [showAddNewPlan, setShowAddNewPlan] = useState(false);
  return (
    <div style={{ padding: '32px 0 0 0', maxWidth: 1600, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h4 style={{ fontWeight: 600, textDecoration: 'underline', fontSize: 16, margin: 0 }}>Pricing & Plans</h4>
        <button
          style={{
            background: '#E6FF57',
            border: 'none',
            borderRadius: 20,
            padding: '10px 32px',
            fontWeight: 500,
            fontSize: 14,
            cursor: 'pointer',
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          }}
          onClick={() => setShowAddNewPlan(true)}
        >
          Add New Plan
        </button>
      </div>
      {showAddNewPlan ? (
        <AddNewPlan onBack={() => setShowAddNewPlan(false)} />
      ) : (
     <PlanPricing/>
      )}
    </div>
  );
};

export default AdminPlanPricing;
