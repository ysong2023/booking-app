import { User } from '@supabase/supabase-js';

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

export interface Table {
  id: string;
  name: string;
  capacity: number;
}

export interface Booking {
  id: string;
  user_id: string;
  time_slot_id: string;
  table_id: string;
  reservation_name: string;
  time_slot?: TimeSlot;
  table?: Table;
  created_at: string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatSession {
  messages: Message[];
  loading: boolean;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
}

export interface BookingState {
  availableSlots: TimeSlot[];
  tables: Table[];
  userBookings: Booking[];
  loading: boolean;
} 