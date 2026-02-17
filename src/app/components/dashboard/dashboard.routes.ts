import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard-component/dashboard-component';
import { CargoListComponent } from './cargo-list-component/cargo-list-component';
import { CargoCreateComponent } from '../cargo-create-component/cargo-create-component';

export const DASHBOARD_ROUTES: Route[] = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: CargoListComponent },
      { path: 'create', component: CargoCreateComponent },
      { path: '**', redirectTo: '' },
    ],
  },
];
