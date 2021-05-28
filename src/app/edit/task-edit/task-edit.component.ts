import { Component, Input, OnInit } from '@angular/core';
import { Code, Task } from 'src/app/model/task.model';

@Component({
  selector: 'task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent implements OnInit {

  @Input()
  task: Task;

  constructor() { }

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
    const testAsCode = test[0] as Code;
    return !!testAsCode?.id;
  }

  save(t: any, index: number) {
    console.log(t.value)
    const content = this.task.content[index] as { type: string, value: string };
    content.value = t.value;
  }

  addExplanation() {
    this.task.content.push({
      type: 'explanation',
      value: ''
    })
  }
  addAction() {
    this.task.content.push({
      type: 'action',
      value: ''
    })
  }

}
