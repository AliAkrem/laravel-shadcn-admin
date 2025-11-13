import { ConfigDrawer } from '@/components/config-drawer';
import { AuthenticatedLayout } from '@/components/layout/authenticated-layout';
import { Header } from '@/components/layout/header';
import { Main } from '@/components/layout/main';
import { ProfileDropdown } from '@/components/profile-dropdown';
import { Search } from '@/components/search';
import { ThemeSwitch } from '@/components/theme-switch';
import { UsersDialogs } from '@/features/users/components/users-dialogs';
import { UsersPrimaryButtons } from '@/features/users/components/users-primary-buttons';
import { UsersProvider } from '@/features/users/components/users-provider';
import { UsersTable } from '@/features/users/components/users-table';
import { users } from '@/features/users/data/users';
import { router } from '@inertiajs/react';

UsersPage.layout = (page: React.ReactNode) => <AuthenticatedLayout>{page}</AuthenticatedLayout>;

export default function UsersPage() {
    const searchParams = new URLSearchParams(window.location.search);
    const search = Object.fromEntries(searchParams.entries());

    const navigate = (opts: {
        search: boolean | Record<string, unknown> | ((prev: Record<string, unknown>) => Record<string, unknown>);
        replace?: boolean;
    }) => {
        const newSearch = typeof opts.search === 'function' ? opts.search(search) : opts.search;

        const searchData = newSearch === true ? search : newSearch === false ? {} : newSearch;

        router.visit('/users', {
            data: searchData,
            replace: opts.replace,
            preserveState: true,
        } as any);
    };

    return (
        <UsersProvider>
            <Header fixed>
                <Search />
                <div className="ms-auto flex items-center space-x-4">
                    <ThemeSwitch />
                    <ConfigDrawer />
                    <ProfileDropdown />
                </div>
            </Header>

            <Main className="flex flex-1 flex-col gap-4 sm:gap-6">
                <div className="flex flex-wrap items-end justify-between gap-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">User List</h2>
                        <p className="text-muted-foreground">Manage your users and their roles here.</p>
                    </div>
                    <UsersPrimaryButtons />
                </div>
                <UsersTable data={users} search={search} navigate={navigate} />
            </Main>

            <UsersDialogs />
        </UsersProvider>
    );
}
