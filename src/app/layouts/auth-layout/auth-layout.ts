import { Component, Input } from '@angular/core';
import { BtnGoogle } from '../../components/btn-google/btn-google';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  imports: [BtnGoogle, RouterLink],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.css',
})
export class AuthLayout {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() btnPrimary: string = '';
  @Input() btnSecondary: string = '';
  @Input() footerText = '';
  @Input() footerLinkText = '';
  @Input() footerLink = '';
}
