import { useState } from 'react';

const useLoadingError = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  const setErrorMessage = (message) => setError(message);
  const clearError = () => setError(null);

  const reset = () => {
    setIsLoading(false);
    setError(null);
  };

  return {
    isLoading,
    error,
    startLoading,
    stopLoading,
    setErrorMessage,
    clearError,
    reset,
  };
};

export default useLoadingError;