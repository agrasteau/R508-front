<template>
  <v-app>
    <v-main>
    <Header v-if="showTopBar" />
    <router-view @disableBar="disableBar" @enableBar="enableBar" />
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
    ListItem,
  },
  data() {
    return {
      showTopBar: true
    }
  },
  methods: {
    handleActionClick() {
      // Action triggered when the button in ListItem is clicked
      alert('Action button clicked!');
    },
    disableBar() {
      this.showTopBar = false;
    },
    enableBar() {
      this.showTopBar = true;  
    }
  }
});
</script>
