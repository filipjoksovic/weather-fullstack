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
import { WeatherMeasurementComponentDisplaySettings } from '@current-weather/models/weather-measurment.config';
import { DraggableDirective } from '@core/directives/draggable.directive';
import { KnobModule } from 'primeng/knob';
import { FormsModule } from '@angular/forms';
import { WeatherIconComponent } from '../../../core/components/weather-icon/weather-icon.component';
import { WeatherCode } from '@core/models/api/response/weather-code.enum';

@Component({
  selector: 'app-weather-measurement',
  standalone: true,
  templateUrl: `./weather-measurement.component.html`,
  styleUrl: './weather-measurement.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    PanelModule,
    DialogModule,
    ButtonModule,
    DraggableDirective,
    KnobModule,
    FormsModule,
    WeatherIconComponent,
  ],
})
export class WeatherMeasurementComponent implements OnInit {
  private readonly forecastDetailsService = inject(ForecastDetailsService);
  WeatherCode = WeatherCode;

  measurementClicked() {
    this.forecastDetailsService.showParams(this.measurement.key);
  }

  @Input({ required: true })
  measurement!: WeatherMeasurementComponentDisplaySettings;
  public isCollapsed: boolean = false;
  @Input({ required: false })
  public containerClass: string = '';

  ngOnInit(): void {}

  toNumber(value: string | number): WeatherCode {
    return Number(value) as WeatherCode;
  }
}
