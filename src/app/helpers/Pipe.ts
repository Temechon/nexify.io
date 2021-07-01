import { Pipe, PipeTransform } from '@angular/core';
import * as marked from "marked";


@Pipe({ name: 'removeRegexp' })
export class RemoveRegexp implements PipeTransform {
    transform(value: string) {

        // Get the language for this code
        const regex = /\/\/\/(.*)\n/im;
        return value.replace(regex, "");
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
