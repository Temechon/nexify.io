import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, take } from 'rxjs/operators';
import { Step } from 'src/app/model/course.model';
import { CourseService } from 'src/app/services/course.service';
import { Task } from '../../../model/task.model';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss']
})
export class CourseEditComponent implements OnInit {

  course: Step;

  saveSub = new Subject();



  constructor(private courseService: CourseService,
    private route: ActivatedRoute) {

    this.saveSub.pipe(debounceTime(500)).subscribe(() => {
      this._saveCourse();
    })

  }

  ngOnInit(): void {

    this.route.data.subscribe((data: any) => {
      if (data && data.course) {
        this.course = data.course;
        console.log("course:", data);
      }
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
