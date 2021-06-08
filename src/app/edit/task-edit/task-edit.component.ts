import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Code, TabCode, Task, TaskContent } from 'src/app/model/task.model';
import * as _ from 'underscore';

@Component({
  selector: 'task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent implements OnInit {

  @Input()
  task: Task;

  @Output()
  onUpdate = new EventEmitter();

  saveSub = new Subject();

  constructor() {

    this.saveSub.pipe(debounceTime(500)).subscribe(() => {
      this.onUpdate.emit(this.task);
    })

  }

  ngOnInit(): void {
  }

  /**
   * Returns true if the given content is a code element
   */
  isCode(test: any) {
    return test.type === "code";
  }

  /**
   * Returns true if the given content is a explanation element
   */
  isExplanation(test: any) {
    return test.type === "explanation";
  }
  /**
   * Returns true if the given content is an action element
   */
  isAction(test: any) {
    return test.type === "action";
  }

  /**
   * Returns true if the given content is a link element
   */
  isLink(test: any) {
    return test.type === "link";
  }

  /**
   * Update the given string content in database 
   */
  saveText(t: any, index: number) {
    const content = this.task.content[index] as { type: string, value: string };
    content.value = t.value;
    this.saveSub.next();
  }

  /**
   * Save this task in database
   */
  save() {
    this.saveSub.next();
  }

  reorder(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.task.content, event.previousIndex, event.currentIndex);
    this.save();
  }

  add(type: string) {
    this.task.content.push({
      type,
      value: ''
    });
    this.saveSub.next();
  }

  getCode(taskContent: TaskContent) {
    return _.find(this.task.codes, (code: Code) => {
      return code.id === taskContent.value
    })
  }

  addCode() {
    const newCode = new Code({
      id: '',
      taskid: this.task.id,
      content: [TabCode.createNew()]
    })
    this.task.codes.push(newCode);
    this.task.content.push({ type: 'code', value: newCode.id });
  }

  addLink() {
    this.task.content.push({
      type: 'link',
      value: []
    })

  }

  /**
   * Removes the content at the given index from the task content
   */
  deleteContent(index: number) {
    this.task.content.splice(index, 1);
    this.save();
  }

}
