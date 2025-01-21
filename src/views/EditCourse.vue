<template>
    <v-app>
      <v-main>
        <v-container>
          <v-card>
            <v-card-title>Modifier un cours</v-card-title>
            <v-card-text>
              <v-form ref="form" v-model="valid">
                <v-text-field
                  id="course_code"
                  label="Code du cours"
                  v-model="course.code"
                  :rules="[rules.required]"
                  required
                ></v-text-field>
  
                <v-text-field
                  id="course_name"
                  label="Nom du cours"
                  v-model="course.name"
                  :rules="[rules.required]"
                  required
                ></v-text-field>
  
                <v-text-field
                  id="course_credits"
                  label="Crédits"
                  v-model="course.credits"
                  type="number"
                  :rules="[rules.required, rules.numeric]"
                  required
                ></v-text-field>
  
                <v-textarea
                  id="course_description"
                  label="Description"
                  v-model="course.description"
                  :rules="[rules.required]"
                  required
                ></v-textarea>
  
                <v-btn :disabled="!valid" id="submit_button" @click="submitCourse" color="primary">
                  Modifier
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from "vue";
  import api from "../plugins/api";
  import Cookies from "js-cookie";
  import { useRouter, useRoute } from "vue-router";
  
  export default defineComponent({
    name: "EditCourse",
    setup() {
      const valid = ref(false);
      const course = ref({
        id: 0,
        code: "",
        name: "",
        credits: 1,
        description: "",
      });
      const token = Cookies.get("token");
      const router = useRouter();
      const route = useRoute();
  
      const rules = {
        required: (value: string) => !!value || "Ce champ est requis.",
        numeric: (value: number) =>
          !isNaN(value) || "Veuillez entrer un nombre valide.",
      };
  
      const fetchCourse = async (id: number) => {
        try {
          const response = await api.get(`/courses/${id}`);
          course.value = response.data;
        } catch (error) {
          console.error("Erreur lors de la récupération du cours", error);
          alert("Impossible de charger les données du cours.");
        }
      };
  
      const submitCourse = async () => {
        try {
          const preparedCourse = {
            ...course.value,
            credits: Number(course.value.credits) || 0,
          };
  
          await api.put(
            `/courses/${course.value.id}`,
            preparedCourse
          );

          router.push("/classes");
        } catch (error) {
          console.error("Erreur lors de la modification du cours", error);
          alert("Une erreur est survenue. Veuillez réessayer.");
        }
      };
  
      onMounted(() => {
        const id = route.query.id;
        if (id) {
          fetchCourse(Number(id));
        } else {
          alert("Aucun identifiant de cours fourni.");
          router.push("/classes");
        }
      });
  
      return { valid, course, rules, submitCourse };
    },
  });
  </script>
  