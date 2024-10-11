import { Suspense } from "react";
import { useState, useEffect } from "react";
import { useParams, useLocation, Link, Outlet } from "react-router-dom";
import { fetchMovieDetails } from "../../API/apiServices";
import css from "./MovieDetailsPage.module.css";
import useLoadingError from "../../hooks/useLoadingError";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const {
    isLoading,
    error,
    startLoading,
    stopLoading,
    setErrorMessage,
    clearError,
  } = useLoadingError();
  const location = useLocation();

  const backLinkRef = location.state?.from ?? "/movies";

  useEffect(() => {
    const getMovieDetails = async () => {
      startLoading();
      clearError();
      try {
        const details = await fetchMovieDetails(movieId);
        setMovieDetails(details);
      } catch (err) {
        setErrorMessage(err.message);
      } finally {
        stopLoading();
      }
    };

    if (movieId) {
      getMovieDetails();
    }
  }, [movieId]);

  if (isLoading) {
    return <div className={css.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={css.error}>{error}</div>;
  }

  if (!movieDetails) {
    return null;
  }
  return (
    <Suspense fallback={<div>Loading additional information...</div>}>
      <div className={css.movieDetailsPage}>
        <Link to={backLinkRef} className={css.backLink}>
          ← Go back
        </Link>
        <div className={css.movieContent}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
            alt={movieDetails.title}
            className={css.poster}
          />
          <div className={css.movieInfo}>
            <h1 className={css.title}>{movieDetails.title}</h1>
            <p className={css.overview}>{movieDetails.overview}</p>
            <div className={css.additionalInfo}>
              <h2>Additional Information</h2>
              <ul className={css.infoList}>
                <li>
                  <Link to={`/movies/${movieId}/cast`} className={css.infoLink}>
                    Cast
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/movies/${movieId}/reviews`}
                    className={css.infoLink}
                  >
                    Reviews
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </Suspense>
  );
};

export default MovieDetailsPage;
