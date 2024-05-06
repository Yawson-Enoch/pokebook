import * as React from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DotsHorizontalIcon,
} from '@radix-ui/react-icons';
import ReactPaginate from 'react-paginate';

import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const items = Array.from({ length: 500 }, (_, i) => i + 1);
const perPageValues = [8, 12, 16, 24];

export default function Pagination() {
  return <PaginationButtons />;
}

function PaginationButtons() {
  const [pageOffset, setPageOffset] = React.useState(0);
  /* number of posts to display per page __ limit */
  const [postsPerPage, setPostsPerPage] = React.useState(
    String(perPageValues.at(0)),
  );
  const [page, setPage] = React.useState(1);

  const initialPage = page - 1;
  const numPostsPerPage = Number(postsPerPage);

  const endOffset = pageOffset + numPostsPerPage;
  const currentPosts = items.slice(pageOffset, endOffset);
  const pageCount = Math.ceil(items.length / numPostsPerPage);

  console.log(currentPosts);

  const handlePageClick = async ({ selected }: { selected: number }) => {
    if (pageCount > 1) {
      const newOffset = (selected * numPostsPerPage) % items.length;

      setPage(selected + 1);
      setPageOffset(newOffset);
    }
  };

  return (
    <div className="flex flex-wrap gap-x-4 gap-y-6 max-md:justify-center md:items-center md:justify-between">
      <ReactPaginate
        key={initialPage}
        initialPage={initialPage}
        pageCount={pageCount}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        renderOnZeroPageCount={null}
        onPageChange={handlePageClick}
        containerClassName={cn(
          'flex w-fit flex-wrap items-center gap-0.5 font-medium text-foreground md:gap-2 md:text-lg',
          pageCount <= 1 && 'hidden',
        )}
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

      {/* select posts per page */}
      <Select
        value={postsPerPage}
        onValueChange={(value) => {
          setPage(1);
          setPageOffset(0);
          setPostsPerPage(value);
        }}
      >
        <SelectTrigger className="w-[85px]">
          <SelectValue placeholder="Select a fruit" />
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
  );
}
