<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './Navbar.vue'
import Sidebar from './Sidebar.vue'

const props = defineProps({
  mobileBreakpoint: {
    type: Number,
    default: 768,
  },
  closeOnNavigation: {
    type: Boolean,
    default: true,
  },
  closeOnContentClick: {
    type: Boolean,
    default: true,
  },
})

const route = useRoute()
const isSidebarOpen = ref(false)
const isMobileViewport = ref(false)
let mediaQueryList = null
let previousBodyOverflow = ''

function openSidebar() {
  isSidebarOpen.value = true
}

function closeSidebar() {
  isSidebarOpen.value = false
}

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}

function onContentClick() {
  if (props.closeOnContentClick && isSidebarOpen.value) {
    closeSidebar()
  }
}

function onKeydown(event) {
  if (event.key === 'Escape' && isSidebarOpen.value) {
    closeSidebar()
  }
}

function syncViewport() {
  if (typeof window === 'undefined') return
  isMobileViewport.value = window.innerWidth <= props.mobileBreakpoint
}

function lockBodyScroll() {
  if (typeof document === 'undefined') return
  if (!isMobileViewport.value) return

  if (isSidebarOpen.value) {
    previousBodyOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return
  }

  document.body.style.overflow = previousBodyOverflow
}

watch(
  () => route.fullPath,
  () => {
    if (props.closeOnNavigation) {
      closeSidebar()
    }
  },
)

watch(isSidebarOpen, () => {
  lockBodyScroll()
})

watch(isMobileViewport, (isMobile) => {
  if (!isMobile) {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = previousBodyOverflow
    }
    isSidebarOpen.value = false
    return
  }

  lockBodyScroll()
})

onMounted(() => {
  syncViewport()
  document.addEventListener('keydown', onKeydown)

  if (typeof window !== 'undefined') {
    mediaQueryList = window.matchMedia(`(max-width: ${props.mobileBreakpoint}px)`)

    if (typeof mediaQueryList.addEventListener === 'function') {
      mediaQueryList.addEventListener('change', syncViewport)
    } else {
      mediaQueryList.addListener(syncViewport)
    }
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown)

  if (mediaQueryList) {
    if (typeof mediaQueryList.removeEventListener === 'function') {
      mediaQueryList.removeEventListener('change', syncViewport)
    } else {
      mediaQueryList.removeListener(syncViewport)
    }
  }

  if (typeof document !== 'undefined') {
    document.body.style.overflow = previousBodyOverflow
  }
})
</script>

<template>
  <div class="layout">
    <header class="layout__navbar">
      <slot name="navbar" :toggle-sidebar="toggleSidebar" :is-sidebar-open="isSidebarOpen">
        <Navbar @toggle-sidebar="toggleSidebar" />
      </slot>
    </header>

    <div class="layout__body">
      <button
        type="button"
        class="layout__overlay"
        :class="{ 'layout__overlay--visible': isSidebarOpen }"
        aria-label="Close sidebar"
        :aria-hidden="!isSidebarOpen"
        @click="closeSidebar"
      />

      <aside
        id="main-layout-sidebar"
        class="layout__sidebar"
        :class="{ 'layout__sidebar--open': isSidebarOpen }"
        :aria-hidden="!isSidebarOpen && isMobileViewport"
      >
        <slot
          name="sidebar"
          :close-sidebar="closeSidebar"
          :open-sidebar="openSidebar"
          :is-sidebar-open="isSidebarOpen"
        >
          <Sidebar @close="closeSidebar" />
        </slot>
      </aside>

      <main class="layout__content" @click="onContentClick">
        <slot>
          <div class="layout__placeholder">Main content</div>
        </slot>
      </main>
    </div>
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--color-surface);
}

.layout__navbar {
  height: 64px;
  border-bottom: 1px solid var(--hope-o-cyan-blue);
  background-color: var(--color-surface);
  display: flex;
  align-items: center;
  padding: 0 1rem;
}

.layout__body {
  flex: 1;
  display: flex;
  min-height: 0;
  position: relative;
}

.layout__sidebar {
  width: 240px;
  border-right: 1px solid var(--hope-o-cyan-blue);
  background-color: var(--color-surface);
  padding: 1rem;
  z-index: 70;
}

.layout__content {
  flex: 1;
  padding: 1rem;
  overflow: auto;
}

.layout__overlay {
  display: none;
}

.layout__placeholder {
  color: var(--color-text);
  font-size: 0.95rem;
}

@media (max-width: 768px) {
  .layout__navbar {
    height: 60px;
    padding: 0 0.75rem;
  }

  .layout__body {
    flex-direction: row;
  }

  .layout__sidebar {
    position: fixed;
    top: 60px;
    bottom: 0;
    left: 0;
    width: min(82vw, 300px);
    border-right: 1px solid var(--hope-o-cyan-blue);
    border-bottom: 0;
    transform: translateX(-100%);
    transition: transform 0.24s ease;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }

  .layout__sidebar--open {
    transform: translateX(0);
  }

  .layout__overlay {
    display: block;
    position: fixed;
    inset: 60px 0 0 0;
    border: 0;
    background: rgba(0, 0, 0, 0.22);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease;
    z-index: 60;
  }

  .layout__overlay--visible {
    opacity: 1;
    pointer-events: auto;
  }
}

@media (max-width: 600px) {
  .layout__navbar {
    height: 56px;
    padding: 0 0.65rem;
  }

  .layout__sidebar {
    padding: 0.75rem;
    top: 56px;
  }

  .layout__overlay {
    inset: 56px 0 0 0;
  }

  .layout__content {
    padding: 0.75rem;
  }
}

@media (max-width: 480px) {
  .layout__navbar {
    height: 52px;
    padding: 0 0.5rem;
  }

  .layout__sidebar {
    padding: 0.65rem;
    top: 52px;
  }

  .layout__overlay {
    inset: 52px 0 0 0;
  }

  .layout__content {
    padding: 0.65rem;
  }
}

@media (max-width: 360px) {
  .layout__navbar {
    height: 50px;
  }

  .layout__sidebar {
    padding: 0.55rem;
    top: 50px;
  }

  .layout__overlay {
    inset: 50px 0 0 0;
  }

  .layout__content {
    padding: 0.55rem;
  }
}
</style>

