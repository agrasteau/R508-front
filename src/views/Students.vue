<template>
  <v-app>
    <v-main>
      <v-container>
        <v-btn @click="ajouterUnEleve" color="primary">Ajouter un eleve</v-btn>
        <v-list>
          <v-list-item-group>
            <v-list-item
              v-for="student in students"
              :key="student.id"
            >
              <v-list-item-content>
                <v-list-item-title>
                  <a :href="`/students/${student.id}`"> {{ student.lastName }} {{ student.firstName }} </a>
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ student.email }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-list-item-title>
                  {{ student.studentId }}
                </v-list-item-title>
              </v-list-item-action>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import api from "../plugins/api";
import router from "../router";

export default defineComponent({
  name: "Students",
  setup() {
    const students = ref([]);

    const fetchStudents = async () => {
      try {
        const response = await api.get("/students");
        students.value = response.data;
      } catch (error) {
        console.error("Failed to fetch students:", error);
      }
    };

    onMounted(() => {
      fetchStudents();
    });

    return {
      students,
    };
  },
  methods: {
    ajouterUnEleve() {
      router.push("/newstudents")
    }
  }
});
</script>