import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from 'use-query-params';

export function useFilter() {
  return useQueryParams({
    page: withDefault(NumberParam, 1),
    pageOffset: withDefault(NumberParam, 0),
    perPage: withDefault(NumberParam, 8),
    pokemonType: withDefault(StringParam, 'all'),
    s: withDefault(StringParam, ''),
  });
}
