import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { Eye, Pencil, Plus, Trash2 } from 'lucide-react';

type Cabinet = { cabinet_code: string; fault_location: string };

export default function FiberCabinets({ cabinets }: { cabinets: Cabinet[] }) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Fiber Cabinets', href: '/fiber-cabinets' }]}>
            <Head title="Fiber Cabinets" />
            <div className="space-y-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">Fiber Cabinets</h1>
                        <p className="text-muted-foreground">Manage fiber cabinet locations.</p>
                    </div>
                    <Button asChild>
                        <Link href="/fiber-cabinets/create">
                            <Plus /> Add cabinet
                        </Link>
                    </Button>
                </div>
                <div className="overflow-hidden rounded-xl border">
                    <table className="w-full text-sm">
                        <thead className="bg-muted/50 border-b">
                            <tr>
                                <th className="p-3 text-left">Cabinet code</th>
                                <th className="p-3 text-left">Fault location</th>
                                <th className="p-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cabinets.map((cabinet) => (
                                <tr key={cabinet.cabinet_code} className="border-b last:border-0">
                                    <td className="p-3 font-medium">{cabinet.cabinet_code}</td>
                                    <td className="p-3">{cabinet.fault_location}</td>
                                    <td className="p-3">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="outline" size="sm" asChild>
                                                <Link href={`/fiber-cabinets/${cabinet.cabinet_code}`}>
                                                    <Eye /> View
                                                </Link>
                                            </Button>
                                            <Button variant="outline" size="sm" asChild>
                                                <Link href={`/fiber-cabinets/${cabinet.cabinet_code}/edit`}>
                                                    <Pencil /> Edit
                                                </Link>
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() =>
                                                    confirm('Delete this cabinet?') && router.delete(`/fiber-cabinets/${cabinet.cabinet_code}`)
                                                }
                                            >
                                                <Trash2 /> Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {cabinets.length === 0 && (
                                <tr>
                                    <td colSpan={3} className="text-muted-foreground p-8 text-center">
                                        No fiber cabinets found.
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
