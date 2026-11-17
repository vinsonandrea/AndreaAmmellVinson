<?php

namespace App\Http\Controllers;

use App\Http\Requests\TechnicianTeamRequest;
use App\Models\TechnicianTeam;
use App\Services\TechnicianTeamService;
use Inertia\Inertia;

class TechnicianTeamController extends Controller
{
    public function __construct(private TechnicianTeamService $service)
    {
    }

    public function index()
    {
        return Inertia::render('technician-teams/index', [
            'teams' => $this->service->getRecords(),
        ]);
    }

    public function show(TechnicianTeam $technicianTeam)
    {
        return Inertia::render('technician-teams/show', [
            'team' => $this->service->find($technicianTeam->team_id),
        ]);
    }

    public function create()
    {
        return Inertia::render('technician-teams/form');
    }

    public function store(TechnicianTeamRequest $request)
    {
        $this->service->create($request->validated());

        return to_route('technician-teams.index')->with('success', 'Technician team created.');
    }

    public function edit(TechnicianTeam $technicianTeam)
    {
        return Inertia::render('technician-teams/form', [
            'team' => $this->service->find($technicianTeam->team_id),
        ]);
    }

    public function update(TechnicianTeamRequest $request, TechnicianTeam $technicianTeam)
    {
        $this->service->update($technicianTeam, $request->validated());

        return to_route('technician-teams.index')->with('success', 'Technician team updated.');
    }

    public function destroy(TechnicianTeam $technicianTeam)
    {
        $this->service->delete($technicianTeam);

        return back()->with('success', 'Technician team deleted.');
    }
}
