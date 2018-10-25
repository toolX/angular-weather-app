import { Component, OnInit } from '@angular/core';
import { RequestApiService } from '../request-api.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-location-search',
  templateUrl: './location-search.component.html',
  styleUrls: ['./location-search.component.css']
})
export class LocationSearchComponent implements OnInit {

  languages = [['en', 'English'], ['ru', 'Russian']];

  private _geoJsonApiUrl: string = 'http://www.mapquestapi.com/geocoding/v1/address?';
  private _geoJsonApiKey: string = 'mRaWZx5GGcCd1BMQTtRHQpmkYaq1eIBs';
  private _finalJsonApiUrl = '';
  private _latLng = {
    lat: '',
    lng: ''
  };

  private _weatherApiUrl = 'https://api.darksky.net/forecast/';
  private _weatherApiKey = 'f9be679bf70c817b44bbcc681de0d455';
  private _finalWeatherApiUrl = '';
  private _testUrl = 'https://api.darksky.net/forecast/f9be679bf70c817b44bbcc681de0d455/37.8267,-122.4233';

  userConfig: FormGroup;

  get userLocation() {
    return this.userConfig.get('userLocation');
  }

  getUserLanguage() {
    return this.userConfig.value.userLanguage;
  }

  getUserMetricSystem() {
    return this.userConfig.value.userMetricSystem;
  }

  constructor(private fb: FormBuilder, private requestApiService: RequestApiService) { }

  ngOnInit() {
    this.userConfig = this.fb.group({
      userLanguage: ['en'],
      userMetricSystem: ['si'],
      userLocation: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  getGeoJsonData() {
    let encodedUserInput = encodeURIComponent(this.userConfig.value.userLocation);
    this._finalJsonApiUrl = `${this._geoJsonApiUrl}key=${this._geoJsonApiKey}&location=${encodedUserInput}`;
    this.requestApiService.makeApiRequest(this._finalJsonApiUrl)
        .subscribe(
          data => {
            this._latLng.lat = data.results[0].locations[0].latLng.lat;
            this._latLng.lng = data.results[0].locations[0].latLng.lng;
            this._finalWeatherApiUrl = `${this._weatherApiUrl}${this._weatherApiKey}/${this._latLng.lat},${this._latLng.lng}?exclude=minutely,hourly,alerts,flags&&lang=${this.getUserLanguage()}&&units=${this.getUserMetricSystem()}`;
            /* this.getWeatherData(this._finalWeatherApiUrl); */
          }
        );
  }

  /* getWeatherData() {
    this.requestApiService.makeApiRequest(this._testUrl)
        .subscribe(
          data => console.log(data)
        );
  } */

  onSubmit() {
    this.requestApiService.getForecastData({
      formData: this.userConfig.value,
      latLng: this._latLng
    })
        .subscribe(
          response => console.log(`Success`, response),
          error => console.error(`Error`, error)
        );
  }
}
