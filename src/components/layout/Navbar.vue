<script setup>
import { computed, ref } from 'vue'
import logoUrl from '../../assets/images/logo.jpg'
import { useLanguage } from '../../composables/useLanguage'

const emit = defineEmits(['toggle-sidebar'])
const hasLogoError = ref(false)
const { language, setLanguage, t } = useLanguage()
const selectedLanguage = computed({
  get: () => language.value,
  set: (value) => setLanguage(value),
})

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
          <div class="navbar__brand-top">{{ t('navbar.orgTop') }}</div>
          <div class="navbar__brand-bottom">{{ t('navbar.orgBottom') }}</div>
        </div>
      </slot>
    </div>

    <div class="navbar__right">
      <slot name="actions">
        <button type="button" class="navbar__icon-btn navbar__icon-btn--calendar" aria-label="Calendar">
          <svg class="navbar__calendar-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 2v3m8-3v3M4 9h16M5 5h14a1 1 0 011 1v13a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z"
            />
          </svg>
        </button>

        <button type="button" class="navbar__icon-btn navbar__icon-btn--bell" :aria-label="t('common.notifications')">
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

        <div class="navbar__lang-wrapper">
          <label class="navbar__lang">
            <span class="sr-only">{{ t('common.language') }}</span>
            <select v-model="selectedLanguage">
              <option value="KH">{{ t('common.khmer') }}</option>
              <option value="EN">{{ t('common.english') }}</option>
            </select>
            <svg class="navbar__lang-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </label>
        </div>
      </slot>

      <slot name="profile">
        <a href="#profile" class="navbar__profile">
          <div class="navbar__profile-text">
            <div class="navbar__profile-name">Admin User</div>
            <div class="navbar__profile-role">{{ t('navbar.profileRole') }}</div>
          </div>
          <div class="navbar__avatar-container">
            <div class="navbar__avatar">AU</div>
            <div class="navbar__status-dot"></div>
          </div>
        </a>
      </slot>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}

.navbar__left {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 1rem;
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
  transition: all 0.2s ease;
}

.navbar__menu-btn:hover {
  background: rgba(0, 174, 239, 0.1);
  color: var(--hope-o-cyan-blue);
}

.navbar__menu-icon {
  width: 1.5rem;
  height: 1.5rem;
}

.navbar__logo-box {
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.navbar__logo-box:hover {
  transform: scale(1.08);
}

.navbar__logo {
  height: 100%;
  width: auto;
  max-width: 120px;
  object-fit: contain;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.05));
}

.navbar__logo-fallback {
  font-size: 0.75rem;
  font-weight: 800;
  color: var(--hope-o-cyan-blue);
}

.navbar__brand {
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.navbar__brand-top {
  font-size: 0.68rem;
  font-weight: 600;
  line-height: 1.2;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

.navbar__brand-bottom {
  font-size: 0.94rem;
  font-weight: 800;
  line-height: 1.1;
  color: var(--hope-o-cyan-blue);
  white-space: nowrap;
}

.navbar__right {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.navbar__icon-btn {
  position: relative;
  border: 0;
  background: transparent;
  border-radius: 0.75rem;
  width: 40px;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #64748b;
  transition: all 0.2s ease;
}

.navbar__icon-btn:hover {
  background: #f1f5f9;
  color: var(--color-text);
}

.navbar__icon-btn--bell:hover {
  color: var(--hope-p-vibrant-red);
  background: rgba(237, 28, 36, 0.08);
}

.navbar__icon-btn--calendar:hover {
  color: var(--hope-o-cyan-blue);
  background: rgba(0, 174, 239, 0.08);
}

.navbar__bell-icon {
  width: 1.4rem;
  height: 1.4rem;
}

.navbar__calendar-icon {
  width: 1.35rem;
  height: 1.35rem;
}

.navbar__badge {
  position: absolute;
  top: 6px;
  right: 6px;
  background: var(--hope-p-vibrant-red);
  color: var(--hope-text-white);
  font-size: 0.6rem;
  font-weight: 700;
  border-radius: 999px;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--color-surface);
}

.navbar__lang-wrapper {
  position: relative;
  margin: 0 0.5rem;
}

.navbar__lang {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.navbar__lang select {
  appearance: none;
  border: 1.5px solid #e2e8f0;
  border-radius: 0.75rem;
  background: #f1f5f9;
  color: var(--color-text);
  padding: 0.4rem 2rem 0.4rem 0.75rem;
  font-size: 0.82rem;
  font-weight: 600;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.navbar__lang select:focus {
  background: var(--hope-text-white);
  border-color: var(--hope-o-cyan-blue);
  box-shadow: 0 0 0 3px rgba(0, 174, 239, 0.1);
}

.navbar__lang-chevron {
  position: absolute;
  right: 0.75rem;
  width: 0.8rem;
  height: 0.8rem;
  color: #94a3b8;
  pointer-events: none;
}

.navbar__profile {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: inherit;
  padding: 0.375rem 0.375rem 0.375rem 1rem;
  border-left: 1px solid #e2e8f0;
  transition: all 0.2s ease;
  border-radius: 0.75rem;
  margin-left: 0.5rem;
}

.navbar__profile:hover {
  background: #f1f5f9;
}

.navbar__profile-text {
  text-align: right;
}

.navbar__profile-name {
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--color-text);
  line-height: 1.2;
}

.navbar__profile-role {
  font-size: 0.72rem;
  font-weight: 500;
  color: #64748b;
}

.navbar__avatar-container {
  position: relative;
  display: flex;
}

.navbar__avatar {
  width: 38px;
  height: 38px;
  border-radius: 0.75rem;
  background: var(--hope-o-cyan-blue);
  background: linear-gradient(135deg, var(--hope-o-cyan-blue) 0%, #0087b8 100%);
  color: var(--hope-text-white);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(0, 174, 239, 0.25);
}

.navbar__status-dot {
  position: absolute;
  bottom: -1px;
  right: -1px;
  width: 10px;
  height: 10px;
  background: #22c55e;
  border: 2px solid var(--hope-text-white);
  border-radius: 50%;
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
  .navbar {
    gap: 0.75rem;
  }

  .navbar__menu-btn {
    display: inline-flex;
  }

  .navbar__brand {
    display: none;
  }

  .navbar__profile-text {
    display: none;
  }

  .navbar__profile {
    border-left: 0;
    padding-left: 0.375rem;
    margin-left: 0;
  }
}

@media (max-width: 600px) {
  .navbar__icon-btn--calendar {
    display: none;
  }

  .navbar__logo-box {
    height: 46px;
  }
}

@media (max-width: 480px) {
  .navbar__lang-wrapper {
    margin: 0 0.25rem;
  }

  .navbar__logo-box {
    height: 40px;
  }

  .navbar__lang select {
    padding: 0.35rem 1.5rem 0.35rem 0.5rem;
    font-size: 0.75rem;
  }

  .navbar__avatar {
    width: 34px;
    height: 34px;
    font-size: 0.75rem;
  }
}

@media (max-width: 420px) {
  .navbar {
    gap: 0.5rem;
  }

  .navbar__logo-box {
    height: 36px;
  }

  .navbar__icon-btn {
    width: 36px;
    height: 36px;
  }

  .navbar__bell-icon {
    width: 1.25rem;
    height: 1.25rem;
  }

  .navbar__badge {
    top: 4px;
    right: 4px;
    min-width: 14px;
    height: 14px;
    font-size: 0.55rem;
  }
}

@media (max-width: 380px) {
  .navbar__lang-wrapper {
    display: none;
  }
}

@media (max-width: 360px) {
  .navbar {
    gap: 0.35rem;
  }

  .navbar__profile {
    padding-left: 0.25rem;
  }

  .navbar__avatar {
    width: 30px;
    height: 30px;
    font-size: 0.7rem;
  }
}
</style>

