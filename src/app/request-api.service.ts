import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestApiService {

  private _weatherApiUrl = 'http://localhost:3000/forecast';
  private _weatherDataSource = new Subject<object>();
  weatherData$ = this._weatherDataSource.asObservable();

  constructor(private _http: HttpClient) { }

  getForecastData(userConfig: object): Observable<any> {
    return this._http.post<any>(this._weatherApiUrl, userConfig);
  }

  shareWeatherData(weatherData: object) {
    this._weatherDataSource.next(weatherData);
  }
}
