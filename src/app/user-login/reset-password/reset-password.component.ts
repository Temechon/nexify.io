import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  errorMessage: string = null;
  successMessage: string = null;
  loading = false;

  user = {
    email: '',
  }

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  resetPassword(button: HTMLButtonElement) {

    this.errorMessage = null;
    this.successMessage = null;
    this.loading = true;
    button.disabled = true;
    this.authService.sendPasswordReset(this.user.email).then(() => {
      // forward to redirect url
      this.successMessage = "Check your email to reset your password."
    })
      .catch((error) => {
        console.log('Error password reset', error)
        this.errorMessage = error.message;
      })
      .finally(() => {
        this.loading = false;
        button.disabled = false;
      })
  }

}
