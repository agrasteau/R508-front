<template>
  <v-container>
    <!-- Barre de recherche -->
    <v-text-field
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
      item-value="code"
    >
      <!-- Slot pour les actions -->
      <template #item.actions="{ item }">
        <v-btn
          icon
          color="primary"
          @click="onEdit(item)"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn
          icon
          color="red"
          @click="onDelete(item)"
        >
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
      type: Array as PropType<Array<{ code: string; name: string; credits: number }>>,
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
  methods: {
    onEdit(item: any) {
      console.log('Edit clicked for:', item);
      alert(`Modifier : ${item.name} - Fonctionnalité à implémenter`);
    },
    onDelete(item: any) {
      console.log('Delete clicked for:', item);
      alert(`Supprimer : ${item.name} - Fonctionnalité à implémenter` );
    }
  }
});
</script>

<style scoped>
.v-btn {
  margin: 0 4px;
}
</style>
