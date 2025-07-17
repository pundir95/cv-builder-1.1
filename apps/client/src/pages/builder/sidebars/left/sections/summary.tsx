import { defaultSections } from "@reactive-resume/schema";
import { Button, RichInput } from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";
import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router";
import { Editor } from '@tiptap/react';

import { AiActions } from "@/client/components/ai-actions";
import { useResumeStore } from "@/client/stores/resume";
import { useSectionProgress } from "@/client/hooks/use-section-progress";

import { SectionIcon } from "./shared/section-icon";
import { SectionOptions } from "./shared/section-options";
import { Lightbulb } from "@phosphor-icons/react";
import AiModal from "@/client/components/AiModal";
import StarAi from '../../../../../assets/star-ai.svg'

export const SummarySection = () => {
  const setValue = useResumeStore((state) => state.setValue);
  const editorRef = useRef<Editor | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const section = useResumeStore(
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    (state) => state.resume.data.sections.summary ?? defaultSections.summary,
  );
  const [showSuggestions, setShowSuggestions] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const improve = searchParams.get("improve") === "true";
  const [isEditing, setIsEditing] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Check if summary is complete (has content)
  useEffect(() => {
    setIsCompleted(Boolean(section.content && section.content.trim().length > 0));
  }, [section.content]);

  // Use the progress hook
  useSectionProgress("summary", isCompleted);

  // Only show effect if improve=true and not editing
  const showEffect = improve && !isEditing;





  return (
    <section id="summary" className="grid gap-y-6 px-6">
      <header className="flex items-center justify-between lg:flex-row flex-col gap-4">
        <div className="flex items-center gap-x-4">
        <div className="bg-[#0D84F3] p-1 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <line x1="10" y1="9" x2="8" y2="9"></line>
            </svg>
          </div>
          <h2 className="line-clamp-1 text-2xl font-bold lg:text-3xl">{section.name}</h2>
        </div>
        {isCompleted && (
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
              <span className="text-green-700 font-semibold text-base leading-tight truncate">Complete!</span>
              <span className="text-green-600 text-xs leading-tight truncate">All basic information completed.</span>
              </div>
            </div>
          )}

        <div className="flex items-center gap-x-2">
          <div  className="relative">
            <Button
              ref={buttonRef}
              size="sm"
              onClick={() => setShowSuggestions(!showSuggestions)}
              className="bg-white text-blue-500 hover:bg-transparent hover:text-blue-500 bg-white"
            >
              <img src={StarAi} />
              <span className="ml-2 text-base font-medium">Summarize my experience</span>
            </Button>
            {showSuggestions && (
              <AiModal
                onClose={() => setShowSuggestions(false)}
                anchorRef={buttonRef}
                editorRef={editorRef}
              />
            )}
          </div>
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
         <div className="flex items-center gap-x-2 mb-2">
        <p className="text-x text-black-400">Write 2-4 short, energetic sentences about how great you are. Mention the role and what you did. What were the big achievements? Describe your motivation and list your skills.</p>

        </div>
       
        <RichInput
          content={section.content}
          footer={(editor) => {
            editorRef.current = editor;
            return (
              <AiActions
                value={editor.getText()}
                onChange={(value) => {
                  editor.commands.setContent(value, true);
                  setValue("sections.summary.content", value);
                }}
              />
            );
          }}
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
