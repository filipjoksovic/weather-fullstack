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
import { Menu, MenuModule } from 'primeng/menu';
import { WeatherMeasurementComponent } from '../../components/weather-measurment/weather-measurement.component';
import { SplitterModule } from 'primeng/splitter';

@Component({
  selector: 'app-home',
  standalone: true,
  providers: [MessageService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
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
  ],
})
export class HomeComponent implements OnInit {
  private readonly currentWeatherDataService = inject(
    CurrentWeatherDataService
  );

  weather$: Signal<CurrentWeather> = toSignal(
    this.currentWeatherDataService.getCurrentWeather().pipe(tap(console.log)),
    {
      initialValue: null,
    }
  );

  ngOnInit(): void {
    this.currentWeatherDataService.getCurrentWeather().subscribe(weather => {
      console.log('Current weather received', weather);
    });
  }
}
