import { AuthenticatedLayout } from '@/components/layout/authenticated-layout';
import { Tasks as TasksFeature } from '@/features/tasks';

TasksPage.layout = (page: React.ReactNode) => <AuthenticatedLayout>{page}</AuthenticatedLayout>;

export default function TasksPage() {
    return <TasksFeature />;
}
