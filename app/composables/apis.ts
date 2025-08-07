export const usePlayersAPI = async () => {
    const { data, error } = await useFetch('/api/nakama/getplayers')
  
    if (error.value) {
      console.error('Failed to fetch players:', error.value)
      return { players: [] }
    }
  
    return { players: data.value?.players || [] }
  }