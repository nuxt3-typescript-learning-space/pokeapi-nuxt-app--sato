<script setup lang="ts">
import { cn } from '@/lib/tailwind';
import type { HTMLAttributes } from 'vue';
const props = defineProps<{
  class?: HTMLAttributes['class'];
}>();
const { class: className } = toRefs(props);
</script>

<template>
  <div :class="cn('flex flex-col gap-y-1.5 p-6', className)">
    <slot />
  </div>
</template>
