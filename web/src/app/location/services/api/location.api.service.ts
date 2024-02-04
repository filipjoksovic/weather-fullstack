import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocationSearchResponse } from '../../models/api/response/location-search.response';
import { LocationDetailsResponse } from 'app/location/models/api/response/location-details.response';

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
      `http://localhost:8080/api/location/search`,
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
      `http://localhost:8080/api/location/reverse`,
      {
        params,
      }
    );
  }
}
