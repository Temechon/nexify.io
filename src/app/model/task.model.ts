export interface Code {
    id: string,
    name?: string,
    classname: string,
    code: string
}

export class Task {


    constructor(
        public title: string,
        public content: Array<{
            type: string,
            value: string
        } | Array<Code>>) {

    }
}