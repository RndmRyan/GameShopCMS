<script setup lang="ts">
const users = ref([
{
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'Admin',
        status: 'Active'
    },    {
        id: 2,
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        role: 'Moderator',
        status: 'Active'
    },    {
        id: 3,
        name: 'John Smith',
        email: 'john.smith@example.com',
        role: 'Developer',
        status: 'Active'
    }
    
])

const tablecolumns = ref<string[]>([])


if (useUser().value === 'Admin') {
    tablecolumns.value = [
        'ID',
        'Name',
        'Email',
        'Role',
        'Actions',
    ]
}
else if (useUser().value === 'Moderator') {
    tablecolumns.value = [
        'Name',
        'Email',
        'Role',
    ]
}
else {
    tablecolumns.value = [
        'Nothing to display'
    ]
}


</script>

<template>
    <v-table>
        <thead>
            <tr>
                <th v-for="column in tablecolumns" :key="column" class="text-center">
                    {{ column }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="user in users" :key="user.id" class="text-center">
                <td>{{ user.id }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.role }}</td>
                <td><v-btn icon size="small" color="error" variant="text"><v-icon>mdi-delete</v-icon></v-btn></td>
            </tr>
        </tbody>
    </v-table>
</template>