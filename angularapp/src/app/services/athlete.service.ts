// athlete.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Athlete } from '../model/athlete.model'; 

@Injectable({
  providedIn: 'root'
})
export class AthleteService {
  public backendUrl = 'https://ide-bdfebbedb318791406ddcdbfabaabefdone.premiumproject.examly.io/proxy/3001/athletes';

  constructor(private http: HttpClient) { }

  getAthletes(): Observable<Athlete[]> {
    return this.http.get<Athlete[]>(this.backendUrl);
  }

  addAthlete(athlete: Athlete): Observable<Athlete> {
    return this.http.post<Athlete>(this.backendUrl, athlete);
  }

  updateAthlete(id: number, athlete: Partial<Athlete>): Observable<Athlete> {
    return this.http.put<Athlete>(`${this.backendUrl}/${id}`, athlete);
  }

  getAthleteById(id: number): Observable<Athlete> {
    return this.http.get<Athlete>(`${this.backendUrl}/${id}`);
  }
}