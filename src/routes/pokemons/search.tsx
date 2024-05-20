import { Cross1Icon } from '@radix-ui/react-icons';

import { cn } from '@/lib/utils';
import { useFilter } from '@/hooks/use-query-state';
import { Icons } from '@/components/common/icons';

export default function Search() {
  const [filter, setFilter] = useFilter();

  return (
    <div className="group grid h-[40px] w-[min(100%,_440px)] grid-cols-[auto_1fr_auto] rounded-full border px-2 shadow-[0_4px_0_0_hsl(0_0%_0%_/.05)] md:h-[48px] md:px-6 md:pr-2">
      <div className="flex items-center justify-center self-center rounded-full text-[#DFDFDF] transition-colors duration-300 group-focus-within:text-foreground/70">
        <Icons.SearchIcon className="size-[14.87px] md:size-[17.49px]" />
      </div>
      <input
        type="text"
        placeholder="Enter pokemon name"
        className="w-full rounded-full bg-transparent px-2 font-sans caret-accent outline-none placeholder:text-[#7B7B7B] md:px-3 md:text-lg"
        value={filter.q}
        onChange={(e) => {
          setFilter({
            q: e.target.value,
            page: undefined,
            pageOffset: undefined,
          });
        }}
      />
      <button
        type="button"
        className={cn(
          'pointer-events-none invisible flex size-6 items-center justify-center self-center rounded-full bg-muted text-muted-foreground md:size-8',
          filter.q !== '' && 'pointer-events-auto visible',
        )}
        onClick={() => {
          setFilter({ q: undefined, page: undefined, pageOffset: undefined });
        }}
      >
        <Cross1Icon className="size-1/2" />
      </button>
    </div>
  );
}
