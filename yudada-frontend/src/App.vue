<template>
  <div id="app">
    <template v-if="route.path.startsWith('/user')">
      <router-view />
    </template>
    <template v-else>
      <BasicLayout />
    </template>
  </div>
</template>

<script setup lang="ts">
import BasicLayout from "@/layouts/BasicLayout.vue";
import { useRoute } from "vue-router";
import { useLoginUserStore } from "@/store/userStore";

const route = useRoute();

const loginUserStore = useLoginUserStore();
loginUserStore.fetchLoginUser();
</script>

<style scoped></style>
