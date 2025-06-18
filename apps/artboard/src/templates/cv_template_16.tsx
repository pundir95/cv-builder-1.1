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
        <div className="w-[60%] flex flex-col min-h-full">
          <div className="py-8 px-9">
            <h2 className="uppercase text-[48px] font-[700] mb-5 text-[#0E1E37]">Robin <span className="text-[#CFD823]">Gautam</span></h2>
            <p className="tracking-[4px] mb-6 font-semibold uppercase text-[#0E1E37]">UI/UX Designer</p>
            <div className="contact-info bg-[#CFD823] rounded-[20px] p-4 flex flex-col gap-2.5">
              <div className="flex gap-3">
                <span></span>
                <span className="text-[12px] font-semibold text-[#0E1E37]">robingautam279@gmail.com</span>
              </div>
              <div className="flex gap-3">
                <span></span>
                <span className="text-[12px] font-semibold text-[#0E1E37]">7973380029</span>
              </div>
              <div className="flex gap-3">
                <span></span>
                <span className="text-[12px] font-semibold text-[#0E1E37]">Mohali, Punjab</span>
              </div>
            </div>
          </div>
          <div className="journey-wrapper flex-1 rounded p-8 bg-[#0E1E37] rounded-r-[60px] rounded-b-[60px] rounded-l-[0px]">
            <h3 className="text-white tracking-[4px] mb-2.5 uppercase text-[18px] font-extrabold">Work Experience</h3>
            <div className="flex gap-5 flex-col mb-4">
              <div className="inner-part">
                <div className="flex gap-4 items-start mb-3">
                  <div className="py-[3px] px-2 bg-[#CFD823] rounded-[30px] flex-none uppercase text-[12px] text-[#0E1E37] font-semibold">
                    jul 2020 - till
                  </div>
                  <div>
                    <h4 className="text-white text-[12px] font-semibold mb-1">UI/UX Designer & Web Designer</h4>
                    <p className="text-[#B5B3B3] text-[12px] mb-0">Aviox Technologies Pvt Ltd</p>
                  </div>
                </div>
                <div>
                  <ul className="mb-0">
                    <li className="text-white text-[10px]">Crafted and optimized user experiences for web and mobile platforms, focusing on accessibility, responsiveness, and user satisfaction</li>
                    <li className="text-white text-[10px]">Crafted and optimized user experiences for web and mobile platforms, focusing on accessibility, responsiveness, and user satisfaction</li>
                    <li className="text-white text-[10px]">Crafted and optimized user experiences for web and mobile platforms, focusing on accessibility, responsiveness, and user satisfaction</li>
                  </ul>
                </div>
              </div>
              <div className="inner-part">
                <div className="flex gap-4 items-start mb-3">
                  <div className="inline-block py-[3px] px-2 bg-[#CFD823] rounded-[30px]">
                    <span className="uppercase text-[12px] text-[#0E1E37] font-semibold">jan 2020</span>
                    <span className="uppercase text-[12px] text-[#0E1E37] font-semibold">-</span>
                    <span className="uppercase text-[12px] text-[#0E1E37] font-semibold">jul 2020</span>
                  </div>
                  <div>
                    <h4 className="text-white text-[12px] font-semibold mb-1">Web Designer (Intern)</h4>
                    <p className="text-[#B5B3B3] text-[12px] mb-0">Omninos Solutions</p>
                  </div>
                </div>
              </div>
            </div>
            <h3 className="text-white tracking-[4px] mb-2.5 uppercase text-[18px] font-extrabold">Education</h3>
            <div className="mb-4">
  
              <div className="inner-part">
                <div className="flex flex-col gap-2 items-start mb-3">
                  <div className="inline-block py-[3px] px-2 bg-[#CFD823] rounded-[30px]">
                    <span className="uppercase text-[12px] text-[#0E1E37] font-semibold">may 2018</span>
                    <span className="uppercase text-[12px] text-[#0E1E37] font-semibold">-</span>
                    <span className="uppercase text-[12px] text-[#0E1E37] font-semibold">jul 2018</span>
                  </div>
                  <div>
                    <h4 className="text-white text-[12px] font-semibold mb-1">Web Designing Course</h4>
                    <p className="text-[#B5B3B3] text-[12px] mb-0">Techavera Solutions Pvt Ltd</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-start mb-3">
                  <div className="inline-block py-[3px] px-2 bg-[#CFD823] rounded-[30px]">
                    <span className="uppercase text-[12px] text-[#0E1E37] font-semibold">jul 2016</span>
                    <span className="uppercase text-[12px] text-[#0E1E37] font-semibold">-</span>
                    <span className="uppercase text-[12px] text-[#0E1E37] font-semibold">jul 2020</span>
                  </div>
                  <div>
                    <h4 className="text-white text-[12px] font-semibold mb-1">B.Tech (Computer Science)</h4>
                    <p className="text-[#B5B3B3] text-[12px] mb-0">ACET College , Amritsar</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-start mb-3">
                  <div className="inline-block py-[3px] px-2 bg-[#CFD823] rounded-[30px]">
                    <span className="uppercase text-[12px] text-[#0E1E37] font-semibold">apr 2014</span>
                    <span className="uppercase text-[12px] text-[#0E1E37] font-semibold">-</span>
                    <span className="uppercase text-[12px] text-[#0E1E37] font-semibold">mar 2016</span>
                  </div>
                  <div>
                    <h4 className="text-white text-[12px] font-semibold mb-1">Senior Secondary (Non-Medical)</h4>
                    <p className="text-[#B5B3B3] text-[12px] mb-0">DAV Sen. Sec. School , Amritsar</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-start mb-3">
                  <div className="inline-block py-[3px] px-2 bg-[#CFD823] rounded-[30px]">
                    <span className="uppercase text-[12px] text-[#0E1E37] font-semibold">mar 2014</span>
                  </div>
                  <div>
                    <h4 className="text-white text-[12px] font-semibold mb-1">Matriculation</h4>
                    <p className="text-[#B5B3B3] text-[12px] mb-0">Modern Jagat Jyoti Sen. Sec. School , Amritsar</p>
                  </div>
                </div>
              </div>
            </div>
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
            <img src={profilePic} className="ml-auto w-full max-w-[228px] h-[239px] object-cover rounded-l-[60px] rounded-t-[0px]" />
          </div>
          <div className="about-container pr-4 mb-5">
            <h3 className="text-[#0E1E37] tracking-[4px] mb-4 uppercase text-[18px] font-extrabold">About</h3>
            <p className="text-[12px] text-black">A skilled UI/UX Designer with expertise in prototyping, wireframing, and solving user problems to create intuitive designs. Proficient in HTML, CSS, JavaScript, and WordPress for seamless front- end development, Combines creativity and technical expertise to deliver visually appealing and functional digital solutions,</p>
          </div>
          <div className="skill-container pr-4 mb-5">
            <h3 className="text-[#0E1E37] tracking-[4px] mb-4 uppercase text-[18px] font-extrabold">Skills</h3>
            <div className="flex flex-col gap-2">
              <div>
                <h4 className="text-[12px] font-medium text-black">HTML</h4>
                <div className="relative h-[5px] bg-[#CFD823] w-full">
                  <div className="absolute inset-0 w-full h-[5px] bg-[#0E1E37]"></div>
                </div>
              </div>
              <div>
                <h4 className="text-[12px] font-medium text-black">CSS</h4>
                <div className="relative h-[5px] bg-[#CFD823] w-full">
                  <div className="absolute inset-0 w-full h-[5px] bg-[#0E1E37]"></div>
                </div>
              </div>
              <div>
                <h4 className="text-[12px] font-medium text-black">JavaScript</h4>
                <div className="relative h-[5px] bg-[#CFD823] w-full">
                  <div className="absolute inset-0 w-[80%] h-[5px] bg-[#0E1E37]"></div>
                </div>
              </div>
              <div>
                <h4 className="text-[12px] font-medium text-black">Bootstrap</h4>
                <div className="relative h-[5px] bg-[#CFD823] w-full">
                  <div className="absolute inset-0 w-full h-[5px] bg-[#0E1E37]"></div>
                </div>
              </div>
              <div>
                <h4 className="text-[12px] font-medium text-black">jQuery</h4>
                <div className="relative h-[5px] bg-[#CFD823] w-full">
                  <div className="absolute inset-0 w-[85%] h-[5px] bg-[#0E1E37]"></div>
                </div>
              </div>
              <div>
                <h4 className="text-[12px] font-medium text-black">Tailwind CSS</h4>
                <div className="relative h-[5px] bg-[#CFD823] w-full">
                  <div className="absolute inset-0 w-full h-[5px] bg-[#0E1E37]"></div>
                </div>
              </div>
              <div>
                <h4 className="text-[12px] font-medium text-black">Wordpress</h4>
                <div className="relative h-[5px] bg-[#CFD823] w-full">
                  <div className="absolute inset-0 w-[75%] h-[5px] bg-[#0E1E37]"></div>
                </div>
              </div>
              <div>
                <h4 className="text-[12px] font-medium text-black">Webflow</h4>
                <div className="relative h-[5px] bg-[#CFD823] w-full">
                  <div className="absolute inset-0 w-[65%] h-[5px] bg-[#0E1E37]"></div>
                </div>
              </div>
              <div>
                <h4 className="text-[12px] font-medium text-black">Adobe Photoshop</h4>
                <div className="relative h-[5px] bg-[#CFD823] w-full">
                  <div className="absolute inset-0 w-[80%] h-[5px] bg-[#0E1E37]"></div>
                </div>
              </div>
              <div>
                <h4 className="text-[12px] font-medium text-black">Adobe Illustrator</h4>
                <div className="relative h-[5px] bg-[#CFD823] w-full">
                  <div className="absolute inset-0 w-[85%] h-[5px] bg-[#0E1E37]"></div>
                </div>
              </div>
              <div>
                <h4 className="text-[12px] font-medium text-black">Adobe After Effects</h4>
                <div className="relative h-[5px] bg-[#CFD823] w-full">
                  <div className="absolute inset-0 w-[75%] h-[5px] bg-[#0E1E37]"></div>
                </div>
              </div>
              <div>
                <h4 className="text-[12px] font-medium text-black">Figma</h4>
                <div className="relative h-[5px] bg-[#CFD823] w-full">
                  <div className="absolute inset-0 w-[90%] h-[5px] bg-[#0E1E37]"></div>
                </div>
              </div>
              <div>
                <h4 className="text-[12px] font-medium text-black">Adobe XD</h4>
                <div className="relative h-[5px] bg-[#CFD823] w-full">
                  <div className="absolute inset-0 w-[80%] h-[5px] bg-[#0E1E37]"></div>
                </div>
              </div>
              <div>
                <h4 className="text-[12px] font-medium text-black">Unbounce</h4>
                <div className="relative h-[5px] bg-[#CFD823] w-full">
                  <div className="absolute inset-0 w-[70%] h-[5px] bg-[#0E1E37]"></div>
                </div>
              </div>
              <div>
                <h4 className="text-[12px] font-medium text-black">SASS</h4>
                <div className="relative h-[5px] bg-[#CFD823] w-full">
                  <div className="absolute inset-0 w-[90%] h-[5px] bg-[#0E1E37]"></div>
                </div>
              </div>
              <div>
                <h4 className="text-[12px] font-medium text-black">LESS</h4>
                <div className="relative h-[5px] bg-[#CFD823] w-full">
                  <div className="absolute inset-0 w-[75%] h-[5px] bg-[#0E1E37]"></div>
                </div>
              </div>
              <div>
                <h4 className="text-[12px] font-medium text-black">React JS</h4>
                <div className="relative h-[5px] bg-[#CFD823] w-full">
                  <div className="absolute inset-0 w-[80%] h-[5px] bg-[#0E1E37]"></div>
                </div>
              </div>
              <div>
                <h4 className="text-[12px] font-medium text-black">Website Builders</h4>
                <div className="relative h-[5px] bg-[#CFD823] w-full">
                  <div className="absolute inset-0 w-[85%] h-[5px] bg-[#0E1E37]"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="about-container pr-4 mb-5">
            <h3 className="text-[#0E1E37] tracking-[4px] mb-4 uppercase text-[18px] font-extrabold">Basic Knowledge</h3>
            <p className="text-[12px] text-black font-semibold">Blender | Canva | Shopify</p>
          </div>
          <div className="about-container pr-4 mb-5">
            <h3 className="text-[#0E1E37] tracking-[4px] mb-4 uppercase text-[18px] font-extrabold">Languages</h3>
            <div className="flex flex-wrap gap-5">
              <div className="w-[90px] h-[90px] rounded-full border-[8px] flex justify-center items-center flex-col border-[#CFD823] bg-[#0E1E37]">
                  <p className="text-center text-white text-[10px] mb-1.5 font-bold">Punjabi</p>
                  <p className="text-center text-[#E8E8E8] text-[10px] mb-0">Native</p>
              </div>
              <div className="w-[90px] h-[90px] rounded-full border-[8px] flex justify-center items-center flex-col border-[#CFD823] bg-[#0E1E37]">
                  <p className="text-center text-white text-[10px] mb-1.5 font-bold">Hindi</p>
                  <p className="text-center text-[#E8E8E8] text-[10px] mb-0">Fluent</p>
              </div>
              <div className="w-[90px] h-[90px] rounded-full border-[8px] flex justify-center items-center flex-col border-[#CFD823] bg-[#0E1E37]">
                  <p className="text-center text-white text-[10px] mb-1.5 font-bold">English</p>
                  <p className="text-center text-[#E8E8E8] text-[10px] mb-0">Moderate</p>
              </div>
            </div>
          </div>
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
  