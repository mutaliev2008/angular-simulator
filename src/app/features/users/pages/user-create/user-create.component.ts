import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../../../services/user.service';
import { IUser } from '../../../../../interface/IUser';
import { GradientBorderDirective } from '../../../../shared/derectives/gradient-border.directive';

@Component({
  selector: 'app-user-create',
  imports: [ReactiveFormsModule, GradientBorderDirective],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss',
})
export class UserCreateComponent {

  userService: UserService = inject(UserService);
  fb: FormBuilder = inject(FormBuilder);
  
  createForm: FormGroup = this.fb.group({
    name: ['rfwerfwf', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    username: ['wrfwerf', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    phone: ['2452352345245', [Validators.required, Validators.minLength(10), Validators.maxLength(24)]],
    email: ['mdmdm@gmail.com', [Validators.email, Validators.required, Validators.maxLength(100)]],
    website: ['wfwrwerf', [Validators.maxLength(100)]],
    address: this.fb.group({
      city: ['werfwerfw', [Validators.required, Validators.maxLength(50)]],
      street: ['werfwerf', [Validators.required, Validators.maxLength(100)]],
      suite:['weerfwerf', [Validators.required, Validators.maxLength(50)]],
      zipcode: ['werfwerf', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      geo: this.fb.group({
        lat: ['werfwerf', [Validators.required]],
        lng: ['wewrfwer', [Validators.required]]
    }),
    }),
    company: this.fb.group({
      name: ['dfvwe', [Validators.required, Validators.maxLength(50)]],
      catchPhrase: ['qwwqfrfwer', [Validators.maxLength(200)]],
      bs: ['qrfqr', [Validators.maxLength(100)]]
    })
  })

  createUser(): void {
    const data: Omit<IUser, 'id'> = this.createForm.getRawValue();

    if(this.createForm.valid) {
      this.userService.createUsers({ id: Date.now(), ...data });
      this.createForm.reset();
    } 
  }

}