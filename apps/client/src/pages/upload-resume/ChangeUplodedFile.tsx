import React from 'react';

const boxStyle: React.CSSProperties = {
  border: '4px solid #1565c0',
  borderRadius: '16px',
  padding: '40px 24px 24px 24px',
  maxWidth: 500,
  margin: '40px auto',
  position: 'relative',
  background: '#fff',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const closeStyle: React.CSSProperties = {
  position: 'absolute',
  top: 16,
  right: 16,
  fontSize: 32,
  color: '#0D84F3',
  cursor: 'pointer',
  background: 'none',
  border: 'none',
};

const iconStyle: React.CSSProperties = {
  fontSize: 64,
  color: '#0D84F3',
  marginBottom: 16,
};

const fileNameStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  fontSize: 20,
  margin: '16px 0',
  color: '#222',
};

const checkStyle: React.CSSProperties = {
  color: '#0D84F3',
  fontSize: 24,
  marginRight: 8,
};

const buttonStyle: React.CSSProperties = {
  background: '#0D84F3',
  color: '#fff',
  border: 'none',
  borderRadius: 24,
  padding: '12px 36px',
  fontSize: 18,
  fontWeight: 600,
  margin: '24px 0 0 0',
  cursor: 'pointer',
};

const noteStyle: React.CSSProperties = {
  marginTop: 32,
  color: '#222',
  fontSize: 18,
  textAlign: 'center',
};

const ChangeUplodedFile: React.FC<{ selectedFile: File | null, handlePreviousStep: () => void }> = ({ selectedFile, handlePreviousStep }) => {
  return (
    <div style={boxStyle}>
      <button style={closeStyle} aria-label="Close" onClick={()=>{
        handlePreviousStep()
      }}>&times;</button>
      <div style={iconStyle}>
        {/* Simple document icon using SVG */}
        <svg width="48" height="56" viewBox="0 0 48 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="8" width="32" height="40" rx="4" fill="#e3eafc" stroke="#1565c0" strokeWidth="2"/>
          <rect x="16" y="16" width="16" height="4" rx="2" fill="#1565c0"/>
          <rect x="16" y="24" width="16" height="4" rx="2" fill="#1565c0"/>
        </svg>
      </div>
      <div style={fileNameStyle}>
        <span style={checkStyle}>✔</span>
        {selectedFile?.name}
      </div>
      <button style={buttonStyle} onClick={()=>{
        handlePreviousStep()
      }}>Change</button>
      <div style={noteStyle}>
        Files we can read: <b>DOC, DOCX, PDF, HTML, RTF, TXT</b>
      </div>
    </div>
  );
};

export default ChangeUplodedFile;
