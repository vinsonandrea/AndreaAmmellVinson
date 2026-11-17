import { RecordDetail } from '@/components/record-detail';
import { Link } from '@inertiajs/react';

type TechnicianTeam = {
    team_id: number;
    technician_team: string;
    repair_tickets: { ticket_id: number; ticket_status: string }[];
};

export default function TechnicianTeamShow({ team }: { team: TechnicianTeam }) {
    return (
        <RecordDetail
            title={`Technician Team ${team.team_id}`}
            listTitle="Technician Teams"
            listHref="/technician-teams"
            editHref={`/technician-teams/${team.team_id}/edit`}
            fields={[
                { label: 'Team ID', value: team.team_id },
                { label: 'Team name', value: team.technician_team },
                {
                    label: 'Assigned repair tickets',
                    value:
                        team.repair_tickets.length > 0
                            ? team.repair_tickets.map((ticket) => (
                                  <span key={ticket.ticket_id} className="mr-3 inline-block">
                                      <Link className="text-primary underline" href={`/repair-tickets/${ticket.ticket_id}`}>
                                          #{ticket.ticket_id}
                                      </Link>{' '}
                                      ({ticket.ticket_status})
                                  </span>
                              ))
                            : 'No assigned repair tickets',
                },
            ]}
        />
    );
}
