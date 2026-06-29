import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherService } from './services/weather.service';
import { InputText } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { ProgressSpinner } from 'primeng/progressspinner';
import { Tag } from 'primeng/tag';
import { Divider } from 'primeng/divider';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputText,
    Button,
    Card,
    ProgressSpinner,
    Tag,
    Divider
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {
  city: string = '';
  weather: any = null;
  forecast: any[] = [];
  error: string = '';
  loading: boolean = false;

  constructor(
    private weatherService: WeatherService,
    private cdr: ChangeDetectorRef
  ) {}

  search() {
    if (!this.city.trim()) return;
    this.loading = true;
    this.error = '';
    this.weather = null;
    this.forecast = [];

    this.weatherService.getWeather(this.city).subscribe({
      next: (data) => {
        this.weather = data;
        this.loadForecast();
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'City not found. Please try again.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  loadForecast() {
    this.weatherService.getForecast(this.city).subscribe({
      next: (data) => {
        this.forecast = data.list.filter((_: any, i: number) => i % 8 === 0).slice(0, 5);
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  getWeatherIcon(icon: string): string {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  }
}