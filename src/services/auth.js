import { supabase } from '../lib/supabase';

export const authService = {
  async login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    
    // Verify if user is an admin
    if (data.user) {
      const { data: adminData, error: adminError } = await supabase
        .from('admin_users')
        .select('id')
        .eq('id', data.user.id)
        .single();
        
      if (adminError || !adminData) {
        await this.logout();
        throw new Error('Unauthorized: You do not have admin privileges.');
      }
    }
    
    return data;
  },

  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) return null;
    
    // Check admin privileges again just to be sure
    const { data: adminData } = await supabase
      .from('admin_users')
      .select('id')
      .eq('id', user.id)
      .single();
      
    if (!adminData) return null;
    
    return user;
  },
  
  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback);
  }
};
