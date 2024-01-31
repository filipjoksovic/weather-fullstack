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
import { UntilDestroy } from '@ngneat/until-destroy';
import { StoredUserData } from '../../models/user-data.model';
import { UserStoreService } from '../../services/user.store.service';
import { PersonalDetailsComponent } from '../../components/personal-details/personal-details.component';
import { DataFormattingComponent } from '../../components/data-formatting/data-formatting.component';
import { UnitSettingsComponent } from '../unit-settings/unit-settings.component';

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
    PersonalDetailsComponent,
    PersonalDetailsComponent,
    DataFormattingComponent,
    UnitSettingsComponent,
  ],
  templateUrl: './personal-settings.component.html',
  styleUrl: './personal-settings.component.scss',
})
export class PersonalSettingsComponent {
  private readonly authService = inject(AuthStoreService);
  private readonly userStoreService = inject(UserStoreService);

  constructor() {}
}
