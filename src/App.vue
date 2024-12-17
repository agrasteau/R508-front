<template>
  <v-app>
    <Header /> <!-- Intégration du Header -->
    <v-main>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from './components/Header.vue';  // Importation du Header


export default defineComponent({
  name: 'App',
  components: {
    Header, 
  }
});
</script>
