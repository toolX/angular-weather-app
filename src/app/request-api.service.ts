import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestApiService {

  private _weatherApiUrl = 'http://localhost:3000/forecast';

  constructor(private _http: HttpClient) { }

  makeApiRequest(url: string): Observable<any> {
    return this._http.get<any>(url);
  }

  getForecastData(userConfig) {
    return this._http.post<any>(this._weatherApiUrl, userConfig);
  }
}
