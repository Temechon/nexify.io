import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Blocktype } from 'src/app/helpers/Blocktype';
import { Task } from '../../../model/task.model';

@Component({
  selector: 'task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  @Input()
  task: Task;

  @ViewChild('taskContent', { static: false })
  taskContent: ElementRef;

  blocktype = Blocktype;

  constructor() { }

  ngOnInit(): void {
  }


  hideTask() {
    const taskContentDiv = this.taskContent.nativeElement as HTMLDivElement;
    taskContentDiv.classList.toggle('hidden');

    const taskTitle = taskContentDiv.parentElement.querySelector('.task-title') as HTMLDivElement;
    taskTitle.classList.toggle('active');

  }
}
