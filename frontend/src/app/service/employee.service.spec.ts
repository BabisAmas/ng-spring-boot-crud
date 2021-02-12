import { TestBed } from '@angular/core/testing';

import { EmployeeService } from './employee.service';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Employee} from '../model/employee.model';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let httpMock: HttpTestingController;
  const API_URL = 'http://localhost:4200';
  const dummyEmployees = [
    { id: '1', firstname: 'John', lastname: 'Rock', email: 'JRock@gmail.com', mobile: '123456', address: 'Test address 1' },
    { id: '2', firstname: 'Maria', lastname: 'Hawkins', email: 'MHawk@gmail.com', mobile: '234567', address: 'Test address 2' },
    { id: '3', firstname: 'John', lastname: 'Rock', email: 'JRock@gmail.com', mobile: '345678', address: 'Test address 3' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [EmployeeService]
    });

    service = TestBed.inject(EmployeeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get the correct employee', () => {
    service.getEmployeeById(1).subscribe((data: any) => {
      expect(data).toBe(dummyEmployees[0]);
    });

    const req = httpMock.expectOne(`${API_URL}/employee/1`, 'call to api');
    expect(req.request.method).toBe('GET');

    req.flush(dummyEmployees[0]);

    httpMock.verify();
  });

  it('should not find non existent employee', () => {
    service.getEmployeeById(15).subscribe((data: any) => {
      expect(data).toBe(null);
    });

    const req = httpMock.expectOne(`${API_URL}/employee/15`, 'call to api');
    expect(req.request.method).toBe('GET');

    req.flush(null);

    httpMock.verify();
  });

  it('should get all the employees', () => {
    service.getAll().subscribe((data: any) => {
      expect(data.length).toBe(3);
      expect(data).toBe(dummyEmployees);
    });

    const req = httpMock.expectOne(`${API_URL}/employees`, 'call to api');
    expect(req.request.method).toBe('GET');

    req.flush(dummyEmployees);

    httpMock.verify();
  });

  it('should update selected employee', () => {
    const updatedEmployee = {
      id: '1',
      firstname: 'John',
      lastname: 'Rock',
      email: 'newJRock@gmail.com',
      mobile: '1111111',
      address: 'Test address 1'
    };
    service.updateEmployee(updatedEmployee).subscribe((data: any) => {
      expect(data).toBe(updatedEmployee);
    });

    const req = httpMock.expectOne(`${API_URL}/employee/1`, 'call to api');
    expect(req.request.method).toBe('PUT');
    console.log(req.request);

    req.flush(updatedEmployee);

    httpMock.verify();
  });

  it('should delete selected employee', () => {
    const remainingEmployees = [
      { id: '2', firstname: 'Maria', lastname: 'Hawkins', email: 'MHawk@gmail.com', mobile: '234567', address: 'Test address 2'},
      { id: '3', firstname: 'John', lastname: 'Rock', email: 'JRock@gmail.com', mobile: '345678', address: 'Test address 3'}
    ];

    service.deleteEmployeeById(1).subscribe((data: any) => {
      expect(data).toBe(remainingEmployees);
    });

    const req = httpMock.expectOne(`${API_URL}/employee/1`, 'call to api');
    expect(req.request.method).toBe('DELETE');
    console.log(req.request);

    req.flush(remainingEmployees);

    httpMock.verify();
  });
});
