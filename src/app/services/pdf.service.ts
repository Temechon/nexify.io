import jsPDF from 'jspdf';
import _ from 'underscore';
import { Blocktype } from '../helpers/Blocktype';
import { Chapter } from '../model/chapter.model';
import { Course } from '../model/course.model';
import { inconsolata, jostBlack, jostItalic, jostLight, jostMedium } from './pdf.customfonts';

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
import { TaskContent, Task } from '../model/task.model';
import marked from 'marked';


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

        const caret = new Caret(doc);

        // const margin = 30;
        // const docLength = 210 - margin * 2;

        (doc as any).addFileToVFS('Jost-Medium.ttf', jostMedium);
        (doc as any).addFileToVFS('Jost-Black.ttf', jostBlack);
        (doc as any).addFileToVFS('Jost-Light.ttf', jostLight);
        (doc as any).addFileToVFS('Jost-Italic.ttf', jostItalic);
        (doc as any).addFileToVFS('Inconsolata.ttf', inconsolata);
        // (doc as any).addFileToVFS('arimo.regular-bold.ttf', this.regularBold);
        doc.addFont('Jost-Medium.ttf', 'jost', 'normal');
        doc.addFont('Jost-Black.ttf', 'jost', 'bold');
        doc.addFont('Jost-Light.ttf', 'jost', 'light');
        doc.addFont('Jost-Italic.ttf', 'jost', 'italic');
        doc.addFont('Inconsolata.ttf', 'inconsolata', 'normal');


        // let y = margin;
        // const newLine = (space: number = 12) => {
        //     y += space;
        //     checkNewPage()
        // };

        // const checkNewPage = () => {
        //     if (y > 297 - margin) {
        //         doc.addPage();
        //         y = margin;
        //     }
        // }

        const addChapter = (title: string) => {
            doc
                .setFontSize(24)
                .setFont('jost', 'bold')
                .setTextColor('black');
            doc.text(title, caret.margin + caret.docLength / 2, caret.y, { align: 'center' });

            doc.setTextColor('black')
                .setFontSize(12)
                .setFont('jost', 'light')

            caret.newLine();
            caret.newLine();
        }

        const addTask = (title: string) => {
            doc
                .setFontSize(14)
                .setFont('jost', 'normal')
                .setTextColor('#00d68f');
            doc.text(title, caret.margin, caret.y);

            doc.setTextColor('black')
                .setFontSize(12)
                .setFont('jost', 'light')
            caret.newLine();
        }

        // The x coordinates where the next token should be written
        const displayCode = (codeElement: ChildNode, textColor?: string) => {
            if (!codeElement.hasChildNodes()) {
                const codeText = codeElement.textContent;
                if (codeText.indexOf('language-') !== -1) {
                    return;
                }

                doc.setTextColor(textColor);
                caret.addText(codeText);
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

        const addTaskContent = (task: Task, taskContent: TaskContent) => {
            if (Blocktype.isImage(taskContent)) {
                caret.newLine();
                const imgdata = taskContent.value;

                const realimg = _.find(images, i => i.imgid === imgdata);
                doc.addImage(realimg.imgid, 'JPEG', caret.margin + caret.docLength / 2 - realimg.w / 2, caret.y, realimg.w, realimg.h)
                caret.y += realimg.h;
                caret.newLine();
            }

            // For a code, display all tabs and their content
            if (Blocktype.isCode(taskContent)) {
                // newLine();
                const code = Blocktype.getCode(task, taskContent);

                for (let tab of code.content) {
                    if (tab.name) {

                        caret.newLine(6);
                        doc.setFillColor(45, 63, 81);
                        doc.rect(caret.margin, caret.y - 6, caret.docLength, 9, 'F');

                        doc.setTextColor('white').setFont('jost', 'normal');
                        doc.text(tab.name, caret.margin + 2, caret.y);
                        doc.setTextColor('black').setFont('jost', 'light');
                        caret.newLine(9);
                    }

                    let codeElement = document.createElement('code');
                    codeElement.classList.add(tab.classname);
                    codeElement.textContent = tab.code;
                    Prism.highlightElement(codeElement);
                    // console.log("after prism", codeElement);
                    caret.x = caret.margin;
                    doc.setFont("inconsolata", "normal").setFontSize(10);
                    displayCode(codeElement);
                    caret.newLine();
                    doc.setFont('jost', 'light').setFontSize(12);
                }
            }

            if (Blocktype.isLink(taskContent)) {
                caret.newLine(6);
                let lines = doc.splitTextToSize(taskContent.value[0], caret.docLength)
                const linesH = lines.length / 2 * 12;

                doc.textWithLink(lines, caret.margin + 7, caret.y, { url: taskContent.value[1] });

                doc.setFillColor(0, 214, 143);
                doc.rect(caret.margin, caret.y - 6, 3, linesH + 3, 'F');

                caret.y += linesH;

                caret.newLine(6);
            }

            if (Blocktype.isTip(taskContent)) {
                caret.newLine(6);
                let lines = doc.splitTextToSize(taskContent.value, caret.docLength - 7)
                const linesH = lines.length / 2 * 12;

                doc.setTextColor("#fbbf24").setFont('jost', 'normal');
                doc.text(lines, caret.margin + 7, caret.y);
                doc.setTextColor("black").setFont('jost', 'light');

                doc.setFillColor(251, 191, 36);
                doc.rect(caret.margin, caret.y - 6, 3, linesH + 3, 'F');

                caret.y += linesH;

                caret.newLine(6);
            }

            if (Blocktype.isMarkdown(taskContent)) {
                let markdown = marked.lexer(taskContent.value);
                console.log(markdown);

                for (let token of markdown) {
                    handleMdToken(token);
                    caret.resetx();
                }
            }
            caret.checkNewPage()
        }

        const handleMdToken = (mdtoken: any,) => {
            if (mdtoken.type == "text" && !mdtoken.tokens) {
                caret.addText(mdtoken.raw);
            }
            if (mdtoken.type == "text" && mdtoken.tokens) {
                for (let tok of mdtoken.tokens) {
                    handleMdToken(tok);
                }
            }
            if (mdtoken.type == "paragraph") {
                for (let tok of mdtoken.tokens) {
                    handleMdToken(tok);
                }
                caret.newLine();
            }
            if (mdtoken.type == "space") {
                // Nothing to do
            }

            if (mdtoken.type == "em") {
                doc.setFont("jost", "italic")
                for (let tok of mdtoken.tokens) {
                    handleMdToken(tok);
                }
                doc.setFont('jost', 'light');
            }

            if (mdtoken.type == "strong") {
                doc.setFont("jost", "bold")
                for (let tok of mdtoken.tokens) {
                    handleMdToken(tok);
                }
                doc.setFont('jost', 'light');
            }

            if (mdtoken.type === "heading") {
                doc.setFontSize(17 - mdtoken.depth).setFont('jost', 'bold');
                for (let tok of mdtoken.tokens) {
                    handleMdToken(tok);
                }
                doc.setFontSize(12).setFont('jost', 'light');
                caret.newLine();
            }

            if (mdtoken.type == "list") {
                let index = 0;
                for (let listitem of mdtoken.items) {
                    if (mdtoken.ordered) {
                        caret.addText(`${mdtoken.start + index}. `)
                    } else {
                        caret.addText("- ");
                    }
                    for (let tok of listitem.tokens) {
                        handleMdToken(tok);
                    }
                    caret.newLine(6);
                    caret.resetx();
                    index++;
                }
            }
            if (mdtoken.type == "blockquote") {
                caret.newLine(6);
                let lines = doc.splitTextToSize(mdtoken.text.trim(), caret.docLength - 7)
                const linesH = lines.length / 2 * 12;

                doc.setFont('jost', 'normal');
                doc.text(lines, caret.margin + 7, caret.y);
                doc.setFont('jost', 'light');

                doc.setFillColor(251, 191, 36);
                doc.rect(caret.margin, caret.y - 6, 3, linesH + 3, 'F');

                caret.y += linesH;

                caret.newLine(6);
            }
        }


        // Course title
        doc
            .setFontSize(48)
            .setFont('jost', 'bold')
            .setTextColor('black');

        let title = doc.splitTextToSize(course.title, caret.docLength);

        doc.text(title, 210 / 2, caret.margin * 3, { align: 'center' });

        // Author
        doc
            .setFontSize(10)
            .setFont('jost', 'light')
            .setTextColor('black');

        doc.text(`Created by ${course.author}`, 210 / 2, title.length / 2 * 12 + caret.margin * 4, { align: 'center' });

        doc
            .setFontSize(12)
            .setFont('jost', 'light')
            .setTextColor('black');

        doc.textWithLink("Exported from nexify.io", 210 / 2, 297 - caret.margin / 2, { align: 'center', url: "http://nexify.io" });


        // Add prerequesite - a task with only markdown
        if (course.prerequisite) {
            doc.addPage();
            addTask("Prerequisite");

            for (let taskContent of course.prerequisite.content) {
                addTaskContent(course.prerequisite, taskContent)
            }
            caret.newLine();
            caret.newLine();
        }
        if (course.objectives) {
            if (!course.prerequisite) {
                doc.addPage();
            }
            addTask("Objectives");

            for (let taskContent of course.objectives.content) {

                addTaskContent(course.objectives, taskContent)
            }
            caret.newLine();
            caret.newLine();
        }
        if (course.home) {
            for (let taskContent of course.home.content) {
                addTaskContent(course.home, taskContent);
            }
        }

        doc.addPage();

        for (const chap of chapters) {

            caret.y = caret.margin;

            doc.addPage();
            addChapter(chap.title);

            for (let task of chap.tasks) {

                addTask(task.title);

                doc.setTextColor('black');
                doc.setFontSize(12);
                doc.setFont('jost', 'light')

                for (let taskContent of task.content) {

                    addTaskContent(task, taskContent);
                }
                caret.newLine();
            }
        }

        // Add footer on all pages
        const pageCount = doc.getNumberOfPages();
        doc.setFont('jost', 'italic')
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

class Caret {

    /** The caret x poqsition */
    public x = 0;
    /** The caret y position */
    public y = 0;

    public docLength = 0;

    constructor(private doc: jsPDF, public margin = 30) {
        this.x = this.y = margin;
        this.docLength = 210 - margin * 2;
    }

    resetx() {
        this.x = this.margin;
    }

    /**
     * Add the given text at the caret position.
     * The caret is then moved at the end of the text
     * @param text 
     */
    addText(text: string) {
        const lines = this.doc.splitTextToSize(text, this.docLength, { textIndent: this.x });

        if (lines.length === 1) {
            this.doc.text(lines, this.x, this.y);
            this.x += this.doc.getTextWidth(lines);
            if (this.x >= this.docLength + this.margin) {
                this.x = this.margin;
                this.newLine(6);
            }
        } else {
            this.doc.text(lines[0], this.x, this.y);

            const startCut = lines[0].length + 1;
            const nextCodeText = text.substr(startCut, text.length);
            const nextLines = this.doc.splitTextToSize(nextCodeText, this.docLength);

            for (let l of nextLines) {
                this.newLine(6);
                this.doc.text(l, this.margin, this.y);
                this.x = this.margin + this.doc.getTextWidth(l);
            }
        }
    }

    /**
     * Moves the caret to the next line
     */
    newLine(space: number = 12) {
        this.y += space;
        this.checkNewPage()
    }

    /**
     * Moves this caret to the next page
     */
    checkNewPage() {
        if (this.y > 297 - this.margin) {
            this.doc.addPage();
            this.y = this.margin;
        }
    }



}
