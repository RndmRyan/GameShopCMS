<script setup lang="ts">
import { rules, setSuccessMessage, setErrorMessage } from '../composables/states';
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';

const email = ref('');
const password = ref('');
const error = ref<string | null>(null);
const loading = ref(false);
const showPassword = ref(false);
const formIsValid = ref(false);

const authStore = useAuthStore();
const router = useRouter();

const handleLogin = async () => {
  loading.value = true;
  error.value = null;
  const success = await authStore.login({ email: email.value, password_raw: password.value });
  console.log(success);
  loading.value = false;

  if (success) {
    router.push('/');
  } else {
    error.value = 'Login failed. Please check your credentials.';
  }
};

const submitForm = async () => {
  try {
    await handleLogin();
  } catch (err: any) {
    setErrorMessage(err.message);
  }
  setSuccessMessage('Logged in successfully');
};
</script>


<template>
    <v-form class="pa-10" v-model="formIsValid">
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
        <v-btn type="submit" block class="mt-5 bg-secondary" @click="submitForm()">Login</v-btn>
    </v-form>
</template>