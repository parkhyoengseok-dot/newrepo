import { createClient } from '@supabase/supabase-js';

// Initialize Supabase
const supabase = createClient(
  'https://usalrczujshdasishteo.supabase.co',  // Replace with your Supabase URL
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzYWxyY3p1anNoZGFzaXNodGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4MjU0OTAsImV4cCI6MjA3NDQwMTQ5MH0.jKOlQRb1kPMx05b8dJ-tnoqHVwRtMJfshf_1Q60JqvM'   // Replace with your Supabase public key
);

export default supabase;
