import { Component, effect, inject, Signal } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { formatDate, isThisHour } from 'date-fns';
import { TimeFormatConfig, getTimeFormats } from '@core/models/time-format';
import { DateFormatConfig, getDateFormats } from '@core/models/date-format';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '@auth/services/data/auth.service';
import { AuthStoreService } from '@auth/services/auth.store.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { toSignal } from '@angular/core/rxjs-interop';
import { UserData } from '../../models/user-data.model';
import { UserStoreService } from '../../services/user.store.service';

@UntilDestroy()
@Component({
  selector: 'app-personal-settings',
  standalone: true,
  imports: [
    InputTextModule,
    DividerModule,
    DropdownModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './personal-settings.component.html',
  styleUrl: './personal-settings.component.scss',
})
export class PersonalSettingsComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthStoreService);
  private readonly userStoreService = inject(UserStoreService);

  user: Signal<UserData | null | undefined> = this.userStoreService.user;
  constructor() {
    for (const dateFormat of this.dateFormats) {
      dateFormat.name = formatDate(new Date(), dateFormat.format);
    }

    for (const timeFormat of this.timeFormats) {
      timeFormat.name = formatDate(new Date(), timeFormat.format);
    }

    effect(() => {
      if (this.user()) {
        this.personalSettingsForm.setValue({
          firstName: this.user()!.firstName,
          lastName: this.user()!.lastName,
          email: this.user()!.email,
        });
      }
    });
  }

  public timeFormats: TimeFormatConfig[] = getTimeFormats();

  public dateFormats: DateFormatConfig[] = getDateFormats();

  public personalSettingsForm: FormGroup<{
    firstName: FormControl<string | null>;
    lastName: FormControl<string | null>;
    email: FormControl<string | null>;
  }> = this.fb.group({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email]),
  });

  updateUserDetails(formKey: string, event: FocusEvent) {
    this.userStoreService.updateUserDetails(
      formKey,
      (event.target as any).value
    );
  }
}
