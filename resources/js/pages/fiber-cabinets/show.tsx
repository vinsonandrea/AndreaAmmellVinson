import { RecordDetail } from '@/components/record-detail';
import { Link } from '@inertiajs/react';

type Cabinet = {
    cabinet_code: string;
    cabinet_type: string | null;
    fault_location: string;
    repair_tickets: { ticket_id: number; ticket_status: string }[];
};

export default function FiberCabinetShow({ cabinet }: { cabinet: Cabinet }) {
    return (
        <RecordDetail
            title={`Fiber Cabinet ${cabinet.cabinet_code}`}
            listTitle="Fiber Cabinets"
            listHref="/fiber-cabinets"
            editHref={`/fiber-cabinets/${cabinet.cabinet_code}/edit`}
            fields={[
                { label: 'Cabinet code', value: cabinet.cabinet_code },
                { label: 'Cabinet type', value: cabinet.cabinet_type },
                { label: 'Fault location', value: cabinet.fault_location },
                {
                    label: 'Repair tickets',
                    value:
                        cabinet.repair_tickets.length > 0
                            ? cabinet.repair_tickets.map((ticket) => (
                                  <span key={ticket.ticket_id} className="mr-3 inline-block">
                                      <Link className="text-primary underline" href={`/repair-tickets/${ticket.ticket_id}`}>
                                          #{ticket.ticket_id}
                                      </Link>{' '}
                                      ({ticket.ticket_status})
                                  </span>
                              ))
                            : 'No repair tickets',
                },
            ]}
        />
    );
}
