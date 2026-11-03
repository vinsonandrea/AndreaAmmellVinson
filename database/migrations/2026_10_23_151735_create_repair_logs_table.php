<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('repair_logs', function (Blueprint $table) {
            $table->id('log_id');
            $table->unsignedBigInteger('ticket_id');
            $table->dateTime('repair_start')->nullable();
            $table->dateTime('repair_end')->nullable(); // Completion timestamp
            $table->integer('splice_count')->default(0);
            $table->decimal('repair_cost', 10, 2)->default(0.00); // Calculated based on labor & splices

            // Foreign Key Constraint
            $table->foreign('ticket_id')->references('ticket_id')->on('repair_tickets')->onDelete('cascade');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('repair_logs');
    }
};