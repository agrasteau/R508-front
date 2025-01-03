<template>
  <v-container class="centered" max-width="500">
    <v-form @submit.prevent="login">
      <v-text-field v-model="email" label="Email" required></v-text-field>
      <v-text-field
        v-model="password"
        label="Password"
        type="password"
        required
      ></v-text-field>
      <v-btn type="submit" color="primary">Login</v-btn>
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
  methods: {
    async login() {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJwcm9mQGV4YW1wbGUuY29tIiwicm9sZSI6InByb2Zlc3NvciIsImlhdCI6MTczNTg5NzgxNiwiZXhwIjoxNzM1OTg0MjE2fQ.0Lp_B90QHxnm8gmAr0lS32jt2jyiEweYHpSuPUk5o-Y";
      /*try {
        const response = await axios.post(
          "http://localhost:3000/api/auth/login",
          {
            email: this.email,
            password: this.password,
          }
        );
        console.log(response);
        Cookies.set("token", token);
        console.log("Token:", token);
      } catch (error) {
        console.error("Login failed:", error);
      }
        */
    },
  },
});
</script>
