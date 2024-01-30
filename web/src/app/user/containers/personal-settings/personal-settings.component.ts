import { Component, effect, inject, Signal } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { formatDate, isThisHour } from 'date-fns';
import { TimeFormatConfig, getTimeFormats } from '@core/models/time-format';
import { DateFormatConfig, getDateFormats } from '@core/models/date-format';
import {
  Form,
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
import { StoredUserData, UserData } from '../../models/user-data.model';
import { UserStoreService } from '../../services/user.store.service';
import { filter, map, pairwise, startWith } from 'rxjs';

export type PersonalDetailsFormKeys = Record<
  keyof Pick<StoredUserData, 'firstName' | 'lastName' | 'email'>,
  FormControl<string | null>
>;

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

    effect(() => {});

    //TODO improve typings for this stream
    this.personalSettingsForm.valueChanges
      .pipe(
        startWith(this.personalSettingsForm.value),
        pairwise(),
        map(([prev, next]: [any, any]) => {
          const changes: { key: keyof StoredUserData; value: string }[] = [];
          for (const key in next) {
            const trimmedPrev = prev[key].trim();
            const trimmerNext = next[key].trim();
            if (trimmedPrev !== trimmerNext && trimmedPrev !== undefined) {
              changes.push({
                key: key as keyof StoredUserData,
                value: trimmerNext,
              });
            }
          }
          return changes;
        }),
        filter(changes => Object.keys(changes).length !== 0),
        untilDestroyed(this)
      )
      .subscribe(updated => {
        updated.forEach(update => {
          this.userStoreService.updateUserDetails(update.key, update.value);
        });
      });
  }

  public timeFormats: TimeFormatConfig[] = getTimeFormats();

  public dateFormats: DateFormatConfig[] = getDateFormats();

  public personalSettingsForm: FormGroup<PersonalDetailsFormKeys> =
    this.fb.group({
      firstName: new FormControl(this.user()?.firstName ?? '', {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      lastName: new FormControl(this.user()?.lastName ?? '', {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      email: new FormControl(this.user()?.email ?? '', {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
    });

  updateUserDetails(formKey: keyof StoredUserData, event: FocusEvent) {
    this.userStoreService.updateUserDetails(
      formKey,
      (event.target as any).value
    );
  }
}
