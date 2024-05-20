import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DotsHorizontalIcon,
  ExclamationTriangleIcon,
  InfoCircledIcon,
} from '@radix-ui/react-icons';
import ReactPaginate from 'react-paginate';

import {
  PokemonDetails,
  useGetPokemons,
  useGetPokemonsDetails,
} from '@/hooks/api/use-pokemon';
import { useFilter } from '@/hooks/use-query-state';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import PokemonCard from './pokemon-card';

const perPageValues = [8, 12, 16, 24];

export default function PokemonsList() {
  /* manage state with query params - make filter sharable and maintain filter state on page refresh */
  const [filter, setFilter] = useFilter();

  const { isPending, isError } = useGetPokemons();
  const pokemonsDetails = useGetPokemonsDetails();

  /* check if some query of `useGetPokemonsDetails` is loading  */
  const isPokemonDetailsPending = pokemonsDetails.some(
    (query) => query.isPending,
  );
  /* check if some query `useGetPokemonsDetails` has errored out  */
  const isPokemonDetailsError = pokemonsDetails.some((query) => query.isError);

  if (isPending || isPokemonDetailsPending) {
    return (
      <main className="container max-w-[1300px] py-8 pb-16 text-center md:py-12 md:pb-24">
        <div className="mx-auto size-16 animate-spin rounded-full border-4 border-dashed border-accent" />
        <p className="mt-3 text-center font-sans text-xl font-medium md:text-2xl">
          Loading...
        </p>
        <p>Your Pokémon adventure is about to begin.</p>
      </main>
    );
  }

  if (isError || isPokemonDetailsError) {
    return (
      <main className="container max-w-[1300px] py-8 pb-16 text-center md:py-12 md:pb-24">
        <ExclamationTriangleIcon className="mx-auto size-16 text-red-500" />
        <p className="mt-3 text-center font-sans text-xl font-medium md:text-2xl">
          Failed to load!
        </p>
        <p>Please check your internet connection and try again.</p>
      </main>
    );
  }

  /* `pokemonsDetails` returns array of all the queries, mapping over it to only get the `data` fields  
  - returns an empty array if `useGetPokemons` data in undefined
  - running after `useGetPokemons` and all the queries for `useGetPokemonsDetails` are successful ensures that all the data is available 
  */
  const pokemonsDetailsData = pokemonsDetails.map(
    (pokemon) => pokemon.data as PokemonDetails,
  );

  /* get unique types from all the fetched pokemons */
  const allTypes = pokemonsDetailsData.flatMap((pokemon) =>
    pokemon.types.map((type) => type.type.name),
  );
  const uniqueTypes = ['all', ...new Set(allTypes)]; // get unique types

  /* filter pokemons by `pokemonType` */
  const pokemonsByType =
    filter.pokemonType === 'all'
      ? pokemonsDetailsData
      : pokemonsDetailsData.filter((pokemon) =>
          pokemon.types.some((type) => type.type.name === filter.pokemonType),
        );

  /* filter`pokemonType` by search result 
    - only filtering by `name` here
  */
  const pokemonsBySearch = pokemonsByType.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(filter.q.trim().toLowerCase()),
  );

  /* pokemons data pagination */
  const endOffset = filter.pageOffset + filter.perPage;
  const currentPokemons = pokemonsBySearch.slice(filter.pageOffset, endOffset);
  const pageCount = Math.ceil(pokemonsBySearch.length / filter.perPage);

  const handlePageClick = async ({ selected }: { selected: number }) => {
    if (pageCount > 1) {
      const newOffset = (selected * filter.perPage) % pokemonsBySearch.length;
      setFilter({ page: selected + 1, pageOffset: newOffset });
    }
  };

  if (pageCount === 0) {
    return (
      <main className="container max-w-[1300px] py-8 pb-16 text-center md:py-12 md:pb-24">
        <InfoCircledIcon className="mx-auto size-16" />
        <p className="mt-3 text-center font-sans text-xl font-medium md:text-2xl">
          Oops! No matches.
        </p>
        <p>Adjust your filters or modify your search query.</p>
      </main>
    );
  }

  return (
    <main>
      <div className="container grid h-full max-w-[1300px] gap-y-24 py-8 pb-16 md:py-12 md:pb-24">
        {/* list of pokemons */}
        <ul className="grid grid-cols-[repeat(auto-fill,_minmax(min(288px,_100%),_1fr))] gap-x-4 gap-y-28">
          {currentPokemons.map((currentPokemon) => (
            <PokemonCard key={currentPokemon.id} {...currentPokemon} />
          ))}
        </ul>
        {/* pagination elements */}
        {pageCount >= 1 ? (
          <div className="flex flex-wrap gap-x-4 gap-y-6 max-md:justify-center md:items-center md:justify-between">
            <ReactPaginate
              pageCount={pageCount}
              forcePage={filter.page - 1}
              pageRangeDisplayed={4}
              marginPagesDisplayed={1}
              renderOnZeroPageCount={null}
              onPageChange={handlePageClick}
              containerClassName="flex w-fit flex-wrap items-center gap-0.5 font-medium text-foreground md:gap-2 md:text-lg"
              pageClassName="block"
              pageLinkClassName="flex aspect-square size-8 items-center justify-center rounded-sm md:size-[40px] md:rounded-[8px] md:bg-muted"
              activeLinkClassName="border border-transparent text-accent max-md:border-accent md:!bg-accent md:text-accent-foreground"
              disabledClassName="pointer-events-none text-muted-foreground/30"
              previousLabel={<ChevronLeftIcon className="size-4 md:size-6" />}
              previousLinkClassName="flex aspect-square size-8 items-center justify-center rounded-sm md:size-[40px] md:rounded-[8px] md:bg-muted"
              breakLabel={<DotsHorizontalIcon className="size-4 md:size-6" />}
              breakClassName="block self-end"
              nextLabel={<ChevronRightIcon className="size-4 md:size-6" />}
              nextLinkClassName="flex aspect-square size-8 items-center justify-center rounded-sm md:size-[40px] md:rounded-[8px] md:bg-muted"
            />

            <div className="flex flex-wrap gap-x-4 gap-y-6 max-md:justify-center md:items-center">
              {/* select pokemon type */}
              <Select
                value={filter.pokemonType}
                onValueChange={(value) => {
                  setFilter({
                    page: undefined,
                    pageOffset: undefined,
                    pokemonType: value,
                  });
                }}
              >
                <SelectTrigger className="w-[133px]">
                  <div className="flex h-[32px] w-[90px] items-center justify-center rounded-[4px] bg-background text-lg font-medium capitalize">
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {uniqueTypes.map((value) => (
                      <SelectItem
                        key={value}
                        value={value.toString()}
                        className="capitalize"
                      >
                        {value}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              {/* select pokemons per page */}
              <Select
                value={filter.perPage.toString()}
                onValueChange={(value) => {
                  setFilter({
                    page: undefined,
                    pageOffset: undefined,
                    perPage: Number(value),
                  });
                }}
              >
                <SelectTrigger className="w-[85px]">
                  <div className="flex h-[32px] w-[43px] items-center justify-center rounded-[4px] bg-background text-lg font-medium">
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {perPageValues.map((value) => (
                      <SelectItem
                        key={value}
                        value={value.toString()}
                        className="justify-center"
                      >
                        {value}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}
