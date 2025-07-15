<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Application Received - LearnHub</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #0BC5EA 0%, #40a9ff 100%); color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; text-align: center; }
        .content { background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .highlight { background: #e8f4fd; padding: 15px; border-left: 4px solid #0BC5EA; margin: 15px 0; }
        .footer { text-align: center; padding: 20px; background: #f0f0f0; border-radius: 5px; margin-top: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>🎉 Application Received Successfully!</h2>
            <p>Thank you for your interest in becoming a trainer at LearnHub</p>
        </div>

        <div class="content">
            <p>Dear <strong>{{ $data['firstName'] }}</strong>,</p>
            
            <p>Thank you for submitting your trainer application to LearnHub! We're excited about your interest in sharing your expertise in <strong>{{ $data['primaryExpertise'] }}</strong> with our learning community.</p>

            <div class="highlight">
                <h3>📋 What happens next?</h3>
                <p><strong>1. Application Review</strong> - Our team will carefully review your application and credentials</p>
                <p><strong>2. Interview Process</strong> - If selected, we'll contact you to schedule an interview</p>
                <p><strong>3. Final Decision</strong> - We'll notify you of our decision within 2-3 business days</p>
            </div>

            <p>Here's a summary of what you submitted:</p>
            <ul>
                <li><strong>Primary Expertise:</strong> {{ $data['primaryExpertise'] }}</li>
                <li><strong>Experience Level:</strong> {{ $data['yearsExperience'] }}</li>
                <li><strong>Teaching Experience:</strong> {{ $data['teachingExperience'] }}</li>
                <li><strong>Preferred Format:</strong> {{ $data['preferredFormat'] }}</li>
            </ul>

            @if(isset($data['resume']))
            <p>✅ Your resume and supporting documents have been successfully uploaded.</p>
            @endif
        </div>

        <div style="background: #52c41a; color: white; padding: 20px; border-radius: 8px; text-align: center;">
            <h3>🌟 Why LearnHub?</h3>
            <p>Join our community of expert trainers and help professionals advance their careers while building your own teaching brand!</p>
        </div>

        <div class="highlight">
            <p><strong>📞 Questions?</strong> Feel free to reach out to us at <a href="mailto:trainers@learnhub.com">trainers@learnhub.com</a></p>
        </div>

        <div class="footer">
            <p style="margin: 0; color: #666;">
                <strong>LearnHub Training Platform</strong><br>
                Building the future of professional learning<br>
                <a href="mailto:support@learnhub.com">support@learnhub.com</a>
            </p>
        </div>
    </div>
</body>
</html>
