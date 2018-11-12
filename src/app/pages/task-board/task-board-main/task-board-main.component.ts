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
        const { weather, main: { temp } } = data;

        const iconId = weather[0].icon;

        this.iconId = iconId;
        // @TODO - wtf 275?
        this.temp = Math.round(temp - 275) + " °C";
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
