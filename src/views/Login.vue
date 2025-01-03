<template>
  <v-container class="centered" max-width="500">
    <v-container height="35vh" />
    <v-form @submit.prevent="login">
      <v-text-field v-model="email" id="id" label="Email" required></v-text-field>
      <v-text-field
         id="password"
        v-model="password"
        label="Password"
        type="password"
        required
      ></v-text-field>
      <v-btn type="submit" id="login" color="primary">Login</v-btn>
    </v-form>
  </v-container>
</template>
<script>
import { defineComponent } from "vue";
import axios from "axios";
import Cookies from "js-cookie";

export default defineComponent({
  name: "Login",
  data() {
    return { email: "", password: "" };
  },
  mounted() {
    this.$emit("disableBar");

    // Obtenir les paramètres de l'URL
    const urlParams = new URLSearchParams(window.location.search);

    // Récupérer les valeurs du paramètre
    const deco = urlParams.get("deco");

    console.log(deco);

    if (deco == "true") {
      Cookies.remove("token");
      alert("vous avez bien ete deconnecter");
    } 
  },
  methods: {
    async login() {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/auth/login",
          {
            email: this.email,
            password: this.password,
          }
        );
        console.log(response);
        const token = response.data.token;
        Cookies.set("token", token);
        this.$emit("enableBar");
        this.$router.push("/students");
      } catch (error) {
        console.error("Login failed:", error);
      }
    },
  },
});
</script>