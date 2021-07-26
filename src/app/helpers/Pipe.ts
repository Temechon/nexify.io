import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as marked from "marked";
import DOMPurify from 'dompurify';


@Pipe({ name: 'removeRegexp' })
export class RemoveRegexp implements PipeTransform {
    transform(value: string) {

        // Get the language for this code
        const regex = /\/\/\/(.*)\n/im;
        return value.replace(regex, "");
    }
}

@Pipe({ name: 'safeHtml' })
export class SafeHtmlPipe implements PipeTransform {

    constructor(protected sanitizer: DomSanitizer) { }

    public transform(value: any): any {
        const sanitizedContent = DOMPurify.sanitize(value);
        return this.sanitizer.bypassSecurityTrustHtml(sanitizedContent);

    }
}

@Pipe({
    name: 'markdown'
})
export class MarkdownPipe implements PipeTransform {

    transform(value: any): any {
        if (value && value.length > 0) {
            return marked(value);
        }
        return value;
    }

}