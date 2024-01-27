import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ForecastWeather } from '../../../forecast/models/forecast-weather.model';
import { DataViewModule } from 'primeng/dataview';
import { SliderModule } from 'primeng/slider';
import { FormsModule } from '@angular/forms';
import { DayOfWeekPipe } from '../../../core/pipes/day-of-week.pipe';
import { UnitValueToStringPipe } from '../../../core/pipes/unit-value-to-string.pipe';

@Component({
  selector: 'app-forecast-measurements',
  standalone: true,
  imports: [
    CommonModule,
    DataViewModule,
    SliderModule,
    FormsModule,
    DayOfWeekPipe,
    UnitValueToStringPipe,
  ],
  templateUrl: './forecast-measurements.component.html',
  styleUrl: './forecast-measurements.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForecastMeasurementsComponent {
  @Input({ required: true })
  public forecast!: ForecastWeather;
}
