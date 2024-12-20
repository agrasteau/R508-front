<template>
  <v-app>
    <v-main>
    <Header />
    <router-view />
    </v-main>
   </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from './components/Header.vue';  // Import the Header component
import ListItem from './components/ListItem.vue'; // Import the ListItem component
import Login from './components/Login.vue';

export default defineComponent({
  name: 'App',
  components: {
    Header,
    ListItem,
    Login
  },
  
  methods: {
    handleActionClick() {
      // Action triggered when the button in ListItem is clicked
      alert('Action button clicked!');
    }
  }
});
</script>
