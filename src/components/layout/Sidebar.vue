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

const secondaryLinks = [
  { key: 'common.helpCenter', to: '/', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { key: 'common.notifications', to: '/notifications', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' },
]

const currentPath = computed(() => route.path)

function isActive(path) {
  return currentPath.value === path
}

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

      <section aria-label="Secondary navigation">
        <h2 class="mb-4 ml-2 text-[11px] font-bold uppercase tracking-widest text-slate-400">
          {{ t('common.resources') }}
        </h2>
        <ul class="space-y-1.5">
          <li v-for="link in secondaryLinks" :key="link.to">
            <RouterLink
              :to="link.to"
              class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] font-medium transition-all max-[480px]:p-2 max-[480px]:text-sm"
              :class="[
                isActive(link.to)
                  ? 'bg-sky-50 font-semibold text-[var(--hope-o-cyan-blue)]'
                  : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
              ]"
              @click="onClose"
            >
              <svg class="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="link.icon" />
              </svg>
              <span>{{ t(link.key) }}</span>
            </RouterLink>
          </li>
        </ul>
      </section>
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

