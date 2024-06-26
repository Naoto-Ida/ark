import { datePickerAnatomy } from '@ark-ui/anatomy'
import type { ViewProps } from '@zag-js/date-picker'
import { mergeProps } from '@zag-js/solid'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { DatePickerViewProvider } from './use-date-picker-view-props-context'

export interface DatePickerViewProps extends Assign<HTMLArkProps<'div'>, Required<ViewProps>> {}

export const DatePickerView = (props: DatePickerViewProps) => {
  const [viewProps, localProps] = createSplitProps<Required<ViewProps>>()(props, ['view'])
  const api = useDatePickerContext()
  const mergedProps = mergeProps(() => datePickerAnatomy.build().view.attrs, localProps)

  return (
    <DatePickerViewProvider value={viewProps}>
      <ark.div {...mergedProps} hidden={api().view !== viewProps.view} />
    </DatePickerViewProvider>
  )
}
