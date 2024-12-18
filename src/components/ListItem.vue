<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="items"
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
import { defineComponent, PropType } from 'vue';

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
  methods: {
    onEdit(item: any) {
      console.log('Edit clicked for:', item);
      alert(`Modifier : ${item.name}`);
    },
    onDelete(item: any) {
      console.log('Delete clicked for:', item);
      alert(`Supprimer : ${item.name}`);
    }
  }
});
</script>

<style scoped>
.v-btn {
  margin: 0 4px;
}
</style>
