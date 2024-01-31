import { Component, inject } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthStoreService } from '@auth/services/auth.store.service';
import { UntilDestroy } from '@ngneat/until-destroy';
import { UserStoreService } from '../../services/user.store.service';
import { PersonalDetailsComponent } from '../../components/personal-details/personal-details.component';
import { DataFormattingComponent } from '../../components/data-formatting/data-formatting.component';
import { UnitSettingsComponent } from '../unit-settings/unit-settings.component';
import { UserData } from 'app/user/models/user-data.model';

export type PersonalDetailsFormKeys = Record<
  keyof Pick<UserData, 'firstName' | 'lastName' | 'email'>,
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
