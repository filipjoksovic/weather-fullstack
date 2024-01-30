import { Component, inject, Input, Signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { filter, map, pairwise, startWith } from 'rxjs';
import { StoredUserData, UserData } from '../../models/user-data.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { PersonalDetailsFormKeys } from '../../containers/personal-settings/personal-settings.component';
import { UserStoreService } from '../../services/user.store.service';

@UntilDestroy()
@Component({
  selector: 'app-personal-details',
  standalone: true,
  imports: [FormsModule, InputTextModule, ReactiveFormsModule],
  templateUrl: './personal-details.component.html',
  styleUrl: './personal-details.component.scss',
})
export class PersonalDetailsComponent {
  private readonly fb = inject(FormBuilder);
  private readonly userStoreService = inject(UserStoreService);

  user: Signal<UserData | null | undefined> = this.userStoreService.user;

  constructor() {
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
}
