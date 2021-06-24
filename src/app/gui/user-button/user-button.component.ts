import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'user-button',
  templateUrl: './user-button.component.html',
  styleUrls: ['./user-button.component.scss']
})
export class UserButtonComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router) { }

  isLoggedIn: Observable<boolean>

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }


  logout() {
    this.authService.signOut().then(() => {
      this.router.navigate(['/home']);
    })
  }
}
