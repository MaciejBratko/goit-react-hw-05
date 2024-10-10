import { lazy, Suspense } from "react";
import { useState, useEffect, useMemo } from "react";
import css from "./HomePage.module.css";
import api from "../../API/api";
// import MovieList from "../../components/MovieList/MovieList";

const MovieList = lazy(() => import("../../components/MovieList/MovieList"));

const HomePage = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await api.get("/trending/movie/day", {
          params: {
            language: "en-US",
          },
        });
        setPopularMovies(response.data.results);
      } catch (err) {
        setError("Failed to fetch popular movies. Please try again later.");
        console.error("Error fetching popular movies:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPopularMovies();
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
