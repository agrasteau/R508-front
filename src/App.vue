<template>
  <v-app>
    <!-- Header (Toolbar) -->
    <Header />
    <v-main>
      <v-container>
        <ListItem :items="tableData" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from './components/Header.vue';  // Import the Header component
import ListItem from './components/ListItem.vue'; // Import the ListItem component

export default defineComponent({
  name: 'App',
  components: {
    Header,
    ListItem
  },
   data() {
    return {
      // Données dynamiques pour le tableau
      tableData: [
        { code: 'R5.A.08', name: 'Qualité de développement', credits: 5 },
        { code: 'INFO101', name: 'Introduction aux BDD', credits: 3 },
        { code: 'TEST', name: 'TEST LESSON', credits: 5 }
      ]
    };
  },
  methods: {
    handleActionClick() {
      // Action triggered when the button in ListItem is clicked
      alert('Action button clicked!');
    }
  }
});
</script>
