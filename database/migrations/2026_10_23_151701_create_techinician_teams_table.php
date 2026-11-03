<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('technician_teams', function (Blueprint $table) {
            $table->id('team_id');
            $table->string('technician_team');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('technician_teams');
    }
};