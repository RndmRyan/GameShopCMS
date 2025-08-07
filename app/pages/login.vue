<script setup lang="ts">
definePageMeta({
  layout: 'blank',
})
</script>

<template>  
    <v-container height="100vh" class="d-flex justify-center align-center">
        <v-row>
            <v-col cols="12" class="d-flex justify-center">
                <v-card width="50rem">
                    <v-card-title>
                        <h1 class="text-center pt-10">Login</h1>
                    </v-card-title>
                    <LoginForm />
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>