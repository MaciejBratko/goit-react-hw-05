import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../../API/api";
import MovieList from "../../components/MovieList/MovieList";
import css from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const fetchMovies = useMemo(() => {
    return async (query) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await api.get("/search/movie", {
          params: { query },
        });
        setMovies(response.data.results);
      } catch (error) {
        setError("An error occurred while fetching movies. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
  }, []);

  useEffect(() => {
    if (!query) return;
    fetchMovies(query);
  }, [query, fetchMovies]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const searchQuery = form.elements.searchQuery.value.trim();
    if (searchQuery) {
      setSearchParams({ query: searchQuery });
    }
  };

  const memoizedMovieList = useMemo(() => {
    return movies.length > 0 ? <MovieList movies={movies} /> : null;
  }, [movies]);

  return (
    <div className={css.moviesPage}>
      <h1 className={css.title}>Search Movies</h1>
      <form onSubmit={handleSubmit} className={css.searchForm}>
        <input
          type="text"
          name="searchQuery"
          defaultValue={query}
          placeholder="Search for movies..."
          className={css.searchInput}
        />
        <button type="submit" className={css.searchButton}>
          Search
        </button>
      </form>

      {isLoading && <div className={css.loader}>Loading...</div>}
      {error && <div className={css.error}>{error}</div>}
      {!isLoading && !error && movies.length === 0 && query && (
        <div className={css.noResults}>
          No movies found. Try another search.
        </div>
      )}
      {memoizedMovieList}
    </div>
  );
};

export default MoviesPage;
