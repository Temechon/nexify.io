import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/model/course.model';

@Component({
  selector: 'app-course-view',
  templateUrl: './course-view.component.html',
  styleUrls: ['./course-view.component.scss']
})
export class CourseViewComponent implements OnInit {


  constructor(
    private route: ActivatedRoute) { }

  course: Course;

  ngOnInit(): void {


    this.route.data.subscribe((data: any) => {
      if (data && data.course) {
        this.course = data.course;
        console.log("course:", data);
      }
    });
  }

}
