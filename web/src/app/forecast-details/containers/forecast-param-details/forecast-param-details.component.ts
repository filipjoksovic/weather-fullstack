import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, effect, inject } from '@angular/core';
import { ForecastDetailsService } from '../../services/data/forecast-details.service';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import {} from '../../../forecast/models/forecast-weather.model';
import { ChartModule } from 'primeng/chart';
import { format } from 'date-fns';
import {
  currentWeatherModelKeyToDailyForecastParams,
  dailyForecastParamsToText,
} from '../../models/api/request/forecast-details-request.params';
import { getDefaultChartOptions } from '@core/models/chart.options';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-forecast-param-details',
  standalone: true,
  imports: [CommonModule, DialogModule, FormsModule, ChartModule],
  templateUrl: './forecast-param-details.component.html',
})
export class ForecastParamDetailsComponent implements OnInit {
  public forecastDetailsService = inject(ForecastDetailsService);

  constructor() {
    effect(() => {
      const documentStyle = getComputedStyle(document.documentElement);
      this.showModalValue = this.showModal();
      this.data = {
        labels: this.measurementData().dates.map(date => format(date, 'EEEE')),
        datasets: this.measurementData().measurements.map(
          (measurement: number[], index: number) => {
            return {
              label:
                dailyForecastParamsToText[
                  currentWeatherModelKeyToDailyForecastParams[
                    this.activeParameter()
                  ][index]
                ],
              data: measurement,
              borderColor: currentWeatherModelKeyToDailyForecastParams[
                this.activeParameter()
              ][index].includes('max')
                ? documentStyle.getPropertyValue('--red-500') + '66'
                : documentStyle.getPropertyValue('--blue-500') + '66',
              tension: 0.4,
              backgroundColor: currentWeatherModelKeyToDailyForecastParams[
                this.activeParameter()
              ][index].includes('max')
                ? documentStyle.getPropertyValue('--red-500') + '66'
                : documentStyle.getPropertyValue('--blue-500') + '66',
              fill: true,
              fillOpacity: 0.5,
            };
          }
        ),
      };
    });
  }

  ngOnInit(): void {
    this.options = getDefaultChartOptions(true);
  }

  public options!: ChartOptions;

  public data!: ChartData;

  public showModalValue = false;

  public showModal = computed(() => this.forecastDetailsService.showDialog());

  public activeParameter = computed(() => {
    return this.forecastDetailsService.measurementData().activeParameter;
  });

  public measurementData = computed(() => {
    if (this.activeParameter()) {
      return {
        measurements:
          currentWeatherModelKeyToDailyForecastParams[
            this.activeParameter()
          ].map((key: string) => {
            return (
              //@ts-ignore
              this.forecastDetailsService.measurementData().data?.daily[key] ??
              []
            );
          }) ?? [],

        dates:
          this.forecastDetailsService.measurementData().data?.daily.time ?? [],
      };
    }
    return { measurements: [], dates: [] };
  });

  dialogClosed() {
    this.forecastDetailsService.showDialog.set(false);
  }
}
