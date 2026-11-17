<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        if (Schema::hasColumn('repair_tickets', 'subscriber_account')) {
            return;
        }

        Schema::table('repair_tickets', function (Blueprint $table) {
            $table->string('subscriber_account')->nullable();
            $table->foreign('subscriber_account')
                ->references('subscriber_account')
                ->on('subscribers')
                ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        if (! Schema::hasColumn('repair_tickets', 'subscriber_account')) {
            return;
        }

        Schema::table('repair_tickets', function (Blueprint $table) {
            $table->dropForeign(['subscriber_account']);
            $table->dropColumn('subscriber_account');
        });
    }
};