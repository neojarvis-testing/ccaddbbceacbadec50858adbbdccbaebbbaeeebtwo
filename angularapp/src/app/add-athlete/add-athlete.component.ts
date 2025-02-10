// add-athlete.component.ts
import { Component, OnInit } from '@angular/core';
import { Athlete } from '../model/athlete.model';
import { AthleteService } from '../services/athlete.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-athlete',
  templateUrl: './add-athlete.component.html',
  styleUrls: ['./add-athlete.component.css'],
})
export class AddAthleteComponent implements OnInit {
  athleteForm: FormGroup;

  constructor(
    private athleteService: AthleteService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.athleteForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(100)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      sportType: ['', Validators.required],
      teamName: ['', Validators.required],
      ranking: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.athleteForm.valid) {
      const formValue = this.athleteForm.value;
      const newAthlete: Athlete = {
        ...formValue
      };
      
      this.athleteService.addAthlete(newAthlete).subscribe(
        (res) => {
          console.log('Athlete added successfully:', res);
          this.router.navigate(['/athletes']);
        },
        (err) => {
          console.error('Error adding athlete:', err);
        }
      );
    }
  }
}