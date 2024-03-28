import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { usePresenceContext } from '../presence'
import { useDialogContext } from './use-dialog-context'

export interface DialogPositionerProps extends HTMLArkProps<'div'> {}

export const DialogPositioner = forwardRef<HTMLDivElement, DialogPositionerProps>((props, ref) => {
  const context = useDialogContext()
  const mergedProps = mergeProps(context.positionerProps, props)
  const presenceApi = usePresenceContext()

  if (presenceApi.isUnmounted) {
    return null
  }

  return <ark.div {...mergedProps} ref={ref} />
})

DialogPositioner.displayName = 'DialogPositioner'