import { lazy, Suspense } from "react";
import { useState, useEffect, useMemo } from "react";
import css from "./HomePage.module.css";
import { fetchPopularMovies } from "../../API/apiServices";

const MovieList = lazy(() => import("../../components/MovieList/MovieList"));

const HomePage = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPopularMovies = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const movies = await fetchPopularMovies();
        setPopularMovies(movies);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    getPopularMovies();
  }, []);

  const memoizedMovieList = useMemo(() => {
    return popularMovies.length > 0 ? (
      <MovieList movies={popularMovies} />
    ) : null;
  }, [popularMovies]);

  return (
    <Suspense fallback={<div>Loading movies...</div>}>
      <div className={css.homePage}>
        <h1 className={css.title}>Trending Movies</h1>
        {isLoading && <div className={css.loading}>Loading...</div>}
        {error && <div className={css.error}>{error}</div>}
        {memoizedMovieList}
      </div>
    </Suspense>
  );
};

export default HomePage;
