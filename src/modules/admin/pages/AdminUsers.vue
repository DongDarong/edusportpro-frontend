<script setup>
import { onMounted, ref } from 'vue'
import MainLayout from '../../../components/layout/MainLayout.vue'
import Navbar from '../../../components/layout/Navbar.vue'
import Sidebar from '../../../components/layout/Sidebar.vue'
import LoadingSpinner from '../../../components/common/LoadingSpinner.vue'

const loading = ref(true)
const users = ref([])

const mockUsers = [
  { id: 1, name: 'Admin User', email: 'admin@hope.org', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Coach Dara', email: 'coach.dara@hope.org', role: 'Coach', status: 'Active' },
  { id: 3, name: 'Player Vanna', email: 'player.vanna@hope.org', role: 'Player', status: 'Inactive' },
  { id: 4, name: 'Coordinator Lina', email: 'lina@hope.org', role: 'Staff', status: 'Active' },
]

function statusClass(status) {
  return status === 'Active' ? 'users__status users__status--active' : 'users__status users__status--inactive'
}

async function loadUsers() {
  loading.value = true
  await new Promise((resolve) => setTimeout(resolve, 350))
  users.value = mockUsers
  loading.value = false
}

onMounted(loadUsers)
</script>

<template>
  <MainLayout>
    <template #navbar="{ toggleSidebar }">
      <Navbar @toggle-sidebar="toggleSidebar">
        <template #title>
          <h1 class="m-0 text-[1.1rem] font-bold max-[768px]:hidden">Admin Users</h1>
        </template>
      </Navbar>
    </template>

    <template #sidebar="{ closeSidebar }">
      <Sidebar @close="closeSidebar" />
    </template>

    <div v-if="loading" class="users__loading">
      <LoadingSpinner label="Loading users" size="lg" />
    </div>

    <section v-else class="users">
      <header class="users__header">
        <h2 class="users__title">Users Management</h2>
        <p class="users__subtitle">View account role and status for platform members.</p>
      </header>

      <div class="users__table-wrap">
        <table class="users__table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.role }}</td>
              <td>
                <span :class="statusClass(user.status)">{{ user.status }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </MainLayout>
</template>

<style scoped>
.users__loading {
  display: flex;
  min-height: 240px;
  align-items: center;
  justify-content: center;
}

.users {
  display: grid;
  gap: 0.9rem;
}

.users__header {
  border: 1px solid #e3edf5;
  border-radius: 0.9rem;
  padding: 0.95rem;
  background: #fff;
}

.users__title {
  margin: 0;
  font-size: 1.06rem;
  color: #16364d;
}

.users__subtitle {
  margin: 0.3rem 0 0;
  font-size: 0.85rem;
  color: #607486;
}

.users__table-wrap {
  border: 1px solid #e3edf5;
  border-radius: 0.9rem;
  background: #fff;
  overflow-x: auto;
}

.users__table {
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
}

.users__table th {
  text-align: left;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: #6a7d8d;
  padding: 0.75rem 0.9rem;
  border-bottom: 1px solid #e8eff5;
  background: #f8fbff;
}

.users__table td {
  padding: 0.75rem 0.9rem;
  border-bottom: 1px solid #edf2f7;
  font-size: 0.86rem;
  color: #233f53;
  white-space: nowrap;
}

.users__table tr:last-child td {
  border-bottom: 0;
}

.users__status {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  padding: 0.2rem 0.5rem;
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
}

.users__status--active {
  color: #216a2a;
  background: #e8f8ea;
}

.users__status--inactive {
  color: #8a1f24;
  background: #fdeced;
}

@media (max-width: 640px) {
  .users__loading {
    min-height: 180px;
  }

  .users {
    gap: 0.72rem;
  }

  .users__header {
    padding: 0.82rem;
  }

  .users__title {
    font-size: 0.95rem;
  }

  .users__subtitle {
    font-size: 0.78rem;
  }

  .users__table th,
  .users__table td {
    padding: 0.62rem 0.72rem;
  }
}
</style>
