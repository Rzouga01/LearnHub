<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>New Trainer Application</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #0BC5EA 0%, #40a9ff 100%); color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
        .section { background: #f9f9f9; padding: 15px; margin: 10px 0; border-radius: 5px; }
        .label { font-weight: bold; color: #0BC5EA; }
        .files { background: #e8f4fd; padding: 10px; border-radius: 5px; margin-top: 10px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>🎓 New Trainer Application Received</h2>
            <p>A new trainer application has been submitted for review.</p>
        </div>

        <div class="section">
            <h3>👤 Personal Information</h3>
            <p><span class="label">Name:</span> {{ $data['firstName'] }} {{ $data['lastName'] }}</p>
            <p><span class="label">Email:</span> {{ $data['email'] }}</p>
            <p><span class="label">Phone:</span> {{ $data['phone'] }}</p>
            <p><span class="label">Current Position:</span> {{ $data['currentPosition'] }}</p>
            @if(isset($data['company']) && $data['company'])
                <p><span class="label">Company:</span> {{ $data['company'] }}</p>
            @endif
        </div>

        <div class="section">
            <h3>💼 Professional Background</h3>
            <p><span class="label">Primary Expertise:</span> {{ $data['primaryExpertise'] }}</p>
            <p><span class="label">Years of Experience:</span> {{ $data['yearsExperience'] }}</p>
            @if(isset($data['secondaryExpertise']) && count($data['secondaryExpertise']) > 0)
                <p><span class="label">Secondary Areas:</span> {{ implode(', ', $data['secondaryExpertise']) }}</p>
            @endif
            <p><span class="label">Professional Bio:</span></p>
            <p style="background: white; padding: 10px; border-radius: 3px;">{{ $data['professionalBio'] }}</p>
        </div>

        <div class="section">
            <h3>📚 Teaching Experience</h3>
            <p><span class="label">Teaching Experience:</span> {{ $data['teachingExperience'] }}</p>
            <p><span class="label">Preferred Format:</span> {{ $data['preferredFormat'] }}</p>
            <p><span class="label">Courses They Want to Teach:</span></p>
            <p style="background: white; padding: 10px; border-radius: 3px;">{{ $data['coursesWantToTeach'] }}</p>
            <p><span class="label">Why They Want to Teach:</span></p>
            <p style="background: white; padding: 10px; border-radius: 3px;">{{ $data['whyTeach'] }}</p>
        </div>

        @if(isset($data['resume']) || isset($data['certifications']) || isset($data['portfolios']))
        <div class="section">
            <h3>📎 Uploaded Documents</h3>
            <div class="files">
                @if(isset($data['resume']))
                    <p>✅ <strong>Resume/CV:</strong> Uploaded</p>
                @endif
                @if(isset($data['certifications']))
                    <p>✅ <strong>Certifications:</strong> {{ count($data['certifications']) }} file(s) uploaded</p>
                @endif
                @if(isset($data['portfolios']))
                    <p>✅ <strong>Portfolio/Samples:</strong> {{ count($data['portfolios']) }} file(s) uploaded</p>
                @endif
                <p><em>📁 Files are stored in the application storage and can be accessed through the admin panel.</em></p>
            </div>
        </div>
        @endif

        <div style="background: #0BC5EA; color: white; padding: 20px; border-radius: 8px; text-align: center; margin-top: 20px;">
            <h3>🚀 Next Steps</h3>
            <p>1. Review the application details above</p>
            <p>2. Check the uploaded documents in storage</p>
            <p>3. Schedule an interview if interested</p>
            <p>4. Send acceptance/rejection email to applicant</p>
        </div>

        <div style="text-align: center; margin-top: 20px; padding: 20px; background: #f0f0f0; border-radius: 5px;">
            <p style="margin: 0; color: #666;">
                <strong>LearnHub Training Platform</strong><br>
                This application was submitted on {{ date('F j, Y \a\t g:i A') }}
            </p>
        </div>
    </div>
</body>
</html>
