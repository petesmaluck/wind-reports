import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to metar-reports!');
  }));
});

// At minimum we require an interface that lets us:

// parse a METAR format record as described above
// the returned data structure should normalize speeds to MPS
// you can normalize a speed value in KT by dividing the value by 2
// Read a stream of records, one per line
// and keep a running average wind speed per airport seen
// and the current wind speed of each airport seen
// Write a script to generate a few hundred thousand random reports one per line. Your program should be able to read the entire stream without failure and be able to either:

// display the running tally
// print a final report after reading the entire stream
