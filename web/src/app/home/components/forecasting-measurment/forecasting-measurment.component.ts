import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { ForecastMeasurement } from '../../../forecast/models/forecast-weather.model';
import { SliderModule } from 'primeng/slider';
import { FormsModule } from '@angular/forms';
import { UnitValueToStringPipe } from '../../../core/pipes/unit-value-to-string.pipe';
import { DayOfWeekPipe } from '../../../core/pipes/day-of-week.pipe';
import { isToday } from 'date-fns';

@Component({
  selector: 'app-forecasting-measurement',
  standalone: true,
  imports: [
    CommonModule,
    SliderModule,
    FormsModule,
    UnitValueToStringPipe,
    DayOfWeekPipe,
  ],
  templateUrl: './forecasting-measurment.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForecastingMeasurementComponent implements OnInit {
  @Input({ required: true })
  measurement!: ForecastMeasurement;

  public isToday: boolean = false;

  ngOnInit(): void {
    console.log('Checking for', this.measurement.date);

    this.isToday = isToday(new Date(this.measurement.date));
  }
}