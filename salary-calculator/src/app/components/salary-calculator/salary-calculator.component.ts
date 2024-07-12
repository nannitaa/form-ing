import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { SalaryCalculationService } from '../../services/salary-calculation.service';
import { SalaryCalculationRequest } from '../../models/salary-calculation-request.model';
import { SalaryCalculationResponse } from '../../models/salary-calculation-response.model';

@Component({
  selector: 'app-salary-calculator',
  templateUrl: './salary-calculator.component.html',
  styleUrls: ['./salary-calculator.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class SalaryCalculatorComponent {
  salaryForm: FormGroup;
  result?: SalaryCalculationResponse;

  constructor(
    private fb: FormBuilder,
    private salaryService: SalaryCalculationService
  ) {
    this.salaryForm = this.fb.group({
      name: ['', Validators.required],
      hourlyWage: [0, [Validators.required, Validators.min(1)]],
      hoursWorked: [0, [Validators.required, Validators.min(1)]],
      overtimeHours: [0, [Validators.required, Validators.min(0)]]
    });
  }

  controlHasError(control: string, error: string) {
    return this.salaryForm.controls[control].hasError(error);
  }

  onSubmit() {
    if (this.salaryForm.valid) {
      const formValues: SalaryCalculationRequest = this.salaryForm.value;
      this.result = this.salaryService.calculateSalary(formValues);
    }
  }
}
