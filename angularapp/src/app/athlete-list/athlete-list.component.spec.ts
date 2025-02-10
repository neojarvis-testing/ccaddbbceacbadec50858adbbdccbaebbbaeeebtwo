// athlete-list.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AthleteListComponent } from './athlete-list.component';
import { AthleteService } from '../services/athlete.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { Athlete } from '../model/athlete.model';

describe('AthleteListComponent', () => {
  let component: AthleteListComponent;
  let fixture: ComponentFixture<AthleteListComponent>;
  let service: AthleteService;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockAthletes: Athlete[] = [
    {
      id: 1,
      name: 'John Doe',
      age: 25,
      email: 'john@example.com',
      phoneNumber: '1234567890',
      sportType: 'Soccer',
      teamName: "A",
      ranking:2
    },
    {
      id: 2,
      name: 'Jane Smith',
      age: 30,
      email: 'jane@example.com',
      phoneNumber: '0987654321',
      sportType: 'Basketball',
      teamName: "C",
      ranking:22
    },
    {
      id: 3,
      name: 'Alice Brown',
      age: 35,
      email: 'alice@example.com',
      phoneNumber: '1122334455',
      sportType: 'Tennis',
      teamName: "AA",
      ranking:4
    },
    {
      id: 4,
      name: 'Bob Wilson',
      age: 28,
      email: 'bob@example.com',
      phoneNumber: '5544332211',
      sportType: 'Swimming',
      teamName: "A1",
      ranking:25
    }
  ];
  
  beforeEach(() => {
    const spy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [AthleteListComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AthleteService, { provide: Router, useValue: spy }]
    });

    fixture = TestBed.createComponent(AthleteListComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(AthleteService);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  fit('should_create_AthleteListComponent', () => {
    expect((component as any)).toBeTruthy();
  });

  fit('should_call_getAthletes', () => {
    spyOn((service as any), 'getAthletes').and.returnValue(of(mockAthletes));
    (component as any).ngOnInit();
    expect((service as any).getAthletes).toHaveBeenCalled();
    expect((component as any).athletes).toEqual(mockAthletes);
  });


  fit('should_navigate_to_previous_page', () => {
    (component as any).athletes = mockAthletes;
    (component as any).currentPage = 2;
    (component as any).previousPage();
    expect((component as any).currentPage).toBe(1);
  });

  fit('should_navigate_to_edit_athlete_page', () => {
    const athleteId = 1;
    (component as any).editAthlete(athleteId);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/athletes/edit', athleteId]);
  });
});