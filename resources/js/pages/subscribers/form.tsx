import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

type Subscriber = { subscriber_account: string; subscriber_name: string };

export default function SubscriberForm({ subscriber, generatedAccount }: { subscriber?: Subscriber; generatedAccount: string }) {
    const { data, setData, post, put, processing, errors } = useForm({
        subscriber_account: subscriber?.subscriber_account ?? generatedAccount,
        subscriber_name: subscriber?.subscriber_name ?? '',
    });

    function submit(event: FormEvent) {
        event.preventDefault();
        subscriber ? put(`/subscribers/${encodeURIComponent(subscriber.subscriber_account)}`) : post('/subscribers');
    }

    return (
        <AppLayout breadcrumbs={[{ title: 'Subscribers', href: '/subscribers' }, { title: subscriber ? 'Edit' : 'Create', href: '#' }]}>
            <Head title={subscriber ? 'Edit subscriber' : 'Create subscriber'} />
            <form onSubmit={submit} className="mx-auto max-w-xl space-y-5 rounded-xl border p-6">
                <h1 className="text-2xl font-semibold">{subscriber ? 'Edit subscriber' : 'Create subscriber'}</h1>
                <div className="space-y-2">
                    <Label htmlFor="subscriber_account">Subscriber account number</Label>
                    <Input
                        id="subscriber_account"
                        value={data.subscriber_account}
                        onChange={(event) => setData('subscriber_account', event.target.value.toUpperCase())}
                        required
                        className="font-mono"
                    />
                    <p className="text-sm text-destructive">{errors.subscriber_account}</p>
                    <p className="text-xs text-muted-foreground">
                        {subscriber
                            ? 'Changing this number also updates linked repair tickets.'
                            : 'An account number is generated for you. You can edit it or enter your own.'}
                    </p>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="subscriber_name">Customer name</Label>
                    <Input id="subscriber_name" value={data.subscriber_name} onChange={(event) => setData('subscriber_name', event.target.value)} placeholder="Type the customer name" />
                    <p className="text-sm text-destructive">{errors.subscriber_name}</p>
                </div>
                <div className="flex gap-2">
                    <Button disabled={processing}>{subscriber ? 'Update subscriber' : 'Create subscriber'}</Button>
                    <Button variant="outline" type="button" asChild><Link href="/subscribers">Cancel</Link></Button>
                </div>
            </form>
        </AppLayout>
    );
}
