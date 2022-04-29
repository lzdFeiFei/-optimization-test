<template>
  <div>Axios test</div>
  <div>Message: {{ message }}</div>
  <el-button @click="getMessage">Click me</el-button>
  <el-calendar v-model="value" />
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
const value = ref(new Date());
axios.defaults.baseURL = "http://localhost:3000";

const message = ref("");
const getMessage = () => {
  axios
    .get("/")
    .then(function (response) {
      message.value = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};
</script>

<style scoped></style>
