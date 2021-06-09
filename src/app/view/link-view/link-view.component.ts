import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'link-view',
  templateUrl: './link-view.component.html',
  styleUrls: ['./link-view.component.scss']
})
export class LinkViewComponent implements OnInit {


  @Input()
  link: Array<string>;

  constructor() { }

  ngOnInit(): void {
  }

  getUrl() {
    const url = this.link[1];
    if (url.includes('http')) {
      return url;
    } else {
      return 'http://' + url;
    }
  }

}
