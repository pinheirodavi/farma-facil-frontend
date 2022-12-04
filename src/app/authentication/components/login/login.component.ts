import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = this.form.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  hidePassword = true;

  constructor(
    private authenticationService: AuthenticationService,
    private form: UntypedFormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login() {
    this.authenticationService
      .authenticate(this.loginForm.value)
      .toPromise()
      .then((response) => {
        if (response) {
          this.router.navigate(['/home']);
        }
      });
  }
}
