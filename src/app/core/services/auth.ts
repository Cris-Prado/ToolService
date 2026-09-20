import { Injectable, signal } from '@angular/core';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../supabase/supabase.client';

@Injectable({
  providedIn: 'root',
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
  }private async initializeSession(): Promise<void> {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.error('Erro ao recuperar sessão:', error.message);
    }

    this._session.set(data.session);
    this._user.set(data.session?.user ?? null);
    this._loading.set(false);

    supabase.auth.onAuthStateChange((_event, session) => {
      this._session.set(session);
      this._user.set(session?.user ?? null);
    });
  }

  async register(name: string, email: string, password: string) {
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

  async login(email: string, password: string) {
    return await supabase.auth.signInWithPassword({
      email,
      password
    });
  }

  async logout() {
    return await supabase.auth.signOut();
  }

  async getUser() {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      return null;
    }

    return data.user;
  }

  async recoverPassword(email: string) {
    return await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/nova-senha`
    });
  }

  async updatePassword(newPassword: string) {
    return await supabase.auth.updateUser({
      password: newPassword
    });
  }
}