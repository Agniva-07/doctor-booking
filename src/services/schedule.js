import { supabase } from '../lib/supabase';

export const scheduleService = {
  async fetchSchedule() {
    const { data, error } = await supabase
      .from('doctor_schedule')
      .select('*')
      .order('day_of_week', { ascending: true });
      
    if (error) throw error;
    return data;
  },

  async updateSchedule(dayOfWeek, updates) {
    const { data, error } = await supabase
      .from('doctor_schedule')
      .update(updates)
      .eq('day_of_week', dayOfWeek)
      .select();
      
    if (error) throw error;
    return data[0];
  }
};
