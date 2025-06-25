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
  
  
  import profilePic from '../assets/profile-img.jpg'


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
      <div className="flex items-center gap-x-1.5">
        {!iconOnRight &&
          (icon ?? <i className="ph ph-bold ph-link text-primary group-[.sidebar]:text-primary" />)}
        <a
          href={url.href}
          target="_blank"
          rel="noreferrer noopener nofollow"
          className={cn("inline-block", className)}
        >
          {label ?? (url.label || url.href)}
        </a>
        {iconOnRight &&
          (icon ?? <i className="ph ph-bold ph-link text-primary group-[.sidebar]:text-primary" />)}
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
        icon={<i className="ph ph-bold ph-globe text-primary group-[.sidebar]:text-primary" />}
        iconOnRight={true}
        className={className}
      />
    ) : (
      <div className={className}>{name}</div>
    );
  };



  const Header = () => {
    const basics = useArtboardStore((state) => state.resume.basics);

    return (
        <>
        <div className="py-8 px-9">
            <h2 className="uppercase text-[48px] font-[700] mb-5 text-[#0E1E37]">{basics?.name.split(" ")[0]} <span className="text-[#CFD823]">{basics?.name.split(" ")[1]}</span></h2>
            <p className="tracking-[4px] mb-6 font-semibold uppercase text-[#0E1E37]">{basics?.profession}</p>
            <div className="contact-info bg-[#CFD823] rounded-[20px] p-4 flex flex-col gap-2.5">
              <div className="flex gap-3">
                <span></span>
                <i className="ph ph-bold ph-at text-[#0E1E37]" />
                <span className="text-[12px] font-semibold text-[#0E1E37]">{basics?.email}</span>
              </div>
              <div className="flex gap-3">
                <span></span>
                <i className="ph ph-bold ph-phone text-[#0E1E37]" />
                <span className="text-[12px] font-semibold text-[#0E1E37]">{basics?.phone}</span>
              </div>
              <div className="flex gap-3">
                <span></span>
                <i className="ph ph-bold ph-map-pin text-[#0E1E37]" />
                <span className="text-[12px] font-semibold text-[#0E1E37]">{basics?.location}</span>
              </div>
              <div className="flex flex-col gap-3">  
              {basics.customFields.map((item) => (
            <div key={item.id} className="flex items-center gap-x-1.5">
              <i className={cn(`ph ph-bold ph-${item.icon} text-[#0E1E37]`)} />
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
        </>
      
    )
  } 

  const Summary = () => {
    const section = useArtboardStore((state) => state.resume.sections.summary);

    if (!section.visible || isEmptyString(section.content)) return null;

    return (
        <div className="about-container pr-4 mb-5">
        <h3 className="text-[#0E1E37] tracking-[4px] mb-4 uppercase text-[18px] font-extrabold">Summary</h3>
        
        <p className="text-[12px] text-black" dangerouslySetInnerHTML={{ __html: sanitize(section.content) }} />
      </div>
    );
  };


  type RatingProps = { level: number };

const Rating = ({ level }: RatingProps) => {
  const primaryColor = useArtboardStore((state) => state.resume.metadata.theme.primary);

  return (
    <div className="relative">
      <div
        className="h-2.5 w-full rounded-sm"
        style={{ backgroundColor: hexToRgb(primaryColor, 0.4) }}
      />
      <div
        className="absolute inset-y-0 left-0 h-2.5 w-full rounded-sm bg-[#57534e]"
        style={{ width: `${linearTransform(level, 0, 5, 0, 100)}%` }}
      />
    </div>
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
      <section id={section.id} className="grid">
        <h4 className="pb-0.5 text-sm font-bold group-[.sidebar]:text-primary">
          {section.name}
        </h4>
        <hr style={{ "height" : "1px" , "background" : "#000" , "border" : "none" , "margin" : "10px 0px" }} />
  
        <div
          className="grid gap-x-6 gap-y-3"
          style={{ gridTemplateColumns: `repeat(${section.columns}, 1fr)` }}
        >
          {section.items
            .filter((item) => item.visible)
            .map((item) => {
              const url = (urlKey && get(item, urlKey)) as URL | undefined;
              const level = (levelKey && get(item, levelKey, 0)) as number | undefined;
              const summary = (summaryKey && get(item, summaryKey, "")) as string | undefined;
              const keywords = (keywordsKey && get(item, keywordsKey, [])) as string[] | undefined;
  
              return (
                <div key={item.id} className={cn("space-y-2", className)}>
                  <div>
                    {children?.(item as T)}
                    {/* {url !== undefined && section.separateLinks && <Link url={url} />} */}
                  </div>
  
                  {summary !== undefined && !isEmptyString(summary) && (
                    <div
                      dangerouslySetInnerHTML={{ __html: sanitize(summary) }}
                      className="wysiwyg"
                    />
                  )}
  
                  {level !== undefined && level > 0 && <Rating level={level} />}
  
                  {keywords !== undefined && keywords.length > 0 && (
                    <p className="text-sm">{keywords.join(", ")}</p>
                  )}
                </div>
              );
            })}
        </div>
      </section>
    );
  };


  const Skills = () => {
    const section = useArtboardStore((state) => state.resume.sections.skills);
    

    return (
      <div className="skill-container pr-4 mb-5">
      {/* <h3 className="text-[#0E1E37] tracking-[4px] mb-4 uppercase text-[18px] font-extrabold">Skills</h3> */}
      <div className="flex flex-col gap-2">
      <Section<Skill> section={section} levelKey="level" keywordsKey="keywords">
       {(item) => (
       <div>
       <h4 className="text-[12px] font-medium text-black">{item.name}</h4>
       <div>{item.description}</div>
       {/* <div className="relative h-[5px] bg-[#CFD823] w-full">
         <div className="absolute inset-0 w-full h-[5px] bg-[#0E1E37]"></div>
       </div> */}
     </div>
    )}
  </Section>
       
      </div>
    </div>
    );
  }

  const Languages = () => {
    const section = useArtboardStore((state) => state.resume.sections.languages);
  
    return (
      <div className="about-container pr-4 mb-5">
      <div className="flex flex-wrap gap-5">
      <Section<Language> section={section} levelKey="level">
        {(item) => (
            <div className="w-[90px] h-[90px] rounded-full border-[8px] flex justify-center items-center flex-col border-[#CFD823] bg-[#0E1E37]">
                <p className="text-center text-white text-[10px] mb-1.5 font-bold">{item.name}</p>
                <p className="text-center text-[#E8E8E8] text-[10px] mb-0">{item.description}</p>
            </div>
            
        )}
      </Section>
      </div>
      </div>

     
    );
  };

 
  const Experience = () => {
    const section = useArtboardStore((state) => state.resume.sections.experience);
  
    return (
      <div className="flex gap-5 flex-col mb-4">
      <Section<Experience> section={section} urlKey="url" summaryKey="summary">
        {(item) => (


<div className="inner-part">
  <div className="flex gap-4 items-start mb-3">
    <div className="py-[3px] px-2 bg-[#CFD823] rounded-[30px] flex-none uppercase text-[12px] text-[#0E1E37] font-semibold">
      {item.date}
    </div>
    <div>
    <LinkedEntity
                name={item.company}
                url={item.url}
                separateLinks={section.separateLinks}
                className="font-bold"
              />
      <h4 className="text-white text-[12px] font-semibold mb-1">{item.position}</h4>
      <p className="text-[#B5B3B3] text-[12px] mb-0">{item.company}</p>
    </div>
  </div>
</div>
        )}
      </Section>
      </div>
    );
  };

  const Education = () => {
    const section = useArtboardStore((state) => state.resume.sections.education);
  
    return (
      <div className="mb-4">
  
<div className="inner-part">
      <Section<Education> section={section} urlKey="url" summaryKey="summary">
        {(item) => (



  <div className="flex flex-col gap-2 items-start mb-3">
    <div className="inline-block py-[3px] px-2 bg-[#CFD823] rounded-[30px]">
      <span className="uppercase text-[12px] text-[#0E1E37] font-semibold">{item.date}</span>
    </div>
    <div>
      <h4 className="text-white text-[12px] font-semibold mb-1">{item.area}</h4>
      <p className="text-[#B5B3B3] text-[12px] mb-0">{item.institution}</p>
      <p className="text-[#B5B3B3] text-[12px] mb-0">{item.score}</p>
    </div>
  </div>


          // <div className="flex items-start justify-between group-[.sidebar]:flex-col group-[.sidebar]:items-start">
          //   <div className="text-left">
          //     <LinkedEntity
          //       name={item.institution}
          //       url={item.url}
          //       separateLinks={section.separateLinks}
          //       className="font-bold"
          //     />
          //     <div>{item.area}</div>
          //     <div>{item.score}</div>
          //   </div>
  
          //   <div className="shrink-0 text-right">
          //     <div className="font-bold">{item.date}</div>
          //     <div>{item.studyType}</div>
          //   </div>
          // </div>
        )}
      </Section>
      </div>
</div>
    );
  };



  const mapSectionToComponent = (section: SectionKey) => {
    switch (section) {
      case "profiles": {
        // return <Profiles />;
      }
      case "summary": {
        return <Summary />;
      }
      case "experience": {
        // return <Experience />;
      }
      case "education": {
        // return <Education />;
      }
      case "awards": {
        // return <Awards />;
      }
      case "certifications": {
        // return <Certifications />;
      }
      case "skills": {
        // return <Skills />;
      }
      case "interests": {
        // return <Interests />;
      }
      case "publications": {
        // return <Publications />;
      }
      case "volunteer": {
        // return <Volunteer />;
      }
      case "languages": {
        // return <Languages />;
      }
      case "projects": {
        // return <Projects />;
      }
      case "references": {
        //  return <References />;
      }
      default: {
        // if (section.startsWith("custom.")) return <Custom id={section.split(".")[1]} />;
  
        return null;
      }
    }
  };



  export const cv_template_15 = ({ columns, isFirstPage = false }: TemplateProps) => {
    const [main, sidebar] = columns;
  
    const primaryColor = useArtboardStore((state) => state.resume.metadata.theme.primary);



  
    return (
      <div className="flex gap-5 min-h-[100vh]">
        <div className="w-[60%] flex flex-col min-h-full">
          {isFirstPage && <Header />}
          <div className="journey-wrapper flex-1 rounded p-8 bg-[#0E1E37] rounded-r-[60px] rounded-b-[60px] rounded-l-[0px]">
            {/* <h3 className="text-white tracking-[4px] mb-2.5 uppercase text-[18px] font-extrabold">Work Experience</h3> */}
            {<Experience />}
           
            {/* <h3 className="text-white tracking-[4px] mb-2.5 uppercase text-[18px] font-extrabold">Education</h3> */}
           {<Education />}
            <h3 className="text-white tracking-[4px] mb-2.5 uppercase text-[18px] font-extrabold">Design Work</h3>
            <div className="mb-4">
              <div className="mb-2.5">
                <a href="#" className="text-[10px] text-white">https://www.figma.com/design/JvkLhLziuyr0oYwpIimooI/Zety-Resume-Builder?node-id=2007-250&t=kJFKyrWdzFth1Pnh-0</a>
              </div>
              <div className="mb-2.5">
                <a href="#" className="text-[10px] text-white">https://www.figma.com/design/JvkLhLziuyr0oYwpIimooI/Zety-Resume-Builder?node-id=2007-250&t=kJFKyrWdzFth1Pnh-0</a>
              </div>
              <div className="mb-2.5">
                <a href="#" className="text-[10px] text-white">https://www.figma.com/design/JvkLhLziuyr0oYwpIimooI/Zety-Resume-Builder?node-id=2007-250&t=kJFKyrWdzFth1Pnh-0</a>
              </div>
              <div className="mb-2.5">
                <a href="#" className="text-[10px] text-white">https://www.figma.com/design/JvkLhLziuyr0oYwpIimooI/Zety-Resume-Builder?node-id=2007-250&t=kJFKyrWdzFth1Pnh-0</a>
              </div>
              <div className="mb-2.5">
                <a href="#" className="text-[10px] text-white">https://www.figma.com/design/JvkLhLziuyr0oYwpIimooI/Zety-Resume-Builder?node-id=2007-250&t=kJFKyrWdzFth1Pnh-0</a>
              </div>
              <div className="mb-2.5">
                <a href="#" className="text-[10px] text-white">https://www.figma.com/design/JvkLhLziuyr0oYwpIimooI/Zety-Resume-Builder?node-id=2007-250&t=kJFKyrWdzFth1Pnh-0</a>
              </div>
              <div className="mb-2.5">
                <a href="#" className="text-[10px] text-white">https://www.figma.com/design/JvkLhLziuyr0oYwpIimooI/Zety-Resume-Builder?node-id=2007-250&t=kJFKyrWdzFth1Pnh-0</a>
              </div>
            </div>
            <h3 className="text-white tracking-[4px] mb-2.5 uppercase text-[18px] font-extrabold">Portfolio</h3>
            <div className="mb-4">
              <div className="mb-2.5">
                <a href="#" className="text-[10px] text-white">https://www.figma.com/design/JvkLhLziuyr0oYwpIimooI/Zety-Resume-Builder?node-id=2007-250&t=kJFKyrWdzFth1Pnh-0</a>
              </div>
            </div>
          </div>
          <div className="about-container p-8 mt-4">
            <h3 className="text-[#0E1E37] tracking-[4px] mb-4 uppercase text-[18px] font-extrabold">Personal Skills</h3>
            <ul className="flex flex-col gap-1.5">
              <li className="text-[12px] text-[#0E1E37]">Creative Spirit</li>
              <li className="text-[12px] text-[#0E1E37]">Reliable and Professional</li>
              <li className="text-[12px] text-[#0E1E37]">Organized</li>
              <li className="text-[12px] text-[#0E1E37]">Time Management</li>
              <li className="text-[12px] text-[#0E1E37]">Fast Learner</li>
              <li className="text-[12px] text-[#0E1E37]">Motivated</li>
            </ul>
          </div>
        </div>
        <div className="w-[40%]">
          <div className="profile-pic mb-6">
            {/* <img src={profilePic} className="ml-auto w-full max-w-[228px] h-[239px] object-cover rounded-l-[60px] rounded-t-[0px]" /> */}
            <Picture className="ml-auto w-full max-w-[228px] h-[239px] object-cover rounded-l-[60px] rounded-t-[0px]" />
          </div>
         {isFirstPage && <Summary />}
         {<Skills />}
          {/* <div className="about-container pr-4 mb-5">
            <h3 className="text-[#0E1E37] tracking-[4px] mb-4 uppercase text-[18px] font-extrabold">Basic Knowledge</h3>
            <p className="text-[12px] text-black font-semibold">Blender | Canva | Shopify</p>
          </div> */}
          {<Languages />}
         

          <div className="about-container pr-4 mb-5">
            <h3 className="text-[#0E1E37] tracking-[4px] mb-4 uppercase text-[18px] font-extrabold">Interests</h3>
            <div className="flex flex-wrap gap-5">
              <div className="w-[70px] h-[70px] rounded-full border-[4px] flex justify-center items-center flex-col border-[#CFD823] bg-[#0E1E37]">
                  <p className="text-center text-white text-[10px] font-bold">Cricket</p>
              </div>
              <div className="w-[70px] h-[70px] rounded-full border-[4px] flex justify-center items-center flex-col border-[#CFD823] bg-[#0E1E37]">
                  <p className="text-center text-white text-[10px] font-bold">Video games</p>
              </div>
              <div className="w-[70px] h-[70px] rounded-full border-[4px] flex justify-center items-center flex-col border-[#CFD823] bg-[#0E1E37]">
                  <p className="text-center text-white text-[10px] font-bold">Music</p>
              </div>
              <div className="w-[70px] h-[70px] rounded-full border-[4px] flex justify-center items-center flex-col border-[#CFD823] bg-[#0E1E37]">
                  <p className="text-center text-white text-[10px] font-bold">Travelling</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  