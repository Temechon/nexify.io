import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'tip-edit',
  templateUrl: './tip-edit.component.html',
  styleUrls: ['./tip-edit.component.scss']
})
export class TipEditComponent implements OnInit {

  @Output()
  private onUpdate = new EventEmitter();

  saveSub = new Subject();

  @Input()
  tip: Array<string>;

  constructor() {
  }

  ngOnInit(): void {

    this.saveSub.pipe(
      debounceTime(500)
    ).subscribe(() => {
      this.onUpdate.emit(this.tip);
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
