// edit-athlete.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AthleteService } from '../services/athlete.service';
import { Athlete } from '../model/athlete.model';

@Component({
  selector: 'app-edit-athlete',
  templateUrl: './edit-athlete.component.html',
  styleUrls: ['./edit-athlete.component.css']
})
export class EditAthleteComponent implements OnInit {
  athleteForm: FormGroup;
  athleteId: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private athleteService: AthleteService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.athleteId = +this.route.snapshot.paramMap.get('id');
    this.loadAthleteDetails();
  }

  initForm(): void {
    this.athleteForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18), Validators.max(100)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      sportType: ['', Validators.required],
      teamName: ['', Validators.required],
      ranking: ['', Validators.required]
    });
  }

  loadAthleteDetails(): void {
    this.athleteService.getAthleteById(this.athleteId).subscribe(
      (athlete: Athlete) => {
        const formValue = {
          ...athlete
        };
        this.athleteForm.patchValue(formValue);
      },
      error => {
        console.error('Error loading athlete details:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.athleteForm.valid) {
      const formValue = this.athleteForm.value;
      const updatedAthlete: Partial<Athlete> = {
        ...formValue
      };

      this.athleteService.updateAthlete(this.athleteId, updatedAthlete).subscribe(
        () => {
          console.log('Athlete updated successfully');
          this.router.navigate(['/athletes']);
        },
        error => {
          console.error('Error updating athlete:', error);
        }
      );
    }
  }
} 