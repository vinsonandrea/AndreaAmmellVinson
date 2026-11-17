<?php

namespace App\Http\Controllers;

use App\Models\RepairLog;
use App\Models\RepairTicket;
use App\Http\Requests\RepairLogRequest;
use App\Services\RepairLogService;
use Inertia\Inertia;

class RepairLogController extends Controller
{
    public function __construct(private RepairLogService $service)
    {
    }

    public function index()
    {
        return Inertia::render('repair-logs/index', [
            'logs' => $this->service->getRecords(),
        ]);
    }

    public function create()
    {
        return Inertia::render('repair-logs/form', [
            'tickets' => $this->availableTickets(),
        ]);
    }

    public function store(RepairLogRequest $request)
    {
        $this->service->create($request->validated());

        return to_route('repair-logs.index')->with('success', 'Repair log created.');
    }

    public function show(RepairLog $repairLog)
    {
        return Inertia::render('repair-logs/show', [
            'log' => $this->service->find($repairLog->log_id),
        ]);
    }

    public function edit(RepairLog $repairLog)
    {
        return Inertia::render('repair-logs/form', [
            'log' => $this->service->find($repairLog->log_id),
            'tickets' => $this->availableTickets(),
        ]);
    }

    public function update(RepairLogRequest $request, RepairLog $repairLog)
    {
        $this->service->update($repairLog, $request->validated());

        return to_route('repair-logs.index')->with('success', 'Repair log updated.');
    }

    public function destroy(RepairLog $repairLog)
    {
        $this->service->delete($repairLog);

        return back()->with('success', 'Repair log deleted.');
    }

    private function availableTickets()
    {
        return RepairTicket::query()
            ->with([
                'subscriber:subscriber_account,subscriber_name',
                'fiberCabinet:cabinet_code,fault_location',
            ])
            ->orderByDesc('ticket_id')
            ->get(['ticket_id', 'subscriber_account', 'cabinet_code', 'reported_issue', 'ticket_status']);
    }
}
