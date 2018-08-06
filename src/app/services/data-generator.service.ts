import { Injectable } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { mergeMap, share, tap } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DataGeneratorService {

  data = [];

  constructor() {}

  // Convert data to observable

  data$(): Observable<Array<string>> {
    return new Observable(observer => {
      observer.next(this.data);
    });
  }

  // Update data at a given interval

  poll$(int): Observable<any> {
    return interval(int)
      .pipe(
        tap(() => this.createUnit()),
        mergeMap(() => this.data$()),
        share()
      )
  }

  // Create data type ie. "JFK 20180805Z 171457G71KT"

  createUnit() {
    const airports = ['PEK', 'YYZ', 'JFK', 'FRA', 'AMS', 'LHR', 'BCN', 'BIRK', 'A', 'ATL', 'HND', 'CYBB', 'CYHM'];
    const units = ['KT', 'MPS'];

    const numbers = [~~(Math.random() * 10).toString(), ''];
    const gusts = ['G' + ~~(Math.random() * 10) +  '' + ~~(Math.random() * 10), ''];

    const getRandomValueFromArray = (arr: Array<any>) => arr[Math.floor(Math.random()*arr.length)];

    const randomAirport = getRandomValueFromArray(airports);
    const randomUnits = getRandomValueFromArray(units);
    const optionalNumber = getRandomValueFromArray(numbers);
    const optionalGust = getRandomValueFromArray(gusts);

    const date =  moment().format('DDHHmm') + 'Z ';
    const direction = ~~(Math.random() * 10) + '' + ~~(Math.random() * 10) + '' + ~~(Math.random() * 10);
    const speed = ~~(Math.random() * 10) +  '' + ~~(Math.random() * 10) + '' + optionalNumber;

    return this.data.unshift(randomAirport + ' ' + date + direction + speed + optionalGust + randomUnits);
  }
}
