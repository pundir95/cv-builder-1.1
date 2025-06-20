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
          
          <h2 className="line-clamp-1 text-2xl font-bold lg:text-3xl">{t`Basics`}</h2>
        </div>
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

        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="basics.headline">{t`Headline`}</Label>
          <Input
            id="basics.headline"
            value={basics.headline}
            onChange={(event) => {
              setValue("basics.headline", event.target.value);
            }}
          />
        </div>

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

        <div className="space-y-1.5">
          <Label htmlFor="basics.url">{t`Website`}</Label>
          <URLInput
            id="basics.url"
            value={basics.url}
            placeholder="https://example.com"
            onChange={(value) => {
              setValue("basics.url", value);
            }}
          />
        </div>

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
