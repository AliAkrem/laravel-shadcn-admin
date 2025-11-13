import { ConfirmDialog } from '@/components/confirm-dialog';
import { useAuthStore } from '@/stores/auth-store';
import { router } from '@inertiajs/react';

interface SignOutDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function SignOutDialog({ open, onOpenChange }: SignOutDialogProps) {
    const { auth } = useAuthStore();

    const handleSignOut = () => {
        auth.reset();
        // Preserve current location for redirect after sign-in
        const currentPath = window.location.pathname;
        router.visit('/auth/sign-in', {
            data: { redirect: currentPath },
            replace: true,
        });
    };

    return (
        <ConfirmDialog
            open={open}
            onOpenChange={onOpenChange}
            title="Sign out"
            desc="Are you sure you want to sign out? You will need to sign in again to access your account."
            confirmText="Sign out"
            destructive
            handleConfirm={handleSignOut}
            className="sm:max-w-sm"
        />
    );
}
