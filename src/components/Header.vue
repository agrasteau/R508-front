<template>
  <v-app-bar app color="#e50073" dark>
    <!-- Titre avec icône -->
    <v-toolbar-title>
      <v-icon left>mdi-home</v-icon> IUT de Laval - Informatique
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <!-- Boutons pour écrans larges -->
    <div class="d-none d-md-flex">
      <v-btn
        v-for="(button, index) in buttons"
        :key="index"
        text
        :to="button.link"
      >
        <v-icon left>{{ button.icon }}</v-icon>
        {{ button.label }}
      </v-btn>
    </div>

    <!-- Menu burger pour les écrans petits -->
    <v-app-bar-nav-icon class="d-flex d-md-none" @click="menuOpen = !menuOpen" />

    <!-- Menu déroulant pour petits écrans -->
    <v-menu v-model="menuOpen" transition="slide-y-transition" offset-y>
      <v-list>
        <v-list-item
          v-for="(button, index) in buttons"
          :key="index"
          :to="button.link"
          link
        >
          <!-- Remplacement de v-list-item-icon -->
          <template v-slot:prepend>
            <v-icon>{{ button.icon }}</v-icon>
          </template>
          <v-list-item-title>{{ button.label }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Header',
  data() {
    return {
      menuOpen: false, // Contrôle de l'ouverture du menu burger
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

<style scoped>
/* Style supplémentaire si nécessaire */
</style>
