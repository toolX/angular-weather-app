import { Component, OnInit } from '@angular/core';
import { RequestApiService } from '../request-api.service';

@Component({
  selector: 'app-weather-display',
  templateUrl: './weather-display.component.html',
  styleUrls: ['./weather-display.component.css']
})
export class WeatherDisplayComponent implements OnInit {

  public weatherData: object;

  constructor(private _requestApiService: RequestApiService) { }

  ngOnInit() {
    this._requestApiService.weatherData$
        .subscribe(
          weatherData => {
            console.log(weatherData);
            this.weatherData = weatherData;
          }
        );
  }

}
