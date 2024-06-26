import type { ItemGroupProps } from '@zag-js/combobox'
import { mergeProps } from '@zag-js/solid'
import { createUniqueId } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import { useComboboxContext } from './use-combobox-context'
import { ComboboxItemGroupPropsProvider } from './use-combobox-item-group-props-context'

export interface ComboboxItemGroupProps extends HTMLArkProps<'div'> {}

export const ComboboxItemGroup = (props: ComboboxItemGroupProps) => {
  const [_itemGroupProps, localProps] = createSplitProps<Partial<ItemGroupProps>>()(props, ['id'])
  const combobox = useComboboxContext()
  const itemGroupProps = mergeProps({ id: createUniqueId() }, _itemGroupProps)
  const mergedProps = mergeProps(() => combobox().getItemGroupProps(itemGroupProps), localProps)

  return (
    <ComboboxItemGroupPropsProvider value={itemGroupProps}>
      <ark.div {...mergedProps} />
    </ComboboxItemGroupPropsProvider>
  )
}
