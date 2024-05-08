import * as React from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DotsHorizontalIcon,
} from '@radix-ui/react-icons';
import ReactPaginate from 'react-paginate';

import {
  PokemonsDetails,
  useGetPokemons,
  useGetPokemonsDetails,
} from '@/hooks/api/use-pokemon';
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
  const [pageOffset, setPageOffset] = React.useState(0);
  const [pokemonsPerPage, setPokemonsPerPage] = React.useState(
    perPageValues[0] || 8,
  );
  const [page, setPage] = React.useState(1);

  const { isSuccess } = useGetPokemons();
  const pokemonsDetails = useGetPokemonsDetails();

  /* check if some query has errored out or is loading */
  const isPokemonsDetailsComplete = pokemonsDetails.some(
    (query) => query.data === undefined,
  );
  /* `pokemonsDetails` returns array of all the queries, mapping over it to only get the `data` fields  */
  const pokemonsDetailsData = pokemonsDetails.map(
    (pokemon) => pokemon.data as PokemonsDetails,
  );

  /* pokemons data pagination */
  const endOffset = pageOffset + pokemonsPerPage;
  const currentPokemons = pokemonsDetailsData.slice(pageOffset, endOffset);
  const pageCount = Math.ceil(pokemonsDetailsData.length / pokemonsPerPage);

  const handlePageClick = async ({ selected }: { selected: number }) => {
    if (pageCount > 1) {
      const newOffset =
        (selected * pokemonsPerPage) % pokemonsDetailsData.length;
      window.scrollTo(0, 0);
      setPage(selected + 1);
      setPageOffset(newOffset);
    }
  };

  return (
    <main>
      <div className="container grid h-full max-w-[1300px] gap-y-24 py-8 pb-16 md:py-12 md:pb-24">
        {isPokemonsDetailsComplete ? (
          <p className="text-center text-2xl font-medium">
            Loading pokemons...
          </p>
        ) : isSuccess && pokemonsDetails.length === 0 ? (
          <p className="text-center text-2xl font-medium">
            No pokemons available
          </p>
        ) : (
          <React.Fragment>
            {/* list of pokemons */}
            <ul className="grid grid-cols-[repeat(auto-fill,_minmax(min(288px,_100%),_1fr))] gap-x-4 gap-y-28">
              {currentPokemons.map((currentPokemon) => (
                <PokemonCard key={currentPokemon.id} pokemon={currentPokemon} />
              ))}
            </ul>
            {/* pagination elements */}
            {pageCount >= 1 ? (
              <div className="flex flex-wrap gap-x-4 gap-y-6 max-md:justify-center md:items-center md:justify-between">
                <ReactPaginate
                  pageCount={pageCount}
                  forcePage={page - 1}
                  pageRangeDisplayed={4}
                  marginPagesDisplayed={1}
                  renderOnZeroPageCount={null}
                  onPageChange={handlePageClick}
                  containerClassName="flex w-fit flex-wrap items-center gap-0.5 font-medium text-foreground md:gap-2 md:text-lg"
                  pageClassName="block"
                  pageLinkClassName="flex aspect-square size-8 items-center justify-center rounded-sm md:size-[40px] md:rounded-[8px] md:bg-muted"
                  activeLinkClassName="border border-transparent text-accent max-md:border-accent md:!bg-accent md:text-accent-foreground"
                  disabledClassName="pointer-events-none text-muted-foreground/30"
                  previousLabel={
                    <ChevronLeftIcon className="size-4 md:size-6" />
                  }
                  previousLinkClassName="flex aspect-square size-8 items-center justify-center rounded-sm md:size-[40px] md:rounded-[8px] md:bg-muted"
                  breakLabel={
                    <DotsHorizontalIcon className="size-4 md:size-6" />
                  }
                  breakClassName="block self-end"
                  nextLabel={<ChevronRightIcon className="size-4 md:size-6" />}
                  nextLinkClassName="flex aspect-square size-8 items-center justify-center rounded-sm md:size-[40px] md:rounded-[8px] md:bg-muted"
                />

                {/* select pokemons per page */}
                <Select
                  value={pokemonsPerPage.toString()}
                  onValueChange={(value) => {
                    window.scrollTo(0, 0);
                    setPage(1);
                    setPageOffset(0);
                    setPokemonsPerPage(Number(value));
                  }}
                >
                  <SelectTrigger className="w-[85px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {perPageValues.map((value) => (
                        <SelectItem key={value} value={value.toString()}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            ) : null}
          </React.Fragment>
        )}
      </div>
    </main>
  );
}