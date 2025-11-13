import { router } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import LoadingBar, { type LoadingBarRef } from 'react-top-loading-bar';

export function NavigationProgress() {
    const ref = useRef<LoadingBarRef>(null);

    useEffect(() => {
        const startHandler = () => ref.current?.continuousStart();
        const finishHandler = () => ref.current?.complete();

        router.on('start', startHandler);
        router.on('finish', finishHandler);

        return () => {
            router.off('start', startHandler);
            router.off('finish', finishHandler);
        };
    }, []);

    return <LoadingBar color="var(--muted-foreground)" ref={ref} shadow={true} height={2} />;
}
