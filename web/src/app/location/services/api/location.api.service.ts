import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocationSearchResponse } from '../../models/api/response/location-search.response';

@Injectable({
  providedIn: 'root',
})
export class LocationApiService {
  constructor(private readonly http: HttpClient) {}

  public searchForLocation(search: string) {
    let params = new HttpParams();
    params = params.append('name', search);
    params = params.append('count', '10');
    params = params.append('language', 'en');
    params = params.append('format', 'json');

    return this.http.get<LocationSearchResponse>(
      `https://geocoding-api.open-meteo.com/v1/search`,
      {
        params,
      }
    );
  }
}
