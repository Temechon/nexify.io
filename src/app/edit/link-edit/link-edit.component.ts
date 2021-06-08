import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'link-edit',
  templateUrl: './link-edit.component.html',
  styleUrls: ['./link-edit.component.scss']
})
export class LinkEditComponent implements OnInit {

  @Output()
  private onUpdate = new EventEmitter();

  saveSub = new Subject();

  @Input()
  link: Array<string>;

  constructor() {
    this.saveSub.pipe(
      debounceTime(500)
    ).subscribe(() => {
      this.onUpdate.emit(this.link);
    })
  }

  ngOnInit(): void {
  }

}
