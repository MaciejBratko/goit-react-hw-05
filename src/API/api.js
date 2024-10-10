import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ODUyN2FhMTJlODMzNDgxZmQyMTAwODViOTgzY2IxYyIsIm5iZiI6MTcyODU4NzAwMi4zOTk0NDYsInN1YiI6IjY3MDgyNDZhZTQ2YTEyYTE5NDFhNTkwZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ysOrQ9pf_oafDVtpFcDEBOU_iLxzpCg_9rCDwVE7Qwo",
  },
});

export default api;
