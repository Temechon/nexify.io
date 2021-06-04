import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, take } from 'rxjs/operators';
import { Course } from 'src/app/model/course.model';
import { CourseService } from 'src/app/services/course.service';
import { Task } from '../../model/task.model';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss']
})
export class CourseEditComponent implements OnInit {

  course: Course;

  saveSub = new Subject();



  constructor(private courseService: CourseService) {

    this.saveSub.pipe(debounceTime(500)).subscribe(() => {
      this._saveCourse();
    })

  }

  ngOnInit(): void {

    this.courseService.get('angular-firebase').pipe(take(1)).subscribe((data: any) => {
      this.course = data;
      console.log("course - edition:", data);
    });
  }

  addTask() {

    this.course.tasks.push(new Task({
      id: '',
      title: '',
      content: []
    }))
  }

  saveCourse() {
    this.saveSub.next();
  }

  private _saveCourse() {
    this.courseService.save(this.course);
  }

  // ngOnDestroy() {
  //   console.log("removing savesubject on cours eedit");
  //   this.saveSub.complete();
  // }

}
