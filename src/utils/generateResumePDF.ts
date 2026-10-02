import { jsPDF } from 'jspdf';
import { portfolioData } from '../data/portfolioData';

export const generateResumePDF = (): void => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const r = portfolioData.resume;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;
  let y = 14;

  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
  };

  // Helper for Section Titles
  const addSectionTitle = (title: string) => {
    checkPageBreak(12);
    y += 2.5;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(14, 116, 144); // Cyan / Ocean Blue
    doc.text(title.toUpperCase(), margin, y);
    y += 1.8;
    doc.setDrawColor(203, 213, 225); // Slate 300
    doc.setLineWidth(0.4);
    doc.line(margin, y, pageWidth - margin, y);
    y += 4.5;
  };

  // 1. Header Section
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(21);
  doc.setTextColor(15, 23, 42); // Slate 900
  doc.text(r.fullName.toUpperCase(), margin, y);
  y += 6;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(6, 182, 212); // Cyan 500
  doc.text(r.roleTitle.toUpperCase() + '  •  M.SC. DATA SCIENCE', margin, y);
  y += 5;

  // Contact Info Row
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105); // Slate 600
  const contactText = `${r.contactInfo.email}  |  ${r.contactInfo.phone}  |  ${r.contactInfo.location}`;
  doc.text(contactText, margin, y);
  y += 3.8;

  const linksText = `LinkedIn: ${r.contactInfo.linkedin}  |  GitHub: ${r.contactInfo.github}  |  Portfolio: ${r.contactInfo.portfolio}`;
  doc.text(linksText, margin, y);
  y += 3.5;

  doc.setDrawColor(6, 182, 212);
  doc.setLineWidth(0.8);
  doc.line(margin, y, pageWidth - margin, y);
  y += 4.5;

  // 2. Summary
  addSectionTitle('Professional Summary');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  const summaryLines = doc.splitTextToSize(r.summary, contentWidth);
  doc.text(summaryLines, margin, y);
  y += summaryLines.length * 3.8 + 2;

  // 3. Technical Skills
  addSectionTitle('Technical Skills & Competencies');
  r.skills.forEach((skill) => {
    checkPageBreak(8);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(30, 41, 59);
    const catLabel = `${skill.category}: `;
    doc.text(catLabel, margin, y);
    const labelWidth = doc.getTextWidth(catLabel);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    const wrappedSkills = doc.splitTextToSize(skill.items, contentWidth - labelWidth);
    
    // First line
    doc.text(wrappedSkills[0] || '', margin + labelWidth, y);
    y += 3.8;
    // Continuation lines
    for (let i = 1; i < wrappedSkills.length; i++) {
      checkPageBreak(4);
      doc.text(wrappedSkills[i], margin + 6, y);
      y += 3.8;
    }
  });
  y += 2;

  // 4. Professional Experience
  addSectionTitle('Professional Experience');
  r.experience.forEach((exp) => {
    checkPageBreak(25);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(15, 23, 42);
    doc.text(exp.role, margin, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(100, 116, 139);
    const periodWidth = doc.getTextWidth(exp.period);
    doc.text(exp.period, pageWidth - margin - periodWidth, y);
    y += 4;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(14, 116, 144);
    doc.text(exp.company, margin, y);
    y += 4;

    exp.bullets.forEach((bullet) => {
      checkPageBreak(8);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(6, 182, 212);
      doc.text('•', margin + 1, y);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(51, 65, 85);
      const lines = doc.splitTextToSize(bullet, contentWidth - 6);
      doc.text(lines, margin + 5, y);
      y += lines.length * 3.6 + 1.2;
    });
    y += 2;
  });

  // 5. Featured Projects
  addSectionTitle('Featured Projects');
  r.projects.forEach((proj) => {
    checkPageBreak(20);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text(proj.title, margin, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    const stackWidth = doc.getTextWidth(proj.stack);
    if (stackWidth < 80) {
      doc.text(proj.stack, pageWidth - margin - stackWidth, y);
    }
    y += 4;

    proj.bullets.forEach((bullet) => {
      checkPageBreak(7);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(6, 182, 212);
      doc.text('•', margin + 1, y);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(51, 65, 85);
      const lines = doc.splitTextToSize(bullet, contentWidth - 6);
      doc.text(lines, margin + 5, y);
      y += lines.length * 3.5 + 1;
    });
    y += 2.5;
  });

  // 6. Education
  addSectionTitle('Education');
  r.education.forEach((edu) => {
    checkPageBreak(14);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text(edu.degree, margin, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(100, 116, 139);
    const yrWidth = doc.getTextWidth(edu.period);
    doc.text(edu.period, pageWidth - margin - yrWidth, y);
    y += 3.8;

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(14, 116, 144);
    doc.text(`${edu.college}  —  ${edu.score}`, margin, y);
    y += 4.5;
  });

  // 7. Certifications
  addSectionTitle('Certifications');
  const certsPerRow = 2;
  const colW = contentWidth / certsPerRow;
  for (let i = 0; i < r.certifications.length; i += certsPerRow) {
    checkPageBreak(6);
    const c1 = r.certifications[i];
    const c2 = r.certifications[i + 1];

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(6, 182, 212);
    doc.text('•', margin + 1, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85);
    doc.text(c1, margin + 4, y);

    if (c2) {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(6, 182, 212);
      doc.text('•', margin + colW + 1, y);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(51, 65, 85);
      doc.text(c2, margin + colW + 4, y);
    }
    y += 4.5;
  }

  // Page numbers and footer
  const totalPages = doc.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7.5);
    doc.setTextColor(148, 163, 184);
    doc.text(
      `Kabil B  —  Curriculum Vitae  |  Official PDF Format  |  Page ${p} of ${totalPages}`,
      pageWidth / 2,
      pageHeight - 6,
      { align: 'center' }
    );
  }

  // Save as true PDF format
  doc.save('Kabil_B_Resume.pdf');
};
