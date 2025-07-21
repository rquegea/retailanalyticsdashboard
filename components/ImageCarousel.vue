<template>
  <UCard class="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50">
    <template #header>
      <div class="flex items-center space-x-2">
        <Icon name="heroicons:camera" class="w-5 h-5" />
        <span class="font-semibold">Store Images</span>
        <UBadge variant="outline">{{ images.length }} photos</UBadge>
      </div>
    </template>

    <div class="space-y-4">
      <div class="relative">
        <div class="aspect-video rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800">
          <img
            :src="images[currentImage].url || '/placeholder.svg'"
            :alt="images[currentImage].product"
            class="w-full h-full object-cover"
          />
        </div>

        <UButton
          variant="ghost"
          size="sm"
          @click="prevImage"
          class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm"
        >
          <Icon name="heroicons:chevron-left" class="w-4 h-4" />
        </UButton>

        <UButton
          variant="ghost"
          size="sm"
          @click="nextImage"
          class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm"
        >
          <Icon name="heroicons:chevron-right" class="w-4 h-4" />
        </UButton>
      </div>

      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <h3 class="font-semibold text-slate-900 dark:text-slate-100">{{ images[currentImage].product }}</h3>
          <UBadge color="blue" variant="subtle">
            <Icon name="heroicons:eye" class="w-3 h-3 mr-1" />
            {{ images[currentImage].shelfShare }}
          </UBadge>
        </div>

        <div class="flex items-center space-x-4 text-sm text-slate-600 dark:text-slate-400">
          <div class="flex items-center">
            <Icon name="heroicons:map-pin" class="w-4 h-4 mr-1" />
            {{ images[currentImage].store }}
          </div>
          <div class="flex items-center">
            <Icon name="heroicons:calendar" class="w-4 h-4 mr-1" />
            {{ images[currentImage].date }}
          </div>
        </div>

        <p class="text-sm text-slate-500 dark:text-slate-400">{{ images[currentImage].metadata }}</p>

        <div class="flex space-x-1 justify-center">
          <button
            v-for="(_, index) in images"
            :key="index"
            @click="currentImage = index"
            :class="[
              'w-2 h-2 rounded-full transition-colors',
              index === currentImage ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-600'
            ]"
          />
        </div>
      </div>
    </div>
  </UCard>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  selectedChain: String,
  selectedBrand: String,
})

const currentImage = ref(0)

const images = [
  {
    url: '/placeholder.svg?height=300&width=400',
    product: 'Oreo Original',
    store: 'Carrefour Madrid Centro',
    date: '2024-01-15',
    shelfShare: '28.5%',
    metadata: 'Aisle 3, Shelf 2',
  },
  {
    url: '/placeholder.svg?height=300&width=400',
    product: 'Kinder Bueno',
    store: 'Mercadona Valencia',
    date: '2024-01-14',
    shelfShare: '15.2%',
    metadata: 'Aisle 5, Shelf 1',
  },
  {
    url: '/placeholder.svg?height=300&width=400',
    product: 'Nestlé KitKat',
    store: 'Día Barcelona',
    date: '2024-01-13',
    shelfShare: '22.1%',
    metadata: 'Aisle 2, Shelf 3',
  },
  {
    url: '/placeholder.svg?height=300&width=400',
    product: 'Ferrero Nutella',
    store: 'Lidl Sevilla',
    date: '2024-01-12',
    shelfShare: '31.8%',
    metadata: 'Aisle 4, Shelf 2',
  },
]

const nextImage = () => {
  currentImage.value = (currentImage.value + 1) % images.length
}

const prevImage = () => {
  currentImage.value = (currentImage.value - 1 + images.length) % images.length
}
</script>
