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
            
            // Personal Information
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email');
            $table->string('phone');
            $table->string('current_position');
            $table->string('company')->nullable();
            
            // Professional Background
            $table->string('primary_expertise');
            $table->string('years_experience');
            $table->json('secondary_expertise')->nullable();
            $table->text('professional_bio');
            
            // Teaching Experience
            $table->string('teaching_experience');
            $table->string('preferred_format');
            $table->text('courses_want_to_teach');
            $table->text('why_teach');
            
            // Files
            $table->string('resume_path')->nullable();
            $table->json('certification_paths')->nullable();
            $table->json('portfolio_paths')->nullable();
            
            // Application Status
            $table->enum('status', ['pending', 'under_review', 'interview_scheduled', 'approved', 'rejected'])->default('pending');
            $table->text('notes')->nullable();
            $table->foreignId('reviewed_by')->nullable()->constrained('users');
            $table->timestamp('reviewed_at')->nullable();
            
            $table->timestamps();
            
            // Indexes
            $table->index(['status', 'created_at']);
            $table->index('email');
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
