import axios from 'axios';
import useSWR from 'swr';
import { apiURL } from '../../util/constants';

export function useOption(id) {
  const fetcher = (url) =>
    axios.get(`${apiURL}${url}/${id}`).then((res) => res.data);

  const { data, error, isLoading } = useSWR('option', fetcher);

  return {
    data,
    error,
    isLoading,
  };
}
