<template>
  <div class="w-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-r border-slate-200/50 dark:border-slate-700/50 flex flex-col items-center py-6 space-y-6">
    <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
      <span class="text-white font-bold text-sm">T</span>
    </div>

    <nav class="flex flex-col space-y-4">
      <button
        v-for="item in navigation"
        :key="item.name"
        :class="[
          'w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 group relative',
          item.current
            ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
        ]"
      >
        <Icon :name="item.icon" class="w-5 h-5" />
        <div class="absolute left-full ml-2 px-2 py-1 bg-slate-900 dark:bg-slate-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          {{ item.name }}
        </div>
      </button>
    </nav>
  </div>
</template>

<script setup>
const navigation = [
  { name: 'Dashboard', icon: 'heroicons:home', current: false },
  { name: 'Analysis', icon: 'heroicons:chart-bar', current: true },
  { name: 'Calendar', icon: 'heroicons:calendar', current: false },
  { name: 'Brands & Products', icon: 'heroicons:cube', current: false },
  { name: 'AI Agent', icon: 'heroicons:cpu-chip', current: false },
]
</script>
