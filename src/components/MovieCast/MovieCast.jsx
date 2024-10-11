import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../API/api";
import css from "./MovieCast.module.css";
import useLoadingError from "../../hooks/useLoadingError";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);
  const { isLoading, error, startLoading, stopLoading, setErrorMessage, clearError } = useLoadingError();

  useEffect(() => {
    const fetchCast = async () => {
      startLoading();
      clearError();
      try {
        const response = await api.get(`/movie/${movieId}/credits`, {
          params: {
            language: "en-US",
          },
        });
        setCast(response.data.cast);
      } catch (err) {
        setErrorMessage("Failed to fetch cast information. Please try again later.");
        console.error("Error fetching cast:", err);
      } finally {
        stopLoading();
      }
    };

    if (movieId) {
      fetchCast();
    }
  }, [movieId]);

  if (isLoading) {
    return <div className={css.loading}>Loading cast information...</div>;
  }

  if (error) {
    return <div className={css.error}>{error}</div>;
  }

  if (!cast || cast.length === 0) {
    return <div className={css.noCast}>No cast information available.</div>;
  }

  return (
    <div className={css.castContainer}>
      <h2 className={css.castTitle}>Cast</h2>
      <ul className={css.castList}>
        {cast.map((actor) => (
          <li key={actor.id} className={css.castItem}>
            {actor.profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={actor.name}
                className={css.actorImage}
              />
            ) : (
              <div className={css.noImage}>No image available</div>
            )}
            <div className={css.actorInfo}>
              <p className={css.actorName}>{actor.name}</p>
              <p className={css.actorCharacter}>as {actor.character}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
