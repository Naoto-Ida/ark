<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ToastCloseTriggerProps
  extends PolymorphicProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useToastContext } from './use-toast-context'

defineProps<ToastCloseTriggerProps>()
const toast = useToastContext()
</script>

<template>
  <ark.button v-bind="toast.closeTriggerProps" :as-child="asChild">
    <slot />
  </ark.button>
</template>
