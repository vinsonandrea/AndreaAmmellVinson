import { RecordDetail } from '@/components/record-detail';
import { Link } from '@inertiajs/react';

type RepairLog = {
    log_id: number;
    ticket_id: number;
    repair_start: string | null;
    repair_end: string | null;
    labor_hours: number;
    splice_count: number;
    notes: string | null;
    repair_cost: number | string;
    repair_ticket?: {
        subscriber?: { subscriber_name: string } | null;
        fiber_cabinet?: { fault_location: string } | null;
    } | null;
};

export default function RepairLogShow({ log }: { log: RepairLog }) {
    return (
        <RecordDetail
            title={`Repair Log #${log.log_id}`}
            listTitle="Repair Logs"
            listHref="/repair-logs"
            editHref={`/repair-logs/${log.log_id}/edit`}
            fields={[
                {
                    label: 'Repair ticket',
                    value: (
                        <Link className="text-primary underline" href={`/repair-tickets/${log.ticket_id}`}>
                            #{log.ticket_id}
                        </Link>
                    ),
                },
                { label: 'Subscriber', value: log.repair_ticket?.subscriber?.subscriber_name },
                { label: 'Cabinet fault location', value: log.repair_ticket?.fiber_cabinet?.fault_location },
                { label: 'Repair start', value: log.repair_start },
                { label: 'Repair end', value: log.repair_end },
                { label: 'Labor hours', value: log.labor_hours },
                { label: 'Splice count', value: log.splice_count },
                { label: 'Repair cost', value: log.repair_cost },
                { label: 'Notes / characteristics', value: log.notes },
            ]}
        />
    );
}
