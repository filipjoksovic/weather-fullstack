import { Component, OnInit, Signal, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { LocationSearchComponent } from '../../components/location-search/location-search.component';
import { MessageService } from 'primeng/api';
import { SelectedLocationComponent } from '../../components/selected-location/selected-location.component';
import { CurrentWeatherDataService } from '../../../current-weather/services/data/current-weather.data.service';
import { tap } from 'rxjs';
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
import { FormsModule } from '@angular/forms';
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
  ],
})
export class HomeComponent implements OnInit {
  private readonly currentWeatherDataService = inject(
    CurrentWeatherDataService
  );
  private readonly forecastWeatherDataService = inject(ForecastDataService);

  weather$: Signal<CurrentWeather> = toSignal(
    this.currentWeatherDataService.getCurrentWeather().pipe(tap(console.log)),
    {
      initialValue: null,
    }
  );

  forecast$: Signal<ForecastWeather> = toSignal(
    this.forecastWeatherDataService.getBasicForecast().pipe(tap(console.log)),
    {
      initialValue: null,
    }
  );

  ngOnInit(): void {
    this.currentWeatherDataService.getCurrentWeather().subscribe(weather => {
      console.log('Current weather received', weather);
    });

    this.forecastWeatherDataService.getBasicForecast().subscribe(weather => {
      console.log('Current forecast received', weather);
    });
  }
}
