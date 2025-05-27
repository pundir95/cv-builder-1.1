import React, { useState } from 'react';
import './ImproveResume.css';
import { useResumeStore } from '../stores/resume';

interface SectionScore {
  name: string;
  score: number;
  icon: string;
  recommendations: string[];
}

interface ResumeSection {
  id: string;
  name: string;
  items?: any[];
  content?: string;
  columns: number;
  visible: boolean;
  separateLinks: boolean;
  progress?: number;
}

const ImproveResume: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const resume = useResumeStore((state) => state.resume);
  const progress = useResumeStore((state) => state.resume.data.metadata.template);

  
  console.log('Resume Data:', JSON.stringify(resume, null, 2));

  const getSectionIcon = (sectionName: string): string => {
    const icons: { [key: string]: string } = {
      'Summary': '📝',
      'Experience': '💼',
      'Education': '🎓',
      'Skills': '🎯',
      'Languages': '🌎',
      'Profiles': '👤',
      'Projects': '🚀',
      'Awards': '🏆',
      'Certifications': '📜',
      'Publications': '📚',
      'Volunteering': '🤝',
      'Interests': '🎨',
      'References': '📞'
    };
    return icons[sectionName] || '📋';
  };

  const getSectionRecommendations = (sectionName: string): string[] => {
    const recommendations: { [key: string]: string[] } = {
      'Summary': [
        'Add more quantifiable achievements',
        'Include industry-specific keywords',
        'Highlight unique value proposition'
      ],
      'Experience': [
        'Add more action verbs',
        'Include metrics and results',
        'Highlight leadership experience'
      ],
      'Education': [
        'Add relevant coursework',
        'Include academic achievements',
        'List certifications'
      ],
      'Skills': [
        'Add more technical skills',
        'Include soft skills',
        'Match skills to job requirements'
      ],
      'Languages': [
        'Specify proficiency levels',
        'Include certifications if any',
        'Add relevant language skills'
      ],
      'Profiles': [
        'Add professional social links',
        'Include portfolio/website URL',
        'Update contact information'
      ],
      'Projects': [
        'Add project outcomes and impact',
        'Include technologies used',
        'Highlight your role and contributions'
      ],
      'Awards': [
        'Add dates and context',
        'Include selection criteria',
        'Highlight significance'
      ],
      'Certifications': [
        'Add expiration dates if applicable',
        'Include issuing organization',
        'Add relevant certifications'
      ],
      'Publications': [
        'Add publication dates',
        'Include co-authors if any',
        'Add citations or impact'
      ],
      'Volunteering': [
        'Add duration and impact',
        'Include responsibilities',
        'Highlight transferable skills'
      ],
      'Interests': [
        'Add relevance to career',
        'Include unique interests',
        'Show personality'
      ],
      'References': [
        'Add professional titles',
        'Include relationship context',
        'Add contact information'
      ]
    };
    return recommendations[sectionName] || ['Add more details', 'Include relevant information', 'Highlight key achievements'];
  };

  const calculateSectionScore = (section: any): number => {
    if (!section || typeof section !== 'object') return 0;
    
    // If section has items array
    if ('items' in section && Array.isArray(section.items)) {
      if (section.items.length === 0) return 0;
      return Math.min(100, section.items.length * 20);
    }
    
    // If section has content
    if ('content' in section && typeof section.content === 'string' && section.content.length > 0) {
      return 85;
    }
    
    return 0;
  };

  const sectionScores: SectionScore[] = Object.entries(resume?.data?.sections || {})
    .filter(([key, section]) => {
      if (!section || typeof section !== 'object') return false;
      
      // Only include specific sections
      const allowedSections = ['summary', 'skills', 'experience', 'education', 'languages', 'profiles'];
      return allowedSections.includes(key.toLowerCase());
    })
    .map(([_, section]) => {
      const sectionName = typeof section === 'object' && section !== null && 'name' in section 
        ? (typeof section.name === 'string' ? section.name : 'Untitled Section')
        : 'Untitled Section';
      return {
        name: sectionName,
        score: calculateSectionScore(section),
        icon: getSectionIcon(sectionName),
        recommendations: getSectionRecommendations(sectionName)
      };
    });

  const overallScore = sectionScores.length > 0
    ? Math.round(sectionScores.reduce((acc, section) => acc + section.score, 0) / sectionScores.length)
    : 0;

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

  console.log(sectionScores,"sectionScores")

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
              <span className="score-badge">{progress?.progress}%</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progress?.progress}%` }}
              />
            </div>
          </div>

          {/* Section Analysis */}
          <div className="sections-grid">
            {sectionScores.map((section) => (
              <div key={section.name} className="section-card">
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
                    <h4>🎯  Recommendations</h4>
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
            {/* <button className="primary-button">
              ✨ Apply AI Improvements
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImproveResume;
