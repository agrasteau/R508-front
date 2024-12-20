<template>
  <v-list-item>
    <!-- Icon -->
    <v-list-item-avatar v-if="icon">
      <v-icon>{{ icon }}</v-icon>
    </v-list-item-avatar>

    <!-- Content (Title and Subtitle) -->
    <v-list-item-content>
      <v-list-item-title>{{ title }}</v-list-item-title>
      <v-list-item-subtitle v-if="subtitle">{{ subtitle }}</v-list-item-subtitle>
    </v-list-item-content>

    <!-- Action Button -->
    <v-list-item-action v-if="action">
      <v-btn icon @click="onActionClick">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'ListItem',
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: false
    },
    icon: {
      type: String,
      required: false
    },
    action: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    onActionClick() {
      this.$emit('action-click');
    }
  }
});
</script>

<style scoped>
/* You can add custom styles here if needed */
</style>
