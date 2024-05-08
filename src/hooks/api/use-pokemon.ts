import { useQueries, useQuery } from '@tanstack/react-query';
import { z } from 'zod';

/* --SCHEMAS--
zod schema to strip out unnecessary fields and get types from api - 
- eg: only the `results` field is really needed for the fetched pokemons data
- use `https://transform.tools/json-to-zod` to convert json to zod
*/
const Pokemons = z.object({
  results: z.array(z.object({ name: z.string(), url: z.string() })),
});
type Pokemons = z.infer<typeof Pokemons>;

const PokemonsDetails = z.object({
  abilities: z.array(
    z.object({
      ability: z.object({ name: z.string(), url: z.string() }),
    }),
  ),
  height: z.number(),
  id: z.number(),
  name: z.string(),
  sprites: z.object({
    other: z.object({
      dream_world: z.object({
        front_default: z.string(),
      }),
    }),
  }),
  stats: z.array(
    z.object({
      base_stat: z.number(),
      stat: z.object({ name: z.string() }),
    }),
  ),
  types: z.array(
    z.object({
      type: z.object({ name: z.string(), url: z.string() }),
    }),
  ),
  weight: z.number(),
});
export type PokemonsDetails = z.infer<typeof PokemonsDetails>;

/* --FETCHER FUNCTIONS-- */
export const getPokemons = async () => {
  const response = await fetch(
    'https://pokeapi.co/api/v2/pokemon?limit=500&offset=0',
  );
  if (!response.ok) {
    throw new Error('Failed to fetch pokemons');
  }

  const data = await response.json();
  const result = Pokemons.safeParse(data);

  if (!result.success) {
    throw new Error('Failed to parse data');
  }
  return result.data;
};

const getPokemonsDetails = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch pokemon details');
  }

  const data = await response.json();
  const result = PokemonsDetails.safeParse(data);

  if (!result.success) {
    throw new Error('Failed to parse data');
  }
  return result.data;
};

/* --QUERY KEYS-- */
export const pokemonsQueryKey = ['pokemons'];

/* --QUERY HOOKS-- */
/* fetch pokemons 
- this is to get the urls of the pokemons 
*/
export function useGetPokemons() {
  return useQuery({
    queryKey: pokemonsQueryKey,
    queryFn: getPokemons,
    select: (pokemons) => pokemons.results.map((pokemon) => pokemon.url),
    staleTime: Infinity,
  });
}

/* fetch pokemons details 
  - this is to get the details for each pokemon 
  - fetches details for each pokemon using the urls from `useGetPokemons`
  - returns an array of all the queries
*/
export function useGetPokemonsDetails() {
  const { data: pokemonsUrls } = useGetPokemons();

  return useQueries({
    queries: pokemonsUrls
      ? pokemonsUrls.map((url) => {
          return {
            queryKey: ['pokemons', url],
            queryFn: () => getPokemonsDetails(url),
            staleTime: Infinity,
          };
        })
      : [],
  });
}
