<script setup lang="ts">
import { useThemeBackground } from '../composables/states';
import { useAuth } from '../composables/useAuth';

const themeBackground = useThemeBackground();

const toggleTheme = () => {
  themeBackground.value = themeBackground.value === 'light' ? 'dark' : 'light'
}
const toggleLogin = () => {
  useAuth().logout();
}
</script>

<template>
<v-app-bar border="b" class="ps-4" elevation="4">

  <template #prepend>
    <div class="d-flex align-center"><v-img src="/favicon.ico" width="30" height="30" alt="logo" /></div>
  </template>

  <template #append>
    <v-btn class="text-none me-2" height="48" icon slim @click="toggleTheme">
      <v-icon v-if="themeBackground === 'dark'">mdi-weather-sunny</v-icon>
      <v-icon v-else>mdi-weather-night</v-icon>
    </v-btn>
    <v-btn class="text-none me-2" height="48" icon slim @click="toggleLogin">
      <v-icon >mdi-logout</v-icon>
    </v-btn>
  </template>            
</v-app-bar>
</template>