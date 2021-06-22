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

  @Input()
  task: Task;

  @Output()
  onUpdate = new EventEmitter();

  @Output()
  onDelete = new EventEmitter();

  saveSub = new Subject();

  blocktype = Blocktype;

  constructor(
    private dialogService: DialogService) {

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
  addImage() {
    this.task.content.push({
      type: 'image',
      value: ""
    })
  }

  /**
   * Removes the content at the given index from the task content
   */
  deleteContent(index: number) {
    this.task.content.splice(index, 1);
    this.save();
  }

  deleteTask() {
    // Display modal "are you sure ?"
    const dialogref = this.dialogService.openDialog(
      ConfirmDialogComponent,
      {
        title: "Are you sure?",
        content: "<span class='font-semibold'>Are you sure you want to delete this task?</span><br><br> All content linked to this task will be deleted as well.",
        button1: {
          text: 'Delete',
          param: 'delete'
        },
        button2: {
          text: 'Cancel',
          param: 'cancel',
          type: 'cancel'
        }
      }
    );

    dialogref.onClose.subscribe((data: string) => {
      if (data === "delete") {
        console.log("DELETE task", this.task)
        this.onDelete.emit();
      }
    })
  }

  ngOnDestroy() {
    this.saveSub.complete();
    this.saveSub.unsubscribe();
  }

}
