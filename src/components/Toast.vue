<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { CheckCircle, XCircle, Info, AlertCircle, X } from 'lucide-vue-next'

const props = defineProps<{
  message: string
  type?: 'success' | 'error' | 'info' | 'warning'
  duration?: number
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const visible = ref(true)
const progress = ref(100)
let timer: any = null
let progressTimer: any = null

const close = () => {
  visible.value = false
  emit('close')
}

onMounted(() => {
  const startTime = Date.now()
  const duration = props.duration || 3000

  // Progress bar animation
  progressTimer = setInterval(() => {
    const elapsed = Date.now() - startTime
    progress.value = Math.max(0, 100 - (elapsed / duration) * 100)
    if (progress.value <= 0) {
      clearInterval(progressTimer)
    }
  }, 10)

  // Auto close timer
  timer = setTimeout(() => {
    close()
  }, duration)
})

onUnmounted(() => {
  if (timer) clearTimeout(timer)
  if (progressTimer) clearInterval(progressTimer)
})
</script>

<template>
  <Transition name="toast">
    <div 
      v-if="visible" 
      class="fixed bottom-6 right-6 z-[9999] min-w-[300px] bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden"
    >
      <div class="p-4 flex items-start space-x-3">
        <!-- Icon -->
        <div class="flex-shrink-0 mt-0.5">
          <CheckCircle v-if="type === 'success'" class="w-5 h-5 text-green-500" />
          <XCircle v-else-if="type === 'error'" class="w-5 h-5 text-red-500" />
          <AlertCircle v-else-if="type === 'warning'" class="w-5 h-5 text-yellow-500" />
          <Info v-else class="w-5 h-5 text-blue-500" />
        </div>

        <!-- Content -->
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-gray-900 leading-5">
            {{ message }}
          </p>
        </div>

        <!-- Close Button -->
        <button 
          @click="close" 
          class="flex-shrink-0 ml-4 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
        >
          <X class="w-4 h-4" />
        </button>
      </div>

      <!-- Progress Bar -->
      <div class="h-1 w-full bg-gray-50">
        <div 
          class="h-full transition-all duration-100 ease-linear"
          :class="{
            'bg-green-500': type === 'success',
            'bg-red-500': type === 'error',
            'bg-yellow-500': type === 'warning',
            'bg-blue-500': type !== 'success' && type !== 'error' && type !== 'warning'
          }"
          :style="{ width: `${progress}%` }"
        ></div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.toast-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
