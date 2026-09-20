import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { MainLayout } from './layouts/main-layout/main-layout';
import { Notes } from './pages/tools/notes/notes';
import { Dashboard } from './pages/tools/dashboard/dashboard';

export const routes: Routes = [
  {
    path: '',
    component: Login
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'register',
    component: Register
  },
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: 'dashboard',
        component: Dashboard
      },
      {
        path: 'note',
        component: Notes
      }
    ]
  }
];
