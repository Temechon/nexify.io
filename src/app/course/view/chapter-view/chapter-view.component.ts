import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Step } from 'src/app/model/course.model';

@Component({
  selector: 'chapter-view',
  templateUrl: './chapter-view.component.html',
  styleUrls: ['./chapter-view.component.scss']
})
export class ChapterViewComponent implements OnInit {


  constructor(
    private route: ActivatedRoute) { }

  step: Step;

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.step = data.step;
    })
  }

}
