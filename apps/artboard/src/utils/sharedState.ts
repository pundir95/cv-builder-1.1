// Create a shared state object in the global window
declare global {
  interface Window {
    __RESUME_BUILDER__: {
      templateRef: HTMLElement | null;
      setTemplateRef: (ref: HTMLElement | null) => void;
      getTemplateRef: () => HTMLElement | null;
    };
  }
}

// Initialize the shared state if it doesn't exist
if (!window.__RESUME_BUILDER__) {
  window.__RESUME_BUILDER__ = {
    templateRef: null,
    setTemplateRef: (ref: HTMLElement | null) => {
      window.__RESUME_BUILDER__.templateRef = ref;
      // Also store in parent window if in iframe
      if (window.parent !== window) {
        window.parent.__RESUME_BUILDER__ = {
          ...window.parent.__RESUME_BUILDER__,
          templateRef: ref
        };
      }
    },
    getTemplateRef: () => {
      // Try to get from current window first
      const ref = window.__RESUME_BUILDER__.templateRef;
      if (ref) return ref;
      
      // If not found, try parent window
      if (window.parent !== window) {
        return window.parent.__RESUME_BUILDER__?.templateRef || null;
      }
      
      return null;
    }
  };
}

export const sharedState = {
  setTemplateRef: (ref: HTMLElement | null) => {
    window.__RESUME_BUILDER__.setTemplateRef(ref);
  },
  getTemplateRef: () => {
    return window.__RESUME_BUILDER__.getTemplateRef();
  }
}; 