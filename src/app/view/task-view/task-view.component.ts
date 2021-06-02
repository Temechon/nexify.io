import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as _ from 'underscore';
import { Code, TabCode, Task, TaskContent } from '../../model/task.model';

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

  getCode(taskContent: TaskContent) {
    return _.find(this.task.codes, (code: Code) => {
      return code.id === taskContent.value
    })
  }


  isCode(test: TaskContent) {
    return test.type === "code";
  }

  hideTask() {
    const taskContentDiv = this.taskContent.nativeElement as HTMLDivElement;
    taskContentDiv.classList.toggle('hidden');

    taskContentDiv.parentElement.classList.toggle('active');

  }
}
