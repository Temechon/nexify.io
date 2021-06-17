import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Chapter } from 'src/app/model/chapter.model';
import { Course } from 'src/app/model/course.model';
import { StepService } from 'src/app/services/step.service';

@Component({
  selector: 'course-home-view',
  templateUrl: './course-home-view.component.html',
  styleUrls: ['./course-home-view.component.scss']
})
export class CourseHomeViewComponent implements OnInit {


  course: Course;
  // steps: Step[];
  steps: Observable<Chapter[]>;
  firstStep: Chapter;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private stepService: StepService
  ) { }

  ngOnInit(): void {

    this.course = this.route.snapshot.data.course;
    // get all steps for this course
    this.steps = this.stepService.getAll(this.course.id);

    this.steps.subscribe(steps => {
      console.log("COURSE HOME VIEW --- First step:", steps[0]);
      this.firstStep = steps[0];
    });
  }

  startCourse() {
    if (this.firstStep) {
      this.router.navigate(['course', this.course.id, this.firstStep.id])
    }
  }

}
