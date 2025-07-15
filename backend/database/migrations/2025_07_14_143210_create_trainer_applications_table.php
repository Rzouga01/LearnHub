<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('trainer_applications', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email')->unique();
            $table->string('phone');
            $table->string('current_position');
            $table->string('company')->nullable();
            $table->string('primary_expertise');
            $table->string('years_experience');
            $table->json('secondary_expertise')->nullable();
            $table->text('professional_bio');
            $table->string('teaching_experience');
            $table->string('preferred_format');
            $table->text('courses_want_to_teach');
            $table->text('why_teach');
            $table->string('resume_path')->nullable();
            $table->json('certifications_paths')->nullable();
            $table->json('portfolio_paths')->nullable();
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->text('admin_notes')->nullable();
            $table->timestamp('reviewed_at')->nullable();
            $table->foreignId('reviewed_by')->nullable()->constrained('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trainer_applications');
    }
};
