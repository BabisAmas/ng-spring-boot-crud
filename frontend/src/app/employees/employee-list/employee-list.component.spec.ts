import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeListComponent } from './employee-list.component';
import {MaterialModule} from '../../material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Employee} from '../../model/employee.model';

describe('EmployeeListComponent', () => {
  let component: EmployeeListComponent;
  let fixture: ComponentFixture<EmployeeListComponent>;
  const dummyEmployees: Employee[] = [
    { id: '1', firstname: 'John', lastname: 'Rock', email: 'JRock@gmail.com', mobile: '123456', address: 'Test address 1' },
    { id: '2', firstname: 'Maria', lastname: 'Hawkins', email: 'MHawk@gmail.com', mobile: '234567', address: 'Test address 2' },
    { id: '3', firstname: 'John', lastname: 'Rock', email: 'JRock@gmail.com', mobile: '345678', address: 'Test address 3' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeListComponent ],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        MaterialModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeListComponent);
    component = fixture.componentInstance;
    component.employees = dummyEmployees;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
