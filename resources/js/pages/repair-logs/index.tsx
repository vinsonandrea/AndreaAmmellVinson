import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { Eye, Pencil, Plus, Trash2 } from 'lucide-react';

type RepairLog = {
    log_id: number;
    ticket_id: number;
    repair_start: string | null;
    repair_end: string | null;
    labor_hours: number;
    splice_count: number;
    notes: string | null;
};

export default function RepairLogs({ logs }: { logs: RepairLog[] }) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Repair Logs', href: '/repair-logs' }]}>
            <Head title="Repair Logs" />
            <div className="space-y-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">Repair Logs</h1>
                        <p className="text-muted-foreground">Record work completed for repair tickets.</p>
                    </div>
                    <Button asChild>
                        <Link href="/repair-logs/create">
                            <Plus /> Add repair log
                        </Link>
                    </Button>
                </div>
                <div className="overflow-x-auto rounded-xl border">
                    <table className="w-full text-sm">
                        <thead className="bg-muted/50 border-b">
                            <tr>
                                <th className="p-3 text-left">Log</th>
                                <th className="p-3 text-left">Ticket</th>
                                <th className="p-3 text-left">Started</th>
                                <th className="p-3 text-left">Completed</th>
                                <th className="p-3 text-left">Labor hours</th>
                                <th className="p-3 text-left">Splices</th>
                                <th className="p-3 text-left">Notes / characteristics</th>
                                <th className="p-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.map((log) => (
                                <tr key={log.log_id} className="border-b last:border-0">
                                    <td className="p-3 font-medium">#{log.log_id}</td>
                                    <td className="p-3">#{log.ticket_id}</td>
                                    <td className="p-3">{log.repair_start ?? '-'}</td>
                                    <td className="p-3">{log.repair_end ?? '-'}</td>
                                    <td className="p-3">{log.labor_hours}</td>
                                    <td className="p-3">{log.splice_count}</td>
                                    <td className="max-w-xs p-3 whitespace-pre-wrap">{log.notes || '-'}</td>
                                    <td className="p-3">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="outline" size="sm" asChild>
                                                <Link href={`/repair-logs/${log.log_id}`}>
                                                    <Eye /> View
                                                </Link>
                                            </Button>
                                            <Button variant="outline" size="sm" asChild>
                                                <Link href={`/repair-logs/${log.log_id}/edit`}>
                                                    <Pencil /> Edit
                                                </Link>
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => confirm('Delete this repair log?') && router.delete(`/repair-logs/${log.log_id}`)}
                                            >
                                                <Trash2 /> Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {logs.length === 0 && (
                                <tr>
                                    <td colSpan={8} className="text-muted-foreground p-8 text-center">
                                        No repair logs found.
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
