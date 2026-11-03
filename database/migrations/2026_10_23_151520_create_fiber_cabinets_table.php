<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('fiber_cabinets', function (Blueprint $table) {
            $table->string('cabinet_code')->primary(); // Upper-case cabinet code
            $table->string('fault_location');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('fiber_cabinets');
    }
};