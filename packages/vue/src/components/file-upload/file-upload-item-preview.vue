<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface FileUploadItemPreviewProps
  extends PolymorphicProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {
  /**
   * The file type to match against. Matches all file types by default.
   * @default '.*'
   */
  type?: string
}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'
import { useFileUploadItemPropsContext } from './use-file-upload-item-props-context'

withDefaults(defineProps<FileUploadItemPreviewProps>(), {
  type: '.*',
})
const fileUpload = useFileUploadContext()
const itemProps = useFileUploadItemPropsContext()
</script>

<template>
  <ark.div
    v-if="itemProps.file.type.match(type ?? '.*')"
    v-bind="fileUpload.getItemPreviewProps(itemProps)"
    :as-child="asChild"
  >
    <slot />
  </ark.div>
</template>
