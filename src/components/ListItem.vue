<template>
  <v-container>
    <!-- Barre de recherche -->
    <v-text-field
      id="search_bar"
      v-model="search"
      label="Rechercher..."
      prepend-inner-icon="mdi-magnify"
      outlined
      dense
      class="mb-4"
    ></v-text-field>

    <!-- Data Table -->
    <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
      class="elevation-1"
      item-value="id"
    >
      <!-- Slot pour les actions -->
      <template #item.actions="{ item }">
        <v-btn icon color="primary" @click="$emit('edit', item.id)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon color="red" @click="$emit('delete', item.id)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';

export default defineComponent({
  name: 'ListItem',
  props: {
    headers: {
      type: Array as PropType<Array<{ title: string; key: string; align?: string; sortable?: boolean }>>,
      required: true
    },
    items: {
      type: Array as PropType<Array<{ id: number; }>>,
      required: true
    }
  },
  setup() {
    // Variable réactive pour la barre de recherche
    const search = ref('');

    return {
      search
    };
  },
});
</script>

<style scoped>
.v-btn {
  margin: 0 4px;
}
</style>