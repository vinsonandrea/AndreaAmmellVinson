<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('repair_tickets', function (Blueprint $table) {
            $table->id('ticket_id');
            $table->string('subscriber_account');
            $table->string('cabinet_code');
            $table->unsignedBigInteger('team_id');
            $table->text('reported_issue'); // HTML tags stripped via business logic/mutator
            $table->string('ticket_status')->default('Open');

            // Foreign Key Constraints
            $table->foreign('subscriber_account')->references('subscriber_account')->on('subscribers')->onDelete('cascade');
            $table->foreign('cabinet_code')->references('cabinet_code')->on('fiber_cabinets')->onDelete('cascade');
            $table->foreign('team_id')->references('team_id')->on('technician_teams')->onDelete('cascade');
            
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('repair_tickets');
    }
};