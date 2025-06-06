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
import { cn, isEmptyString, isUrl, sanitize } from "@reactive-resume/utils";
import get from "lodash.get";
import { Fragment } from "react";

import { BrandIcon } from "../components/brand-icon";
import { Picture } from "../components/picture";
import { useArtboardStore } from "../store/artboard";
import type { TemplateProps } from "../types/template";

const Header = () => {
  const basics = useArtboardStore((state) => state.resume.basics);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <Picture />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{basics.name}</div>
          <div style={{ fontSize: '1rem' }}>{basics.headline}</div>
        </div>

        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          alignItems: 'center', 
          columnGap: '0.5rem',
          rowGap: '0.125rem',
          fontSize: '0.875rem'
        }}>
          {basics.location && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <i className="ph ph-bold ph-map-pin text-primary" />
              <div>{basics.location}</div>
            </div>
          )}
          {basics.phone && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <i className="ph ph-bold ph-phone text-primary" />
              <a href={`tel:${basics.phone}`} target="_blank" rel="noreferrer">
                {basics.phone}
              </a>
            </div>
          )}
          {basics.email && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <i className="ph ph-bold ph-at text-primary" />
              <a href={`mailto:${basics.email}`} target="_blank" rel="noreferrer">
                {basics.email}
              </a>
            </div>
          )}
          <Link url={basics.url} />
          {basics.customFields.map((item) => (
            <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <i className={cn(`ph ph-bold ph-${item.icon}`, "text-primary")} />
              {isUrl(item.value) ? (
                <a href={item.value} target="_blank" rel="noreferrer noopener nofollow">
                  {item.name || item.value}
                </a>
              ) : (
                <span>{[item.name, item.value].filter(Boolean).join(": ")}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Summary = () => {
  const section = useArtboardStore((state) => state.resume.sections.summary);

  if (!section.visible || isEmptyString(section.content)) return null;

  return (
    <section id={section.id}>
      <h4 style={{ 
        marginBottom: '0.5rem', 
        borderBottom: '1px solid', 
        paddingBottom: '0.125rem', 
        fontSize: '0.875rem', 
        fontWeight: 'bold' 
      }}>
        {section.name}
      </h4>

      <div
        dangerouslySetInnerHTML={{ __html: sanitize(section.content) }}
        style={{ 
          columns: section.columns,
          lineHeight: '1.5',
          wordBreak: 'break-word'
        }}
      />
    </section>
  );
};

type RatingProps = { level: number };

const Rating = ({ level }: RatingProps) => {
  // Get the parent element's class to determine if we're in sidebar
  const isInSidebar = document.querySelector('.sidebar')?.contains(document.activeElement);

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '0.375rem' 
    }}>
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          style={{
            width: '0.5rem',
            height: '0.5rem',
            borderRadius: '9999px',
            border: '1px solid',
            borderColor: isInSidebar ? 'var(--background)' : 'var(--primary)',
            backgroundColor: level > index 
              ? (isInSidebar ? 'var(--background)' : 'var(--primary)')
              : 'transparent'
          }}
        />
      ))}
    </div>
  );
};

type LinkProps = {
  url: URL;
  icon?: React.ReactNode;
  iconOnRight?: boolean;
  label?: string;
  className?: string;
  style?: React.CSSProperties;
};

const Link = ({ url, icon, iconOnRight, label, className, style }: LinkProps) => {
  if (!isUrl(url.href)) return null;

  const isInSidebar = document.querySelector('.sidebar')?.contains(document.activeElement);
  const iconStyle = {
    color: isInSidebar ? 'white' : 'var(--primary)'
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
      {!iconOnRight &&
        (icon ?? <i className="ph ph-bold ph-link" style={iconStyle} />)}
      <a
        href={url.href}
        target="_blank"
        rel="noreferrer noopener nofollow"
        style={{ display: 'inline-block', ...style }}
      >
        {label ?? (url.label || url.href)}
      </a>
      {iconOnRight &&
        (icon ?? <i className="ph ph-bold ph-link" style={iconStyle} />)}
    </div>
  );
};

type LinkedEntityProps = {
  name: string;
  url: URL;
  separateLinks: boolean;
  className?: string;
  style?: React.CSSProperties;
};

const LinkedEntity = ({ name, url, separateLinks, className, style }: LinkedEntityProps) => {
  return !separateLinks && isUrl(url.href) ? (
    <Link
      url={url}
      label={name}
      icon={<i className="ph ph-bold ph-globe text-primary" />}
      iconOnRight={true}
      style={{ fontWeight: style?.fontWeight }}
    />
  ) : (
    <div style={style}>{name}</div>
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
};

const Section = <T,>({
  section,
  children,
  className,
  urlKey,
  levelKey,
  summaryKey,
  keywordsKey,
}: SectionProps<T>) => {
  if (!section.visible || section.items.length === 0) return null;

  return (
    <section id={section.id} style={{ display: 'grid' }}>
      <h4 style={{ 
        marginBottom: '0.5rem', 
        borderBottom: '1px solid', 
        paddingBottom: '0.125rem', 
        fontSize: '0.875rem', 
        fontWeight: 'bold' 
      }}>
        {section.name}
      </h4>

      <div
        style={{ 
          display: 'grid',
          columnGap: '1.5rem',
          rowGap: '0.75rem',
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
              <div key={item.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div>
                  {children?.(item as T)}
                  {url !== undefined && section.separateLinks && <Link url={url} />}
                </div>

                {summary !== undefined && !isEmptyString(summary) && (
                  <div
                    dangerouslySetInnerHTML={{ __html: sanitize(summary) }}
                    style={{ 
                      lineHeight: '1.5',
                      wordBreak: 'break-word'
                    }}
                  />
                )}

                {level !== undefined && level > 0 && <Rating level={level} />}

                {keywords !== undefined && keywords.length > 0 && (
                  <p style={{ fontSize: '0.875rem' }}>{keywords.join(", ")}</p>
                )}
              </div>
            );
          })}
      </div>
    </section>
  );
};

const Experience = () => {
  const section = useArtboardStore((state) => state.resume.sections.experience);
  const isInSidebar = document.querySelector('.sidebar')?.contains(document.activeElement);

  return (
    <Section<Experience> section={section} urlKey="url" summaryKey="summary">
      {(item) => (
        <div style={{ 
          display: 'flex', 
          alignItems: 'flex-start', 
          justifyContent: 'space-between',
          ...(isInSidebar && {
            flexDirection: 'column',
            alignItems: 'flex-start'
          })
        }}>
          <div style={{ textAlign: 'left' }}>
            <LinkedEntity
              name={item.company}
              url={item.url}
              separateLinks={section.separateLinks}
              style={{ fontWeight: 'bold' }}
            />
            <div>{item.position}</div>
          </div>

          <div style={{ 
            flexShrink: 0,
            textAlign: 'right'
          }}>
            <div style={{ fontWeight: 'bold' }}>{item.date}</div>
            <div>{item.location}</div>
          </div>
        </div>
      )}
    </Section>
  );
};

const Education = () => {
  const section = useArtboardStore((state) => state.resume.sections.education);
  const isInSidebar = document.querySelector('.sidebar')?.contains(document.activeElement);

  return (
    <Section<Education> section={section} urlKey="url" summaryKey="summary">
      {(item) => (
        <div style={{ 
          display: 'flex', 
          alignItems: 'flex-start', 
          justifyContent: 'space-between',
          ...(isInSidebar && {
            flexDirection: 'column',
            alignItems: 'flex-start'
          })
        }}>
          <div style={{ textAlign: 'left' }}>
            <LinkedEntity
              name={item.institution}
              url={item.url}
              separateLinks={section.separateLinks}
              style={{ fontWeight: 'bold' }}
            />
            <div>{item.area}</div>
            <div>{item.score}</div>
          </div>

          <div style={{ 
            flexShrink: 0,
            textAlign: 'right'
          }}>
            <div style={{ fontWeight: 'bold' }}>{item.date}</div>
            <div>{item.studyType}</div>
          </div>
        </div>
      )}
    </Section>
  );
};

const Profiles = () => {
  const section = useArtboardStore((state) => state.resume.sections.profiles);

  return (
    <Section<Profile> section={section}>
      {(item) => (
        <div>
          {isUrl(item.url.href) ? (
            <Link 
              url={item.url} 
              label={item.username} 
              icon={<BrandIcon slug={item.icon} />} 
            />
          ) : (
            <p>{item.username}</p>
          )}
          {!item.icon && <p style={{ fontSize: '0.875rem' }}>{item.network}</p>}
        </div>
      )}
    </Section>
  );
};

const Awards = () => {
  const section = useArtboardStore((state) => state.resume.sections.awards);

  return (
    <Section<Award> section={section} urlKey="url" summaryKey="summary">
      {(item) => (
        <div className="flex items-start justify-between group-[.sidebar]:flex-col group-[.sidebar]:items-start">
          <div className="text-left">
            <div className="font-bold">{item.title}</div>
            <LinkedEntity
              name={item.awarder}
              url={item.url}
              separateLinks={section.separateLinks}
            />
          </div>

          <div className="shrink-0 text-right">
            <div className="font-bold">{item.date}</div>
          </div>
        </div>
      )}
    </Section>
  );
};

const Certifications = () => {
  const section = useArtboardStore((state) => state.resume.sections.certifications);

  return (
    <Section<Certification> section={section} urlKey="url" summaryKey="summary">
      {(item) => (
        <div className="flex items-start justify-between group-[.sidebar]:flex-col group-[.sidebar]:items-start">
          <div className="text-left">
            <div className="font-bold">{item.name}</div>
            <LinkedEntity name={item.issuer} url={item.url} separateLinks={section.separateLinks} />
            <div className="font-bold">{item.date}</div>
          </div>
        </div>
      )}
    </Section>
  );
};

const Skills = () => {
  const section = useArtboardStore((state) => state.resume.sections.skills);

  return (
    <Section<Skill> section={section} levelKey="level" keywordsKey="keywords">
      {(item) => (
        <div>
          <div className="font-bold">{item.name}</div>
          <div>{item.description}</div>
        </div>
      )}
    </Section>
  );
};

const Interests = () => {
  const section = useArtboardStore((state) => state.resume.sections.interests);

  return (
    <Section<Interest> section={section} keywordsKey="keywords" className="space-y-0.5">
      {(item) => <div className="font-bold">{item.name}</div>}
    </Section>
  );
};

const Publications = () => {
  const section = useArtboardStore((state) => state.resume.sections.publications);

  return (
    <Section<Publication> section={section} urlKey="url" summaryKey="summary">
      {(item) => (
        <div className="flex items-start justify-between group-[.sidebar]:flex-col group-[.sidebar]:items-start">
          <div className="text-left">
            <LinkedEntity
              name={item.name}
              url={item.url}
              separateLinks={section.separateLinks}
              className="font-bold"
            />
            <div>{item.publisher}</div>
          </div>

          <div className="shrink-0 text-right">
            <div className="font-bold">{item.date}</div>
          </div>
        </div>
      )}
    </Section>
  );
};

const Volunteer = () => {
  const section = useArtboardStore((state) => state.resume.sections.volunteer);

  return (
    <Section<Volunteer> section={section} urlKey="url" summaryKey="summary">
      {(item) => (
        <div className="flex items-start justify-between group-[.sidebar]:flex-col group-[.sidebar]:items-start">
          <div className="text-left">
            <LinkedEntity
              name={item.organization}
              url={item.url}
              separateLinks={section.separateLinks}
              className="font-bold"
            />
            <div>{item.position}</div>
          </div>

          <div className="shrink-0 text-right">
            <div className="font-bold">{item.date}</div>
            <div>{item.location}</div>
          </div>
        </div>
      )}
    </Section>
  );
};

const Languages = () => {
  const section = useArtboardStore((state) => state.resume.sections.languages);

  return (
    <Section<Language> section={section} levelKey="level">
      {(item) => (
        <div className="space-y-0.5">
          <div className="font-bold">{item.name}</div>
          <div>{item.description}</div>
        </div>
      )}
    </Section>
  );
};

const Projects = () => {
  const section = useArtboardStore((state) => state.resume.sections.projects);

  return (
    <Section<Project> section={section} urlKey="url" summaryKey="summary" keywordsKey="keywords">
      {(item) => (
        <div className="flex items-start justify-between group-[.sidebar]:flex-col group-[.sidebar]:items-start">
          <div className="text-left">
            <LinkedEntity
              name={item.name}
              url={item.url}
              separateLinks={section.separateLinks}
              className="font-bold"
            />
            <div>{item.description}</div>
          </div>

          <div className="shrink-0 text-right">
            <div className="font-bold">{item.date}</div>
          </div>
        </div>
      )}
    </Section>
  );
};

const References = () => {
  const section = useArtboardStore((state) => state.resume.sections.references);

  return (
    <Section<Reference> section={section} urlKey="url" summaryKey="summary">
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

const Custom = ({ id }: { id: string }) => {
  const section = useArtboardStore((state) => state.resume.sections.custom[id]);

  return (
    <Section<CustomSection>
      section={section}
      urlKey="url"
      summaryKey="summary"
      keywordsKey="keywords"
    >
      {(item) => (
        <div className="flex items-start justify-between group-[.sidebar]:flex-col group-[.sidebar]:items-start">
          <div className="text-left">
            <LinkedEntity
              name={item.name}
              url={item.url}
              separateLinks={section.separateLinks}
              className="font-bold"
            />
            <div>{item.description}</div>
          </div>

          <div className="shrink-0 text-right">
            <div className="font-bold">{item.date}</div>
            <div>{item.location}</div>
          </div>
        </div>
      )}
    </Section>
  );
};

const mapSectionToComponent = (section: SectionKey) => {
  switch (section) {
    case "profiles": {
      return <Profiles />;
    }
    case "summary": {
      return <Summary />;
    }
    case "experience": {
      return <Experience />;
    }
    case "education": {
      return <Education />;
    }
    case "awards": {
      return <Awards />;
    }
    case "certifications": {
      return <Certifications />;
    }
    case "skills": {
      return <Skills />;
    }
    case "interests": {
      return <Interests />;
    }
    case "publications": {
      return <Publications />;
    }
    case "volunteer": {
      return <Volunteer />;
    }
    case "languages": {
      return <Languages />;
    }
    case "projects": {
      return <Projects />;
    }
    case "references": {
      return <References />;
    }
    default: {
      if (section.startsWith("custom.")) return <Custom id={section.split(".")[1]} />;

      return null;
    }
  }
};

export const cv_template_4 = ({ columns, isFirstPage = false }: TemplateProps) => {
  const [main, sidebar] = columns;
  const primaryColor = useArtboardStore((state) => state.resume.metadata.theme.primary);

  return (
    <div style={{ 
      display: 'grid',
      minHeight: 'inherit',
      gridTemplateColumns: 'repeat(3, 1fr)'
    }}>
      <div
        style={{
          padding: '4px',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          gridColumn: sidebar.length > 0 ? 'span 2' : 'span 3',
        }}
      >
        {isFirstPage && <Header />}

        {main.map((section) => (
          <Fragment key={section}>{mapSectionToComponent(section)}</Fragment>
        ))}
      </div>

      <div
        style={{
          padding: '4px',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          height: '100%',
          backgroundColor: primaryColor,
          color: '#ffffff',
          visibility: sidebar.length === 0 ? 'hidden' : 'visible',
        }}
      >
        {sidebar.map((section) => (
          <Fragment key={section}>{mapSectionToComponent(section)}</Fragment>
        ))}
      </div>
    </div>
  );
};
