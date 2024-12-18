<template>
  <v-app-bar app color="#e50073" dark>
    <v-toolbar-title>
      <v-icon left>mdi-home</v-icon> IUT de Laval - Informatique
    </v-toolbar-title>
    <v-spacer></v-spacer>
    
    <!-- Boutons de navigation -->
    <v-btn v-for="(button, index) in buttons" :key="index"  text>
      <v-icon>{{ button.icon }}</v-icon>
      {{ button.label }}
    </v-btn>
    
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router'; // Importation de RouterLink pour la navigation

export default defineComponent({
  name: 'Header',
  components: {
    RouterLink // Déclaration du composant RouterLink
  },
  data() {
    return {
      buttons: [
        { label: 'Étudiants', icon: 'mdi-account', link: '/etudiants' },
        { label: 'Cours', icon: 'mdi-book', link: '/cours' },
        { label: 'Notes', icon: 'mdi-pencil', link: '/notes' },
        { label: 'Statistiques', icon: 'mdi-chart-bar', link: '/statistiques' },
        { label: 'Déconnexion', icon: 'mdi-logout', link: '/deconnexion' }
      ]
    };
  }
});
</script>