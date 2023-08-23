export const getImages = async () => {
  const allImages = import.meta.glob('$lib/assets/work/**/*.{png,jpg,jpeg}')
  const iterableImages = Object.entries(allImages)
  const allImagesData = await Promise.all(
    iterableImages.map(async ([path, resolver]) => {
      const data: unknown = await resolver()
      const imageData = data as { default: string }
      const src = JSON.stringify(imageData.default).replaceAll('"', '')
      const srcsetJson = await import(/* @vite-ignore */`${path}?w=1344;672;336&format=webp&as=srcset`)
      const srcset = JSON.stringify(srcsetJson.default).replaceAll('"', '')
      return {
        src,
        srcset
      }
    })
  )
  return allImagesData
}