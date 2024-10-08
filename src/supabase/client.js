/* eslint-disable import/prefer-default-export */
import { createClient } from '@supabase/supabase-js';

const client = createClient(
  'https://zecbqgvoulnxjagrjvjc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InplY2JxZ3ZvdWxueGphZ3JqdmpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgzMzk0NjgsImV4cCI6MjA0MzkxNTQ2OH0.8sSQkLN1Nsx9GeTXq8UPDBasB26QqgeVgt7DZeNPym4'
);

export { client };
