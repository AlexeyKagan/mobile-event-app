import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { MONTH_NAME, DAY_NAME } from '../../../common/constants/calendar.constants';
import { CurrentDate } from './models/current-date';

@Component({
  selector: 'app-task-board-main',
  templateUrl: './task-board-main.component.html',
  styleUrls: ['./task-board-main.component.scss']
})
export class TaskBoardMainComponent implements OnInit {

  constructor(private weatherService: WeatherService) { }

  iconId: string = null;
  temp: string = '';

  currentDate: CurrentDate = {
    day: '',
    dayNumber: 0,
    monthNow: '',
    yearNow: 0,
  };

  ngOnInit() {
    this.initWeather();
    this.initCurrentDate();
  }

  async initWeather() {
    await this.weatherService.initCurrentCoordinates();

    this.weatherService
      .fetchWeather()
      .subscribe(data => {
        console.log('data', data);
        const iconId = data.weather[0].icon;
        const temp = Math.round(data.main.temp - 275) + " °C";

        this.iconId = iconId;
        this.temp = temp;
      });
  }

  initCurrentDate(): void {
    const date = new Date();

    this.currentDate = {
      day: DAY_NAME[date.getDay()],
      dayNumber: date.getDate(),
      monthNow: MONTH_NAME[date.getMonth()],
      yearNow: date.getFullYear()
    };
  }

  getCurrentDate(): string {
    const { monthNow, dayNumber, yearNow } = this.currentDate;

    return `${monthNow} ${dayNumber},${yearNow}`;
  }

}
