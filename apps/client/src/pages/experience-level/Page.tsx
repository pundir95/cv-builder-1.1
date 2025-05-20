import { useEffect, useState } from "react";
import { EDUCATION_LEVEL, EXPERIENCE_TIME, IS_STUDENT } from "./constant";
import BuilderBox from "./BuilderBox";
import { useNavigate } from "react-router";
import { LimitReachedModal } from "../select-template/LimitReachedModal";
import { LoginModal } from "../auth/LoginModal";

interface ExperienceItem {
  id: string;
  order: number;
  isSelected: boolean;
  isStudent?: boolean;
  [key: string]: any;
}

interface CheckState {
  isStudent: boolean;
  isTime: boolean;
}

const ExperienceLevel = () => {
  const [isLimitReachedModalOpen, setIsLimitReachedModalOpen] = useState(false);
  const [experienceLevel, setExperienceLevel] = useState<ExperienceItem[]>([]);
  const [studentData, setStudentData] = useState<ExperienceItem[]>([]);
  const navigate=useNavigate()
  const user=localStorage.getItem("user")
  const userData=JSON.parse(user || "{}")
  let resumeDetailsId=userData?.resume_details[0]?.id;
  let isSubscriptionHave = userData?.subscription_details;
  let resumeCount=userData?.resume_count;

  useEffect(() => {
    const updatedData = EXPERIENCE_TIME?.map((item, index) => ({
      ...item,
      id: item.value,
      order: index + 1,
      isSelected: false,
    }));
    setExperienceLevel(updatedData);
    setStudentData(IS_STUDENT.map((item, index) => ({
      ...item,
      id: `student-${index}`,
      isSelected: false
    })));
  }, [EXPERIENCE_TIME]);


  useEffect(() => {
    if(isSubscriptionHave?.length==0 && resumeCount==1){
      setIsLimitReachedModalOpen(true)
    }
  }, [])

  const [isCheck, setIsCheck] = useState<CheckState>({
    isStudent: false,
    isTime: false,
  });

  const handleClick = (item: ExperienceItem, index: number, headingValue: string): void => {
    let willNextOpen: Record<number, boolean> = {
      1: true,
    };

    if (headingValue === "experience_time") {
      let tempExperience = [...experienceLevel];
      tempExperience[index] = {
        ...tempExperience[index],
        isSelected: !tempExperience[index].isSelected,
      };
      setExperienceLevel(tempExperience);
      console.log(tempExperience, "tempExperience");

    }

    if (headingValue === "is_student") {
      let tempStudent = [...studentData];
      tempStudent[index] = {
        ...tempStudent[index],
        isSelected: !tempStudent[index].isSelected,
      };
      setStudentData(tempStudent);
    }

    if (item.order in willNextOpen && willNextOpen[item.order] && headingValue !== "experience_level") {
      setIsCheck({
        ...isCheck,
        isStudent: true,
        isTime: item?.isStudent || false,
      });
      if (headingValue === "is_student") {
        if (item?.isStudent) {
            // navigate("/resume/choose-template");
        } else {
          navigate("/onboard/upload-resume");
        }
      }
    } else {
      navigate("/onboard/upload-resume");
    }
  };

  return (
    <div>
      <BuilderBox
        data={experienceLevel}
        handleClick={handleClick}
        headingValue="experience_time"
      />
      {isCheck.isStudent ? (
        <BuilderBox
          data={studentData}
          handleClick={handleClick}
          headingValue="is_student"
        />
      ) : (
        ""
      )}
      {isCheck.isTime ? (
        <BuilderBox
          data={EDUCATION_LEVEL}
          handleClick={handleClick}
          headingValue="experience_level"
        />
      ) : (
        " "
      )}
        <LimitReachedModal isOpen={isLimitReachedModalOpen} onClose={() => setIsLimitReachedModalOpen(false)} resumeDetailsId={resumeDetailsId} />
    </div>
  );
};

export default ExperienceLevel;
