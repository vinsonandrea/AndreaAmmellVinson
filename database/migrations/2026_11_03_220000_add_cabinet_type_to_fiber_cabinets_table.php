<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasColumn('fiber_cabinets', 'cabinet_type')) {
            Schema::table('fiber_cabinets', function (Blueprint $table) {
                $table->string('cabinet_type')->nullable()->after('cabinet_code');
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasColumn('fiber_cabinets', 'cabinet_type')) {
            Schema::table('fiber_cabinets', function (Blueprint $table) {
                $table->dropColumn('cabinet_type');
            });
        }
    }
};
