import { loading } from '$lib/utils/stores.js'
loading.set(true)
export const load = async ({ url }) => {
  const { pathname } = url
  loading.set(false)
  return {
    pathname
  }
}