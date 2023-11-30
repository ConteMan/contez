<script setup lang="ts">
import { DialogTitle, type DialogTitleProps } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<DialogTitleProps & { class?: string }>()
</script>

<template>
  <DialogTitle
    :class="cn('text-lg font-semibold text-zinc-950 dark:text-zinc-50', props.class)"
    v-bind="props"
  >
    <slot />
  </DialogTitle>
</template>
