<template>
    login
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from '../components/Header.vue';  // Import the Header component
import ListItem from '../components/ListItem.vue'; // Import the ListItem component

export default defineComponent({
  name: 'Login',
  components: {
    Header,
    ListItem
  },
  methods: {
    handleActionClick() {
      // Action triggered when the button in ListItem is clicked
      alert('Action button clicked!');
    }
  }
});
</script>
