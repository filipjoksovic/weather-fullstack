import { Injectable } from '@angular/core';
import { LocationApiService } from '../api/location.api.service';
import { BehaviorSubject, filter, map, switchMap, tap } from 'rxjs';
import { CurrentWeatherDataService } from '../../../current-weather/services/data/current-weather.data.service';
import { ForecastDataService } from '../../../forecast/services/data/forecast.data.service';
import {
  LocationSearchResponse,
  LocationSearchResult,
} from '../../models/api/response/location-search.response';
import { GeoLocationService } from '@core/services/geolocation.service';
import { DataState } from '@core/models/data.state.enum';
import { locationDetailsResponseToLocationDetails } from 'app/location/models/location-details.model';

@Injectable({
  providedIn: 'root',
})
export class LocationDataService {
  constructor(private readonly locationApiService: LocationApiService) {
    this.searchQuery
      .asObservable()
      .pipe(
        filter(query => query !== ''),
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

  public getLocationDetails(longitude: number, latitude: number) {
    return this.locationApiService
      .getLocationDetails(longitude, latitude)
      .pipe(map(locationDetailsResponseToLocationDetails));
  }
}
