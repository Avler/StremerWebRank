import {
  createClient,
  RealtimePostgresChangesPayload,
} from '@supabase/supabase-js';

const supabaseUrl = 'https://pumezvgpecpowlvhhysx.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1bWV6dmdwZWNwb3dsdmhoeXN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODgwNjQxNzYsImV4cCI6MjAwMzY0MDE3Nn0.QEzLYvX-a1Ap5vtk4cJph7KORDqdxT9RB-ZF2kbiaw4';
const supabase = createClient(supabaseUrl, supabaseKey);

let newData: ((payload: RealtimePostgresChangesPayload<any>) => void) | null =
  null;

const chanel = supabase
  .channel('table_db_changes')
  .on(
    'postgres_changes',
    {
      event: '*',
      schema: 'public',
      table: 'stremers',
    },
    (payload) => {
      const eventType = payload.eventType;
      const newRecord = payload.new;
      const oldRecord = payload.old;

      if (newData) {
        newData(payload);
      }
    }
  )
  .subscribe();

export function newUpdate(
  callback: (payload: RealtimePostgresChangesPayload<any>) => void
) {
  newData = callback;
}

export default supabase;
