import { t } from "@lingui/macro";
import { basicsSchema } from "@reactive-resume/schema";
import { Input, Label } from "@reactive-resume/ui";

import { useResumeStore } from "@/client/stores/resume";

import { CustomFieldsSection } from "./custom/section";
import { PictureSection } from "./picture/section";
import { SectionIcon } from "./shared/section-icon";
import { URLInput } from "./shared/url-input";

export const BasicsSection = () => {
  const setValue = useResumeStore((state) => state.setValue);
  const basics = useResumeStore((state) => state.resume.data.basics);

  // Check if all required fields are filled and valid
  const isComplete = [
    basics.name,
    basics.headline,
    basics.email,
    basics.url.href,
    basics.phone,
    basics.location,
  ].every((val) => typeof val === 'string' && val.trim() !== "") &&
    basicsSchema.pick({
      name: true,
      email: true,
      url: true,
    }).safeParse({
      name: basics.name,
      email: basics.email,
      url: basics.url,
    }).success;

  return (
    <section id="basics" className="grid gap-y-6 px-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <div className="bg-[#0D84F3] p-1 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <h2 className="line-clamp-1 text-2xl font-bold lg:text-3xl">Personal Information</h2>
        </div>
        {isComplete && (
          <div
            className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-1 shadow-sm animate-fade-in-up"
            style={{ minWidth: 0 }}
          >
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-green-500 shadow-md scale-100 animate-pop-in">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="10" r="10" fill="#22C55E" />
                <path d="M6 10.5L9 13.5L14 8.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <div className="flex flex-col min-w-0">
              <span className="text-green-700 font-semibold text-base leading-tight truncate">{t`Complete!`}</span>
              <span className="text-green-600 text-xs leading-tight truncate">{t`All basic information completed.`}</span>
            </div>
          </div>
        )}
      </header>

      <main className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <PictureSection />
        </div>

        <div className="space-y-4 sm:col-span-2">
          <Label htmlFor="basics.name">{t`Full Name`}</Label>
          <Input
            id="basics.name"
            value={basics.name}
            hasError={!basicsSchema.pick({ name: true }).safeParse({ name: basics.name }).success}
            onChange={(event) => {
              setValue("basics.name", event.target.value);
            }}
          />
        </div>

        {/* <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="basics.profession">Profession</Label>
          <Input
            id="basics.profession"
            value={basics.profession}
            onChange={(event) => {
              setValue("basics.profession", event.target.value);
            }}
          />
        </div> */}

        {/* <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="basics.headline">{t`Headline`}</Label>
          <Input
            id="basics.headline"
            value={basics.headline}
            onChange={(event) => {
              setValue("basics.headline", event.target.value);
            }}
          />
        </div> */}

        <div className="space-y-1.5">
          <Label htmlFor="basics.email">{t`Email`}</Label>
          <Input
            id="basics.email"
            placeholder="john.doe@example.com"
            value={basics.email}
            hasError={
              !basicsSchema.pick({ email: true }).safeParse({ email: basics.email }).success
            }
            onChange={(event) => {
              setValue("basics.email", event.target.value);
            }}
          />
        </div>

        {/* <div className="space-y-1.5">
          <Label htmlFor="basics.url">{t`Website`}</Label>
          <URLInput
            id="basics.url"
            value={basics.url}
            placeholder="https://example.com"
            onChange={(value) => {
              setValue("basics.url", value);
            }}
          />
        </div> */}

        <div className="space-y-1.5">
          <Label htmlFor="basics.phone">{t`Phone`}</Label>
          <Input
            id="basics.phone"
            placeholder="+1 (123) 4567 7890"
            value={basics.phone}
            onChange={(event) => {
              setValue("basics.phone", event.target.value);
            }}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="basics.location">{t`Location`}</Label>
          <Input
            id="basics.location"
            value={basics.location}
            onChange={(event) => {
              setValue("basics.location", event.target.value);
            }}
          />
        </div>

        <CustomFieldsSection className="sm:col-span-2" />
      </main>
    </section>
  );
};
