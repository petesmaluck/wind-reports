import { Injectable } from '@angular/core';
import { DataGeneratorService } from './data-generator.service';

@Injectable({
  providedIn: 'root'
})
export class DataParserService {

  constructor(
    private dataGenerator: DataGeneratorService,
  ) { }

  // Seperate string by spaces
  seperateFields = (str) => str.split(' ');

  // Get first x characters from string
  getFirstXCharacters = (str, x) => str.substr(0, x);

  // Split numbers from letters in string
  // ie. 275771G86MPS -> ['275771', '86']
  splitNumbersFromLetters = (str) => str.split(/[a-zA-Z]/);

  // Removes empty strings from array
  removeEmptyStrings = arr => arr.filter(entry => entry.trim() != '');

  // Formats string METAR data into an object with necessary key/values
  formatData(unit: string) { // TODO: Add Interface
    let parsedWindData;
    let windDirection: number;
    let windGust: number;
    let windSpeed: number;
    let parsedWindDataArray: Array<string>;
    let speedUnit: string;

    // ie. 'BCN 051419Z 539193MPS' -> 'BCN', '051419Z', '539193MPS'
    parsedWindData = this.seperateFields(unit);

    // ie. 539193G20MPS -> ['539193', '20']
    parsedWindDataArray = this.removeEmptyStrings(this.splitNumbersFromLetters(parsedWindData[2]));
    
    windDirection = Number(this.getFirstXCharacters(parsedWindDataArray[0], 3));
    windGust = Number(parsedWindDataArray[1]);
    speedUnit = (parsedWindData[2].indexOf('KT') !== -1) ? 'KT' : 'MPS';

    // Normalize a speed value in KT by dividing the value by 2
    switch(speedUnit) {
      case 'KT':
        windSpeed = Number(parsedWindDataArray[0].slice(3)) / 2;
        break; 
      case 'MPS':
        windSpeed = Number(parsedWindDataArray[0].slice(3));
        break;
    }

    return {
      icao_code: parsedWindData[0],
      timestamp: parsedWindData[1],
      wind_info: {
        direction: windDirection,
        speed: windSpeed,
        ...(windGust && { gust: windGust }), // gust key/value is optional
        speedUnit: speedUnit
      }
    };
  }

  // Groups array of ICAO data objects by key
  groupDataByKey(arr, key) {
    return arr.reduce((r, a) => {
      r[a[key]] = r[a[key]] || [];
      r[a[key]].push(a);
      return r;
    }, Object.create(null));
  }
}
