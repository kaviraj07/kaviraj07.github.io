import { clsx, type ClassValue } from "clsx"

/** Shared class-name joiner. Kept at `@/lib/utils` because the vendored
 *  motion-primitives components import it from that path. */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

/** Content stores dates as shouted ranges ("SEPT 2025 - CURRENT"). Display
 *  them in sentence case with a proper en dash, leaving the data untouched. */
export function formatDate(value: string) {
  return value
    .toLowerCase()
    .replace(/\b[a-z]/g, (c) => c.toUpperCase())
    .replace(/\s+-\s+/g, " – ")
}
