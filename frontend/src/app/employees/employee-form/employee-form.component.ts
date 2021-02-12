import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Employee} from '../../model/employee.model';
import {EmployeeService} from '../../service/employee.service';
import {ValidatorHelper} from '../../validatorHelper';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  isUserCreate = (this.router.url === '/create');
  employee: Employee = new Employee();
  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  title = (this.isUserCreate) ? 'New User' : 'Update User';

  public createForm = this.formBuilder.group({
    firstname: ['', [Validators.required, ValidatorHelper.cannotBeSpace]],
    lastname: ['', [Validators.required, ValidatorHelper.cannotBeSpace]],
    email: ['', [Validators.required, Validators.pattern(this.emailRegx), ValidatorHelper.cannotBeSpace]],
    mobile: ['', [Validators.required, Validators.pattern('[- +()0-9]{6,}'), ValidatorHelper.cannotBeSpace]],
    address: ['', [Validators.required, ValidatorHelper.cannotBeSpace]]
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    if (!this.isUserCreate) {
      this.retrieveEmployee(this.route.snapshot.params.id);
    }
  }

  retrieveEmployee(id: number): void {
    this.employeeService.getEmployeeById(id).subscribe(
      data => {
        this.employee = data;
        this.setFormValues();
      },
      error => {
        console.log(error);
        this.openSnackBar();
      });
  }

  onSubmit(): void {
    if (!this.createForm.valid) {
      return;
    }

    this.employee.id = this.route.snapshot.params.id || '';
    this.employee.firstname = this.createForm.get('firstname')?.value.trim() || '';
    this.employee.lastname = this.createForm.get('lastname')?.value.trim() || '';
    this.employee.email = this.createForm.get('email')?.value.trim() || '';
    this.employee.mobile = this.createForm.get('mobile')?.value.trim() || '';
    this.employee.address = this.createForm.get('address')?.value.trim() || '';

    if (this.isUserCreate) {
      this.saveEmployee();
    } else {
      this.updateEmployee();
    }
  }

  setFormValues(): void {
    this.createForm.setValue({
      firstname: this.employee.firstname,
      lastname: this.employee.lastname,
      email: this.employee.email,
      mobile: this.employee.mobile,
      address: this.employee.address
    });
  }

  updateEmployee(): void {
    this.employeeService.updateEmployee(this.employee).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['/list']);
      },
      error => {
        console.log(error);
        this.openSnackBar();
      });
  }

  saveEmployee(): void {
    this.employeeService.saveEmployee(this.employee).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['/list']);
      },
      error => {
        console.log(error);
        this.openSnackBar();
      });
  }

  openSnackBar(): void {
    this.snackbar.open('Something went wrong!', 'End now', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
