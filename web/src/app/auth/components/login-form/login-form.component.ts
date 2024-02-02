import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '@auth/services/data/auth.service';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordModule,
    RouterLink,
  ],
  templateUrl: './login-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);

  public loginForm: FormGroup<{
    email: FormControl<string | null>;
    password: FormControl<string | null>;
  }> = this.fb.group({
    email: new FormControl('', []),
    password: new FormControl('', []),
  });

  public onSubmit() {
    this.authService.login(this.loginForm.value);
  }
}
