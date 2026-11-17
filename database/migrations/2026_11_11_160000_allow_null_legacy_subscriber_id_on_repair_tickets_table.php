<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        if (! Schema::hasColumn('repair_tickets', 'subscriber_id')) {
            return;
        }

        Schema::table('repair_tickets', function (Blueprint $table) {
            $table->integer('subscriber_id')->nullable()->change();
        });
    }

    public function down(): void
    {
        // Keep this legacy column nullable so tickets created after migration rollback remain valid.
    }
};