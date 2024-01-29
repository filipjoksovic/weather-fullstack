import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SignupFormComponent } from '@auth/components/signup-form/signup-form.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, SignupFormComponent],
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {}
