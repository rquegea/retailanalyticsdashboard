<template>
  <header class="h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 px-6 flex items-center justify-between">
    <div class="flex items-center space-x-4">
      <h1 class="text-xl font-semibold text-slate-900 dark:text-slate-100">Retail Analytics</h1>

      <div class="flex items-center space-x-2">
        <UButton
          v-for="mode in dataModes"
          :key="mode.value"
          :variant="dataMode === mode.value ? 'solid' : 'ghost'"
          size="sm"
          @click="$emit('update:dataMode', mode.value)"
          class="h-8"
        >
          <Icon :name="mode.icon" class="w-4 h-4 mr-1" />
          {{ mode.label }}
        </UButton>
      </div>
    </div>

    <div class="flex items-center space-x-4">
      <div class="relative">
        <UInput
          :model-value="searchQuery"
          @update:model-value="searchQuery = $event"
          placeholder="Search brands, products..."
          class="w-64"
          icon="heroicons:magnifying-glass"
        />
      </div>

      <USelect
        :model-value="dateRange"
        @update:model-value="$emit('update:dateRange', $event)"
        :options="dateOptions"
        class="w-32"
      />

      <USelect
        :model-value="selectedChain"
        @update:model-value="$emit('update:selectedChain', $event)"
        :options="chainOptions"
        class="w-40"
      />

      <USelect
        :model-value="selectedBrand"
        @update:model-value="$emit('update:selectedBrand', $event)"
        :options="brandOptions"
        class="w-40"
      />

      <UButton
        variant="ghost"
        size="sm"
        @click="toggleColorMode()"
      >
        <Icon :name="$colorMode.value === 'dark' ? 'heroicons:sun' : 'heroicons:moon'" class="w-4 h-4" />
      </UButton>

      <UButton
        :variant="aiPanelOpen ? 'solid' : 'outline'"
        size="sm"
        @click="$emit('update:aiPanelOpen', !aiPanelOpen)"
        class="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0 hover:from-purple-600 hover:to-blue-600"
      >
        <Icon name="heroicons:sparkles" class="w-4 h-4 mr-2" />
        AI Assistant
      </UButton>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useColorMode } from '#app'

const props = defineProps({
  selectedChain: String,
  selectedBrand: String,
  selectedProduct: String,
  dateRange: String,
  dataMode: String,
  aiPanelOpen: Boolean,
})

const emit = defineEmits([
  'update:selectedChain',
  'update:selectedBrand', 
  'update:selectedProduct',
  'update:dateRange',
  'update:dataMode',
  'update:aiPanelOpen'
])

const searchQuery = ref('')
const $colorMode = useColorMode()

const dataModes = [
  { value: 'global', label: 'Global', icon: 'heroicons:globe-alt' },
  { value: 'chain', label: 'Chain', icon: 'heroicons:building-office' },
  { value: 'brand', label: 'Brand', icon: 'heroicons:cube' },
  { value: 'product', label: 'Product', icon: 'heroicons:cube' },
]

const dateOptions = [
  { label: 'Last 7 days', value: '7d' },
  { label: 'Last 30 days', value: '30d' },
  { label: 'Last 90 days', value: '90d' },
  { label: 'Last year', value: '1y' },
]

const chainOptions = [
  { label: 'All Chains', value: 'all' },
  { label: 'Carrefour', value: 'carrefour' },
  { label: 'Mercadona', value: 'mercadona' },
  { label: 'Día', value: 'dia' },
  { label: 'Lidl', value: 'lidl' },
  { label: 'El Corte Inglés', value: 'corte-ingles' },
]

const brandOptions = [
  { label: 'All Brands', value: 'all' },
  { label: 'Oreo', value: 'oreo' },
  { label: 'Kinder', value: 'kinder' },
  { label: 'Nestlé', value: 'nestle' },
  { label: 'Ferrero', value: 'ferrero' },
]

const toggleColorMode = () => {
  $colorMode.preference = $colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>
