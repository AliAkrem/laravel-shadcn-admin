import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { type ComponentType, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthenticatedLayout } from './components/layout/authenticated-layout';
import { SettingsLayout } from './components/layout/settings-layout';
import { NavigationProgress } from './components/navigation-progress';
import { Toaster } from './components/ui/sonner';
import { DirectionProvider } from './context/direction-provider';
import { FontProvider } from './context/font-provider';
import { ThemeProvider } from './context/theme-provider';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

type PageComponent = ComponentType & {
    layout?: (page: ReactNode) => ReactNode;
};

type PageModule = {
    default: PageComponent;
};

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: async (name) => {
        const page = (await resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx'))) as PageModule;

        if (name.startsWith('authenticated/')) {
            page.default.layout = (page: React.ReactNode) => <AuthenticatedLayout>{page}</AuthenticatedLayout>;
        }

        if (name.includes('settings')) {
            page.default.layout = (page: React.ReactNode) => (
                <AuthenticatedLayout>
                    <SettingsLayout>{page}</SettingsLayout>
                </AuthenticatedLayout>
            );
        }

        return page;
    },

    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <ThemeProvider>
                <FontProvider>
                    <DirectionProvider>
                        <NavigationProgress />
                        <Toaster duration={5000} />
                        <App {...props} />
                    </DirectionProvider>
                </FontProvider>
            </ThemeProvider>,
        );
    },
    progress: {
        color: '#4B5563',
    },
});
