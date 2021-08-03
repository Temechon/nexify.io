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
        // doc.addFont('arimo.regular-bold.ttf', 'arimo', 'bold');

        // doc.addFont('jost-medium-normal.ttf', 'jost-medium', 'normal');

        // Logo - Image
        // doc.addImage(this.LOGO, 'JPEG', 112 - 30, 31 - 8, 44, 13);
        // blue background
        // doc.setFillColor(249, 250, 251);
        // doc.setFillColor(0, 250, 251);
        // doc.rect(0, 0, 210, 297, 'F');


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

            newLine();
            newLine();
        }

        const addTask = (title: string) => {
            doc
                .setFontSize(14)
                .setFont('jost', 'normal')
                .setTextColor('#00d68f');
            doc.text(title, margin, y);
            // doc.html("<p class='bg-red-500>COUCOU JCH</p>")
            newLine();
        }

        // The x coordinates where the next token should be written
        let xx = margin;

        let flag = 0;
        const displayCode = (codeElement: ChildNode, textColor?: string) => {
            if (!codeElement.hasChildNodes()) {
                const codeText = codeElement.textContent;

                console.log("--> ", codeText);
                // doc.setTextColor(flag++ % 2 == 0 ? 'red' : 'blue');

                doc.setTextColor(textColor);


                // doc.text("#", xx, y);
                // doc.text(codeText, xx, y
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

                    const startCut = /*lines[0].length === 0 ? 0 : */lines[0].length + 1;
                    const nextCodeText = codeText.substr(startCut, codeText.length);
                    const nextLines = doc.splitTextToSize(nextCodeText, docLength);

                    for (let l of nextLines) {
                        newLine(6);
                        doc.text(l, margin, y);
                        xx = margin + doc.getTextWidth(l);
                    }

                    // xx = margin;

                    // doc.text(nextLines, xx, y);
                    // xx = margin + doc.getTextWidth(nextLines);
                    // y += (nextLines.length) * 6;
                    // if (y > 297 - margin) {
                    //     doc.addPage();
                    //     y = margin;
                    // }
                }
                doc.setTextColor('black')
            } else {


                const nodes = codeElement.childNodes;
                const codeElementDom = codeElement as HTMLElement;

                const tags = ["tag", "punctuation", "attr-name", "attr-value", "keyword", "string", "selector", "property", "operator", "boolean"];
                const tagsColor = ["red", "black", "green", "blue", "pink"];
                let textColor = "black";

                tags.forEach((tag: string, index: number) => {

                    if (codeElementDom.classList.contains(tag)) {
                        textColor = tagsColor[index];
                    }
                })

                for (let i = 0; i < nodes.length; i++) {
                    displayCode(nodes[i], textColor);
                }
                // if (codeElementDom.classList.contains('tag')) {
                doc.setTextColor('black');
                // }
            }
            // return width;
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
                        doc.setFont('jost', 'light');
                    }
                    if (Blocktype.isItem(taskContent)) {
                        let lines = doc.splitTextToSize(taskContent.value, docLength)
                        doc.text(lines, margin, y);
                        y += (lines.length / 2) * 12;
                        // newLine();
                    }
                    if (Blocktype.isImage(taskContent)) {
                        newLine();
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
                    }

                    // For a code, display all tabs and their content
                    if (Blocktype.isCode(taskContent)) {
                        // newLine();
                        const code = Blocktype.getCode(task, taskContent);
                        const regex = /\/\/\/(.*)\n/im; // to remove the ///language-XXXX

                        for (let tab of code.content) {
                            if (tab.name) {
                                doc.text(tab.name, margin, y);
                                newLine();
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
                    checkNewPage()
                }
                newLine();
            }


        }
        doc.save(`course.pdf`);
    }

}
