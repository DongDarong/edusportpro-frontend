<script setup>
import { computed } from 'vue'
import { useLanguage } from '../../composables/useLanguage'

const props = defineProps({
  activePath: {
    type: String,
    required: true,
  },
  activeRole: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['navigate'])
const { t } = useLanguage()

const navItems = [
  {
    name: 'common.dashboard',
    path: '/admin/dashboard',
    icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z'
  },
  {
    name: 'common.users',
    path: '/admin/users',
    icon: 'M17 20h5v-1a4 4 0 00-5-3.87M9 20H4v-1a4 4 0 015-3.87m8-6.13a4 4 0 11-8 0 4 4 0 018 0zM3 8a3 3 0 116 0 3 3 0 01-6 0z',
  },
]

function isActive(path) {
  return props.activePath === path
}

function onNavigate() {
  emit('navigate')
}
</script>

<template>
  <div class="sidebar-section">
    <h2 class="sidebar-section__title">Admin</h2>
    <ul class="sidebar-section__list">
      <li v-for="item in navItems" :key="item.path">
        <RouterLink
          :to="item.path"
          class="sidebar-section__link"
          :class="{ 'sidebar-section__link--active': isActive(item.path) }"
          @click="onNavigate"
        >
          <svg class="sidebar-section__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.icon" />
          </svg>
          <span>{{ t(item.name) }}</span>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.sidebar-section {
  display: flex;
  flex-direction: column;
}

.sidebar-section__title {
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #94a3b8;
  margin: 0 0 0.75rem 0.5rem;
}

.sidebar-section__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.sidebar-section__link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem 0.75rem;
  color: #64748b;
  text-decoration: none;
  font-size: 0.9375rem;
  font-weight: 500;
  border-radius: 0.75rem;
  transition: all 0.2s ease;
}

.sidebar-section__link:hover {
  background: #f1f5f9;
  color: var(--color-text);
}

.sidebar-section__link--active {
  background: rgba(0, 174, 239, 0.08);
  color: var(--hope-o-cyan-blue);
  font-weight: 600;
}

.sidebar-section__icon {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
}
</style>
