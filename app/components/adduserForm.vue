<script setup lang="ts">
import { rules, successMessage, errorMessage, setErrorMessage, setSuccessMessage } from '~/composables/states';
import { validateUser, type UserData } from '~/composables/userSchema';

const form = ref<UserData>({
    username: '',
    email: '',
    password: '',
    role: ''
});

const showPassword = ref(false);
const formIsValid = ref(false);
const formRef = ref();
const loading = ref(false);

const validateForm = () => {
    const isValid = validateUser(form.value);
    if (!isValid) {
        errorMessage.value = validateUser.errors?.map((err: any) => `${err.instancePath} ${err.message}`).join(', ') || 'Validation failed';
        return false;
    }
    errorMessage.value = '';
    return true;
};

const submitForm = async () => {
    if (!validateForm()) return;

    loading.value = true;
    try {
        const response = await $fetch('/api/users', {
            method: 'POST',
            body: form.value
        });
        
        form.value = {
            username: '',
            email: '',
            password: '',
            role: ''
        };
        
        emit('user-added', response);
        
    } catch (error: any) {
        setErrorMessage(error.data?.message || 'Failed to add user');
    } finally {
        loading.value = false;
        setSuccessMessage('User added successfully');
    }
};

const emit = defineEmits<{
    'user-added': [user: any]
}>();
</script>


<template>
    <v-form class="pa-10" ref="formRef" v-model="formIsValid" validate-on="blur lazy">
        <v-row>
            <v-col cols="12" md="6">
                <v-text-field label="Username" v-model="form.username" :rules="[rules.required, rules.username]"/>
            </v-col>
            <v-col cols="12" md="6">
                <v-text-field label="Email" type="email" v-model="form.email" :rules="[rules.required, rules.email]"/>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="6">
                <v-select label="Role" v-model="form.role" :items="['Admin', 'Developer', 'Moderator', 'Viewer']" :rules="[rules.required]" />
            </v-col>
            <v-col cols="12" md="6">
            <v-text-field 
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append-inner="showPassword = !showPassword"                
            label="Password" :rules="[rules.required, rules.password]"/>
            </v-col>
        </v-row>
        <v-btn type="submit" block  class="mt-5 bg-secondary" 
            @click="submitForm()" :loading="loading" :disabled="!formIsValid" >
            {{ loading ? 'Adding User...' : 'Add User' }}
        </v-btn>
    </v-form>
</template>