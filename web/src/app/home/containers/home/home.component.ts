import { Component, OnInit, Signal, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { LocationSearchComponent } from '../../components/location-search/location-search.component';
import { MessageService } from 'primeng/api';
import { SelectedLocationComponent } from '../../components/selected-location/selected-location.component';
import { CurrentWeatherDataService } from '../../../current-weather/services/data/current-weather.data.service';
import { delay, map, tap } from 'rxjs';
import { CurrentWeather } from '../../../current-weather/models/current-weather.model';
import { PanelModule } from 'primeng/panel';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { WeatherMeasurementComponent } from '../../components/weather-measurment/weather-measurement.component';
import { SplitterModule } from 'primeng/splitter';
import { DataViewModule } from 'primeng/dataview';
import { RatingModule } from 'primeng/rating';
import { ForecastDataService } from '../../../forecast/services/data/forecast.data.service';
import { ForecastWeather } from '../../../forecast/models/forecast-weather.model';
import { DayOfWeekPipe } from '../../../core/pipes/day-of-week.pipe';
import { UnitValueToStringPipe } from '../../../core/pipes/unit-value-to-string.pipe';
import { SliderModule } from 'primeng/slider';
import { CardModule } from 'primeng/card';

import { FormsModule } from '@angular/forms';
import { WeatherMeasurementsComponent } from '../weather-measurements/weather-measurements.component';
import { ForecastMeasurementsComponent } from '../forecast-measurements/forecast-measurements.component';
import { DataState } from '../../../core/services/location.service';
import { ForecastParamDetailsComponent } from '../../../forecast-details/containers/forecast-param-details/forecast-param-details.component';
import { ChartModule } from 'primeng/chart';

export type ComponentLoadingState = {
  state: DataState.LOADING;
  data: never;
};

export type ComponentLoadedState<T> = {
  state: DataState.LOADED;
  data: T;
};

export type ComponentErrorState<T> = {
  state: DataState.ERROR;
  error: T;
  data: never;
};

export type ComponentState<T> =
  | ComponentLoadingState
  | ComponentLoadedState<T>
  | ComponentErrorState<T>;

@Component({
  selector: 'app-home',
  standalone: true,
  providers: [MessageService],
  templateUrl: './home.component.html',
  imports: [
    AutoCompleteModule,
    ButtonModule,
    TooltipModule,
    LocationSearchComponent,
    SelectedLocationComponent,
    PanelModule,
    AvatarModule,
    MenuModule,
    WeatherMeasurementComponent,
    SplitterModule,
    DataViewModule,
    RatingModule,
    DayOfWeekPipe,
    UnitValueToStringPipe,
    SliderModule,
    FormsModule,
    CardModule,
    WeatherMeasurementsComponent,
    ForecastMeasurementsComponent,
    ForecastParamDetailsComponent,
    ChartModule,
  ],
})
export class HomeComponent implements OnInit {
  private readonly forecastWeatherDataService = inject(ForecastDataService);
  options!: unknown;
  data!: unknown;

  ngOnInit() {}
}
