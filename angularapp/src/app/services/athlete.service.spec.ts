// athlete.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AthleteService } from './athlete.service';
import { Athlete } from '../model/athlete.model';

describe('AthleteService', () => {
  let service: AthleteService;
  let httpTestingController: HttpTestingController;

  const mockAthletes: Athlete[] = [
    {
      id: 1,
      name: 'John Doe',
      age: 28,
      email: 'john.doe@example.com',
      phoneNumber: '1234567890',
      sportType: 'Soccer',
      teamName: 'Team A',
      ranking: 1
    },
    {
      id: 2,
      name: 'Jane Smith',
      age: 34,
      email: 'jane.smith@example.com',
      phoneNumber: '0987654321',
      sportType: 'Basketball',
      teamName: 'Team B',
      ranking: 2
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AthleteService],
    });
    service = TestBed.inject(AthleteService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  fit('should_create_service_athlete', () => {
    expect(service).toBeTruthy();
  });

  fit('should_retrieve_athletes_from_the_API_via_GET', () => {
    service.getAthletes().subscribe((athletes) => {
      expect(athletes).toEqual(mockAthletes);
    });
    const req = httpTestingController.expectOne(service.backendUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(mockAthletes);
  });

  fit('should_add_an_athlete_via_POST', () => {
    const newAthlete: Athlete = {
      name: 'Alice Johnson',
      age: 30,
      email: 'alice.johnson@example.com',
      phoneNumber: '1112223333',
      sportType: 'Tennis',
      teamName: 'Team C',
      ranking: 3
    };
    service.addAthlete(newAthlete).subscribe((athlete) => {
      expect(athlete).toEqual(newAthlete);
    });
    const req = httpTestingController.expectOne(service.backendUrl);
    expect(req.request.method).toEqual('POST');
    req.flush(newAthlete);
  });

  fit('should_edit_an_athlete_via_PUT', () => {
    const editedAthlete: Athlete = {
      id: 1,
      name: 'Updated John Doe',
      age: 29,
      email: 'john.updated@example.com',
      phoneNumber: '1234567890',
      sportType: 'Swimming',
      teamName: 'Team D',
      ranking: 4
    };
    service.updateAthlete(editedAthlete.id!, editedAthlete).subscribe((athlete) => {
      expect(athlete).toEqual(editedAthlete);
    });
    const req = httpTestingController.expectOne(`${service.backendUrl}/${editedAthlete.id}`);
    expect(req.request.method).toEqual('PUT');
    req.flush(editedAthlete);
  });

  fit('should_get_an_athlete_by_id_via_GET', () => {
    const athleteId = 1;
    service.getAthleteById(athleteId).subscribe((athlete) => {
      expect(athlete).toEqual(mockAthletes[0]);
    });
    const req = httpTestingController.expectOne(`${service.backendUrl}/${athleteId}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockAthletes[0]);
  });
});
