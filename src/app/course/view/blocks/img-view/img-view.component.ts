import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'img-view',
  templateUrl: './img-view.component.html',
  styleUrls: ['./img-view.component.scss']
})
export class ImgViewComponent implements OnInit {


  @Input()
  img: string;

  constructor() { }

  ngOnInit(): void {
  }

}
