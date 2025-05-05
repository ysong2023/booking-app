'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Table, TimeSlot, Booking } from '@/types';
import { useAuth } from './useAuth';

export function useBooking() {
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [tables, setTables] = useState<Table[]>([]);
  const [userBookings, setUserBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchAvailableSlots();
      fetchTables();
      fetchUserBookings();
    }
  }, [user]);

  const fetchAvailableSlots = async () => {
    try {
      const { data, error } = await supabase
        .from('time_slots')
        .select('*');

      if (error) throw error;
      setAvailableSlots(data);
    } catch (error) {
      console.error('Error fetching available slots:', error);
    }
  };

  const fetchTables = async () => {
    try {
      const { data, error } = await supabase
        .from('tables')
        .select('*');

      if (error) throw error;
      setTables(data);
    } catch (error) {
      console.error('Error fetching tables:', error);
    }
  };

  const fetchUserBookings = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_bookings')
        .select(`
          *,
          time_slot:time_slots(*),
          table:tables(*)
        `)
        .eq('user_id', user.id);

      if (error) throw error;
      setUserBookings(data);
    } catch (error) {
      console.error('Error fetching user bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const createBooking = async (timeSlotId: string, tableId: string, reservationName: string) => {
    if (!user) return null;
    
    try {
      const { data, error } = await supabase
        .from('user_bookings')
        .insert([
          { 
            user_id: user.id,
            time_slot_id: timeSlotId,
            table_id: tableId,
            reservation_name: reservationName 
          }
        ])
        .select(`
          *,
          time_slot:time_slots(*),
          table:tables(*)
        `)
        .single();

      if (error) throw error;
      
      // Refresh bookings list
      await fetchUserBookings();
      await fetchAvailableSlots();
      
      return data;
    } catch (error) {
      console.error('Error creating booking:', error);
      return null;
    }
  };

  const cancelBooking = async (bookingId: string) => {
    try {
      const { error } = await supabase
        .from('user_bookings')
        .delete()
        .eq('id', bookingId);

      if (error) throw error;
      
      // Refresh bookings list
      await fetchUserBookings();
      await fetchAvailableSlots();
      
      return true;
    } catch (error) {
      console.error('Error canceling booking:', error);
      return false;
    }
  };

  return {
    availableSlots,
    tables,
    userBookings,
    loading,
    createBooking,
    cancelBooking,
    refreshData: () => {
      fetchAvailableSlots();
      fetchTables();
      fetchUserBookings();
    }
  };
}