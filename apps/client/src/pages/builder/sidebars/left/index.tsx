import { t } from "@lingui/macro";
import { Plus, PlusCircle } from "@phosphor-icons/react";
import type {
  Award,
  Certification,
  CustomSection,
  Education,
  Experience,
  Interest,
  Language,
  Profile,
  Project,
  Publication,
  Reference,
  Skill,
  Volunteer,
} from "@reactive-resume/schema";
import { Button, ScrollArea, Separator } from "@reactive-resume/ui";
import { Fragment, useRef } from "react";
import { Link } from "react-router";

import { Icon } from "@/client/components/icon";
import { UserAvatar } from "@/client/components/user-avatar";
import { UserOptions } from "@/client/components/user-options";
import { useResumeStore } from "@/client/stores/resume";

import { BasicsSection } from "./sections/basics";
import { SectionBase } from "./sections/shared/section-base";
import { SectionIcon } from "./sections/shared/section-icon";
import { SummarySection } from "./sections/summary";
import { cn } from "@reactive-resume/utils";

export const  LeftSidebar = ({ showLeftSidebar, setShowLeftSidebar, setShowRightSidebar, showRightSidebar }: { showLeftSidebar: boolean, setShowLeftSidebar: (show: boolean) => void, setShowRightSidebar: (show: boolean) => void, showRightSidebar: boolean }) => {
  const containterRef = useRef<HTMLDivElement | null>(null);

  const addSection = useResumeStore((state) => state.addSection);
  const customSections = useResumeStore((state) => state.resume.data.sections.custom);

  const scrollIntoView = (selector: string) => {
    const section = containterRef.current?.querySelector(selector);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex bg-secondary-accent/30  mt-5">
    {!showLeftSidebar &&  <div className="hidden basis-12 flex-col items-center justify-between bg-blue-500 py-4 sm:flex">
        <Button asChild size="icon" variant="ghost" className="size-8 rounded-full">
          <Link to="/dashboard">
            {/* <Icon size={14} /> */}
          </Link>
        </Button>
        <SectionIcon
            id="collapse"
            name={t`Collapse`}
            className="cursor-pointer"
            onClick={() => {
              setShowLeftSidebar(!showLeftSidebar);
              setShowRightSidebar(false);
            }}
          />

        <div className="flex flex-col items-center justify-center gap-y-2">
          <SectionIcon
            id="basics"
            name={t({
              message: "Basics",
              context:
                "The basics section of a resume consists of User's Picture, Full Name, Location etc.",
            })}
            onClick={() => {
              scrollIntoView("#basics");
              setShowLeftSidebar(true); 
              setShowRightSidebar(false);
            }}
          />
          <SectionIcon
            id="summary"
            onClick={() => {
              scrollIntoView("#summary");
              setShowLeftSidebar(true);
              setShowRightSidebar(false);
            }}
          />
          <SectionIcon
            id="profiles"
            onClick={() => {
              scrollIntoView("#profiles");
              setShowLeftSidebar(true);
              setShowRightSidebar(false);
            }}
          />
          <SectionIcon
            id="experience"
            onClick={() => {
              scrollIntoView("#experience");
              setShowLeftSidebar(true);
              setShowRightSidebar(false);
            }}
          />
          <SectionIcon
            id="education"
            onClick={() => {
              scrollIntoView("#education");
              setShowLeftSidebar(true);
              setShowRightSidebar(false);
            }}
          />
          <SectionIcon
            id="skills"
            onClick={() => {
              scrollIntoView("#skills");
              setShowLeftSidebar(true);
              setShowRightSidebar(false);
            }}
          />
          <SectionIcon
            id="languages"
            onClick={() => {
              scrollIntoView("#languages");
              setShowLeftSidebar(true);
              setShowRightSidebar(false);
            }}
          />
          <SectionIcon
            id="awards"
            onClick={() => {
              scrollIntoView("#awards");
              setShowLeftSidebar(true);
              setShowRightSidebar(false);
            }}
          />
          <SectionIcon
            id="certifications"
            onClick={() => {
              scrollIntoView("#certifications");
              setShowLeftSidebar(true);
              setShowRightSidebar(false);
            }}
          />
          <SectionIcon
            id="interests"
            onClick={() => {
              scrollIntoView("#interests");
              setShowLeftSidebar(true);
              setShowRightSidebar(false);
            }}
          />
          <SectionIcon
            id="projects"
            onClick={() => {
              scrollIntoView("#projects");
              setShowLeftSidebar(true);
              setShowRightSidebar(false);
            }}
          />
          <SectionIcon
            id="publications"
            onClick={() => {
              scrollIntoView("#publications");
              setShowLeftSidebar(true);
              setShowRightSidebar(false);
            }}
          />
          <SectionIcon
            id="volunteer"
            onClick={() => {
              scrollIntoView("#volunteer");
              setShowLeftSidebar(true);
              setShowRightSidebar(false);
            }}
          />
          <SectionIcon
            id="references"
            onClick={() => {
                scrollIntoView("#references");
              setShowLeftSidebar(true);
              setShowRightSidebar(false);
            }}
          />

          <SectionIcon
            id="custom"
            variant="outline"
            name={t`Add a new section`}
            icon={<Plus size={14} />}
            onClick={() => {
                addSection();
              // eslint-disable-next-line lingui/no-unlocalized-strings
              scrollIntoView("& > section:last-of-type");
              setShowLeftSidebar(true);
              setShowRightSidebar(false);
            }}
          />
        </div>

        <UserOptions>
          <Button size="icon" variant="ghost" className="rounded-full">
            <UserAvatar size={28} />
          </Button>
        </UserOptions>
      </div>}

      <ScrollArea orientation="vertical" className="h-screen flex-1 pb-16 lg:pb-0">
        <div ref={containterRef} className={` grid gap-y-10 @container/left bg-[#ffffff] mt-[64px] border border-gray-200 ${showLeftSidebar ? 'p-6 mx-[70px]' : ''}`}>
          <BasicsSection />
          <Separator />
        
            <SummarySection />
          
          
          <Separator />
          <SectionBase<Profile>
            id="profiles"
            title={(item) => item.network}
            description={(item) => item.username}
            extraDescription="Add your professional social media profiles like LinkedIn, GitHub, or portfolio website. Make sure these are up-to-date and reflect your professional image."
          />
          <Separator />
          <SectionBase<Experience>
            id="experience"
            title={(item) => item.company}
            description={(item) => item.position}
            extraDescription="Add your professional experience, including your job title, company name, and the dates of your employment. Use bullet points to note your achievements, if possible - use numbers/facts (Achieved X, measured by Y, by doing Z)."
          />
          <Separator />
          <SectionBase<Education>
            id="education"
            title={(item) => item.institution}
            description={(item) => item.area}
            extraDescription="Add your professional education, including your degree, school name, and the dates of your enrollment. Use bullet points to note your achievements, if possible - use numbers/facts (Achieved X, measured by Y, by doing Z)."
          />
          <Separator />
          <SectionBase<Skill>
            id="skills"
            title={(item) => item.name}
            description={(item) => {
              if (item.description) return item.description;
              if (item.keywords.length > 0) return `${item.keywords.length} keywords`;
            }}
            extraDescription="Choose 5 important skills that show you fit the position. Make sure they match the key skills mentioned in the job listing (especially when applying via an online system)."
            />
          <Separator />
          <SectionBase<Language>
            id="languages"
            title={(item) => item.name}
            description={(item) => item.description}
            extraDescription="Choose 3 languages you are proficient in. Make sure they match the key languages mentioned in the job listing (especially when applying via an online system)."
          />
          {/* <Separator />
          <SectionBase<Award>
            id="awards"
            title={(item) => item.title}
            description={(item) => item.awarder}
          /> */}
          <Separator />
          <SectionBase<Certification>
            id="certifications"
            title={(item) => item.name}
            description={(item) => item.issuer}
            extraDescription="Add your certifications, including your certification name, and the dates of your employment. Use bullet points to note your achievements."
          />
          {/* <Separator />
          <SectionBase<Interest>
            id="interests"
            title={(item) => item.name}
            description={(item) => {
              if (item.keywords.length > 0) return `${item.keywords.length} keywords`;
            }}
          /> */}
          <Separator />
          <SectionBase<Project>
            id="projects"
            title={(item) => item.name}
            description={(item) => item.description}
            extraDescription="Add your projects, including your project name, and the dates of your project. Use bullet points to note your achievements"
          />
          {/* <Separator />
          <SectionBase<Publication>
            id="publications"
            title={(item) => item.name}
            description={(item) => item.publisher}
          /> */}
          {/* <Separator />
          <SectionBase<Volunteer>
            id="volunteer"
            title={(item) => item.organization}
            description={(item) => item.position}
          /> */}
          <Separator />
          <SectionBase<Reference>
            id="references"
            title={(item) => item.name}
            description={(item) => item.description}
            extraDescription="Add your references, including your reference name, and the dates of your employment. Use bullet points to note your achievements, if possible"

          />

          {/* Custom Sections */}
          {Object.values(customSections).map((section) => (
            <Fragment key={section.id}>
              <Separator />

              <SectionBase<CustomSection>
                id={`custom.${section.id}`}
                title={(item) => item.name}
                description={(item) => item.description}
                extraDescription="Add your custom section, including your custom section name, and the dates of your employment. Use bullet points to note your achievements, if possible"
              />
            </Fragment>
          ))}

          <Separator />

          <Button size="lg" variant="outline" onClick={addSection}>
            <PlusCircle />
            <span className="ml-2">{t`Add a new section`}</span>
          </Button>
        </div>
      </ScrollArea>
    </div>
  );
};
