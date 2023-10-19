import axios from 'axios';
import { apiURL } from '../../util/constants';
import useSWR from 'swr';

export function useResult(idSurvey) {
  const fetcher = (url) =>
    axios.get(`${apiURL}${url}/${idSurvey}`).then((res) => res.data);

  const { data, error, isLoading } = useSWR('option', fetcher, {refreshInterval: 500});

  return {
    data,
    error,
    isLoading,
  };
}
