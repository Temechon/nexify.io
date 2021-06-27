import * as _ from 'underscore';
import { Helpers } from "../helpers/Helpers";



export interface TaskContent {
    type: string
    value: any
}

/***** Database objects */
export interface TaskDb {
    id: string,
    title: string,
    content: Array<TaskContent>
}

export interface TabCodeDb {
    id: string,
    name: string,
    classname: string,
    code: string
}

export interface CodeDb {
    id: string,
    taskid: string,
    content: Array<TabCodeDb>
}



export class TabCode {

    id: string;
    name: string;
    classname: string;
    code: string;

    constructor(params: TabCodeDb) {
        this.id = params.id;
        this.name = params.name;
        this.classname = params.classname;
        this.code = params.code;
    }

    static guid() {
        return `tab-` + Helpers.guid();
    }

    static createNew() {
        return new TabCode({
            id: TabCode.guid(),
            name: '',
            classname: '',
            code: '/// language-XXXX\n'
        })
    }

    toObject(): TabCodeDb {
        // Remove undefined properties from object, otherwise it cannot be saved
        let res: any = _.pick(this, (value: any) => {
            return !_.isUndefined(value);
        });
        return res;
    }
}

export class Code {
    id: string;
    taskid: string;
    content: Array<TabCode> = [];

    constructor(params: CodeDb) {
        this.id = params.id || Helpers.guid();
        this.taskid = params.taskid || '';

        if (params.content) {
            for (let content of params.content) {
                this.content.push(new TabCode(content));
            }
        }
    }

    toObject(): any {
        // Remove undefined properties from object, otherwise it cannot be saved
        let res: any = _.pick(this, (value: any) => {
            return !_.isUndefined(value);
        });

        res.content = res.content.map((tabcode: TabCode) => tabcode.toObject())

        delete res.id;
        return res;
    }
}

export class Task {

    id: string;
    title: string;
    content: Array<TaskContent> = [];
    // Should be saved in database.
    codes: Array<Code> = [];

    constructor(params: TaskDb) {
        if (!params) {
            params = {
                id: Helpers.guid(),
                title: '',
                content: []
            }
        }
        this.id = params.id || Helpers.guid();
        this.title = params.title || '';
        this.content = params.content;
    }

    isEmpty(): boolean {
        return this.content.length === 0;
    }

    /**
     * Don't forget to save all tabcodes as well
     */
    toObject(): any {

        // Remove undefined properties from object, otherwise it cannot be saved
        let res: any = _.pick(this, (value: any) => {
            return !_.isUndefined(value);
        });

        delete res.codes;

        return res;
    }

    /**
     * Returns undefined if the tabcode corresponding to the given id is not found
     * @returns 
     */
    getCodeById(codeid: string) {
        return _.find(this.codes, (code: Code) => code.taskid === codeid);
    }
}