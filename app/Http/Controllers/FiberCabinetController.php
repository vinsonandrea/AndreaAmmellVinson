<?php

namespace App\Http\Controllers;

use App\Models\FiberCabinet;
use App\Http\Requests\FiberCabinetRequest;
use App\Services\FiberCabinetService;
use Inertia\Inertia;

class FiberCabinetController extends Controller
{
    public function __construct(private FiberCabinetService $service)
    {
    }

    public function index()
    {
        return Inertia::render('fiber-cabinets/index', ['cabinets' => $this->service->getRecords()]);
    }

    public function create()
    {
        return Inertia::render('fiber-cabinets/form', $this->formOptions());
    }

    public function store(FiberCabinetRequest $request)
    {
        $this->service->create($request->validated());

        return to_route('fiber-cabinets.index')->with('success', 'Fiber cabinet created.');
    }

    /**
     * Display the specified resource.
     */
    public function show(FiberCabinet $fiberCabinet)
    {
        return Inertia::render('fiber-cabinets/show', [
            'cabinet' => $this->service->find($fiberCabinet->cabinet_code),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(FiberCabinet $fiberCabinet)
    {
        return Inertia::render('fiber-cabinets/form', [
            ...$this->formOptions(),
            'cabinet' => $this->service->find($fiberCabinet->cabinet_code),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(FiberCabinetRequest $request, FiberCabinet $fiberCabinet)
    {
        $this->service->update($fiberCabinet, $request->validated());

        return to_route('fiber-cabinets.index')->with('success', 'Fiber cabinet updated.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(FiberCabinet $fiberCabinet)
    {
        $this->service->delete($fiberCabinet);

        return back()->with('success', 'Fiber cabinet deleted.');
    }

    private function formOptions(): array
    {
        return [
            'cabinetPrefixes' => ['FC-MNL-', 'FC-CEB-', 'FC-DVO-', 'FC-CAG-', 'FC-ILO-', 'FC-BGC-'],
            'faultLocations' => [
                'Main Distribution Frame',
                'Street Fiber Terminal',
                'Fiber Distribution Point',
                'Pole-mounted Cabinet',
                'Underground Vault',
                'Building Entry Point',
                'Customer Premises',
            ],
            'cabinetTypes' => [
                'Fiber Distribution Cabinet (FDC) / Primary Hub',
                'Optical Cross-Connect (OCC) Cabinet',
                'Fiber Access Terminal (FAT)',
                'Multi-Service Terminal (MST)',
                'Outdoor Cabinet / Pedestal',
                'Outdoor Street Cabinet',
                'Indoor Cabinet / IDF',
                'Indoor Main Distribution Frame / MDF',
                'Aerial / Pole-Mounted Cabinet',
            ],
        ];
    }
}
