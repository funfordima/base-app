import { FormGroup, FormControl, Validators, FormArray, AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReactiveFormComponent implements OnInit {
  genders = ['male', 'female'];
  signUpForm?: FormGroup;

  private readonly forbiddenUserNames = ['Jon', 'Jane'];
  private readonly forbiddenEmails = ['test@test.com', 'test@gmail.com'];

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      userData: new FormGroup({
        userName: new FormControl(null, [Validators.required, Validators.maxLength(30), this.forbiddenNamesValidator.bind(this)]),
        email: new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmailAsyncValidator()),
      }),
      gender: new FormControl('male', Validators.required),
      hobbies: new FormArray([]),
    });

    this.signUpForm.patchValue({
      userData: {
        userName: "Jack",
      },
    });
  }

  onSubmit(): void {
    console.error(this.signUpForm?.value);
  }

  onAddHobby(): void {
    const control = new FormControl(null, Validators.required);

    (<FormArray>this.signUpForm?.get('hobbies')).push(control);
  }

  getHobbiesControl(): AbstractControl[] {
    return (<FormArray>this.signUpForm?.get('hobbies'))?.controls;
  }

  private forbiddenNamesValidator(control: FormControl): { [key: string]: boolean } | null {
    if (this.forbiddenUserNames.includes(control.value)) {
      return {
        nameIsForbidden: true,
      };
    }

    return null;
  }

  private forbiddenEmailAsyncValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> => {
      const promise = new Promise<ValidationErrors | null>((resolve, reject) => {
        setTimeout(() => {
          if (this.forbiddenEmails.includes(control.value)) {
            resolve({
              isForbiddenEmail: true,
            });
          } else {
            resolve(null);
          }
        }, 1500);
      });

      return promise;
    };
  }
}
