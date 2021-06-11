import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course, Step } from 'src/app/model/course.model';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) { }


  @Input()
  course: Course;

  @Input()
  steps: Step[];

  ngOnInit(): void {

    // Get active step
    let stepid = this.route.snapshot.paramMap.get('step');


  }

}
