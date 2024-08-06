<script setup lang="ts">
import { cn } from '@/lib/tailwind';
import type { HTMLAttributes } from 'vue';
const props = defineProps<{
  class?: HTMLAttributes['class'];
}>();
const { class: className } = toRefs(props);
</script>

<template>
  <p :class="cn('text-sm text-muted-foreground', className)">
    <slot />
  </p>
</template>
