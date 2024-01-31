import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { SliderModule } from 'primeng/slider';
import { FormsModule } from '@angular/forms';
import { UnitValueToStringPipe } from '../../../core/pipes/unit-value-to-string.pipe';
import { DayOfWeekPipe } from '../../../core/pipes/day-of-week.pipe';
import { isToday } from 'date-fns';
import { ForecastMeasurement } from '../../../forecast/models/forecast-weather.model';
import { WeatherIconComponent } from '../../../core/components/weather-icon/weather-icon.component';

@Component({
  selector: 'app-forecasting-measurement',
  standalone: true,
  templateUrl: './forecasting-measurment.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    SliderModule,
    FormsModule,
    UnitValueToStringPipe,
    DayOfWeekPipe,
    WeatherIconComponent,
  ],
})
export class ForecastingMeasurementComponent implements OnInit {
  @Input({ required: true })
  measurement!: ForecastMeasurement;

  public isToday: boolean = false;

  ngOnInit(): void {
    this.isToday = isToday(new Date(this.measurement.date));
  }
}
