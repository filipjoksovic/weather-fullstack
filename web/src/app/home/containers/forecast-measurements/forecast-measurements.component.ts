import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Signal,
  inject,
} from '@angular/core';
import { ForecastWeather } from '../../../forecast/models/forecast-weather.model';
import { DataViewModule } from 'primeng/dataview';
import { SliderModule } from 'primeng/slider';
import { FormsModule } from '@angular/forms';
import { DayOfWeekPipe } from '../../../core/pipes/day-of-week.pipe';
import { UnitValueToStringPipe } from '../../../core/pipes/unit-value-to-string.pipe';
import { toSignal } from '@angular/core/rxjs-interop';
import { ForecastDataService } from '../../../forecast/services/data/forecast.data.service';
import { ComponentState } from '../home/home.component';
import { DataState } from '../../../core/services/location.service';
import { delay, map, tap } from 'rxjs';
import { SkeletonModule } from 'primeng/skeleton';
import { ForecastingMeasurementComponent } from '../../components/forecasting-measurment/forecasting-measurment.component';

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
    SkeletonModule,
    ForecastingMeasurementComponent,
  ],
  templateUrl: './forecast-measurements.component.html',
  styleUrl: './forecast-measurements.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForecastMeasurementsComponent {
  private readonly forecastWeatherDataService = inject(ForecastDataService);

  public forecast: Signal<ComponentState<ForecastWeather>> = toSignal(
    this.forecastWeatherDataService.getBasicForecast().pipe(
      delay(2000),
      tap(console.log),
      map(
        (response: ForecastWeather): ComponentState<ForecastWeather> => ({
          data: response,
          state: DataState.LOADED,
        })
      )
    ),
    {
      initialValue: {
        state: DataState.LOADING,
      } as ComponentState<ForecastWeather>,
    }
  );
  protected DataState = DataState;
}
