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
            v-model="grade.studentId"
            required
          ></v-select>
          <v-select
            :items="courses"
            label="Cour"
            item-title="name"
            item-value="id"
            v-model="grade.courseId"
            required
          ></v-select>
          <v-text-field
            label="Note"
            v-model.number="grade.grade"
            type="number"
            required
          ></v-text-field>
          <v-text-field
            label="Semestre"
            v-model="grade.semester"
            required
          ></v-text-field>
          <v-text-field
            label="Année Académique"
            v-model="grade.academicYear"
            required
          ></v-text-field>
          <v-btn type="submit" color="primary">Modifier la Note</v-btn>
        </v-form>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import api from "../plugins/api";

export default defineComponent({
  name: "EditGrade",
  setup() {
    const route = useRoute();
    const grade = ref<{id : number, studentId : Number, courseId : number, grade : number, semester : string, academicYear: string}>({
      id: 0,
      studentId: 0,
      courseId: 0,
      grade: 0,
      semester: "",
      academicYear: "",
    });

    const students = ref([]);
    const courses = ref([]);

    const fetchGrade = async (id : number) => {
      try {
        const response = await api.get(`/grades/`);
        response.data.forEach((element : {id : number, studentId : Number, courseId : number, grade : number, semester : string, academicYear: string}) => {
          if (element.id == id) {
            console.log(element);
            grade.value = {
              id: element.id,
              studentId: element.studentId,
              courseId: element.courseId,
              grade: element.grade,
              semester: element.semester,
              academicYear: element.academicYear,
            };
            console.log(grade.value);
          }
        });
      } catch (error) {
        console.error("Failed to fetch grade:", error);
      }
    };

    const fetchStudents = async () => {
      try {
        const response = await api.get("/students");
        students.value = response.data.map((student) => ({
          id: student.id,
          name: student.lastName + " " + student.firstName,
        }));
      } catch (error) {
        console.error("Failed to fetch students:", error);
      }
    };

    const fetchCourses = async () => {
      try {
        const response = await api.get("/courses");
        courses.value = response.data.map((course) => ({
          id: course.id,
          name: course.name,
        }));
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };

    onMounted(() => {
      const id = route.params.id;
      fetchStudents();
      fetchCourses();
      fetchGrade(id);
    });

    const submitForm = async () => {
      try {
        const id = grade.value.id;
        const dataToSend = {
            ...grade.value,
            grade: Number(grade.value.grade)
        }
        // avec api prof modification de l'academieyear ne fonctionne pas (enfin si si je nomme academie_year (comme la bdd) mais cela dependera de l'api de lilian)
        await api.put(`/grades/${id}`, dataToSend);
        alert("Note modifiée avec succès !");
      } catch (error) {
        console.error("Failed to edit grade:", error);
        alert("Erreur lors de la modification de la note.");
      }
    };

    return {
      grade,
      students,
      courses,
      submitForm,
    };
  },
});
</script>
