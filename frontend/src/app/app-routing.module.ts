import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EmployeeListComponent} from './employees/employee-list/employee-list.component';
import {EmployeeFormComponent} from './employees/employee-form/employee-form.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: EmployeeListComponent,
    data: { title: 'List of Employee' }
  },
  {
    path: 'create',
    component: EmployeeFormComponent,
    data: { title: 'Add Employee' }
  },
  {
    path: 'edit/:id',
    component: EmployeeFormComponent,
    data: { title: 'Edit Employee' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
