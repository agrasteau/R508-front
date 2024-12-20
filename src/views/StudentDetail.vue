<template>
  <v-container>
    <!-- Bouton de retour -->
    <v-btn variant="text" class="mb-4" href="/etudiants">
      <v-icon left>mdi-arrow-left</v-icon> Retour à la liste
    </v-btn>

    <!-- Carte des informations de l'étudiant -->
    <v-card outlined class="mb-6">
      <v-card-title>
        <v-row justify="space-between" align="center">
          <div>
            <h2>{{ student.name }}</h2>
            <p class="text-subtitle-1">Numéro étudiant : {{ student.id }}</p>
          </div>
          <v-btn class="pink-btn" @click="downloadReport">
            <v-icon left>mdi-download</v-icon> Relevé de notes
          </v-btn>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <p>Email : <strong>{{ student.email }}</strong></p>
          </v-col>
          <v-col cols="12" md="6">
            <p>Date de naissance : <strong>{{ student.birthdate }}</strong></p>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <h3>Notes</h3>
    <ListItem
      :headers="headers"
      :items="grades"
    />
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ListItem from '../components/ListItem.vue'; 
export default defineComponent({
  name: 'StudentDetails',
 components: {
    ListItem,
  },
  data() {
    return {
      student: {
        name: 'Alexis Dalle',
        id: 'ST001',
        email: 'alexis@example.com',
        birthdate: '28/05/2002',
      },
      grades: [
        {
          étudient: 'INFO101 - Introduction aux BDD',
          course: 'R5.A.08 - Qualité de développement',
          grade: '18.00/20',
          semester: 'S4 - 2024-2025',
        },
        {
          étudient: 'INFO101 - Introduction aux BDD',
          course: 'INFO101 - Introduction aux BDD',
          grade: '16.00/20',
          semester: 'S4 - 2024-2025',
        },
        {
          étudient: 'INFO101 - Introduction aux BDD',
          course: 'INFO101 - Introduction aux BDD',
          grade: '15.00/20',
          semester: 'S3 - 2024-2025',
          icon: 'mdi-pencil', action: true
        },
      ],
    };
  },
  methods: {
    downloadReport() {
      console.log('Téléchargement du relevé de notes...');
      // Logique pour télécharger le relevé de notes
    },
    editGrade(grade: any) {
      console.log('Édition de la note', grade);
      // Logique pour éditer une note
    },
    deleteGrade(grade: any) {
      console.log('Suppression de la note', grade);
      // Logique pour supprimer une note
    },
  },
});
</script>

<style scoped>
.pink-btn {
  background-color: #e50073;
  color: white;
}

.pink-btn:hover {
  background-color: #b3005a;
}
</style>
