import * as React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';

import { getPokemons, pokemonsQueryKey } from '@/hooks/api/use-pokemon';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/common/icons';

export default function Home() {
  const queryClient = useQueryClient();

  /* prefetch pokemons 
  - this starts the fetching of the pokemons on the home page and stores it in the cache
  - `/pokemons` page uses the cached data if it finishes. Else it continues the fetch
  */
  React.useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: pokemonsQueryKey,
      queryFn: getPokemons,
      staleTime: Infinity,
    });
  }, [queryClient]);

  const navigate = useNavigate();

  return (
    <main className="container grid justify-center gap-y-16 pb-12 pt-[61px] font-sans md:gap-y-[100px] md:pb-24 md:pt-[122px]">
      <div className="grid justify-items-center gap-y-1 text-center md:gap-y-2.5">
        <img
          className="w-[min(100%,_382.51px)] object-contain max-md:aspect-video md:h-[248.25px] md:w-[382.51px] md:object-cover"
          src={'/assets/images/logo.webp'}
          alt="Pokebook logo"
        />
        <h1 className="font-decorative">
          Poké <span className="text-accent">book</span>
        </h1>
        <p className="max-w-[370px] text-lg">
          Largest Pokémon index with information about every Pokemon you can
          think of.
        </p>
      </div>
      <div className="grid justify-items-center gap-y-6">
        <form
          className="grid h-[60px] w-[min(calc(100%_-_8px),_536px)] grid-cols-[1fr_auto] rounded-full border pr-2 ring-8 ring-accent md:h-[64px] md:w-[536px]"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const searchValue = formData.get('search') as string;
            navigate(
              searchValue.trim() === ''
                ? '/pokemons'
                : `/pokemons?s=${searchValue}`,
            );
          }}
        >
          <input
            type="search"
            name="search"
            placeholder="Enter pokemon name"
            className="w-full rounded-full bg-transparent px-2 text-lg caret-accent outline-none placeholder:text-[#7B7B7B] md:pl-4 md:text-2xl"
          />
          <Button
            type="submit"
            variant={'plain'}
            size={'icon'}
            className="size-[46px] self-center rounded-full bg-accent text-accent-foreground shadow-[0_4px_4px_0_hsl(0_0%_0%_/.15)]"
          >
            <Icons.SearchIcon />
          </Button>
        </form>
        <Link
          to={'/pokemons'}
          className="text-center text-lg font-medium text-[#0D131A] underline underline-offset-2 [text-decoration-thickness:_1px]"
        >
          View all
        </Link>
      </div>
    </main>
  );
}
