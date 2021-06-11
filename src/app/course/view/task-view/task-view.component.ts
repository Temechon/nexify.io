import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as _ from 'underscore';
import { Code, Task, TaskContent } from '../../../model/task.model';

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


  hideTask() {
    const taskContentDiv = this.taskContent.nativeElement as HTMLDivElement;
    taskContentDiv.classList.toggle('hidden');

    taskContentDiv.parentElement.classList.toggle('active');

  }
}
