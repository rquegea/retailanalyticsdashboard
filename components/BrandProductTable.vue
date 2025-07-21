<template>
  <UCard class="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50">
    <template #header>
      <div class="flex items-center space-x-2">
        <Icon name="heroicons:shopping-cart" class="w-5 h-5" />
        <span class="font-semibold">Brand & Product Performance</span>
      </div>
    </template>

    <div class="overflow-x-auto">
      <UTable :rows="products" :columns="columns">
        <template #product-data="{ row }">
          <div class="flex items-center space-x-3">
            <img
              :src="row.image || '/placeholder.svg'"
              :alt="row.product"
              class="w-10 h-10 rounded-lg object-cover"
            />
            <div class="font-medium text-slate-900 dark:text-slate-100">{{ row.product }}</div>
          </div>
        </template>

        <template #brand-data="{ row }">
          <UBadge variant="outline">{{ row.brand }}</UBadge>
        </template>

        <template #shelfShare-data="{ row }">
          <div class="flex items-center space-x-2">
            <span class="font-medium">{{ row.shelfShare }}</span>
            <UBadge
              :color="row.trend === 'up' ? 'green' : 'red'"
              variant="subtle"
            >
              <Icon 
                :name="row.trend === 'up' ? 'heroicons:trending-up' : 'heroicons:trending-down'" 
                class="w-3 h-3 mr-1" 
              />
              {{ row.change }}
            </UBadge>
          </div>
        </template>

        <template #price-data="{ row }">
          <div class="flex items-center">
            <Icon name="heroicons:currency-euro" class="w-4 h-4 mr-1 text-slate-400" />
            {{ row.price }}
          </div>
        </template>

        <template #facings-data="{ row }">
          <div class="flex items-center">
            <Icon name="heroicons:eye" class="w-4 h-4 mr-1 text-slate-400" />
            {{ row.facings }}
          </div>
        </template>

        <template #photos-data="{ row }">
          <div class="flex items-center">
            <Icon name="heroicons:camera" class="w-4 h-4 mr-1 text-slate-400" />
            {{ row.photos }}
          </div>
        </template>

        <template #actions-data="{ row }">
          <UButton variant="ghost" size="sm">
            View Details
          </UButton>
        </template>
      </UTable>
    </div>
  </UCard>
</template>

<script setup>
const props = defineProps({
  selectedChain: String,
  selectedBrand: String,
  selectedProduct: String,
})

const columns = [
  { key: 'product', label: 'Product' },
  { key: 'brand', label: 'Brand' },
  { key: 'supermarket', label: 'Supermarket' },
  { key: 'shelfShare', label: 'Shelf Share' },
  { key: 'price', label: 'Price' },
  { key: 'facings', label: 'Facings' },
  { key: 'photos', label: 'Photos' },
  { key: 'actions', label: 'Actions' },
]

const products = [
  {
    brand: 'Oreo',
    product: 'Original Cookies',
    image: '/placeholder.svg?height=40&width=40',
    supermarket: 'Carrefour',
    shelfShare: '28.5%',
    price: '€2.89',
    facings: 4,
    trend: 'up',
    change: '+2.3%',
    photos: 12,
  },
  {
    brand: 'Kinder',
    product: 'Bueno',
    image: '/placeholder.svg?height=40&width=40',
    supermarket: 'Mercadona',
    shelfShare: '15.2%',
    price: '€3.45',
    facings: 2,
    trend: 'down',
    change: '-1.1%',
    photos: 8,
  },
  {
    brand: 'Nestlé',
    product: 'KitKat',
    image: '/placeholder.svg?height=40&width=40',
    supermarket: 'Día',
    shelfShare: '22.1%',
    price: '€2.15',
    facings: 3,
    trend: 'up',
    change: '+4.2%',
    photos: 15,
  },
  {
    brand: 'Ferrero',
    product: 'Nutella',
    image: '/placeholder.svg?height=40&width=40',
    supermarket: 'Lidl',
    shelfShare: '31.8%',
    price: '€4.99',
    facings: 5,
    trend: 'up',
    change: '+1.8%',
    photos: 20,
  },
  {
    brand: 'Oreo',
    product: 'Golden',
    image: '/placeholder.svg?height=40&width=40',
    supermarket: 'El Corte Inglés',
    shelfShare: '12.4%',
    price: '€3.29',
    facings: 2,
    trend: 'down',
    change: '-0.5%',
    photos: 6,
  },
]
</script>
