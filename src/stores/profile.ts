import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useProfileStore = defineStore('profile', () => {
  const token = ref('')
  const apiUrl = ref('')

  const isLogin = computed(() => token)

  const setToken = (data: string) => {
    token.value = data
  }
  const setApiUrl = (data: string) => {
    apiUrl.value = data
  }

  return {
    token,
    apiUrl,

    isLogin,

    setToken,
    setApiUrl,
  }
}, {
  persist: {
    key: 'profile',
  },
})
