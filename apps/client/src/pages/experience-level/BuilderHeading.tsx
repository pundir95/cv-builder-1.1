import { BUILDER_HEADING } from "./constant";

const BuilderHeading = ({ headingValue }: { headingValue: 'experience_time' | 'is_student' | 'experience_level' | 'choose_template' }) => {
    let headingItem = BUILDER_HEADING[headingValue] as { main: string; para?: string };
  return (
    <>
    <div className="container mx-auto text-center mt-8">
      <h1 className="text-4xl font-bold text-black mb-4">{headingItem?.main}</h1>
      {headingItem?.para && <p className="text-lg text-black">{headingItem.para}</p>}
    </div>
    </>
  );
};

export default BuilderHeading;
