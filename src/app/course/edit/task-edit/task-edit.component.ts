import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ConfirmDialogComponent } from 'src/app/gui/dialog/confirm-dialog.component';
import { Blocktype } from 'src/app/helpers/Blocktype';
import { Code, TabCode, Task, TaskContent } from 'src/app/model/task.model';
import { DialogService } from 'src/app/services/dialog.service';
import * as _ from 'underscore';

@Component({
  selector: 'task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent implements OnInit {

  /**
   * The list of not authorized block that can be used in this task
   */
  @Input()
  excluded: Array<string> = [];

  /**
 * The list of authorized block that can be used in this task
 */
  @Input()
  included: Array<string> = [];

  /**
   * True if this task should ask for a title, false otherwise
   */
  @Input()
  showTitle: boolean = true;

  @Input()
  task: Task;

  @Output()
  onUpdate = new EventEmitter();

  @Output()
  onDelete = new EventEmitter();

  saveSub = new Subject();

  blocktype = Blocktype;

  constructor() {

    this.saveSub.pipe(debounceTime(500)).subscribe(() => {
      this.onUpdate.emit(this.task);
    })

  }

  ngOnInit(): void {
  }

  /**
   * Update the given string content in database 
   */
  saveText(t: any | string, index: number) {
    const content = this.task.content[index] as { type: string, value: string };
    if (typeof t === "string") {
      content.value = t;
    } else {
      content.value = t.value;
    }
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

  canUse(type: string) {

    if (_.contains(this.excluded, type)) {
      return false;
    }

    if (this.included.length > 0) {
      return _.contains(this.included, type);
    }
    return true;
  }

  add(type: string, index: number, value: any = '') {
    const taskContent = {
      type,
      value
    };
    this.task.content.splice(index + 1, 0, taskContent);
    this.saveSub.next();
  }

  getCode(taskContent: TaskContent) {
    return _.find(this.task.codes, (code: Code) => {
      return code.id === taskContent.value
    })
  }


  displayAddLine($div: EventTarget, addLineDiv: HTMLDivElement) {
    const interlinDiv = $div as HTMLDivElement;
    interlinDiv.classList.add('hidden');
    interlinDiv.classList.remove('flex');
    // interlinDiv.classList.add('h-24');

    // const addLineDiv = interlinDiv.querySelector('.add-line') as HTMLDivElement;
    addLineDiv.classList.add('flex');
    addLineDiv.classList.remove('hidden');



  }

  addCode(index: number) {
    const newCode = new Code({
      id: '',
      taskid: this.task.id,
      content: [TabCode.createNew()]
    })
    this.task.codes.push(newCode);
    this.add('code', index, newCode.id);
  }

  /**
   * Removes the content at the given index from the task content
   */
  deleteContent(index: number) {
    this.task.content.splice(index, 1);
    this.save();
  }

  ngOnDestroy() {
    this.saveSub.complete();
    this.saveSub.unsubscribe();
  }

}
