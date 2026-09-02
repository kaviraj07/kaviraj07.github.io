/**
 * next/image and next/link add the configured basePath themselves, but a raw
 * asset URL inside a CSS value doesn't get that treatment.
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ""

export function withBasePath(path: string) {
  if (!path.startsWith("/")) return path
  return `${BASE_PATH}${path}`
}
