<template>
  <v-app>
    <v-main>
      <v-container>
        <v-btn @click="ajouterUnNote" color="primary">Ajouter une note</v-btn> 
        <v-list>
          <ListItem :headers="mheaders" :items="items" :title="title" />
        </v-list>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import ListItem from "../components/ListItem.vue";
import api from "../plugins/api";

export default defineComponent({
  name: "Grades",
  components: {
    ListItem,
  },
  setup() {
    // Variables réactives
    const title = "notes des etudiants";
    const search = ref("");
    const mheaders = ref(
      // Array<{ title: string; key: string; align?: string; sortable?: boolean }>

      [
        {
          title: "Nom",
          key: "studentLastName",
        },
        {
          title: "Prenom",
          key: "studentFirstName",
        },
        {
          title: "Note",
          key: "grade",
        },
        {
          title: "semestre",
          key: "semester",
        },
      ]
    );
    const items = ref<
      Array<{
        id: number;
        studentId: number;
        courseId: number;
        grade: number;
        semester: string;
        academicYear: string;
        studentFirstName: string;
        studentLastName: string;
        courseCode: string;
        courseName: string;
      }>
    >([]);
    // Requête API pour récupérer les items
    const fetchItems = async () => {
      try {
        // insertion de valeur en brute
        // const newStudent = ref({id: 1,firstName: "string",lastName: "string",email: "user@example.com",dateOfBirth: "2024-12-24",studentId: "string"});
        // await api.post('/students', { ...newStudent.value });
        // const newCourse = ref({id: 1,code: "string",name: "string",credits: 20,description: "string"});
        // await api.post('/courses', { ...newCourse.value });
        // const newGrade = ref({ studentId: 1, courseId: 1, grade: 20, semester: "S1", academicYear: "3341-3215" });
        // await api.post('/grades', { ...newGrade.value });
        const response = await api.get("/grades");
        console.info(response.data);
        items.value = response.data;
      } catch (error) {
        console.error("Failed to fetch items:", error);
      }
    };
    // Appeler fetchItems lors du montage du composant
    onMounted(() => {
      fetchItems();
    });
    return { search, items , mheaders};
  },
  methods: {
    handleActionClick() {
      // Action triggered when the button in ListItem is clicked
      alert("Action button clicked!");
    },
    ajouterUnNote() {
      this.$router.push("/newGrades");
    }
  },
});
</script>
