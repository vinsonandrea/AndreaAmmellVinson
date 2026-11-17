import { RecordDetail } from '@/components/record-detail';
import { Link } from '@inertiajs/react';

type Ticket = {
    ticket_id: number;
    subscriber_account: string | null;
    cabinet_code: string | null;
    reported_issue: string;
    ticket_status: string;
    subscriber?: { subscriber_name: string } | null;
    fiber_cabinet?: { fault_location: string } | null;
    technician_team?: { technician_team: string } | null;
    repair_log?: { log_id: number } | null;
};

export default function RepairTicketShow({ ticket }: { ticket: Ticket }) {
    return (
        <RecordDetail
            title={`Repair Ticket #${ticket.ticket_id}`}
            listTitle="Repair Tickets"
            listHref="/repair-tickets"
            editHref={`/repair-tickets/${ticket.ticket_id}/edit`}
            fields={[
                { label: 'Ticket number', value: `#${ticket.ticket_id}` },
                {
                    label: 'Subscriber',
                    value: ticket.subscriber_account ? (
                        <Link className="text-primary underline" href={`/subscribers/${encodeURIComponent(ticket.subscriber_account)}`}>
                            {ticket.subscriber?.subscriber_name ?? ticket.subscriber_account}
                        </Link>
                    ) : null,
                },
                {
                    label: 'Fiber cabinet',
                    value: ticket.cabinet_code ? (
                        <Link className="text-primary underline" href={`/fiber-cabinets/${ticket.cabinet_code}`}>
                            {ticket.cabinet_code}
                        </Link>
                    ) : null,
                },
                { label: 'Cabinet fault location', value: ticket.fiber_cabinet?.fault_location },
                { label: 'Technician team', value: ticket.technician_team?.technician_team },
                { label: 'Status', value: ticket.ticket_status },
                { label: 'Reported issue', value: ticket.reported_issue },
                {
                    label: 'Repair log',
                    value: ticket.repair_log ? (
                        <Link className="text-primary underline" href={`/repair-logs/${ticket.repair_log.log_id}`}>
                            View repair log #{ticket.repair_log.log_id}
                        </Link>
                    ) : (
                        'No repair log'
                    ),
                },
            ]}
        />
    );
}
