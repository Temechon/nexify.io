import jsPDF from 'jspdf';
import _ from 'underscore';
import { Blocktype } from '../helpers/Blocktype';
import { Chapter } from '../model/chapter.model';
import { Course } from '../model/course.model';
import { jostBlack, jostLight, jostMedium } from './pdf.customfonts';


export class PDFService {


    constructor() {

    }

    static loadAllImages(chapters: Chapter[]): Promise<any> {

        let allImages = [];
        for (let chap of chapters) {
            for (let task of chap.tasks) {
                for (let content of task.content) {
                    if (Blocktype.isImage(content)) {
                        allImages.push(content.value);
                    }
                }
            }
        }

        let allPromises = [];
        for (let img of allImages) {
            const p = new Promise(resolved => {
                var i = new Image()
                i.onload = function () {
                    resolved({ imgid: img, w: i.width * 0.26, h: i.height * 0.26 })
                };
                i.src = img
            });
            allPromises.push(p);
        }
        return Promise.all(allPromises);
    }



    static createPDF(course: Course, chapters: Chapter[]) {


        this.loadAllImages(chapters).then(imgs => {
            this._createPDFWhenReady(course, chapters, imgs);
        });
    }

    private static _createPDFWhenReady(course: Course, chapters: Chapter[], images: Array<{ imgid: string, w: number, h: number }>) {

        const doc = new jsPDF({
            unit: 'mm',
            format: 'a4'
        });

        const margin = 30;
        const docLength = 210 - margin * 2;

        (doc as any).addFileToVFS('Jost-Medium.ttf', jostMedium);
        (doc as any).addFileToVFS('Jost-Black.ttf', jostBlack);
        (doc as any).addFileToVFS('Jost-Light.ttf', jostLight);
        // (doc as any).addFileToVFS('arimo.regular-bold.ttf', this.regularBold);
        doc.addFont('Jost-Medium.ttf', 'jost', 'normal');
        doc.addFont('Jost-Black.ttf', 'jost', 'bold');
        doc.addFont('Jost-Light.ttf', 'jost', 'light');
        // doc.addFont('arimo.regular-bold.ttf', 'arimo', 'bold');

        // doc.addFont('jost-medium-normal.ttf', 'jost-medium', 'normal');

        // Logo - Image
        // doc.addImage(this.LOGO, 'JPEG', 112 - 30, 31 - 8, 44, 13);
        // blue background
        // doc.setFillColor(249, 250, 251);
        // doc.setFillColor(0, 250, 251);
        // doc.rect(0, 0, 210, 297, 'F');


        let y = margin;
        const newLine = () => {
            y += 12;
            if (y > 297 - margin) {
                doc.addPage();
                y = margin;
            }
        };

        const addChapter = (title: string) => {
            doc
                .setFontSize(24)
                .setFont('jost', 'bold')
                .setTextColor('black');
            doc.text(title, margin + docLength / 2, y, { align: 'center' });

            newLine();
            newLine();
        }

        const addTask = (title: string) => {
            doc
                .setFontSize(14)
                .setFont('jost', 'normal')
                .setTextColor('#00d68f');
            doc.text(title, margin, y);

            newLine();
        }


        // Course title
        doc
            .setFontSize(24)
            .setFont('jost', 'normal')
            .setTextColor('black');
        doc.text(course.title, 104, y, { align: 'center' });

        newLine();

        for (const chap of chapters) {

            y = margin;

            doc.addPage();
            addChapter(chap.title);

            for (let task of chap.tasks) {

                addTask(task.title);

                doc.setTextColor('black');
                doc.setFontSize(12);
                doc.setFont('jost', 'light')

                for (let taskContent of task.content) {
                    if (Blocktype.isAction(taskContent)) {
                        doc.setFont('jost', 'normal');
                        let lines = doc.splitTextToSize(taskContent.value, docLength)
                        doc.text(lines, margin, y);
                        y += (lines.length / 2) * 12;
                        // newLine();
                    }
                    if (Blocktype.isItem(taskContent)) {
                        doc.setFont('jost', 'light');
                        let lines = doc.splitTextToSize(taskContent.value, docLength)
                        doc.text(lines, margin, y);
                        y += (lines.length / 2) * 12;
                        // newLine();
                    }
                    if (Blocktype.isImage(taskContent)) {
                        const imgdata = taskContent.value;

                        const realimg = _.find(images, i => i.imgid === imgdata);
                        // let i = new Image();
                        // let w = 0, h = 0
                        // i.onload = function () {
                        //     alert(i.width + ", " + i.height);
                        // };
                        // i.src = taskContent.value;
                        doc.addImage(realimg.imgid, 'JPEG', margin + docLength / 2 - realimg.w / 2, y, realimg.w, realimg.h)
                        y += realimg.h;
                        newLine();
                        // doc.ex
                    }
                    if (y > 297 - margin) {
                        doc.addPage();
                        y = margin;
                    }

                }
                newLine();

            }


        }
        doc.save(`course.pdf`);
    }

}
