import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { DataState } from '@core/models/data.state.enum';
import { GeoLocationService } from '@core/services/geolocation.service';
import { CurrentWeatherDataService } from '@current-weather/services/data/current-weather.data.service';
import getUnicodeFlagIcon from 'country-flag-icons/unicode';
import { WeatherIconComponent } from '../../../core/components/weather-icon/weather-icon.component';
import { CurrentWeatherModelKeys } from '@current-weather/models/cw-req-keys.map';
import { getMeasurement } from '@current-weather/models/current-weather.model';
import { UnitValueToStringPipe } from '../../../core/pipes/unit-value-to-string.pipe';
import { WeatherCode } from '@core/models/api/response/weather-code.enum';
import { ChipModule } from 'primeng/chip';
import { WeatherMeasurementComponent } from '../../../current-weather/components/weather-measurment/weather-measurement.component';
import {
  WeatherMeasurementComponentDisplaySettings,
  displaySettings,
} from '@current-weather/models/weather-measurment.config';

@Component({
  selector: 'app-current-location',
  standalone: true,
  templateUrl: './current-location.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    WeatherIconComponent,
    UnitValueToStringPipe,
    ChipModule,
    WeatherMeasurementComponent,
  ],
})
export class CurrentLocationComponent {
  toNumber(value: string | number | undefined): WeatherCode {
    return Number(value) as WeatherCode;
  }
  private readonly geoLocationService = inject(GeoLocationService);
  private readonly currentWeatherService = inject(CurrentWeatherDataService);

  location = this.geoLocationService.locationDetails;
  DataState = DataState;
  getCountryIcon = getUnicodeFlagIcon;
  weather = computed(() => {
    if (
      this.currentWeatherService.currentWeather().state === DataState.LOADED
    ) {
      return {
        weatherCode: getMeasurement(
          this.currentWeatherService.currentWeather().data,
          CurrentWeatherModelKeys.weatherCode
        ),
        temperature: getMeasurement(
          this.currentWeatherService.currentWeather().data,
          CurrentWeatherModelKeys.temperature
        ),

        apparentTemperature: getMeasurement(
          this.currentWeatherService.currentWeather().data,
          CurrentWeatherModelKeys.apparentTemperature
        ),
      };
    }
    return null;
  });
}
