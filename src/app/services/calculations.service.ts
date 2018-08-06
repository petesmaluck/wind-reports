import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculationsService {

  constructor() { }

  getCurrentSpeed(arr): number {
    return arr.map(obj => obj.wind_info.speed).slice(-1)[0];
  }

  getAverageSpeed(arr): number {
    return arr.map(obj => obj.wind_info.speed).reduce((a,b) => a + b, 0) / arr.length;
  }
}
