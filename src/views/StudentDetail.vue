<template>
  <v-container>
    <!-- Bouton de retour -->
    <v-btn variant="text" class="mb-4" href="/students">
      <v-icon left>mdi-arrow-left</v-icon> Retour à la liste
    </v-btn>

    <!-- Carte des informations de l'étudiant -->
    <v-card outlined class="mb-6">
      <v-card-title>
        <v-row justify="space-between" align="center">
          <div>
            <h2>{{ student.name }}</h2>
            <p class="text-subtitle-1">
              Numéro étudiant : {{ student.studentId }}
            </p>
          </div>
            <v-select
            v-model="selectedYear"
            :items="academicYears"
            label="Sélectionner une année académique"
            outlined
            dense
          ></v-select>
          <v-btn color="primary" @click="fetchPdfLink" download outlined>
            <v-icon left>mdi-download</v-icon> Relevé de notes
          </v-btn>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <p>
              Email : <strong>{{ student.email }}</strong>
            </p>
          </v-col>
          <v-col cols="12" md="6">
            <p>
              Date de naissance : <strong>{{ student.birthdate }}</strong>
            </p>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <h3>Notes</h3>
    <ListItem
      :headers="headers"
      :items="grades"
      @edit="modifierUneNote"
      @delete="supprimerUneNote"
    />
  </v-container>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import ListItem from "../components/ListItem.vue";
import api from "../plugins/api";
import { useRoute } from "vue-router";
import router from "../router";
export default defineComponent({
  name: "StudentDetails",
  components: {
    ListItem,
  },
  data() {
    return {
      headers: [
        { title: "Cours", key: "course", align: "start", sortable: true },
        { title: "Note", key: "grade", align: "center", sortable: true },
        { title: "Semestre", key: "semester", align: "center", sortable: true },
        { title: "Actions", key: "actions", align: "center", sortable: false },
      ],
    };
  },
  setup() {
    const academicYears = ref(["2022-2023", "2023-2024", "2024-2025"]);
    const selectedYear = ref(academicYears.value[0]);

    const route = useRoute();
    const student = ref<{
      name: string;
      studentId: string;
      email: string;
      birthdate: any;
    }>({});

    const fetchStudent = async (id: number) => {
      const res = await api.get("/students");
      res.data.forEach(
        (element: {
          id: number;
          firstName: string;
          lastName: string;
          studentId: string;
          email: string;
          birthdate: any;
        }) => {
          if (element.id == id) {
            student.value = {
              ...element,
              name: element.firstName + " " + element.lastName,
            };
          }
        }
      );
    };

    const grades = ref<
      Array<{ student: String; course: String; grade: string; semester: any }>
    >([]);

    const fetchGrades = async (idStudent: number) => {
      const res = await api.get("/grades/student/" + idStudent);
      grades.value = res.data.map((grade: any) => ({
        id: grade.id,
        course: grade.courseCode + " " + grade.courseName,
        grade: grade.grade,
        semester: grade.semester + " " + grade.academicYear,
      }));
    };

    const pdfLink = ref<String>("");

    const fetchPdfLink = async () => {
      try {
        const idStudent: number = Number(route.params.id);
        const response = await api.get(
          `/grades/student/${idStudent}/transcript`,
          { 
            params: 
            { 
              academicYear: selectedYear.value 
            }, 
            responseType: "blob" 
          }
        );
        const pdfBlob = new Blob([response.data], { type: "application/pdf" });
        const pdfURL = URL.createObjectURL(pdfBlob);
        const link = document.createElement("a");
        link.href = pdfURL;
        link.download = `transcript_${idStudent}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("Erreur lors de la récupération du transcript : ", error);
      }
    };

    onMounted(() => {
      const idStudent: number = Number(route.params.id);
      fetchStudent(idStudent);
      fetchGrades(idStudent);
    });

    const modifierUneNote = (id: number) => {
      router.push(`/editgrades/${id}`);
    };

    const supprimerUneNote = async (id: number) => {
      try {
        await api.delete(`/grades/${id}`);
        const idStudent: number = route.params.id;
        fetchGrades(idStudent);
        alert("Note supprimée avec succès !");
      } catch (error) {
        console.error("Failed to delete grade:", error);
        alert("Erreur lors de la suppression de la note.");
      }
    };

    return {
      student,
      grades,
      modifierUneNote,
      supprimerUneNote,
      selectedYear,
      academicYears,
      fetchPdfLink,
      pdfLink,
    };
  },
});
</script>
