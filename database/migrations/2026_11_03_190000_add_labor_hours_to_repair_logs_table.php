<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasColumn('repair_logs', 'labor_hours')) {
            Schema::table('repair_logs', function (Blueprint $table) {
                $table->decimal('labor_hours', 8, 2)->default(0)->after('repair_end');
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasColumn('repair_logs', 'labor_hours')) {
            Schema::table('repair_logs', function (Blueprint $table) {
                $table->dropColumn('labor_hours');
            });
        }
    }
};
