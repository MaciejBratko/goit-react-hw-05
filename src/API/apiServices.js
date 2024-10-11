import api from "./api";

export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}`, {
      params: {
        language: "en-US",
      },
    });
    return response.data;
  } catch (err) {
    console.error("Error fetching movie details:", err);
    throw new Error("Failed to fetch movie details. Please try again later.");
  }
};

export const fetchPopularMovies = async () => {
  try {
    const response = await api.get("/trending/movie/day", {
      params: {
        language: "en-US",
      },
    });
    return response.data.results;
  } catch (err) {
    console.error("Error fetching popular movies:", err);
    throw new Error("Failed to fetch popular movies. Please try again later.");
  }
};

export const fetchMovies = async (query) => {
  try {
    const response = await api.get("/search/movie", {
      params: { query },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw new Error(
      "An error occurred while fetching movies. Please try again."
    );
  }
};
