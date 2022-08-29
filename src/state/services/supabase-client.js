import { createClient } from '@supabase/supabase-js';

export default createClient(
  'https://thwusvhjnodaptnnetsb.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRod3Vzdmhqbm9kYXB0bm5ldHNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjEzNTQ1MjEsImV4cCI6MTk3NjkzMDUyMX0.TPBrMm42hrrHAdfjSSgRyFq1rghuVm6yUfyxwJkgNTo'
);

export function checkError({ data, error }) {
  if (error) {
    throw error;
  }
  return data;
}