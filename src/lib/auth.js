import { supabase } from './supabase';

export async function signUp({ email, password, name, role }) {
  if (!supabase) throw new Error('Supabase не налаштовано');
  const { data, error } = await supabase.auth.signUp({
    email, password,
    options: { data: { name, role } },
  });
  if (error) throw error;
  return data;
}

export async function signIn({ email, password }) {
  if (!supabase) throw new Error('Supabase не налаштовано');
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function signOut() {
  if (!supabase) return;
  await supabase.auth.signOut();
}

export async function getSession() {
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data.session;
}
