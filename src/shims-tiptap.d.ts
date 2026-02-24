
import '@tiptap/core'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    imageUpload: {
      triggerImageUpload: () => ReturnType
    }
  }
}
