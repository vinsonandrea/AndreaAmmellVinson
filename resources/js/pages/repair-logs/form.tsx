import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { type FormEvent } from 'react';

type RepairLog = {
    log_id: number;
    ticket_id: number;
    repair_start: string | null;
    repair_end: string | null;
    labor_hours: number;
    splice_count: number;
    notes: string | null;
};

type Ticket = {
    ticket_id: number;
    subscriber_account: string | null;
    cabinet_code: string | null;
    reported_issue: string;
    ticket_status: string;
    subscriber?: { subscriber_name: string } | null;
    fiber_cabinet?: { fault_location: string } | null;
};

function datePart(value: string | null): string {
    return value?.replace(' ', 'T').slice(0, 10) ?? '';
}

function timePart(value: string | null): string {
    return value?.replace(' ', 'T').slice(11, 16) ?? '';
}

function dateTimeValue(date: string, time: string): string {
    return date ? `${date} ${time || '00:00'}:00` : '';
}

export default function RepairLogForm({ log, tickets }: { log?: RepairLog; tickets: Ticket[] }) {
    const { data, setData, post, put, transform, processing, errors } = useForm({
        ticket_id: log?.ticket_id ?? '',
        repair_start: log?.repair_start ?? '',
        repair_end: log?.repair_end ?? '',
        labor_hours: log ? String(log.labor_hours) : '',
        splice_count: log ? String(log.splice_count) : '',
        notes: log?.notes ?? '',
    });

    function submit(event: FormEvent) {
        event.preventDefault();
        transform((data) => ({
            ...data,
            repair_start: data.repair_start || null,
            repair_end: data.repair_end || null,
            labor_hours: data.labor_hours === '' ? 0 : Number(data.labor_hours),
            splice_count: data.splice_count === '' ? 0 : Number(data.splice_count),
        }));

        log ? put(`/repair-logs/${log.log_id}`) : post('/repair-logs');
    }

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Repair Logs', href: '/repair-logs' },
                { title: log ? 'Edit' : 'Create', href: '#' },
            ]}
        >
            <Head title={log ? 'Edit repair log' : 'Create repair log'} />
            <form onSubmit={submit} className="mx-auto max-w-xl space-y-5 rounded-xl border p-6">
                <h1 className="text-2xl font-semibold">{log ? 'Edit repair log' : 'Create repair log'}</h1>
                <p className="text-muted-foreground text-sm">
                    A repair log records the time and work details for a repair ticket. Select the ticket this work belongs to.
                </p>
                <div className="space-y-2">
                    <Label htmlFor="ticket_id">Repair ticket</Label>
                    <select
                        id="ticket_id"
                        value={data.ticket_id}
                        onChange={(event) => setData('ticket_id', event.target.value ? Number(event.target.value) : '')}
                        className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                    >
                        <option value="">Select a repair ticket</option>
                        {tickets.map((ticket) => (
                            <option key={ticket.ticket_id} value={ticket.ticket_id}>
                                #{ticket.ticket_id} - {ticket.subscriber?.subscriber_name ?? ticket.subscriber_account ?? 'Unknown subscriber'} -{' '}
                                {ticket.cabinet_code ?? 'No cabinet'} - {ticket.ticket_status} - {ticket.reported_issue}
                            </option>
                        ))}
                    </select>
                    <p className="text-destructive text-sm">{errors.ticket_id}</p>
                </div>
                <div className="space-y-2">
                    <Label>Repair start</Label>
                    <Label htmlFor="repair_start_date" className="text-muted-foreground text-xs">
                        Date
                    </Label>
                    <Input
                        id="repair_start_date"
                        type="date"
                        value={datePart(data.repair_start)}
                        onChange={(event) => setData('repair_start', dateTimeValue(event.target.value, timePart(data.repair_start)))}
                    />
                    <Label htmlFor="repair_start_time" className="text-muted-foreground text-xs">
                        Time
                    </Label>
                    <Input
                        id="repair_start_time"
                        type="time"
                        value={timePart(data.repair_start)}
                        onChange={(event) => setData('repair_start', dateTimeValue(datePart(data.repair_start), event.target.value))}
                        disabled={!datePart(data.repair_start)}
                    />
                    <p className="text-destructive text-sm">{errors.repair_start}</p>
                </div>
                <div className="space-y-2">
                    <Label>Repair end</Label>
                    <Label htmlFor="repair_end_date" className="text-muted-foreground text-xs">
                        Date
                    </Label>
                    <Input
                        id="repair_end_date"
                        type="date"
                        value={datePart(data.repair_end)}
                        min={datePart(data.repair_start) || undefined}
                        onChange={(event) => setData('repair_end', dateTimeValue(event.target.value, timePart(data.repair_end)))}
                    />
                    <Label htmlFor="repair_end_time" className="text-muted-foreground text-xs">
                        Time
                    </Label>
                    <Input
                        id="repair_end_time"
                        type="time"
                        value={timePart(data.repair_end)}
                        min={
                            datePart(data.repair_start) && datePart(data.repair_end) === datePart(data.repair_start)
                                ? timePart(data.repair_start) || undefined
                                : undefined
                        }
                        onChange={(event) => setData('repair_end', dateTimeValue(datePart(data.repair_end), event.target.value))}
                        disabled={!datePart(data.repair_end)}
                    />
                    <p className="text-destructive text-sm">{errors.repair_end}</p>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="labor_hours">Labor hours</Label>
                    <Input
                        id="labor_hours"
                        type="number"
                        min="0"
                        step="0.01"
                        value={data.labor_hours}
                        onChange={(event) => setData('labor_hours', event.target.value)}
                    />
                    <p className="text-muted-foreground text-xs">Type a value or use the up/down arrows. Leave blank to save 0.</p>
                    <p className="text-destructive text-sm">{errors.labor_hours}</p>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="splice_count">Splice count</Label>
                    <Input
                        id="splice_count"
                        type="number"
                        min="0"
                        step="1"
                        value={data.splice_count}
                        onChange={(event) => setData('splice_count', event.target.value)}
                    />
                    <p className="text-muted-foreground text-xs">Type a value or use the up/down arrows. Leave blank to save 0.</p>
                    <p className="text-destructive text-sm">{errors.splice_count}</p>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="notes">Notes / characteristics</Label>
                    <textarea
                        id="notes"
                        value={data.notes}
                        onChange={(event) => setData('notes', event.target.value)}
                        maxLength={10000}
                        rows={4}
                        placeholder="Enter any repair details or characteristics"
                        className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                    />
                    <p className="text-destructive text-sm">{errors.notes}</p>
                </div>
                <div className="flex gap-2">
                    <Button disabled={processing}>{log ? 'Update repair log' : 'Create repair log'}</Button>
                    <Button variant="outline" type="button" asChild>
                        <Link href="/repair-logs">Cancel</Link>
                    </Button>
                </div>
            </form>
        </AppLayout>
    );
}
