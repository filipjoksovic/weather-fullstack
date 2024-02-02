import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewChild,
  effect,
  inject,
} from '@angular/core';
import { SliderModule } from 'primeng/slider';
import { FormsModule } from '@angular/forms';
import { UnitValueToStringPipe } from '../../../core/pipes/unit-value-to-string.pipe';
import { DayOfWeekPipe } from '../../../core/pipes/day-of-week.pipe';
import { format, isToday } from 'date-fns';
import { ForecastMeasurement } from '../../../forecast/models/forecast-weather.model';
import { WeatherIconComponent } from '../../../core/components/weather-icon/weather-icon.component';
import { OverlayModule } from 'primeng/overlay';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';
import { ForecastDataService } from '@forecast/services/data/forecast.data.service';
import { ChartModule } from 'primeng/chart';
import {
  ForecastDetailsRequestParams,
  dailyForecastParamsToText,
} from 'app/forecast-details/models/api/request/forecast-details-request.params';
import { DataState } from '@core/models/data.state.enum';
import {
  getDefaultChartOptions,
  getGradient,
} from '@core/models/chart.options';
import { ChartData, ChartOptions } from 'chart.js';

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
    OverlayModule,
    OverlayPanelModule,
    ChartModule,
  ],
})
export class ForecastingMeasurementComponent implements OnInit {
  private readonly forecastService: ForecastDataService =
    inject(ForecastDataService);
  DataState = DataState;

  constructor() {
    effect(() => {
      if (this.hourlyForecast().state === DataState.LOADED) {
        console.log(Object.keys(this.hourlyForecast().data.hourly_units));
        this.data = Object.keys(this.hourlyForecast().data.hourly_units)
          .filter(
            key =>
              dailyForecastParamsToText[
                key as any as ForecastDetailsRequestParams
              ] !== undefined
          )
          .map((key: any) => {
            return {
              labels: this.hourlyForecast().data.hourly.time.map(x =>
                format(x.toString(), 'HH:mm')
              ),
              datasets: [
                {
                  label:
                    dailyForecastParamsToText[
                      key as any as ForecastDetailsRequestParams
                    ],
                  labels: [
                    dailyForecastParamsToText[
                      key as any as ForecastDetailsRequestParams
                    ],
                  ],
                  data:
                    (this.hourlyForecast().data.hourly[
                      key as any as ForecastDetailsRequestParams
                    ] as number[]) ?? [],

                  backgroundColor: function (context: any) {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;

                    if (!chartArea) {
                      return;
                    }

                    return getGradient(ctx, chartArea);
                  },
                },
              ],
            };
          });
      }
    });
  }

  @Input({ required: true })
  measurement!: ForecastMeasurement;

  @ViewChild('op') op!: OverlayPanel;

  public isToday: boolean = false;
  public hourlyForecast = this.forecastService.hourlyForecast;
  ngOnInit(): void {
    this.isToday = isToday(new Date(this.measurement.date));

    this.options = getDefaultChartOptions();
  }

  openOverlay(event: Event) {
    this.op.toggle(event);
    this.forecastService.getHourlyForecasting(0, 0, new Date()).subscribe();
  }

  options!: ChartOptions;
  data!: ChartData[];
}
