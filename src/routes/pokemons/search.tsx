import * as React from 'react';
import { Cross1Icon } from '@radix-ui/react-icons';

import { cn } from '@/lib/utils';
import { useFilter } from '@/hooks/use-query-state';
import { Icons } from '@/components/common/icons';

export default function Search() {
  const [filter, setFilter] = useFilter();
  const [searchValue, setSearchValue] = React.useState(filter.s);

  /* set state in effect to allow trimming before setting filter in the url
  - doing it directly on the input event handler prevents typing as it continously trims on value change
   */
  React.useEffect(() => {
    if (searchValue.trim() === '') {
      setFilter({ s: undefined });
    } else {
      setFilter({ s: searchValue.trim() });
    }
    setFilter({ page: undefined, pageOffset: undefined });
  }, [searchValue, setFilter]);

  return (
    <div className="group grid h-[40px] w-[min(100%,_440px)] grid-cols-[auto_1fr_auto] rounded-full border px-2 shadow-[0_4px_0_0_hsl(0_0%_0%_/.05)] md:h-[48px] md:px-6 md:pr-2">
      <div className="flex items-center justify-center self-center rounded-full text-[#DFDFDF] transition-colors duration-300 group-focus-within:text-foreground/70">
        <Icons.SearchIcon className="size-[14.87px] md:size-[17.49px]" />
      </div>
      <input
        type="text"
        placeholder="Enter pokemon name"
        className="w-full rounded-full bg-transparent px-2 font-sans caret-accent outline-none placeholder:text-[#7B7B7B] md:px-3 md:text-lg"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button
        type="button"
        className={cn(
          'pointer-events-none invisible flex size-6 items-center justify-center self-center rounded-full bg-muted text-muted-foreground md:size-8',
          searchValue !== '' && 'pointer-events-auto visible',
        )}
        onClick={() => setSearchValue('')}
      >
        <Cross1Icon className="size-1/2" />
      </button>
    </div>
  );
}
