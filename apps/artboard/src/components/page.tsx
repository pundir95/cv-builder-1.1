import { useTheme } from "@reactive-resume/hooks";
import { cn, pageSizeMap } from "@reactive-resume/utils";

import { useArtboardStore } from "../store/artboard";
import { useLocation } from "react-router";
type Props = {
  mode?: "preview" | "builder";
  pageNumber: number;
  children: React.ReactNode;
};

export const MM_TO_PX = 2.78;

export const Page = ({ mode = "preview", pageNumber, children }: Props) => {
  const { isDarkMode } = useTheme();
  const page = useArtboardStore((state) => state.resume.metadata.page);
  const fontFamily = useArtboardStore((state) => state.resume.metadata.typography.font.family);
  console.log(pageSizeMap,"pageSizeMap")
  console.log(page,"page.format")
  console.log(pageSizeMap[page.format].height * MM_TO_PX,"oppp");
  console.log(mode,"mode")


  return (
    <div
      className={`w-full max-w-[646px] ml-auto mr-auto max-[768px]:absolute max-[768px]:left-1/2 max-[768px]:-translate-x-1/2 relative block lg:max-h-none max-h-[100vh] overflow-auto ${mode === "preview" ? "preview-class" :""}`}
      // data-page={pageNumber} 
      style={{
        fontFamily,
        minHeight: `${100}vh`,
        marginTop: "30px",
        backgroundColor: "var(--background)", 
        color: "var(--foreground)",
        ...(mode === "builder" && {
          boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)"
        })
      }}
    >
      {mode === "builder" && page.options.pageNumbers && (
        <div className={cn("absolute -top-7 left-0 font-bold", isDarkMode && "text-white")}>
          Page {pageNumber} 
        </div>
      )}
      

      {children}

      {/* {mode === "builder" && page.options.breakLine && (
        <div
          className="absolute inset-x-0 border-b border-dashed"
          style={{
            top: `${pageSizeMap[page.format].height * MM_TO_PX}px`,
          }}
        />
      )} */}
    </div>
  );
};
