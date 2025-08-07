<script setup lang="ts">
  import { ref } from 'vue'
  import type { PlayerData } from '@/composables/userSchema'

  const itemsPerPage = ref(25)

const headers = ref([
  { title: 'User ID', key: 'id', align: 'start' },
  { title: 'Username', key: 'username' },
  { title: 'Cash', key: 'wallet.Cash', align: 'end', sortable: false  },
  { title: 'Coins', key: 'wallet.Coins', align: 'end', sortable: false  },
  { title: 'Last Updated', key: 'update_time', align: 'end' },
  { title: 'Actions', key: 'actions', align: 'end', sortable: false }
])

const serverItems = ref<PlayerData[]>([])
const loading = ref(true)
const totalItems = ref(0)
const search = ref('')

// Fetch + sort + paginate
async function loadItems({ page, itemsPerPage, sortBy }: { page: number, itemsPerPage: number, sortBy: any }) {
  loading.value = true

  const response = await useApi<{ players: PlayerData[] }>('/api/nakama/getplayers')
  if (!response || !response.players) {
    console.error('Failed to fetch player data')
    loading.value = false
    return
  }
  let items = response.players

  if (sortBy.length) {
    const { key, order } = sortBy[0]
    items.sort((a:any, b:any) => {
        const aVal = a[key as keyof PlayerData]
        const bVal = b[key as keyof PlayerData]
        let result = 0

        if (typeof aVal === 'string' && typeof bVal === 'string') {
        result = aVal.localeCompare(bVal)
        } else if (typeof aVal === 'number' && typeof bVal === 'number') {
        result = aVal - bVal
        }

        return order === 'desc' ? -result : result
    })
}
  // Pagination
  const start = (page - 1) * itemsPerPage
  const end = start + itemsPerPage
  const paginated = items.slice(start, end)

  serverItems.value = paginated as unknown as PlayerData[]
  totalItems.value = items.length
  loading.value = false
}

const editItem = (item: any) => {
  console.log('Edit', item)
  // open dialog or navigate to edit page
}

const deleteItem = (item: any) => {
  console.log('Delete', item)
  // confirm and trigger deletion
}
</script>

<template>
    <v-data-table-server
      v-model:items-per-page="itemsPerPage"
      :headers="headers as any"
      :items="serverItems"
      :items-length="totalItems"
      :loading="loading"
      :search="search"
      item-value="userID"
      @update:options="loadItems"
      loading-text="Loading... Please wait">
  
      <template #item.update_time="{ item }">
        {{ new Date(item.update_time).toLocaleString() }}
      </template>
      
      <template #item.actions="{ item }">
        <v-btn icon @click="() => editItem(item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon @click="() => deleteItem(item)">
          <v-icon color="red">mdi-delete</v-icon>
        </v-btn>
      </template>

</v-data-table-server>
</template>  