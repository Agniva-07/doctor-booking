import { supabase } from '../lib/supabase';

export const appointmentsService = {
  // PUBLIC RPC CALL (No RLS permissions needed since it runs as SECURITY DEFINER)
  async bookAppointment({ name, phone, address, date }) {
    const { data, error } = await supabase.rpc('book_appointment', {
      p_name: name,
      p_phone: phone,
      p_address: address,
      p_date: date
    });

    if (error) {
      // Supabase RPC throws postgres exceptions which we catch here.
      // We parse out the clean message.
      const msg = error.message || "An unexpected error occurred during booking.";
      throw new Error(msg);
    }
    
    return data;
  },

  // ADMIN ONLY
  async fetchAppointments(filterDate = null) {
    let query = supabase
      .from('appointments')
      .select('*')
      .order('appointment_date', { ascending: true })
      .order('slot_start', { ascending: true });
      
    if (filterDate) {
      query = query.eq('appointment_date', filterDate);
    }
    
    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  // ADMIN ONLY
  async updateAppointmentStatus(id, newStatus) {
    const { data, error } = await supabase
      .from('appointments')
      .update({ status: newStatus })
      .eq('id', id)
      .select();
      
    if (error) throw error;
    return data[0];
  }
};
