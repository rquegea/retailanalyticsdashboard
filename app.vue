<template>
  <div class="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
    <AppSidebar />

    <div class="flex-1 flex flex-col overflow-hidden">
      <AppHeader
        v-model:selected-chain="selectedChain"
        v-model:selected-brand="selectedBrand"
        v-model:selected-product="selectedProduct"
        v-model:date-range="dateRange"
        v-model:data-mode="dataMode"
        v-model:ai-panel-open="aiPanelOpen"
      />

      <div class="flex-1 flex overflow-hidden">
        <main class="flex-1 overflow-auto p-6 space-y-6">
          <KPIOverview 
            :selected-chain="selectedChain" 
            :selected-brand="selectedBrand" 
            :data-mode="dataMode" 
          />

          <SupermarketExplorer 
            :selected-chain="selectedChain" 
            @update:selected-chain="selectedChain = $event" 
          />

          <BrandProductTable
            :selected-chain="selectedChain"
            :selected-brand="selectedBrand"
            :selected-product="selectedProduct"
          />

          <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <ImageCarousel 
              :selected-chain="selectedChain" 
              :selected-brand="selectedBrand" 
            />
            <SmartInsights 
              :selected-chain="selectedChain" 
              :selected-brand="selectedBrand" 
            />
          </div>
        </main>

        <AIAssistant 
          :is-open="aiPanelOpen" 
          @close="aiPanelOpen = false" 
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useHead } from '@vueuse/head'

const selectedChain = ref('all')
const selectedBrand = ref('all')
const selectedProduct = ref('all')
const dateRange = ref('30d')
const dataMode = ref('global')
const aiPanelOpen = ref(false)

useHead({
  title: 'Retail Analytics Dashboard',
  meta: [
    { name: 'description', content: 'Advanced retail execution analytics platform' }
  ]
})
</script>
