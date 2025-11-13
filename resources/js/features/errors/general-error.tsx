import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { router } from '@inertiajs/react';

type GeneralErrorProps = React.HTMLAttributes<HTMLDivElement> & {
    minimal?: boolean;
};

export function GeneralError({ className, minimal = false }: GeneralErrorProps) {
    return (
        <div className={cn('h-svh w-full', className)}>
            <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
                {!minimal && <h1 className="text-[7rem] leading-tight font-bold">500</h1>}
                <span className="font-medium">Oops! Something went wrong {`:')`}</span>
                <p className="text-center text-muted-foreground">
                    We apologize for the inconvenience. <br /> Please try again later.
                </p>
                {!minimal && (
                    <div className="mt-6 flex gap-4">
                        <Button variant="outline" onClick={() => window.history.back()}>
                            Go Back
                        </Button>
                        <Button onClick={() => router.visit('/')}>Back to Home</Button>
                    </div>
                )}
            </div>
        </div>
    );
}
