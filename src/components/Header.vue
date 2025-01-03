<template>
  <v-app-bar app color="#e50073" dark>
    <v-toolbar-title>
      <v-icon left>mdi-home</v-icon> IUT de Laval - Informatique
    </v-toolbar-title>
    <v-spacer></v-spacer>
    
    <!-- Boutons de navigation -->
    <v-btn 
      v-for="(button, index) in buttons" 
      :key="index" 
      :to="button.link" 
      :id="button.id"
      router 
      text
    >
      <v-icon>{{ button.icon }}</v-icon>
      {{ button.label }}
    </v-btn>
    
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Header',
  data() {
    return {
      buttons: [
        { label: 'Étudiants', id:'students', icon: 'mdi-account', link: '/students' },
        { label: 'Cours', id:'classes',  icon: 'mdi-book', link: '/classes' },
        { label: 'Notes', id:'grades', icon: 'mdi-pencil', link: '/grades' },
        { label: 'Statistiques', id:'stats', icon: 'mdi-chart-bar', link: '/stats' },
        { label: 'Déconnexion', id:'logout', icon: 'mdi-logout', link: '/login?deco=true' }
      ]
    };
  }
});
</script>
