<script setup lang="ts">
import { cn } from '@/lib/tailwind';
import type { HTMLAttributes } from 'vue';
const props = defineProps<{
  class?: HTMLAttributes['class'];
}>();
const { class: className } = toRefs(props);
</script>

<template>
  <div :class="cn('rounded-lg border bg-card text-card-foreground shadow-sm', className)">
    <slot />
  </div>
</template>
