import { defaultSections } from "@reactive-resume/schema";
import { RichInput } from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";
import { useState } from "react";
import { useLocation } from "react-router";

import { AiActions } from "@/client/components/ai-actions";
import { useResumeStore } from "@/client/stores/resume";
import { useSectionProgress } from "@/client/hooks/use-section-progress";

import { SectionIcon } from "./shared/section-icon";
import { SectionOptions } from "./shared/section-options";

export const SummarySection = () => {
  const setValue = useResumeStore((state) => state.setValue);
  const section = useResumeStore(
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    (state) => state.resume.data.sections.summary ?? defaultSections.summary,
  );
  const [showSuggestions, setShowSuggestions] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const improve = searchParams.get("improve") === "true";
  const [isEditing, setIsEditing] = useState(false);

  // Check if summary is complete (has content)
  const isCompleted = Boolean(section.content && section.content.trim().length > 0);

  // Use the progress hook
  useSectionProgress("summary", isCompleted);

  // Only show effect if improve=true and not editing
  const showEffect = improve && !isEditing;

  return (
    <section id="summary" className="grid gap-y-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <SectionIcon id="summary" size={18} />
          <h2 className="line-clamp-1 text-2xl font-bold lg:text-3xl">{section.name}</h2>
        </div>

        <div className="flex items-center gap-x-2">
          <button
            onClick={() => setShowSuggestions(!showSuggestions)}
            className="rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <span className="text-sm text-gray-600 dark:text-gray-400">💡</span>
          </button>
          <SectionOptions id="summary" />
        </div>
      </header>

      <main
        className={cn(
          "relative",
          showEffect && "rounded-lg border-2 border-gray-200 dark:border-gray-700 p-4 backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)]",
          !section.visible && "opacity-50"
        )}
      >
        {showSuggestions && (
          <div className="absolute right-0 top-0 z-10 w-64 rounded-lg bg-white/80 backdrop-blur-md p-4 shadow-lg dark:bg-gray-800/80">
            <h3 className="mb-2 font-semibold">Suggestions</h3>
            <ul className="text-sm text-gray-600 dark:text-gray-400">
              <li>• Keep it concise and impactful</li>
              <li>• Highlight key achievements</li>
              <li>• Use action verbs</li>
              <li>• Focus on relevant experience</li>
            </ul>
          </div>
        )}
        <RichInput
          content={section.content}
          footer={(editor) => (
            <AiActions
              value={editor.getText()}
              onChange={(value) => {
                editor.commands.setContent(value, true);
                setValue("sections.summary.content", value);
              }}
            />
          )}
          onFocus={() => setIsEditing(true)}
          onBlur={() => setIsEditing(false)}
          onChange={(value) => {
            setValue("sections.summary.content", value);
            setIsEditing(true);
          }}
        />
      </main>
    </section>
  );
};
