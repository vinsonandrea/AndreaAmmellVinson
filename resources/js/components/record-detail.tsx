import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { type ReactNode } from 'react';

type RecordDetailProps = {
    title: string;
    listTitle: string;
    listHref: string;
    editHref: string;
    fields: { label: string; value: ReactNode }[];
};

export function RecordDetail({ title, listTitle, listHref, editHref, fields }: RecordDetailProps) {
    return (
        <AppLayout
            breadcrumbs={[
                { title: listTitle, href: listHref },
                { title, href: '#' },
            ]}
        >
            <Head title={title} />
            <div className="mx-auto w-full max-w-4xl space-y-5 p-4">
                <div className="flex items-center justify-between gap-3">
                    <h1 className="text-2xl font-semibold">{title}</h1>
                    <div className="flex gap-2">
                        <Button variant="outline" asChild>
                            <Link href={listHref}>Back to {listTitle}</Link>
                        </Button>
                        <Button asChild>
                            <Link href={editHref}>Edit</Link>
                        </Button>
                    </div>
                </div>
                <dl className="bg-card grid gap-4 rounded-xl border p-6 sm:grid-cols-2">
                    {fields.map((field) => (
                        <div key={field.label} className="space-y-1">
                            <dt className="text-muted-foreground text-sm">{field.label}</dt>
                            <dd className="font-medium break-words">{field.value ?? '-'}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </AppLayout>
    );
}
