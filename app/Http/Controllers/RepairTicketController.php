<?php

namespace App\Http\Controllers;

use App\Models\FiberCabinet;
use App\Models\RepairTicket;
use App\Models\Subscriber;
use App\Http\Requests\RepairTicketRequest;
use App\Services\RepairTicketService;
use Inertia\Inertia;

class RepairTicketController extends Controller
{
    public function __construct(private RepairTicketService $service)
    {
    }

    public function index()
    {
        return Inertia::render('repair-tickets/index', ['tickets' => $this->service->getRecords()]);
    }

    public function create()
    {
        return Inertia::render('repair-tickets/form', $this->formOptions());
    }

    public function store(RepairTicketRequest $request)
    {
        $this->service->create($request->validated());

        return to_route('repair-tickets.index')->with('success', 'Repair ticket created.');
    }

    /**
     * Display the specified resource.
     */
    public function show(RepairTicket $repairTicket)
    {
        return Inertia::render('repair-tickets/show', [
            'ticket' => $this->service->find($repairTicket->ticket_id),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(RepairTicket $repairTicket)
    {
        return Inertia::render('repair-tickets/form', [
            ...$this->formOptions(),
            'ticket' => $this->service->find($repairTicket->ticket_id),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(RepairTicketRequest $request, RepairTicket $repairTicket)
    {
        $this->service->update($repairTicket, $request->validated());

        return to_route('repair-tickets.index')->with('success', 'Repair ticket updated.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RepairTicket $repairTicket)
    {
        $this->service->delete($repairTicket);

        return back()->with('success', 'Repair ticket deleted.');
    }

    private function formOptions(): array
    {
        return [
            'subscribers' => Subscriber::query()->orderBy('subscriber_account')->get(['subscriber_account', 'subscriber_name']),
            'cabinets' => FiberCabinet::query()->orderBy('cabinet_code')->get(['cabinet_code', 'fault_location']),
            'issueTypes' => [
                'No Internet Connection',
                'Intermittent Connection',
                'Fiber Cable Cut',
                'Low Signal Strength',
                'Damaged Fiber Cabinet',
                'Fiber Loss / Attenuation',
                'Port or Patch Cord Failure',
                'Power Failure at Cabinet',
                'Subscriber Line Outage',
                'Other',
            ],
        ];
    }
}
