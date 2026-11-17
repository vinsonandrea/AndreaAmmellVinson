import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { Eye, Pencil, Plus, Trash2 } from 'lucide-react';

type TechnicianTeam = { team_id: number; technician_team: string };

export default function TechnicianTeams({ teams }: { teams: TechnicianTeam[] }) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Technician Teams', href: '/technician-teams' }]}>
            <Head title="Technician Teams" />
            <div className="space-y-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">Technician Teams</h1>
                        <p className="text-muted-foreground">Manage the teams assigned to repair tickets.</p>
                    </div>
                    <Button asChild>
                        <Link href="/technician-teams/create">
                            <Plus /> Add team
                        </Link>
                    </Button>
                </div>
                <div className="overflow-hidden rounded-xl border">
                    <table className="w-full text-sm">
                        <thead className="bg-muted/50 border-b">
                            <tr>
                                <th className="p-3 text-left">Team name</th>
                                <th className="p-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teams.map((team) => (
                                <tr key={team.team_id} className="border-b last:border-0">
                                    <td className="p-3 font-medium">{team.technician_team}</td>
                                    <td className="p-3">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="outline" size="sm" asChild>
                                                <Link href={`/technician-teams/${team.team_id}`}>
                                                    <Eye /> View
                                                </Link>
                                            </Button>
                                            <Button variant="outline" size="sm" asChild>
                                                <Link href={`/technician-teams/${team.team_id}/edit`}>
                                                    <Pencil /> Edit
                                                </Link>
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() =>
                                                    confirm('Delete this team? This may also delete its repair tickets.') &&
                                                    router.delete(`/technician-teams/${team.team_id}`)
                                                }
                                            >
                                                <Trash2 /> Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {teams.length === 0 && (
                                <tr>
                                    <td colSpan={2} className="text-muted-foreground p-8 text-center">
                                        No technician teams found.
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
