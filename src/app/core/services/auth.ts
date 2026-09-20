import { Injectable, signal } from '@angular/core';
import {
  Session,
  User
} from '@supabase/supabase-js';

import { supabase } from '../supabase/supabase.client';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private readonly _user = signal<User | null>(null);
  private readonly _session = signal<Session | null>(null);
  private readonly _loading = signal(true);

  readonly user = this._user.asReadonly();
  readonly session = this._session.asReadonly();
  readonly loading = this._loading.asReadonly();

  constructor() {
    this.initializeSession();
  }

  private async initializeSession(): Promise<void> {
    try {
      const { data, error } =
        await supabase.auth.getSession();

      if (error) {
        console.error(
          'Erro ao recuperar sessão:',
          error.message
        );

        return;
      }

      this._session.set(data.session);
      this._user.set(data.session?.user ?? null);
    } catch (error) {
      console.error(
        'Erro inesperado ao iniciar sessão:',
        error
      );
    } finally {
      this._loading.set(false);
    }

    supabase.auth.onAuthStateChange((_event, session) => {
      this._session.set(session);
      this._user.set(session?.user ?? null);
    });
  }

  async register(
    name: string,
    email: string,
    password: string
  ) {
    return await supabase.auth.signUp({
      email,
      password,

      options: {
        data: {
          name
        }
      }
    });
  }

  async login(
    email: string,
    password: string
  ) {
    return await supabase.auth.signInWithPassword({
      email,
      password
    });
  }

  async loginWithGoogle() {
    return await supabase.auth.signInWithOAuth({
      provider: 'google',

      options: {
        redirectTo:
          `${window.location.origin}/auth/callback`,

        queryParams: {
          prompt: 'select_account'
        }
      }
    });
  }

  async getSession() {
    return await supabase.auth.getSession();
  }

  async getUser() {
    return await supabase.auth.getUser();
  }

  async logout() {
    return await supabase.auth.signOut();
  }
}