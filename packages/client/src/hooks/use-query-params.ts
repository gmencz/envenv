import { useLocation } from 'react-router-dom';

export function useQueryParams(): URLSearchParams {
  const { search } = useLocation();
  return new URLSearchParams(search);
}
