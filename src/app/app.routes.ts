import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    pathMatch: 'full',
    loadComponent: () => import('./pages/login-page/login-page').then((m) => m.LoginPage),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'user-dashboard',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/user-dashboard-page/user-dashboard-page').then((m) => m.UserDashboardPage),
  },
  {
    path: 'admin-dashboard',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/admin-dashboard-page/admin-dashboard-page').then((m) => m.AdminDashboardPage),
  },
];
