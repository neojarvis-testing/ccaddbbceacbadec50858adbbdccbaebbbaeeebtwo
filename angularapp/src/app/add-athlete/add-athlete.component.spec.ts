// add-athlete.component.spec.ts
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddAthleteComponent } from './add-athlete.component';
import { AthleteService } from '../services/athlete.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { Athlete } from '../model/athlete.model';

describe('AddAthleteComponent', () => {
  let component: AddAthleteComponent;
  let fixture: ComponentFixture<AddAthleteComponent>;
  let service: AthleteService;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  
    TestBed.configureTestingModule({
      declarations: [AddAthleteComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule, FormsModule],
      providers: [
        AthleteService,
        { provide: Router, useValue: routerSpy }
      ],
    });
    fixture = TestBed.createComponent(AddAthleteComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(AthleteService);
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  fit('should_create_AddAthleteComponent', () => {
    expect((component as any)).toBeTruthy();
  });

  fit('should_add_all_the_required_fields', () => {
    const form = (component as any).athleteForm;
    expect(form.get('name')).toBeTruthy();
    expect(form.get('age')).toBeTruthy();
    expect(form.get('email')).toBeTruthy();
    expect(form.get('phoneNumber')).toBeTruthy();
    expect(form.get('sportType')).toBeTruthy();
    expect(form.get('teamName')).toBeTruthy();
    expect(form.get('ranking')).toBeTruthy();
  });

  fit('should_validate_age', () => {
    const athleteForm = (component as any).athleteForm;
    const validAthleteData: Omit<Athlete, 'id'> = {
      name: 'John Doe',
      age: 25,
      email: 'john@example.com',
      phoneNumber: '1234567890',
      sportType: 'Soccer',
      teamName: 'a',
      ranking: 1
    };
    athleteForm.patchValue(validAthleteData);
    expect(athleteForm.valid).toBeTruthy();
    
    athleteForm.patchValue({ age: 17 });
    expect(athleteForm.get('age')?.hasError('min')).toBeTruthy();
  });

  fit('should_reset_form_after_successful_submission', fakeAsync(() => {
    const validAthleteData: Omit<Athlete, 'id'> = {
      name: 'John Doe',
      age: 25,
      email: 'john@example.com',
      phoneNumber: '1234567890',
      sportType: 'Soccer',
      teamName: 'B',
      ranking: 2
    };
    const expectedAthleteData: Athlete = {
      id: 1,
      ...validAthleteData
    };
    spyOn(service, 'addAthlete').and.returnValue(of(expectedAthleteData));
    (component as any).athleteForm.setValue(validAthleteData);
    (component as any).onSubmit();
    tick();
    expect((component as any).athleteForm.pristine).toBeTruthy();
    expect((component as any).athleteForm.untouched).toBeTruthy();
  }));

  fit('should_navigate_to_athlete_list_after_successful_submission', fakeAsync(() => {
    const validAthleteData: Omit<Athlete, 'id'> = {
      name: 'John Doe',
      age: 25,
      email: 'john@example.com',
      phoneNumber: '1234567890',
      sportType: 'Soccer',
      teamName: 'C',
      ranking: 4
    };
    const expectedAthleteData: Athlete = {
      id: 1,
      ...validAthleteData
    };
    spyOn(service, 'addAthlete').and.returnValue(of(expectedAthleteData));
    (component as any).athleteForm.setValue(validAthleteData);
    (component as any).onSubmit();
    tick();
    expect(router.navigate).toHaveBeenCalledWith(['/athletes']);
  }));
});