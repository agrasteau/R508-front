<template>
  <v-app>
    <v-main>
      <v-container>
        <!-- Titre et sélection de l'année académique -->
        <v-row class="d-flex align-center">
          <v-col cols="6">
            <h1>Statistiques</h1>
          </v-col>
          <v-col cols="6">
            <v-select
              v-model="selectedYear"
              :items="academicYears"
              label="Sélectionner une année académique"
              outlined
              dense
            ></v-select>
          </v-col>
        </v-row>

        <!-- Statistiques globales -->
        <v-row>
          <v-col cols="3">
            <v-card outlined>
              <v-card-title>Moyenne Générale</v-card-title>
              <v-card-subtitle>Moyenne de toutes les notes</v-card-subtitle>
              <v-card-text>
                <h2>{{ parseFloat(globalStats.globalAverage).toFixed(2) }} / 20</h2>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="3">
            <v-card outlined>
              <v-card-title>Nombre d'Étudiants</v-card-title>
              <v-card-subtitle>Total des étudiants inscrits</v-card-subtitle>
              <v-card-text>
                <h2>{{ globalStats.totalStudents }}</h2>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="3">
            <v-card outlined>
              <v-card-title>Nombre de Cours</v-card-title>
              <v-card-subtitle>Total des cours disponibles</v-card-subtitle>
              <v-card-text>
                <h2>{{ globalStats.totalCourses }}</h2>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="3">
            <v-card outlined>
              <v-card-title>Taux de Réussite</v-card-title>
              <v-card-subtitle>Taux de réussite moyen</v-card-subtitle>
              <v-card-text>
                <h2>{{ globalStats.averageSuccessRate }}%</h2>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from "vue";
import axios from "axios";
import Cookies from "js-cookie";

export default defineComponent({
  name: "Stats",
  setup() {
    const globalStats = ref({
      globalAverage: "0",
      totalStudents: "0",
      totalCourses: "0",
      averageSuccessRate: 0,
    });

    const academicYears = ref(["2022-2023", "2023-2024", "2024-2025"]);
    const selectedYear = ref(academicYears.value[0]); // Année par défaut (première année)
    const token = Cookies.get("token");

    const fetchGlobalStats = async () => {
      console.log("Année académique sélectionnée : ", selectedYear.value);
      try {
        const response = await axios.get("http://localhost:3000/api/stats/global", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            academicYear: selectedYear.value,
          },
        });

        console.log("Statistiques globales récupérées : ", response.data);

        globalStats.value = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des statistiques globales", error);
      }
    };

    // Surveillance des changements dans selectedYear
    watch(selectedYear, (newYear) => {
      console.log("Nouvelle année sélectionnée : ", newYear);
      fetchGlobalStats();
    });

    onMounted(() => {
      console.log("Chargement initial avec l'année : ", selectedYear.value);
      fetchGlobalStats();
    });

    return { globalStats, academicYears, selectedYear, fetchGlobalStats };
  },
});
</script>
