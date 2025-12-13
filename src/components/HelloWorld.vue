<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
function increment() {
  count.value++
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-slate-50 text-slate-900">
    <header class="bg-slate-900 text-white">
      <div class="mx-auto max-w-5xl px-4 flex items-center justify-between py-4">
        <h1 class="text-xl font-semibold">EduSportPro</h1>
        <nav class="hidden sm:flex">
          <a class="text-slate-200 hover:text-white ml-4" href="#">Home</a>
          <a class="text-slate-200 hover:text-white ml-4" href="#features">Features</a>
          <a class="text-slate-200 hover:text-white ml-4" href="#pricing">Pricing</a>
        </nav>
        <button class="sm:hidden text-slate-200">Menu</button>
      </div>
    </header>

    <main class="mx-auto max-w-5xl px-4 flex-1 w-full">
      <section class="flex flex-col md:flex-row items-center gap-8 py-12">
        <div class="flex-1">
          <h2 class="text-3xl md:text-4xl font-bold mb-3">{{ msg || 'Welcome to EduSportPro' }}</h2>
          <p class="text-slate-600 mb-6">Better coaching, clearer progress, happier athletes.</p>
          <div class="flex gap-3">
            <button class="px-4 py-2 rounded bg-indigo-600 text-white" @click="increment">Get Started</button>
            <button class="px-4 py-2 rounded border" @click="increment">Clicked: {{ count }}</button>
          </div>
        </div>

        <div class="w-full md:w-1/2">
          <div class="h-48 md:h-64 rounded-lg bg-gradient-to-br from-indigo-100 to-white border border-slate-200 flex items-center justify-center">
            <span class="text-slate-400">Illustration</span>
          </div>
        </div>
      </section>

      <section id="features" class="py-8">
        <h3 class="text-2xl font-semibold">Features</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          <div class="p-4 bg-white rounded-lg shadow-sm border">
            <h4 class="font-medium">Lesson Planning</h4>
            <p class="text-sm text-slate-600">Create, schedule and share training plans.</p>
          </div>
          <div class="p-4 bg-white rounded-lg shadow-sm border">
            <h4 class="font-medium">Progress Tracking</h4>
            <p class="text-sm text-slate-600">Monitor athlete growth with simple analytics.</p>
          </div>
          <div class="p-4 bg-white rounded-lg shadow-sm border">
            <h4 class="font-medium">Team Management</h4>
            <p class="text-sm text-slate-600">Organize teams, rosters and communication.</p>
          </div>
        </div>
      </section>
    </main>

    <footer class="border-t bg-white">
      <div class="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between text-sm text-slate-600">
        <div>© {{ new Date().getFullYear() }} EduSportPro</div>
        <div class="flex gap-4">
          <a class="hover:underline" href="#">Privacy</a>
          <a class="hover:underline" href="#">Terms</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<!-- styles are provided by Tailwind -->
