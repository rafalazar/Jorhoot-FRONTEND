import axios from 'axios';
import useSWR from 'swr';

export function useSurvey() {
  const apiUrl = import.meta.env.VITE_SURVEY_API_URL;

  const fetcher = (url) =>
    axios
      .get(`${apiUrl}${url}`)
      .then((res) => res.data);

  const { data, error, isLoading } = useSWR('surveys', fetcher);

  return {
    data,
    error,
    isLoading
  };
}
