import { supabase } from '../lib/supabase';

const ADMIN_EMAIL = 'superadmin@gmail.com';

export const authService = {
  async login(email, password) {
    // Authenticate through Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    if (!data.user) {
      throw new Error('Login failed.');
    }

    // Frontend-only admin verification
    if (data.user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
      await this.logout();
      throw new Error('Unauthorized: You do not have admin privileges.');
    }

    return data;
  },

  async logout() {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;
  },

  async getCurrentUser() {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return null;
    }

    // Frontend-only admin verification
    if (user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
      await this.logout();
      return null;
    }

    return user;
  },

  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback);
  },
};