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
import { roles } from '../data/data';
import { type User } from '../data/schema';
import { DataTableBulkActions } from './data-table-bulk-actions';
import { usersColumns } from './users-columns';

type DataTableProps = {
    data: User[];
};

export function UsersTable({ data }: DataTableProps) {
    const searchParams = new URLSearchParams(window.location.search);
    const usernameParam = searchParams.get('username') || '';
    const statusParam = searchParams.get('status') ? JSON.parse(searchParams.get('status')!) : [];
    const roleParam = searchParams.get('role') ? JSON.parse(searchParams.get('role')!) : [];
    const pageParam = searchParams.get('page');
    const pageSizeParam = searchParams.get('pageSize');

    const [rowSelection, setRowSelection] = useState({});
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(() => {
        const filters: ColumnFiltersState = [];
        if (usernameParam) {
            filters.push({ id: 'username', value: usernameParam });
        }
        if (statusParam.length > 0) {
            filters.push({ id: 'status', value: statusParam });
        }
        if (roleParam.length > 0) {
            filters.push({ id: 'role', value: roleParam });
        }
        return filters;
    });
    const [pagination, setPagination] = useState({
        pageIndex: pageParam ? parseInt(pageParam) - 1 : 0,
        pageSize: pageSizeParam ? parseInt(pageSizeParam) : 10,
    });

    const handleColumnFiltersChange = (updater: ColumnFiltersState | ((old: ColumnFiltersState) => ColumnFiltersState)) => {
        const newFilters = typeof updater === 'function' ? updater(columnFilters) : updater;
        setColumnFilters(newFilters);

        const params = new URLSearchParams(window.location.search);

        params.delete('username');
        params.delete('status');
        params.delete('role');
        // params.delete('page');

        // Add new filter params
        newFilters.forEach((filter) => {
            if (filter.id === 'username' && typeof filter.value === 'string' && filter.value) {
                params.set('username', filter.value);
            } else if (Array.isArray(filter.value) && filter.value.length > 0) {
                params.set(filter.id, JSON.stringify(filter.value));
            }
        });

        const queryString = params.toString();
        const url = queryString ? `/users?${queryString}` : '/users';

        window.history.replaceState({}, '', url);

        router.reload({
            only: ['users'],
        });
    };

    const handlePaginationChange = (updater: typeof pagination | ((old: typeof pagination) => typeof pagination)) => {
        const newPagination = typeof updater === 'function' ? updater(pagination) : updater;
        setPagination(newPagination);

        const params = new URLSearchParams(window.location.search);

        // Update pagination params
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
        const url = queryString ? `/users?${queryString}` : '/users';

        window.history.replaceState({}, '', url);

        router.reload({
            only: ['users'],
        });
    };

    const columns = useMemo(() => usersColumns, []);
    // eslint-disable-next-line react-hooks/incompatible-library
    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
            columnFilters,
            pagination,
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onColumnVisibilityChange: setColumnVisibility,
        onColumnFiltersChange: handleColumnFiltersChange,
        onPaginationChange: handlePaginationChange,
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
                searchPlaceholder="Filter users..."
                searchKey="username"
                filters={[
                    {
                        columnId: 'status',
                        title: 'Status',
                        options: [
                            { label: 'Active', value: 'active' },
                            { label: 'Inactive', value: 'inactive' },
                            { label: 'Invited', value: 'invited' },
                            { label: 'Suspended', value: 'suspended' },
                        ],
                    },
                    {
                        columnId: 'role',
                        title: 'Role',
                        options: roles.map((role) => ({ ...role })),
                    },
                ]}
            />
            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="group/row">
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            colSpan={header.colSpan}
                                            className={cn(
                                                'bg-background group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
                                                header.column.columnDef.meta?.className,
                                                header.column.columnDef.meta?.thClassName,
                                            )}
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
                                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'} className="group/row">
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className={cn(
                                                'bg-background group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
                                                cell.column.columnDef.meta?.className,
                                                cell.column.columnDef.meta?.tdClassName,
                                            )}
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
