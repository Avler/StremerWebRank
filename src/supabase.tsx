import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pumezvgpecpowlvhhysx.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1bWV6dmdwZWNwb3dsdmhoeXN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODgwNjQxNzYsImV4cCI6MjAwMzY0MDE3Nn0.QEzLYvX-a1Ap5vtk4cJph7KORDqdxT9RB-ZF2kbiaw4';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
