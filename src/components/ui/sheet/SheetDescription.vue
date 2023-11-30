<script setup lang="ts">
import { DialogDescription, type DialogDescriptionProps } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<DialogDescriptionProps & { class?: string }>()
</script>

<template>
  <DialogDescription
    :class="cn('text-sm text-zinc-500 dark:text-zinc-400', props.class)"
    v-bind="props"
  >
    <slot />
  </DialogDescription>
</template>
