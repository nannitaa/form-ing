import { Injectable } from '@angular/core';
import { SalaryCalculationRequest } from '../models/salary-calculation-request.model';
import { SalaryCalculationResponse } from '../models/salary-calculation-response.model';

@Injectable({
  providedIn: 'root'
})
export class SalaryCalculationService {
  calculateSalary(request: SalaryCalculationRequest): SalaryCalculationResponse {
    const regularSalary = request.hoursWorked * request.hourlyWage;
    const overtimeSalary = request.overtimeHours * request.hourlyWage * 1.5;
    const totalSalary = regularSalary + overtimeSalary;
    const deductions = totalSalary * 0.10;
    const netSalary = totalSalary - deductions;

    return {
      regularSalary: regularSalary,
      overtimeSalary: overtimeSalary,
      deductions: deductions,
      netSalary: netSalary
    };
  }
}
