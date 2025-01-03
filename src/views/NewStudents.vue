<template>
    <v-app>
      <v-main>
        <v-container>
          <v-form @submit.prevent="submitForm">
            <v-text-field
              label="Prénom"
              v-model="newStudent.firstName"
              required
            ></v-text-field>
            <v-text-field
              label="Nom"
              v-model="newStudent.lastName"
              required
            ></v-text-field>
            <v-text-field
              label="Email"
              v-model="newStudent.email"
              type="email"
              required
            ></v-text-field>
            <v-text-field
              label="Date de Naissance"
              v-model="newStudent.dateOfBirth"
              type="date"
              required
            ></v-text-field>
            <v-text-field
              label="Numéro Étudiant"
              v-model="newStudent.studentId"
              required
            ></v-text-field>
            <v-btn type="submit" color="primary">Créer l'Étudiant</v-btn>
          </v-form>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from "vue";
  import api from "../plugins/api";
  
  export default defineComponent({
    name: "NewStudents",
    setup() {
      const newStudent = ref({
        firstName: "",
        lastName: "",
        email: "",
        dateOfBirth: "",
        studentId: "",
      });
  
      const submitForm = async () => {
        try {
          await api.post("/students", newStudent.value);
          alert("Étudiant créé avec succès !");
          // Réinitialiser le formulaire après la création de l'étudiant
          newStudent.value = {
            firstName: "",
            lastName: "",
            email: "",
            dateOfBirth: "",
            studentId: "",
          };
        } catch (error) {
          console.error("Failed to create student:", error);
          alert("Erreur lors de la création de l'étudiant.");
        }
      };
  
      return {
        newStudent,
        submitForm,
      };
    },
  });
  </script>
  