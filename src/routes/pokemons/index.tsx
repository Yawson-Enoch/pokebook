import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import AccentSwitcher from './accent-switcher';
import PokemonsList from './pokemons-list';
import Search from './search';

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
        <div className="container flex h-full items-center justify-between gap-x-5 md:gap-x-8">
          {/* logo */}
          <Link to={'/'} className="flex items-center gap-x-3">
            <img
              className="relative h-[84px] w-[129.43px] object-contain md:top-3 md:object-cover"
              src={'/assets/images/logo.webp'}
              alt="Pokebook logo"
            />
            <h1 className="font-decorative text-2xl max-lg:hidden">
              Poke<span className="text-accent">book</span>
            </h1>
          </Link>
          <Search />
          <AccentSwitcher />
        </div>
      </header>
      <PokemonsList />
    </div>
  );
}
