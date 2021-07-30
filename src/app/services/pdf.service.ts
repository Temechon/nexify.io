import jsPDF from 'jspdf';
import { Chapter } from '../model/chapter.model';
import { Course } from '../model/course.model';
import { jostBlack, jostMedium } from './pdf.customfonts';


export class PDFService {


    constructor() {

    }


    static createPDF(course: Course, chapters: Chapter[]) {

        const doc = new jsPDF({
            unit: 'mm',
            format: 'a4'
        });

        (doc as any).addFileToVFS('Jost-Medium.ttf', jostMedium);
        (doc as any).addFileToVFS('Jost-Black.ttf', jostBlack);
        // (doc as any).addFileToVFS('arimo.regular-bold.ttf', this.regularBold);
        doc.addFont('Jost-Medium.ttf', 'jost', 'normal');
        doc.addFont('Jost-Black.ttf', 'jost', 'bold');
        // doc.addFont('arimo.regular-bold.ttf', 'arimo', 'bold');

        // doc.addFont('jost-medium-normal.ttf', 'jost-medium', 'normal');

        // Logo - Image
        // doc.addImage(this.LOGO, 'JPEG', 112 - 30, 31 - 8, 44, 13);
        // blue background
        doc.setFillColor(249, 250, 251);
        doc.rect(0, 0, 210, 297, 'F');

        // Course title
        doc.setFont('jost', 'normal');
        doc.setTextColor('black');
        doc.text(course.title, 104, 52, { align: 'center' });

        for (const chap of chapters) {

            doc.addPage();
            doc.setTextColor('black');
            doc.text(chap.title, 104, 52, { align: 'center' });


        }

        // for (const l of wload.lots) {
        //     if (l.tasks.length === 0) {
        //         continue;
        //     }
        //     let y = doc.lastAutoTable.finalY + 5 || 65;

        //     const body = [];
        //     let id = 1; // Ids in the document starts at 1
        //     for (const task of l.tasks) {
        //         body.push([
        //             id++,
        //             task.name,
        //             task.workload
        //         ]);
        //     }
        //     // Total line
        //     body.push([
        //         id,
        //         'TOTAL ' + l.name,
        //         l.total()
        //     ]);

        //     // Lot 1 - background
        //     if (l.name) {
        //         doc.setFillColor(51, 63, 80);
        //         doc.rect(17, y, 174, 6, 'F');
        //         // Lot 1 - Title
        //         doc.setFont('helvetica');
        //         doc.setFontType('normal');
        //         doc.setTextColor('white');
        //         doc.setFontSize(10);
        //         doc.text(l.name, 104, y + 4, { align: 'center' });
        //     } else {
        //         y -= 6;
        //     }

        //     doc.setTextColor('black');
        //     doc.autoTable(
        //         {
        //             columnStyles: {
        //                 0: { halign: 'center', valign: 'middle', cellWidth: 20 },
        //                 1: { halign: 'left', valign: 'middle', cellWidth: 133 },
        //                 2: { halign: 'center', valign: 'middle', cellWidth: 20 }
        //             },
        //             headStyles: {
        //                 fillColor: [230, 230, 230],
        //                 textColor: [0, 0, 0],
        //                 halign: 'center'
        //             },
        //             columns: [
        //                 'ID',
        //                 'Description',
        //                 'Qtté (j/h)'
        //             ],
        //             body,
        //             margin: { left: 17, right: 19 },
        //             startY: y + 6,
        //             theme: 'grid',

        //             // Total line
        //             didParseCell: (data) => {
        //                 const rows = data.table.body;

        //                 if (rows.length !== 0 && data.row.index === rows.length - 1) {
        //                     data.cell.styles.fillColor = [230, 230, 230];
        //                 }
        //             }
        //         }
        //     );
        // }

        // // Total workload - background
        // const y = doc.lastAutoTable.finalY + 5;
        // doc.setFillColor(51, 63, 80);
        // doc.rect(17, doc.lastAutoTable.finalY + 5, 174, 10, 'F');
        // doc.setFont('helvetica');
        // doc.setFontType('bold');
        // doc.setTextColor('white');
        // doc.setFontSize(10);
        // doc.text('ESTIMATION DE CHARGE TOTALE (en j/h)', 94, y + 6, { align: 'center' });
        // doc.setFontSize(14);
        // doc.text(wload.total().toString(), 177, y + 6.5, { align: 'left' });

        // const date = moment().format('YYYY-MM-DD');

        doc.save(`course.pdf`);
    }

}
