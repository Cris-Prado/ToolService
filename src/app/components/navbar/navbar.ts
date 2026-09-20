import { Component, inject } from '@angular/core';
import { Auth } from '../../core/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  readonly auth = inject(Auth);
  private readonly router = inject(Router);

  async logout(): Promise<void> {
    const { error } = await this.auth.logout();

    if (error) {
      console.error('Erro ao sair:', error.message);
      return;
    }

    await this.router.navigate(['/login']);
  }
}
