import { Component } from '@angular/core';
import { AuthLayout } from '../../layouts/auth-layout/auth-layout';
import { InputLabel } from '../../components/input-label/input-label';

@Component({
  selector: 'app-login',
  imports: [AuthLayout, InputLabel],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {}
