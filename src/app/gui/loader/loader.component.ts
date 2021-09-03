import { Component, Input, OnInit } from '@angular/core';
import { Loader, LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  @Input()
  public id: string = 'global';

  constructor(private loaderService: LoaderService) { }

  @Input()
  hidden: boolean = false;

  ngOnInit(): void {
    this.loaderService.loaderStatus$.subscribe((response: Loader) => {
      this.hidden = this.id === response.id && response.hide;
    });
  }

}
