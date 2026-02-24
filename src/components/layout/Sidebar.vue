<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SidebarBrand from '../ui/SidebarBrandHeader.vue'
import AdminSidebarSection from './AdminSidebarSection.vue'
import CoachSidebarSection from './CoachSidebarSection.vue'
import PlayerSidebarSection from './PlayerSidebarSection.vue'
import { useAuthStore } from '../../stores/auth.js'

const emit = defineEmits(['close'])
const route = useRoute()
const router = useRouter()
const { state, clearAuth } = useAuthStore()

const secondaryLinks = [
  { label: 'Help Center', to: '/' },
  { label: 'Notifications', to: '/notifications' },
]

const currentPath = computed(() => route.path)

function isActive(path) {
  return currentPath.value === path
}

function isRoleActive(role) {
  return state.user?.role === role
}

function onClose() {
  emit('close')
}

function handleLogout() {
  clearAuth()
  router.replace({ name: 'login' })
}
</script>

<template>
  <nav class="sidebar" aria-label="Main navigation">
    <div class="sidebar__header">
      <div class="sidebar__brand-wrapper">
        <slot name="header">
          <SidebarBrand />
        </slot>
        <button type="button" class="sidebar__close" aria-label="Close sidebar" @click="onClose">
          x
        </button>
      </div>
      <div class="sidebar__user">
        

      </div>
    </div>

    <div class="sidebar__menu">
      <AdminSidebarSection
        :active-path="currentPath"
        :active-role="isRoleActive('admin')"
        @navigate="onClose"
      />
      <CoachSidebarSection
        :active-path="currentPath"
        :active-role="isRoleActive('coach')"
        @navigate="onClose"
      />
      <PlayerSidebarSection
        :active-path="currentPath"
        :active-role="isRoleActive('player')"
        @navigate="onClose"
      />
    </div>

    <section class="sidebar__secondary" aria-label="Secondary navigation">
      <h2>Resources</h2>
      <ul>
        <li v-for="link in secondaryLinks" :key="link.to">
          <RouterLink
            :to="link.to"
            class="sidebar__secondary-link"
            :class="{ 'sidebar__link--active': isActive(link.to) }"
            @click="onClose"
          >
            {{ link.label }}
          </RouterLink>
        </li>
      </ul>
    </section>

    <div class="sidebar__footer">
      <slot name="footer">
        
        <button v-if="state.user" type="button" class="sidebar__logout" @click="handleLogout">
          Logout
        </button>
      </slot>
    </div>
  </nav>
</template>

<style scoped>
.sidebar {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.sidebar__header {
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--hope-o-cyan-blue);
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.sidebar__brand-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.sidebar__close {
  display: none;
  width: 30px;
  height: 30px;
  border: 0;
  border-radius: 0.4rem;
  background: transparent;
  color: var(--color-text);
  cursor: pointer;
}

.sidebar__close:hover {
  background: var(--hope-e-golden-yellow);
}

.sidebar__user {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.8);
}

.sidebar__user-name {
  margin: 0;
  font-weight: 600;
  color: var(--color-text);
}

.sidebar__user-role {
  margin: 0;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.sidebar__logout {
  border: 0;
  background: transparent;
  color: var(--hope-o-cyan-blue);
  padding: 0;
  font-size: 0.75rem;
  text-align: left;
  cursor: pointer;
}

.sidebar__menu {
  display: grid;
  gap: 0.6rem;
}

.sidebar__secondary {
  border-top: 1px dashed rgba(255, 255, 255, 0.2);
  padding-top: 0.75rem;
}

.sidebar__secondary h2 {
  margin: 0 0 0.4rem;
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
}

.sidebar__secondary ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.sidebar__secondary-link {
  color: rgba(255, 255, 255, 0.75);
  font-size: 0.9rem;
  text-decoration: none;
}

.sidebar__secondary-link:hover {
  color: var(--hope-o-cyan-blue);
}

.sidebar__link {
  display: block;
  text-decoration: none;
  color: var(--color-text);
  font-weight: 500;
  padding: 0.6rem 0.7rem;
  border-radius: 0.55rem;
}

.sidebar__link:hover {
  background: var(--hope-e-golden-yellow);
}

.sidebar__link--active {
  background: color-mix(in oklab, var(--hope-o-cyan-blue) 18%, white);
  color: var(--color-text);
  border: 1px solid var(--hope-o-cyan-blue);
}

.sidebar__footer {
  margin-top: auto;
  padding-top: 0.65rem;
  border-top: 1px solid var(--hope-o-cyan-blue);
}

.sidebar__meta {
  font-size: 0.75rem;
  color: var(--color-text);
}

@media (max-width: 768px) {
  .sidebar__close {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
}

@media (max-width: 600px) {
  .sidebar {
    gap: 0.75rem;
  }

  .sidebar__link {
    padding: 0.55rem 0.6rem;
    font-size: 0.88rem;
  }
}

@media (max-width: 480px) {
  .sidebar__header {
    padding-bottom: 0.4rem;
  }

  .sidebar__link {
    padding: 0.5rem 0.5rem;
    font-size: 0.82rem;
    border-radius: 0.45rem;
  }

  .sidebar__meta {
    font-size: 0.7rem;
  }
}

@media (max-width: 360px) {
  .sidebar__close {
    width: 26px;
    height: 26px;
  }
}
</style>
