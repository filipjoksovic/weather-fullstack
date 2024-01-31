import { Component, inject } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { formatDate } from 'date-fns';
import { getTimeFormats, TimeFormatConfig } from '@core/models/time-format';
import { DateFormatConfig, getDateFormats } from '@core/models/date-format';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserStoreService } from '../../services/user.store.service';
import { UserData } from '../../models/user-data.model';

@Component({
  selector: 'app-data-formatting',
  standalone: true,
  imports: [DropdownModule, ReactiveFormsModule],
  templateUrl: './data-formatting.component.html',
  styleUrl: './data-formatting.component.scss',
})
export class DataFormattingComponent {
  private readonly fb = inject(FormBuilder);
  private readonly userStore = inject(UserStoreService);

  constructor() {
    for (const dateFormat of this.dateFormats) {
      dateFormat.name = `${dateFormat.name} (${formatDate(new Date(), dateFormat.format)})`;
    }

    for (const timeFormat of this.timeFormats) {
      timeFormat.name = `${timeFormat.name} (${formatDate(new Date(), timeFormat.format)})`;
    }

    this.dataFormattingForm.controls.dateFormat.valueChanges.subscribe(
      value => {
        console.log('here');
        this.userStore.updateUserSettings('dateFormat', value ?? ''); //TODO fallback to default
      }
    );

    this.dataFormattingForm.controls.timeFormat.valueChanges.subscribe(
      value => {
        this.userStore.updateUserSettings('timeFormat', value ?? ''); //TODO fallback to default;
      }
    );
  }

  public user = this.userStore.user;

  public timeFormats: TimeFormatConfig[] = getTimeFormats();

  public dateFormats: DateFormatConfig[] = getDateFormats();

  public dataFormattingForm = this.fb.group({
    timeFormat: new FormControl(
      this.user()?.userSettings.timeFormat ?? this.timeFormats[0].key
    ),
    dateFormat: new FormControl(
      this.user()?.userSettings.dateFormat ?? this.dateFormats[0].key
    ),
  });
}
