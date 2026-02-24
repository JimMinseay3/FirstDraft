<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref, watch, computed } from 'vue'
import { Settings } from 'lucide-vue-next'

const { t, locale } = useI18n()

// Props are no longer needed for globalStyles as they moved to TypographySidebar
// But keeping it if we need other global settings in the future, or removing if strictly cleaning up.
// For now, I'll remove the unused prop to be clean.

const currentLanguage = ref(locale.value)

const shortcuts = computed(() => [
  { name: t('menu.open'), key: 'Ctrl + O' },
  { name: t('settings.save'), key: 'Ctrl + S' },
  { name: t('settings.saveAs'), key: 'Ctrl + Shift + S' },
  { name: t('settings.undo'), key: 'Ctrl + Z' },
  { name: t('settings.redo'), key: 'Ctrl + Y' },
  { name: t('settings.bold'), key: 'Ctrl + B' },
  { name: t('settings.italic'), key: 'Ctrl + I' },
  { name: t('settings.commandPalette'), key: 'Ctrl + Shift + P' },
  { name: t('settings.mathBlock'), key: 'Ctrl + Shift + K' },
  { name: t('settings.search'), key: 'Ctrl + F' },
  { name: t('settings.selectAll'), key: 'Ctrl + A' },
  { name: t('settings.center'), key: 'Ctrl + E' },
  { name: t('settings.preview'), key: 'Alt + P' },
  { name: t('settings.devtools'), key: 'F12' },
])

watch(currentLanguage, (newLang) => {
  locale.value = newLang
})
</script>

<template>
  <div class="h-full flex flex-col bg-white border-r border-gray-200">
    <!-- Header -->
    <div class="h-10 px-4 border-b border-gray-200 flex items-center justify-between bg-gray-50 flex-shrink-0">
      <h2 class="text-xs font-bold text-gray-700 uppercase flex items-center">
        <Settings class="w-4 h-4 mr-2 text-blue-500" />
        {{ t('settings.title') }}
      </h2>
    </div>

    <div class="flex-1 overflow-y-auto p-4 space-y-6">
      <!-- Language Settings -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">{{ t('settings.language') }}</label>
        <select 
          v-model="currentLanguage"
          class="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
        >
          <option value="zh">中文 (Chinese)</option>
          <option value="en">English</option>
        </select>
      </div>

      <!-- Shortcuts -->
      <div class="pt-6 border-t border-gray-200">
        <h3 class="text-sm font-medium text-gray-900 mb-4">{{ t('settings.shortcuts') }}</h3>
        <div class="space-y-3">
          <div v-for="s in shortcuts" :key="s.name" class="flex items-center justify-between">
            <span class="text-xs text-gray-600">{{ s.name }}</span>
            <div class="flex gap-1">
              <kbd 
                v-for="k in s.key.split(' + ')" 
                :key="k"
                class="px-1.5 py-0.5 text-[10px] font-sans font-semibold text-gray-600 bg-gray-50 border border-gray-300 rounded shadow-[0_1px_0_rgba(0,0,0,0.1)] min-w-[20px] text-center"
              >
                {{ k }}
              </kbd>
            </div>
          </div>
        </div>
      </div>

      <!-- About -->
      <div class="pt-6 border-t border-gray-200">
        <h3 class="text-sm font-medium text-gray-900">{{ t('settings.about') }}</h3>
        <p class="mt-1 text-xs text-gray-500">FirstDraft v0.1.0</p>
      </div>
    </div>
  </div>
</template>