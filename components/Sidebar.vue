<template>
  <div class="flex">
    <div class="w-64 h-screen bg-accent text-primary border-width-2">
      <div class="p-6 text-xl font-bold">Menu</div>
      <nav class="mt-8">
        <ul>
          <li
            v-for="item in navItems"
            :key="item.name"
            class="px-6 py-2 hover:bg-secondary"
          >
            <NuxtLink
              v-if="item.name !== 'Exit'"
              :to="item.link"
              class="flex items-center space-x-6 text-sm font-medium"
            >
              <Icon :icon="item.icon" class="w-6 h-6" />
              <span>{{ item.name }}</span>
            </NuxtLink>
            <div
              v-else
              @click="handleLogout"
              class="flex items-center space-x-6 text-sm font-medium cursor-pointer"
            >
              <Icon :icon="item.icon" class="w-6 h-6" />
              <span>{{ item.name }}</span>
            </div>
          </li>
        </ul>
      </nav>
    </div>

    <div class="flex-1 p-6 bg-gray-100">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/useStore'

const navItems = ref([
  {
    name: 'Home',
    link: '/admin/home',
    icon: 'fa-solid:cat',
  },
  {
    name: 'Exit',
    icon: 'subway:exit',
  }
])

const router = useRouter()
const userStore = useAuthStore()

const handleLogout = async () => {
  try {
    await userStore.signOut()
    router.push('/login')
  } catch (error) {
    console.error('Logout failed:', error)
  }
}
</script>
