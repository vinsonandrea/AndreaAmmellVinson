import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { type FormEvent } from 'react';

type TechnicianTeam = { team_id: number; technician_team: string };

export default function TechnicianTeamForm({ team }: { team?: TechnicianTeam }) {
    const { data, setData, post, put, processing, errors } = useForm({
        technician_team: team?.technician_team ?? '',
    });

    function submit(event: FormEvent) {
        event.preventDefault();
        team ? put(`/technician-teams/${team.team_id}`) : post('/technician-teams');
    }

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Technician Teams', href: '/technician-teams' },
                { title: team ? 'Edit' : 'Create', href: '#' },
            ]}
        >
            <Head title={team ? 'Edit technician team' : 'Create technician team'} />
            <form onSubmit={submit} className="mx-auto max-w-xl space-y-5 rounded-xl border p-6">
                <h1 className="text-2xl font-semibold">{team ? 'Edit technician team' : 'Create technician team'}</h1>
                <div className="space-y-2">
                    <Label htmlFor="technician_team">Team name</Label>
                    <Input
                        id="technician_team"
                        value={data.technician_team}
                        onChange={(event) => setData('technician_team', event.target.value)}
                        placeholder="Enter technician team"
                    />
                    <p className="text-destructive text-sm">{errors.technician_team}</p>
                </div>
                <div className="flex gap-2">
                    <Button disabled={processing}>{team ? 'Update team' : 'Create team'}</Button>
                    <Button variant="outline" type="button" asChild>
                        <Link href="/technician-teams">Cancel</Link>
                    </Button>
                </div>
            </form>
        </AppLayout>
    );
}
