import { Routes } from '@angular/router';
import { authChildGuard } from './core/guards/auth-guard';
import { AuthCallback } from './pages/auth-callback/auth-callback';
import { Login } from './pages/login/login';  
import { Register } from './pages/register/register';
import { MainLayout } from './layouts/main-layout/main-layout';
import { Notes } from './pages/tools/notes/notes';
import { Dashboard } from './pages/tools/dashboard/dashboard';

export const routes: Routes = [
  {
    path: 'login',
    component: Login
  },
  {
    path: 'register',
    component: Register
  },
  {
    path: 'auth/callback',
    component: AuthCallback
  },
  {
    path: '',
    component: MainLayout,
    canActivateChild: [authChildGuard],
    children: [
      {
        path: 'dashboard',
        component: Dashboard
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
      },
      {
        path: 'note',
        component: Notes
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
