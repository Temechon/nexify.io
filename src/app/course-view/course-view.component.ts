import { Component, OnInit } from '@angular/core';
import { Task } from '../model/task.model';

@Component({
  selector: 'app-course-view',
  templateUrl: './course-view.component.html',
  styleUrls: ['./course-view.component.scss']
})
export class CourseViewComponent implements OnInit {


  constructor() { }

  tasks: Task[];

  ngOnInit(): void {

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

    this.tasks = [
      new Task(
        "Install angular globally",
        [
          [
            {
              id: 'code1',
              classname: 'language-bash',
              code: 'npm install -g @angular/cli'
            }
          ],
          { type: "explanation", value: 'Angular CLI : Command Line Interface' },
          { type: "explanation", value: 'Used to create projects, generate application and library code, and perform a variety of ongoing development tasks such as testing, bundling, and deployment.' },
          { type: "action", value: 'Create a new angular application' },
          [
            {
              id: 'code2',
              classname: 'language-bash',
              code: 'ng new chronoapp'
            }
          ],

        ]),
      new Task(
        "Create angular app",
        [
          [
            {
              id: 'code00',
              classname: 'language-bash',
              code: `$ ng new chronoapp
Would you like to add Angular routing? Y
Which stylesheet format would you like to use? scss`
            }
          ]
        ],

      )
    ]
  }

}
