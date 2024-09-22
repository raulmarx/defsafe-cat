import { createClient } from '@supabase/supabase-js'



export default defineNuxtPlugin(() => {
    const supabaseUrl = 'https://jlodntwwncmbmrgbcrso.supabase.co'
    const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impsb2RudHd3bmNtYm1yZ2JjcnNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY3MTE0NjcsImV4cCI6MjA0MjI4NzQ2N30.KWOZoaTiIU1Qfis8-2cf_HsSP6Hk5XLjCPNYbNaN-Ew";
    const supabase = createClient(supabaseUrl, supabaseKey)
  
    return {
      provide: {
        supabase
      }
    };
  });
