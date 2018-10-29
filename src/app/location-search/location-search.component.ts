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

  userConfig: FormGroup;

  get userLocation() {
    return this.userConfig.get('userLocation');
  }

  constructor(private fb: FormBuilder, private _requestApiService: RequestApiService) { }

  ngOnInit() {
    this.userConfig = this.fb.group({
      userLanguage: ['en'],
      userMetricSystem: ['si'],
      userLocation: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  onSubmit() {
    this._requestApiService.getForecastData({
      formData: this.userConfig.value
    }).subscribe(
        response => {
          this._requestApiService.shareWeatherData(response);
        },
        error => console.error(`Error`, error)
      );
  }
}
