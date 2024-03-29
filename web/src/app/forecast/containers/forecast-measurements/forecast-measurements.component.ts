import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  inject,
} from '@angular/core';
import { ForecastWeather } from '../../../forecast/models/forecast-weather.model';
import { DataViewModule } from 'primeng/dataview';
import { SliderModule } from 'primeng/slider';
import { FormsModule } from '@angular/forms';
import { DayOfWeekPipe } from '../../../core/pipes/day-of-week.pipe';
import { UnitValueToStringPipe } from '../../../core/pipes/unit-value-to-string.pipe';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { filter, map, tap } from 'rxjs';
import { SkeletonModule } from 'primeng/skeleton';
import { ForecastDataService } from '@forecast/services/data/forecast.data.service';
import { SignalState } from '@core/models/signal-state';
import { DataState } from '@core/models/data.state.enum';
import { ForecastingMeasurementComponent } from '@forecast/components/forecasting-measurment/forecasting-measurment.component';
import { ComponentState } from '@core/models/component.state';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForecastMeasurementsComponent {
  private readonly forecastWeatherDataService = inject(ForecastDataService);

  public forecast: Signal<ComponentState<ForecastWeather>> = toSignal(
    toObservable(this.forecastWeatherDataService.forecast).pipe(
      filter(data => data.state === DataState.LOADED),
      map(
        (
          response: SignalState<ForecastWeather>
        ): ComponentState<ForecastWeather> =>
          ({
            data: response.data,
            state: response.state,
          }) as ComponentState<ForecastWeather>
      )
    ),
    {
      initialValue: {
        state: DataState.UNDEFINED,
      } as ComponentState<ForecastWeather>,
    }
  );
  protected DataState = DataState;
}
