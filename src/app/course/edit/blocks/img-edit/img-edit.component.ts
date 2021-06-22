import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'img-edit',
  templateUrl: './img-edit.component.html',
  styleUrls: ['./img-edit.component.scss']
})
export class ImgEditComponent implements OnInit {

  @Output()
  private onUpdate = new EventEmitter();

  saveSub = new Subject();

  @Input()
  img: string;

  constructor() {
  }

  ngOnInit(): void {

    this.saveSub.pipe(
      debounceTime(500)
    ).subscribe(() => {
      this.onUpdate.emit(this.img);
    })
  }

  save() {
    this.saveSub.next();
  }

  ngOnDestroy() {
    this.saveSub.complete();
    this.saveSub.unsubscribe();
  }

}
