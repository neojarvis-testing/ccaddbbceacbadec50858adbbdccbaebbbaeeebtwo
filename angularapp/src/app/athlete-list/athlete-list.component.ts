// athlete-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Athlete } from '../model/athlete.model';
import { AthleteService } from '../services/athlete.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-athlete-list',
  templateUrl: './athlete-list.component.html',
  styleUrls: ['./athlete-list.component.css'],
})
export class AthleteListComponent implements OnInit {
  athletes: Athlete[] = [];
  loading: boolean = false;
  
  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 3;
  totalPages: number = 0;

  constructor(private athleteService: AthleteService, private router: Router) {}

  ngOnInit(): void {
    this.getAthletes();
  }

  getAthletes(): void {
    this.loading = true;
    this.athleteService.getAthletes().subscribe(
      (res) => {
        this.athletes = res;
        this.totalPages = Math.ceil(this.athletes.length / this.itemsPerPage);
        this.loading = false;
      },
      (err) => {
        console.log(err);
        this.loading = false;
      }
    );
  }

  get paginatedAthletes(): Athlete[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.athletes.slice(startIndex, startIndex + this.itemsPerPage);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  editAthlete(id: number) {
    this.router.navigate(['/athletes/edit', id]);
  }
}