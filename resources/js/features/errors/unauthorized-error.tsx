import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';

export function Unauthorized() {
    return (
        <div className="h-svh">
            <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
                <h1 className="text-[7rem] leading-tight font-bold">401</h1>
                <span className="font-medium">Unauthorized Access</span>
                <p className="text-center text-muted-foreground">
                    Please log in with the appropriate credentials <br /> to access this resource.
                </p>
                <div className="mt-6 flex gap-4">
                    <Button variant="outline" onClick={() => window.history.back()}>
                        Go Back
                    </Button>
                    <Button onClick={() => router.visit('/auth/sign-in')}>Sign In</Button>
                </div>
            </div>
        </div>
    );
}
