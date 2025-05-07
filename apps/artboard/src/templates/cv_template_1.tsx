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
import { Education, Experience, Volunteer } from "@reactive-resume/schema";
import { cn, isEmptyString, isUrl, linearTransform, sanitize } from "@reactive-resume/utils";
import get from "lodash.get";
import React, { Fragment } from "react";

import { BrandIcon } from "../components/brand-icon";
import { Picture } from "../components/picture";
import { useArtboardStore } from "../store/artboard";
import type { TemplateProps } from "../types/template";

const Header = () => {
  const basics = useArtboardStore((state) => state.resume.basics);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      gap: '1rem', 
      paddingBottom: '2rem', 
      textAlign: 'center',
      borderBottom: '2px solid var(--primary)',
      marginBottom: '2rem'
    }}>
      <Picture />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div style={{ 
          fontSize: '2.5rem', 
          fontWeight: '700',
          letterSpacing: '-0.025em',
          color: 'var(--primary)'
        }}>{basics.name}</div>
        <div style={{ 
          fontSize: '1.25rem',
          color: 'var(--primary)',
          opacity: 0.8
        }}>{basics.headline}</div>
      </div>

      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        alignItems: 'center', 
        justifyContent: 'center',
        gap: '1.5rem', 
        fontSize: '0.95rem',
        maxWidth: '800px'
      }}>
        {basics.location && (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            backgroundColor: 'var(--primary)',
            color: 'var(--primary-foreground)',
            borderRadius: '9999px'
          }}>
            <i className="ph ph-bold ph-map-pin" />
            <div>{basics.location}</div>
          </div>
        )}
        {basics.phone && (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            backgroundColor: 'var(--primary)',
            color: 'var(--primary-foreground)',
            borderRadius: '9999px'
          }}>
            <i className="ph ph-bold ph-phone" />
            <a href={`tel:${basics.phone}`} target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
              {basics.phone}
            </a>
          </div>
        )}
        {basics.email && (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            backgroundColor: 'var(--primary)',
            color: 'var(--primary-foreground)',
            borderRadius: '9999px'
          }}>
            <i className="ph ph-bold ph-at" />
            <a href={`mailto:${basics.email}`} target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
              {basics.email}
            </a>
          </div>
        )}
        <Link url={basics.url} />
        {basics.customFields.map((item) => (
          <div key={item.id} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            backgroundColor: 'var(--primary)',
            color: 'var(--primary-foreground)',
            borderRadius: '9999px'
          }}>
            <i className={`ph ph-bold ph-${item.icon}`} />
            {isUrl(item.value) ? (
              <a href={item.value} target="_blank" rel="noreferrer noopener nofollow" style={{ color: 'inherit', textDecoration: 'none' }}>
                {item.name || item.value}
              </a>
            ) : (
              <span>{[item.name, item.value].filter(Boolean).join(": ")}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const Summary = () => {
  const section = useArtboardStore((state) => state.resume.sections.summary);

  if (!section.visible || isEmptyString(section.content)) return null;

  return (
    <section id={section.id} style={{ marginBottom: '2rem' }}>
      <div style={{ 
        marginBottom: '1rem', 
        fontWeight: '700',
        fontSize: '1.5rem',
        color: 'var(--primary)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem'
      }}>
        <div style={{ 
          width: '0.5rem', 
          height: '0.5rem', 
          backgroundColor: 'var(--primary)',
          borderRadius: '9999px'
        }} />
        <h4>{section.name}</h4>
      </div>

      <main style={{ 
        position: 'relative', 
        paddingLeft: '1.5rem', 
        borderLeft: '2px solid var(--primary)',
        fontSize: '1.1rem',
        lineHeight: '1.6'
      }}>
        <div style={{ 
          position: 'absolute', 
          left: '-0.5rem', 
          top: '0.75rem', 
          width: '1rem', 
          height: '1rem', 
          backgroundColor: 'var(--primary)', 
          borderRadius: '9999px' 
        }} />

        <div
          dangerouslySetInnerHTML={{ __html: sanitize(section.content) }}
          style={{ columns: section.columns }}
          className="wysiwyg"
        />
      </main>
    </section>
  );
};

type RatingProps = { level: number };

const Rating = ({ level }: RatingProps) => (
  <div style={{ 
    position: 'relative', 
    height: '0.5rem', 
    width: '10rem',
    marginTop: '0.5rem'
  }}>
    <div style={{ 
      position: 'absolute', 
      inset: 0, 
      height: '0.5rem', 
      width: '10rem', 
      borderRadius: '0.25rem', 
      backgroundColor: 'var(--primary)', 
      opacity: 0.15 
    }} />
    <div
      style={{ 
        position: 'absolute', 
        inset: 0, 
        height: '0.5rem', 
        borderRadius: '0.25rem', 
        backgroundColor: 'var(--primary)', 
        width: linearTransform(level, 0, 5, 0, 160) 
      }}
    />
  </div>
);

type LinkProps = {
  url: URL;
  icon?: React.ReactNode;
  iconOnRight?: boolean;
  label?: string;
  className?: string;
};

const Link = ({ url, icon, iconOnRight, label, className }: LinkProps) => {
  if (!isUrl(url.href)) return null;

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '0.5rem',
      padding: '0.5rem 1rem',
      backgroundColor: 'var(--primary)',
      color: 'var(--primary-foreground)',
      borderRadius: '9999px'
    }}>
      {!iconOnRight && (icon ?? <i className="ph ph-bold ph-link" />)}
      <a
        href={url.href}
        target="_blank"
        rel="noreferrer noopener nofollow"
        style={{ 
          color: 'inherit',
          textDecoration: 'none',
          fontWeight: '500'
        }}
      >
        {label ?? (url.label || url.href)}
      </a>
      {iconOnRight && (icon ?? <i className="ph ph-bold ph-link" />)}
    </div>
  );
};

type LinkedEntityProps = {
  name: string;
  url: URL;
  separateLinks: boolean;
  className?: string;
};

const LinkedEntity = ({ name, url, separateLinks, className }: LinkedEntityProps) => {
  return !separateLinks && isUrl(url.href) ? (
    <Link
      url={url}
      label={name}
      icon={<i className="ph ph-bold ph-globe" />}
      iconOnRight={true}
      className={className}
    />
  ) : (
    <div style={{ 
      fontWeight: '700',
      fontSize: '1.1rem',
      color: 'var(--primary)'
    }}>{name}</div>
  );
};

type SectionProps<T> = {
  section: SectionWithItem<T> | CustomSectionGroup;
  children?: (item: T) => React.ReactNode;
  className?: string;
  urlKey?: keyof T;
  levelKey?: keyof T;
  summaryKey?: keyof T;
  keywordsKey?: keyof T;
  isSidebarSection?: boolean;
};

// Helper to render section header with lines for sidebar
const SidebarSectionHeader = ({ children }: { children: React.ReactNode }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    margin: '1.5rem 0 1rem 0',
    fontWeight: 700,
    fontSize: '1.1rem',
    color: 'var(--primary)',
    justifyContent: 'center',
    letterSpacing: '0.01em',
  }}>
    <span style={{
      flex: 1,
      height: 2,
      borderBottom: '3px solid #e5a1a1',
      marginRight: 8,
      minWidth: 20,
      opacity: 0.5
    }} />
    <span style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '1.1rem', whiteSpace: 'nowrap' }}>
      &#176; {children} &#176;
    </span>
    <span style={{
      flex: 1,
      height: 2,
      borderBottom: '3px solid #e5a1a1',
      marginLeft: 8,
      minWidth: 20,
      opacity: 0.5
    }} />
  </div>
);

const Section = <T,>({
  section,
  children,
  className,
  urlKey,
  levelKey,
  summaryKey,
  keywordsKey,
  isSidebarSection = false,
}: SectionProps<T> & { isSidebarSection?: boolean }) => {
  if (!section.visible || section.items.length === 0) return null;

  return (
    <section id={section.id} style={{ marginBottom: '2rem' }}>
      {isSidebarSection ? (
        <SidebarSectionHeader>{section.name}</SidebarSectionHeader>
      ) : (
        <div style={{ 
          marginBottom: '1rem', 
          fontWeight: '700',
          fontSize: '1.5rem',
          color: 'var(--primary)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <div style={{ 
            width: '0.5rem', 
            height: '0.5rem', 
            backgroundColor: 'var(--primary)',
            borderRadius: '9999px'
          }} />
          <h4>{section.name}</h4>
        </div>
      )}
      <div
        style={{ 
          display: 'grid',
          gap: '1.5rem',
          gridTemplateColumns: `repeat(${section.columns}, 1fr)`
        }}
      >
        {section.items
          .filter((item) => item.visible)
          .map((item) => {
            const url = (urlKey && get(item, urlKey)) as URL | undefined;
            const level = (levelKey && get(item, levelKey, 0)) as number | undefined;
            const summary = (summaryKey && get(item, summaryKey, "")) as string | undefined;
            const keywords = (keywordsKey && get(item, keywordsKey, [])) as string[] | undefined;

            return (
              <div
                key={item.id}
                style={{
                  position: 'relative',
                  paddingLeft: '1.5rem',
                  borderLeft: '2px solid var(--primary)',
                  paddingBottom: '1rem'
                }}
              >
                <div>{children?.(item as T)}</div>

                {summary !== undefined && !isEmptyString(summary) && (
                  <div
                    dangerouslySetInnerHTML={{ __html: sanitize(summary) }}
                    className="wysiwyg"
                    style={{
                      marginTop: '0.75rem',
                      fontSize: '1rem',
                      lineHeight: '1.6'
                    }}
                  />
                )}

                {level !== undefined && level > 0 && <Rating level={level} />}

                {keywords !== undefined && keywords.length > 0 && (
                  <p style={{ 
                    fontSize: '0.95rem',
                    marginTop: '0.75rem',
                    color: 'var(--primary)',
                    opacity: 0.8
                  }}>{keywords.join(", ")}</p>
                )}

                {url !== undefined && section.separateLinks && <Link url={url} />}

                <div style={{ 
                  position: 'absolute', 
                  left: '-0.5rem', 
                  top: 0, 
                  width: '1rem', 
                  height: '1rem', 
                  backgroundColor: 'var(--primary)', 
                  borderRadius: '9999px' 
                }} />
              </div>
            );
          })}
      </div>
    </section>
  );
};

const Profiles = ({ isSidebarSection = false }: { isSidebarSection?: boolean }) => {
  const section = useArtboardStore((state) => state.resume.sections.profiles);
  return (
    <Section<Profile> section={section} isSidebarSection={isSidebarSection}>
      {(item) => (
        <div>
          {isUrl(item.url.href) ? (
            <Link url={item.url} label={item.username} icon={<BrandIcon slug={item.icon} />} />
          ) : (
            <p>{item.username}</p>
          )}
          {!item.icon && <p className="text-sm">{item.network}</p>}
        </div>
      )}
    </Section>
  );
};

const Experience = ({ isSidebarSection = false }: { isSidebarSection?: boolean }) => {
  const section = useArtboardStore((state) => state.resume.sections.experience);
  return (
    <Section<Experience> section={section} urlKey="url" summaryKey="summary" isSidebarSection={isSidebarSection}>
      {(item) => (
        <div>
          <LinkedEntity
            name={item.company}
            url={item.url}
            separateLinks={section.separateLinks}
            className="font-bold"
          />
          <div>{item.position}</div>
          <div>{item.location}</div>
          <div className="font-bold">{item.date}</div>
        </div>
      )}
    </Section>
  );
};

const Education = ({ isSidebarSection = false }: { isSidebarSection?: boolean }) => {
  const section = useArtboardStore((state) => state.resume.sections.education);
  return (
    <Section<Education> section={section} urlKey="url" summaryKey="summary" isSidebarSection={isSidebarSection}>
      {(item) => (
        <div>
          <LinkedEntity
            name={item.institution}
            url={item.url}
            separateLinks={section.separateLinks}
            className="font-bold"
          />
          <div>{item.area}</div>
          <div>{item.score}</div>
          <div>{item.studyType}</div>
          <div className="font-bold">{item.date}</div>
        </div>
      )}
    </Section>
  );
};

const Awards = ({ isSidebarSection = false }: { isSidebarSection?: boolean }) => {
  const section = useArtboardStore((state) => state.resume.sections.awards);
  return (
    <Section<Award> section={section} urlKey="url" summaryKey="summary" isSidebarSection={isSidebarSection}>
      {(item) => (
        <div>
          <div className="font-bold">{item.title}</div>
          <LinkedEntity name={item.awarder} url={item.url} separateLinks={section.separateLinks} />
          <div className="font-bold">{item.date}</div>
        </div>
      )}
    </Section>
  );
};

const Certifications = ({ isSidebarSection = false }: { isSidebarSection?: boolean }) => {
  const section = useArtboardStore((state) => state.resume.sections.certifications);
  return (
    <Section<Certification> section={section} urlKey="url" summaryKey="summary" isSidebarSection={isSidebarSection}>
      {(item) => (
        <div>
          <div className="font-bold">{item.name}</div>
          <LinkedEntity name={item.issuer} url={item.url} separateLinks={section.separateLinks} />
          <div className="font-bold">{item.date}</div>
        </div>
      )}
    </Section>
  );
};

const Skills = ({ isSidebarSection = false }: { isSidebarSection: boolean }) => {
  const section = useArtboardStore((state) => state.resume.sections.skills);
  return (
    <Section<Skill> section={section} levelKey="level" keywordsKey="keywords" isSidebarSection={isSidebarSection}>
      {(item) => (
        <div>
          <div className="font-bold">{item.name}</div>
          <div>{item.description}</div>
        </div>
      )}
    </Section>
  );
};

const Interests = ({ isSidebarSection = false }: { isSidebarSection: boolean }) => {
  const section = useArtboardStore((state) => state.resume.sections.interests);
  return (
    <Section<Interest> section={section} keywordsKey="keywords" className="space-y-0.5" isSidebarSection={isSidebarSection}>
      {(item) => <div className="font-bold">{item.name}</div>}
    </Section>
  );
};

const Publications = ({ isSidebarSection = false }: { isSidebarSection: boolean }) => {
  const section = useArtboardStore((state) => state.resume.sections.publications);
  return (
    <Section<Publication> section={section} urlKey="url" summaryKey="summary" isSidebarSection={isSidebarSection}>
      {(item) => (
        <div>
          <LinkedEntity
            name={item.name}
            url={item.url}
            separateLinks={section.separateLinks}
            className="font-bold"
          />
          <div>{item.publisher}</div>
          <div className="font-bold">{item.date}</div>
        </div>
      )}
    </Section>
  );
};

const Volunteer = ({ isSidebarSection = false }: { isSidebarSection: boolean }) => {
  const section = useArtboardStore((state) => state.resume.sections.volunteer);
  return (
    <Section<Volunteer> section={section} urlKey="url" summaryKey="summary" isSidebarSection={isSidebarSection}>
      {(item) => (
        <div>
          <LinkedEntity
            name={item.organization}
            url={item.url}
            separateLinks={section.separateLinks}
            className="font-bold"
          />
          <div>{item.position}</div>
          <div>{item.location}</div>
          <div className="font-bold">{item.date}</div>
        </div>
      )}
    </Section>
  );
};

const Languages = ({ isSidebarSection = false }: { isSidebarSection: boolean }) => {
  const section = useArtboardStore((state) => state.resume.sections.languages);
  return (
    <Section<Language> section={section} levelKey="level" isSidebarSection={isSidebarSection}>
      {(item) => (
        <div>
          <div className="font-bold">{item.name}</div>
          <div>{item.description}</div>
        </div>
      )}
    </Section>
  );
};

const Projects = ({ isSidebarSection = false }: { isSidebarSection: boolean }) => {
  const section = useArtboardStore((state) => state.resume.sections.projects);
  return (
    <Section<Project> section={section} urlKey="url" summaryKey="summary" keywordsKey="keywords" isSidebarSection={isSidebarSection}>
      {(item) => (
        <div>
          <div>
            <LinkedEntity
              name={item.name}
              url={item.url}
              separateLinks={section.separateLinks}
              className="font-bold"
            />
            <div>{item.description}</div>
            <div className="font-bold">{item.date}</div>
          </div>
        </div>
      )}
    </Section>
  );
};

const References = ({ isSidebarSection = false }: { isSidebarSection: boolean }) => {
  const section = useArtboardStore((state) => state.resume.sections.references);
  return (
    <Section<Reference> section={section} urlKey="url" summaryKey="summary" isSidebarSection={isSidebarSection}>
      {(item) => (
        <div>
          <LinkedEntity
            name={item.name}
            url={item.url}
            separateLinks={section.separateLinks}
            className="font-bold"
          />
          <div>{item.description}</div>
        </div>
      )}
    </Section>
  );
};

const Custom = ({ id, isSidebarSection = false }: { id: string; isSidebarSection: boolean }) => {
  const section = useArtboardStore((state) => state.resume.sections.custom[id]);
  return (
    <Section<CustomSection>
      section={section}
      urlKey="url"
      summaryKey="summary"
      keywordsKey="keywords"
      isSidebarSection={isSidebarSection}
    >
      {(item) => (
        <div>
          <div>
            <LinkedEntity
              name={item.name}
              url={item.url}
              separateLinks={section.separateLinks}
              className="font-bold"
            />
            <div>{item.description}</div>
            <div className="font-bold">{item.date}</div>
            <div>{item.location}</div>
          </div>
        </div>
      )}
    </Section>
  );
};

const mapSectionToComponent = (section: SectionKey, isSidebarSection = false) => {
  switch (section) {
    case "profiles": {
      return <Profiles isSidebarSection={isSidebarSection} />;
    }
    case "summary": {
      return <Summary />;
    }
    case "experience": {
      return <Experience isSidebarSection={isSidebarSection} />;
    }
    case "education": {
      return <Education isSidebarSection={isSidebarSection} />;
    }
    case "awards": {
      return <Awards isSidebarSection={isSidebarSection} />;
    }
    case "certifications": {
      return <Certifications isSidebarSection={isSidebarSection} />;
    }
    case "skills": {
      return <Skills isSidebarSection={isSidebarSection} />;
    }
    case "interests": {
      return <Interests isSidebarSection={isSidebarSection} />;
    }
    case "publications": {
      return <Publications isSidebarSection={isSidebarSection} />;
    }
    case "volunteer": {
      return <Volunteer isSidebarSection={isSidebarSection} />;
    }
    case "languages": {
      return <Languages isSidebarSection={isSidebarSection} />;
    }
    case "projects": {
      return <Projects isSidebarSection={isSidebarSection} />;
    }
    case "references": {
      return <References isSidebarSection={isSidebarSection} />;
    }
    default: {
      if (section.startsWith("custom.")) return <Custom id={section.split(".")[1]} isSidebarSection={isSidebarSection} />;
      return null;
    }
  }
};

export const cv_template_1 = ({ columns, isFirstPage = false }: TemplateProps) => {
  const [main, sidebar] = columns;

  return (
    <div style={{ 
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto',
      backgroundColor: 'var(--background)',
      color: 'var(--foreground)'
    }}>
      {isFirstPage && <Header />}

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '2rem'
      }}>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '2rem',
          paddingRight: '2rem',
          borderRight: '2px solid var(--primary)'
        }}>
          {sidebar.map((section) => (
            <Fragment key={section}>{mapSectionToComponent(section, true)}</Fragment>
          ))}
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            gridColumn: sidebar.length > 0 ? 'span 2' : 'span 3'
          }}
        >
          {main.map((section) => (
            <Fragment key={section}>{mapSectionToComponent(section, false)}</Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

// Convert component to string representation

