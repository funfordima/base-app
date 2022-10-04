import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserFormModel } from './models/user-form.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent {
  // alternative approach
  @ViewChild('signUpForm') signUpForm?: NgForm;

  defaultQuestion = 'pet';
  answer = '';
  genders = ['male', 'female'];
  user: UserFormModel = {};
  isSubmitted = false;

  suggestUserName() {
    const suggestedName = 'Superuser';

    this.signUpForm?.form.patchValue({
      userData: {
        userName: suggestedName,
      },
    });
  }

  // onSubmit(form: NgForm): void {
  //   console.error('submit form', form);
  // }

  onSubmit(): void {
    this.isSubmitted = true;
    this.user.name = this.signUpForm?.value.userData.userName;
    this.user.email = this.signUpForm?.value.userData.email;
    this.user.answer = this.signUpForm?.value.questionAnswer;
    this.user.gender = this.signUpForm?.value.gender;
    this.user.secret = this.signUpForm?.value.secret;

    this.signUpForm?.reset();
  }
}
