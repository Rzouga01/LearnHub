import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import api from '../services/api';
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
    const { isDark } = useTheme();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Real data states
    const [profileData, setProfileData] = useState({
        ...user,
        bio: "",
        title: "",
        company: "",
        location: "",
        joinedDate: "",
        totalCourses: 0,
        completedCourses: 0,
        certificates: 0,
        learningHours: 0,
        currentStreak: 0,
        totalXP: 0,
        level: 1,
        socialLinks: {}
    });

    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [achievements, setAchievements] = useState([]);
    const [learningActivity, setLearningActivity] = useState([]);

    // Fetch profile data
    useEffect(() => {
        const fetchProfileData = async () => {
            setLoading(true);
            setError(null);
            
            try {
                // Fetch user profile
                const profileResponse = await api.routes.users.getProfile();
                const profile = profileResponse.data;
                
                // Fetch user enrollments
                const enrollmentsResponse = await api.routes.enrollments.getAll();
                const enrollments = enrollmentsResponse.data || [];
                
                // Fetch recent activity
                const activityResponse = await api.routes.dashboard.getRecentActivity();
                const activities = activityResponse.data || [];
                
                // Transform profile data
                const transformedProfile = {
                    ...user,
                    ...profile,
                    bio: profile.bio || "Welcome to my learning journey!",
                    title: profile.title || "Learner",
                    company: profile.company || "",
                    location: profile.location || "",
                    joinedDate: new Date(user.created_at).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long' 
                    }),
                    totalCourses: enrollments.length,
                    completedCourses: enrollments.filter(e => e.status === 'completed').length,
                    certificates: enrollments.filter(e => e.status === 'completed').length,
                    learningHours: enrollments.reduce((total, e) => total + (e.training?.duration_hours || 0), 0),
                    currentStreak: profile.current_streak || 0,
                    totalXP: profile.total_xp || 0,
                    level: profile.level || 1,
                    socialLinks: profile.social_links || {}
                };
                
                // Transform enrollments to courses
                const transformedCourses = enrollments.map(enrollment => ({
                    id: enrollment.training?.id || enrollment.id,
                    title: enrollment.training?.title || 'Course Title',
                    progress: calculateProgress(enrollment),
                    instructor: enrollment.training?.trainer_name || 'Instructor',
                    thumbnail: getCourseThumbnail(enrollment.training?.category),
                    status: enrollment.status === 'completed' ? 'Completed' : 'In Progress',
                    rating: enrollment.training?.rating || 4.5,
                    completedLessons: enrollment.completed_lessons || 0,
                    totalLessons: enrollment.training?.total_lessons || 1
                }));
                
                // Transform activities
                const transformedActivities = activities.map(activity => ({
                    date: new Date(activity.created_at).toLocaleDateString(),
                    type: activity.type,
                    title: activity.description,
                    icon: getActivityIcon(activity.type)
                }));
                
                // Generate achievements based on user data
                const generatedAchievements = generateAchievements(transformedProfile, enrollments);
                
                setProfileData(transformedProfile);
                setEnrolledCourses(transformedCourses);
                setLearningActivity(transformedActivities);
                setAchievements(generatedAchievements);
                
            } catch (err) {
                console.error('Error fetching profile data:', err);
                setError('Failed to load profile data');
                
                // Fallback to sample data
                setProfileData({
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
                    socialLinks: {}
                });
                
                setEnrolledCourses([
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
                    }
                ]);
                
                setLearningActivity([
                    {
                        date: '2024-01-15',
                        type: 'course_complete',
                        title: 'Completed "JavaScript Fundamentals"',
                        icon: <TrophyOutlined className="text-olive-500" />
                    }
                ]);
                
                setAchievements([
                    {
                        id: 1,
                        title: 'Course Completionist',
                        description: 'Completed 10 courses',
                        icon: '🏆',
                        earned: true,
                        date: '2024-01-15',
                        color: 'bg-olive-100 dark:bg-olive-900 text-olive-700 dark:text-olive-300'
                    }
                ]);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchProfileData();
        }
    }, [user]);

    // Helper functions
    const calculateProgress = (enrollment) => {
        if (!enrollment.training?.total_lessons) return 0;
        return Math.round((enrollment.completed_lessons || 0) / enrollment.training.total_lessons * 100);
    };

    const getCourseThumbnail = (category) => {
        const thumbnails = {
            'Web Development': '⚛️',
            'Design': '🎨',
            'Data Science': '📊',
            'Marketing': '📈',
            'Programming': '💻',
            'Business': '💼'
        };
        return thumbnails[category] || '📚';
    };

    const getActivityIcon = (type) => {
        switch (type) {
            case 'course_complete':
                return <TrophyOutlined className="text-olive-500" />;
            case 'lesson_complete':
                return <BookOutlined className="text-sage-500" />;
            case 'achievement':
                return <StarOutlined className="text-saffron-500" />;
            case 'streak':
                return <FireOutlined className="text-terracotta-500" />;
            default:
                return <BookOutlined className="text-sage-500" />;
        }
    };

    const generateAchievements = (profile, enrollments) => {
        const achievements = [
            {
                id: 1,
                title: 'Course Completionist',
                description: 'Complete 10 courses',
                icon: '🏆',
                earned: profile.completedCourses >= 10,
                date: profile.completedCourses >= 10 ? '2024-01-15' : null,
                progress: Math.min((profile.completedCourses / 10) * 100, 100),
                color: 'bg-olive-100 dark:bg-olive-900 text-olive-700 dark:text-olive-300'
            },
            {
                id: 2,
                title: 'Quick Learner',
                description: 'Complete a course in under 7 days',
                icon: '⚡',
                earned: enrollments.some(e => e.completed_in_days && e.completed_in_days <= 7),
                date: '2024-01-20',
                progress: 75,
                color: 'bg-saffron-100 dark:bg-saffron-900 text-saffron-700 dark:text-saffron-300'
            },
            {
                id: 3,
                title: 'Streak Master',
                description: 'Maintain 30-day learning streak',
                icon: '🔥',
                earned: profile.currentStreak >= 30,
                progress: Math.min((profile.currentStreak / 30) * 100, 100),
                color: 'bg-terracotta-100 dark:bg-terracotta-900 text-terracotta-700 dark:text-terracotta-300'
            },
            {
                id: 4,
                title: 'Learning Hours',
                description: 'Complete 100 hours of learning',
                icon: '⏰',
                earned: profile.learningHours >= 100,
                progress: Math.min((profile.learningHours / 100) * 100, 100),
                color: 'bg-sage-100 dark:bg-sage-900 text-sage-700 dark:text-sage-300'
            }
        ];
        
        return achievements;
    };

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
        <div style={{
            minHeight: '100vh',
            padding: '24px',
            background: isDark 
                ? 'linear-gradient(135deg, #0f172a, #1e293b)'
                : 'linear-gradient(135deg, #f8f9fa, #ffffff)'
        }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>

                {/* Profile Header */}
                <div style={{
                    background: 'linear-gradient(135deg, #E76F51, #2A9D8F)',
                    borderRadius: '16px',
                    padding: '32px',
                    color: 'white',
                    boxShadow: isDark 
                        ? '0 10px 25px -3px rgba(0, 0, 0, 0.4)' 
                        : '0 10px 25px -3px rgba(0, 0, 0, 0.1)'
                }}>
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
                                        style={{
                                            background: 'rgba(255, 255, 255, 0.2)',
                                            borderColor: 'rgba(255, 255, 255, 0.4)',
                                            color: 'white',
                                            borderRadius: '8px',
                                            height: '40px'
                                        }}
                                        onClick={() => navigate('/settings')}
                                    >
                                        Edit Profile
                                    </Button>
                                    <Button
                                        icon={<SettingOutlined />}
                                        style={{
                                            background: 'rgba(255, 255, 255, 0.2)',
                                            borderColor: 'rgba(255, 255, 255, 0.4)',
                                            color: 'white',
                                            borderRadius: '8px',
                                            height: '40px'
                                        }}
                                        onClick={() => navigate('/settings')}
                                    >
                                        Settings
                                    </Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>

                {/* Profile Content */}
                <div style={{
                    background: isDark ? '#1e293b' : '#ffffff',
                    borderRadius: '16px',
                    padding: '32px',
                    border: isDark ? '1px solid #334155' : '1px solid #e2e8f0',
                    boxShadow: isDark 
                        ? '0 4px 6px -1px rgba(0, 0, 0, 0.3)' 
                        : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}>
                    <Tabs
                        defaultActiveKey="overview"
                        onChange={setActiveTab}
                        style={{
                            color: isDark ? '#ffffff' : '#000000'
                        }}
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
                </div>
            </div>
        </div>
    );
};

export default Profile;
