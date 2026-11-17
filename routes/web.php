<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Artisan;
use App\Http\Controllers\FiberCabinetController;
use App\Http\Controllers\RepairTicketController;
use App\Http\Controllers\RepairLogController;
use App\Http\Controllers\SubscriberController;
use App\Http\Controllers\TechnicianTeamController;
use App\Services\FiberCabinetService;
use App\Services\RepairLogService;
use App\Services\RepairTicketService;
use App\Services\SubscriberService;
use App\Services\TechnicianTeamService;

Route::get('/clear-cache', function() {
    Artisan::call('config:clear');
    Artisan::call('cache:clear');
    return 'Cache cleared successfully!';
});

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function (
        FiberCabinetService $fiberCabinetService,
        RepairTicketService $repairTicketService,
        RepairLogService $repairLogService,
        SubscriberService $subscriberService,
        TechnicianTeamService $technicianTeamService,
    ) {
        return Inertia::render('dashboard', [
            'counts' => [
                'fiberCabinets' => $fiberCabinetService->count(),
                'repairTickets' => $repairTicketService->count(),
                'repairLogs' => $repairLogService->count(),
                'subscribers' => $subscriberService->count(),
                'technicianTeams' => $technicianTeamService->count(),
            ],
        ]);
    })->name('dashboard');

    Route::resource('fiber-cabinets', FiberCabinetController::class)->parameters([
        'fiber-cabinets' => 'fiberCabinet',
    ]);
    Route::resource('repair-tickets', RepairTicketController::class);
    Route::resource('repair-logs', RepairLogController::class)->parameters([
        'repair-logs' => 'repairLog',
    ]);
    Route::resource('subscribers', SubscriberController::class);
    Route::resource('technician-teams', TechnicianTeamController::class)
        ->parameters(['technician-teams' => 'technicianTeam']);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
