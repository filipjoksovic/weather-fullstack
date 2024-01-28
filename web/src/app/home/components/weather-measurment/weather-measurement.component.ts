import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ForecastDetailsService } from '../../../forecast-details/services/data/forecast-details.service';
import { CurrentWeatherModelKeys } from '../../../current-weather/models/cw-req-keys.map';
import { BaseUnit } from '../../../core/models/api/response/base.unit';

export type WeatherMeasurementComponentDisplaySettings = {
  key: CurrentWeatherModelKeys;
  icon: string;
  title: string;
  value?: number | string;
  unit?: BaseUnit;
};

export const displaySettings: {
  [key in CurrentWeatherModelKeys]: WeatherMeasurementComponentDisplaySettings;
} = {
  [CurrentWeatherModelKeys.apparentTemperature]: {
    key: CurrentWeatherModelKeys.apparentTemperature,
    icon: 'fa fa-temperature-half',
    title: 'Apparent temperature',
  },
  [CurrentWeatherModelKeys.surfacePressure]: {
    key: CurrentWeatherModelKeys.surfacePressure,
    icon: 'fa fa-gauge',
    title: 'Surface pressure',
  },
  [CurrentWeatherModelKeys.temperature]: {
    key: CurrentWeatherModelKeys.temperature,
    icon: 'fa fa-temperature-full',
    title: 'Temperature',
  },
  [CurrentWeatherModelKeys.cloudCover]: {
    key: CurrentWeatherModelKeys.cloudCover,
    icon: 'fa fa-cloud',
    title: 'Cloud cover',
  },
  [CurrentWeatherModelKeys.humidity]: {
    key: CurrentWeatherModelKeys.humidity,
    icon: 'fa fa-droplet',
    title: 'Humidity',
  },
  [CurrentWeatherModelKeys.precipitation]: {
    key: CurrentWeatherModelKeys.precipitation,
    icon: 'fa fa-umbrella',
    title: 'Precipitation',
  },
  [CurrentWeatherModelKeys.pressure]: {
    key: CurrentWeatherModelKeys.pressure,
    icon: 'fa fa-gauge',
    title: 'Pressure',
  },
  [CurrentWeatherModelKeys.rain]: {
    key: CurrentWeatherModelKeys.rain,
    icon: 'fa fa-cloud-rain',
    title: 'Rain',
  },
  [CurrentWeatherModelKeys.showers]: {
    key: CurrentWeatherModelKeys.showers,
    icon: 'fa-solid fa-cloud-showers-heavy',
    title: 'Showers',
  },
  [CurrentWeatherModelKeys.snowfall]: {
    key: CurrentWeatherModelKeys.snowfall,
    icon: 'fa fa-snowflake',
    title: 'Snowfall',
  },
  [CurrentWeatherModelKeys.time]: {
    key: CurrentWeatherModelKeys.time,
    icon: 'fa fa-clock',
    title: 'Time',
  },
  [CurrentWeatherModelKeys.windDirection]: {
    key: CurrentWeatherModelKeys.windDirection,
    icon: 'fa fa-compass',
    title: 'Wind direction',
  },
  [CurrentWeatherModelKeys.windGusts]: {
    key: CurrentWeatherModelKeys.windGusts,
    icon: 'fa fa-user',
    title: 'Wind gusts',
  },
  [CurrentWeatherModelKeys.windSpeed]: {
    key: CurrentWeatherModelKeys.windSpeed,
    icon: 'fa fa-wind',
    title: 'Wind speed',
  },
};

@Component({
  selector: 'app-weather-measurement',
  standalone: true,
  imports: [CommonModule, PanelModule, DialogModule, ButtonModule],
  templateUrl: `./weather-measurement.component.html`,
  styleUrl: './weather-measurement.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherMeasurementComponent implements OnInit {
  private readonly forecastDetailsService = inject(ForecastDetailsService);

  measurementClicked() {
    this.forecastDetailsService.showParams(this.viewModel.key);
  }

  public viewModel: WeatherMeasurementComponentDisplaySettings =
    displaySettings[CurrentWeatherModelKeys.apparentTemperature];

  @Input({ required: true })
  unit!: BaseUnit;
  @Input({ required: true })
  value!: number | string;
  @Input({ required: true })
  measurementKey!: CurrentWeatherModelKeys;
  public isCollapsed: boolean = false;

  ngOnInit(): void {
    this.viewModel = displaySettings[this.measurementKey];
    this.viewModel = {
      ...this.viewModel,
      value: this.value,
      unit: this.unit,
    };
    console.log('View model', this.viewModel);
  }
}
