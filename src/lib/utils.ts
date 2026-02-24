import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Extracts plain text from a Block or TipTap content structure.
 * Handles strings, TipTap node arrays, and nested structures.
 */
export function getBlockText(content: any): string {
  if (!content) return ''
  
  // 1. Simple string
  if (typeof content === 'string') {
    return content
  }
  
  // 2. TipTap Text Node (has .text property)
  if (content.type === 'text' && typeof content.text === 'string') {
    return content.text
  }

  // 3. Array of nodes/blocks
  if (Array.isArray(content)) {
    return content.map(node => getBlockText(node)).join('')
  }

  // 4. Object with content property (like a Block)
  if (content.content) {
    return getBlockText(content.content)
  }
  
  return ''
}
