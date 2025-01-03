<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row class="align-center justify-space-between">
        <v-col cols="auto">
          <h3>Notes</h3>
        </v-col>
        <v-col cols="auto">
          <v-btn @click="ajouterUnNote" color="primary">Ajouter une note</v-btn>
        </v-col>
        </v-row>
        <v-list>
          <ListItem
            :headers="mheaders"
            :items="items"
            :title="title"
            @edit="modifierUneNote"
            @delete="supprimerUneNote"
          />
        </v-list>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import ListItem from "../components/ListItem.vue";
import api from "../plugins/api";
import router from "../router";

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
          key: "name",
        },
        {
          title: "Cour",
          key: "course",
        },
        {
          title: "Note",
          key: "grade",
        },
        {
          title: "semestre",
          key: "semester",
        },
        { 
          title: "Actions", 
          key: "actions" 
        },
      ]
    );
    const items = ref<
      Array<{
        id: number;
        name: string;
        course: number;
        grade: number;
        semester: string;
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
        //[
        //   {
        //     "id": 0,
        //     "studentId": 0,
        //     "courseId": 0,
        //     "grade": 20,
        //     "semester": "S1",
        //     "academicYear": "3482-0192",
        //     "studentFirstName": "string",
        //     "studentLastName": "string",
        //     "courseCode": "string",
        //     "courseName": "string"
        //   }
        // ]
        items.value = response.data.map((grade) => ({
          id: grade.id,
          name: grade.studentLastName + " " + grade.studentFirstName,
          course: grade.courseCode + " " + grade.courseName,
          grade: grade.grade,
          semester: grade.semester + " " + grade.academicYear,
        }));
        console.log(items.value);
      } catch (error) {
        console.error("Failed to fetch items:", error);
      }
    };
    // Appeler fetchItems lors du montage du composant
    onMounted(() => {
      fetchItems();
    });

    const modifierUneNote = (id: number) => {
      router.push(`/editgrades/${id}`);
    };

    const supprimerUneNote = async (id) => {
      try {
        await api.delete(`/grades/${id}`);
        fetchItems(); // Refresh the list after deletion
        alert("Note supprimée avec succès !");
      } catch (error) {
        console.error("Failed to delete grade:", error);
        alert("Erreur lors de la suppression de la note.");
      }
    };

    return {
      search,
      items,
      mheaders,
      title,
      modifierUneNote,
      supprimerUneNote,
    };
  },
  methods: {
    ajouterUnNote() {
      router.push("/newGrades");
    },
  },
});
</script>
