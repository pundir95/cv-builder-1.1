import type {
  Award,
  Certification,
  CustomSection,
  CustomSectionGroup,
  Interest,
  Language,
  Profile,
  Project,
  Publication,
  Reference,
  SectionKey,
  SectionWithItem,
  Skill,
  URL,
} from "@reactive-resume/schema";
import { Education as EducationType, Experience as ExperienceType, Volunteer as VolunteerType } from "@reactive-resume/schema";
import {
  cn,
  hexToRgb,
  isEmptyString,
  isUrl,
  linearTransform,
  sanitize,
} from "@reactive-resume/utils";
import get from "lodash.get";
import { Fragment } from "react";

import { BrandIcon } from "../components/brand-icon";
import { Picture } from "../components/picture";
import { useArtboardStore } from "../store/artboard";
import type { TemplateProps } from "../types/template";

export const cv_template_16 = ({ columns, isFirstPage = false }: TemplateProps) => {
  const [main, sidebar] = columns;
  const resume = useArtboardStore((state) => state.resume);
  const { basics, sections } = resume;
  const primaryColor = useArtboardStore((state) => state.resume.metadata.theme.primary);

  // Helper function to render section header
  const SectionHeader = ({ children }: { children: React.ReactNode }) => (
    <div className="inline-block tracking-[3px] text-black font-medium text-[12px] bg-[#FECB00] rounded-full px-4 px-1 mb-4 uppercase">
      {children}
    </div>
  );

  // Helper function to render education items
  const renderEducation = () => {
    if (!sections.education.visible || sections.education.items.length === 0) return null;
    
    return (
      <>
        <SectionHeader>Education</SectionHeader>
        <div className="mb-7">
          <ul>
            {sections.education.items
              .filter((item) => item.visible)
              .map((item) => (
                <li key={item.id} className="mb-4">
                  <p className="text-white text-[12px] font-medium mb-1">{item.studyType} ({item.area})</p>
                  <p className="text-[#B8B8B8] text-[12px] font-medium mb-1">{item.institution}</p>
                  <p className="text-[#B8B8B8] text-[12px] font-medium mb-0">{item.date}</p>
                  {item.score && <p className="text-[#B8B8B8] text-[12px] font-medium mb-0">{item.score}</p>}
                </li>
              ))}
          </ul>
        </div>
      </>
    );
  };

  // Helper function to render contact details
  const renderContactDetails = () => {
    if (!basics) return null;
    
    return (
      <>
        <SectionHeader>Contact Details</SectionHeader>
        <div className="mb-7">
          {basics.email && <p className="text-white text-[12px] font-medium mb-3">{basics.email}</p>}
          {basics.phone && <p className="text-white text-[12px] font-medium mb-3">{basics.phone}</p>}
          {basics.location && <p className="text-white text-[12px] font-medium">{basics.location}</p>}
          {basics.url && (
            <a href={basics.url.href} target="_blank" rel="noreferrer" className="text-white text-[12px] font-medium block mt-3 hover:underline">
              {basics.url.label || basics.url.href}
            </a>
          )}
        </div>
      </>
    );
  };

  // Helper function to render languages
  const renderLanguages = () => {
    if (!sections.languages.visible || sections.languages.items.length === 0) return null;
    
    return (
      <>
        <SectionHeader>Language</SectionHeader>
        <div className="mb-7">
          {sections.languages.items
            .filter((item) => item.visible)
            .map((item) => (
              <div key={item.id} className="flex gap-7 mb-4">
                <p className="text-white text-[12px] font-semibold mb-0">{item.name}</p>
                <p className="text-[#B8B8B8] text-[12px] font-normal mb-0">{item.description || 'Fluent'}</p>
              </div>
            ))}
        </div>
      </>
    );
  };

  // Helper function to render skills
  const renderSkills = () => {
    if (!sections.skills.visible || sections.skills.items.length === 0) return null;
    
    return (
      <>
        <SectionHeader>Personal Skills</SectionHeader>
        <ul className="flex flex-col gap-1.5 mb-7">
          {sections.skills.items
            .filter((item) => item.visible)
            .map((item) => (
              <li key={item.id} className="text-[12px] text-white">{item.name}</li>
            ))}
        </ul>
      </>
    );
  };

  // Helper function to render interests
  const renderInterests = () => {
    if (!sections.interests.visible || sections.interests.items.length === 0) return null;
    
    return (
      <>
        <SectionHeader>Interests</SectionHeader>
        <ul className="flex flex-col gap-1.5">
          {sections.interests.items
            .filter((item) => item.visible)
            .map((item) => (
              <li key={item.id} className="text-[12px] text-white">{item.name}</li>
            ))}
        </ul>
      </>
    );
  };

  // Helper function to render technical skills with progress bars
  const renderTechnicalSkills = () => {
    if (!sections.skills.visible || sections.skills.items.length === 0) return null;
    
    return (
      <>
        <SectionHeader>Skills</SectionHeader>
        <div className="grid grid-cols-2 gap-2.5">
          {sections.skills.items
            .filter((item) => item.visible)
            .map((item) => {
              const level = item.level || 0;
              const width = linearTransform(level, 0, 5, 0, 100);
              
              return (
                <div key={item.id}>
                  <h4 className="text-[12px] font-medium text-black mb-1">{item.name}</h4>
                  <div className="relative h-[2px] bg-[#D9D9D9] rounded-[6px] w-full">
                    <div 
                      className="absolute inset-0 h-[2px] bg-[#FECB00] rounded-[6px]" 
                      style={{ width: `${width}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
        </div>
      </>
    );
  };

  // Helper function to render experience
  const renderExperience = () => {
    if (!sections.experience.visible || sections.experience.items.length === 0) return null;
    
    return (
      <>
        <SectionHeader>Experience</SectionHeader>
        <div className="mb-7">
          {sections.experience.items
            .filter((item) => item.visible)
            .map((item) => (
              <div key={item.id} className="mb-4">
                <p className="text-[12px] font-medium mb-1">{item.position}</p>
                <p className=" text-[12px] font-medium mb-1">{item.company}</p>
                <p className=" text-[12px] font-medium mb-0">{item.date}</p>
                {item.location && <p className=" text-[12px] font-medium mb-0">{item.location}</p>}
                {item.summary && (
                  <p className=" text-[12px] font-medium mb-0 mt-2">
                    {item.summary}
                  </p>
                )}
              </div>
            ))}
        </div>
      </>
    );
  };

  // Helper function to render projects
  const renderProjects = () => {
    if (!sections.projects.visible || sections.projects.items.length === 0) return null;
    
    return (
      <>
        <SectionHeader>Portfolio</SectionHeader>
        <div className="mb-4">
          {sections.projects.items
            .filter((item) => item.visible)
            .map((item) => (
              <div key={item.id} className="mb-2.5">
                <a 
                  href={item.url?.href || '#'} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-[10px] text-black hover:underline"
                >
                  {item.name || item.url?.href || 'Project Link'}
                </a>
                {item.description && (
                  <p className="text-[10px] text-black mt-1">{item.description}</p>
                )}
              </div>
            ))}
        </div>
      </>
    );
  };

  // Helper function to render custom sections
  const renderCustomSections = () => {
    return Object.entries(sections.custom)
      .filter(([_, section]) => section.visible && section.items.length > 0)
      .map(([id, section]) => (
        <div key={id} className="about-container pr-4 mb-5">
          <SectionHeader>{section.name}</SectionHeader>
          <div className="mb-4">
            {section.items
              .filter((item) => item.visible)
              .map((item) => (
                <div key={item.id} className="mb-2.5">
                  <p className="text-[10px] text-black font-semibold">{item.name}</p>
                  {item.description && (
                    <p className="text-[10px] text-black">{item.description}</p>
                  )}
                  {item.date && (
                    <p className="text-[10px] text-black">{item.date}</p>
                  )}
                  {item.url?.href && (
                    <a 
                      href={item.url.href} 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-[10px] text-black hover:underline block"
                    >
                      {item.url.label || item.url.href}
                    </a>
                  )}
                </div>
              ))}
          </div>
        </div>
      ));
  };

  return (
    <div className="flex gap-5 min-h-[100vh] lg:max-h-none max-h-[100vh] overflow-auto">
      <div className="w-[40%] flex flex-col min-h-full">
        <div className="profile-pic mb-2">
          <Picture className="mr-auto w-full h-[339px] object-cover rounded-b-[60px] rounded-l-[0px] !max-w-none" />
        </div>
        <div className="py-9 px-5 bg-[#101010] rounded-r-[60px]">
          {renderEducation()}
          {renderContactDetails()}
          {renderLanguages()}
          {renderSkills()}
          {renderInterests()}
        </div>
      </div>
      <div className="w-[60%]">
        <div className="about-user pt-[60px] relative before:content-[''] before:absolute before:top-0 before:left-[-13px] before:w-[78px] before:h-[106px] before:rounded-b-[90px] before:bg-[#FECB00] before:z-[-1] z-[1] mb-10">
          <h2 className="text-[52px] text-black text-normal mb-1 uppercase leading-normal">
            <strong>{basics?.name?.split(' ')[0] || 'Your'}</strong> <br /> 
            {basics?.name?.split(' ').slice(1).join(' ') || 'Name'}
          </h2>
          <p className="text-black text-base tracking-[4px] uppercase">{basics?.headline || 'Professional Title'}</p>
        </div>
        
        {sections.summary.visible && !isEmptyString(sections.summary.content) && (
          <div className="about-container pr-4 mb-5">
            <SectionHeader>About Me</SectionHeader>
            <p 
              className="text-[12px] text-black"
              dangerouslySetInnerHTML={{ __html: sanitize(sections.summary.content) }}
            />
          </div>
        )}
        
        {renderTechnicalSkills()}
        
        {renderExperience()}
        
        {renderProjects()}
        
        {renderCustomSections()}
      </div>
    </div>
  );
};
