import { Component, OnInit } from '@angular/core';
import { Task } from '../../model/task.model';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss']
})
export class CourseEditComponent implements OnInit {

  tasks: Task[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  addTask() {

    const codes = [
      {
        id: "aze",
        name: "HTML",
        classname: 'language-scss',
        code: `@import "tailwindcss/base";`
      },
      {
        id: "wxc",
        name: "code.component.ts",
        classname: 'language-typescript',
        code:
          `constructor(private highlightService: HighlightService) { }`
      }
    ]

    this.tasks.push(new Task(
      "",
      [
        { type: 'explanation', value: 'explanation' },
        codes
      ]
    ))
  }

}
