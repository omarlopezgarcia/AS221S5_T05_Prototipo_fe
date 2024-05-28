import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { RolComponent } from './modules/rol/rol.component';
import { UbigeoComponent } from './modules/ubigeo/ubigeo.component';
import { UserComponent } from './modules/user/user.component';
import { LoanComponent } from './modules/loan/loan.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'roles',
        component: RolComponent
      },
      {
        path: 'ubigeos',
        component: UbigeoComponent
      },
      {
        path: 'users',
        component: UserComponent
      },
      {
        path: 'loans',
        component: LoanComponent
      }
    ]
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
