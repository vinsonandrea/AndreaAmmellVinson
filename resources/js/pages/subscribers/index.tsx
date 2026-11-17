import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { Eye, Pencil, Plus, Trash2 } from 'lucide-react';

type Subscriber = { subscriber_account: string; subscriber_name: string };

export default function Subscribers({ subscribers }: { subscribers: Subscriber[] }) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Subscribers', href: '/subscribers' }]}>
            <Head title="Subscribers" />
            <div className="space-y-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">Subscribers</h1>
                        <p className="text-muted-foreground">Manage customers and account numbers.</p>
                    </div>
                    <Button asChild>
                        <Link href="/subscribers/create">
                            <Plus /> Add subscriber
                        </Link>
                    </Button>
                </div>
                <div className="overflow-hidden rounded-xl border">
                    <table className="w-full text-sm">
                        <thead className="bg-muted/50 border-b">
                            <tr>
                                <th className="p-3 text-left">Account number</th>
                                <th className="p-3 text-left">Customer name</th>
                                <th className="p-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subscribers.map((subscriber) => (
                                <tr key={subscriber.subscriber_account} className="border-b last:border-0">
                                    <td className="p-3 font-mono font-medium">{subscriber.subscriber_account}</td>
                                    <td className="p-3">{subscriber.subscriber_name}</td>
                                    <td className="p-3">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="outline" size="sm" asChild>
                                                <Link href={`/subscribers/${encodeURIComponent(subscriber.subscriber_account)}`}>
                                                    <Eye /> View
                                                </Link>
                                            </Button>
                                            <Button variant="outline" size="sm" asChild>
                                                <Link href={`/subscribers/${encodeURIComponent(subscriber.subscriber_account)}/edit`}>
                                                    <Pencil /> Edit
                                                </Link>
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() =>
                                                    confirm('Delete this subscriber?') &&
                                                    router.delete(`/subscribers/${encodeURIComponent(subscriber.subscriber_account)}`)
                                                }
                                            >
                                                <Trash2 /> Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {subscribers.length === 0 && (
                                <tr>
                                    <td colSpan={3} className="text-muted-foreground p-8 text-center">
                                        No subscribers found.
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
