import React, { useEffect, useRef, useState } from 'react';
import { useArtboardStore } from '../store/artboard';
import { Page } from './page';

type AutoPageSplitterProps = {
  mode?: "preview" | "builder";
  children: React.ReactNode;
};

export const AutoPageSplitter = ({ mode = "preview", children }: AutoPageSplitterProps) => {
  const [pages, setPages] = useState<React.ReactNode[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const page = useArtboardStore((state) => state.resume.metadata.page);
  const fontFamily = useArtboardStore((state) => state.resume.metadata.typography.font.family);

  useEffect(() => {
    const createPages = () => {
      if (!contentRef.current) return;

      const contentElement = contentRef.current;
      const contentHeight = contentElement.scrollHeight;
      
      const viewportHeight = window.innerHeight;
      const pageHeightPx = viewportHeight * 1.2;
      const bottomMargin = -3; // Margin at the bottom of a page break
      const contentAreaHeight = pageHeightPx - bottomMargin;
      
      // Calculate number of pages needed based on the available content area
      const pagesNeeded = Math.max(1, Math.ceil(contentHeight / contentAreaHeight));
      
      const newPages: React.ReactNode[] = [];
      
      for (let i = 0; i < pagesNeeded; i++) {
        newPages.push(
          <Page key={i} mode={mode} pageNumber={i + 1} height={pageHeightPx}>
            <div
              style={{
                position: 'relative',
                height: '100%',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: `-${i * contentAreaHeight}px`,
                  width: '100%'
                }}
              >
                {children}
              </div>
            </div>
          </Page>
        );
      }
      
      setPages(newPages);
    };

    // Initial creation
    createPages();

    // Set up observers for dynamic content changes
    const resizeObserver = new ResizeObserver(createPages);
    const mutationObserver = new MutationObserver(createPages);

    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
      mutationObserver.observe(contentRef.current, {
        childList: true,
        subtree: true,
        attributes: true
      });
    }

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [children, mode]);

  return (
    <>
      {/* Hidden content for measurement */}
      <div 
        ref={contentRef}
        style={{
          position: 'absolute',
          left: '-9999px',
          top: '-9999px',
          width: '40%',
          visibility: 'hidden',
          fontFamily,
          fontSize: 'inherit',
          lineHeight: 'inherit'
        }}
      >
        {children}
      </div>
      
      {/* Render the split pages */}
      {pages}
    </>
  );
}; 