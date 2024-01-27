import { Component, OnInit, inject } from '@angular/core';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { LocationSearchComponent } from '../../components/location-search/location-search.component';
import { MessageService } from 'primeng/api';
import { SelectedLocationComponent } from '../../components/selected-location/selected-location.component';
import { CurrentWeatherDataService } from '../../../current-weather/services/data/current-weather.data.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AutoCompleteModule,
    ButtonModule,
    TooltipModule,
    LocationSearchComponent,
    SelectedLocationComponent,
  ],
  providers: [MessageService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  // private readonly currentWeatherDataService = inject(
  //   CurrentWeatherDataService
  // );

  constructor(
    private readonly currentWeatherDataService: CurrentWeatherDataService
  ) {}

  ngOnInit(): void {
    this.currentWeatherDataService.getCurrentWeather().subscribe(weather => {
      console.log('Current weather received', weather);
    });
  }
}
