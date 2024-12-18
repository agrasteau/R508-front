<template>
  <v-app>
    <Header />
    <v-main>
      <v-container>
        <ListItem :headers="tableHeaders" :items="tableData" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from './components/Header.vue'; 
import ListItem from './components/ListItem.vue'; 

export default defineComponent({
  name: 'App',
  components: {
    Header,
    ListItem
  },
   data() {
    return {
     
      tableHeaders: [
        { title: 'Code', key: 'code', align: 'start' },
        { title: 'Nom', key: 'name' },
        { title: 'Crédits', key: 'credits' },
        { title: 'Actions', key: 'actions', sortable: false }
      ],
      
      tableData: [
        { code: 'R5.A.08', name: 'Qualité de développement', credits: 5 },
        { code: 'INFO101', name: 'Introduction aux BDD', credits: 3 },
        { code: 'TEST', name: 'TEST LESSON', credits: 5 }
      ]
    };
  },
  methods: {
    handleActionClick() {
      alert('Action button clicked!');
    }
  }
});
</script>
