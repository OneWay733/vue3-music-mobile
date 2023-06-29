import { usePlaylistStore } from '@/stores/playlistStore'
import { remove, save } from '@/assets/js/array-store'
import { FAVORITE_KEY } from '@/assets/js/constant'
import { toRef } from 'vue'

export default function useFavorite() {
  const store = usePlaylistStore()
  const favoriteList = toRef(store, 'favoriteList')

  function getFavoriteIcon(song) {
    return isFavorite(song) ? 'icon-favorite' : 'icon-not-favorite'
  }
  function isFavorite(song) {
    const index = favoriteList.value.findIndex((item) => item.id === song.id)
    return index > -1
  }

  function toggleFavorite(song) {
    let list
    if (isFavorite(song)) {
      list = remove(FAVORITE_KEY, compare)
    } else {
      list = save(song, FAVORITE_KEY, compare, 100)
    }
    store.setFavoriteList(list)
    function compare(item) {
      return item.id === song.id
    }
  }

  return {
    getFavoriteIcon,
    toggleFavorite
  }
}
