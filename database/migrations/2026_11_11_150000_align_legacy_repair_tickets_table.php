<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        if (Schema::hasColumn('repair_tickets', 'id') && ! Schema::hasColumn('repair_tickets', 'ticket_id')) {
            Schema::table('repair_tickets', function (Blueprint $table) {
                $table->renameColumn('id', 'ticket_id');
            });

            Schema::table('repair_tickets', function (Blueprint $table) {
                $table->unsignedBigInteger('ticket_id', true)->change();
            });
        }

        if (Schema::hasColumn('repair_tickets', 'issue_description') && ! Schema::hasColumn('repair_tickets', 'reported_issue')) {
            Schema::table('repair_tickets', function (Blueprint $table) {
                $table->renameColumn('issue_description', 'reported_issue');
            });
        }

        if (Schema::hasColumn('repair_tickets', 'status') && ! Schema::hasColumn('repair_tickets', 'ticket_status')) {
            Schema::table('repair_tickets', function (Blueprint $table) {
                $table->renameColumn('status', 'ticket_status');
            });
        }

        if (! Schema::hasColumn('repair_tickets', 'cabinet_code')) {
            Schema::table('repair_tickets', function (Blueprint $table) {
                $table->string('cabinet_code')->nullable();
                $table->foreign('cabinet_code')->references('cabinet_code')->on('fiber_cabinets')->onDelete('cascade');
            });
        }

        if (! Schema::hasColumn('repair_tickets', 'team_id')) {
            Schema::table('repair_tickets', function (Blueprint $table) {
                $table->unsignedBigInteger('team_id')->nullable();
                $table->foreign('team_id')->references('team_id')->on('technician_teams')->onDelete('cascade');
            });
        }
    }

    public function down(): void
    {
        if (! Schema::hasColumn('repair_tickets', 'subscriber_id')) {
            return;
        }

        if (Schema::hasColumn('repair_tickets', 'cabinet_code')) {
            Schema::table('repair_tickets', function (Blueprint $table) {
                $table->dropForeign(['cabinet_code']);
                $table->dropColumn('cabinet_code');
            });
        }

        if (Schema::hasColumn('repair_tickets', 'team_id')) {
            Schema::table('repair_tickets', function (Blueprint $table) {
                $table->dropForeign(['team_id']);
                $table->dropColumn('team_id');
            });
        }

        if (Schema::hasColumn('repair_tickets', 'reported_issue')) {
            Schema::table('repair_tickets', function (Blueprint $table) {
                $table->renameColumn('reported_issue', 'issue_description');
            });
        }

        if (Schema::hasColumn('repair_tickets', 'ticket_status')) {
            Schema::table('repair_tickets', function (Blueprint $table) {
                $table->renameColumn('ticket_status', 'status');
            });
        }

        if (Schema::hasColumn('repair_tickets', 'ticket_id') && ! Schema::hasColumn('repair_tickets', 'id')) {
            Schema::table('repair_tickets', function (Blueprint $table) {
                $table->renameColumn('ticket_id', 'id');
            });

            Schema::table('repair_tickets', function (Blueprint $table) {
                $table->integer('id', true)->change();
            });
        }
    }
};