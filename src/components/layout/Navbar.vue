<script setup>
import { ref } from 'vue'
import logoUrl from '../../assets/images/logo.jpg'

const emit = defineEmits(['toggle-sidebar'])
const hasLogoError = ref(false)

function onLogoError() {
  hasLogoError.value = true
}

function onToggleSidebar() {
  emit('toggle-sidebar')
}
</script>

<template>
  <nav class="navbar">
    <div class="navbar__left">
      <button
        type="button"
        class="navbar__menu-btn"
        aria-label="Toggle sidebar"
        @click="onToggleSidebar"
      >
        <svg class="navbar__menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div class="navbar__logo-box">
        <img
          v-if="!hasLogoError"
          :src="logoUrl"
          alt="HOPE logo"
          class="navbar__logo"
          @error="onLogoError"
        >
        <span v-else class="navbar__logo-fallback">HOPE</span>
      </div>

      <slot name="title">
        <div class="navbar__brand">
          <div class="navbar__brand-top">Organization for Children's</div>
          <div class="navbar__brand-bottom">Hope Foundation of Cambodia</div>
        </div>
      </slot>
    </div>

    <div class="navbar__right">
      <slot name="actions">
        <button type="button" class="navbar__icon-btn" aria-label="Notifications">
          <svg class="navbar__bell-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <span class="navbar__badge">4</span>
        </button>

        <label class="navbar__lang">
          <span class="sr-only">Language</span>
          <select>
            <option>EN</option>
            <option>KM</option>
          </select>
        </label>
      </slot>

      <slot name="profile">
        <a href="#profile" class="navbar__profile">
          <div class="navbar__profile-text">
            <div class="navbar__profile-name">Admin User</div>
            <div class="navbar__profile-role">Super Admin</div>
          </div>
          <div class="navbar__avatar">AU</div>
        </a>
      </slot>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  width: 100%;
  min-height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.navbar__left {
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.navbar__menu-btn {
  display: none;
  border: 0;
  background: transparent;
  color: var(--color-text);
  border-radius: 0.5rem;
  width: 40px;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.navbar__menu-btn:hover {
  background: var(--hope-e-golden-yellow);
}

.navbar__menu-icon {
  width: 1.4rem;
  height: 1.4rem;
}

.navbar__logo-box {
  width: 60px;
  height: 44px;
  border-radius: 0.5rem;
  overflow: hidden;
  border: 1px solid var(--hope-o-cyan-blue);
  background: var(--color-surface);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.navbar__logo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.navbar__logo-fallback {
  font-size: 0.65rem;
  font-weight: 700;
  color: var(--color-text);
}

.navbar__brand {
  min-width: 0;
}

.navbar__brand-top {
  font-size: 0.65rem;
  font-weight: 700;
  line-height: 1.2;
  color: var(--color-text);
  text-transform: uppercase;
}

.navbar__brand-bottom {
  font-size: 0.85rem;
  font-weight: 800;
  line-height: 1.1;
  color: var(--hope-o-cyan-blue);
}

.navbar__right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.navbar__icon-btn {
  position: relative;
  border: 0;
  background: transparent;
  border-radius: 999px;
  width: 40px;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.navbar__icon-btn:hover {
  background: var(--hope-e-golden-yellow);
}

.navbar__bell-icon {
  width: 1.35rem;
  height: 1.35rem;
  color: var(--color-text);
}

.navbar__badge {
  position: absolute;
  top: 2px;
  right: 2px;
  background: var(--hope-p-vibrant-red);
  color: var(--hope-text-white);
  font-size: 0.62rem;
  font-weight: 700;
  border-radius: 999px;
  min-width: 16px;
  min-height: 16px;
  padding: 0 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.navbar__lang select {
  border: 1px solid var(--hope-o-cyan-blue);
  border-radius: 0.5rem;
  background: var(--color-surface);
  color: var(--color-text);
  padding: 0.35rem 0.5rem;
  outline: none;
}

.navbar__lang select:focus {
  border-color: var(--hope-p-vibrant-red);
}

.navbar__profile {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: inherit;
  padding-left: 0.75rem;
  border-left: 1px solid var(--hope-o-cyan-blue);
}

.navbar__profile-text {
  text-align: right;
}

.navbar__profile-name {
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--color-text);
}

.navbar__profile-role {
  font-size: 0.75rem;
  color: var(--hope-o-cyan-blue);
}

.navbar__avatar {
  width: 34px;
  height: 34px;
  border-radius: 999px;
  background: var(--hope-o-cyan-blue);
  color: var(--hope-text-white);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

@media (min-width: 769px) {
  .navbar__menu-btn {
    display: none !important;
  }
}

@media (max-width: 768px) {
  .navbar__menu-btn {
    display: inline-flex;
  }

  .navbar__brand {
    display: none;
  }

  .navbar__profile-text {
    display: none;
  }
}

@media (max-width: 600px) {
  .navbar {
    min-height: 56px;
    gap: 0.5rem;
  }

  .navbar__left {
    gap: 0.45rem;
  }

  .navbar__right {
    gap: 0.45rem;
  }

  .navbar__logo-box {
    width: 52px;
    height: 38px;
  }

  .navbar__icon-btn,
  .navbar__menu-btn {
    width: 36px;
    height: 36px;
  }

  .navbar__profile {
    padding-left: 0.5rem;
  }
}

@media (max-width: 480px) {
  .navbar {
    min-height: 52px;
    gap: 0.35rem;
  }

  .navbar__left {
    gap: 0.35rem;
  }

  .navbar__right {
    gap: 0.35rem;
  }

  .navbar__logo-box {
    width: 46px;
    height: 34px;
  }

  .navbar__lang select {
    padding: 0.28rem 0.35rem;
    font-size: 0.75rem;
  }

  .navbar__avatar {
    width: 30px;
    height: 30px;
    font-size: 0.65rem;
  }
}

@media (max-width: 360px) {
  .navbar__lang {
    display: none;
  }

  .navbar__profile {
    border-left: 0;
    padding-left: 0.2rem;
  }
}
</style>
