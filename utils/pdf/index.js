import Handlebars from 'handlebars';
import htmlToPdf from 'html-pdf-node';

// Injects dynamic data into the Handlebars template
export const compileHtmlTemplate = (htmlTemplate, data) => {
  const compiler = Handlebars.compile(htmlTemplate);
  return compiler(data);
};

// Converts an HTML string into a PDF Buffer in memory using html-pdf-node
export const generatePdfBuffer = async (htmlContent) => {
  const options = {
    format: 'A4',
    printBackground: true, // Ensures CSS background colors (like the dark summary box) render
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    margin: {
      top: '20px',
      bottom: '20px',
    },
  };

  // html-pdf-node requires the HTML string to be wrapped in a file object
  const file = { content: htmlContent };

  try {
    // generatePdf resolves directly to a binary Buffer
    const pdfBuffer = await htmlToPdf.generatePdf(file, options);
    return pdfBuffer;
  } catch (error) {
    throw new Error(`PDF Generation Failed: ${error.message}`);
  }
};
