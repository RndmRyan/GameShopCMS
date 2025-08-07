<script setup lang="ts">
import { successMessage, errorMessage } from '../composables/states';

</script>
<template>
    <div>
      <Appbar />
      <v-row>
        <v-col cols="2"><sidebar /></v-col>
        <v-col cols="10"><slot /></v-col>
      </v-row>
    </div>
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

  </template>