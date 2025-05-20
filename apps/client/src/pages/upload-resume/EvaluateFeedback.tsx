import React from 'react';
import { Icon } from '../../components/icon';

const cardStyle: React.CSSProperties = {
  background: 'var(--background)',
  borderRadius: 16,
  boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
  padding: 40,
  flex: 1,
  minWidth: 320,
//   margin: 16,
  display: 'flex',
  flexDirection: 'column',
  gap: 14,
};

const checklistStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: 16,
  marginBottom: 12,
  fontSize: 18,
  lineHeight: 1.5,
};

const iconCircleStyle: React.CSSProperties = {
  background: 'var(--success)',
  color: 'var(--success-foreground)',
  borderRadius: '50%',
  width: 32,
  height: 32,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 20,
  marginTop: 2,
  flexShrink: 0,
};

const starCircleStyle: React.CSSProperties = {
  background: 'var(--info)',
  color: 'var(--info-foreground)',
  borderRadius: '50%',
  width: 32,
  height: 32,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 20,
  marginTop: 2,
  flexShrink: 0,
};

const containerStyle: React.CSSProperties = {
  minHeight: '60vh',
  background: 'var(--secondary)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '40px 8px',
};

const cardsWrapperStyle: React.CSSProperties = {
  display: 'flex',
//   flexWrap: 'wrap',
  justifyContent: 'center',
  gap: 32,
  width: '100%',
  maxWidth: 900,
  margin: '32px 0',
};

const headingStyle: React.CSSProperties = {
  fontSize: 42,
  fontWeight: 800,
  color: 'var(--primary)',
  marginBottom: 12,
  textAlign: 'center',
};

const subheadingStyle: React.CSSProperties = {
  fontSize: 22,
  color: 'var(--primary-accent)',
  marginTop: 12,
  textAlign: 'center',
  lineHeight: 1.4,
};

const EvaluateFeedback: React.FC = () => {
  const userName = localStorage.getItem("uploadCVName")
    
  return (
    <div style={containerStyle}>
      <div style={headingStyle}>Nice job, <span style={{ color: 'var(--info)' }}>{userName}</span></div>
      <div style={subheadingStyle}>We've finished reviewing your resume. Check out our suggestions to make it even better.</div>
      <div style={cardsWrapperStyle}>
        {/* Success Card */}
        <div style={cardStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <span style={{ fontSize: 32 }}>🏆</span>
            <span style={{ fontWeight: 700, fontSize: 26 }}>You got it right!</span>
          </div>
          <div style={checklistStyle}>
            <span style={iconCircleStyle}>✔</span>
            <span>You have all sections employers look for on a resume.</span>
          </div>
          <div style={checklistStyle}>
            <span style={iconCircleStyle}>✔</span>
            <span>Thanks for adding all the important details of your education!</span>
          </div>
        </div>
        {/* Improvement Card */}
        <div style={cardStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <span style={{ fontSize: 32 }}>💡</span>
            <span style={{ fontWeight: 700, fontSize: 26 }}>How we'll help you improve:</span>
          </div>
          <div style={checklistStyle}>
            <span style={starCircleStyle}>★</span>
            <span>Most employers seek specific section titles. We'll help you create the ones they want.</span>
          </div>
          <div style={checklistStyle}>
            <span style={starCircleStyle}>★</span>
            <span>Enhance your Experience section with our pre-written suggestions.</span>
          </div>
          <div style={checklistStyle}>
            <span style={starCircleStyle}>★</span>
            <span>AI-enhance your summary to give more context for this role.</span>
          </div>
        </div>
       
      </div>
    </div>
  );
};

export default EvaluateFeedback;
