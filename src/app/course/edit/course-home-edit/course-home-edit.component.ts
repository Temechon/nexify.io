import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Course } from 'src/app/model/course.model';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'course-home-edit',
  templateUrl: './course-home-edit.component.html',
  styleUrls: ['./course-home-edit.component.scss']
})
export class CourseHomeEditComponent implements OnInit {

  course: Course;

  saveSub = new Subject();

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {
    console.log("constructor course home edit");

    this.saveSub.pipe(debounceTime(500)).subscribe(() => {
      this._save()
    })
  }

  ngOnInit(): void {
    this.course = this.route.parent.snapshot.data.course;
    console.log("HOME EDIT --- Course:", this.course)
  }

  save() {
    this.saveSub.next();
  }

  _save() {
    // this.courseService.save(this.step);
  }

}
