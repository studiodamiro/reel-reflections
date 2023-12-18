import { allPosts } from '@/.contentlayer/generated';
import { requestMovie, requestImages, requestVideos, requestGenreList } from './requests';

export type MovieType = {
  id?: number;
  title: string;
  release?: string;
  article: string;
  description?: string;
  created?: string;
  slug?: string;
  overview?: string;
  vote_average?: number;
  backdrops?: string[];
  logos?: string[];
  posters?: string[];
  videos?: string[];
  genre?: string[];
  genre_ids?: number[];
};

export default async function fetchMovies() {
  const movies: MovieType[] = (
    await Promise.all(
      allPosts.map(async (post) => {
        try {
          // Fetch the details for the movie
          const details = await fetchDetails(post.title, post.release.slice(0, 4));

          // Fetch the images for the movie
          const images = await fetchImages(details.id);

          // Filter backdrop images with iso_639_1 = null
          const backdrops = await fetchBackdrops(images);

          // Fetch the videos for the movie
          const videos = await fetchVideos(details.id);

          // Fetch list of genres then Map genre_ids to genre names
          const genres = await fetchGenres(details.genre_ids);

          return {
            id: details.id,
            title: details.title,
            article: post.article,
            created: post.created,
            description: post.description,
            slug: post.slug,
            release: details.release_date && details.release_date.slice(0, 4),
            overview: details.overview,
            genre: genres,
            backdrops: backdrops,
            logos: images.logos.map((result: any) => result.file_path),
            posters: images.posters.map((result: any) => result.file_path),
            videos: videos,
          };
        } catch (error) {
          console.error(`fetching error: ${error}`);
          return null;
        }
      })
    )
  ).filter((movie) => movie !== null) as MovieType[]; // Filter out failed requests

  return movies;
}

const fetchDetails = async (title: string, release: string) => {
  const detailsResponse = await fetch(requestMovie(title, release.slice(0, 4)));
  if (!detailsResponse.ok) throw Error(`Failed to fetch details: ${detailsResponse.statusText}`);

  const data = await detailsResponse.json();
  const result = data.results
    .filter((result: { title: string }) => result.title.toLowerCase() === title.toLowerCase())
    .filter((result: { release_date: string }) => result.release_date.slice(0, 4) === release.slice(0, 4));

  if (result.length === 0) {
    throw Error(`No matching movie found for title: ${title} and release: ${release}`);
  }

  return result[0];
};

const fetchImages = async (id: number) => {
  const imagesResponse = await fetch(requestImages(id));
  if (!imagesResponse.ok) throw new Error(`Failed to fetch images: ${imagesResponse.statusText}`);
  // console.log(imagesResponse.json);
  return await imagesResponse.json();
};

const fetchBackdrops = async (images: any) => {
  return (images?.backdrops ?? [])
    .filter((backdrop: { iso_639_1: string | null }) => backdrop.iso_639_1 === null)
    .map((backdrop: { file_path: string }) => backdrop.file_path);
};

const fetchVideos = async (id: number) => {
  const videosResponse = await fetch(requestVideos(id));
  if (!videosResponse.ok) throw new Error(`Failed to fetch videos: ${videosResponse.statusText}`);
  const videosData = await videosResponse.json();
  return videosData.results
    .filter((video: { iso_639_1: string | null }) => video.iso_639_1 === 'en')
    .map((video: { key: string }) => video.key);
};

const fetchGenres = async (genre_ids: any) => {
  const genreResponse = await fetch(requestGenreList());
  if (!genreResponse.ok) throw new Error(`Failed to fetch genres: ${genreResponse.statusText}`);
  const genreData = await genreResponse.json();
  return genre_ids.map((genreId: number) => {
    const genre = genreData.genres.find((g: { id: number; name: string }) => g.id === genreId);
    return genre && genre.name;
  });
};
