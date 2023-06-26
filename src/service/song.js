import { get } from './base'

export function registerSongs(songs) {
  if (!songs.length) return Promise.resolve(songs)
  return get('/api/getSongsUrl', {
    mid: songs.map((song) => song.mid)
  }).then(({ result: { map } }) => {
    return songs.map((song) => {
      song.url = map[song.mid]
      return song
    })
  })
}
