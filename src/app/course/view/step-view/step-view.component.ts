import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Step } from 'src/app/model/course.model';

@Component({
  selector: 'step-view',
  templateUrl: './step-view.component.html',
  styleUrls: ['./step-view.component.scss']
})
export class StepViewComponent implements OnInit {


  constructor(
    private route: ActivatedRoute) { }

  step: Step;

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.step = data.step;
    })
  }

}
