import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Constants } from '../../constants';
import { CookieService } from 'ngx-cookie-service';
import { MessageComponent } from '../../message/message.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public isSubmitted = false;
  public loginForm: FormGroup;
  public emailPattern = Constants.PATTERN;
  public snackBarMessage = Constants.ERROR_MESSAGE;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private cookieService: CookieService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(this.emailPattern)
      ])),
      password: new FormControl('', Validators.required),
    });
  }

  get f() { return this.loginForm.controls; }

  // Login API called.
  public onClickLogin(): void {
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    // tslint:disable-next-line:max-line-length
    if ((this.cookieService.get('email') === this.loginForm.value.email) && (this.cookieService.get('password') === this.loginForm.value.password)) {
      this.router.navigate(['/dashboard']);
    } else {
      this.snackBar.openFromComponent(MessageComponent, {
        duration: ((0.5 * this.snackBarMessage.split(' ').length) + 1) * 1000,
        data: this.snackBarMessage,
      });
    }

  }

}
