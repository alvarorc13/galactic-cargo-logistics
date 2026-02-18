import { Routes } from '@angular/router';
import { HomeComponent } from './components/home-component/home-component';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'auth/login',
    loadComponent: () =>
      import('./auth/login-component/login-component').then((m) => m.LoginComponent),
  },
  {
    path: 'auth/register',
    loadComponent: () =>
      import('./auth/register-component/register-component').then((m) => m.RegisterComponent),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./components/dashboard/dashboard.routes').then((r) => r.DASHBOARD_ROUTES),
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: 'home' },
];
