import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

type Option = { subscriber_account?: string; subscriber_name?: string; cabinet_code?: string; fault_location?: string };
type Ticket = { ticket_id: number; subscriber_account: string; cabinet_code: string; technician_team?: { technician_team: string } | null; reported_issue: string; ticket_status: string };
const statuses = ['Open', 'Assigned', 'In Progress', 'Resolved', 'Closed'];

export default function RepairTicketForm({ ticket, subscribers = [], cabinets = [], issueTypes = [] }: { ticket?: Ticket; subscribers?: Option[]; cabinets?: Option[]; issueTypes?: string[] }) {
    const { data, setData, post, put, processing, errors } = useForm({
        subscriber_account: ticket?.subscriber_account ?? '', cabinet_code: ticket?.cabinet_code ?? '', technician_team: ticket?.technician_team?.technician_team ?? '', reported_issue: ticket?.reported_issue ?? '', ticket_status: ticket?.ticket_status ?? 'Open',
    });
    function submit(event: FormEvent) { event.preventDefault(); ticket ? put(`/repair-tickets/${ticket.ticket_id}`) : post('/repair-tickets'); }

    return (
        <AppLayout breadcrumbs={[{ title: 'Repair Tickets', href: '/repair-tickets' }, { title: ticket ? 'Edit' : 'Create', href: '#' }]}>
            <Head title={ticket ? 'Edit repair ticket' : 'Create repair ticket'} />
            <form onSubmit={submit} className="mx-auto max-w-xl space-y-5 rounded-xl border p-6">
                <h1 className="text-2xl font-semibold">{ticket ? 'Edit repair ticket' : 'Create repair ticket'}</h1>
                <div className="space-y-2"><Label htmlFor="subscriber">Subscriber</Label><select id="subscriber" className="h-10 w-full rounded-md border bg-background px-3" value={data.subscriber_account} onChange={(e) => setData('subscriber_account', e.target.value)}><option value="">Select subscriber</option>{subscribers.map((item) => <option key={item.subscriber_account} value={item.subscriber_account}>{item.subscriber_account} - {item.subscriber_name}</option>)}</select><p className="text-sm text-destructive">{errors.subscriber_account}</p></div>
                <div className="space-y-2"><Label htmlFor="cabinet">Fiber cabinet</Label><select id="cabinet" className="h-10 w-full rounded-md border bg-background px-3" value={data.cabinet_code} onChange={(e) => setData('cabinet_code', e.target.value)}><option value="">Select cabinet</option>{cabinets.map((item) => <option key={item.cabinet_code} value={item.cabinet_code}>{item.cabinet_code} - {item.fault_location}</option>)}</select><p className="text-sm text-destructive">{errors.cabinet_code}</p></div>
                <div className="space-y-2"><Label htmlFor="team">Technician team</Label><Input id="team" placeholder="Enter technician team" value={data.technician_team} onChange={(e) => setData('technician_team', e.target.value)} /><p className="text-sm text-destructive">{errors.technician_team}</p></div>
                <div className="space-y-2">
                    <Label htmlFor="issue_type">Issue type</Label>
                    <select id="issue_type" className="h-10 w-full rounded-md border bg-background px-3" defaultValue="" onChange={(e) => { if (e.target.value !== 'Other') setData('reported_issue', e.target.value); }}>
                        <option value="">Choose a common issue</option>
                        {issueTypes.map((issue) => <option key={issue}>{issue}</option>)}
                    </select>
                </div>
                <div className="space-y-2"><Label htmlFor="issue">Reported issue details</Label><Input id="issue" placeholder="Describe additional fault details" value={data.reported_issue} onChange={(e) => setData('reported_issue', e.target.value)} /><p className="text-sm text-destructive">{errors.reported_issue}</p></div>
                <div className="space-y-2"><Label htmlFor="status">Ticket status</Label><select id="status" className="h-10 w-full rounded-md border bg-background px-3" value={data.ticket_status} onChange={(e) => setData('ticket_status', e.target.value)}>{statuses.map((status) => <option key={status}>{status}</option>)}</select><p className="text-sm text-destructive">{errors.ticket_status}</p></div>
                <div className="flex gap-2"><Button disabled={processing}>{ticket ? 'Update ticket' : 'Create ticket'}</Button><Button variant="outline" type="button" asChild><Link href="/repair-tickets">Cancel</Link></Button></div>
            </form>
        </AppLayout>
    );
}
