<template>
  <UCard class="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50">
    <template #header>
      <div class="flex items-center space-x-2">
        <Icon name="heroicons:light-bulb" class="w-5 h-5" />
        <span class="font-semibold">Smart Insights</span>
        <UBadge variant="outline">AI-Powered</UBadge>
      </div>
    </template>

    <div class="space-y-4">
      <div
        v-for="(insight, index) in insights"
        :key="index"
        class="p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow"
      >
        <div class="flex items-start space-x-3">
          <div :class="`p-2 rounded-lg bg-${insight.color}-100 dark:bg-${insight.color}-900/20`">
            <Icon :name="insight.icon" :class="`w-4 h-4 text-${insight.color}-600 dark:text-${insight.color}-400`" />
          </div>

          <div class="flex-1 space-y-2">
            <div class="flex items-center justify-between">
              <h3 class="font-medium text-slate-900 dark:text-slate-100">{{ insight.title }}</h3>
              <UBadge :color="getImpactColor(insight.impact)">{{ insight.impact }} Impact</UBadge>
            </div>

            <p class="text-sm text-slate-600 dark:text-slate-400">{{ insight.description }}</p>
          </div>
        </div>
      </div>

      <div class="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-lg border border-blue-200 dark:border-blue-800">
        <div class="flex items-center space-x-2 mb-2">
          <Icon name="heroicons:light-bulb" class="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span class="font-medium text-blue-900 dark:text-blue-100">AI Suggestion</span>
        </div>
        <p class="text-sm text-blue-800 dark:text-blue-200">
          Based on current trends, consider focusing on premium product placement in El Corte Inglés and addressing
          the declining performance in Día supermarkets through targeted promotions.
        </p>
      </div>
    </div>
  </UCard>
</template>

<script setup>
const props = defineProps({
  selectedChain: String,
  selectedBrand: String,
})

const insights = [
  {
    type: 'alert',
    title: 'Underperformance Alert',
    description: 'Oreo brand shows 15% decline in Día supermarkets compared to last month',
    impact: 'High',
    icon: 'heroicons:exclamation-triangle',
    color: 'red',
  },
  {
    type: 'opportunity',
    title: 'Growth Opportunity',
    description: 'Kinder products have highest shelf share growth in El Corte Inglés (+7.3%)',
    impact: 'Medium',
    icon: 'heroicons:trending-up',
    color: 'green',
  },
  {
    type: 'insight',
    title: 'Market Trend',
    description: 'Premium chocolate segment growing 12% faster than standard products',
    impact: 'Medium',
    icon: 'heroicons:light-bulb',
    color: 'blue',
  },
  {
    type: 'recommendation',
    title: 'Action Recommended',
    description: 'Consider increasing facings for Nutella in Carrefour stores (current: 3, optimal: 5)',
    impact: 'High',
    icon: 'heroicons:target',
    color: 'purple',
  },
]

const getImpactColor = (impact) => {
  switch (impact) {
    case 'High':
      return 'red'
    case 'Medium':
      return 'yellow'
    case 'Low':
      return 'green'
    default:
      return 'gray'
  }
}
</script>
