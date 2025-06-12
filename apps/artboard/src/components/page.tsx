import { useTheme } from "@reactive-resume/hooks";
import { cn, pageSizeMap } from "@reactive-resume/utils";

import { useArtboardStore } from "../store/artboard";

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
  
  console.log(page.options.breakLine,"breakLine")
  console.log(pageSizeMap,"pageSizeMap")
  console.log(page,"page.format")
  console.log(pageSizeMap[page.format].height * MM_TO_PX,"oppp")


  return (
    <div
      data-page={pageNumber}  
      style={{
        fontFamily,
        width: '40%',
        minHeight: `${100}vh`,
        marginLeft: "20px",
        marginRight: "200px",
        marginTop: "30px",
        position: "relative",
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

      {mode === "builder" && page.options.breakLine && (
        <div
          className="absolute inset-x-0 border-b border-dashed"
          style={{
            top: `${pageSizeMap[page.format].height * MM_TO_PX}px`,
          }}
        />
      )}
    </div>
  );
};
