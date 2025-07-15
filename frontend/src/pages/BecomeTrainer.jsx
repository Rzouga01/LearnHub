import React, { useState } from 'react';
import {
    Card,
    Form,
    Input,
    Button,
    Typography,
    Upload,
    Select,
    Row,
    Col,
    Steps,
    message,
    Alert,
    Tag,
    Space,
    Checkbox,
    Rate
} from 'antd';
import {
    UserOutlined,
    MailOutlined,
    BookOutlined,
    UploadOutlined,
    CheckCircleOutlined,
    FileTextOutlined,
    StarOutlined,
    TrophyOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;

const BecomeTrainer = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const steps = [
        {
            title: 'Personal Info',
            icon: <UserOutlined />,
            description: 'Basic information about you'
        },
        {
            title: 'Expertise',
            icon: <BookOutlined />,
            description: 'Your skills and experience'
        },
        {
            title: 'Portfolio',
            icon: <FileTextOutlined />,
            description: 'Showcase your work'
        },
        {
            title: 'Review',
            icon: <CheckCircleOutlined />,
            description: 'Final review and submit'
        }
    ];

    const handleNext = () => {
        form.validateFields().then(() => {
            setCurrentStep(currentStep + 1);
        }).catch(() => {
            message.error('Please fill in all required fields');
        });
    };

    const handlePrevious = () => {
        setCurrentStep(currentStep - 1);
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            message.success('Application submitted successfully! We will review and get back to you within 48 hours.');
            setCurrentStep(currentStep + 1);
        } catch (error) {
            message.error('Failed to submit application. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const renderPersonalInfo = () => (
        <Card className="bg-white dark:bg-warm-900 border-warm-200 dark:border-warm-700">
            <Title level={4} className="text-charcoal-500 dark:text-cream-100 mb-6">
                <UserOutlined className="text-terracotta-500 mr-3" />
                Personal Information
            </Title>

            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12}>
                    <Form.Item
                        name="firstName"
                        label={<span className="text-charcoal-500 dark:text-cream-100 font-medium">First Name</span>}
                        rules={[{ required: true, message: 'Please enter your first name' }]}
                    >
                        <Input
                            placeholder="Enter your first name"
                            className="h-10 bg-cream-50 dark:bg-warm-800 border-warm-200 dark:border-warm-600"
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item
                        name="lastName"
                        label={<span className="text-charcoal-500 dark:text-cream-100 font-medium">Last Name</span>}
                        rules={[{ required: true, message: 'Please enter your last name' }]}
                    >
                        <Input
                            placeholder="Enter your last name"
                            className="h-10 bg-cream-50 dark:bg-warm-800 border-warm-200 dark:border-warm-600"
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12}>
                    <Form.Item
                        name="email"
                        label={<span className="text-charcoal-500 dark:text-cream-100 font-medium">Email Address</span>}
                        rules={[
                            { required: true, message: 'Please enter your email' },
                            { type: 'email', message: 'Please enter a valid email' }
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined className="text-sage-500" />}
                            placeholder="Enter your email"
                            className="h-10 bg-cream-50 dark:bg-warm-800 border-warm-200 dark:border-warm-600"
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item
                        name="phone"
                        label={<span className="text-charcoal-500 dark:text-cream-100 font-medium">Phone Number</span>}
                        rules={[{ required: true, message: 'Please enter your phone number' }]}
                    >
                        <Input
                            placeholder="Enter your phone number"
                            className="h-10 bg-cream-50 dark:bg-warm-800 border-warm-200 dark:border-warm-600"
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12}>
                    <Form.Item
                        name="location"
                        label={<span className="text-charcoal-500 dark:text-cream-100 font-medium">Location</span>}
                        rules={[{ required: true, message: 'Please enter your location' }]}
                    >
                        <Input
                            placeholder="City, Country"
                            className="h-10 bg-cream-50 dark:bg-warm-800 border-warm-200 dark:border-warm-600"
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item
                        name="timezone"
                        label={<span className="text-charcoal-500 dark:text-cream-100 font-medium">Timezone</span>}
                        rules={[{ required: true, message: 'Please select your timezone' }]}
                    >
                        <Select placeholder="Select your timezone" className="h-10">
                            <Option value="UTC">UTC</Option>
                            <Option value="EST">Eastern Time (EST)</Option>
                            <Option value="PST">Pacific Time (PST)</Option>
                            <Option value="CET">Central European Time (CET)</Option>
                            <Option value="JST">Japan Standard Time (JST)</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item
                name="bio"
                label={<span className="text-charcoal-500 dark:text-cream-100 font-medium">Professional Bio</span>}
                rules={[{ required: true, message: 'Please enter your bio' }]}
            >
                <TextArea
                    rows={4}
                    placeholder="Tell us about your professional background and experience..."
                    className="bg-cream-50 dark:bg-warm-800 border-warm-200 dark:border-warm-600"
                />
            </Form.Item>
        </Card>
    );

    const renderExpertise = () => (
        <Card className="bg-white dark:bg-warm-900 border-warm-200 dark:border-warm-700">
            <Title level={4} className="text-charcoal-500 dark:text-cream-100 mb-6">
                <BookOutlined className="text-sage-500 mr-3" />
                Your Expertise
            </Title>

            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12}>
                    <Form.Item
                        name="primarySkill"
                        label={<span className="text-charcoal-500 dark:text-cream-100 font-medium">Primary Skill</span>}
                        rules={[{ required: true, message: 'Please select your primary skill' }]}
                    >
                        <Select placeholder="Select your main area of expertise" className="h-10">
                            <Option value="web-development">Web Development</Option>
                            <Option value="mobile-development">Mobile Development</Option>
                            <Option value="data-science">Data Science</Option>
                            <Option value="ai-ml">AI & Machine Learning</Option>
                            <Option value="design">UI/UX Design</Option>
                            <Option value="devops">DevOps & Cloud</Option>
                            <Option value="blockchain">Blockchain</Option>
                            <Option value="cybersecurity">Cybersecurity</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item
                        name="experienceLevel"
                        label={<span className="text-charcoal-500 dark:text-cream-100 font-medium">Experience Level</span>}
                        rules={[{ required: true, message: 'Please select your experience level' }]}
                    >
                        <Select placeholder="Select your experience level" className="h-10">
                            <Option value="intermediate">Intermediate (3-5 years)</Option>
                            <Option value="advanced">Advanced (5-10 years)</Option>
                            <Option value="expert">Expert (10+ years)</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item
                name="skills"
                label={<span className="text-charcoal-500 dark:text-cream-100 font-medium">Skills & Technologies</span>}
                rules={[{ required: true, message: 'Please list your skills' }]}
            >
                <Select
                    mode="tags"
                    placeholder="Type and press Enter to add skills (e.g., React, Python, AWS)"
                    className="min-h-10"
                />
            </Form.Item>

            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12}>
                    <Form.Item
                        name="currentJob"
                        label={<span className="text-charcoal-500 dark:text-cream-100 font-medium">Current Job Title</span>}
                        rules={[{ required: true, message: 'Please enter your current job title' }]}
                    >
                        <Input
                            placeholder="e.g., Senior Software Engineer"
                            className="h-10 bg-cream-50 dark:bg-warm-800 border-warm-200 dark:border-warm-600"
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item
                        name="company"
                        label={<span className="text-charcoal-500 dark:text-cream-100 font-medium">Company</span>}
                        rules={[{ required: true, message: 'Please enter your company name' }]}
                    >
                        <Input
                            placeholder="e.g., TechCorp Inc."
                            className="h-10 bg-cream-50 dark:bg-warm-800 border-warm-200 dark:border-warm-600"
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item
                name="teachingExperience"
                label={<span className="text-charcoal-500 dark:text-cream-100 font-medium">Teaching Experience</span>}
            >
                <TextArea
                    rows={3}
                    placeholder="Describe any previous teaching, mentoring, or training experience..."
                    className="bg-cream-50 dark:bg-warm-800 border-warm-200 dark:border-warm-600"
                />
            </Form.Item>

            <Form.Item
                name="motivation"
                label={<span className="text-charcoal-500 dark:text-cream-100 font-medium">Why do you want to teach?</span>}
                rules={[{ required: true, message: 'Please tell us your motivation' }]}
            >
                <TextArea
                    rows={3}
                    placeholder="What motivates you to share your knowledge with others?"
                    className="bg-cream-50 dark:bg-warm-800 border-warm-200 dark:border-warm-600"
                />
            </Form.Item>
        </Card>
    );

    const renderPortfolio = () => (
        <Card className="bg-white dark:bg-warm-900 border-warm-200 dark:border-warm-700">
            <Title level={4} className="text-charcoal-500 dark:text-cream-100 mb-6">
                <FileTextOutlined className="text-mustard-500 mr-3" />
                Portfolio & Documents
            </Title>

            <div className="space-y-6">
                <Form.Item
                    name="resume"
                    label={<span className="text-charcoal-500 dark:text-cream-100 font-medium">Resume/CV</span>}
                    rules={[{ required: true, message: 'Please upload your resume' }]}
                >
                    <Upload
                        accept=".pdf,.doc,.docx"
                        maxCount={1}
                        className="upload-area"
                    >
                        <Button
                            icon={<UploadOutlined />}
                            className="h-12 bg-cream-50 dark:bg-warm-800 border-warm-200 dark:border-warm-600 text-sage-500 hover:text-sage-600"
                        >
                            Upload Resume (PDF, DOC, DOCX)
                        </Button>
                    </Upload>
                </Form.Item>

                <Form.Item
                    name="portfolio"
                    label={<span className="text-charcoal-500 dark:text-cream-100 font-medium">Portfolio URL</span>}
                >
                    <Input
                        placeholder="https://your-portfolio.com"
                        className="h-10 bg-cream-50 dark:bg-warm-800 border-warm-200 dark:border-warm-600"
                    />
                </Form.Item>

                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12}>
                        <Form.Item
                            name="linkedin"
                            label={<span className="text-charcoal-500 dark:text-cream-100 font-medium">LinkedIn Profile</span>}
                        >
                            <Input
                                placeholder="https://linkedin.com/in/yourprofile"
                                className="h-10 bg-cream-50 dark:bg-warm-800 border-warm-200 dark:border-warm-600"
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Form.Item
                            name="github"
                            label={<span className="text-charcoal-500 dark:text-cream-100 font-medium">GitHub Profile</span>}
                        >
                            <Input
                                placeholder="https://github.com/yourusername"
                                className="h-10 bg-cream-50 dark:bg-warm-800 border-warm-200 dark:border-warm-600"
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item
                    name="sampleCourse"
                    label={<span className="text-charcoal-500 dark:text-cream-100 font-medium">Sample Course Idea</span>}
                    rules={[{ required: true, message: 'Please describe a course you would like to teach' }]}
                >
                    <TextArea
                        rows={4}
                        placeholder="Describe a course you would like to create, including topics, target audience, and learning objectives..."
                        className="bg-cream-50 dark:bg-warm-800 border-warm-200 dark:border-warm-600"
                    />
                </Form.Item>

                <Form.Item
                    name="certifications"
                    label={<span className="text-charcoal-500 dark:text-cream-100 font-medium">Certifications</span>}
                >
                    <Upload
                        accept=".pdf,.jpg,.png"
                        multiple
                        className="upload-area"
                    >
                        <Button
                            icon={<UploadOutlined />}
                            className="h-12 bg-cream-50 dark:bg-warm-800 border-warm-200 dark:border-warm-600 text-sage-500 hover:text-sage-600"
                        >
                            Upload Certifications (Optional)
                        </Button>
                    </Upload>
                </Form.Item>
            </div>
        </Card>
    );

    const renderReview = () => (
        <div className="space-y-6">
            <Card className="bg-white dark:bg-warm-900 border-warm-200 dark:border-warm-700">
                <Title level={4} className="text-charcoal-500 dark:text-cream-100 mb-6">
                    <CheckCircleOutlined className="text-olive-500 mr-3" />
                    Review Your Application
                </Title>

                <Alert
                    message="Application Summary"
                    description="Please review your information before submitting. You can go back to edit any section if needed."
                    type="info"
                    className="mb-6 bg-sage-50 dark:bg-sage-900 border-sage-200 dark:border-sage-700"
                    showIcon
                />

                <div className="space-y-4">
                    <div className="bg-cream-50 dark:bg-warm-800 p-4 rounded-lg">
                        <Title level={5} className="text-charcoal-500 dark:text-cream-100 mb-2">
                            Personal Information
                        </Title>
                        <Text className="text-warm-600 dark:text-warm-300">
                            All personal details have been filled out and verified.
                        </Text>
                    </div>

                    <div className="bg-cream-50 dark:bg-warm-800 p-4 rounded-lg">
                        <Title level={5} className="text-charcoal-500 dark:text-cream-100 mb-2">
                            Expertise & Experience
                        </Title>
                        <Text className="text-warm-600 dark:text-warm-300">
                            Your skills and professional background have been documented.
                        </Text>
                    </div>

                    <div className="bg-cream-50 dark:bg-warm-800 p-4 rounded-lg">
                        <Title level={5} className="text-charcoal-500 dark:text-cream-100 mb-2">
                            Portfolio & Documents
                        </Title>
                        <Text className="text-warm-600 dark:text-warm-300">
                            Your portfolio and supporting documents have been uploaded.
                        </Text>
                    </div>
                </div>
            </Card>

            <Card className="bg-white dark:bg-warm-900 border-warm-200 dark:border-warm-700">
                <Title level={4} className="text-charcoal-500 dark:text-cream-100 mb-4">
                    Next Steps
                </Title>

                <div className="space-y-4">
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-terracotta-100 dark:bg-terracotta-900 rounded-full flex items-center justify-center text-terracotta-500 font-bold">
                            1
                        </div>
                        <div>
                            <Text className="text-charcoal-500 dark:text-cream-100 font-medium block">
                                Application Review
                            </Text>
                            <Text className="text-warm-500 dark:text-warm-300 text-sm">
                                Our team will review your application within 48 hours
                            </Text>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-sage-100 dark:bg-sage-900 rounded-full flex items-center justify-center text-sage-500 font-bold">
                            2
                        </div>
                        <div>
                            <Text className="text-charcoal-500 dark:text-cream-100 font-medium block">
                                Interview Process
                            </Text>
                            <Text className="text-warm-500 dark:text-warm-300 text-sm">
                                If selected, we'll schedule a video interview to discuss your expertise
                            </Text>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-mustard-100 dark:bg-mustard-900 rounded-full flex items-center justify-center text-mustard-500 font-bold">
                            3
                        </div>
                        <div>
                            <Text className="text-charcoal-500 dark:text-cream-100 font-medium block">
                                Onboarding
                            </Text>
                            <Text className="text-warm-500 dark:text-warm-300 text-sm">
                                Welcome to the team! We'll help you create your first course
                            </Text>
                        </div>
                    </div>
                </div>
            </Card>

            <Card className="bg-white dark:bg-warm-900 border-warm-200 dark:border-warm-700">
                <Form.Item
                    name="terms"
                    valuePropName="checked"
                    rules={[
                        {
                            validator: (_, value) =>
                                value ? Promise.resolve() : Promise.reject(new Error('Please accept the terms and conditions')),
                        },
                    ]}
                >
                    <Checkbox className="text-charcoal-500 dark:text-cream-100">
                        I agree to the{' '}
                        <a href="/terms" className="text-sage-500 hover:text-sage-600">
                            Terms of Service
                        </a>
                        {' '}and{' '}
                        <a href="/privacy" className="text-sage-500 hover:text-sage-600">
                            Privacy Policy
                        </a>
                    </Checkbox>
                </Form.Item>
            </Card>
        </div>
    );

    const renderSuccess = () => (
        <Card className="bg-white dark:bg-warm-900 border-warm-200 dark:border-warm-700 text-center">
            <div className="py-12">
                <div className="text-8xl mb-6">🎉</div>
                <Title level={2} className="text-olive-500 mb-4">
                    Application Submitted Successfully!
                </Title>
                <Paragraph className="text-warm-600 dark:text-warm-300 text-lg mb-6">
                    Thank you for applying to become a trainer at LearnHub.
                    We have received your application and will review it within 48 hours.
                </Paragraph>
                <div className="bg-cream-50 dark:bg-warm-800 p-6 rounded-lg mb-6">
                    <Title level={4} className="text-charcoal-500 dark:text-cream-100 mb-4">
                        What happens next?
                    </Title>
                    <div className="space-y-3 text-left">
                        <div className="flex items-center gap-3">
                            <CheckCircleOutlined className="text-olive-500" />
                            <Text className="text-warm-600 dark:text-warm-300">
                                You'll receive a confirmation email within 24 hours
                            </Text>
                        </div>
                        <div className="flex items-center gap-3">
                            <CheckCircleOutlined className="text-olive-500" />
                            <Text className="text-warm-600 dark:text-warm-300">
                                Our team will review your application and portfolio
                            </Text>
                        </div>
                        <div className="flex items-center gap-3">
                            <CheckCircleOutlined className="text-olive-500" />
                            <Text className="text-warm-600 dark:text-warm-300">
                                If selected, we'll schedule an interview within a week
                            </Text>
                        </div>
                    </div>
                </div>
                <Space>
                    <Button
                        type="primary"
                        className="bg-terracotta-500 hover:bg-terracotta-600 border-terracotta-500"
                        onClick={() => window.location.href = '/dashboard'}
                    >
                        Go to Dashboard
                    </Button>
                    <Button
                        className="text-sage-500 border-sage-500 hover:bg-sage-50 dark:hover:bg-sage-900"
                        onClick={() => window.location.href = '/courses'}
                    >
                        Browse Courses
                    </Button>
                </Space>
            </div>
        </Card>
    );

    const renderStepContent = () => {
        switch (currentStep) {
            case 0:
                return renderPersonalInfo();
            case 1:
                return renderExpertise();
            case 2:
                return renderPortfolio();
            case 3:
                return renderReview();
            case 4:
                return renderSuccess();
            default:
                return renderPersonalInfo();
        }
    };

    return (
        <div className="min-h-screen bg-cream-100 dark:bg-charcoal-500 p-6 transition-colors duration-300">
            <div className="max-w-4xl mx-auto space-y-6">

                {/* Header */}
                <Card className="bg-gradient-to-r from-terracotta-500 to-sage-500 border-0 text-white text-center">
                    <div className="py-8">
                        <div className="text-6xl mb-4">🎓</div>
                        <Title level={1} className="text-white mb-4">
                            Become a Trainer
                        </Title>
                        <Text className="text-white/90 text-lg">
                            Share your expertise with thousands of eager learners worldwide
                        </Text>
                    </div>
                </Card>

                {/* Steps */}
                {currentStep < 4 && (
                    <Card className="bg-white dark:bg-warm-900 border-warm-200 dark:border-warm-700">
                        <Steps
                            current={currentStep}
                            className="mb-8"
                            items={steps.map(step => ({
                                title: step.title,
                                description: step.description,
                                icon: step.icon
                            }))}
                        />
                    </Card>
                )}

                {/* Form Content */}
                <Form
                    form={form}
                    layout="vertical"
                    className="space-y-6"
                >
                    {renderStepContent()}
                </Form>

                {/* Navigation */}
                {currentStep < 4 && (
                    <Card className="bg-white dark:bg-warm-900 border-warm-200 dark:border-warm-700">
                        <div className="flex justify-between">
                            <Button
                                size="large"
                                disabled={currentStep === 0}
                                onClick={handlePrevious}
                                className="text-warm-500 border-warm-300 hover:border-warm-400"
                            >
                                Previous
                            </Button>

                            {currentStep < 3 ? (
                                <Button
                                    type="primary"
                                    size="large"
                                    onClick={handleNext}
                                    className="bg-terracotta-500 hover:bg-terracotta-600 border-terracotta-500"
                                >
                                    Next Step
                                </Button>
                            ) : (
                                <Button
                                    type="primary"
                                    size="large"
                                    loading={loading}
                                    onClick={handleSubmit}
                                    className="bg-olive-500 hover:bg-olive-600 border-olive-500"
                                >
                                    Submit Application
                                </Button>
                            )}
                        </div>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default BecomeTrainer;
