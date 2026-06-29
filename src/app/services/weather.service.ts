import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private apiKey = environment.weatherApiKey;
  private baseUrl = 'https://api.openweathermap.org/data/2.5';

  constructor(private http: HttpClient) {}

  getWeather(city: string): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/weather?q=${city}&appid=${this.apiKey}&units=metric`
    );
  }

  getForecast(city: string): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/forecast?q=${city}&appid=${this.apiKey}&units=metric`
    );
  }
}