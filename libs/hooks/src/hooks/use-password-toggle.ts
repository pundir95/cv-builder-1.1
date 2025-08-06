import { useEffect } from "react";

export const usePasswordToggle = (formRef: React.RefObject<HTMLElement | null>) => {
  // Show Password on "Control" Key Down
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Control") {
        const activeElement = document.activeElement as HTMLInputElement;
        const fieldName = activeElement?.getAttribute('name');
        
        if (fieldName === 'password') {
          // Show only password field
          formRef.current
            ?.querySelector<HTMLInputElement>('input[name="password"]')
            ?.setAttribute("type", "text");
        } else if (fieldName === 'confirm_password') {
          // Show only confirm password field
          formRef.current
            ?.querySelector<HTMLInputElement>('input[name="confirm_password"]')
            ?.setAttribute("type", "text");
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [formRef]);

  // Hide Password on "Control" Key Up
  useEffect(() => {
    const onKeyUp = (event: KeyboardEvent) => {
      if (event.key === "Control") {
        const activeElement = document.activeElement as HTMLInputElement;
        const fieldName = activeElement?.getAttribute('name');
        
        if (fieldName === 'password') {
          // Hide only password field
          formRef.current
            ?.querySelector<HTMLInputElement>('input[name="password"]')
            ?.setAttribute("type", "password");
        } else if (fieldName === 'confirm_password') {
          // Hide only confirm password field
          formRef.current
            ?.querySelector<HTMLInputElement>('input[name="confirm_password"]')
            ?.setAttribute("type", "password");
        }
      }
    };

    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [formRef]);

  return;
};
