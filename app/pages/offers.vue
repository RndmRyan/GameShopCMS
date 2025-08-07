<template>
    <v-container class="d-flex justify-center align-center my-10">
        <v-row>
            <v-col cols="12" class="d-flex justify-center">
                <v-card width="85rem">
                    <v-row class="align-center pa-5 " justify="space-between">
                    <v-col cols="10"><v-card-title><h1>Offers</h1></v-card-title></v-col>
                    <v-col cols="2"><v-btn append-icon="mdi-plus" rounded="xl" class="bg-secondary">Add Offer</v-btn></v-col>
                    </v-row>
                    <OfferList />
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>