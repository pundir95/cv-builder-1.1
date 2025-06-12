import { Fragment } from "react";
import { useArtboardStore } from "../store/artboard";
import { sanitize, isUrl } from "@reactive-resume/utils";
import type { Skill, Language, Experience, Education, Interest } from "@reactive-resume/schema";

const orange = "#F9A825";
const darkGray = "#3A3A4A";
const lightGray = "#F4F4F4";
const borderRadius = 16;

const SectionHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      fontWeight: 700,
      fontSize: 16,
      color: "#fff",
      marginBottom: 8,
      marginTop: 24,
      letterSpacing: 0.5,

    }}
  >
    {children}
  </div>
);

const SidebarItem: React.FC<{ icon: React.ReactNode; children: React.ReactNode }> = ({ icon, children }) => (
  <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
    <span style={{ marginRight: 8 }}>{icon}</span>
    <span style={{'overflowWrap' : 'anywhere'}}>{children}</span>
  </div>
);

const SkillList: React.FC<{ skills: Skill[] }> = ({ skills }) => (
  <ul style={{ paddingLeft: 16, margin: 0 }}>
    {skills.map((skill) => (
      <li key={skill.id} style={{ marginBottom: 4 }}>{skill.name}</li>
    ))}
  </ul>
);

const LanguageList: React.FC<{ languages: Language[] }> = ({ languages }) => (
  <ul style={{ paddingLeft: 0, margin: 0, listStyle: "none" }}>
    {languages.map((lang) => (
      <li key={lang.id} style={{ marginBottom: 8 }}>
        <span style={{ fontWeight: 600 }}>{lang.name}:</span> {lang.description}
      </li>
    ))}
  </ul>
);

const ExperienceList: React.FC<{ experiences: Experience[] }> = ({ experiences }) => (
  <div>
    {experiences.map((exp) => (
      <div key={exp.id} style={{ marginBottom: 20 }}>
        <div style={{ fontWeight: 700, color: darkGray }}>{exp.position} <span style={{ fontWeight: 400, color: orange }}>@ {exp.company}</span></div>
        <div style={{ fontSize: 13, color: darkGray }}>{exp.location} | {exp.date}</div>
        {exp.summary && (
          <ul style={{ margin: "8px 0 0 18px", color: darkGray, fontSize: 13 }}>
            <li>{exp.summary}</li>
          </ul>
        )}
      </div>
    ))}
  </div>
);

const EducationList: React.FC<{ education: Education[] }> = ({ education }) => (
  <div>
    {education.map((edu) => (
      <div key={edu.id} style={{ marginBottom: 16 }}>
        <div style={{ fontWeight: 700, color: darkGray }}>{edu.studyType} in {edu.area}</div>
        <div style={{ color: orange, fontWeight: 600 }}>{edu.institution}</div>
        <div style={{ fontSize: 13, color: darkGray }}>{edu.date}</div>
      </div>
    ))}
  </div>
);

const InterestsList: React.FC<{ interests: Interest[] }> = ({ interests }) => (
  <ul style={{ paddingLeft: 16, margin: 0 }}>
    {interests.map((item) => (
      <li key={item.id} style={{ marginBottom: 4 }}>{item.name}</li>
    ))}
  </ul>
);

export const cv_template_14 = () => {
  const basics = useArtboardStore((state) => state.resume.basics);
  const summary = useArtboardStore((state) => state.resume.sections.summary);
  const skills = useArtboardStore((state) => state.resume.sections.skills.items);
  const experience = useArtboardStore((state) => state.resume.sections.experience.items);
  const education = useArtboardStore((state) => state.resume.sections.education.items);
  const languages = useArtboardStore((state) => state.resume.sections.languages.items);
  const interests = useArtboardStore((state) => state.resume.sections.interests.items);
  const primaryColor = useArtboardStore((state) => state.resume.metadata.theme.primary);
  return (
    <div
      style={{
        display: "flex",
        background: lightGray,
        overflow: "hidden",
        fontFamily: "Segoe UI, Arial, sans-serif",
        color: darkGray,
        minHeight: "100vh",
        border: `1px solid ${primaryColor}`,
        borderRadius: borderRadius
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          background: primaryColor,
          color: "#fff",
          width: 220,
          padding: 18,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderTopLeftRadius: borderRadius,
          borderBottomLeftRadius: borderRadius,
        }}
      >
        {/* Photo */}
        {basics.picture?.url && (
          <img
            src={basics.picture.url}
            alt="Profile"
            style={{
              width: 110,
              height: 110,
              borderRadius: "50%",
              objectFit: "cover",
              marginBottom: 24,
              border: "4px solid #fff",
            }}
          />
        )}
        {/* Contact Info */}
        <div style={{ width: "100%", marginBottom: 24 }}>
          {basics.location && <SidebarItem icon={<span>📍</span>}>{basics.location}</SidebarItem>}
          {basics.phone && <SidebarItem icon={<span>📞</span>}>{basics.phone}</SidebarItem>}
          {basics.email && <SidebarItem icon={<span>✉️</span>}>{basics.email}</SidebarItem>}
          {basics.url?.href && isUrl(basics.url.href) && (
            <SidebarItem icon={<span>🔗</span>}>
              <a href={basics.url.href} style={{ color: "#fff", textDecoration: "underline" }}>{basics.url.label || basics.url.href}</a>
            </SidebarItem>
          )}
        </div>
        {/* Summary */}
        {summary.visible && summary.content && (
          <div style={{ width: "100%", marginBottom: 24 }}>
            <SectionHeader>SUMMARY</SectionHeader>
            <hr style={{'height' : '2px' , "margin" : "10px 0" , "background" : "orange" , "border" : "none"} } />
            <div
              style={{ fontSize: 13, marginTop: 8, color: "#fff" }}
              dangerouslySetInnerHTML={{ __html: sanitize(summary.content) }}
            />
          </div>
        )}
        {/* Skills */}
        {skills.length > 0 && (
          <div style={{ width: "100%" }}>
            <SectionHeader>SKILLS</SectionHeader>
            <SkillList skills={skills} />
          </div>
        )}
      </div>
      {/* Main Content */}
      <div
        style={{
          flex: 1,
          background: "#fff",
          padding: 25,
          borderTopRightRadius: borderRadius,
          borderBottomRightRadius: borderRadius,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Name and Headline */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 36, fontWeight: 700, color: orange }}>{basics.name}</div>
          {basics.headline && <div style={{ fontSize: 18, color: darkGray, marginTop: 4 }}>{basics.headline}</div>}
        </div>
        {/* Experience */}
        {experience.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <SectionHeader><span style={{"color" : "black"}}>EXPERIENCE</span></SectionHeader>
            <ExperienceList experiences={experience} />
          </div>
        )}
        {/* Education */}
        {education.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <hr style={{'height' : '2px' , "margin" : "10px 0" , "background" : "orange" , "border" : "none"} } />
            <SectionHeader><span style={{"color" : "black"}}>EDUCATION AND TRAINING</span></SectionHeader>
            <EducationList education={education} />
          </div>
        )}
        {/* Languages */}
        {languages.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <SectionHeader>LANGUAGES</SectionHeader>
            <LanguageList languages={languages} />
          </div>
        )}
        {/* Interests */}
        {interests.length > 0 && (
          <div style={{ marginBottom: 0 }}>
            <SectionHeader>INTERESTS AND HOBBIES</SectionHeader>
            <InterestsList interests={interests} />
          </div>
        )}
      </div>
    </div>
  );
};
