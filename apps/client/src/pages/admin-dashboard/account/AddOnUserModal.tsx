import { axios } from '@/client/libs/axios';
import React from 'react';

interface AddOnUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPay: () => void;
  price: number;
  plan_id: string;
}

const modalStyles: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(0,0,0,0.2)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
};

const boxStyles: React.CSSProperties = {
  background: '#fff',
  borderRadius: 20,
  padding: '32px 30px',
  minWidth: 300,
  maxWidth: '90vw',
  boxShadow: '0 2px 16px rgba(0,0,0,0.12)',
  position: 'relative',
  textAlign: 'left',
};

const closeBtnStyles: React.CSSProperties = {
  position: 'absolute',
  top: 20,
  right: 24,
  background: 'none',
  border: 'none',
  fontSize: 24,
  cursor: 'pointer',
  color: '#888',
};

const payBtnStyles: React.CSSProperties = {
  marginTop: 32,
  background: '#7C5CFA',
  color: '#fff',
  border: 'none',
  borderRadius: 8,
  padding: '14px 0',
  width: 220,
  fontSize: 18,
  fontWeight: 500,
  cursor: 'pointer',
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
};

const AddOnUserModal: React.FC<AddOnUserModalProps> = ({ isOpen, onClose, price,plan_id }) => {
  if (!isOpen) return null;
  const getThePlan=(id:string)=>{
    axios.post(`/company/employees-subscription/`,{
      plan_id:id,
      "no_employees":1,
      "no_employees_unlimited": false,
    }).then((res)=>{
    if (res.data.data.approve_link) {
      window.location.href = res.data.data.approve_link;
    }
    })
  }
  return (
    <div style={modalStyles}>
      <div style={boxStyles}>
        <button style={closeBtnStyles} onClick={onClose} aria-label="Close">×</button>
        <h2 style={{ fontWeight: 700, fontSize: 24, marginBottom: 16 }}>Add–On User</h2>
        <hr style={{ margin: '0 0 24px 0', border: 'none', borderTop: '1px solid #eee' }} />
        <>
        <div style={{ color: '#6B7280', fontSize: 20, marginBottom: 8,lineHeight: '28px' }}>
          Need more users? You've reached your limit, but you can <br/> unlock more by paying ${price}.Click below to continue
        </div>
        <button style={payBtnStyles} onClick={()=>getThePlan(plan_id)} >Pay</button>
        </>
      
      </div>
    </div>
  );
};

export default AddOnUserModal;
