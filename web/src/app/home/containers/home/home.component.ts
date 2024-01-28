import { Component, OnInit, inject } from '@angular/core';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { LocationSearchComponent } from '../../../location/components/location-search/location-search.component';
import { MessageService } from 'primeng/api';
import { SelectedLocationComponent } from '../../../location/components/selected-location/selected-location.component';
import { PanelModule } from 'primeng/panel';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { SplitterModule } from 'primeng/splitter';
import { DataViewModule } from 'primeng/dataview';
import { RatingModule } from 'primeng/rating';
import { DayOfWeekPipe } from '../../../core/pipes/day-of-week.pipe';
import { UnitValueToStringPipe } from '../../../core/pipes/unit-value-to-string.pipe';
import { SliderModule } from 'primeng/slider';
import { CardModule } from 'primeng/card';

import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { ForecastDataService } from '../../../forecast/services/data/forecast.data.service';
import { ForecastMeasurementsComponent } from '@forecast/containers/forecast-measurements/forecast-measurements.component';
import { ForecastParamDetailsComponent } from 'app/forecast-details/containers/forecast-param-details/forecast-param-details.component';
import { WeatherMeasurementComponent } from '@current-weather/components/weather-measurment/weather-measurement.component';
import { WeatherMeasurementsComponent } from '@current-weather/containers/weather-measurements/weather-measurements.component';

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
