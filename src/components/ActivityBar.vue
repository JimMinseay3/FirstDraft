<script setup lang="ts">
import { 
  Files, 
  Search, 
  Eye, 
  Clock, 
  Package, 
  Settings,
  BookOpen,
  Type
} from 'lucide-vue-next'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps<{
  activeView: string
  showPreview: boolean
  isFileLoaded: boolean
}>()

const emit = defineEmits<{
  (e: 'toggle-preview'): void
  (e: 'change-view', view: string): void
}>()

const topMenuItems = computed(() => [
  { id: 'file', icon: Files, title: t('activityBar.file'), alwaysEnabled: true },
  { id: 'search', icon: Search, title: t('activityBar.search') },
  { id: 'citations', icon: BookOpen, title: t('activityBar.citations') },
  { id: 'resources', icon: Package, title: t('activityBar.resources') },
  { id: 'typography', icon: Type, title: t('activityBar.typography') },
  { id: 'version', icon: Clock, title: t('activityBar.version') },
  { id: 'preview', icon: Eye, title: t('activityBar.preview') },
])

const bottomMenuItems = computed(() => [
  { id: 'settings', icon: Settings, title: t('activityBar.settings'), alwaysEnabled: true },
])

const isItemDisabled = (item: any) => {
  return !props.isFileLoaded && !item.alwaysEnabled
}

const handleClick = (item: any) => {
  if (isItemDisabled(item)) return

  if (item.id === 'preview') {
    emit('toggle-preview')
  } else {
    emit('change-view', item.id)
  }
}

const getItemClass = (item: any) => {
  if (isItemDisabled(item)) {
    return 'text-gray-700 cursor-not-allowed opacity-50'
  }
  
  if (isActive(item.id)) {
    return 'bg-gray-800 text-blue-400'
  }
  
  return 'text-gray-500 hover:text-gray-300 hover:bg-gray-800'
}

const isActive = (id: string) => {
  if (id === 'preview') return props.showPreview
  return props.activeView === id
}
</script>

<template>
  <div class="h-full bg-gray-900 flex flex-col items-center py-4">
    <!-- Top Items -->
    <div class="flex flex-col items-center space-y-4 w-full">
      <div 
        v-for="item in topMenuItems" 
        :key="item.id"
        class="w-7 h-7 rounded transition-colors flex items-center justify-center"
        :class="getItemClass(item)"
        :title="isItemDisabled(item) ? '' : item.title"
        @click="handleClick(item)"
      >
        <component :is="item.icon" :size="18" class="w-[18px] h-[18px]" stroke-width="2" />
      </div>
    </div>

    <!-- Spacer -->
    <div class="flex-1"></div>

    <!-- Bottom Items -->
    <div class="flex flex-col items-center space-y-4 w-full">
      <div 
        v-for="item in bottomMenuItems" 
        :key="item.id"
        class="w-7 h-7 rounded transition-colors flex items-center justify-center"
        :class="getItemClass(item)"
        :title="isItemDisabled(item) ? '' : item.title"
        @click="handleClick(item)"
      >
        <component :is="item.icon" :size="18" class="w-[18px] h-[18px]" stroke-width="2" />
      </div>
    </div>
  </div>
</template>
