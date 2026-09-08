import jsPDF from "jspdf";
import { toPng } from "html-to-image";

export async function downloadReceiptPDF(elementId: string, filename: string) {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Elemento #${elementId} não encontrado para geração de PDF.`);
  }

  // Generate high-res image at fixed 800px width (prevents viewport clipping)
  const imgData = await toPng(element, {
    pixelRatio: 2,
    backgroundColor: "#ffffff",
    cacheBust: true,
    skipFonts: true,
    width: 800,
  });

  const img = new Image();
  img.src = imgData;
  await new Promise((resolve, reject) => {
    img.onload = resolve;
    img.onerror = reject;
  });

  // A4 dimensions in mm: 210 x 297
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 10;
  const printableWidth = pageWidth - margin * 2;
  const printableHeight = (img.height * printableWidth) / img.width;

  if (printableHeight <= pageHeight - margin * 2) {
    pdf.addImage(imgData, "PNG", margin, margin, printableWidth, printableHeight);
  } else {
    let heightLeft = printableHeight;
    let position = margin;

    pdf.addImage(imgData, "PNG", margin, position, printableWidth, printableHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - printableHeight + margin;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", margin, position, printableWidth, printableHeight);
      heightLeft -= pageHeight;
    }
  }

  pdf.save(filename);
}
