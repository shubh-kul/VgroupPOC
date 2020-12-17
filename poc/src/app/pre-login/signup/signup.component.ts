import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Constants } from '../../constants';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageComponent } from '../../message/message.component';

export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public isSubmitted = false;
  public signupForm: FormGroup;
  public emailPattern = Constants.PATTERN;
  public snackBarMessage = Constants.SUCCESS_MESSAGE;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private cookieService: CookieService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required],
    },
      {
        validator: MustMatch('password', 'confirm_password')
      });
  }

  get f() { return this.signupForm.controls; }

  // Submit Signup request. and called API
  public onClickSubmit(): void {
    this.isSubmitted = true;
    if (this.signupForm.invalid) {
      return;
    }
    this.cookieService.set('email', this.signupForm.value.email);
    this.cookieService.set('password', this.signupForm.value.password);
    this.snackBar.openFromComponent(MessageComponent, {
      duration: ((0.5 * this.snackBarMessage.split(' ').length) + 1) * 1000,
      data: this.snackBarMessage,
    });
    this.router.navigate(['/login']);
  }

}
