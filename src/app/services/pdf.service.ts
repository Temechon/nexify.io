import jsPDF from 'jspdf';
import _ from 'underscore';
import { Blocktype } from '../helpers/Blocktype';
import { Chapter } from '../model/chapter.model';
import { Course } from '../model/course.model';
import { inconsolata, jostBlack, jostLight, jostMedium } from './pdf.customfonts';

import 'prismjs';
import 'prismjs/plugins/toolbar/prism-toolbar';
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-sass';
import 'prismjs/components/prism-scss';


declare var Prism: any;


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

        console.log("Creating PDF for", chapters);

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
        (doc as any).addFileToVFS('Inconsolata.ttf', inconsolata);
        // (doc as any).addFileToVFS('arimo.regular-bold.ttf', this.regularBold);
        doc.addFont('Jost-Medium.ttf', 'jost', 'normal');
        doc.addFont('Jost-Black.ttf', 'jost', 'bold');
        doc.addFont('Jost-Light.ttf', 'jost', 'light');
        doc.addFont('Inconsolata.ttf', 'inconsolata', 'normal');


        let y = margin;
        const newLine = (space: number = 12) => {
            y += space;
            checkNewPage()
        };

        const checkNewPage = () => {
            if (y > 297 - margin) {
                doc.addPage();
                y = margin;
            }
        }

        const addChapter = (title: string) => {
            doc
                .setFontSize(24)
                .setFont('jost', 'bold')
                .setTextColor('black');
            doc.text(title, margin + docLength / 2, y, { align: 'center' });

            doc.setTextColor('black')
                .setFontSize(12)
                .setFont('jost', 'light')

            newLine();
            newLine();
        }

        const addTask = (title: string) => {
            doc
                .setFontSize(14)
                .setFont('jost', 'normal')
                .setTextColor('#00d68f');
            doc.text(title, margin, y);

            doc.setTextColor('black')
                .setFontSize(12)
                .setFont('jost', 'light')
            newLine();
        }

        // The x coordinates where the next token should be written
        let xx = margin;

        const displayCode = (codeElement: ChildNode, textColor?: string) => {
            if (!codeElement.hasChildNodes()) {
                const codeText = codeElement.textContent;
                if (codeText.indexOf('language-') !== -1) {
                    return;
                }

                doc.setTextColor(textColor);
                const lines = doc.splitTextToSize(codeText, docLength, { textIndent: xx });

                if (lines.length === 1) {
                    doc.text(lines, xx, y);
                    xx += doc.getTextWidth(lines);
                    if (xx >= docLength + margin) {
                        xx = margin;
                        newLine(6);
                    }
                } else {
                    doc.text(lines[0], xx, y);

                    const startCut = lines[0].length + 1;
                    const nextCodeText = codeText.substr(startCut, codeText.length);
                    const nextLines = doc.splitTextToSize(nextCodeText, docLength);

                    for (let l of nextLines) {
                        newLine(6);
                        doc.text(l, margin, y);
                        xx = margin + doc.getTextWidth(l);
                    }
                }
                doc.setTextColor('black')
            } else {


                const nodes = codeElement.childNodes;
                const codeElementDom = codeElement as HTMLElement;

                const tagsColor: {
                    [index: string]: string;
                } = {
                    "tag": "#c04750",
                    "punctuation": "black",
                    "attr-name": "#1755ac",
                    "attr-value": "#00d68f",
                    "keyword": "#1755ac",
                    "string": "#00d68f",
                    "selector": "#c04750",
                    "property": "#1755ac",
                    "operator": "black",
                    "boolean": "#00d68f",
                    "comment": "#999"
                }
                let textColor = "black";

                for (let tag in tagsColor) {
                    if (codeElementDom.classList.contains(tag)) {
                        textColor = tagsColor[tag];
                    }
                }

                for (let i = 0; i < nodes.length; i++) {
                    displayCode(nodes[i], textColor);
                }
                doc.setTextColor('black');
            }
        }


        // Course title
        doc
            .setFontSize(48)
            .setFont('jost', 'bold')
            .setTextColor('black');

        let title = doc.splitTextToSize(course.title, docLength);

        doc.text(title, 210 / 2, margin * 3, { align: 'center' });

        // Author
        doc
            .setFontSize(10)
            .setFont('jost', 'light')
            .setTextColor('black');

        doc.text(`Created by ${course.author}`, 210 / 2, title.length / 2 * 12 + margin * 4, { align: 'center' });

        doc
            .setFontSize(12)
            .setFont('jost', 'light')
            .setTextColor('black');

        doc.textWithLink("Exported from nexify.io", 210 / 2, 297 - margin / 2, { align: 'center', url: "http://nexify.io" });


        // Add prerequesite - a task with only markdown
        if (course.prerequisite) {
            doc.addPage();
            addTask("Prerequisite");

            for (let taskContent of course.prerequisite.content) {
                // taskcontent is always a markdown type
                // TODO refactor this and add style for markdown 
                let lines = doc.splitTextToSize(taskContent.value, docLength)
                doc.text(lines, margin, y);
                y += (lines.length / 2) * 12;
            }
            newLine();
            newLine();
        }
        if (course.objectives) {
            if (!course.prerequisite) {
                doc.addPage();
            }
            addTask("Objectives");

            for (let taskContent of course.objectives.content) {
                // taskcontent is always a markdown type
                // TODO refactor this and add style for markdown 
                let lines = doc.splitTextToSize(taskContent.value, docLength)
                doc.text(lines, margin, y);
                y += (lines.length / 2) * 12;
            }
            newLine();
            newLine();
        }
        if (course.home) {
            // TODO finish here
            // addCompleteTask(course.home);
        }

        doc.addPage();

        for (const chap of chapters) {

            y = margin;

            doc.addPage();
            addChapter(chap.title);

            // TODO extract this into a new function
            for (let task of chap.tasks) {

                addTask(task.title);

                doc.setTextColor('black');
                doc.setFontSize(12);
                doc.setFont('jost', 'light')

                for (let taskContent of task.content) {

                    // TODO refactor this with markdown

                    if (Blocktype.isImage(taskContent)) {
                        newLine();
                        const imgdata = taskContent.value;

                        const realimg = _.find(images, i => i.imgid === imgdata);
                        doc.addImage(realimg.imgid, 'JPEG', margin + docLength / 2 - realimg.w / 2, y, realimg.w, realimg.h)
                        y += realimg.h;
                        newLine();
                    }

                    // For a code, display all tabs and their content
                    if (Blocktype.isCode(taskContent)) {
                        // newLine();
                        const code = Blocktype.getCode(task, taskContent);

                        for (let tab of code.content) {
                            if (tab.name) {

                                newLine(6);
                                doc.setFillColor(45, 63, 81);
                                doc.rect(margin, y - 6, docLength, 9, 'F');

                                doc.setTextColor('white').setFont('jost', 'normal');
                                doc.text(tab.name, margin + 2, y);
                                doc.setTextColor('black').setFont('jost', 'light');
                                newLine(9);
                            }

                            let codeElement = document.createElement('code');
                            codeElement.classList.add(tab.classname);
                            codeElement.textContent = tab.code;
                            Prism.highlightElement(codeElement);
                            // console.log("after prism", codeElement);
                            xx = margin;
                            doc.setFont("inconsolata", "normal").setFontSize(10);
                            displayCode(codeElement);
                            newLine();
                            doc.setFont('jost', 'light').setFontSize(12);

                            // let str = Prism.highlight(tab.code, Prism.languages.javascript, "javascript");
                            // console.log("hihglihted", str);


                            // const realCode = tab.code.replace(regex, "");
                            // let lines = doc.splitTextToSize(realCode, docLength)
                            // doc.text(lines, margin, y);
                            // y += (lines.length / 2 - 1) * 12;
                        }
                        // doc.text(taskContent.value, margin, y);
                        // newLine();
                    }

                    if (Blocktype.isLink(taskContent)) {
                        newLine(6);
                        let lines = doc.splitTextToSize(taskContent.value[0], docLength)
                        const linesH = lines.length / 2 * 12;

                        doc.textWithLink(lines, margin + 7, y, { url: taskContent.value[1] });

                        doc.setFillColor(0, 214, 143);
                        doc.rect(margin, y - 6, 3, linesH + 3, 'F');

                        y += linesH;

                        newLine(6);
                    }

                    if (Blocktype.isTip(taskContent)) {
                        newLine(6);
                        let lines = doc.splitTextToSize(taskContent.value, docLength - 7)
                        const linesH = lines.length / 2 * 12;

                        doc.setTextColor("#fbbf24").setFont('jost', 'normal');
                        doc.text(lines, margin + 7, y);
                        doc.setTextColor("black").setFont('jost', 'light');

                        doc.setFillColor(251, 191, 36);
                        doc.rect(margin, y - 6, 3, linesH + 3, 'F');

                        y += linesH;

                        newLine(6);
                    }
                    checkNewPage()
                }
                newLine();
            }


        }

        // Add footer on all pages
        const pageCount = doc.getNumberOfPages();
        doc.setFont('helvetica', 'italic')
        doc.setFontSize(8)
        for (var i = 2; i <= pageCount; i++) {
            doc.setPage(i)
            doc.text('Page ' + String(i) + ' of ' + String(pageCount), doc.internal.pageSize.width / 2, 287, {
                align: 'center'
            })
        }

        // Saving document
        doc.save(`${course.title}.pdf`);
    }

}
