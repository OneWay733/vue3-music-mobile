import { clear, remove, save } from '@/assets/js/array-store'
import { SEARCH_KEY } from '@/assets/js/constant'
import { usePlaylistStore } from '@/stores/playlistStore'

export default function useSearchHistory() {
  const store = usePlaylistStore()
  const maxLen = 200
  function saveSearch(query) {
    const searches = save(query, SEARCH_KEY, (item) => item === query, maxLen)
    store.setSearchHistory(searches)
  }

  function deleteSearch(query) {
    const searches = remove(SEARCH_KEY, (item) => item === query)
    store.setSearchHistory(searches)
  }

  function clearSearch() {
    const searches = clear(SEARCH_KEY)
    store.setSearchHistory(searches)
  }

  return {
    saveSearch,
    deleteSearch,
    clearSearch
  }
}
