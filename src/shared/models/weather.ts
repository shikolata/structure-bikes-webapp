export interface Weather {
  name: string;
  sunsetTime: string;
  isDay: boolean;
  tempCelsius: string;
  tempMin: string;
  tempMax: string;
  tempFeelsLike: string;
  humidity: number;
}

export interface WeatherResponse {
  name: string,
  sys: {
    sunset: number;
  },
  main: {
    temp: number,
    temp_min: number,
    temp_max: number,
    feels_like: number,
    humidity: number
  }
}
