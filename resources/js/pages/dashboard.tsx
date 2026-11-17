import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ClipboardList, Network, Ticket, Users, UsersRound } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({
    counts,
}: {
    counts: {
        fiberCabinets: number;
        repairTickets: number;
        repairLogs: number;
        subscribers: number;
        technicianTeams: number;
    };
}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-5 rounded-xl p-4">
                <div>
                    <h1 className="text-2xl font-semibold">Fiber Network Operations</h1>
                    <p className="text-muted-foreground mt-1">Manage fiber assets, repair work, and related records from one dashboard.</p>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                    <Link href="/fiber-cabinets" className="bg-card hover:bg-accent rounded-xl border p-6 transition-colors">
                        <div className="flex items-center justify-between">
                            <Network className="text-primary size-8" />
                            <span className="text-3xl font-bold">{counts.fiberCabinets}</span>
                        </div>
                        <h2 className="mt-4 text-lg font-semibold">Fiber Cabinets</h2>
                        <p className="text-muted-foreground mt-1 text-sm">View, add, edit, and remove cabinet records.</p>
                    </Link>
                    <Link href="/repair-tickets" className="bg-card hover:bg-accent rounded-xl border p-6 transition-colors">
                        <div className="flex items-center justify-between">
                            <Ticket className="text-primary size-8" />
                            <span className="text-3xl font-bold">{counts.repairTickets}</span>
                        </div>
                        <h2 className="mt-4 text-lg font-semibold">Repair Tickets</h2>
                        <p className="text-muted-foreground mt-1 text-sm">Track and manage fiber repair requests.</p>
                    </Link>
                </div>
                <section aria-labelledby="related-records-heading">
                    <h2 id="related-records-heading" className="mb-3 text-lg font-semibold">
                        Related records
                    </h2>
                    <div className="grid gap-3 sm:grid-cols-3">
                        <Link
                            href="/repair-logs"
                            className="bg-card hover:bg-accent flex items-center justify-between rounded-xl border p-4 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <ClipboardList className="text-muted-foreground size-5" />
                                <span className="font-medium">Repair Logs</span>
                            </div>
                            <span className="text-xl font-semibold">{counts.repairLogs}</span>
                        </Link>
                        <Link
                            href="/subscribers"
                            className="bg-card hover:bg-accent flex items-center justify-between rounded-xl border p-4 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <Users className="text-muted-foreground size-5" />
                                <span className="font-medium">Subscribers</span>
                            </div>
                            <span className="text-xl font-semibold">{counts.subscribers}</span>
                        </Link>
                        <Link
                            href="/technician-teams"
                            className="bg-card hover:bg-accent flex items-center justify-between rounded-xl border p-4 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <UsersRound className="text-muted-foreground size-5" />
                                <span className="font-medium">Technician Teams</span>
                            </div>
                            <span className="text-xl font-semibold">{counts.technicianTeams}</span>
                        </Link>
                    </div>
                </section>
            </div>
        </AppLayout>
    );
}
