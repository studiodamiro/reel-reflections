import { allPosts } from '@/.contentlayer/generated';
import { requestMovie, requestImages, requestVideos, requestGenreList } from './requests';

export type MovieType = {
  id?: number;
  title: string;
  release?: string;
  article: string;
  slug?: string;
  overview?: string;
  release_date?: string;
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
          const detailsResponse = await fetch(requestMovie(post.title, post.release.slice(0, 4)));
          if (!detailsResponse.ok) throw Error(`Failed to fetch details: ${detailsResponse.statusText}`);

          const data = await detailsResponse.json();
          const result = await data.results
            .filter((result: { title: string }) => result.title.toLowerCase() === post.title.toLowerCase())
            .filter((result: { release_date: string }) => result.release_date.slice(0, 4) === post.release.slice(0, 4));
          const details = result[0];

          // Fetch the images for the movie
          const imagesResponse = await fetch(requestImages(details.id));
          if (!imagesResponse.ok) throw new Error(`Failed to fetch images: ${imagesResponse.statusText}`);

          const images = await imagesResponse.json();

          // Filter backdrop images with iso_639_1 = null
          const backdrops = images.backdrops
            .filter((backdrop: { iso_639_1: string | null }) => backdrop.iso_639_1 === null)
            .map((backdrop: { file_path: string }) => backdrop.file_path);

          // Fetch the videos for the movie
          const videosResponse = await fetch(requestVideos(details.id));
          if (!videosResponse.ok) throw new Error(`Failed to fetch videos: ${videosResponse.statusText}`);

          const videosData = await videosResponse.json();
          const videos = videosData.results
            .filter((video: { iso_639_1: string | null }) => video.iso_639_1 === 'en')
            .map((video: { key: string }) => video.key);

          // Fetch list of genres then Map genre_ids to genre names
          const genreResponse = await fetch(requestGenreList());
          if (!genreResponse.ok) throw new Error(`Failed to fetch genres: ${genreResponse.statusText}`);

          const genreData = await genreResponse.json();
          const genres = details.genre_ids.map((genreId: number) => {
            const genre = genreData.genres.find((g: { id: number; name: string }) => g.id === genreId);
            return genre && genre.name;
          });

          return {
            id: details.id,
            title: details.title,
            article: post.article,
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
          console.error(`Error fetching movie: ${error}`);
          return null; // Return null for failed requests
        }
      })
    )
  ).filter((movie) => movie !== null) as MovieType[]; // Filter out null values (failed requests)

  return movies;
}
