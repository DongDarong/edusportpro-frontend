<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import SidebarBrand from '../ui/SidebarBrandHeader.vue'

const emit = defineEmits(['close'])
const route = useRoute()

const menuItems = [
  { label: 'Admin Dashboard', to: '/admin/dashboard' },
  { label: 'Coach Dashboard', to: '/coach/dashboard' },
  { label: 'Player Dashboard', to: '/player/dashboard' },
]

const currentPath = computed(() => route.path)

function isActive(path) {
  return currentPath.value === path
}

function onClose() {
  emit('close')
}
</script>

<template>
  <nav class="sidebar" aria-label="Main navigation">
    <div class="sidebar__header">
      <slot name="header">
        <SidebarBrand />
      </slot>
      <button type="button" class="sidebar__close" aria-label="Close sidebar" @click="onClose">
        x
      </button>
    </div>

    <ul class="sidebar__menu">
      <li v-for="item in menuItems" :key="item.to">
        <RouterLink
          :to="item.to"
          class="sidebar__link"
          :class="{ 'sidebar__link--active': isActive(item.to) }"
        >
          {{ item.label }}
        </RouterLink>
      </li>
    </ul>

    <div class="sidebar__footer">
      <slot name="footer">
        <small class="sidebar__meta">Hope Foundation of Cambodia</small>
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--hope-o-cyan-blue);
}

.sidebar__title {
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-text);
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

.sidebar__menu {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.3rem;
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

  .sidebar__title {
    font-size: 0.92rem;
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

  .sidebar__title {
    font-size: 0.85rem;
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

  .sidebar__title {
    font-size: 0.8rem;
  }
}
</style>
