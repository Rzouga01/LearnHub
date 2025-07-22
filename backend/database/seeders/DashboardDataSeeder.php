<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Training;
use App\Models\Enrollment;
use App\Models\Session;
use App\Models\Attendance;
use App\Models\TrainerApplication;
use Illuminate\Support\Facades\Hash;

class DashboardDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create sample users if they don't exist
        $trainer = User::firstOrCreate(
            ['email' => 'trainer@example.com'],
            [
                'name' => 'John Trainer',
                'password' => Hash::make('password'),
                'role' => 'trainer',
                'email_verified_at' => now(),
            ]
        );

        $coordinator = User::firstOrCreate(
            ['email' => 'coordinator@example.com'],
            [
                'name' => 'Jane Coordinator',
                'password' => Hash::make('password'),
                'role' => 'coordinator',
                'email_verified_at' => now(),
            ]
        );

        $student1 = User::firstOrCreate(
            ['email' => 'student1@example.com'],
            [
                'name' => 'Alice Student',
                'password' => Hash::make('password'),
                'role' => 'student',
                'email_verified_at' => now(),
            ]
        );

        $student2 = User::firstOrCreate(
            ['email' => 'student2@example.com'],
            [
                'name' => 'Bob Student',
                'password' => Hash::make('password'),
                'role' => 'student',
                'email_verified_at' => now(),
            ]
        );

        // Create sample trainings
        $training1 = Training::firstOrCreate(
            ['title' => 'Web Development Fundamentals'],
            [
                'description' => 'Learn the basics of web development including HTML, CSS, and JavaScript.',
                'user_id' => $trainer->id,
                'start_date' => now()->addDays(7),
                'end_date' => now()->addDays(37),
                'price' => 299.99,
                'rating' => 4.5,
                'status' => 'active',
            ]
        );

        $training2 = Training::firstOrCreate(
            ['title' => 'Advanced React Development'],
            [
                'description' => 'Master React.js with hooks, context, and advanced patterns.',
                'user_id' => $trainer->id,
                'start_date' => now()->addDays(14),
                'end_date' => now()->addDays(44),
                'price' => 399.99,
                'rating' => 4.8,
                'status' => 'active',
            ]
        );

        $training3 = Training::firstOrCreate(
            ['title' => 'Database Design and SQL'],
            [
                'description' => 'Learn database design principles and SQL querying.',
                'user_id' => $trainer->id,
                'start_date' => now()->subDays(10),
                'end_date' => now()->addDays(20),
                'price' => 249.99,
                'rating' => 4.2,
                'status' => 'active',
            ]
        );

        // Create sample enrollments
        $enrollment1 = Enrollment::firstOrCreate(
            [
                'user_id' => $student1->id,
                'training_id' => $training1->id,
            ],
            [
                'progress' => 65,
                'status' => 'active',
                'payment_status' => 'paid',
                'enrolled_at' => now()->subDays(5),
            ]
        );

        $enrollment2 = Enrollment::firstOrCreate(
            [
                'user_id' => $student1->id,
                'training_id' => $training3->id,
            ],
            [
                'progress' => 100,
                'status' => 'completed',
                'payment_status' => 'paid',
                'enrolled_at' => now()->subDays(15),
            ]
        );

        $enrollment3 = Enrollment::firstOrCreate(
            [
                'user_id' => $student2->id,
                'training_id' => $training1->id,
            ],
            [
                'progress' => 30,
                'status' => 'active',
                'payment_status' => 'paid',
                'enrolled_at' => now()->subDays(3),
            ]
        );

        $enrollment4 = Enrollment::firstOrCreate(
            [
                'user_id' => $student2->id,
                'training_id' => $training2->id,
            ],
            [
                'progress' => 15,
                'status' => 'active',
                'payment_status' => 'paid',
                'enrolled_at' => now()->subDays(1),
            ]
        );

        // Create sample sessions
        $session1 = Session::firstOrCreate(
            [
                'training_id' => $training1->id,
                'title' => 'Introduction to HTML',
            ],
            [
                'description' => 'Learn the basics of HTML structure and elements.',
                'start_time' => now()->addDays(1)->setTime(14, 0),
                'end_time' => now()->addDays(1)->setTime(16, 0),
                'location' => 'Online',
                'status' => 'scheduled',
            ]
        );

        $session2 = Session::firstOrCreate(
            [
                'training_id' => $training1->id,
                'title' => 'CSS Styling Basics',
            ],
            [
                'description' => 'Learn how to style HTML with CSS.',
                'start_time' => now()->addDays(3)->setTime(14, 0),
                'end_time' => now()->addDays(3)->setTime(16, 0),
                'location' => 'Online',
                'status' => 'scheduled',
            ]
        );

        $session3 = Session::firstOrCreate(
            [
                'training_id' => $training3->id,
                'title' => 'Database Fundamentals',
            ],
            [
                'description' => 'Introduction to database concepts.',
                'start_time' => now()->subDays(2)->setTime(10, 0),
                'end_time' => now()->subDays(2)->setTime(12, 0),
                'location' => 'Online',
                'status' => 'completed',
            ]
        );

        // Create sample attendance records
        Attendance::firstOrCreate(
            [
                'user_id' => $student1->id,
                'session_id' => $session3->id,
            ],
            [
                'status' => 'present',
                'attended_at' => now()->subDays(2)->setTime(10, 0),
            ]
        );

        Attendance::firstOrCreate(
            [
                'user_id' => $student2->id,
                'session_id' => $session3->id,
            ],
            [
                'status' => 'present',
                'attended_at' => now()->subDays(2)->setTime(10, 0),
            ]
        );

        // Create sample trainer applications
        TrainerApplication::firstOrCreate(
            ['email' => 'newtrainer@example.com'],
            [
                'name' => 'Mike NewTrainer',
                'phone' => '+1234567890',
                'expertise' => 'Machine Learning',
                'experience' => '5 years of experience in ML and AI development.',
                'motivation' => 'I want to share my knowledge and help others learn ML.',
                'status' => 'pending',
            ]
        );

        TrainerApplication::firstOrCreate(
            ['email' => 'sarah.dev@example.com'],
            [
                'name' => 'Sarah Developer',
                'phone' => '+1234567891',
                'expertise' => 'Mobile Development',
                'experience' => '3 years of iOS and Android development.',
                'motivation' => 'Passionate about mobile technologies and teaching.',
                'status' => 'pending',
            ]
        );

        $this->command->info('Dashboard sample data created successfully!');
    }
}