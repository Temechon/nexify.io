import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, take } from 'rxjs/operators';
import { Step } from 'src/app/model/course.model';
import { CourseService } from 'src/app/services/course.service';
import { Task } from '../../../model/task.model';

@Component({
  selector: 'step-edit',
  templateUrl: './step-edit.component.html',
  styleUrls: ['./step-edit.component.scss']
})
export class StepEditComponent implements OnInit {

  course: Step;

  saveSub = new Subject();



  constructor(private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router) {

    this.saveSub.pipe(debounceTime(500)).subscribe(() => {
      this._saveCourse();
    })

  }

  ngOnInit(): void {

    this.route.data.subscribe((data: any) => {
      if (data && data.step) {
        this.course = data.step;
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

  goToStep() {
    // Get course id in url
    // const courseid = this.route.parent.paramMap.get('id');
    console.log(this.route.parent.paramMap);

    // this.router.navigate(['course', this]);
  }

  private _saveCourse() {
    this.courseService.save(this.course);
  }

  // ngOnDestroy() {
  //   console.log("removing savesubject on cours eedit");
  //   this.saveSub.complete();
  // }

}
