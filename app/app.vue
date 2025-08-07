<script setup lang="ts">
import { useThemeBackground } from './composables/states';

const themeBackground = useThemeBackground()
</script>

<template>
    <v-app>
        <v-theme-provider :theme="themeBackground" with-background>
            <NuxtLayout>
                <NuxtPage class="pt-16"/>
            </NuxtLayout>
        </v-theme-provider>
    </v-app>
</template>