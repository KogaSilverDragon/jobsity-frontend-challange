import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private API_KEY: string = '633736acdb0b2545e4694dcacdc25c96';

  constructor(private http: HttpClient) { }

  getCityWeather(city: string): Observable<any> {
    return this.http.get<any>(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&cnt=1&appid=${this.API_KEY}`
    ).pipe(map(response => response.weather[0].main));
  }
}
