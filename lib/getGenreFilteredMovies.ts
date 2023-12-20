import { useMovies } from '@/providers/MoviesProvider';

type getGenreFilteredMoviesProps = {
  genres: string[];
  titleToExclude?: string;
};

export default function getGenreFilteredMovies(props: getGenreFilteredMoviesProps) {
  const { genres, titleToExclude } = props;
  const { movies } = useMovies();

  const filteredMovies = movies.filter((movie) => {
    return genres.some((genre) => movie.genre?.includes(genre));
  });

  const sortedMovies = filteredMovies.sort((a, b) => {
    if (!a.created || !b.created) return 0;
    return b.created.localeCompare(a.created);
  });

  const excludedMovieIndex = sortedMovies.findIndex((movie) => movie.title === titleToExclude);
  if (excludedMovieIndex !== -1) {
    sortedMovies.splice(excludedMovieIndex, 1);
  }

  return sortedMovies;
}
