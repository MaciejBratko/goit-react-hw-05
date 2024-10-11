import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchMovies } from "../../API/apiServices";
import MovieList from "../../components/MovieList/MovieList";
import css from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [sortCriteria, setSortCriteria] = useState("popularity");

  const searchMovies = useCallback(async (query) => {
    setIsLoading(true);
    setError(null);
    try {
      const results = await fetchMovies(query);
      setMovies(results);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!query) return;
    searchMovies(query);
  }, [query, searchMovies]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const searchQuery = form.elements.searchQuery.value.trim();
    if (searchQuery) {
      setSearchParams({ query: searchQuery });
    }
  };

  const handleSortChange = (event) => {
    setSortCriteria(event.target.value);
  };

  const sortMovies = (moviesToSort) => {
    return [...moviesToSort].sort((a, b) => {
      switch (sortCriteria) {
        case "popularity":
          return b.popularity - a.popularity;
        case "release_date":
          return new Date(b.release_date) - new Date(a.release_date);
        case "vote_average":
          return b.vote_average - a.vote_average;
        default:
          return 0;
      }
    });
  };

  const sortedMovies = sortMovies(movies);

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

      {movies.length > 0 && (
        <div className={css.sortContainer}>
          <label htmlFor="sortSelect">Sort by: </label>
          <select
            id="sortSelect"
            value={sortCriteria}
            onChange={handleSortChange}
            className={css.sortSelect}
          >
            <option value="popularity">Popularity</option>
            <option value="release_date">Release Date</option>
            <option value="vote_average">Rating</option>
          </select>
        </div>
      )}

      {isLoading && <div className={css.loader}>Loading...</div>}
      {error && <div className={css.error}>{error}</div>}
      {!isLoading && !error && movies.length === 0 && query && (
        <div className={css.noResults}>
          No movies found. Try another search.
        </div>
      )}
      {sortedMovies.length > 0 && <MovieList movies={sortedMovies} />}
    </div>
  );
};

export default MoviesPage;