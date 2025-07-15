import React, { useState } from 'react';
import {
    Card,
    Typography,
    Avatar,
    Button,
    Row,
    Col,
    Tabs,
    Progress,
    Tag,
    Rate,
    List,
    Statistic,
    Badge,
    Space,
    Empty,
    Timeline
} from 'antd';
import {
    UserOutlined,
    BookOutlined,
    TrophyOutlined,
    CalendarOutlined,
    StarOutlined,
    ClockCircleOutlined,
    FireOutlined,
    EditOutlined,
    SettingOutlined,
    LinkOutlined
} from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const Profile = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');

    // Sample user data with achievements and progress
    const profileData = {
        ...user,
        bio: "Passionate software developer with 5+ years of experience in React and Node.js. Love learning new technologies and sharing knowledge with the community.",
        title: "Senior Frontend Developer",
        company: "TechCorp Inc.",
        location: "San Francisco, CA",
        joinedDate: "January 2023",
        totalCourses: 12,
        completedCourses: 8,
        certificates: 6,
        learningHours: 247,
        currentStreak: 18,
        totalXP: 12750,
        level: 42,
        socialLinks: {
            linkedin: "https://linkedin.com/in/johndoe",
            github: "https://github.com/johndoe",
            twitter: "https://twitter.com/johndoe"
        }
    };

    const enrolledCourses = [
        {
            id: 1,
            title: 'Advanced React Patterns',
            progress: 87,
            instructor: 'Sarah Johnson',
            thumbnail: '⚛️',
            status: 'In Progress',
            rating: 4.9,
            completedLessons: 39,
            totalLessons: 45
        },
        {
            id: 2,
            title: 'Node.js Masterclass',
            progress: 100,
            instructor: 'Mike Chen',
            thumbnail: '🟢',
            status: 'Completed',
            rating: 5.0,
            completedLessons: 32,
            totalLessons: 32
        },
        {
            id: 3,
            title: 'TypeScript Deep Dive',
            progress: 45,
            instructor: 'Emma Wilson',
            thumbnail: '🔷',
            status: 'In Progress',
            rating: 4.8,
            completedLessons: 18,
            totalLessons: 40
        }
    ];

    const achievements = [
        {
            id: 1,
            title: 'Course Completionist',
            description: 'Completed 10 courses',
            icon: '🏆',
            earned: true,
            date: '2024-01-15',
            color: 'bg-olive-100 dark:bg-olive-900 text-olive-700 dark:text-olive-300'
        },
        {
            id: 2,
            title: 'Quick Learner',
            description: 'Completed a course in under 7 days',
            icon: '⚡',
            earned: true,
            date: '2024-01-20',
            color: 'bg-saffron-100 dark:bg-saffron-900 text-saffron-700 dark:text-saffron-300'
        },
        {
            id: 3,
            title: 'Streak Master',
            description: 'Maintained 30-day learning streak',
            icon: '🔥',
            earned: false,
            progress: 60,
            color: 'bg-terracotta-100 dark:bg-terracotta-900 text-terracotta-700 dark:text-terracotta-300'
        },
        {
            id: 4,
            title: 'Community Helper',
            description: 'Helped 50 fellow learners',
            icon: '🤝',
            earned: false,
            progress: 32,
            color: 'bg-sage-100 dark:bg-sage-900 text-sage-700 dark:text-sage-300'
        }
    ];

    const learningActivity = [
        {
            date: '2024-01-15',
            type: 'course_complete',
            title: 'Completed "JavaScript Fundamentals"',
            icon: <TrophyOutlined className="text-olive-500" />
        },
        {
            date: '2024-01-14',
            type: 'lesson_complete',
            title: 'Finished "Advanced Hooks" lesson',
            icon: <BookOutlined className="text-sage-500" />
        },
        {
            date: '2024-01-13',
            type: 'achievement',
            title: 'Earned "Quick Learner" badge',
            icon: <StarOutlined className="text-saffron-500" />
        },
        {
            date: '2024-01-12',
            type: 'streak',
            title: 'Maintained 15-day learning streak',
            icon: <FireOutlined className="text-terracotta-500" />
        }
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed':
                return 'bg-olive-100 dark:bg-olive-900 text-olive-700 dark:text-olive-300';
            case 'In Progress':
                return 'bg-sage-100 dark:bg-sage-900 text-sage-700 dark:text-sage-300';
            default:
                return 'bg-warm-100 dark:bg-warm-800 text-warm-600 dark:text-warm-300';
        }
    };

    const renderOverview = () => (
        <div className="space-y-6">
            {/* Stats Cards */}
            <Row gutter={[24, 24]}>
                <Col xs={24} sm={12} lg={6}>
                    <Card className="text-center bg-terracotta-50 dark:bg-terracotta-900 border-terracotta-200 dark:border-terracotta-700">
                        <Statistic
                            title={<span className="text-warm-500 dark:text-warm-300">Total Courses</span>}
                            value={profileData.totalCourses}
                            prefix={<BookOutlined className="text-terracotta-500" />}
                            valueStyle={{ color: '#E76F51' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card className="text-center bg-olive-50 dark:bg-olive-900 border-olive-200 dark:border-olive-700">
                        <Statistic
                            title={<span className="text-warm-500 dark:text-warm-300">Completed</span>}
                            value={profileData.completedCourses}
                            prefix={<TrophyOutlined className="text-olive-500" />}
                            valueStyle={{ color: '#6A994E' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card className="text-center bg-sage-50 dark:bg-sage-900 border-sage-200 dark:border-sage-700">
                        <Statistic
                            title={<span className="text-warm-500 dark:text-warm-300">Learning Hours</span>}
                            value={profileData.learningHours}
                            prefix={<ClockCircleOutlined className="text-sage-500" />}
                            valueStyle={{ color: '#2A9D8F' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card className="text-center bg-mustard-50 dark:bg-mustard-900 border-mustard-200 dark:border-mustard-700">
                        <Statistic
                            title={<span className="text-warm-500 dark:text-warm-300">Certificates</span>}
                            value={profileData.certificates}
                            prefix={<StarOutlined className="text-mustard-500" />}
                            valueStyle={{ color: '#F4A261' }}
                        />
                    </Card>
                </Col>
            </Row>

            {/* Current Learning Progress */}
            <Card
                title={<Title level={4} className="text-charcoal-500 dark:text-cream-100 mb-0">Current Learning</Title>}
                className="bg-white dark:bg-warm-900 border-warm-200 dark:border-warm-700"
            >
                <div className="space-y-4">
                    {enrolledCourses.filter(course => course.status === 'In Progress').map((course) => (
                        <Card
                            key={course.id}
                            className="bg-cream-50 dark:bg-warm-800 border-warm-200 dark:border-warm-600 cursor-pointer hover:shadow-md transition-all duration-300"
                            onClick={() => navigate(`/courses/${course.id}`)}
                        >
                            <div className="flex items-center gap-4">
                                <div className="text-3xl">{course.thumbnail}</div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <Title level={5} className="text-charcoal-500 dark:text-cream-100 mb-1">
                                                {course.title}
                                            </Title>
                                            <Text className="text-warm-500 dark:text-warm-300">
                                                by {course.instructor}
                                            </Text>
                                        </div>
                                        <Tag className={`border-0 ${getStatusColor(course.status)}`}>
                                            {course.status}
                                        </Tag>
                                    </div>
                                    <div className="mb-2">
                                        <div className="flex justify-between items-center mb-1">
                                            <Text className="text-warm-500 dark:text-warm-300 text-sm">
                                                Progress: {course.progress}%
                                            </Text>
                                            <Text className="text-sage-500 text-sm">
                                                {course.completedLessons}/{course.totalLessons} lessons
                                            </Text>
                                        </div>
                                        <Progress
                                            percent={course.progress}
                                            strokeColor="#E76F51"
                                            trailColor="#F1EFED"
                                            size="small"
                                        />
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </Card>

            {/* Recent Activity */}
            <Card
                title={<Title level={4} className="text-charcoal-500 dark:text-cream-100 mb-0">Recent Activity</Title>}
                className="bg-white dark:bg-warm-900 border-warm-200 dark:border-warm-700"
            >
                <Timeline
                    items={learningActivity.map((activity) => ({
                        dot: activity.icon,
                        children: (
                            <div>
                                <Text className="text-charcoal-500 dark:text-cream-100 block">
                                    {activity.title}
                                </Text>
                                <Text className="text-warm-500 dark:text-warm-300 text-sm">
                                    {activity.date}
                                </Text>
                            </div>
                        )
                    }))}
                />
            </Card>
        </div>
    );

    const renderCourses = () => (
        <Card className="bg-white dark:bg-warm-900 border-warm-200 dark:border-warm-700">
            <List
                dataSource={enrolledCourses}
                renderItem={(course) => (
                    <List.Item
                        className="border-b border-warm-200 dark:border-warm-700 last:border-b-0 p-4 hover:bg-cream-50 dark:hover:bg-warm-800 transition-colors cursor-pointer"
                        onClick={() => navigate(`/courses/${course.id}`)}
                    >
                        <div className="flex items-center gap-4 w-full">
                            <div className="text-3xl">{course.thumbnail}</div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <Title level={5} className="text-charcoal-500 dark:text-cream-100 mb-1">
                                            {course.title}
                                        </Title>
                                        <Text className="text-warm-500 dark:text-warm-300">
                                            by {course.instructor}
                                        </Text>
                                    </div>
                                    <div className="text-right">
                                        <Tag className={`border-0 ${getStatusColor(course.status)} mb-2`}>
                                            {course.status}
                                        </Tag>
                                        <br />
                                        <Rate disabled value={course.rating} allowHalf className="text-sm" />
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <div className="flex justify-between items-center mb-1">
                                        <Text className="text-warm-500 dark:text-warm-300 text-sm">
                                            Progress: {course.progress}%
                                        </Text>
                                        <Text className="text-sage-500 text-sm">
                                            {course.completedLessons}/{course.totalLessons} lessons
                                        </Text>
                                    </div>
                                    <Progress
                                        percent={course.progress}
                                        strokeColor="#E76F51"
                                        trailColor="#F1EFED"
                                        size="small"
                                    />
                                </div>
                            </div>
                        </div>
                    </List.Item>
                )}
            />
        </Card>
    );

    const renderAchievements = () => (
        <div className="space-y-4">
            <Row gutter={[16, 16]}>
                {achievements.map((achievement) => (
                    <Col key={achievement.id} xs={24} sm={12} lg={6}>
                        <Card
                            className={`text-center h-full ${achievement.color} border-0 ${achievement.earned ? 'shadow-md' : 'opacity-75'
                                }`}
                        >
                            <div className="space-y-3">
                                <div className="text-4xl">{achievement.icon}</div>
                                <Title level={5} className="text-charcoal-500 dark:text-cream-100 mb-1">
                                    {achievement.title}
                                </Title>
                                <Text className="text-warm-600 dark:text-warm-300 text-sm">
                                    {achievement.description}
                                </Text>
                                {achievement.earned ? (
                                    <div>
                                        <Badge
                                            status="success"
                                            text={<span className="text-olive-500">Earned</span>}
                                        />
                                        <br />
                                        <Text className="text-warm-500 dark:text-warm-300 text-xs">
                                            {achievement.date}
                                        </Text>
                                    </div>
                                ) : (
                                    <div>
                                        <Progress
                                            percent={achievement.progress}
                                            size="small"
                                            strokeColor="#E76F51"
                                        />
                                        <Text className="text-warm-500 dark:text-warm-300 text-xs">
                                            {achievement.progress}% progress
                                        </Text>
                                    </div>
                                )}
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );

    return (
        <div className="min-h-screen bg-cream-100 dark:bg-charcoal-500 p-6 transition-colors duration-300">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Profile Header */}
                <Card className="bg-gradient-to-r from-terracotta-500 to-sage-500 border-0 text-white">
                    <Row gutter={[32, 32]} align="middle">
                        <Col xs={24} lg={8}>
                            <div className="text-center lg:text-left">
                                <Avatar
                                    size={120}
                                    src={profileData.avatar}
                                    className="bg-white/20 text-white text-4xl mb-4"
                                >
                                    {profileData.name?.charAt(0)?.toUpperCase()}
                                </Avatar>
                                <Title level={2} className="text-white mb-2">
                                    {profileData.name}
                                </Title>
                                <Text className="text-white/90 text-lg block mb-2">
                                    {profileData.title}
                                </Text>
                                <Text className="text-white/80">
                                    📍 {profileData.location} • 📅 Joined {profileData.joinedDate}
                                </Text>
                            </div>
                        </Col>

                        <Col xs={24} lg={16}>
                            <div className="space-y-4">
                                <div>
                                    <Text className="text-white/90 text-lg leading-relaxed">
                                        {profileData.bio}
                                    </Text>
                                </div>

                                <div className="flex flex-wrap gap-4">
                                    <div className="bg-white/20 rounded-lg px-4 py-2 backdrop-blur-sm">
                                        <div className="flex items-center gap-2">
                                            <FireOutlined className="text-saffron-300" />
                                            <div>
                                                <Text className="text-white text-lg font-bold block">
                                                    {profileData.currentStreak}
                                                </Text>
                                                <Text className="text-white/80 text-sm">Day Streak</Text>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white/20 rounded-lg px-4 py-2 backdrop-blur-sm">
                                        <div className="flex items-center gap-2">
                                            <TrophyOutlined className="text-mustard-300" />
                                            <div>
                                                <Text className="text-white text-lg font-bold block">
                                                    Level {profileData.level}
                                                </Text>
                                                <Text className="text-white/80 text-sm">{profileData.totalXP} XP</Text>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <Button
                                        icon={<EditOutlined />}
                                        className="bg-white/20 border-white/40 text-white hover:bg-white/30"
                                        onClick={() => navigate('/settings')}
                                    >
                                        Edit Profile
                                    </Button>
                                    <Button
                                        icon={<SettingOutlined />}
                                        className="bg-white/20 border-white/40 text-white hover:bg-white/30"
                                        onClick={() => navigate('/settings')}
                                    >
                                        Settings
                                    </Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Card>

                {/* Profile Content */}
                <Card className="bg-white dark:bg-warm-900 border-warm-200 dark:border-warm-700">
                    <Tabs
                        defaultActiveKey="overview"
                        className="custom-tabs"
                        onChange={setActiveTab}
                    >
                        <TabPane tab="Overview" key="overview">
                            {renderOverview()}
                        </TabPane>
                        <TabPane tab="My Courses" key="courses">
                            {renderCourses()}
                        </TabPane>
                        <TabPane tab="Achievements" key="achievements">
                            {renderAchievements()}
                        </TabPane>
                    </Tabs>
                </Card>
            </div>
        </div>
    );
};

export default Profile;
