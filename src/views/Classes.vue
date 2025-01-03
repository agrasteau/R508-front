<template>
  <v-app>
<v-main>
      <v-container>
        <v-btn class="pink-btn" @click="$router.push('/newcourse')">
          <v-icon left></v-icon> Ajout d'un nouveau cours
        </v-btn>
        <v-list>
          <ListItem
          :headers="headers"
          :items="items"
          />
        </v-list>
      </v-container>
    </v-main> 
  </v-app>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import Header from '../components/Header.vue';  // Import the Header component
import ListItem from '../components/ListItem.vue'; // Import the ListItem component

import axios from 'axios';
import Cookies from 'js-cookie';

const newCourse = null;



export default defineComponent({
  name: 'Classes',
  components: {
    Header,
    ListItem
  },
  setup() {
    const token = Cookies.get('token');

    const items = ref([]);

    const fetchItems = async () => {
      try{
        const coursesResponse = await axios.get("http://localhost:3000/api/courses", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    items.value = coursesResponse.data;
  }
    catch{

    } 
  
  }
  onMounted(() => {
      fetchItems();
      console.log(items);
    });
  return {items};
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
});
</script>
