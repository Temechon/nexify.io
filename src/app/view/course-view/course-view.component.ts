import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { Task } from '../../model/task.model';

@Component({
  selector: 'app-course-view',
  templateUrl: './course-view.component.html',
  styleUrls: ['./course-view.component.scss']
})
export class CourseViewComponent implements OnInit {


  constructor(private courseService: CourseService) { }

  tasks: Task[];

  ngOnInit(): void {

    this.courseService.get('angular-firebase').subscribe((data: any) => {
      this.tasks = data.tasks;
      console.log("coucou", data);

    });


    //     const codes = [
    //       {
    //         id: "aze",
    //         name: "HTML",
    //         classname: 'language-scss',
    //         code: `@import "tailwindcss/base";`
    //       },
    //       {
    //         id: "wxc",
    //         name: "code.component.ts",
    //         classname: 'language-typescript',
    //         code:
    //           `constructor(private highlightService: HighlightService) { }`
    //       }
    //     ]

    //     this.tasks = [
    //       new Task({
    //         title: "Install angular globally",
    //         content:
    //           [
    //             { type: "action", value: 'Install angular CLI' },
    //             [
    //               {
    //                 id: 'code1',
    //                 classname: 'language-bash',
    //                 code: 'npm install -g @angular/cli'
    //               }
    //             ],
    //             { type: "explanation", value: 'Angular CLI : Command Line Interface' },
    //             { type: "explanation", value: 'Used to create projects, generate application and library code, and perform a variety of ongoing development tasks such as testing, bundling, and deployment.' },
    //             { type: "action", value: 'Create a new angular application' },
    //             [
    //               {
    //                 id: 'code2',
    //                 classname: 'language-bash',
    //                 code: 'ng new chronoapp'
    //               }
    //             ],

    //           ]
    //       }),
    //       new Task({
    //         title: "Create angular app",
    //         content: [
    //           [
    //             {
    //               id: 'code00',
    //               classname: 'language-bash',
    //               code: `$ ng new chronoapp
    // Would you like to add Angular routing? Y
    // Which stylesheet format would you like to use? scss`
    //             }
    //           ]
    //         ]
    //       }

    //       )
    //     ]
  }

}
