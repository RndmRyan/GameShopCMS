<template>
<v-navigation-drawer permanent>

  <v-divider class="py-5" ></v-divider>
  <v-list-item class="py-5" item-type="subheader" title="User Managment"></v-list-item>
  <v-list-item class="py-3" link title="CMS Users" prepend-icon="mdi-key-outline"  to="/userManagement"></v-list-item>
  <v-list-item class="py-3" link title="Players" prepend-icon="mdi-account-group-outline" to="/players"></v-list-item>
  <v-divider></v-divider>
  <v-list-item class="py-5" item-type="subheader" title="Game Store"></v-list-item>
  <v-list-item class="py-3" link title="Offers" prepend-icon="mdi-tag-outline"  to="/offers"></v-list-item>
  <v-list-item class="py-3" link title="Collections" prepend-icon="mdi-package-variant-closed" to="/players"></v-list-item>
  <v-list-item class="py-3" link title="Shop Configs" prepend-icon="mdi-clipboard-text-outline" to="/players"></v-list-item>
</v-navigation-drawer>
</template> 