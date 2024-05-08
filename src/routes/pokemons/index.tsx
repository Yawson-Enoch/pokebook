import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import { Icons } from '@/components/common/icons';

import AccentSwitcher from './accent-switcher';
import PokemonsList from './pokemons-list';

export default function Pokemons() {
  return (
    <div className="grid min-h-dvh grid-rows-[80px_1fr] gap-y-16">
      <Helmet>
        <title>Pokemons | Pokebook</title>
      </Helmet>
      <header
        className="bg-cover bg-fixed bg-center bg-no-repeat shadow-[0_14px_24px_0_hsl(0_0%_0%_/_.05)]"
        style={{
          backgroundImage: `linear-gradient(hsl(0 0% 100% / .97), hsl(0 0% 100% / .97)), url('/assets/images/noise.webp')`,
        }}
      >
        <div className="container flex h-full items-center justify-between gap-x-8">
          {/* logo */}
          <Link to={'/'} className="flex items-center gap-x-3">
            <img
              className="relative h-[84px] w-[129.43px] object-contain md:top-3 md:object-cover"
              src={'/assets/images/logo.webp'}
              alt="Pokebook logo"
            />
            <h1 className="leading-[29.52px]] font-decorative text-2xl max-lg:hidden">
              Poke<span className="text-accent">book</span>
            </h1>
          </Link>
          {/* search box */}
          <div className="grid h-[40px] w-[min(100%,_440px)] grid-cols-[auto_1fr] rounded-full border pl-2 shadow-[0_4px_0_0_hsl(0_0%_0%_/.05)] md:h-[48px] md:pl-6">
            <div className="flex items-center justify-center self-center text-[#DFDFDF]">
              <Icons.SearchIcon className="size-[17.49px]" />
            </div>
            <input
              type="text"
              placeholder="Enter pokemon name"
              className="w-full rounded-full bg-transparent px-2 font-sans leading-[24.3px] caret-accent outline-none placeholder:text-[#7B7B7B] md:px-3 md:text-lg"
            />
          </div>
          <AccentSwitcher />
        </div>
      </header>
      <PokemonsList />
    </div>
  );
}
