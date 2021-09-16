import { Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import marked from 'marked';
import { Blocktype } from 'src/app/helpers/Blocktype';
import { Task } from '../../../model/task.model';

@Component({
  selector: 'task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TaskViewComponent implements OnInit {

  @Input()
  task: Task;

  @Input()
  hasMargin: boolean = true;

  @ViewChild('taskContent', { static: false })
  taskContent: ElementRef;

  blocktype = Blocktype;

  constructor(protected sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }


  hideTask() {
    const taskContentDiv = this.taskContent.nativeElement as HTMLDivElement;
    taskContentDiv.classList.toggle('hidden');

    const taskTitle = taskContentDiv.parentElement.querySelector('.task-title') as HTMLDivElement;
    taskTitle.classList.toggle('active');

  }

  getMarkdown(value: string) {
    return this.sanitizer.bypassSecurityTrustHtml(marked(value));
  }
}
