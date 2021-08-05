import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent implements OnInit {

  errorMessage: string = null;
  successMessage: string = null;
  loading = false;

  user = {
    name: '',
    email: '',
    password: ''
  }

  constructor(private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
  }

  signup(email: string, password: string, button: HTMLButtonElement) {


    this.errorMessage = null;
    this.successMessage = null;
    this.loading = true;
    button.disabled = true;

    this.authService.signUp(email, password)
      .then(() => {
        // forward to redirect url
        this.successMessage = "Account successfully created!"
        setTimeout(() => {
          this.router.navigateByUrl('home');
        }, 200)
      })
      .catch((error) => {
        console.log('erreur authent', error)
        this.errorMessage = error.message;
      })
      .finally(() => {
        this.loading = false;
        button.disabled = false;
      })
  }
}
