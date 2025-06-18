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



export const cv_template_16 = ({ columns, isFirstPage = false }: TemplateProps) => {
  const [main, sidebar] = columns;

  const primaryColor = useArtboardStore((state) => state.resume.metadata.theme.primary);

  return (
    <div className="flex gap-5 min-h-[100vh]">
      <div className="w-[40%] flex flex-col min-h-full">
        <div className="profile-pic mb-2">
          <img src={profilePic} className="mr-auto w-full h-[339px] object-cover rounded-b-[60px] rounded-l-[0px]" />
        </div>
        <div className="py-9 px-5 bg-[#101010] rounded-r-[60px]">
          <div className="inline-block tracking-[3px] text-black font-medium text-[12px] bg-[#FECB00] rounded-full px-4 px-1 mb-4 uppercase">
            Education
          </div>
          <div className="mb-7">
            <ul>
              <li className="mb-4">
                <p className="text-white text-[12px] font-medium mb-1">Web Designing Course</p>
                <p className="text-[#B8B8B8] text-[12px] font-medium mb-1">Techavera Solutions Pvt Ltd</p>
                <p className="text-[#B8B8B8] text-[12px] font-medium mb-0">May 2018 - July 2018</p>
              </li>
              <li className="mb-4">
                <p className="text-white text-[12px] font-medium mb-1">B.Tech (Computer Science)</p>
                <p className="text-[#B8B8B8] text-[12px] font-medium mb-1">ACET College, Amritsar</p>
                <p className="text-[#B8B8B8] text-[12px] font-medium mb-0">July 2016 - July 2020</p>
              </li>
              <li className="mb-4">
                <p className="text-white text-[12px] font-medium mb-1">Senior Secondary (Non-Medical)</p>
                <p className="text-[#B8B8B8] text-[12px] font-medium mb-1">DAV Sen. Sec. School, Amritsar</p>
                <p className="text-[#B8B8B8] text-[12px] font-medium mb-0">April 2014 - March 2016</p>
              </li>
              <li>
                <p className="text-white text-[12px] font-medium mb-1">Matriculation</p>
                <p className="text-[#B8B8B8] text-[12px] font-medium mb-1">Modern Jagat Jyoti Sen. Sec. School, Amritsar</p>
                <p className="text-[#B8B8B8] text-[12px] font-medium mb-0">March 2014</p>
              </li>
            </ul>
          </div>
          <div className="inline-block tracking-[3px] text-black font-medium text-[12px] bg-[#FECB00] rounded-full px-4 px-1 mb-4 uppercase">
            Contact Details
          </div>
          <div className="mb-7">
            <p className="text-white text-[12px] font-medium mb-3">robingautam279@gmail.com</p>
            <p className="text-white text-[12px] font-medium mb-3">7973380029</p>
            <p className="text-white text-[12px] font-medium">Mohali, Punjab</p>
          </div>
          <div className="inline-block tracking-[3px] text-black font-medium text-[12px] bg-[#FECB00] rounded-full px-4 px-1 mb-4 uppercase">
            Language
          </div>
          <div className="mb-7">
            <div className="flex gap-7 mb-4">
              <p className="text-white text-[12px] font-semibold mb-0">Punjabi</p>
              <p className="text-[#B8B8B8] text-[12px] font-normal mb-0">Native</p>
            </div>
            <div className="flex gap-7 mb-4">
              <p className="text-white text-[12px] font-semibold mb-0">Hindi</p>
              <p className="text-[#B8B8B8] text-[12px] font-normal mb-0">Fluent</p>
            </div>
            <div className="flex gap-7 mb-4">
              <p className="text-white text-[12px] font-semibold mb-0">English</p>
              <p className="text-[#B8B8B8] text-[12px] font-normal mb-0">Moderate</p>
            </div>
          </div>
          <div className="inline-block tracking-[3px] text-black font-medium text-[12px] bg-[#FECB00] rounded-full px-4 px-1 mb-4 uppercase">
            Personal Skills
          </div>
          <ul className="flex flex-col gap-1.5 mb-7">
            <li className="text-[12px] text-white">Creative Spirit</li>
            <li className="text-[12px] text-white">Reliable and Professional</li>
            <li className="text-[12px] text-white">Organized</li>
            <li className="text-[12px] text-white">Time Management</li>
            <li className="text-[12px] text-white">Fast Learner</li>
            <li className="text-[12px] text-white">Motivated</li>
          </ul>
          <div className="inline-block tracking-[3px] text-black font-medium text-[12px] bg-[#FECB00] rounded-full px-4 px-1 mb-4 uppercase">
            Interests
          </div>
          <ul className="flex flex-col gap-1.5">
            <li className="text-[12px] text-white">Cricket</li>
            <li className="text-[12px] text-white">Video Games</li>
            <li className="text-[12px] text-white">Music</li>
            <li className="text-[12px] text-white">Travelling</li>
          </ul>
        </div>
      </div>
      <div className="w-[60%]">
        <div className="about-user pt-[60px] relative before:content-[''] before:absolute before:top-0 before:left-[-13px] before:w-[78px] before:h-[106px] before:rounded-b-[90px] before:bg-[#FECB00] before:z-[-1] z-[1] mb-10">
          <h2 className="text-[52px] text-black text-normal mb-1 uppercase leading-normal"><strong>Robin</strong> <br /> Gautam</h2>
          <p className="text-black text-base tracking-[4px] uppercase">UI/UX Designer</p>
        </div>
        <div className="about-container pr-4 mb-5">
          <div className="inline-block tracking-[3px] text-black font-medium text-[12px] bg-[#FECB00] rounded-full px-4 px-1 mb-4 uppercase">
            About Me
          </div>
          <p className="text-[12px] text-black">A skilled UI/UX Designer with expertise in prototyping, wireframing, and solving user problems to create intuitive designs. Proficient in HTML, CSS, JavaScript, and WordPress for seamless front- end development, Combines creativity and technical expertise to deliver visually appealing and functional digital solutions,</p>
        </div>
        <div className="skill-container pr-4 mb-5">
          <div className="inline-block tracking-[3px] text-black font-medium text-[12px] bg-[#FECB00] rounded-full px-4 px-1 mb-4 uppercase">
            Skills
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <h4 className="text-[12px] font-medium text-black mb-1">HTML</h4>
              <div className="relative h-[2px] bg-[#D9D9D9] rounded-[6px] w-full">
                <div className="absolute inset-0 w-full h-[2px] bg-[#FECB00] rounded-[6px]"></div>
              </div>
            </div>
            <div>
              <h4 className="text-[12px] font-medium text-black mb-1">CSS</h4>
              <div className="relative h-[2px] bg-[#D9D9D9] rounded-[6px] w-full">
                <div className="absolute inset-0 w-full h-[2px] bg-[#FECB00] rounded-[6px]"></div>
              </div>
            </div>
            <div>
              <h4 className="text-[12px] font-medium text-black mb-1">JavaScript</h4>
              <div className="relative h-[2px] bg-[#D9D9D9] rounded-[6px] w-full">
                <div className="absolute inset-0 w-[80%] h-[2px] bg-[#FECB00] rounded-[6px]"></div>
              </div>
            </div>
            <div>
              <h4 className="text-[12px] font-medium text-black mb-1">Bootstrap</h4>
              <div className="relative h-[2px] bg-[#D9D9D9] rounded-[6px] w-full">
                <div className="absolute inset-0 w-full h-[2px] bg-[#FECB00] rounded-[6px]"></div>
              </div>
            </div>
            <div>
              <h4 className="text-[12px] font-medium text-black mb-1">jQuery</h4>
              <div className="relative h-[2px] bg-[#D9D9D9] rounded-[6px] w-full">
                <div className="absolute inset-0 w-[85%] h-[2px] bg-[#FECB00] rounded-[6px]"></div>
              </div>
            </div>
            <div>
              <h4 className="text-[12px] font-medium text-black mb-1">Tailwind CSS</h4>
              <div className="relative h-[2px] bg-[#D9D9D9] rounded-[6px] w-full">
                <div className="absolute inset-0 w-full h-[2px] bg-[#FECB00] rounded-[6px]"></div>
              </div>
            </div>
            <div>
              <h4 className="text-[12px] font-medium text-black mb-1">Wordpress</h4>
              <div className="relative h-[2px] bg-[#D9D9D9] rounded-[6px] w-full">
                <div className="absolute inset-0 w-[75%] h-[2px] bg-[#FECB00] rounded-[6px]"></div>
              </div>
            </div>
            <div>
              <h4 className="text-[12px] font-medium text-black mb-1">Webflow</h4>
              <div className="relative h-[2px] bg-[#D9D9D9] rounded-[6px] w-full">
                <div className="absolute inset-0 w-[65%] h-[2px] bg-[#FECB00] rounded-[6px]"></div>
              </div>
            </div>
            <div>
              <h4 className="text-[12px] font-medium text-black mb-1">Adobe Photoshop</h4>
              <div className="relative h-[2px] bg-[#D9D9D9] rounded-[6px] w-full">
                <div className="absolute inset-0 w-[80%] h-[2px] bg-[#FECB00] rounded-[6px]"></div>
              </div>
            </div>
            <div>
              <h4 className="text-[12px] font-medium text-black mb-1">Adobe Illustrator</h4>
              <div className="relative h-[2px] bg-[#D9D9D9] rounded-[6px] w-full">
                <div className="absolute inset-0 w-[85%] h-[2px] bg-[#FECB00] rounded-[6px]"></div>
              </div>
            </div>
            <div>
              <h4 className="text-[12px] font-medium text-black mb-1">Adobe After Effects</h4>
              <div className="relative h-[2px] bg-[#D9D9D9] rounded-[6px] w-full">
                <div className="absolute inset-0 w-[75%] h-[2px] bg-[#FECB00] rounded-[6px]"></div>
              </div>
            </div>
            <div>
              <h4 className="text-[12px] font-medium text-black mb-1">Figma</h4>
              <div className="relative h-[2px] bg-[#D9D9D9] rounded-[6px] w-full">
                <div className="absolute inset-0 w-[90%] h-[2px] bg-[#FECB00] rounded-[6px]"></div>
              </div>
            </div>
            <div>
              <h4 className="text-[12px] font-medium text-black mb-1">Adobe XD</h4>
              <div className="relative h-[2px] bg-[#D9D9D9] rounded-[6px] w-full">
                <div className="absolute inset-0 w-[80%] h-[2px] bg-[#FECB00] rounded-[6px]"></div>
              </div>
            </div>
            <div>
              <h4 className="text-[12px] font-medium text-black mb-1">Unbounce</h4>
              <div className="relative h-[2px] bg-[#D9D9D9] rounded-[6px] w-full">
                <div className="absolute inset-0 w-[70%] h-[2px] bg-[#FECB00] rounded-[6px]"></div>
              </div>
            </div>
            <div>
              <h4 className="text-[12px] font-medium text-black mb-1">SASS</h4>
              <div className="relative h-[2px] bg-[#D9D9D9] rounded-[6px] w-full">
                <div className="absolute inset-0 w-[90%] h-[2px] bg-[#FECB00] rounded-[6px]"></div>
              </div>
            </div>
            <div>
              <h4 className="text-[12px] font-medium text-black mb-1">LESS</h4>
              <div className="relative h-[2px] bg-[#D9D9D9] rounded-[6px] w-full">
                <div className="absolute inset-0 w-[75%] h-[2px] bg-[#FECB00] rounded-[6px]"></div>
              </div>
            </div>
            <div>
              <h4 className="text-[12px] font-medium text-black mb-1">React JS</h4>
              <div className="relative h-[2px] bg-[#D9D9D9] rounded-[6px] w-full">
                <div className="absolute inset-0 w-[80%] h-[2px] bg-[#FECB00] rounded-[6px]"></div>
              </div>
            </div>
            <div>
              <h4 className="text-[12px] font-medium text-black mb-1">Website Builders</h4>
              <div className="relative h-[2px] bg-[#D9D9D9] rounded-[6px] w-full">
                <div className="absolute inset-0 w-[85%] h-[2px] bg-[#FECB00] rounded-[6px]"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="about-container pr-4 mb-5">
          <div className="inline-block tracking-[3px] text-black font-medium text-[12px] bg-[#FECB00] rounded-full px-4 px-1 mb-4 uppercase">
            Basic Knowledge
          </div>
          <p className="text-[12px] text-black font-semibold">Blender | Canva | Shopify</p>
        </div>
        <div className="about-container pr-4 mb-5">
          <div className="inline-block tracking-[3px] text-black font-medium text-[12px] bg-[#FECB00] rounded-full px-4 px-1 mb-4 uppercase">
            Design Work
          </div>
          <div className="mb-4">
            <div className="mb-2.5">
              <a href="#" className="text-[10px] text-black">https://www.figma.com/design/JvkLhLziuyr0oYwpIimooI/Zety-Resume-Builder?node-id=2007-250&t=kJFKyrWdzFth1Pnh-0</a>
            </div>
            <div className="mb-2.5">
              <a href="#" className="text-[10px] text-black">https://www.figma.com/design/JvkLhLziuyr0oYwpIimooI/Zety-Resume-Builder?node-id=2007-250&t=kJFKyrWdzFth1Pnh-0</a>
            </div>
            <div className="mb-2.5">
              <a href="#" className="text-[10px] text-black">https://www.figma.com/design/JvkLhLziuyr0oYwpIimooI/Zety-Resume-Builder?node-id=2007-250&t=kJFKyrWdzFth1Pnh-0</a>
            </div>
            <div className="mb-2.5">
              <a href="#" className="text-[10px] text-black">https://www.figma.com/design/JvkLhLziuyr0oYwpIimooI/Zety-Resume-Builder?node-id=2007-250&t=kJFKyrWdzFth1Pnh-0</a>
            </div>
            <div className="mb-2.5">
              <a href="#" className="text-[10px] text-black">https://www.figma.com/design/JvkLhLziuyr0oYwpIimooI/Zety-Resume-Builder?node-id=2007-250&t=kJFKyrWdzFth1Pnh-0</a>
            </div>
            <div className="mb-2.5">
              <a href="#" className="text-[10px] text-black">https://www.figma.com/design/JvkLhLziuyr0oYwpIimooI/Zety-Resume-Builder?node-id=2007-250&t=kJFKyrWdzFth1Pnh-0</a>
            </div>
            <div className="mb-2.5">
              <a href="#" className="text-[10px] text-black">https://www.figma.com/design/JvkLhLziuyr0oYwpIimooI/Zety-Resume-Builder?node-id=2007-250&t=kJFKyrWdzFth1Pnh-0</a>
            </div>
          </div>
        </div>
        <div className="about-container pr-4 mb-5">
          <div className="inline-block tracking-[3px] text-black font-medium text-[12px] bg-[#FECB00] rounded-full px-4 px-1 mb-4 uppercase">
            Portfolio
          </div>
          <div className="mb-4">
            <div className="mb-2.5">
              <a href="#" className="text-[10px] text-black">https://www.figma.com/design/JvkLhLziuyr0oYwpIimooI/Zety-Resume-Builder?node-id=2007-250&t=kJFKyrWdzFth1Pnh-0</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
