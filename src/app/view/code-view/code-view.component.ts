import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Code } from 'src/app/model/task.model';
import { HighlightService } from '../../services/Highlight.service';

@Component({
  selector: 'app-code',
  templateUrl: './code-view.component.html',
  styleUrls: ['./code-view.component.scss']
})
export class CodeViewComponent implements OnInit {

  @ViewChild('codeWrapper', { static: true })
  codeWrapper: ElementRef

  @Input()
  codes: Code;

  constructor(private highlightService: HighlightService) { }

  ngOnInit(): void {
  }

  ngAfterViewChecked() {
    this.highlightService.highlightAll();
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


}
