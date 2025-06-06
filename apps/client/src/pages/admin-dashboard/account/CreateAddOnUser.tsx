import React, { useState } from 'react';
import { Input, Select, SelectTrigger, SelectContent, SelectItem, Button } from '@reactive-resume/ui';
import { axios } from '@/client/libs/axios';
import { toast } from '@/client/hooks/use-toast';

const modalStyles: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
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
  minWidth: 800,
  maxWidth: '95vw',
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

const addBtnStyles: React.CSSProperties = {
  marginTop: 32,
  background: '#7C5CFA',
  color: '#fff',
  border: 'none',
  borderRadius: 8,
  padding: '6px 0',
  width: 220,
  fontSize: 18,
  fontWeight: 500,
  cursor: 'pointer',
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
};

const countryCodeBox: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  background: '#f3f4f6',
  borderRadius: 6,
  padding: '0 8px',
  border: '1px solid #e5e7eb',
  height: 40,
};

const labelStyle: React.CSSProperties = {
  fontWeight: 500,
  marginBottom: 4,
  display: 'block',
};

const fieldBox: React.CSSProperties = {
  marginBottom: 18,
};

const rowStyle: React.CSSProperties = {
  display: 'flex',
  gap: 16,
};

const halfWidth: React.CSSProperties = {
  flex: 1,
};

const roles = [
  { value: 'manager', label: 'Manager' },
  { value: 'member', label: 'Member' },
];

const CreateAddOnUser = ({ isOpen, onClose}: { isOpen: boolean; onClose: () => void; }) => {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    designation: 'manager',
    phone: '',
    email: '',
    countryCode: '+91',
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (value: string) => {
      setForm({ ...form, designation: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form,"formm")
    axios.post("/company/organization-employees/",form)
    .then((res)=>{
        axios.get(`/accounts/api/users/`).then((res)=>{
          localStorage.setItem("user",JSON.stringify(res.data[0]))
          onClose()
        })
        axios.get(`/company/organization-employees/`).then((res)=>{
          console.log(res,"res")
        })
    })
    

    .catch((err)=>{
      console.log(err,"err")
      toast({
        title: err.message,
        description: err.message,
        variant: "error",
      })
    })
  };

  return (
    <div style={modalStyles}>
      <div style={boxStyles}>
        <button style={closeBtnStyles} onClick={onClose} aria-label="Close">×</button>
        <h2 style={{ fontWeight: 700, fontSize: 24, marginBottom: 16 }}>Add–On User</h2>
        <form onSubmit={handleSubmit}>
          <div style={rowStyle}>
            <div style={{ ...halfWidth, ...fieldBox }}>
              <label style={labelStyle}>First Name*</label>
                <Input name="first_name" placeholder="Enter the user's First Name" value={form.first_name} onChange={handleChange} required />
            </div>
            <div style={{ ...halfWidth, ...fieldBox }}>
              <label style={labelStyle}>Last Name*</label>
              <Input name="last_name" placeholder="Enter the user's Last Name" value={form.last_name} onChange={handleChange} required />
            </div>
          </div>
          <div style={rowStyle}>
            <div style={{ ...halfWidth, ...fieldBox }}>
              <label style={labelStyle}>Role*</label>
              <select 
                value={form.designation} 
                onChange={(e) => handleRoleChange(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid #ddd',
                  backgroundColor: '#fff',
                  fontSize: '16px'
                }}
              >
                {roles.map(role => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ ...halfWidth, ...fieldBox }}>
              <label style={labelStyle}>Phone*</label>
              <div style={countryCodeBox}>
                <span role="img" aria-label="India flag">🇮🇳</span>
                <span style={{ marginRight: 4 }}>{form.countryCode}</span>
                <Input name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} required style={{ border: 'none', boxShadow: 'none', background: 'transparent', flex: 1 }} />
              </div>
            </div>
          </div>
          <div style={fieldBox}>
            <label style={labelStyle}>Email*</label>
            <Input name="email" type="email" placeholder="Enter the user's Email Address" value={form.email} onChange={handleChange} required />
          </div>
          <Button type="submit" style={addBtnStyles}>Add Member</Button>
        </form>
      </div>
    </div>
  );
};

export default CreateAddOnUser;
