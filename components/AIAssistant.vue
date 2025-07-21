<template>
  <div
    v-if="isOpen"
    class="w-96 h-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-l border-slate-200/50 dark:border-slate-700/50 flex flex-col"
  >
    <div class="p-4 border-b border-slate-200/50 dark:border-slate-700/50">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <Icon name="heroicons:sparkles" class="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 class="font-semibold text-slate-900 dark:text-slate-100">AI Assistant</h3>
            <p class="text-xs text-slate-500 dark:text-slate-400">Powered by GPT-4</p>
          </div>
        </div>
        <UButton variant="ghost" size="sm" @click="$emit('close')">
          <Icon name="heroicons:x-mark" class="w-4 h-4" />
        </UButton>
      </div>
    </div>

    <div class="flex-1 overflow-auto p-4 space-y-4">
      <div
        v-for="(msg, index) in messages"
        :key="index"
        :class="['flex', msg.type === 'user' ? 'justify-end' : 'justify-start']"
      >
        <div
          :class="[
            'max-w-[80%] p-3 rounded-lg',
            msg.type === 'user'
              ? 'bg-blue-500 text-white'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100'
          ]"
        >
          <p class="text-sm">{{ msg.content }}</p>
          <p class="text-xs opacity-70 mt-1">{{ msg.timestamp }}</p>
        </div>
      </div>

      <div v-if="messages.length === 1" class="space-y-3">
        <p class="text-sm text-slate-600 dark:text-slate-400">Quick queries:</p>
        <UButton
          v-for="(query, index) in quickQueries"
          :key="index"
          variant="outline"
          size="sm"
          @click="handleQuickQuery(query)"
          class="w-full justify-start text-left h-auto p-3 whitespace-normal"
        >
          <div class="flex items-start space-x-2">
            <Icon :name="getQueryIcon(index)" class="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span class="text-sm">{{ query }}</span>
          </div>
        </UButton>
      </div>
    </div>

    <div class="p-4 border-t border-slate-200/50 dark:border-slate-700/50">
      <div class="flex space-x-2">
        <UInput
          v-model="message"
          placeholder="Ask about your retail data..."
          @keypress.enter="handleSendMessage"
          class="flex-1"
        />
        <UButton @click="handleSendMessage" size="sm">
          <Icon name="heroicons:paper-airplane" class="w-4 h-4" />
        </UButton>
      </div>
      <p class="text-xs text-slate-500 dark:text-slate-400 mt-2">
        Try: "Compare facings of Oreo in Ahorramás vs Día"
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  isOpen: Boolean,
})

const emit = defineEmits(['close'])

const message = ref('')
const messages = ref([
  {
    type: 'assistant',
    content: 'Hi! I\'m your AI assistant. Ask me anything about your retail data. For example:',
    timestamp: '10:30 AM',
  },
])

const quickQueries = [
  'Compare Oreo facings in Carrefour vs Día',
  'Show underperforming products in Lidl',
  'Which brands have highest shelf share?',
  'Find images with shelf share < 10%',
]

const handleSendMessage = () => {
  if (!message.value.trim()) return

  const newMessages = [
    ...messages.value,
    {
      type: 'user',
      content: message.value,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
    {
      type: 'assistant',
      content: 'I\'m analyzing your request... Based on the current data, here\'s what I found:',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]

  messages.value = newMessages
  message.value = ''
}

const handleQuickQuery = (query) => {
  message.value = query
}

const getQueryIcon = (index) => {
  const icons = [
    'heroicons:chart-bar',
    'heroicons:chat-bubble-left-right',
    'heroicons:chart-bar',
    'heroicons:camera'
  ]
  return icons[index] || 'heroicons:chat-bubble-left-right'
}
</script>
