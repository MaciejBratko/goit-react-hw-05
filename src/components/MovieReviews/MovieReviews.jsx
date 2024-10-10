import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../API/api";
import css from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await api.get(`/movie/${movieId}/reviews`, {
          params: {
            language: "en-US",
            page: 1,
          },
        });
        setReviews(response.data.results);
      } catch (err) {
        setError("Failed to fetch reviews. Please try again later.");
        console.error("Error fetching reviews:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (movieId) {
      fetchReviews();
    }
  }, [movieId]);

  if (isLoading) {
    return <div className={css.loading}>Loading reviews...</div>;
  }

  if (error) {
    return <div className={css.error}>{error}</div>;
  }

  if (!reviews || reviews.length === 0) {
    return <div className={css.noReviews}>No reviews available.</div>;
  }

  return (
    <div className={css.reviewsContainer}>
      <h2 className={css.reviewsTitle}>Reviews</h2>
      <ul className={css.reviewsList}>
        {reviews.map((review) => (
          <li key={review.id} className={css.reviewItem}>
            <h3 className={css.reviewAuthor}>{review.author}</h3>
            <p className={css.reviewContent}>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
