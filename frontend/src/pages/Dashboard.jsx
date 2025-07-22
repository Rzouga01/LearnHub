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
    Timeline,
    Rate,
    Empty,
    Spin,
    Badge,
    Space,
    List,
    Tooltip,
    Divider
} from 'antd';
import {
    BookOutlined,
    TrophyOutlined,
    ClockCircleOutlined,
    PlayCircleOutlined,
    FireOutlined,
    StarOutlined,
    ArrowRightOutlined,
    CalendarOutlined,
    TeamOutlined,
    UserOutlined,
    PlusOutlined,
    RocketOutlined,
    BulbOutlined,
    HeartOutlined,
    ThunderboltOutlined,
    CrownOutlined,
    GiftOutlined,
    LineChartOutlined,
    EyeOutlined,
    CheckCircleOutlined,

} from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import api from '../services/api';
import '../styles/dashboard.css';

const { Title, Text } = Typography;

const Dashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { isDark } = useTheme();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Real data states
    const [stats, setStats] = useState({
        coursesEnrolled: 0,
        coursesCompleted: 0,
        totalHours: 0,
        certificates: 0,
        streak: 0,
        level: 1,
        xp: 0,
        nextLevelXp: 100
    });

    const [trainerStats, setTrainerStats] = useState({
        totalCourses: 0,
        totalStudents: 0,
        completionRate: 0,
        avgRating: 0,
        upcomingSessions: 0,
        totalRevenue: 0
    });

    const [activeCourses, setActiveCourses] = useState([]);
    const [recentActivity, setRecentActivity] = useState([]);

    // Fetch dashboard data
    useEffect(() => {
        const fetchDashboardData = async () => {
            setLoading(true);
            setError(null);

            try {
                if (user?.role === 'trainer') {
                    const response = await api.routes.dashboard.getTrainerDashboard();
                    const data = response.data;

                    setTrainerStats({
                        totalCourses: data.totalCourses || 0,
                        totalStudents: data.totalStudents || 0,
                        completionRate: data.completionRate || 0,
                        avgRating: data.avgRating || 0,
                        upcomingSessions: data.upcomingSessions || 0,
                        totalRevenue: data.totalRevenue || 0
                    });
                } else {
                    const response = await api.routes.dashboard.getStudentDashboard();
                    const data = response.data;

                    setStats({
                        coursesEnrolled: data.coursesEnrolled || 0,
                        coursesCompleted: data.coursesCompleted || 0,
                        totalHours: data.totalHours || 0,
                        certificates: data.certificates || 0,
                        streak: data.streak || 0,
                        level: data.level || 1,
                        xp: data.xp || 0,
                        nextLevelXp: data.nextLevelXp || 100
                    });

                    setActiveCourses(data.activeCourses || []);
                }

                // Fetch recent activity for both roles
                const activityResponse = await api.routes.dashboard.getRecentActivity();
                setRecentActivity(activityResponse.data || []);

            } catch (err) {
                console.error('Error fetching dashboard data:', err);
                setError('Failed to load dashboard data');

                // Fallback to sample data if API fails
                if (user?.role === 'trainer') {
                    setTrainerStats({
                        totalCourses: 5,
                        totalStudents: 42,
                        completionRate: 85,
                        avgRating: 4.7,
                        upcomingSessions: 3,
                        totalRevenue: 12500
                    });
                } else {
                    setStats({
                        coursesEnrolled: 4,
                        coursesCompleted: 2,
                        totalHours: 45,
                        certificates: 1,
                        streak: 7,
                        level: 12,
                        xp: 850,
                        nextLevelXp: 1000
                    });

                    setActiveCourses([
                        {
                            id: 1,
                            title: 'Advanced React Development',
                            progress: 75,
                            instructor: 'Sarah Johnson',
                            rating: 4.8,
                            thumbnail: '⚛️',
                            nextLesson: 'Hooks Deep Dive',
                            lessonsLeft: 3
                        },
                        {
                            id: 2,
                            title: 'UI/UX Design Fundamentals',
                            progress: 45,
                            instructor: 'Mike Chen',
                            rating: 4.6,
                            thumbnail: '🎨',
                            nextLesson: 'Color Theory',
                            lessonsLeft: 8
                        }
                    ]);
                }

                setRecentActivity([
                    { id: 1, title: 'Completed "React Hooks" lesson', time: '2 hours ago', type: 'lesson' },
                    { id: 2, title: 'Started "Advanced Patterns" course', time: '1 day ago', type: 'course' },
                    { id: 3, title: 'Earned "Quick Learner" badge', time: '2 days ago', type: 'achievement' }
                ]);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchDashboardData();
        }
    }, [user]);

    const getGreeting = () => {
        const hour = new Date().getHours();
        const name = user?.name || 'Learner';
        if (hour < 12) return `Good Morning, ${name}!`;
        if (hour < 17) return `Good Afternoon, ${name}!`;
        return `Good Evening, ${name}!`;
    };

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                background: isDark ? 'linear-gradient(135deg, #0f172a, #1e293b)' : 'linear-gradient(135deg, #f8f9fa, #ffffff)'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <Spin size="large" />
                    <Text style={{
                        display: 'block',
                        marginTop: '16px',
                        fontSize: '18px',
                        color: isDark ? '#ffffff' : '#000000'
                    }}>
                        Loading your dashboard...
                    </Text>
                </div>
            </div>
        );
    }

    // Enhanced Trainer Dashboard
    if (user?.role === 'trainer') {
        return (
            <div style={{
                minHeight: '100vh',
                background: isDark
                    ? 'linear-gradient(135deg, #0f172a, #1e293b)'
                    : 'linear-gradient(135deg, #f8f9fa, #ffffff)',
                padding: '24px'
            }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>

                    {/* Welcome Header */}
                    <div style={{
                        background: 'linear-gradient(135deg, #E76F51 0%, #F4A261 50%, #2A9D8F 100%)',
                        borderRadius: '24px',
                        padding: '40px',
                        color: 'white',
                        position: 'relative',
                        overflow: 'hidden',
                        boxShadow: '0 20px 40px rgba(231, 111, 81, 0.3)'
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            width: '300px',
                            height: '300px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: '50%',
                            transform: 'translate(100px, -100px)'
                        }} />

                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
                                <div style={{
                                    width: '80px',
                                    height: '80px',
                                    background: 'rgba(255, 255, 255, 0.2)',
                                    borderRadius: '20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backdropFilter: 'blur(10px)'
                                }}>
                                    <RocketOutlined style={{ fontSize: '36px' }} />
                                </div>
                                <div>
                                    <Title level={1} style={{
                                        color: 'white',
                                        margin: 0,
                                        fontSize: '48px',
                                        fontWeight: '700',
                                        lineHeight: '1.2'
                                    }}>
                                        {getGreeting().replace('Learner', 'Trainer')}
                                    </Title>
                                    <Text style={{
                                        color: 'rgba(255, 255, 255, 0.9)',
                                        fontSize: '20px',
                                        display: 'block',
                                        marginTop: '8px'
                                    }}>
                                        Empowering minds, shaping futures 🎓
                                    </Text>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                                {[
                                    { icon: '🟢', text: 'Teaching Mode' },
                                    { icon: '📚', text: `${trainerStats.totalCourses} Active Courses` },
                                    { icon: '👥', text: `${trainerStats.totalStudents} Students` }
                                ].map((badge, index) => (
                                    <div key={index} style={{
                                        background: 'rgba(255, 255, 255, 0.15)',
                                        backdropFilter: 'blur(10px)',
                                        borderRadius: '50px',
                                        padding: '12px 20px',
                                        border: '1px solid rgba(255, 255, 255, 0.2)'
                                    }}>
                                        <Text style={{ color: 'white', fontWeight: '600' }}>
                                            {badge.icon} {badge.text}
                                        </Text>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <Row gutter={[24, 24]}>
                        {[
                            {
                                title: 'Total Courses',
                                value: trainerStats.totalCourses,
                                icon: BookOutlined,
                                color: '#E76F51',
                                bgColor: isDark ? 'rgba(231, 111, 81, 0.15)' : 'rgba(231, 111, 81, 0.08)'
                            },
                            {
                                title: 'Total Students',
                                value: trainerStats.totalStudents,
                                icon: TeamOutlined,
                                color: '#6A994E',
                                bgColor: isDark ? 'rgba(106, 153, 78, 0.15)' : 'rgba(106, 153, 78, 0.08)'
                            },
                            {
                                title: 'Completion Rate',
                                value: trainerStats.completionRate,
                                suffix: '%',
                                icon: TrophyOutlined,
                                color: '#F4A261',
                                bgColor: isDark ? 'rgba(244, 162, 97, 0.15)' : 'rgba(244, 162, 97, 0.08)'
                            },
                            {
                                title: 'Avg Rating',
                                value: trainerStats.avgRating,
                                precision: 1,
                                icon: StarOutlined,
                                color: '#2A9D8F',
                                bgColor: isDark ? 'rgba(42, 157, 143, 0.15)' : 'rgba(42, 157, 143, 0.08)'
                            }
                        ].map((stat, index) => (
                            <Col xs={24} sm={12} lg={6} key={index}>
                                <Card style={{
                                    textAlign: 'center',
                                    background: stat.bgColor,
                                    border: `2px solid ${stat.color}30`,
                                    borderRadius: '20px',
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer'
                                }}
                                    className="hover:shadow-lg hover:scale-105"
                                >
                                    <div style={{
                                        width: '60px',
                                        height: '60px',
                                        borderRadius: '16px',
                                        background: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '0 auto 16px auto'
                                    }}>
                                        <stat.icon style={{ fontSize: '24px', color: stat.color }} />
                                    </div>
                                    <Statistic
                                        value={stat.value}
                                        suffix={stat.suffix}
                                        precision={stat.precision}
                                        title={<span style={{ color: isDark ? '#ffffff' : '#000000', fontWeight: '600' }}>{stat.title}</span>}
                                        valueStyle={{ color: stat.color, fontSize: '32px', fontWeight: '700' }}
                                    />
                                </Card>
                            </Col>
                        ))}
                    </Row>

                    {/* Action Cards */}
                    <Row gutter={[24, 24]}>
                        <Col xs={24} lg={12}>
                            <Card style={{
                                height: '100%',
                                background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.9)',
                                border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                                borderRadius: '24px',
                                backdropFilter: 'blur(20px)'
                            }}>
                                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                                    <div style={{
                                        width: '100px',
                                        height: '100px',
                                        borderRadius: '24px',
                                        background: isDark ? 'rgba(231, 111, 81, 0.15)' : 'rgba(231, 111, 81, 0.08)',
                                        border: `2px solid ${isDark ? 'rgba(231, 111, 81, 0.3)' : 'rgba(231, 111, 81, 0.2)'}`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '0 auto 24px auto'
                                    }}>
                                        <PlusOutlined style={{ fontSize: '48px', color: '#E76F51' }} />
                                    </div>
                                    <Title level={3} style={{
                                        color: isDark ? '#ffffff' : '#000000',
                                        marginBottom: '16px'
                                    }}>
                                        Ready to Create Amazing Courses?
                                    </Title>
                                    <Text style={{
                                        color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                                        fontSize: '16px',
                                        display: 'block',
                                        marginBottom: '32px'
                                    }}>
                                        Share your expertise with students worldwide. Create engaging content that makes a difference.
                                    </Text>
                                    <Button
                                        type="primary"
                                        size="large"
                                        icon={<PlusOutlined />}
                                        onClick={() => navigate('/dashboard/courses')}
                                        style={{
                                            background: 'linear-gradient(135deg, #E76F51, #F4A261)',
                                            border: 'none',
                                            borderRadius: '12px',
                                            height: '48px',
                                            fontSize: '16px',
                                            fontWeight: '600',
                                            boxShadow: '0 8px 24px rgba(231, 111, 81, 0.3)'
                                        }}
                                    >
                                        Create New Course
                                    </Button>
                                </div>
                            </Card>
                        </Col>
                        <Col xs={24} lg={12}>
                            <Card style={{
                                height: '100%',
                                background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.9)',
                                border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                                borderRadius: '24px',
                                backdropFilter: 'blur(20px)'
                            }}>
                                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                                    <div style={{
                                        width: '100px',
                                        height: '100px',
                                        borderRadius: '24px',
                                        background: isDark ? 'rgba(106, 153, 78, 0.15)' : 'rgba(106, 153, 78, 0.08)',
                                        border: `2px solid ${isDark ? 'rgba(106, 153, 78, 0.3)' : 'rgba(106, 153, 78, 0.2)'}`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '0 auto 24px auto'
                                    }}>
                                        <TeamOutlined style={{ fontSize: '48px', color: '#6A994E' }} />
                                    </div>
                                    <Title level={3} style={{
                                        color: isDark ? '#ffffff' : '#000000',
                                        marginBottom: '16px'
                                    }}>
                                        Manage Your Students
                                    </Title>
                                    <Text style={{
                                        color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                                        fontSize: '16px',
                                        display: 'block',
                                        marginBottom: '32px'
                                    }}>
                                        Track student progress, provide feedback, and help them achieve their learning goals.
                                    </Text>
                                    <Button
                                        size="large"
                                        icon={<TeamOutlined />}
                                        onClick={() => navigate('/dashboard/students')}
                                        style={{
                                            background: '#6A994E',
                                            borderColor: '#6A994E',
                                            color: 'white',
                                            borderRadius: '12px',
                                            height: '48px',
                                            fontSize: '16px',
                                            fontWeight: '600',
                                            boxShadow: '0 8px 24px rgba(106, 153, 78, 0.3)'
                                        }}
                                    >
                                        View Students
                                    </Button>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }

    // Enhanced Student Dashboard
    return (
        <div style={{
            minHeight: '100vh',
            background: isDark
                ? 'linear-gradient(135deg, #0f172a, #1e293b)'
                : 'linear-gradient(135deg, #f8f9fa, #ffffff)',
            padding: '24px'
        }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>

                {/* Welcome Header */}
                <div style={{
                    background: 'linear-gradient(135deg, #E76F51 0%, #F4A261 50%, #2A9D8F 100%)',
                    borderRadius: '24px',
                    padding: '40px',
                    color: 'white',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 20px 40px rgba(231, 111, 81, 0.3)'
                }}>
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: '300px',
                        height: '300px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '50%',
                        transform: 'translate(100px, -100px)',
                        animation: 'pulse 4s ease-in-out infinite'
                    }} />

                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
                            <div style={{
                                width: '80px',
                                height: '80px',
                                background: 'rgba(255, 255, 255, 0.2)',
                                borderRadius: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backdropFilter: 'blur(10px)'
                            }}>
                                <BulbOutlined style={{ fontSize: '36px' }} />
                            </div>
                            <div>
                                <Title level={1} style={{
                                    color: 'white',
                                    margin: 0,
                                    fontSize: '48px',
                                    fontWeight: '700',
                                    lineHeight: '1.2'
                                }}>
                                    {getGreeting()}
                                </Title>
                                <Text style={{
                                    color: 'rgba(255, 255, 255, 0.9)',
                                    fontSize: '20px',
                                    display: 'block',
                                    marginTop: '8px'
                                }}>
                                    Ready to unlock new knowledge? Let's make today extraordinary! 🚀
                                </Text>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                            {[
                                { icon: '🟢', text: 'Online & Active' },
                                { icon: '🏆', text: `Level ${stats.level} Learner` },
                                { icon: '🔥', text: `${stats.streak} Day Streak` }
                            ].map((badge, index) => (
                                <div key={index} style={{
                                    background: 'rgba(255, 255, 255, 0.15)',
                                    backdropFilter: 'blur(10px)',
                                    borderRadius: '50px',
                                    padding: '12px 20px',
                                    border: '1px solid rgba(255, 255, 255, 0.2)'
                                }}>
                                    <Text style={{ color: 'white', fontWeight: '600' }}>
                                        {badge.icon} {badge.text}
                                    </Text>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <Row gutter={[24, 24]}>
                    {[
                        {
                            title: 'Enrolled Courses',
                            value: stats.coursesEnrolled,
                            icon: BookOutlined,
                            color: '#E76F51',
                            bgColor: isDark ? 'rgba(231, 111, 81, 0.15)' : 'rgba(231, 111, 81, 0.08)',
                            subtitle: 'Active learning paths'
                        },
                        {
                            title: 'Completed',
                            value: stats.coursesCompleted,
                            icon: TrophyOutlined,
                            color: '#6A994E',
                            bgColor: isDark ? 'rgba(106, 153, 78, 0.15)' : 'rgba(106, 153, 78, 0.08)',
                            subtitle: 'Successfully mastered'
                        },
                        {
                            title: 'Learning Hours',
                            value: stats.totalHours,
                            icon: ClockCircleOutlined,
                            color: '#2A9D8F',
                            bgColor: isDark ? 'rgba(42, 157, 143, 0.15)' : 'rgba(42, 157, 143, 0.08)',
                            subtitle: 'Time invested in growth'
                        },
                        {
                            title: 'Certificates',
                            value: stats.certificates,
                            icon: StarOutlined,
                            color: '#F4A261',
                            bgColor: isDark ? 'rgba(244, 162, 97, 0.15)' : 'rgba(244, 162, 97, 0.08)',
                            subtitle: 'Earned achievements'
                        }
                    ].map((stat, index) => (
                        <Col xs={24} sm={12} lg={6} key={index}>
                            <Card style={{
                                textAlign: 'center',
                                background: stat.bgColor,
                                border: `2px solid ${stat.color}30`,
                                borderRadius: '20px',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer'
                            }}
                                className="hover:shadow-lg hover:scale-105"
                            >
                                <div style={{
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '16px',
                                    background: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 16px auto'
                                }}>
                                    <stat.icon style={{ fontSize: '24px', color: stat.color }} />
                                </div>
                                <Statistic
                                    value={stat.value}
                                    title={<span style={{ color: isDark ? '#ffffff' : '#000000', fontWeight: '600' }}>{stat.title}</span>}
                                    valueStyle={{ color: stat.color, fontSize: '32px', fontWeight: '700' }}
                                />
                                <Text style={{
                                    color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                                    fontSize: '12px',
                                    marginTop: '8px'
                                }}>
                                    {stat.subtitle}
                                </Text>
                            </Card>
                        </Col>
                    ))}
                </Row>

                {/* Content Grid */}
                <Row gutter={[24, 24]}>
                    {/* Active Courses */}
                    <Col xs={24} lg={16}>
                        <Card
                            title={
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '12px',
                                            background: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <PlayCircleOutlined style={{ fontSize: '20px', color: '#E76F51' }} />
                                        </div>
                                        <Title level={3} style={{
                                            margin: 0,
                                            color: isDark ? '#ffffff' : '#000000'
                                        }}>
                                            Continue Your Journey
                                        </Title>
                                    </div>
                                    <Button
                                        type="text"
                                        icon={<ArrowRightOutlined />}
                                        onClick={() => navigate('/dashboard/courses')}
                                        style={{ color: '#E76F51' }}
                                    >
                                        View All
                                    </Button>
                                </div>
                            }
                            style={{
                                background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.9)',
                                border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                                borderRadius: '20px',
                                backdropFilter: 'blur(20px)'
                            }}
                        >
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {activeCourses.map((course) => (
                                    <Card
                                        key={course.id}
                                        style={{
                                            background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.8)',
                                            border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                                            borderRadius: '16px',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease'
                                        }}
                                        className="hover:shadow-md hover:scale-102"
                                        onClick={() => navigate(`/courses/${course.id}`)}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                            <div style={{ fontSize: '48px' }}>{course.thumbnail}</div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                                                    <div>
                                                        <Title level={5} style={{
                                                            margin: 0,
                                                            color: isDark ? '#ffffff' : '#000000',
                                                            marginBottom: '4px'
                                                        }}>
                                                            {course.title}
                                                        </Title>
                                                        <Text style={{
                                                            color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)'
                                                        }}>
                                                            by {course.instructor}
                                                        </Text>
                                                    </div>
                                                    <Rate disabled value={course.rating} allowHalf style={{ fontSize: '14px' }} />
                                                </div>
                                                <div style={{ marginBottom: '12px' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                                                        <Text style={{
                                                            color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                                                            fontSize: '14px'
                                                        }}>
                                                            Progress: {course.progress}%
                                                        </Text>
                                                        <Text style={{
                                                            color: '#2A9D8F',
                                                            fontSize: '14px',
                                                            fontWeight: '600'
                                                        }}>
                                                            {course.lessonsLeft} lessons left
                                                        </Text>
                                                    </div>
                                                    <Progress
                                                        percent={course.progress}
                                                        strokeColor="#E76F51"
                                                        trailColor={isDark ? 'rgba(255, 255, 255, 0.1)' : '#f0f0f0'}
                                                        size="small"
                                                    />
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <Text style={{
                                                        color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
                                                        fontSize: '14px'
                                                    }}>
                                                        Next: {course.nextLesson}
                                                    </Text>
                                                    <Button
                                                        type="primary"
                                                        size="small"
                                                        icon={<PlayCircleOutlined />}
                                                        style={{
                                                            background: '#E76F51',
                                                            borderColor: '#E76F51',
                                                            borderRadius: '8px'
                                                        }}
                                                    >
                                                        Continue
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </Card>
                    </Col>

                    {/* Recent Activity */}
                    <Col xs={24} lg={8}>
                        <Card
                            title={
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '12px',
                                        background: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <LineChartOutlined style={{ fontSize: '20px', color: '#2A9D8F' }} />
                                    </div>
                                    <Title level={3} style={{
                                        margin: 0,
                                        color: isDark ? '#ffffff' : '#000000'
                                    }}>
                                        Recent Activity
                                    </Title>
                                </div>
                            }
                            style={{
                                background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.9)',
                                border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                                borderRadius: '20px',
                                backdropFilter: 'blur(20px)'
                            }}
                        >
                            <Timeline
                                items={(Array.isArray(recentActivity) ? recentActivity : []).map((activity) => ({
                                    dot: activity.type === 'lesson' ?
                                        <CheckCircleOutlined style={{ color: '#6A994E' }} /> :
                                        activity.type === 'course' ?
                                            <BookOutlined style={{ color: '#E76F51' }} /> :
                                            <TrophyOutlined style={{ color: '#F4A261' }} />,
                                    children: (
                                        <div>
                                            <Text style={{
                                                color: isDark ? '#ffffff' : '#000000',
                                                display: 'block',
                                                fontWeight: '500'
                                            }}>
                                                {activity.title}
                                            </Text>
                                            <Text style={{
                                                color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
                                                fontSize: '12px'
                                            }}>
                                                {activity.time}
                                            </Text>
                                        </div>
                                    )
                                }))}
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default Dashboard;