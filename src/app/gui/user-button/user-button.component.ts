import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'user-button',
  templateUrl: './user-button.component.html',
  styleUrls: ['./user-button.component.scss']
})
export class UserButtonComponent implements OnInit {

  constructor(
    private authService: AuthService) { }

  ngOnInit(): void {
  }


  isLoggedIn() {
    return this.authService.isLoggedIn;
  }
  logout() {
    return this.authService.signOut();
  }
}
