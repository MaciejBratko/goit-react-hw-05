import { lazy, Suspense } from "react";
import { useState, useEffect } from "react";
import css from "./HomePage.module.css";
import { fetchPopularMovies } from "../../API/apiServices";
import useLoadingError from "../../hooks/useLoadingError";

const MovieList = lazy(() => import("../../components/MovieList/MovieList"));

const HomePage = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const { isLoading, error, startLoading, stopLoading, setErrorMessage, clearError } = useLoadingError();

  useEffect(() => {
    const getPopularMovies = async () => {
      startLoading();
      clearError();
      try {
        const movies = await fetchPopularMovies();
        setPopularMovies(movies);
      } catch (err) {
        setErrorMessage(err.message);
      } finally {
        stopLoading();
      }
    };

    getPopularMovies();
  }, []);

  const movieList = popularMovies.length > 0 ? (
    <MovieList movies={popularMovies} />
  ) : null;

  return (
    <Suspense fallback={<div>Loading movies...</div>}>
      <div className={css.homePage}>
        <h1 className={css.title}>Trending Movies</h1>
        {isLoading && <div className={css.loading}>Loading...</div>}
        {error && <div className={css.error}>{error}</div>}
        {movieList}
      </div>
    </Suspense>
  );
};

export default HomePage;