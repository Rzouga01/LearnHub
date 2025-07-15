import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Card,
    Row,
    Col,
    Typography,
    Button,
    Statistic,
    Progress,
    Avatar,
    Tag,
    Space,
    Timeline,
    Rate
} from 'antd';
import {
    BookOutlined,
    TrophyOutlined,
    ClockCircleOutlined,
    PlayCircleOutlined,
    FireOutlined,
    StarOutlined,
    ArrowRightOutlined,
    CalendarOutlined
} from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const { Title, Text, Paragraph } = Typography;

const Dashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { isDark } = useTheme();

    const [stats] = useState({
        coursesEnrolled: 12,
        coursesCompleted: 8,
        totalHours: 247,
        certificates: 8,
        streak: 18,
        level: 42,
        xp: 12750,
        nextLevelXp: 15000
    });

    const getGreeting = () => {
        const hour = new Date().getHours();
        const name = user?.name || 'Learner';
        if (hour < 12) return `Good Morning, ${name}!`;
        if (hour < 17) return `Good Afternoon, ${name}!`;
        return `Good Evening, ${name}!`;
    };

    const activeCourses = [
        {
            id: 1,
            title: 'Advanced React Patterns',
            progress: 87,
            instructor: 'Sarah Johnson',
            rating: 4.9,
            thumbnail: '⚛️',
            color: '#E76F51', // terracotta
            nextLesson: 'Advanced Hooks & Context'
        },
        {
            id: 2,
            title: 'AI & Machine Learning',
            progress: 92,
            instructor: 'Dr. Michael Chen',
            rating: 4.8,
            thumbnail: '🤖',
            color: '#2A9D8F', // sage
            nextLesson: 'Neural Networks'
        },
        {
            id: 3,
            title: 'Web3 Development',
            progress: 65,
            instructor: 'Alex Turner',
            rating: 4.7,
            thumbnail: '🔗',
            color: '#F4A261', // mustard
            nextLesson: 'Smart Contracts'
        }
    ];

    const recentActivity = [
        {
            id: 1,
            type: 'course_complete',
            title: 'Completed "JavaScript Fundamentals"',
            time: '2 hours ago',
            icon: <TrophyOutlined className="text-olive-500" />
        },
        {
            id: 2,
            type: 'certificate',
            title: 'Earned React Developer Certificate',
            time: '1 day ago',
            icon: <StarOutlined className="text-saffron-500" />
        },
        {
            id: 3,
            type: 'streak',
            title: 'Maintained 18-day learning streak',
            time: '2 days ago',
            icon: <FireOutlined className="text-terracotta-500" />
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-cream-50 via-cream-100 to-warm-50 dark:from-charcoal-600 dark:via-charcoal-500 dark:to-warm-800 transition-all duration-500">
            <div className="max-w-7xl mx-auto p-6 space-y-8">

                {/* Welcome Header - Enhanced */}
                <Card className="relative overflow-hidden border-0 shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-r from-terracotta-500 via-terracotta-400 to-sage-500"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full -mr-36 -mt-36"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-sage-600/20 rounded-full -ml-48 -mb-48"></div>

                    <div className="relative z-10 p-8">
                        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
                            <div className="flex-1">
                                <Title level={1} className="text-white mb-3 text-3xl lg:text-4xl font-bold">
                                    {getGreeting()}
                                </Title>
                                <Text className="text-white/90 text-lg lg:text-xl font-medium">
                                    Ready to continue your learning journey today?
                                </Text>
                                <div className="flex items-center gap-4 mt-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-olive-400 rounded-full animate-pulse"></div>
                                        <Text className="text-white/80 text-sm">Online</Text>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <TrophyOutlined className="text-saffron-300" />
                                        <Text className="text-white/80 text-sm">Level {stats.level}</Text>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30">
                                    <Text className="text-white/90 text-sm block mb-2">Learning Streak</Text>
                                    <div className="flex items-center gap-3">
                                        <FireOutlined className="text-saffron-300 text-xl" />
                                        <Text className="text-white text-3xl font-bold">{stats.streak}</Text>
                                        <Text className="text-white/80 text-sm">days</Text>
                                    </div>
                                </div>
                                <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30">
                                    <Text className="text-white/90 text-sm block mb-2">XP Progress</Text>
                                    <div className="flex items-center gap-3">
                                        <StarOutlined className="text-mustard-300 text-xl" />
                                        <Text className="text-white text-3xl font-bold">{Math.round((stats.xp / stats.nextLevelXp) * 100)}%</Text>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Enhanced Stats Overview */}
                <Row gutter={[32, 32]}>
                    <Col xs={24} sm={12} lg={6}>
                        <Card className="relative bg-white dark:bg-warm-900 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-terracotta-500/5 to-terracotta-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative z-10 p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-14 h-14 bg-terracotta-100 dark:bg-terracotta-900 rounded-2xl flex items-center justify-center">
                                        <BookOutlined className="text-terracotta-500 text-xl" />
                                    </div>
                                    <div className="text-right">
                                        <Text className="text-terracotta-500 text-3xl font-bold block">{stats.coursesEnrolled}</Text>
                                        <Text className="text-warm-500 dark:text-warm-300 text-sm">+2 this month</Text>
                                    </div>
                                </div>
                                <Title level={5} className="text-charcoal-500 dark:text-cream-100 mb-1">
                                    Courses Enrolled
                                </Title>
                                <Text className="text-warm-500 dark:text-warm-300 text-sm">
                                    Active learning paths
                                </Text>
                            </div>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Card className="relative bg-white dark:bg-warm-900 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-olive-500/5 to-olive-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative z-10 p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-14 h-14 bg-olive-100 dark:bg-olive-900 rounded-2xl flex items-center justify-center">
                                        <TrophyOutlined className="text-olive-500 text-xl" />
                                    </div>
                                    <div className="text-right">
                                        <Text className="text-olive-500 text-3xl font-bold block">{stats.coursesCompleted}</Text>
                                        <Text className="text-warm-500 dark:text-warm-300 text-sm">{Math.round((stats.coursesCompleted / stats.coursesEnrolled) * 100)}% completion</Text>
                                    </div>
                                </div>
                                <Title level={5} className="text-charcoal-500 dark:text-cream-100 mb-1">
                                    Completed
                                </Title>
                                <Text className="text-warm-500 dark:text-warm-300 text-sm">
                                    Successfully finished
                                </Text>
                            </div>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Card className="relative bg-white dark:bg-warm-900 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-sage-500/5 to-sage-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative z-10 p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-14 h-14 bg-sage-100 dark:bg-sage-900 rounded-2xl flex items-center justify-center">
                                        <ClockCircleOutlined className="text-sage-500 text-xl" />
                                    </div>
                                    <div className="text-right">
                                        <Text className="text-sage-500 text-3xl font-bold block">{stats.totalHours}</Text>
                                        <Text className="text-warm-500 dark:text-warm-300 text-sm">+12 this week</Text>
                                    </div>
                                </div>
                                <Title level={5} className="text-charcoal-500 dark:text-cream-100 mb-1">
                                    Learning Hours
                                </Title>
                                <Text className="text-warm-500 dark:text-warm-300 text-sm">
                                    Total time invested
                                </Text>
                            </div>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Card className="relative bg-white dark:bg-warm-900 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-mustard-500/5 to-mustard-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative z-10 p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-14 h-14 bg-mustard-100 dark:bg-mustard-900 rounded-2xl flex items-center justify-center">
                                        <StarOutlined className="text-mustard-500 text-xl" />
                                    </div>
                                    <div className="text-right">
                                        <Text className="text-mustard-500 text-3xl font-bold block">{stats.certificates}</Text>
                                        <Text className="text-warm-500 dark:text-warm-300 text-sm">+1 this month</Text>
                                    </div>
                                </div>
                                <Title level={5} className="text-charcoal-500 dark:text-cream-100 mb-1">
                                    Certificates
                                </Title>
                                <Text className="text-warm-500 dark:text-warm-300 text-sm">
                                    Earned credentials
                                </Text>
                            </div>
                        </Card>
                    </Col>
                </Row>

                {/* Enhanced Progress & Active Courses */}
                <Row gutter={[32, 32]}>
                    <Col xs={24} lg={16}>
                        <Card
                            className="bg-white dark:bg-warm-900 border-0 shadow-lg"
                            title={
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-terracotta-100 dark:bg-terracotta-900 rounded-xl flex items-center justify-center">
                                            <PlayCircleOutlined className="text-terracotta-500 text-lg" />
                                        </div>
                                        <Title level={3} className="text-charcoal-500 dark:text-cream-100 mb-0">
                                            Continue Learning
                                        </Title>
                                    </div>
                                    <Button
                                        type="text"
                                        className="text-sage-500 hover:text-sage-600 hover:bg-sage-50 dark:hover:bg-sage-900/20 rounded-lg px-4 py-2"
                                        onClick={() => navigate('/courses')}
                                    >
                                        View All <ArrowRightOutlined />
                                    </Button>
                                </div>
                            }
                        >
                            <div className="space-y-6">
                                {activeCourses.map((course, index) => (
                                    <Card
                                        key={course.id}
                                        className="bg-gradient-to-r from-cream-50 to-white dark:from-warm-800 dark:to-warm-750 border-0 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group"
                                        onClick={() => navigate(`/courses/${course.id}`)}
                                    >
                                        <div className="flex items-center gap-6 p-2">
                                            <div className="relative">
                                                <div
                                                    className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl shadow-lg group-hover:scale-105 transition-transform duration-300"
                                                    style={{
                                                        background: `linear-gradient(135deg, ${course.color}20, ${course.color}30)`,
                                                        border: `2px solid ${course.color}40`
                                                    }}
                                                >
                                                    {course.thumbnail}
                                                </div>
                                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-olive-500 rounded-full flex items-center justify-center">
                                                    <Text className="text-white text-xs font-bold">{index + 1}</Text>
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-start mb-3">
                                                    <div className="flex-1">
                                                        <Title level={4} className="text-charcoal-500 dark:text-cream-100 mb-1 group-hover:text-terracotta-500 transition-colors">
                                                            {course.title}
                                                        </Title>
                                                        <div className="flex items-center gap-4 mb-2">
                                                            <Text className="text-warm-500 dark:text-warm-300 text-sm">
                                                                by {course.instructor}
                                                            </Text>
                                                            <div className="flex items-center gap-1">
                                                                <Rate disabled value={course.rating} allowHalf className="text-xs" />
                                                                <Text className="text-warm-400 text-xs">({course.rating})</Text>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mb-4">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <Text className="text-warm-500 dark:text-warm-300 text-sm font-medium">
                                                            Progress: {course.progress}%
                                                        </Text>
                                                        <Text className="text-sage-500 text-sm font-medium">
                                                            Next: {course.nextLesson}
                                                        </Text>
                                                    </div>
                                                    <div className="relative">
                                                        <Progress
                                                            percent={course.progress}
                                                            strokeColor={{
                                                                '0%': course.color,
                                                                '100%': course.color + 'CC'
                                                            }}
                                                            trailColor={isDark ? '#4A4341' : '#F1EFED'}
                                                            strokeWidth={8}
                                                            showInfo={false}
                                                            className="rounded-full"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <Button
                                                        type="primary"
                                                        icon={<PlayCircleOutlined />}
                                                        className="bg-terracotta-500 hover:bg-terracotta-600 border-terracotta-500 hover:border-terracotta-600 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                                                        size="default"
                                                    >
                                                        Continue Learning
                                                    </Button>
                                                    <Text className="text-warm-400 text-sm">
                                                        {Math.round((100 - course.progress) / 10)} lessons left
                                                    </Text>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </Card>
                    </Col>

                    <Col xs={24} lg={8}>
                        <div className="space-y-8">
                            {/* Enhanced Level Progress */}
                            <Card className="bg-white dark:bg-warm-900 border-0 shadow-lg">
                                <div className="text-center p-4">
                                    <div className="flex items-center justify-center gap-3 mb-6">
                                        <div className="w-10 h-10 bg-terracotta-100 dark:bg-terracotta-900 rounded-xl flex items-center justify-center">
                                            <TrophyOutlined className="text-terracotta-500 text-lg" />
                                        </div>
                                        <Title level={3} className="text-charcoal-500 dark:text-cream-100 mb-0">
                                            Your Level
                                        </Title>
                                    </div>

                                    <div className="relative mb-6">
                                        <Progress
                                            type="circle"
                                            percent={Math.round((stats.xp / stats.nextLevelXp) * 100)}
                                            strokeColor={{
                                                '0%': '#E76F51',
                                                '100%': '#F4A261'
                                            }}
                                            trailColor={isDark ? '#4A4341' : '#F1EFED'}
                                            strokeWidth={8}
                                            size={140}
                                            format={() => (
                                                <div className="text-center">
                                                    <Text className="text-terracotta-500 text-2xl font-bold block">
                                                        {stats.level}
                                                    </Text>
                                                    <Text className="text-warm-500 dark:text-warm-300 text-xs">
                                                        LEVEL
                                                    </Text>
                                                </div>
                                            )}
                                        />
                                    </div>

                                    <div className="bg-cream-50 dark:bg-warm-800 rounded-xl p-4 mb-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <Text className="text-warm-500 dark:text-warm-300 text-sm font-medium">
                                                Current XP
                                            </Text>
                                            <Text className="text-terracotta-500 text-sm font-bold">
                                                {stats.xp.toLocaleString()}
                                            </Text>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <Text className="text-warm-500 dark:text-warm-300 text-sm font-medium">
                                                Next Level
                                            </Text>
                                            <Text className="text-sage-500 text-sm font-bold">
                                                {stats.nextLevelXp.toLocaleString()}
                                            </Text>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-center gap-2">
                                        <StarOutlined className="text-mustard-500" />
                                        <Text className="text-warm-500 dark:text-warm-300 text-sm">
                                            {stats.nextLevelXp - stats.xp} XP to next level
                                        </Text>
                                    </div>
                                </div>
                            </Card>

                            {/* Enhanced Recent Activity */}
                            <Card className="bg-white dark:bg-warm-900 border-0 shadow-lg">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-sage-100 dark:bg-sage-900 rounded-xl flex items-center justify-center">
                                        <ClockCircleOutlined className="text-sage-500 text-lg" />
                                    </div>
                                    <Title level={3} className="text-charcoal-500 dark:text-cream-100 mb-0">
                                        Recent Activity
                                    </Title>
                                </div>

                                <div className="space-y-4">
                                    {recentActivity.map((activity, index) => (
                                        <div key={activity.id} className="flex items-start gap-4 p-3 rounded-xl bg-cream-50 dark:bg-warm-800 hover:bg-cream-100 dark:hover:bg-warm-700 transition-colors duration-200">
                                            <div className="w-10 h-10 rounded-xl bg-white dark:bg-warm-900 flex items-center justify-center shadow-sm">
                                                {activity.icon}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <Text className="text-charcoal-500 dark:text-cream-100 text-sm font-medium block mb-1">
                                                    {activity.title}
                                                </Text>
                                                <Text className="text-warm-500 dark:text-warm-300 text-xs">
                                                    {activity.time}
                                                </Text>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 text-center">
                                    <Button
                                        type="text"
                                        className="text-sage-500 hover:text-sage-600 hover:bg-sage-50 dark:hover:bg-sage-900/20 rounded-lg"
                                        onClick={() => navigate('/activity')}
                                    >
                                        View All Activity <ArrowRightOutlined />
                                    </Button>
                                </div>
                            </Card>
                        </div>
                    </Col>
                </Row>

                {/* Enhanced Quick Actions */}
                <Card className="bg-white dark:bg-warm-900 border-0 shadow-lg">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 bg-mustard-100 dark:bg-mustard-900 rounded-xl flex items-center justify-center">
                            <StarOutlined className="text-mustard-500 text-lg" />
                        </div>
                        <Title level={3} className="text-charcoal-500 dark:text-cream-100 mb-0">
                            Quick Actions
                        </Title>
                    </div>

                    <Row gutter={[24, 24]}>
                        <Col xs={24} sm={12} md={6}>
                            <div className="group">
                                <Button
                                    type="primary"
                                    block
                                    icon={<BookOutlined />}
                                    className="h-16 bg-gradient-to-r from-terracotta-500 to-terracotta-600 hover:from-terracotta-600 hover:to-terracotta-700 border-0 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 rounded-xl text-white font-medium"
                                    onClick={() => navigate('/courses')}
                                >
                                    <div className="flex flex-col items-center gap-1">
                                        <span className="text-lg">Browse Courses</span>
                                        <span className="text-xs opacity-90">Explore new topics</span>
                                    </div>
                                </Button>
                            </div>
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                            <div className="group">
                                <Button
                                    block
                                    icon={<TrophyOutlined />}
                                    className="h-16 bg-gradient-to-r from-olive-500 to-olive-600 hover:from-olive-600 hover:to-olive-700 border-0 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 rounded-xl text-white font-medium"
                                    onClick={() => navigate('/achievements')}
                                >
                                    <div className="flex flex-col items-center gap-1">
                                        <span className="text-lg">Achievements</span>
                                        <span className="text-xs opacity-90">View your progress</span>
                                    </div>
                                </Button>
                            </div>
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                            <div className="group">
                                <Button
                                    block
                                    icon={<CalendarOutlined />}
                                    className="h-16 bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700 border-0 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 rounded-xl text-white font-medium"
                                    onClick={() => navigate('/schedule')}
                                >
                                    <div className="flex flex-col items-center gap-1">
                                        <span className="text-lg">Schedule</span>
                                        <span className="text-xs opacity-90">Plan your learning</span>
                                    </div>
                                </Button>
                            </div>
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                            <div className="group">
                                <Button
                                    block
                                    icon={<StarOutlined />}
                                    className="h-16 bg-gradient-to-r from-mustard-500 to-mustard-600 hover:from-mustard-600 hover:to-mustard-700 border-0 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 rounded-xl text-charcoal-500 font-medium"
                                    onClick={() => navigate('/certificates')}
                                >
                                    <div className="flex flex-col items-center gap-1">
                                        <span className="text-lg">Certificates</span>
                                        <span className="text-xs opacity-90">Download credentials</span>
                                    </div>
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;