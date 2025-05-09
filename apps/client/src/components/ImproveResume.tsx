import React, { useState } from 'react';
import './ImproveResume.css';

interface SectionScore {
  name: string;
  score: number;
  icon: string;
  recommendations: string[];
}

const ImproveResume: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const sectionScores: SectionScore[] = [
    {
      name: 'Summary',
      score: 85,
      icon: '📝',
      recommendations: [
        'Add more quantifiable achievements',
        'Include industry-specific keywords',
        'Highlight unique value proposition'
      ]
    },
    {
      name: 'Experience',
      score: 90,
      icon: '💼',
      recommendations: [
        'Add more action verbs',
        'Include metrics and results',
        'Highlight leadership experience'
      ]
    },
    {
      name: 'Education',
      score: 95,
      icon: '🎓',
      recommendations: [
        'Add relevant coursework',
        'Include academic achievements',
        'List certifications'
      ]
    },
    {
      name: 'Skills',
      score: 88,
      icon: '🎯',
      recommendations: [
        'Add more technical skills',
        'Include soft skills',
        'Match skills to job requirements'
      ]
    }
    ,
    {
      name: 'Languages',
      score: 92,
      icon: '🌎',
      recommendations: [
        'Specify proficiency levels',
        'Include certifications if any',
        'Add relevant language skills'
      ]
    },
    {
      name: 'Profile',
      score: 87,
      icon: '👤',
      recommendations: [
        'Add professional social links',
        'Include portfolio/website URL',
        'Update contact information'
      ]
    }
  ];

  const overallScore = Math.round(
    sectionScores.reduce((acc, section) => acc + section.score, 0) / sectionScores.length
  );

  if (!isOpen) {
    return (
      <button 
        className="improve-button"
        onClick={() => setIsOpen(true)}
      >
        ✨ Improve Resume
      </button>
    );
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>✨ Resume Analysis & Recommendations</h2>
          <button className="close-button" onClick={() => setIsOpen(false)}>×</button>
        </div>

        <div className="content-wrapper">
          {/* Overall Score */}
          <div className="overall-score-card">
            <div className="score-header">
              <h3>Overall Resume Score</h3>
              <span className="score-badge">{overallScore}%</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${overallScore}%` }}
              />
            </div>
          </div>

          {/* Section Analysis */}
          <div className="sections-grid">
            {sectionScores.map((section) => (
              <div key={section.name} className="section-card" onClick={() => setIsOpen(false)}>
                <div className="section-header">
                  <h3>
                    <span className="section-icon">{section.icon}</span>
                    {section.name}
                  </h3>
                </div>
                <div className="section-content">
                  <div className="section-score">
                    <span>Section Score</span>
                    <span className="score-badge">{section.score}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${section.score}%` }}
                    />
                  </div>
                  
                  <div className="recommendations">
                    <h4>🎯 AI Recommendations</h4>
                    <ul>
                      {section.recommendations.map((rec, index) => (
                        <li key={index}>
                          <span className="bullet">•</span>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button 
              className="secondary-button"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
            <button className="primary-button">
              ✨ Apply AI Improvements
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImproveResume;
