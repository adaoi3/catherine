import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {


  incorrectCredentials = false;

  createUserForm = this.formBuilder.group({
    login: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(25)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(30)
    ]),
  }, {
    validators: []
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {
  }

  getErrorMessage(formControl: FormControl) {
    if (formControl.hasError('required')) {
      return 'You must enter a value';
    }
    if (formControl.hasError('minlength')) {
      return 'Not enough characters entered';
    }
    if (formControl.hasError('maxlength')) {
      return 'Too many characters';
    }
    return 'Incorrect login or password';
  }

  onSubmit(formDirective: FormGroupDirective): void {
    localStorage.removeItem('token');
    if (this.createUserForm.valid) {
      this.authService.getToken({
        login: this.createUserForm.value.login || '',
        password: this.createUserForm.value.password || ''
      }).subscribe({
        next: token => {
          localStorage.setItem('token', token.token);
          this.createUserForm.reset();
          formDirective.resetForm();
          this.router.navigate(['/home'], {relativeTo: this.activatedRoute}).then(r => '');
        },
        error: () => {this.incorrectCredentials = true;},
        complete: () => {this.incorrectCredentials = false;}
      })
    }
  }

}
