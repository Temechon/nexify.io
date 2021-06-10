import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course, Step } from 'src/app/model/course.model';
import { StepService } from 'src/app/services/step.service';

@Component({
  selector: 'course-home',
  templateUrl: './course-home.component.html',
  styleUrls: ['./course-home.component.scss']
})
export class CourseHomeComponent implements OnInit {


  course: Course;
  steps: Step[];

  constructor(
    private route: ActivatedRoute,
    private stepService: StepService
  ) { }

  ngOnInit(): void {

    this.route.data.subscribe((data: any) => {
      if (data && data.course) {
        this.course = data.course;
        console.log("course:", this.course);

        // get all steps for this course
        this.stepService.getAll(this.course.id).subscribe((data) => {
          this.steps = data;
        })
      }
    });
  }

}
