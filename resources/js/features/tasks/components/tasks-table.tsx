import { DataTablePagination, DataTableToolbar } from '@/components/data-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { router } from '@inertiajs/react';
import {
    type ColumnFiltersState,
    type SortingState,
    type VisibilityState,
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { priorities, statuses } from '../data/data';
import { type Task } from '../data/schema';
import { DataTableBulkActions } from './data-table-bulk-actions';
import { tasksColumns } from './tasks-columns';

type DataTableProps = {
    data: Task[];
};

export function TasksTable({ data }: DataTableProps) {
    const searchParams = new URLSearchParams(window.location.search);
    const filterParam = searchParams.get('filter') || '';
    const statusParam = searchParams.get('status') ? JSON.parse(searchParams.get('status')!) : [];
    const priorityParam = searchParams.get('priority') ? JSON.parse(searchParams.get('priority')!) : [];
    const pageParam = searchParams.get('page');
    const pageSizeParam = searchParams.get('pageSize');

    const [rowSelection, setRowSelection] = useState({});
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [globalFilter, setGlobalFilter] = useState(filterParam);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(() => {
        const filters: ColumnFiltersState = [];
        if (statusParam.length > 0) {
            filters.push({ id: 'status', value: statusParam });
        }
        if (priorityParam.length > 0) {
            filters.push({ id: 'priority', value: priorityParam });
        }
        return filters;
    });
    const [pagination, setPagination] = useState({
        pageIndex: pageParam ? parseInt(pageParam) - 1 : 0,
        pageSize: pageSizeParam ? parseInt(pageSizeParam) : 10,
    });

    const handleGlobalFilterChange = (updater: string | ((old: string) => string)) => {
        const newValue = typeof updater === 'function' ? updater(globalFilter) : updater;
        setGlobalFilter(newValue);

        const params = new URLSearchParams(window.location.search);
        if (newValue) {
            params.set('filter', newValue);
        } else {
            params.delete('filter');
        }
        params.delete('page'); // Reset to first page when search changes

        const queryString = params.toString();
        const url = queryString ? `/tasks?${queryString}` : '/tasks';

        window.history.replaceState({}, '', url);

        router.reload({
            only: ['tasks'],
        });
    };

    const handleColumnFiltersChange = (updater: ColumnFiltersState | ((old: ColumnFiltersState) => ColumnFiltersState)) => {
        const newFilters = typeof updater === 'function' ? updater(columnFilters) : updater;
        setColumnFilters(newFilters);

        const params = new URLSearchParams(window.location.search);

        params.delete('status');
        params.delete('priority');
        params.delete('page');

        newFilters.forEach((filter) => {
            if (Array.isArray(filter.value) && filter.value.length > 0) {
                params.set(filter.id, JSON.stringify(filter.value));
            }
        });

        const queryString = params.toString();
        const url = queryString ? `/tasks?${queryString}` : '/tasks';

        window.history.replaceState({}, '', url);

        router.reload({
            only: ['tasks'],
        });
    };

    const handlePaginationChange = (updater: typeof pagination | ((old: typeof pagination) => typeof pagination)) => {
        const newPagination = typeof updater === 'function' ? updater(pagination) : updater;
        setPagination(newPagination);

        const params = new URLSearchParams(window.location.search);

        const page = newPagination.pageIndex + 1;
        if (page > 1) {
            params.set('page', String(page));
        } else {
            params.delete('page');
        }

        if (newPagination.pageSize !== 10) {
            params.set('pageSize', String(newPagination.pageSize));
        } else {
            params.delete('pageSize');
        }

        const queryString = params.toString();
        const url = queryString ? `/tasks?${queryString}` : '/tasks';

        window.history.replaceState({}, '', url);

        router.reload({
            only: ['tasks'],
        });
    };

    const columns = useMemo(() => tasksColumns, []);

    // eslint-disable-next-line react-hooks/incompatible-library
    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
            columnFilters,
            globalFilter,
            pagination,
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onColumnVisibilityChange: setColumnVisibility,
        onGlobalFilterChange: handleGlobalFilterChange,
        onColumnFiltersChange: handleColumnFiltersChange,
        onPaginationChange: handlePaginationChange,
        globalFilterFn: (row, _columnId, filterValue) => {
            const id = String(row.getValue('id')).toLowerCase();
            const title = String(row.getValue('title')).toLowerCase();
            const searchValue = String(filterValue).toLowerCase();

            return id.includes(searchValue) || title.includes(searchValue);
        },
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
    });

    return (
        <div className={cn('max-sm:has-[div[role="toolbar"]]:mb-16', 'flex flex-1 flex-col gap-4')}>
            <DataTableToolbar
                table={table}
                searchPlaceholder="Filter by title or ID..."
                filters={[
                    {
                        columnId: 'status',
                        title: 'Status',
                        options: statuses,
                    },
                    {
                        columnId: 'priority',
                        title: 'Priority',
                        options: priorities,
                    },
                ]}
            />
            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            colSpan={header.colSpan}
                                            className={cn(header.column.columnDef.meta?.className, header.column.columnDef.meta?.thClassName)}
                                        >
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className={cn(cell.column.columnDef.meta?.className, cell.column.columnDef.meta?.tdClassName)}
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination table={table} className="mt-auto" />
            <DataTableBulkActions table={table} />
        </div>
    );
}
