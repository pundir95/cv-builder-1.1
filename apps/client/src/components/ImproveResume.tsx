import React, { useState } from 'react';
import './ImproveResume.css';
import { useResumeStore } from '../stores/resume';

interface SectionScore {
  name: string;
  score: number;
  icon: string;
  recommendations: string[];
  sectionKey: string;
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

  // Function to navigate to a section in the resume builder
  const navigateToSection = (sectionKey: string) => {
    // Close the modal first
    setIsOpen(false);
    
    // Wait a bit for the modal to close, then navigate
    setTimeout(() => {
      // Find the section element in the left sidebar
      const sectionElement = document.querySelector(`[id="${sectionKey}"]`) as HTMLElement;
      
      if (sectionElement) {
        // Scroll to the section
        sectionElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Add a subtle highlight effect
        sectionElement.style.transition = 'background-color 0.3s ease';
        sectionElement.style.backgroundColor = '#e3f2fd';
        
        // Remove the highlight after 2 seconds
        setTimeout(() => {
          sectionElement.style.backgroundColor = '';
        }, 2000);
      } else {
        // If section not found, try to find it by name
        const sectionName = sectionScores.find(s => s.sectionKey === sectionKey)?.name;
        if (sectionName) {
          const sectionByName = Array.from(document.querySelectorAll('section')).find(
            section => section.textContent?.includes(sectionName)
          ) as HTMLElement;
          if (sectionByName) {
            sectionByName.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      }
      
      // Ensure the left sidebar is visible and expanded
      const leftSidebar = document.querySelector('.bg-secondary-accent') || 
                         document.querySelector('[data-panel-id="left"]') ||
                         document.querySelector('.left-sidebar');
      
      if (leftSidebar) {
        // Try to expand the left sidebar if it's collapsed
        const collapseButton = document.querySelector('[id="collapse"]') as HTMLElement;
        if (collapseButton) {
          const leftSidebarContainer = leftSidebar.closest('.flex');
          if (leftSidebarContainer && leftSidebarContainer.classList.contains('basis-12')) {
            // Sidebar is collapsed, try to expand it
            collapseButton.click();
          }
        }
      }
    }, 300);
  };

  const getSectionIcon = (sectionName: string): string => {
    const icons: { [key: string]: string } = {
      'Summary': '📝',
      'Experience': '💼',
      'Education': '🎓',
      'Skills': '🎯',
      'Languages': '🌎',
      'Profiles': '👤',
      'Projects': '🚀',
      'Certifications': '📜',
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
     
      'Certifications': [
        'Add expiration dates if applicable',
        'Include issuing organization',
        'Add relevant certifications'
      ],
      
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
      
      // Include all main sections and custom sections
      const allowedSections = ['summary', 'skills', 'experience', 'education', 'languages', 'profiles', 'projects', 'certifications', 'interests', 'references'];
      return allowedSections.includes(key.toLowerCase()) || key.startsWith('custom.');
    })
    .map(([key, section]) => {
      const sectionName = typeof section === 'object' && section !== null && 'name' in section 
        ? (typeof section.name === 'string' ? section.name : 'Untitled Section')
        : 'Untitled Section';
      return {
        name: sectionName,
        score: calculateSectionScore(section),
        icon: getSectionIcon(sectionName),
        recommendations: getSectionRecommendations(sectionName),
        sectionKey: key // Add the section key for navigation
      };
    });

  const overallScore = sectionScores.length > 0
    ? Math.round(sectionScores.reduce((acc, section) => acc + section.score, 0) / sectionScores.length)
    : 0;

  if (!isOpen) {
    return (
      <div className="floating-improve-button">
        <button 
          className="improve-button"
          onClick={() => setIsOpen(true)}
        >
          ✨ Improve Resume
        </button>
      </div>
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
              <div 
                key={section.name} 
                className="section-card"
                onClick={() => navigateToSection(section.sectionKey)}
                style={{ cursor: 'pointer' }}
                title={`Click to navigate to ${section.name} section`}
              >
                <div className="section-header flex items-center gap-3">
                  <h3>
                    <span className="section-icon">{section.icon}</span>
                    {section.name}
                  </h3>
                  <span className='inline-block py-[2px] px-3 bg-[#e0ffe4] rounded-[30px] text-[12px] font-semibold text-[#009d15]'>+10</span>
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
