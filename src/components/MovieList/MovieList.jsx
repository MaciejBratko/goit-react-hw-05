import { Link, useLocation } from "react-router-dom";
import { FaStar, FaCalendarAlt } from "react-icons/fa";
import css from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul className={css.movieList}>
      {movies.map((movie) => (
        <li key={movie.id} className={css.movieItem}>
          <Link
            to={`/movies/${movie.id}`}
            state={{ from: location }}
            className={css.movieLink}
          >
            <div className={css.moviePosterContainer}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={`${movie.title} poster`}
                className={css.moviePoster}
              />
            </div>
            <div className={css.movieInfo}>
              <h3 className={css.movieTitle}>{movie.title}</h3>
              <div className={css.movieMetadata}>
                <p className={css.movieDate}>
                  <FaCalendarAlt className={css.icon} />
                  {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
                </p>
                <p className={css.movieRating}>
                  <FaStar className={css.icon} />
                  {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                </p>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;