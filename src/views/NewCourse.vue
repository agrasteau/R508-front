<template>
    <v-app>
      <v-main>
        <v-container>
          <v-card>
            <v-card-title>Ajouter un nouveau cours</v-card-title>
            <v-card-text>
              <v-form ref="form" v-model="valid">
                <v-text-field
                  label="Code du cours"
                  v-model="course.code"
                  :rules="[rules.required]"
                  required
                ></v-text-field>
  
                <v-text-field
                  label="Nom du cours"
                  v-model="course.name"
                  :rules="[rules.required]"
                  required
                ></v-text-field>
  
                <v-text-field
                  label="Crédits"
                  v-model="course.credits"
                  type="number"
                  :rules="[rules.required, rules.numeric]"
                  required
                ></v-text-field>
  
                <v-textarea
                  label="Description"
                  v-model="course.description"
                  :rules="[rules.required]"
                  required
                ></v-textarea>
  
                <v-btn :disabled="!valid" @click="submitCourse" color="primary">
                  Ajouter
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from "vue";
  import axios from "axios";
  import Cookies from "js-cookie";
  import { useRouter } from "vue-router";
  
  export default defineComponent({
    name: "NewCourse",
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
  
      const rules = {
        required: (value: string) => !!value || "Ce champ est requis.",
        numeric: (value: number) =>
          !isNaN(value) || "Veuillez entrer un nombre valide.",
      };
  
      const router = useRouter();
  
      const submitCourse = async () => {
        try {
          const preparedCourse = {
            ...course.value,
            credits: Number(course.value.credits) || 0, 
          };

          console.log("Données à envoyer : ", preparedCourse);
  
          const response = await axios.post(
            "http://localhost:3000/api/courses",
            preparedCourse,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          router.push("/classes");
  
        } catch (error) {
        }
      };
  
      return { valid, course, rules, submitCourse };
    },
  });
  </script>
  