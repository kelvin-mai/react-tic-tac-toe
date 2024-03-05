import type { FC } from 'react';

import type { ServerPagination } from '@/api/types';
import {
  Pagination as UiPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui';
import { cn } from '@/lib/utils';

type ServerPaginationProps = ServerPagination & {
  onPageChange?: (i: number) => void;
};

type PagePaginationLinkProps = { page: number; onClick: (i: number) => void };

const PagePaginationLink: FC<PagePaginationLinkProps> = ({ page, onClick }) => {
  return (
    <PaginationItem>
      <PaginationLink onClick={() => onClick(page)}>{page}</PaginationLink>
    </PaginationItem>
  );
};

export const Pagination: FC<ServerPaginationProps> = ({
  page,
  pageSize,
  total,
  onPageChange,
}) => {
  const lastPage = total && pageSize ? Math.ceil(total / pageSize) : 0;
  const handlePageChange = (i: number) => {
    if (onPageChange) {
      onPageChange(i);
    }
  };
  return (
    <UiPagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={cn(page <= 1 && 'opacity-50')}
            onClick={() => {
              if (page - 1 > 0) {
                handlePageChange(page - 1);
              }
            }}
            aria-disabled={page <= 1}
          />
        </PaginationItem>
        {page !== 1 && (
          <PagePaginationLink page={1} onClick={handlePageChange} />
        )}
        {page - 2 > 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {page - 1 > 1 && (
          <PagePaginationLink page={page - 1} onClick={handlePageChange} />
        )}
        <PaginationItem>
          <PaginationLink isActive>{page}</PaginationLink>
        </PaginationItem>
        {page + 1 < lastPage && (
          <PagePaginationLink page={page + 1} onClick={handlePageChange} />
        )}
        {page + 2 < lastPage && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {page !== lastPage && (
          <PagePaginationLink page={lastPage} onClick={handlePageChange} />
        )}
        <PaginationItem>
          <PaginationNext
            className={cn(page === lastPage && 'opacity-50')}
            onClick={() => {
              if (page !== lastPage) {
                handlePageChange(page + 1);
              }
            }}
            aria-disabled={page === lastPage}
          />
        </PaginationItem>
      </PaginationContent>
    </UiPagination>
  );
};
