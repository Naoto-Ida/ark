<script lang="ts">
import type { ItemGroupProps } from '@zag-js/combobox'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ComboboxItemGroupProps
  extends PolymorphicProps,
    Partial<ItemGroupProps>,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useId } from '../../utils'
import { ark } from '../factory'
import { useComboboxContext } from './use-combobox-context'
import { ComboboxItemGroupPropsProvider } from './use-combobox-item-group-props-context'

const props = defineProps<ComboboxItemGroupProps>()
const combobox = useComboboxContext()
const id = useId()
const itemGroupProps = computed(() => ({ id: props.id ? props.id : id.value }))

ComboboxItemGroupPropsProvider(itemGroupProps.value)
</script>

<template>
  <ark.div v-bind="combobox.getItemGroupProps(itemGroupProps)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
