import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Card,
    Button,
    Typography,
    Row,
    Col,
    Progress,
    Tag,
    Rate,
    Avatar,
    Tabs,
    List,
    Input,
    Space,
    Divider,
    Tooltip,
    Badge
} from 'antd';
import {
    PlayCircleOutlined,
    BookOutlined,
    ClockCircleOutlined,
    UserOutlined,
    StarOutlined,
    DownloadOutlined,
    ShareAltOutlined,
    HeartOutlined,
    MessageOutlined,
    TrophyOutlined,
    CheckCircleOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { TextArea } = Input;

const CourseDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('1');
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [progress, setProgress] = useState(0);

    // Sample course data with new color scheme
    const courseData = {
        id: 1,
        title: 'Advanced React Development',
        description: 'Master advanced React patterns, hooks, context, performance optimization, and modern development practices.',
        fullDescription: 'This comprehensive course covers advanced React concepts including custom hooks, context patterns, performance optimization, testing strategies, and modern development workflows. You\'ll build real-world projects and learn industry best practices.',
        instructor: {
            name: 'Sarah Johnson',
            title: 'Senior Frontend Developer',
            company: 'Tech Corp',
            avatar: '👩‍💻',
            bio: 'Sarah has 8+ years of experience in frontend development and has worked with companies like Google and Facebook.',
            rating: 4.9,
            students: 15420,
            courses: 12
        },
        thumbnail: '⚛️',
        category: 'Web Development',
        level: 'Advanced',
        duration: '12 hours',
        lessons: 45,
        students: 2847,
        rating: 4.8,
        reviews: 542,
        price: 149,
        originalPrice: 199,
        language: 'English',
        lastUpdated: '2024-01-15',
        requirements: [
            'Solid understanding of JavaScript ES6+',
            'Basic React knowledge (components, props, state)',
            'Familiarity with modern development tools',
            'Basic understanding of HTML/CSS'
        ],
        whatYouLearn: [
            'Advanced React patterns and best practices',
            'Custom hooks and context management',
            'Performance optimization techniques',
            'Testing React applications',
            'Modern development workflows',
            'Real-world project implementation'
        ],
        curriculum: [
            {
                title: 'Introduction & Setup',
                lessons: 5,
                duration: '45 min',
                topics: ['Course Overview', 'Development Environment', 'Project Structure']
            },
            {
                title: 'Advanced Hooks',
                lessons: 8,
                duration: '2 hours',
                topics: ['Custom Hooks', 'useCallback & useMemo', 'useReducer Patterns']
            },
            {
                title: 'Context & State Management',
                lessons: 10,
                duration: '2.5 hours',
                topics: ['Context Patterns', 'State Management', 'Performance Optimization']
            },
            {
                title: 'Testing Strategies',
                lessons: 12,
                duration: '3 hours',
                topics: ['Unit Testing', 'Integration Testing', 'E2E Testing']
            },
            {
                title: 'Real-World Projects',
                lessons: 10,
                duration: '4 hours',
                topics: ['Project Planning', 'Implementation', 'Deployment']
            }
        ]
    };

    const reviews = [
        {
            id: 1,
            user: 'Alex Thompson',
            avatar: '👨‍💻',
            rating: 5,
            date: '2024-01-10',
            comment: 'Excellent course! Sarah explains complex concepts very clearly and the projects are very practical.',
            helpful: 24
        },
        {
            id: 2,
            user: 'Maria Garcia',
            avatar: '👩‍🎨',
            rating: 5,
            date: '2024-01-05',
            comment: 'The advanced hooks section was particularly valuable. Great real-world examples.',
            helpful: 18
        },
        {
            id: 3,
            user: 'David Kim',
            avatar: '👨‍🔬',
            rating: 4,
            date: '2023-12-28',
            comment: 'Very comprehensive course. The testing section could be a bit more detailed but overall great content.',
            helpful: 12
        }
    ];

    const handleEnroll = () => {
        setIsEnrolled(true);
        setProgress(0);
        // Simulate enrollment API call
    };

    return (
        <div className="min-h-screen bg-cream-100 dark:bg-charcoal-500 transition-colors duration-300">
            <div className="max-w-7xl mx-auto p-6 space-y-6">

                {/* Header Section */}
                <Card className="bg-gradient-to-r from-terracotta-500 to-sage-500 border-0 text-white">
                    <Row gutter={[32, 32]} align="middle">
                        <Col xs={24} lg={16}>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="text-6xl">{courseData.thumbnail}</div>
                                    <div>
                                        <Tag className="bg-white/20 text-white border-0 mb-2">
                                            {courseData.category}
                                        </Tag>
                                        <Title level={1} className="text-white mb-2">
                                            {courseData.title}
                                        </Title>
                                        <Text className="text-white/90 text-lg">
                                            {courseData.description}
                                        </Text>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-6 text-white/90">
                                    <div className="flex items-center gap-2">
                                        <StarOutlined />
                                        <span>{courseData.rating} ({courseData.reviews} reviews)</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <UserOutlined />
                                        <span>{courseData.students.toLocaleString()} students</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <ClockCircleOutlined />
                                        <span>{courseData.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <BookOutlined />
                                        <span>{courseData.lessons} lessons</span>
                                    </div>
                                </div>
                            </div>
                        </Col>

                        <Col xs={24} lg={8}>
                            <Card className="bg-white dark:bg-warm-900 border-warm-200 dark:border-warm-700">
                                <div className="space-y-4">
                                    <div className="text-center">
                                        <div className="flex items-center justify-center gap-2 mb-2">
                                            <Text className="text-2xl line-through text-warm-500">
                                                ${courseData.originalPrice}
                                            </Text>
                                            <Title level={2} className="text-terracotta-500 mb-0">
                                                ${courseData.price}
                                            </Title>
                                        </div>
                                        <Text className="text-olive-500 font-medium">
                                            25% OFF - Limited Time
                                        </Text>
                                    </div>

                                    {isEnrolled ? (
                                        <div className="space-y-3">
                                            <div className="text-center">
                                                <CheckCircleOutlined className="text-olive-500 text-2xl mb-2" />
                                                <Text className="text-olive-500 font-medium block">
                                                    You're enrolled!
                                                </Text>
                                            </div>
                                            <Progress
                                                percent={progress}
                                                strokeColor="#E76F51"
                                                trailColor="#F1EFED"
                                            />
                                            <Button
                                                type="primary"
                                                block
                                                size="large"
                                                icon={<PlayCircleOutlined />}
                                                className="bg-terracotta-500 hover:bg-terracotta-600 border-terracotta-500"
                                            >
                                                Continue Learning
                                            </Button>
                                        </div>
                                    ) : (
                                        <Button
                                            type="primary"
                                            block
                                            size="large"
                                            icon={<BookOutlined />}
                                            className="bg-terracotta-500 hover:bg-terracotta-600 border-terracotta-500"
                                            onClick={handleEnroll}
                                        >
                                            Enroll Now
                                        </Button>
                                    )}

                                    <div className="flex gap-2">
                                        <Button
                                            block
                                            icon={<HeartOutlined />}
                                            className="text-sage-500 border-sage-500 hover:bg-sage-50 dark:hover:bg-sage-900"
                                        >
                                            Wishlist
                                        </Button>
                                        <Button
                                            block
                                            icon={<ShareAltOutlined />}
                                            className="text-mustard-500 border-mustard-500 hover:bg-mustard-50 dark:hover:bg-mustard-900"
                                        >
                                            Share
                                        </Button>
                                    </div>

                                    <Divider className="border-warm-200 dark:border-warm-700" />

                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <Text className="text-warm-500 dark:text-warm-300">Language:</Text>
                                            <Text className="text-charcoal-500 dark:text-cream-100">{courseData.language}</Text>
                                        </div>
                                        <div className="flex justify-between">
                                            <Text className="text-warm-500 dark:text-warm-300">Level:</Text>
                                            <Tag className="bg-rust-100 dark:bg-rust-900 text-rust-700 dark:text-rust-300 border-0">
                                                {courseData.level}
                                            </Tag>
                                        </div>
                                        <div className="flex justify-between">
                                            <Text className="text-warm-500 dark:text-warm-300">Last Updated:</Text>
                                            <Text className="text-charcoal-500 dark:text-cream-100">{courseData.lastUpdated}</Text>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </Card>

                {/* Course Content */}
                <Row gutter={[24, 24]}>
                    <Col xs={24} lg={16}>
                        <Card className="bg-white dark:bg-warm-900 border-warm-200 dark:border-warm-700">
                            <Tabs defaultActiveKey="1" className="custom-tabs">
                                <TabPane tab="Overview" key="1">
                                    <div className="space-y-6">
                                        <div>
                                            <Title level={3} className="text-charcoal-500 dark:text-cream-100">
                                                About This Course
                                            </Title>
                                            <Paragraph className="text-warm-600 dark:text-warm-300 text-base leading-relaxed">
                                                {courseData.fullDescription}
                                            </Paragraph>
                                        </div>

                                        <div>
                                            <Title level={4} className="text-charcoal-500 dark:text-cream-100 mb-3">
                                                What You'll Learn
                                            </Title>
                                            <Row gutter={[16, 16]}>
                                                {courseData.whatYouLearn.map((item, index) => (
                                                    <Col key={index} xs={24} sm={12}>
                                                        <div className="flex items-start gap-2">
                                                            <CheckCircleOutlined className="text-olive-500 mt-1" />
                                                            <Text className="text-warm-600 dark:text-warm-300">{item}</Text>
                                                        </div>
                                                    </Col>
                                                ))}
                                            </Row>
                                        </div>

                                        <div>
                                            <Title level={4} className="text-charcoal-500 dark:text-cream-100 mb-3">
                                                Requirements
                                            </Title>
                                            <ul className="space-y-2">
                                                {courseData.requirements.map((req, index) => (
                                                    <li key={index} className="text-warm-600 dark:text-warm-300">
                                                        • {req}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </TabPane>

                                <TabPane tab="Curriculum" key="2">
                                    <div className="space-y-4">
                                        {courseData.curriculum.map((section, index) => (
                                            <Card
                                                key={index}
                                                className="bg-cream-50 dark:bg-warm-800 border-warm-200 dark:border-warm-600"
                                            >
                                                <div className="flex justify-between items-center mb-3">
                                                    <Title level={5} className="text-charcoal-500 dark:text-cream-100 mb-0">
                                                        {section.title}
                                                    </Title>
                                                    <div className="flex gap-4 text-sm text-warm-500 dark:text-warm-300">
                                                        <span>{section.lessons} lessons</span>
                                                        <span>{section.duration}</span>
                                                    </div>
                                                </div>
                                                <div className="space-y-1">
                                                    {section.topics.map((topic, topicIndex) => (
                                                        <div key={topicIndex} className="flex items-center gap-2">
                                                            <PlayCircleOutlined className="text-sage-500 text-sm" />
                                                            <Text className="text-warm-600 dark:text-warm-300">{topic}</Text>
                                                        </div>
                                                    ))}
                                                </div>
                                            </Card>
                                        ))}
                                    </div>
                                </TabPane>

                                <TabPane tab="Reviews" key="3">
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-6">
                                            <div className="text-center">
                                                <Title level={2} className="text-terracotta-500 mb-0">
                                                    {courseData.rating}
                                                </Title>
                                                <Rate disabled value={courseData.rating} allowHalf />
                                                <Text className="text-warm-500 dark:text-warm-300 block">
                                                    {courseData.reviews} reviews
                                                </Text>
                                            </div>
                                        </div>

                                        <Divider className="border-warm-200 dark:border-warm-700" />

                                        <List
                                            dataSource={reviews}
                                            renderItem={(review) => (
                                                <Card className="mb-4 bg-cream-50 dark:bg-warm-800 border-warm-200 dark:border-warm-600">
                                                    <div className="flex justify-between items-start mb-3">
                                                        <div className="flex items-center gap-3">
                                                            <div className="text-2xl">{review.avatar}</div>
                                                            <div>
                                                                <Text className="text-charcoal-500 dark:text-cream-100 font-medium">
                                                                    {review.user}
                                                                </Text>
                                                                <div className="flex items-center gap-2">
                                                                    <Rate disabled value={review.rating} className="text-sm" />
                                                                    <Text className="text-warm-500 dark:text-warm-300 text-sm">
                                                                        {review.date}
                                                                    </Text>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Paragraph className="text-warm-600 dark:text-warm-300 mb-3">
                                                        {review.comment}
                                                    </Paragraph>
                                                    <div className="flex items-center gap-4">
                                                        <Button
                                                            type="text"
                                                            size="small"
                                                            className="text-sage-500 hover:text-sage-600"
                                                        >
                                                            👍 Helpful ({review.helpful})
                                                        </Button>
                                                        <Button
                                                            type="text"
                                                            size="small"
                                                            className="text-warm-500 hover:text-warm-600"
                                                        >
                                                            Reply
                                                        </Button>
                                                    </div>
                                                </Card>
                                            )}
                                        />
                                    </div>
                                </TabPane>
                            </Tabs>
                        </Card>
                    </Col>

                    <Col xs={24} lg={8}>
                        {/* Instructor Info */}
                        <Card
                            title={<Title level={4} className="text-charcoal-500 dark:text-cream-100 mb-0">Instructor</Title>}
                            className="bg-white dark:bg-warm-900 border-warm-200 dark:border-warm-700 mb-6"
                        >
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="text-3xl">{courseData.instructor.avatar}</div>
                                    <div>
                                        <Title level={5} className="text-charcoal-500 dark:text-cream-100 mb-0">
                                            {courseData.instructor.name}
                                        </Title>
                                        <Text className="text-warm-500 dark:text-warm-300">
                                            {courseData.instructor.title}
                                        </Text>
                                        <br />
                                        <Text className="text-sage-500">
                                            {courseData.instructor.company}
                                        </Text>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <div>
                                        <Title level={5} className="text-terracotta-500 mb-0">
                                            {courseData.instructor.rating}
                                        </Title>
                                        <Text className="text-warm-500 dark:text-warm-300 text-sm">Rating</Text>
                                    </div>
                                    <div>
                                        <Title level={5} className="text-sage-500 mb-0">
                                            {courseData.instructor.students.toLocaleString()}
                                        </Title>
                                        <Text className="text-warm-500 dark:text-warm-300 text-sm">Students</Text>
                                    </div>
                                    <div>
                                        <Title level={5} className="text-mustard-500 mb-0">
                                            {courseData.instructor.courses}
                                        </Title>
                                        <Text className="text-warm-500 dark:text-warm-300 text-sm">Courses</Text>
                                    </div>
                                </div>

                                <Text className="text-warm-600 dark:text-warm-300 block">
                                    {courseData.instructor.bio}
                                </Text>

                                <Button
                                    block
                                    className="text-sage-500 border-sage-500 hover:bg-sage-50 dark:hover:bg-sage-900"
                                >
                                    View Profile
                                </Button>
                            </div>
                        </Card>

                        {/* Related Courses */}
                        <Card
                            title={<Title level={4} className="text-charcoal-500 dark:text-cream-100 mb-0">Related Courses</Title>}
                            className="bg-white dark:bg-warm-900 border-warm-200 dark:border-warm-700"
                        >
                            <div className="space-y-4">
                                {[1, 2, 3].map((item) => (
                                    <Card
                                        key={item}
                                        className="bg-cream-50 dark:bg-warm-800 border-warm-200 dark:border-warm-600 cursor-pointer hover:shadow-md transition-shadow"
                                        size="small"
                                    >
                                        <div className="flex gap-3">
                                            <div className="text-2xl">🔥</div>
                                            <div className="flex-1">
                                                <Text className="text-charcoal-500 dark:text-cream-100 font-medium block">
                                                    React Testing Library
                                                </Text>
                                                <Text className="text-warm-500 dark:text-warm-300 text-sm">
                                                    by John Doe
                                                </Text>
                                                <div className="flex items-center justify-between mt-2">
                                                    <Rate disabled value={4.7} className="text-xs" />
                                                    <Text className="text-mustard-600 dark:text-mustard-400 font-medium">
                                                        $89
                                                    </Text>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default CourseDetail;
