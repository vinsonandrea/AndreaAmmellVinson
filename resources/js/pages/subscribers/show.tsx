import { RecordDetail } from '@/components/record-detail';
import { Link } from '@inertiajs/react';

type Subscriber = {
    subscriber_account: string;
    subscriber_name: string;
    repair_tickets: { ticket_id: number; ticket_status: string }[];
};

export default function SubscriberShow({ subscriber }: { subscriber: Subscriber }) {
    return (
        <RecordDetail
            title={`Subscriber ${subscriber.subscriber_account}`}
            listTitle="Subscribers"
            listHref="/subscribers"
            editHref={`/subscribers/${encodeURIComponent(subscriber.subscriber_account)}/edit`}
            fields={[
                { label: 'Account number', value: subscriber.subscriber_account },
                { label: 'Customer name', value: subscriber.subscriber_name },
                {
                    label: 'Repair tickets',
                    value:
                        subscriber.repair_tickets.length > 0
                            ? subscriber.repair_tickets.map((ticket) => (
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
