<template>  
    <v-container class="d-flex justify-center align-center">
        <v-row class="my-16">
            <v-col cols="12" class="d-flex justify-center">
                <v-card width="85rem">
                    <v-card-title>
                        <h1 class="text-center pt-10">Add User</h1>
                    </v-card-title>
                    <AdduserForm />
                </v-card>
            </v-col>
            <v-col cols="12" class="d-flex justify-center">
                <v-card width="85rem">
                    <v-card-title>
                        <h1 class="text-center pt-10">Users</h1>
                    </v-card-title>
                    <UserTable />
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>