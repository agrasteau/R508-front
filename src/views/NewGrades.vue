<template>
  <v-app>
    <v-main>
      <v-container>
        <v-form @submit.prevent="submitForm">
          <v-select
            :items="students"
            label="Étudiant"
            item-title="lastName"
            item-value="id"
            v-model="newGrade.studentId"
            required
          ></v-select>
          <v-text-field
            label="ID Cours"
            v-model.number="newGrade.courseId"
            type="number"
            required
          ></v-text-field>
          <v-text-field
            label="Note"
            v-model.number="newGrade.grade"
            type="number"
            required
          ></v-text-field>
          <v-text-field
            label="Semestre"
            v-model="newGrade.semester"
            required
          ></v-text-field>
          <v-text-field
            label="Année Académique"
            v-model="newGrade.academicYear"
            required
          ></v-text-field>
          <v-btn type="submit" color="primary">Ajouter la Note</v-btn>
        </v-form>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, toRaw } from "vue";
import api from "../plugins/api";

export default defineComponent({
  name: "newGrades",
  setup() {
    // Variables réactives
    const newGrade = ref({
      id: 0,
      studentId: 0,
      courseId: 0,
      grade: 20,
      semester: "S1",
      academicYear: "0594-9229",
    });

    const students = ref([]);

    const fetchStudents = async () => {
      try {
        const response = await api.get("/students");
        students.value = response.data.map((student) => ({
          id: student.id,
          firstName: student.firstName,
          lastName: student.lastName,
          // Ajoutez d'autres propriétés si nécessaire
        }));
        console.log("Formatted students data:", students.value);
      } catch (error) {
        console.error("Failed to fetch students:", error);
      }
    };

    fetchStudents();

    const submitForm = async () => {
      try {
        await api.post("/grades", newGrade.value);
        alert("Note ajoutée avec succès !");
      } catch (error) {
        console.error("Failed to add grade:", error);
        alert("Erreur lors de l'ajout de la note.");
      }
    };

    return {
      newGrade,
      students,
      submitForm,
    };
  },
});
</script>
