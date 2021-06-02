import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Code, TabCode } from 'src/app/model/task.model';

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

  @Output()
  private onTabSaved = new EventEmitter();

  @Input()
  codes: Code;



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
    this.codes.content.push(TabCode.createNew())
  }


  saveTab(tabid: string, index: number) {

    // Get code content
    const codeWrapper = this.codeWrapper.nativeElement as HTMLDivElement;
    const codeTextarea = codeWrapper.querySelector(`#${tabid} > textarea`) as HTMLTextAreaElement;
    const codeContent = codeTextarea.value;

    // Get the language for this code
    const regex = /\/\/\/(.*)/im;
    let m = regex.exec(codeContent);
    if (m && m[1]) {
      this.codes.content[index].classname = m[1].trim();
    }

    this.codes.content[index].code = codeContent;

    // Emit as output the full code element
    this.onTabSaved.emit(this.codes);
  }

  removeTab(index: number) {
    this.codes.content.splice(index, 1);
    const codeWrapper = this.codeWrapper.nativeElement as HTMLDivElement;

    // Set the first tab active
    const allTabs = codeWrapper.querySelectorAll('.tab');
    (allTabs.item(0) as HTMLDivElement).classList.add('active');

    if (this.codes.content.length > 0) {
      const tabToActive = this.codes.content[0].id;
      const codeContent = codeWrapper.querySelector(`#${tabToActive}`) as HTMLDivElement;
      codeContent.classList.remove('hidden');
    }

    // Emit as output the full code element
    this.onTabSaved.emit(this.codes);

  }

}
