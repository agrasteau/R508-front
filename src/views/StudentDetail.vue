<template>
  <v-app>
    <!-- Header (Toolbar) -->
    <Header />

    <!-- Main Content Area -->
    <!-- <v-main>
      <v-container>
        <v-list>
          <ListItem
            v-for="(item, index) in listItems"
            :key="index"
            :title="item.title"
            :subtitle="item.subtitle"
            :icon="item.icon"
            :action="item.action"
            @action-click="handleActionClick"
          />
        </v-list>
      </v-container>
    </v-main> -->
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from '../components/Header.vue';  // Import the Header component
import ListItem from '../components/ListItem.vue'; // Import the ListItem component

export default defineComponent({
  name: 'StudentDetail',
  components: {
    Header,
    ListItem
  },
  data() {
    return {
      listItems: [
        { title: 'Étudiants', subtitle: 'Gérer les étudiants', icon: 'mdi-account', action: true },
        { title: 'Cours', subtitle: 'Gérer les cours', icon: 'mdi-book', action: false },
        { title: 'Notes', subtitle: 'Consulter les notes', icon: 'mdi-pencil', action: true },
        { title: 'Statistiques', subtitle: 'Voir les statistiques', icon: 'mdi-chart-bar', action: false },
        { title: 'Déconnexion', subtitle: 'Se déconnecter', icon: 'mdi-logout', action: true }
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
