<script setup lang="ts">
import { useThemeBackground } from '../composables/states';
//import { ref } from 'vue'
//const drawer = ref(true)
//<v-app-bar-nav-icon v-if="$vuetify.display.smAndDown" @click="drawer = !drawer" />

const themeBackground = useThemeBackground();

const toggleTheme = () => {
  themeBackground.value = themeBackground.value === 'light' ? 'dark' : 'light'
}
const toggleLogin = () => {
  useAuthStore().logout();
}
</script>

<template>
<v-app-bar border="b" class="ps-4" elevation="4">

  <v-btn height="48" prepend-icon="mdi-key-outline" slim to="/userManagement" class="me-2" variant="flat">User Management</v-btn>
  <v-btn height="48" prepend-icon="mdi-account-group-outline" slim to="/players" class="me-2" variant="flat">Players</v-btn>

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