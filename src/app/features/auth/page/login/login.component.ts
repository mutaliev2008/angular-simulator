import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ICredentials } from '../../interface/ICredentials ';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from '../../../../../services/message.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);
  messageService: MessageService = inject(MessageService);

  private fb: FormBuilder = inject(FormBuilder);

  loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  submit(): void {
    if (this.loginForm.valid) {
      const credentials: ICredentials = this.loginForm.value;
      
      this.authService.login(credentials).pipe(
        tap(() => {
          this.router.navigate(['/']);
          this.messageService.showSuccess('Вход прошел успешно');          
        }),
        catchError((error:HttpErrorResponse) => {
          this.messageService.showError(error.error.message);
          return throwError(() => error);
        })
      ).subscribe();
    }
  }

}
