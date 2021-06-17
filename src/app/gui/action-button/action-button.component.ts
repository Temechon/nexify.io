import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.scss']
})
export class ActionButtonComponent implements OnInit {

  @Input()
  text: string;

  @Input()
  icon: string;

  @Input()
  size: 'small' | 'normal' | 'big' = 'normal';

  @Input()
  color: 'red' | 'blue' | 'green' = 'blue';

  @Input()
  route: string = "";

  @Output()
  private onClick = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  emit() {
    console.log("emit click here");

    this.onClick.emit();
  }

}
