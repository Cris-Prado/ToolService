import { Component, inject } from '@angular/core';
import { AuthLayout } from '../../layouts/auth-layout/auth-layout';
import { InputLabel } from '../../components/input-label/input-label';
import { Icon } from '../../components/icon/icon';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-register',
  imports: [AuthLayout, InputLabel, Icon, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private readonly formBuilder = inject(FormBuilder);
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);

  loading = false;
  errorMessage = '';
  successMessage = '';

  form = this.formBuilder.nonNullable.group({
    name: ['', [
      Validators.required,
      Validators.minLength(3)
    ]],

    email: ['', [
      Validators.required,
      Validators.email
    ]],

    password: ['', [
      Validators.required,
      Validators.minLength(6)
    ]]
  });

  async register(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const { name, email, password } = this.form.getRawValue();

    const { data, error } = await this.auth.register(
      name,
      email,
      password,
    );

    this.loading = false;

    if (error) {
      this.errorMessage = this.translateError(error.message);
      return;
    }

    if (!data.session) {
      this.successMessage =
        'Cadastro realizado. Verifique seu e-mail para confirmar a conta.';
      this.form.reset();
      return;
    }

    await this.router.navigate(['/dashboard']);
  }

  private translateError(message: string): string {
    if (message.includes('already registered')) {
      return 'Este e-mail já está cadastrado.';
    }

    if (message.includes('Password should be')) {
      return 'A senha precisa ter pelo menos 6 caracteres.';
    }

    return 'Não foi possível realizar o cadastro.';
  }
}
