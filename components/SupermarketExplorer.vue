<template>
  <UCard class="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50">
    <template #header>
      <div class="flex items-center space-x-2">
        <Icon name="heroicons:building-office" class="w-5 h-5" />
        <span class="font-semibold">Supermarket Explorer</span>
      </div>
    </template>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      <div
        v-for="(chain, index) in chains"
        :key="index"
        @click="$emit('update:selectedChain', chain.name.toLowerCase().replace(/\s+/g, '-'))"
        :class="[
          'p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-lg',
          selectedChain === chain.name.toLowerCase().replace(/\s+/g, '-')
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
            : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
        ]"
      >
        <div class="flex items-center justify-between mb-3">
          <h3 class="font-semibold text-slate-900 dark:text-slate-100">{{ chain.name }}</h3>
          <UBadge
            :color="chain.trend === 'up' ? 'green' : 'red'"
            variant="subtle"
          >
            <Icon 
              :name="chain.trend === 'up' ? 'heroicons:trending-up' : 'heroicons:trending-down'" 
              class="w-3 h-3 mr-1" 
            />
            {{ chain.performance }}
          </UBadge>
        </div>

        <div class="space-y-2">
          <div class="flex items-center text-sm text-slate-600 dark:text-slate-400">
            <Icon name="heroicons:building-office" class="w-4 h-4 mr-2" />
            {{ chain.stores }} stores
          </div>

          <div class="flex flex-wrap gap-1">
            <UBadge
              v-for="(region, regionIndex) in chain.regions"
              :key="regionIndex"
              variant="outline"
              size="xs"
            >
              <Icon name="heroicons:map-pin" class="w-3 h-3 mr-1" />
              {{ region }}
            </UBadge>
          </div>
        </div>
      </div>
    </div>
  </UCard>
</template>

<script setup>
const props = defineProps({
  selectedChain: String,
})

const emit = defineEmits(['update:selectedChain'])

const chains = [
  {
    name: 'Carrefour',
    stores: 245,
    performance: '+5.2%',
    trend: 'up',
    color: 'blue',
    regions: ['Madrid', 'Barcelona', 'Valencia'],
  },
  {
    name: 'Mercadona',
    stores: 189,
    performance: '+3.8%',
    trend: 'up',
    color: 'green',
    regions: ['Valencia', 'Alicante', 'Murcia'],
  },
  {
    name: 'Día',
    stores: 156,
    performance: '-2.1%',
    trend: 'down',
    color: 'red',
    regions: ['Madrid', 'Sevilla', 'Bilbao'],
  },
  {
    name: 'Lidl',
    stores: 134,
    performance: '+7.3%',
    trend: 'up',
    color: 'yellow',
    regions: ['Barcelona', 'Zaragoza', 'Palma'],
  },
  {
    name: 'El Corte Inglés',
    stores: 67,
    performance: '+1.9%',
    trend: 'up',
    color: 'purple',
    regions: ['Madrid', 'Barcelona', 'Sevilla'],
  },
]
</script>
