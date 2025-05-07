
const getTemplateHtml = (templateRef:any) => {
    console.log(templateRef,"templateRefnew")
    if (templateRef) {
      // Get all stylesheets
      const styles = Array.from(document.styleSheets)
        .map(stylesheet => {
          try {
            return Array.from(stylesheet.cssRules)
              .map(rule => rule.cssText)
              .join('\n');
          } catch (e) {
            return '';
          }
        })
        .join('\n');

      // Get HTML content
      const html = templateRef.innerHTML;
      
      // Combine style and HTML
      const fullHtml = `
        <style>
          ${styles}
        </style>
        ${html}
      `;
      
      console.log(fullHtml, "html with styles");
      return fullHtml;
    }
    return '';
  };

   export const generatePDF = async (templateRef:any) => {
    try {
      const fullHtml = getTemplateHtml(templateRef);
      if (fullHtml) {
        // Create a temporary container
        const container = document.createElement('div');
        container.innerHTML = fullHtml;

        const opt = {
          margin: 0,
          filename: 'resume.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { 
            scale: 2,
            useCORS: true,
            logging: true,
            letterRendering: true,
            allowTaint: true,
            scrollY: 0,
            scrollX: 0,
            backgroundColor: '#ffffff',
            windowWidth: 800,
            windowHeight: 1131
          },
          jsPDF: { 
            unit: 'px',
            format: [800, 1131], // A4 size in pixels
            orientation: 'portrait',
            compress: true,
            precision: 16
          },
          pagebreak: { mode: 'avoid-all' }
        };

        // Generate and save PDF
        // await html2pdf().set(opt).from(container).save();
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };