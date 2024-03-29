import { Code, Task, TaskContent } from "../model/task.model";
import * as _ from 'underscore';

export abstract class Blocktype {

    static isCode(test: TaskContent) {
        return test.type === "code";
    }

    /**
     * Returns true if the given content is an action element
     */
    static isMarkdown(test: TaskContent) {
        return test.type === "markdown";
    }

    /**
     * Returns true if the given content is a link element
     */
    static isLink(test: TaskContent) {
        return test.type === "link";
    }
    /**
     * Returns true if the given content is an image element
     */
    static isImage(test: TaskContent) {
        return test.type === "image";
    }

    /**
     * Returns true if the given content is a tip element
     */
    static isTip(test: TaskContent) {
        return test.type === "tip";
    }

    static getCode(task: Task, taskContent: TaskContent) {
        return _.find(task.codes, (code: Code) => {
            return code.id === taskContent.value
        })
    }


}