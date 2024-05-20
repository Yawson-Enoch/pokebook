import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from 'use-query-params';

export function useFilter() {
  return useQueryParams({
    q: withDefault(StringParam, ''),
    page: withDefault(NumberParam, 1),
    pageOffset: withDefault(NumberParam, 0),
    perPage: withDefault(NumberParam, 8),
    pokemonType: withDefault(StringParam, 'all'),
  });
}
