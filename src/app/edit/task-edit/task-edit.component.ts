import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Helpers } from 'src/app/helpers/Helpers';
import { Code, TabCode, Task } from 'src/app/model/task.model';

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

  sub = new Subject();

  constructor() {

    this.sub.pipe(debounceTime(500)).subscribe(() => {
      this.onUpdate.emit(this.task);
    })

  }

  ngOnInit(): void {
  }

  isString(test: any) {
    return !!test?.type;
  }

  getValue(str: any) {
    return str.value;
  }

  getType(str: any) {
    return str.type;
  }

  isCode(test: any) {
    const testAsCode = test[0] as TabCode;
    return !!testAsCode?.id;
  }

  save(t: any, index: number) {
    const content = this.task.content[index] as { type: string, value: string };
    content.value = t.value;
    this.sub.next();
  }

  saveCode(t: any, index: number) {
    console.log("save code", t)
    this.task.content[index] = t;
    this.sub.next();
  }

  add(type: string) {
    this.task.content.push({
      type,
      value: ''
    });
    this.sub.next();
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

}
