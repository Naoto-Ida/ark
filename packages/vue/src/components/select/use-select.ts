import type { CollectionOptions } from '@zag-js/select'
import * as select from '@zag-js/select'
import { omit } from '@zag-js/utils'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, watch } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { CollectionItem, EmitFn, Optional } from '../../types'
import { cleanProps, useId } from '../../utils'
import { useFieldContext } from '../field'
import type { RootEmits } from './select'

export interface UseSelectProps<T extends CollectionItem>
  extends CollectionOptions<T>,
    Optional<
      Omit<select.Context<T>, 'collection' | 'dir' | 'getRootNode' | 'open.controlled' | 'value'>,
      'id'
    > {
  modelValue?: select.Context<T>['value']
  /**
   * The initial open state of the select when it is first rendered.
   * Use when you do not need to control its open state.
   */
  defaultOpen?: select.Context<T>['open']
  /**
   * The initial value of the select when it is first rendered.
   * Use when you do not need to control the state of the select.
   */
  defaultValue?: select.Context<T>['value']
}

export interface UseSelectReturn<T extends CollectionItem>
  extends ComputedRef<select.Api<PropTypes, T>> {}

export const useSelect = <T extends CollectionItem>(
  props: UseSelectProps<T>,
  emit?: EmitFn<RootEmits<T>>,
): UseSelectReturn<T> => {
  const id = useId()
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)
  const field = useFieldContext()

  const collection = computed(() => {
    const { items, itemToString, itemToValue, isItemDisabled } = props
    return select.collection({ items, itemToString, itemToValue, isItemDisabled })
  })

  const initialContext = computed<select.Context<T>>(() => {
    const { items, itemToString, itemToValue, isItemDisabled, ...otherProps } = props
    return {
      id,
      ids: {
        label: field?.value.ids.label,
        hiddenSelect: field?.value.ids.control,
      },
      disabled: field?.value.disabled,
      readOnly: field?.value.readOnly,
      invalid: field?.value.invalid,
      required: field?.value.required,
      dir: locale.value.dir,
      open: props.defaultOpen,
      'open.controlled': props.open !== undefined,
      collection: collection.value,
      value: props.modelValue ?? props.defaultValue,
      getRootNode: env?.value.getRootNode,
      onValueChange: (details) => {
        emit?.('valueChange', details)
        emit?.('update:modelValue', details.value)
      },
      onHighlightChange: (details) => emit?.('highlightChange', details),
      onOpenChange: (details) => {
        emit?.('openChange', details)
        emit?.('update:open', details.open)
      },
      onFocusOutside: (details) => emit?.('focusOutside', details),
      onInteractOutside: (details) => emit?.('interactOutside', details),
      onPointerDownOutside: (details) => emit?.('pointerDownOutside', details),
      ...cleanProps(otherProps),
    }
  })

  const [state, send] = useMachine(select.machine(initialContext.value), {
    context: computed(() => omit(initialContext.value, ['collection'])),
  })

  const api = computed(() => select.connect(state.value, send, normalizeProps))

  watch([collection], () => {
    api.value.setCollection(collection.value)
  })

  return api
}
