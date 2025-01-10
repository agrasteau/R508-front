<template>
  <v-app>
    <v-main>
      <v-container>
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

        <v-row class="d-flex align-center">
          <v-col cols="6">
            <v-select
              v-model="selectedCourse"
              :items="courses"
              item-title="name"
              item-value="id"
              label="Sélectionner un cours"
              outlined
              dense
            ></v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-card v-if="courseStats" outlined>
              <v-card-title>Statistiques du Cours : {{ courseStats.courseName }}</v-card-title>
              <v-card-subtitle>Informations détaillées</v-card-subtitle>
              <v-card-text>
                <p><strong>Code du Cours:</strong> {{ courseStats.courseCode }}</p>
                <p><strong>Moyenne des Notes:</strong> {{ courseStats.averageGrade }} / 20</p>
                <p><strong>Note Minimale:</strong> {{ courseStats.minGrade }} / 20</p>
                <p><strong>Note Maximale:</strong> {{ courseStats.maxGrade }} / 20</p>
                <p><strong>Nombre d'Étudiants:</strong> {{ courseStats.totalStudents }}</p>
                <p><strong>Taux de Réussite:</strong> {{ courseStats.successRate }}%</p>
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
    const courseStats = ref<any>(null);
    const academicYears = ref(["2022-2023", "2023-2024", "2024-2025"]);
    const courses = ref<any[]>([]);
    const selectedYear = ref(academicYears.value[0]);
    const selectedCourse = ref(null);
    const token = Cookies.get("token");
    const errorSnackbar = ref(false);

    const fetchGlobalStats = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/stats/global", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            academicYear: selectedYear.value,
          },
        });
        globalStats.value = response.data;
      } catch (error) {
        errorSnackbar.value = true;
      }
    };

    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/courses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Courses data:", response.data);
        courses.value = response.data;
      } catch (error) {
        errorSnackbar.value = true;
      }
    };

    const fetchCourseStats = async () => {
      if (!selectedCourse.value) return;
      try {
        const response = await axios.get(`http://localhost:3000/api/stats/course/${selectedCourse.value}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            academicYear: selectedYear.value,
          },
        });
        courseStats.value = response.data;
      } catch (error) {
        errorSnackbar.value = true;
      }
    };

    watch(selectedYear, fetchGlobalStats);
    watch(selectedCourse, fetchCourseStats);

    onMounted(() => {
      fetchGlobalStats();
      fetchCourses();
    });

    return {
      globalStats,
      academicYears,
      selectedYear,
      selectedCourse,
      courses,
      courseStats,
      errorSnackbar,
    };
  },
});
</script>
