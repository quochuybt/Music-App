import { albumApi } from "../api/albumApi";
import { artistApi } from "../api/artistApi";
import { genreApi } from "../api/genreApi";
import { songApi } from "../api/songApi";

const HOME_CACHE_TTL = 5 * 60 * 1000;

let cachedHomeData = null;
let cachedAt = 0;
let pendingHomeData = null;

const isFresh = () => cachedHomeData && Date.now() - cachedAt < HOME_CACHE_TTL;

export const getCachedHomeData = () => (isFresh() ? cachedHomeData : null);

export const loadHomeData = () => {
  if (isFresh()) return Promise.resolve(cachedHomeData);
  if (pendingHomeData) return pendingHomeData;

  pendingHomeData = Promise.all([
    songApi.list({ size: 8 }),
    albumApi.list({ size: 4 }),
    artistApi.list({ size: 4 }),
    genreApi.list({ size: 8 }),
  ])
    .then(([songs, albums, artists, genres]) => {
      cachedHomeData = {
        songs: songs.content || [],
        albums: albums.content || [],
        artists: artists.content || [],
        genres: genres.content || [],
      };
      cachedAt = Date.now();
      return cachedHomeData;
    })
    .finally(() => {
      pendingHomeData = null;
    });

  return pendingHomeData;
};

export const preloadHomeData = () => {
  if (isFresh() || pendingHomeData) return;
  loadHomeData().catch(() => {});
};
