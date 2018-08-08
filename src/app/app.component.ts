import { Component, OnInit } from '@angular/core';

import { DataGeneratorService } from './services/data-generator.service';
import { DataParserService } from './services/data-parser.service';
import { CalculationsService } from './services/calculations.service';

import { Observable } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  metarReports: Observable<any>;
  airportsFormattedDataArray = [];
  airportDataByIcaoCode: Object;
  objectKeys = Object.keys;
  airports: Array<string>;
  dataPollInterval = 700;

  constructor(
    private dataGenerator: DataGeneratorService,
    public dataParser: DataParserService,
    public dataOperation: CalculationsService
  ) {}

  ngOnInit() {
    // Initialize data
    this.metarReports = this.dataGenerator.poll$(this.dataPollInterval);

    // Stream data
    this.metarReports
      .pipe(
        tap(res => this.airportsFormattedDataArray = []),
        mergeMap(data => data),
        map((res: string) => this.dataParser.formatData(res))
      ).subscribe((res) => {

        // Push to front of METAR data array
        this.airportsFormattedDataArray.unshift(res);

        // Group airports by icao_code
        this.airportDataByIcaoCode = this.dataParser.groupDataByKey(this.airportsFormattedDataArray, 'icao_code');
        
        // Get list of airports
        this.airports = Object.keys(this.airportDataByIcaoCode);
      });
  }
}
