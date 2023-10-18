import axios from 'axios';
import useSWR from 'swr';
import { apiURL } from '../../util/constants';

export function useSurvey() {
  const fetcher = (url) => axios.get(`${apiURL}${url}`).then((res) => res.data);

  const { data, error, isLoading } = useSWR('surveys', fetcher);

  return {
    data,
    error,
    isLoading,
  };
}
