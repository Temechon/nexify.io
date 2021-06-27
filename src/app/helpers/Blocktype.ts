import { Code, Task, TaskContent } from "../model/task.model";
import * as _ from 'underscore';

export abstract class Blocktype {

    static isCode(test: TaskContent) {
        return test.type === "code";
    }

    /**
     * Returns true if the given content is an item element
     */
    static isItem(test: TaskContent) {
        return test.type === "item";
    }
    /**
     * Returns true if the given content is an action element
     */
    static isAction(test: TaskContent) {
        return test.type === "action";
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

    static getCode(task: Task, taskContent: TaskContent) {
        return _.find(task.codes, (code: Code) => {
            return code.id === taskContent.value
        })
    }


}