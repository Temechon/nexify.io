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

    this.tasks.push(new Task({
      id: '',
      title: '',
      content: []
    }))
  }

  saveCourse() {
    // TODO save course in database
    console.log("saving course", this.tasks);

  }

}
