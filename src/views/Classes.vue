<template>
  <v-app>
<v-main>
      <v-container>
        <v-row class="align-center justify-space-between">
          <v-col cols="auto">
            <h3 id='title_classes'>Cours</h3>
          </v-col>
          <v-col cols="auto">
            <v-btn id='new_classe' color="primary" @click="$router.push('/newcourse')">
                Ajout d'un nouveau cours
            </v-btn>      
          </v-col>
        </v-row>
        <v-list>
          <ListItem
          :headers="mheaders"
          :items="items"
          @edit="editCourse"
          @delete="deleteCourse"
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
import { useRouter } from 'vue-router';

import api from '../plugins/api';
import Cookies from 'js-cookie';

export default defineComponent({
  name: 'Classes',
  components: {
    Header,
    ListItem
  },
  setup() {
    const token = Cookies.get('token');
    const router = useRouter();

    const mheaders = ref(
      [
        {
          title: "Id",
          key: "id",
        },
        {
          title: "Code",
          key: "code",
        },
        {
          title: "Name",
          key: "name",
        },
        {
          title: "Credits",
          key: "credits",
        },
        {
          title: "Description",
          key: "description",
        },
        { 
          title: "Actions", 
          key: "actions" 
        },
      ]
    );

    const items = ref([]);
    //const items = ref<Course[]>([]);

    const fetchItems = async () => {
      try{
        const coursesResponse = await api.get("/courses");
    items.value = coursesResponse.data;
  }
    catch{} 
  }

  const editCourse = async (id: number) => {
    router.push(`/editcourse?id=${id}`);
    }

  const deleteCourse = async (id: number) => {
      try {
        await api.delete(`/courses/${id}`);
        fetchItems();
      } catch (error) {
        console.error("Erreur lors de la suppression du cours", error);
        alert("Erreur lors de la suppression du cours.");
      }
    }


  onMounted(() => {
      fetchItems();
      console.log(items);
    });
  return {items, mheaders, deleteCourse, editCourse};
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
