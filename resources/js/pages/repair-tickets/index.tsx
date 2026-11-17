import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { Eye, Pencil, Plus, Trash2 } from 'lucide-react';

type Ticket = {
    ticket_id: number;
    subscriber_account: string;
    cabinet_code: string;
    reported_issue: string;
    ticket_status: string;
    technician_team?: { technician_team: string };
};

export default function RepairTickets({ tickets }: { tickets: Ticket[] }) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Repair Tickets', href: '/repair-tickets' }]}>
            <Head title="Repair Tickets" />
            <div className="space-y-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">Repair Tickets</h1>
                        <p className="text-muted-foreground">Track fiber network repairs.</p>
                    </div>
                    <Button asChild>
                        <Link href="/repair-tickets/create">
                            <Plus /> Add ticket
                        </Link>
                    </Button>
                </div>
                <div className="overflow-x-auto rounded-xl border">
                    <table className="w-full text-sm">
                        <thead className="bg-muted/50 border-b">
                            <tr>
                                <th className="p-3 text-left">Ticket</th>
                                <th className="p-3 text-left">Subscriber</th>
                                <th className="p-3 text-left">Cabinet</th>
                                <th className="p-3 text-left">Team</th>
                                <th className="p-3 text-left">Status</th>
                                <th className="p-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tickets.map((ticket) => (
                                <tr key={ticket.ticket_id} className="border-b last:border-0">
                                    <td className="p-3 font-medium">#{ticket.ticket_id}</td>
                                    <td className="p-3">{ticket.subscriber_account}</td>
                                    <td className="p-3">{ticket.cabinet_code}</td>
                                    <td className="p-3">{ticket.technician_team?.technician_team ?? '-'}</td>
                                    <td className="p-3">{ticket.ticket_status}</td>
                                    <td className="p-3">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="outline" size="sm" asChild>
                                                <Link href={`/repair-tickets/${ticket.ticket_id}`}>
                                                    <Eye /> View
                                                </Link>
                                            </Button>
                                            <Button variant="outline" size="sm" asChild>
                                                <Link href={`/repair-tickets/${ticket.ticket_id}/edit`}>
                                                    <Pencil /> Edit
                                                </Link>
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => confirm('Delete this ticket?') && router.delete(`/repair-tickets/${ticket.ticket_id}`)}
                                            >
                                                <Trash2 /> Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {tickets.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="text-muted-foreground p-8 text-center">
                                        No repair tickets found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
