<script setup lang="ts">
import { rules, setSuccessMessage, setErrorMessage } from '~/composables/states';
import { ref } from 'vue';
import { useAuth } from '../composables/useAuth';

const email = ref('');
const password = ref('');
const error = ref<string | null>(null);
const loading = ref(false);
const showPassword = ref(false);
const formIsValid = ref(false);

const { login } = useAuth();
const router = useRouter();

const submitForm = async () => {
  if (!formIsValid.value) return;

  loading.value = true;
  error.value = null;

  try {
    const success = await login({ email: email.value, password_raw: password.value });

    if (success) {
      console.log('Login successful, navigating...');
      setSuccessMessage('Logged in successfully!');
      await router.push('/');
    } else {
      const credentialsError = 'Login failed. Please check your credentials.';
      error.value = credentialsError;
      setErrorMessage(credentialsError);
    }
  } catch (err: any) {
    console.error("An exception occurred during login:", err);
    error.value = err.message || 'An unexpected error occurred.';
    setErrorMessage(error.value || 'An unexpected error occurred.');
  } finally {
    loading.value = false;
  }
};
</script>


<template>
    <v-form class="pa-10" v-model="formIsValid" @submit.prevent="submitForm">
        <v-row>
            <v-col cols="12">
                <v-text-field label="Email" type="email" v-model="email" :rules="[rules.required, rules.email]"/>
            </v-col>
            <v-col cols="12">
            <v-text-field 
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append-inner="showPassword = !showPassword"                
            label="Password" :rules="[rules.required]"/>
            </v-col>
        </v-row>
        <v-btn type="submit" block class="mt-5 bg-secondary" :disabled="loading || !formIsValid" :loading="loading">
          {{ loading ? 'Logging in...' : 'Login' }}
        </v-btn>
    </v-form>
</template>