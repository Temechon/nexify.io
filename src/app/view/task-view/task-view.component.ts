import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Code, Task } from '../../model/task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  @Input()
  task: Task;

  @ViewChild('taskContent', { static: true })
  taskContent: ElementRef;

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

  hideTask() {
    const taskContentDiv = this.taskContent.nativeElement as HTMLDivElement;
    taskContentDiv.classList.toggle('hidden');

    taskContentDiv.parentElement.classList.toggle('active');

  }
}
