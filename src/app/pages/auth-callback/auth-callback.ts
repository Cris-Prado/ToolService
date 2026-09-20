import {
  Component,
  inject,
  OnInit
} from '@angular/core';

import { Router } from '@angular/router';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-auth-callback',
  imports: [],
  templateUrl: './auth-callback.html',
  styleUrl: './auth-callback.css'
})
export class AuthCallback implements OnInit {
  private readonly authService = inject(Auth);
  private readonly router = inject(Router);

  message = 'Concluindo o login com Google...';

  async ngOnInit(): Promise<void> {
    try {
      const { data, error } =
        await this.authService.getSession();

      console.log('Sessão recebida:', data.session);
      console.log('Erro da sessão:', error);

      if (error) {
        this.message = 'Erro ao concluir o login.';
        console.error(error);

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);

        return;
      }

      if (!data.session) {
        this.message = 'Sessão não encontrada. Faça login novamente.';

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);

        return;
      }

      this.message = 'Login concluído! Redirecionando...';

      await this.router.navigate(['/dashboard']);
    } catch (error) {
      console.error('Erro inesperado na callback:', error);

      this.message = 'Ocorreu um erro ao concluir o login.';
    }
  }
}