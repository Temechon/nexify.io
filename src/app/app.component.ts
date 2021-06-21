import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  ngOnInit() {
    const isDarkMode = JSON.parse(localStorage.getItem('nexify.darkmode'));
    if (isDarkMode) {
      document.body.classList.add('dark');
    }

  }
}
