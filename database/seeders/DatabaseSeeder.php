<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Subscriber;
use App\Models\FiberCabinet;
use App\Models\TechnicianTeam;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        foreach ([['SUB-10001', 'Juan Dela Cruz'], ['SUB-10002', 'Maria Santos'], ['SUB-10003', 'Pedro Reyes']] as [$account, $name]) {
            Subscriber::updateOrCreate(['subscriber_account' => $account], ['subscriber_name' => $name]);
        }

        foreach ([['FC-MNL-001', 'Main Distribution Frame'], ['FC-MNL-002', 'Street Fiber Terminal'], ['FC-BGC-001', 'Building Entry Point']] as [$code, $location]) {
            FiberCabinet::updateOrCreate(['cabinet_code' => $code], ['fault_location' => $location]);
        }

        foreach (['North Fiber Team', 'Central Fiber Team', 'South Fiber Team'] as $team) {
            TechnicianTeam::updateOrCreate(['technician_team' => $team]);
        }
    }
}
