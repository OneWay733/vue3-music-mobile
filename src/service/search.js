import { get } from '@/service/base'

export function getHotKeys() {
  return get('/api/getHotKeys')
}
