import { Pipe, PipeTransform } from '@angular/core';


@Pipe({ name: 'removeRegexp' })
export class RemoveRegexp implements PipeTransform {
    transform(value: string) {

        // Get the language for this code
        const regex = /\/\/\/(.*)\n/im;
        return value.replace(regex, "");
    }
}
