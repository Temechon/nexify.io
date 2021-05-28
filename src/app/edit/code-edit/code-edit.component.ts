import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'code-edit',
  templateUrl: './code-edit.component.html',
  styleUrls: ['./code-edit.component.scss']
})
export class CodeEditComponent implements OnInit {

  @ViewChild('codeWrapper', { static: true })
  codeWrapper: ElementRef

  @ViewChild('codeEditor', { static: true })
  codeEditor: ElementRef;

  codeEditorUpdated = new Subject<string>();


  @Input()
  codes: Array<{
    id: string,
    name: string,
    classname: string,
    code: string
  }> = [];

  constructor() { }

  ngOnInit(): void {
  }

  openTab($event: MouseEvent, tabid: string) {
    const codeWrapper = this.codeWrapper.nativeElement as HTMLDivElement;

    // Hide all code divs
    const allCodeContent = codeWrapper.querySelectorAll('.code-content');
    allCodeContent.forEach(div => div.classList.add('hidden'));

    // Remove 'active' on all tabs
    const allTabDivs = codeWrapper.querySelectorAll('.tab');
    allTabDivs.forEach(div => div.classList.remove('active'));

    // Show the selected code content
    const codeContent = codeWrapper.querySelector(`#${tabid}`) as HTMLDivElement;
    codeContent.classList.remove('hidden');

    // Set the selected tab as active
    const tabDiv = $event.currentTarget as HTMLDivElement;
    tabDiv.classList.add('active');
  }

  addTab() {
    this.codes.push({
      id: "rtzer",
      name: "",
      classname: "language-typescript",
      code: ''
    })
  }


  saveTab(tabid: string, index: number) {
    const codeWrapper = this.codeWrapper.nativeElement as HTMLDivElement;
    const codeTextarea = codeWrapper.querySelector(`#${tabid} > textarea`) as HTMLTextAreaElement;
    const codeContent = codeTextarea.value;
    this.codes[index].code = codeContent;

    // TODO Emit as output the full code element
  }

  removeTab(index: number) {
    console.log("remove tab to do");

  }



}
