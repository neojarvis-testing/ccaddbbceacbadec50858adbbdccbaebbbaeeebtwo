// edit-athlete.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { EditAthleteComponent } from './edit-athlete.component';
import { AthleteService } from '../services/athlete.service';
import { Athlete } from '../model/athlete.model';

describe('EditAthleteComponent', () => {
  let component: EditAthleteComponent;
  let fixture: ComponentFixture<EditAthleteComponent>;
  let mockAthleteService: jasmine.SpyObj<AthleteService>;
  let mockRouter: jasmine.SpyObj<Router>;

  const mockAthlete: Athlete = {
    id: 1,
    name: 'John Doe',
    age: 30,
    email: 'john@example.com',
    phoneNumber: '1234567890',
    sportType: 'Soccer',
    teamName: 'Team A',
    ranking: 1
  };

  beforeEach(async () => {
    mockAthleteService = jasmine.createSpyObj('AthleteService', ['getAthleteById', 'updateAthlete']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    mockAthleteService.getAthleteById.and.returnValue(of(mockAthlete));
    mockAthleteService.updateAthlete.and.returnValue(of(mockAthlete));

    await TestBed.configureTestingModule({
      declarations: [ EditAthleteComponent ],
      imports: [ ReactiveFormsModule ],
      providers: [
        { provide: AthleteService, useValue: mockAthleteService },
        { provide: Router, useValue: mockRouter },
        { 
          provide: ActivatedRoute, 
          useValue: { 
            snapshot: { 
              paramMap: { 
                get: () => '1' 
              } 
            } 
          } 
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditAthleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should_create_edit_athlete_component', () => {
    expect(component).toBeTruthy();
  });

  fit('should_initialize_the_form_with_athlete_data', () => {
    component.ngOnInit();
    expect(component.athleteForm.value).toEqual({
      name: mockAthlete.name,
      age: mockAthlete.age,
      email: mockAthlete.email,
      phoneNumber: mockAthlete.phoneNumber,
      sportType: mockAthlete.sportType,
      teamName: mockAthlete.teamName,
      ranking: mockAthlete.ranking
    });
  });

  fit('should_mark_form_as_invalid_when_empty', () => {
    component.ngOnInit();
    component.athleteForm.reset();
    expect(component.athleteForm.valid).toBeFalsy();
  });

  fit('should_mark_form_as_valid_when_all_fields_are_filled_correctly', () => {
    component.ngOnInit();
    component.athleteForm.patchValue({
      name: 'Updated Name',
      age: 35,
      email: 'updated@example.com',
      phoneNumber: '9876543210',
      sportType: 'Basketball',
      teamName: 'Team B',
      ranking: 2
    });
    expect(component.athleteForm.valid).toBeTruthy();
  });

  fit('should_navigate_to_athletes_list_after_successful_update', () => {
    component.ngOnInit();
    const updatedAthlete: Athlete = {
      id: 1,
      name: 'Updated Name',
      age: 35,
      email: 'updated@example.com',
      phoneNumber: '9876543210',
      sportType: 'Tennis',
      teamName: 'Team C',
      ranking: 3
    };

    component.athleteForm.patchValue(updatedAthlete);
    component.onSubmit();

    expect(mockAthleteService.updateAthlete).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/athletes']);
  });

  fit('should_not_call_updateAthlete_if_form_is_invalid', () => {
    component.ngOnInit();
    component.athleteForm.reset();
    component.onSubmit();

    expect(mockAthleteService.updateAthlete).not.toHaveBeenCalled();
  });
});
