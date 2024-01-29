import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { formatDate } from 'date-fns';
import { TimeFormatConfig, getTimeFormats } from '@core/models/time-format';
import { DateFormatConfig, getDateFormats } from '@core/models/date-format';

@Component({
  selector: 'app-personal-settings',
  standalone: true,
  imports: [InputTextModule, DividerModule, DropdownModule],
  templateUrl: './personal-settings.component.html',
  styleUrl: './personal-settings.component.scss',
})
export class PersonalSettingsComponent {
  public timeFormats: TimeFormatConfig[] = getTimeFormats();

  public dateFormats: DateFormatConfig[] = getDateFormats();

  constructor() {
    for (const dateFormat of this.dateFormats) {
      dateFormat.name = formatDate(new Date(), dateFormat.format);
    }

    for (const timeFormat of this.timeFormats) {
      timeFormat.name = formatDate(new Date(), timeFormat.format);
    }
  }
}
