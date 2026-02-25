<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SidebarBrand from '../ui/SidebarBrandHeader.vue'
import AdminSidebarSection from './AdminSidebarSection.vue'
import CoachSidebarSection from './CoachSidebarSection.vue'
import PlayerSidebarSection from './PlayerSidebarSection.vue'
import { useAuthStore } from '../../stores/auth.js'
import { useLanguage } from '../../composables/useLanguage'

const emit = defineEmits(['close'])
const route = useRoute()
const router = useRouter()
const { state, clearAuth } = useAuthStore()
const { t } = useLanguage()

const currentPath = computed(() => route.path)

function isRoleActive(role) {
  return state.user?.role === role
}

function shouldShowRole(role) {
  return state.user?.role === role
}

function onClose() {
  emit('close')
}

function handleLogout() {
  clearAuth()
  onClose()
  router.replace({ name: 'login' })
}
</script>

<template>
  <nav class="flex h-full flex-col" aria-label="Main navigation">
    <div class="py-2 pb-6 max-[480px]:pb-4">
      <div class="mb-5 flex items-start justify-between">
        <slot name="header">
          <SidebarBrand />
        </slot>
        <button
          type="button"
          class="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-slate-100 p-1.5 text-slate-500 transition-all hover:bg-slate-200 hover:text-slate-900 md:hidden"
          aria-label="Close sidebar"
          @click="onClose"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-full w-full">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <div
      class="flex-1 space-y-8 overflow-y-auto pr-1 [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-200"
    >
      <div class="space-y-2">
        <AdminSidebarSection
          v-if="shouldShowRole('admin')"
          :active-path="currentPath"
          :active-role="isRoleActive('admin')"
          @navigate="onClose"
        />
        <CoachSidebarSection
          v-if="shouldShowRole('coach')"
          :active-path="currentPath"
          :active-role="isRoleActive('coach')"
          @navigate="onClose"
        />
        <PlayerSidebarSection
          v-if="shouldShowRole('player')"
          :active-path="currentPath"
          :active-role="isRoleActive('player')"
          @navigate="onClose"
        />
      </div>

    </div>

    <div class="mt-auto pt-6">
      <button
        v-if="state.user"
        type="button"
        class="flex w-full items-center justify-center gap-3 rounded-xl border-1.5 border-red-100 bg-white p-3 text-[15px] font-semibold text-[var(--hope-p-vibrant-red)] transition-all hover:-translate-y-0.5 hover:border-red-200 hover:bg-red-50"
        @click="handleLogout"
      >
        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        <span>{{ t('common.logout') }}</span>
      </button>
    </div>
  </nav>
</template>

