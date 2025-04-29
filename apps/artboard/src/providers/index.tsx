import { useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Outlet } from "react-router";

import { helmetContext } from "../constants/helmet";
import { useArtboardStore } from "../store/artboard";

export const Providers = () => {
  const resume = useArtboardStore((state) => state.resume);
  const setResume = useArtboardStore((state) => state.setResume);

  useEffect(() => {
    console.log("Setting up message event listener");
    const handleMessage = (event: MessageEvent) => {
      console.log("Received message event:", event);
      if (event.origin !== window.location.origin) {
        console.log("Origin mismatch:", event.origin, window.location.origin);
        return;
      }
      if (event.data.type === "SET_RESUME") {
        console.log("Setting resume from message:", event.data.payload);
        setResume(event.data.payload);
      }
    };

    window.addEventListener("message", handleMessage, false);

    return () => {
      window.removeEventListener("message", handleMessage, false);
    };
  }, []);

  useEffect(() => {
    console.log("Checking localStorage for resume data");
    const resumeData = window.localStorage.getItem("resume");

    if (resumeData) {
      console.log("Found resume data in localStorage");
      try {
        const parsedData = JSON.parse(resumeData);
        console.log("Setting resume from localStorage:", parsedData);
        setResume(parsedData);
      } catch (error) {
        console.error("Failed to parse resume data from localStorage:", error);
      }
    } else {
      console.log("No resume data found in localStorage");
    }
  }, [window.localStorage.getItem("resume")]);

  if (!resume) {
    console.log("Resume data is null, rendering nothing");
    return null;
  }
  console.log(resume, "resumedddddd")
  
  console.log("Resume data is available, rendering content");

  return (
    <HelmetProvider context={helmetContext}>
      <Outlet />
    </HelmetProvider>
  );
};
