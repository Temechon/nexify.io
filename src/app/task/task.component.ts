import { Component, Input, OnInit } from '@angular/core';
import { Code, Task } from '../model/task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

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
}
