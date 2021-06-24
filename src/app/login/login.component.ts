import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errorMessage: string = null;
  loading = false;

  constructor(private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.authService.signOut();
  }

  login(email: string, password: string, button: HTMLButtonElement) {


    this.errorMessage = null;
    this.loading = true;
    button.disabled = true;

    this.authService.signIn(email, password)
      .then(() => {
        // forward to redirect url
        this.redirectApp();
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

  redirectApp() {
    console.log('Auth finished! Redirecting user...');
    const redirectUrl = this.route.snapshot.queryParamMap.get('redirectUrl');
    console.log("redirecturl", redirectUrl);

    if (redirectUrl) {
      this.router.navigate([redirectUrl]);
    } else {
      this.router.navigate(['']);
    }
  }

}
