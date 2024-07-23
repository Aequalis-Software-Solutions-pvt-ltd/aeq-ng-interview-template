import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { HomeComponent } from './home/home.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';

const routes: Routes = [
  {
    path:'home',
    component: HomeComponent,
    children:[
      {
        path:'dashboard',
        component: EmployeeDashboardComponent
      },
      {
        path:'employees',
        component: EmployeeListComponent
      }
    ],
  },
  {
    path:'',
    redirectTo: 'home/dashboard',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
