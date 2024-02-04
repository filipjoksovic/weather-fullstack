import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocationSearchResponse } from '../../models/api/response/location-search.response';
import { LocationDetailsResponse } from 'app/location/models/api/response/location-details.response';
import { EnvironmentService } from '@core/services/environment.service';

@Injectable({
  providedIn: 'root',
})
export class LocationApiService {
  constructor(
    private readonly http: HttpClient,
    private readonly environmentService: EnvironmentService
  ) {}

  public searchForLocation(search: string) {
    let params = new HttpParams();
    params = params.append('name', search);
    params = params.append('count', '10');
    params = params.append('language', 'en');
    params = params.append('format', 'json');

    return this.http.get<LocationSearchResponse>(
      this.environmentService.environment().geocodingUrl,
      {
        params,
      }
    );
  }

  getLocationDetails(longitude: number, latitude: number) {
    let params = new HttpParams();
    params = params.append('lat', latitude.toString());
    params = params.append('lon', longitude.toString());
    params = params.append('format', 'jsonv2');
    return this.http.get<LocationDetailsResponse>(
      this.environmentService.environment().reverseGeoCodingUrl,
      {
        params,
      }
    );
  }
}
