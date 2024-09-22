// stores/auth.js
import { defineStore } from 'pinia';
import { useNuxtApp } from '#app'; // Para acessar o contexto Nuxt
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jlodntwwncmbmrgbcrso.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impsb2RudHd3bmNtYm1yZ2JjcnNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY3MTE0NjcsImV4cCI6MjA0MjI4NzQ2N30.KWOZoaTiIU1Qfis8-2cf_HsSP6Hk5XLjCPNYbNaN-Ew";
const supabase = createClient(supabaseUrl, supabaseKey)

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loading: false,
    error: null,
  }),

  actions: {
    async signIn(email, password) {

      console.log(email,password);

      this.loading = true;
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        this.error = error.message;
      } else {
        this.user = data.user;
      }
      this.loading = false;
    },

    async signUp(email, password) {

      this.loading = true;
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        this.error = error.message;
      } else {
        this.user = data.user;
      }
      this.loading = false;
    },

    async signOut() {

      this.loading = true;
      const { error } = await supabase.auth.signOut();

      if (error) {
        this.error = error.message;
      } else {
        this.user = null;
      }
      this.loading = false;
    },

    async getUser() {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        this.error = error.message;
      } else {
        this.user = data.session ? data.session.user : null;
      }
    },
    
    async checkAuth() {

      // Verifica se há uma sessão ativa no localStorage
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        this.error = error.message;
        this.user = null;
      } else {
        this.user = data.session ? data.session.user : null;
      }
    },
  },
});
