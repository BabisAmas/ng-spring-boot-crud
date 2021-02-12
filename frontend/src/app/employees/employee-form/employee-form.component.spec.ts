import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeFormComponent } from './employee-form.component';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MaterialModule} from '../../material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('EmployeeCreateComponent', () => {
  let component: EmployeeFormComponent;
  let fixture: ComponentFixture<EmployeeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeFormComponent ],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'create/', component: EmployeeFormComponent },
          { path: 'edit/', component: EmployeeFormComponent }
        ]),
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MaterialModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.createForm.valid).toBeFalsy();
  });

  it('form should be valid', () => {
    component.createForm.controls.firstname.setValue('Testname');
    component.createForm.controls.lastname.setValue('Testname');
    component.createForm.controls.email.setValue('test@test.com');
    component.createForm.controls.mobile.setValue('123456');
    component.createForm.controls.address.setValue('Test address');
    expect(component.createForm.valid).toBeTruthy();
  });

  it('email field validity', () => {
    const email = component.createForm.controls.email;
    expect(email.valid).toBeFalsy();

    email.setValue('');
    expect(email.hasError('required')).toBeTruthy();
    expect(email.valid).toBeFalsy();

    email.setValue(' ');
    expect(email.hasError('trimError')).toBeTruthy();
    expect(email.valid).toBeFalsy();

    email.setValue('test');
    expect(email.hasError('pattern')).toBeTruthy();
    expect(email.valid).toBeFalsy();

    email.setValue('test@test.com');
    expect(email.valid).toBeTruthy();
  });

  it('firstname field validity', () => {
    const firstname = component.createForm.controls.firstname;
    expect(firstname.valid).toBeFalsy();

    firstname.setValue('');
    expect(firstname.hasError('required')).toBeTruthy();
    expect(firstname.valid).toBeFalsy();

    firstname.setValue(' ');
    expect(firstname.hasError('trimError')).toBeTruthy();
    expect(firstname.valid).toBeFalsy();

    firstname.setValue('Test');
    expect(firstname.valid).toBeTruthy();
  });

  it('lastname field validity', () => {
    const lastname = component.createForm.controls.lastname;
    expect(lastname.valid).toBeFalsy();

    lastname.setValue('');
    expect(lastname.hasError('required')).toBeTruthy();
    expect(lastname.valid).toBeFalsy();

    lastname.setValue(' ');
    expect(lastname.hasError('trimError')).toBeTruthy();
    expect(lastname.valid).toBeFalsy();

    lastname.setValue('Test');
    expect(lastname.valid).toBeTruthy();
  });

  it('mobile field validity', () => {
    const mobile = component.createForm.controls.mobile;
    expect(mobile.valid).toBeFalsy();

    mobile.setValue(' ');
    expect(mobile.hasError('trimError')).toBeTruthy();
    expect(mobile.valid).toBeFalsy();

    mobile.setValue('test');
    expect(mobile.hasError('pattern')).toBeTruthy();
    expect(mobile.valid).toBeFalsy();

    mobile.setValue('12345');
    expect(mobile.hasError('pattern')).toBeTruthy();
    expect(mobile.valid).toBeFalsy();

    mobile.setValue('123456');
    expect(mobile.valid).toBeTruthy();
  });

  it('address field validity', () => {
    const address = component.createForm.controls.address;
    expect(address.valid).toBeFalsy();

    address.setValue('');
    expect(address.hasError('required')).toBeTruthy();
    expect(address.valid).toBeFalsy();

    address.setValue(' ');
    expect(address.hasError('trimError')).toBeTruthy();
    expect(address.valid).toBeFalsy();

    address.setValue('Test');
    expect(address.valid).toBeTruthy();
  });
});
