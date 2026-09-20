import { Component, inject } from '@angular/core';
import { BtnGoogle } from '../../components/btn-google/btn-google';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';
import { AuthLayout } from '../../layouts/auth-layout/auth-layout';
import { InputLabel } from '../../components/input-label/input-label';
import { Icon } from '../../components/icon/icon';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-login',
  imports: [
    AuthLayout,
    InputLabel,
    Icon,
    ReactiveFormsModule,
    BtnGoogle
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly authService = inject(Auth);

  loading = false;
  googleLoading = false;

  errorMessage = '';

  form = this.formBuilder.nonNullable.group({
    email: ['', [
      Validators.required,
      Validators.email
    ]],

    password: ['', [
      Validators.required,
      Validators.minLength(6)
    ]],

    rememberMe: [false]
  });

  async login(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    try {
      const { email, password } = this.form.getRawValue();

      const { error } = await this.authService.login(
        email,
        password
      );

      if (error) {
        this.errorMessage = this.translateError(error.message);
        return;
      }

      await this.router.navigate(['/dashboard']);
    } catch (error) {
      console.error('Erro inesperado no login:', error);

      this.errorMessage =
        'Ocorreu um erro inesperado. Tente novamente.';
    } finally {
      this.loading = false;
    }
  }

  async loginWithGoogle(): Promise<void> {
    this.googleLoading = true;
    this.errorMessage = '';

    try {
      const { error } =
        await this.authService.loginWithGoogle();

      if (error) {
        console.error('Erro no login Google:', error);

        this.errorMessage =
          'Não foi possível entrar com o Google.';
      }

      /*
       * Não usamos router.navigate() aqui.
       *
       * O signInWithOAuth redirecionará o navegador
       * para o Google e depois para /auth/callback.
       */
    } catch (error) {
      console.error('Erro inesperado no Google:', error);

      this.errorMessage =
        'Ocorreu um erro ao conectar com o Google.';
    } finally {
      this.googleLoading = false;
    }
  }

  private translateError(message: string): string {
    if (message.includes('Invalid login credentials')) {
      return 'E-mail ou senha incorretos.';
    }

    if (message.includes('Email not confirmed')) {
      return 'Confirme seu e-mail antes de entrar.';
    }

    return 'Não foi possível entrar. Tente novamente.';
  }
}