import { api_url } from './constants';

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export function requestMovie(title: string, release: string) {
  return `${api_url}/search/movie?query=${title}&year=${release}&api_key=${API_KEY}&language=en-US`;
}

export function requestGenreList() {
  return `${api_url}/genre/movie/list?api_key=${API_KEY}`;
}

export function requestImages(id: number) {
  return `${api_url}/movie/${id}/images?language=en-US&include_image_language=en,null&api_key=${API_KEY}`;
}

export function requestVideos(id: number) {
  return `${api_url}/movie/${id}/videos?language=en-US&api_key=${API_KEY}`;
}
