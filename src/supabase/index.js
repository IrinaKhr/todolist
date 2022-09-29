import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wiomjtmvloogxwwjjnea.supabase.co';
const supabaseAnonToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indpb21qdG12bG9vZ3h3d2pqbmVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjE5NjYwMjQsImV4cCI6MTk3NzU0MjAyNH0.VaPiAtBUgMd9ASqIB6nUnlYF3OlHsdiIEelpgjeyDrI';

export default createClient(supabaseUrl, supabaseAnonToken);
