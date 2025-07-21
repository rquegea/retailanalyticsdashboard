<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <UCard
      v-for="(kpi, index) in kpis"
      :key="index"
      class="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50 hover:shadow-lg transition-all duration-200"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-medium text-slate-600 dark:text-slate-400">{{ kpi.title }}</h3>
          <div class="flex items-center space-x-2">
            <Icon v-if="kpi.alert" name="heroicons:exclamation-triangle" class="w-4 h-4 text-amber-500" />
            <Icon :name="kpi.icon" :class="`w-4 h-4 text-${kpi.color}-500`" />
          </div>
        </div>
      </template>

      <div class="flex items-center justify-between">
        <div class="text-2xl font-bold text-slate-900 dark:text-slate-100">{{ kpi.value }}</div>
        <UBadge
          :color="kpi.trend === 'up' ? 'green' : 'red'"
          variant="subtle"
        >
          <Icon 
            :name="kpi.trend === 'up' ? 'heroicons:trending-up' : 'heroicons:trending-down'" 
            class="w-3 h-3 mr-1" 
          />
          {{ kpi.change }}
        </UBadge>
      </div>
    </UCard>
  </div>
</template>

<script setup>
const props = defineProps({
  selectedChain: String,
  selectedBrand: String,
  dataMode: String,
})

const kpis = [
  {
    title: 'Shelf Share',
    value: '24.3%',
    change: '+2.1%',
    trend: 'up',
    icon: 'heroicons:eye',
    color: 'blue',
    alert: false,
  },
  {
    title: 'Avg. Facings',
    value: '3.2',
    change: '-0.3',
    trend: 'down',
    icon: 'heroicons:shopping-cart',
    color: 'green',
    alert: true,
  },
  {
    title: 'Avg. Price',
    value: '€2.89',
    change: '+€0.15',
    trend: 'up',
    icon: 'heroicons:currency-euro',
    color: 'purple',
    alert: false,
  },
  {
    title: 'Promotion Presence',
    value: '67%',
    change: '+12%',
    trend: 'up',
    icon: 'heroicons:trending-up',
    color: 'orange',
    alert: false,
  },
]
</script>
