import { Component, OnInit } from '@angular/core';
import { EmployeeService} from '../../service/employee.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: any;
  displayedColumns = ['firstname', 'lastname', 'email', 'mobile', 'address', 'actions'];

  constructor(private route: ActivatedRoute, private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.retrieveEmployees();
  }

  refreshEmployees(): void {
    this.retrieveEmployees();
  }

  retrieveEmployees(): void {
    this.employeeService.getAll()
      .subscribe(
        data => {
          this.employees = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  deleteEmployee(id: number): void {
    this.employeeService.deleteEmployeeById(id).subscribe(
      data => {
        this.retrieveEmployees();
      },
      error => {
        console.log(error);
      });
  }

}
