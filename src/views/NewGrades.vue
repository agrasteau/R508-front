<template>
  <v-app>
    <v-main>
      <v-container>
        <v-form @submit.prevent="submitForm">
          <v-select
            :items="students"
            label="Étudiant"
            item-title="name"
            item-value="id"
            v-model="newGrade.studentId"
            required
          ></v-select>
          <v-select
            :items="courses"
            label="Cour"
            item-title="name"
            item-value="id"
            v-model="newGrade.courseId"
            required
          ></v-select>
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
      id: null,
      studentId: null,
      courseId: null,
      grade: null,
      semester: null,
      academicYear: null,
    });

    const students = ref([]);

    //student
    //[
    //   {
    //     "id": 0,
    //     "firstName": "string",
    //     "lastName": "string",
    //     "email": "user@example.com",
    //     "dateOfBirth": "2024-12-31",
    //     "studentId": "string"
    //   }
    // ]
    const fetchStudents = async () => {
      try {
        const response = await api.get("/students");
        students.value = response.data.map((student) => ({
          id: student.id,
          name: student.lastName + " " + student.firstName,
        }));
        console.log("Formatted students data:", students.value);
      } catch (error) {
        console.error("Failed to fetch students:", error);
      }
    };

    fetchStudents();

    const courses = ref([]);

    // course
    // [
    //   {
    //     "id": 0,
    //     "code": "string",
    //     "name": "string",
    //     "credits": 0,
    //     "description": "string"
    //   }
    // ]
    const fetchCourses = async () => {
      try {
        const response = await api.get("/courses");
        courses.value = response.data.map((course) => ({
          id: course.id,
          name: course.name,
        }));
        console.log("Formatted courses data:", courses.value);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };

    fetchCourses();

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
      courses,
      submitForm,
    };
  },
});
</script>
