import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  computed,
  inject,
} from '@angular/core';
import { CurrentWeather } from '../../../current-weather/models/current-weather.model';
import { WeatherMeasurementComponent } from '../../components/weather-measurment/weather-measurement.component';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { CurrentWeatherDataService } from '../../../current-weather/services/data/current-weather.data.service';
import { delay, map, tap } from 'rxjs';
import { SkeletonModule } from 'primeng/skeleton';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DataState } from '@core/models/data.state.enum';
import { SignalState } from '@core/models/signal-state';
import { ComponentState } from '@core/models/component.state';
import {
  WeatherMeasurementComponentDisplaySettings,
  displaySettings,
} from '@current-weather/models/weather-measurment.config';

@Component({
  selector: 'app-weather-measurements',
  standalone: true,
  imports: [
    CommonModule,
    WeatherMeasurementComponent,
    SkeletonModule,
    DialogModule,
    ButtonModule,
  ],
  templateUrl: `./weather-measurements.component.html`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherMeasurementsComponent {
  private readonly currentWeatherDataService = inject(
    CurrentWeatherDataService
  );

  weather: Signal<ComponentState<CurrentWeather>> = toSignal(
    toObservable(this.currentWeatherDataService.currentWeather).pipe(
      delay(300),
      tap(data => console.log('Raw data', data)),
      map(
        (data: SignalState<CurrentWeather>) =>
          ({
            data: data.data,
            state: data.state,
          }) as ComponentState<CurrentWeather>
      )
    ),
    {
      initialValue: {
        state: DataState.UNDEFINED,
      } as ComponentState<CurrentWeather>,
    }
  );
  weatherDisplaySettings = computed(() => {
    return this.weather().data.measurements.map(measurement => {
      console.log('Measurement', measurement);
      console.log('Display settings', displaySettings[measurement.key]);

      return {
        ...displaySettings[measurement.key],
        key: measurement.key,
        value: measurement.value,
        unit: measurement.unit,
      } as WeatherMeasurementComponentDisplaySettings;
    });
  });

  protected DataState = DataState;

  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }
}
