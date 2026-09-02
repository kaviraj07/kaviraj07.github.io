import { clsx, type ClassValue } from "clsx"

/** Shared class-name joiner. Kept at `@/lib/utils` because the vendored
 *  motion-primitives components import it from that path. */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}
