import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { AuthService } from '@auth/services/data/auth.service';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [
    CommonModule,
    CommonModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordModule,
  ],
  templateUrl: './signup-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);

  public signupForm: FormGroup<{
    email: FormControl<string | null>;
    password: FormControl<string | null>;
  }> = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  public onSubmit() {
    this.authService.signup(this.signupForm.value);
  }
}
