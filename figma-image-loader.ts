'use client'

const PAYLOAD_FILE_PATH_PATTERN = /^\/(?!\/)(?:.+\/)?api\/[^/]+\/file\/.+$/

export default function figmaNextImageLoader({
  src,
  width,
  quality,
}: {
  src: string
  width: number
  quality?: number
}) {
  const [pathname, search = ''] = src.split('?')
  if (!PAYLOAD_FILE_PATH_PATTERN.test(pathname)) {
    return src
  }
  const searchParams = new URLSearchParams(search)
  searchParams.set('w', String(width))
  if (quality !== undefined) {
    searchParams.set('q', String(quality))
  }
  return `${pathname}?${searchParams}`
}
