import { t } from "@lingui/macro";
import type { ResumeDto } from "@reactive-resume/dto";
import { useCallback, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import type { LoaderFunction } from "react-router";
import { redirect } from "react-router";

import { queryClient } from "@/client/libs/query-client";
import { findResumeById } from "@/client/services/resume";
import { useBuilderStore } from "@/client/stores/builder";
import { useResumeStore } from "@/client/stores/resume";

export const BuilderPage = () => {
  const frameRef = useBuilderStore((state) => state.frame.ref);
  const setFrameRef = useBuilderStore((state) => state.frame.setRef);

  const resume = useResumeStore((state) => state.resume);
  const title = useResumeStore((state) => state.resume.title);

  const syncResumeToArtboard = useCallback(() => {
    setTimeout(() => {
      if (!frameRef?.contentWindow) return;
      const message = { type: "SET_RESUME", payload: resume.data };
      frameRef.contentWindow.postMessage(message, "*");
    }, 0);
  }, [frameRef?.contentWindow, resume.data]);

  // Send resume data to iframe on initial load
  useEffect(() => {
    if (!frameRef) return;

    frameRef.addEventListener("load", syncResumeToArtboard);

    return () => {
      frameRef.removeEventListener("load", syncResumeToArtboard);
    };
  }, [frameRef]);

  // Persistently check if iframe has loaded using setInterval
  useEffect(() => {
    const interval = setInterval(() => {
      if (frameRef?.contentWindow?.document.readyState === "complete") {
        syncResumeToArtboard();
        clearInterval(interval);
      }
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [frameRef]);

  // Send resume data to iframe on change of resume data
  useEffect(syncResumeToArtboard, [resume.data]);

  return (
    <>
      <Helmet>
        <title>
          {title} - {t`Reactive Resume`}
        </title>
      </Helmet>

      <iframe
        ref={setFrameRef}
        title={resume.id}
        src="/artboard/builder"
        className="mt-16 w-screen"
        style={{ height: `calc(100vh - 64px)` }}
      />
    </>
  );
};

export const builderLoader: LoaderFunction<ResumeDto> = async ({ params }) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const id = params.id!;

    const resume = await queryClient.fetchQuery({
      queryKey: ["resume", { id }],
      queryFn: () => findResumeById({ id }),
    });

    const data1 = resume;
    console.log(data1, "data1333")

    const resumeDto = {
      id: data1.id,
      title: data1.title,
      slug: data1.slug,
      data1: data1.data,
      visibility: data1.visibility,
      userId: data1.user?.id ?? '',
      createdAt: data1.createdAt,
      updatedAt: data1.updatedAt,
      locked: data1.locked,
      data: data1.cv_data,
      cv_template: data1.cv_template,
    };

    useResumeStore.setState({ resume: resumeDto });
    useResumeStore.temporal.getState().clear();

    return resumeDto;
  } catch {
    return redirect("/dashboard");
  }
};
