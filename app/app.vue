<script setup lang="ts">
import { successMessage, errorMessage } from './composables/states';
import { useThemeBackground } from './composables/states';

const themeBackground = useThemeBackground()
</script>

<template>
    <v-app>
        <v-theme-provider :theme="themeBackground" with-background>
        <Appbar />

        <NuxtPage class="pa-16"/>

        <v-container width="25rem" class="position-fixed" style="top: 4rem; right: 1rem;">
            <v-alert v-if="successMessage"
            :title="successMessage"
            type="success" closable
            ></v-alert>
            <v-alert v-if="errorMessage"
                title="Error adding user" :text="errorMessage"
                type="error" closable
            ></v-alert>
        </v-container>
        </v-theme-provider>
    </v-app>
</template>