import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
export const supabase = createClient(
	'https://hpejkflpbbschdmppevz.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwZWprZmxwYmJzY2hkbXBwZXZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIzODMxMTUsImV4cCI6MjAxNzk1OTExNX0.D7Y5e5w7t9gxMZUvY35MZiSjdb4aGLuTrGQc-r03Ol0',
);
