import { Component, OnInit } from '@angular/core';
import {StructureBikesFacade} from "../../../store/structure-bikes.facade";
import {Observable} from "rxjs";
import {Weather} from "../../models/weather";

@Component({
  selector: 'app-weather-widget-main',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.css']
})
export class WeatherWidgetComponent implements OnInit {
  weather$: Observable<Weather> = this.structureBikesFacade.weather$;
  constructor(private structureBikesFacade: StructureBikesFacade) {}

  ngOnInit() {
    this.structureBikesFacade.viewWeather();
  }
}
