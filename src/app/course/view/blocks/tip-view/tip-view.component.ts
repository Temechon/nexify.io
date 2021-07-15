import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tip-view',
  templateUrl: './tip-view.component.html',
  styleUrls: ['./tip-view.component.scss']
})
export class TipViewComponent implements OnInit {

  @Input()
  tip: Array<string>;

  constructor() { }

  ngOnInit(): void {
  }

}
