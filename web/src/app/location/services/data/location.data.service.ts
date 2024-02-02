import { Injectable } from '@angular/core';
import { LocationApiService } from '../api/location.api.service';
import { BehaviorSubject, filter, map, switchMap, tap } from 'rxjs';
import { CurrentWeatherDataService } from '../../../current-weather/services/data/current-weather.data.service';
import { ForecastDataService } from '../../../forecast/services/data/forecast.data.service';
import {
  LocationSearchResponse,
  LocationSearchResult,
} from '../../models/api/response/location-search.response';

@Injectable({
  providedIn: 'root',
})
export class LocationDataService {
  constructor(
    private readonly locationApiService: LocationApiService,
    private readonly currentWeatherService: CurrentWeatherDataService,
    private readonly forecastDataService: ForecastDataService
  ) {
    this.searchQuery
      .asObservable()
      .pipe(
        filter(query => query !== ''),
        tap(query => console.log('Search query changed')),
        switchMap(search => this.searchForLocation(search))
      )
      .subscribe(results => {
        this.searchResults.next(results);
      });
  }

  public searchQuery = new BehaviorSubject<string>('');
  public searchResults = new BehaviorSubject<LocationSearchResult[]>([]);

  public searchForLocation(search: string) {
    return this.locationApiService
      .searchForLocation(search)
      .pipe(map((results: LocationSearchResponse) => results.results));
  }

  public locationSearched(search: string) {
    this.searchQuery.next(search);
  }

  locationSelected(item: {
    longitude: number;
    latitude: number;
    [key: string]: any;
  }) {
    this.currentWeatherService
      .getCurrentWeather(item.longitude, item.latitude)
      .subscribe();
    this.forecastDataService
      .getBasicForecast(item.longitude, item.latitude)
      .subscribe();
  }
}
