<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use App\Models\TrainerApplication;

class TrainerApplicationController extends Controller
{
    // Submit new trainer application
    public function submit(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:trainer_applications,email',
            'phone' => 'required|string|max:20',
            'currentPosition' => 'required|string|max:255',
            'company' => 'nullable|string|max:255',
            'primaryExpertise' => 'required|string',
            'yearsExperience' => 'required|string',
            'secondaryExpertise' => 'nullable|array',
            'professionalBio' => 'required|string',
            'teachingExperience' => 'required|string',
            'preferredFormat' => 'required|string',
            'coursesWantToTeach' => 'required|string',
            'whyTeach' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $data = $validator->validated();
            
            // Handle file uploads (if implemented)
            $filePaths = [];
            // File upload logic would go here
            
            // Create application record
            $application = TrainerApplication::create([
                'first_name' => $data['firstName'],
                'last_name' => $data['lastName'],
                'email' => $data['email'],
                'phone' => $data['phone'],
                'current_position' => $data['currentPosition'],
                'company' => $data['company'] ?? null,
                'primary_expertise' => $data['primaryExpertise'],
                'years_experience' => $data['yearsExperience'],
                'secondary_expertise' => $data['secondaryExpertise'] ?? null,
                'professional_bio' => $data['professionalBio'],
                'teaching_experience' => $data['teachingExperience'],
                'preferred_format' => $data['preferredFormat'],
                'courses_want_to_teach' => $data['coursesWantToTeach'],
                'why_teach' => $data['whyTeach'],
                'status' => 'pending'
            ]);

            // Send notification email to coordinators (optional)
            $this->notifyCoordinators($application);

            return response()->json([
                'success' => true,
                'message' => 'Application submitted successfully! Coordinators will review it soon.',
                'application_id' => $application->id
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to submit application. Please try again.'
            ], 500);
        }
    }

    // Get all applications for coordinators (dashboard)
    public function index(Request $request)
    {
        $status = $request->get('status', 'all');
        $query = TrainerApplication::with('reviewer')->orderBy('created_at', 'desc');
        
        if ($status !== 'all') {
            $query->where('status', $status);
        }
        
        $applications = $query->paginate(10);
        
        return response()->json([
            'success' => true,
            'applications' => $applications
        ]);
    }

    // Get single application details
    public function show($id)
    {
        $application = TrainerApplication::with('reviewer')->findOrFail($id);
        
        return response()->json([
            'success' => true,
            'application' => $application
        ]);
    }

    // Update application status
    public function updateStatus(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required|in:pending,under_review,interview_scheduled,approved,rejected',
            'notes' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $application = TrainerApplication::findOrFail($id);
        
        $application->update([
            'status' => $request->status,
            'notes' => $request->notes,
            'reviewed_by' => auth()->id(),
            'reviewed_at' => now()
        ]);

        // If approved, create trainer account
        if ($request->status === 'approved') {
            $this->createTrainerAccount($application);
        }

        return response()->json([
            'success' => true,
            'message' => 'Application status updated successfully',
            'application' => $application->fresh()
        ]);
    }

    // Private helper methods
    private function notifyCoordinators($application)
    {
        // Send email notification to coordinators
        // Implementation depends on your notification preferences
    }

    private function createTrainerAccount($application)
    {
        // Create user account with trainer role
        // This would create a User record with role='trainer'
        // and send welcome email with login credentials
    }
}
