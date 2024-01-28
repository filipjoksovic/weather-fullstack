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
import {
  WeatherMeasurementComponentDisplaySettings,
  displaySettings,
} from '@current-weather/models/weather-measurment.config';

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
