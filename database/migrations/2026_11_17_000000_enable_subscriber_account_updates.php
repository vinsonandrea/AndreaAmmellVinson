<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        $this->replaceSubscriberAccountForeignKey(cascadeOnUpdate: true);
    }

    public function down(): void
    {
        $this->replaceSubscriberAccountForeignKey(cascadeOnUpdate: false);
    }

    private function replaceSubscriberAccountForeignKey(bool $cascadeOnUpdate): void
    {
        if (! Schema::hasTable('repair_tickets') || ! Schema::hasColumn('repair_tickets', 'subscriber_account')) {
            return;
        }

        Schema::table('repair_tickets', function (Blueprint $table) {
            $table->dropForeign(['subscriber_account']);
        });

        Schema::table('repair_tickets', function (Blueprint $table) use ($cascadeOnUpdate) {
            $foreignKey = $table->foreign('subscriber_account')
                ->references('subscriber_account')
                ->on('subscribers')
                ->cascadeOnDelete();

            if ($cascadeOnUpdate) {
                $foreignKey->cascadeOnUpdate();
            }
        });
    }
};
