import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEvent, useState } from 'react';

type Cabinet = { cabinet_code: string; cabinet_type?: string; fault_location: string };

export default function FiberCabinetForm({
    cabinet,
    cabinetPrefixes = [],
    faultLocations = [],
    cabinetTypes = [],
}: {
    cabinet?: Cabinet;
    cabinetPrefixes?: string[];
    faultLocations?: string[];
    cabinetTypes?: string[];
}) {
    const { data, setData, post, put, processing, errors } = useForm({
        cabinet_code: cabinet?.cabinet_code ?? '',
        cabinet_type: cabinet?.cabinet_type ?? '',
        fault_location: cabinet?.fault_location ?? '',
    });
    const [selectedAreaPrefix, setSelectedAreaPrefix] = useState('');
    const [customAreaPrefix, setCustomAreaPrefix] = useState('');
    const [customCodeSuffix, setCustomCodeSuffix] = useState('');
    const [isCustomFaultLocation, setIsCustomFaultLocation] = useState(
        Boolean(cabinet?.fault_location && !faultLocations.includes(cabinet.fault_location)),
    );

    function submit(event: FormEvent) {
        event.preventDefault();
        cabinet ? put(`/fiber-cabinets/${cabinet.cabinet_code}`) : post('/fiber-cabinets');
    }

    return (
        <AppLayout breadcrumbs={[{ title: 'Fiber Cabinets', href: '/fiber-cabinets' }, { title: cabinet ? 'Edit' : 'Create', href: '#' }]}>
            <Head title={cabinet ? 'Edit fiber cabinet' : 'Create fiber cabinet'} />
            <form onSubmit={submit} className="mx-auto max-w-xl space-y-5 rounded-xl border p-6">
                <div><h1 className="text-2xl font-semibold">{cabinet ? 'Edit fiber cabinet' : 'Create fiber cabinet'}</h1></div>
                <div className="space-y-2">
                    <Label htmlFor="cabinet_prefix">Cabinet area prefix</Label>
                    <select
                        id="cabinet_prefix"
                        className="h-10 w-full rounded-md border bg-background px-3"
                        value={selectedAreaPrefix}
                        onChange={(e) => {
                            const prefix = e.target.value;
                            setSelectedAreaPrefix(prefix);
                            if (prefix === 'custom') {
                                setCustomCodeSuffix(data.cabinet_code.replace(/^[A-Z]+-[A-Z]+-/, ''));
                                setCustomAreaPrefix('');
                            } else if (prefix) {
                                const suffix = selectedAreaPrefix === 'custom'
                                    ? customCodeSuffix
                                    : data.cabinet_code.replace(/^[A-Z]+-[A-Z]+-/, '');
                                setData('cabinet_code', `${prefix}${suffix}`);
                            }
                        }}
                    >
                        <option value="">Choose area prefix</option>
                        {cabinetPrefixes.map((prefix) => <option key={prefix} value={prefix}>{prefix}</option>)}
                        <option value="custom">Other (type your own)</option>
                    </select>
                    {selectedAreaPrefix === 'custom' && (
                        <Input
                            id="custom_cabinet_prefix"
                            value={customAreaPrefix}
                            onChange={(e) => {
                                const prefix = e.target.value.toUpperCase();
                                setCustomAreaPrefix(prefix);
                                const formattedPrefix = prefix && !prefix.endsWith('-') ? `${prefix}-` : prefix;
                                setData('cabinet_code', `${formattedPrefix}${customCodeSuffix}`);
                            }}
                            placeholder="Type a custom area prefix"
                        />
                    )}
                </div>
                <div className="space-y-2"><Label htmlFor="cabinet_code">Cabinet code</Label><Input id="cabinet_code" placeholder="e.g. FC-MNL-001" value={data.cabinet_code} onChange={(e) => setData('cabinet_code', e.target.value.toUpperCase())} /><p className="text-sm text-destructive">{errors.cabinet_code}</p></div>
                <div className="space-y-2">
                    <Label htmlFor="cabinet_type">Cabinet type</Label>
                    <select
                        id="cabinet_type"
                        className="h-10 w-full rounded-md border bg-background px-3"
                        value={cabinetTypes.includes(data.cabinet_type) ? data.cabinet_type : ''}
                        onChange={(e) => setData('cabinet_type', e.target.value)}
                    >
                        <option value="">Choose a cabinet type</option>
                        {cabinetTypes.map((type) => <option key={type}>{type}</option>)}
                        <option value="Other">Other (type your own)</option>
                    </select>
                    {(!cabinetTypes.includes(data.cabinet_type) || data.cabinet_type === 'Other') && (
                        <Input
                            value={data.cabinet_type === 'Other' ? '' : data.cabinet_type}
                            onChange={(e) => setData('cabinet_type', e.target.value)}
                            placeholder="Type a custom cabinet type"
                        />
                    )}
                    <p className="text-sm text-destructive">{errors.cabinet_type}</p>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="fault_location">Fault location</Label>
                    <select
                        id="fault_location"
                        className="h-10 w-full rounded-md border bg-background px-3"
                        value={isCustomFaultLocation ? 'Other' : data.fault_location}
                        onChange={(e) => {
                            const location = e.target.value;
                            const isCustom = location === 'Other';
                            setIsCustomFaultLocation(isCustom);
                            setData('fault_location', isCustom ? '' : location);
                        }}
                    >
                        <option value="">Choose a location</option>
                        {faultLocations.map((location) => <option key={location}>{location}</option>)}
                        <option value="Other">Other (type your own)</option>
                    </select>
                    {isCustomFaultLocation && (
                        <Input
                            id="custom_fault_location"
                            value={data.fault_location}
                            onChange={(e) => setData('fault_location', e.target.value)}
                            placeholder="Type a custom fault location"
                        />
                    )}
                    <p className="text-sm text-destructive">{errors.fault_location}</p>
                </div>
                <div className="flex gap-2"><Button disabled={processing}>{cabinet ? 'Update cabinet' : 'Create cabinet'}</Button><Button variant="outline" type="button" asChild><Link href="/fiber-cabinets">Cancel</Link></Button></div>
            </form>
        </AppLayout>
    );
}
