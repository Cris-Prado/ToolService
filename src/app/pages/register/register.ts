import { Component } from '@angular/core';
import { AuthLayout } from '../../layouts/auth-layout/auth-layout';
import { InputLabel } from '../../components/input-label/input-label';
import { Icon } from '../../components/icon/icon';


@Component({
  selector: 'app-register',
  imports: [ AuthLayout, InputLabel, Icon],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {}
