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
            color: '#61dafb',
            nextLesson: 'Advanced Hooks & Context'
        },
        {
            id: 2,
            title: 'AI & Machine Learning',
            progress: 92,
            instructor: 'Dr. Michael Chen',
            rating: 4.8,
            thumbnail: '🤖',
            color: '#ff6b6b',
            nextLesson: 'Neural Networks'
        },
        {
            id: 3,
            title: 'Web3 Development',
            progress: 65,
            instructor: 'Alex Turner',
            rating: 4.9,
            thumbnail: '⛓️',
            color: '#8b5cf6',
            nextLesson: 'Smart Contracts'
        }
    ];

    const recentAchievements = [
        {
            id: 1,
            title: 'Course Master',
            description: 'Completed 8 courses with excellence',
            icon: '👑',
            color: '#FFD700'
        },
        {
            id: 2,
            title: 'Learning Streak',
            description: '18 consecutive days of learning',
            icon: '🔥',
            color: '#ff4d4f'
        },
        {
            id: 3,
            title: 'AI Expert',
            description: 'Mastered AI fundamentals',
            icon: '🚀',
            color: '#1890ff'
        }
    ];

    const upcomingEvents = [
        { title: 'React Performance Workshop', time: 'Today 3:00 PM', type: 'workshop' },
        { title: 'AI Study Group', time: 'Tomorrow 10:00 AM', type: 'study' },
        { title: 'Project Deadline', time: 'Friday 11:59 PM', type: 'deadline' }
    ];

    return (
        <div style={{
            minHeight: '100vh',
            background: isDark ? '#1a202c' : '#f5f5f5',
            padding: '24px'
        }}>
            {/* Welcome Header */}
            <div style={{
                marginBottom: '32px',
                padding: '32px',
                background: 'linear-gradient(135deg, #0BC5EA 0%, #40a9ff 100%)',
                borderRadius: '16px',
                color: 'white',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    top: '-50px',
                    right: '-50px',
                    width: '200px',
                    height: '200px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '50%'
                }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <Title level={2} style={{ color: 'white', margin: 0 }}>
                        {getGreeting()}
                    </Title>
                    <Paragraph style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '16px', margin: '8px 0 0 0' }}>
                        Ready to continue your learning journey? You're doing amazing! 🚀
                    </Paragraph>
                    <div style={{
                        display: 'flex',
                        gap: '24px',
                        marginTop: '24px',
                        alignItems: 'center',
                        flexWrap: 'wrap'
                    }}>
                        <div style={{
                            padding: '8px 16px',
                            background: 'rgba(255, 255, 255, 0.2)',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: '600'
                        }}>
                            Level {stats.level}
                        </div>
                        <div style={{
                            padding: '8px 16px',
                            background: 'rgba(255, 255, 255, 0.2)',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: '600'
                        }}>
                            🔥 {stats.streak} Day Streak
                        </div>
                        <div style={{
                            padding: '8px 16px',
                            background: 'rgba(255, 255, 255, 0.2)',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: '600'
                        }}>
                            {stats.xp}/{stats.nextLevelXp} XP
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <Row gutter={[16, 16]} style={{ marginBottom: '32px' }}>
                <Col xs={12} sm={6}>
                    <Card style={{
                        textAlign: 'center',
                        borderRadius: '12px',
                        border: isDark ? '1px solid #2d3748' : '1px solid #e8f4fd',
                        background: isDark
                            ? 'linear-gradient(135deg, #2d3748 0%, #1a202c 100%)'
                            : 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
                        boxShadow: isDark ? '0 4px 12px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.06)'
                    }}>
                        <div style={{ fontSize: '2rem', marginBottom: '8px' }}>📚</div>
                        <Statistic
                            title={<span style={{ color: isDark ? '#a0aec0' : '#666' }}>Active Courses</span>}
                            value={stats.coursesEnrolled}
                            valueStyle={{ color: '#0BC5EA', fontSize: '24px', fontWeight: '700' }}
                        />
                    </Card>
                </Col>
                <Col xs={12} sm={6}>
                    <Card style={{
                        textAlign: 'center',
                        borderRadius: '12px',
                        border: isDark ? '1px solid #2d3748' : '1px solid #f0f9e8',
                        background: isDark
                            ? 'linear-gradient(135deg, #2d3748 0%, #1a202c 100%)'
                            : 'linear-gradient(135deg, #f6ffed 0%, #f0f9e8 100%)',
                        boxShadow: isDark ? '0 4px 12px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.06)'
                    }}>
                        <div style={{ fontSize: '2rem', marginBottom: '8px' }}>✅</div>
                        <Statistic
                            title={<span style={{ color: isDark ? '#a0aec0' : '#666' }}>Completed</span>}
                            value={stats.coursesCompleted}
                            valueStyle={{ color: '#52c41a', fontSize: '24px', fontWeight: '700' }}
                        />
                    </Card>
                </Col>
                <Col xs={12} sm={6}>
                    <Card style={{
                        textAlign: 'center',
                        borderRadius: '12px',
                        border: isDark ? '1px solid #2d3748' : '1px solid #fef3e8',
                        background: isDark
                            ? 'linear-gradient(135deg, #2d3748 0%, #1a202c 100%)'
                            : 'linear-gradient(135deg, #fffbf0 0%, #fef3e8 100%)',
                        boxShadow: isDark ? '0 4px 12px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.06)'
                    }}>
                        <div style={{ fontSize: '2rem', marginBottom: '8px' }}>⏰</div>
                        <Statistic
                            title={<span style={{ color: isDark ? '#a0aec0' : '#666' }}>Study Hours</span>}
                            value={stats.totalHours}
                            valueStyle={{ color: '#faad14', fontSize: '24px', fontWeight: '700' }}
                        />
                    </Card>
                </Col>
                <Col xs={12} sm={6}>
                    <Card style={{
                        textAlign: 'center',
                        borderRadius: '12px',
                        border: isDark ? '1px solid #2d3748' : '1px solid #fff0f6',
                        background: isDark
                            ? 'linear-gradient(135deg, #2d3748 0%, #1a202c 100%)'
                            : 'linear-gradient(135deg, #fff0f6 0%, #fce7f3 100%)',
                        boxShadow: isDark ? '0 4px 12px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.06)'
                    }}>
                        <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🏆</div>
                        <Statistic
                            title={<span style={{ color: isDark ? '#a0aec0' : '#666' }}>Certificates</span>}
                            value={stats.certificates}
                            valueStyle={{ color: '#eb2f96', fontSize: '24px', fontWeight: '700' }}
                        />
                    </Card>
                </Col>
            </Row>

            {/* Main Content */}
            <Row gutter={[24, 24]}>
                {/* Active Courses */}
                <Col xs={24} lg={16}>
                    <Card style={{
                        borderRadius: '16px',
                        border: isDark ? '1px solid #2d3748' : '1px solid #f0f0f0',
                        background: isDark ? '#2d3748' : '#ffffff',
                        boxShadow: isDark ? '0 4px 12px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.06)'
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '24px'
                        }}>
                            <Title level={4} style={{ margin: 0, color: isDark ? '#fff' : '#262626' }}>
                                🎯 Continue Learning
                            </Title>
                            <Button
                                type="text"
                                icon={<ArrowRightOutlined />}
                                style={{ color: '#0BC5EA' }}
                                onClick={() => navigate('/dashboard/courses')}
                            >
                                View All Courses
                            </Button>
                        </div>

                        <Space direction="vertical" size="large" style={{ width: '100%' }}>
                            {activeCourses.map(course => (
                                <Card
                                    key={course.id}
                                    style={{
                                        background: isDark ? '#1a202c' : '#fafafa',
                                        border: isDark ? '1px solid #4a5568' : '1px solid #f0f0f0',
                                        borderRadius: '12px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease'
                                    }}
                                    hoverable
                                    onClick={() => navigate(`/dashboard/courses/${course.id}`)}
                                >
                                    <Row align="middle" gutter={[16, 16]}>
                                        <Col flex="none">
                                            <div style={{
                                                width: '60px',
                                                height: '60px',
                                                borderRadius: '12px',
                                                background: `${course.color}20`,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '24px',
                                                border: `2px solid ${course.color}40`
                                            }}>
                                                {course.thumbnail}
                                            </div>
                                        </Col>
                                        <Col flex="auto">
                                            <div style={{ marginBottom: '8px' }}>
                                                <Title level={5} style={{ margin: 0, color: isDark ? '#fff' : '#262626' }}>
                                                    {course.title}
                                                </Title>
                                                <Text style={{ color: isDark ? '#a0aec0' : '#8c8c8c', fontSize: '14px' }}>
                                                    by {course.instructor}
                                                </Text>
                                            </div>

                                            <div style={{ marginBottom: '12px' }}>
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    marginBottom: '4px'
                                                }}>
                                                    <Text style={{ fontSize: '12px', color: isDark ? '#a0aec0' : '#595959' }}>
                                                        Progress: {course.progress}%
                                                    </Text>
                                                    <Rate disabled defaultValue={course.rating} allowHalf style={{ fontSize: '12px' }} />
                                                </div>
                                                <Progress
                                                    percent={course.progress}
                                                    strokeColor={course.color}
                                                    trailColor={isDark ? '#4a5568' : '#f0f0f0'}
                                                    strokeWidth={6}
                                                    showInfo={false}
                                                />
                                            </div>

                                            <Text style={{ color: isDark ? '#fff' : '#262626', fontSize: '13px' }}>
                                                📚 Next: {course.nextLesson}
                                            </Text>
                                        </Col>
                                    </Row>
                                </Card>
                            ))}
                        </Space>

                        <div style={{ textAlign: 'center', marginTop: '24px' }}>
                            <Button
                                type="primary"
                                size="large"
                                icon={<PlayCircleOutlined />}
                                style={{
                                    background: 'linear-gradient(135deg, #0BC5EA 0%, #40a9ff 100%)',
                                    border: 'none',
                                    borderRadius: '8px',
                                    height: '48px',
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    paddingInline: '32px'
                                }}
                                onClick={() => navigate('/dashboard/courses')}
                            >
                                Explore More Courses
                            </Button>
                        </div>
                    </Card>
                </Col>

                {/* Sidebar */}
                <Col xs={24} lg={8}>
                    <Space direction="vertical" size="large" style={{ width: '100%' }}>
                        {/* Recent Achievements */}
                        <Card style={{
                            borderRadius: '16px',
                            border: isDark ? '1px solid #2d3748' : '1px solid #f0f0f0',
                            background: isDark ? '#2d3748' : '#ffffff',
                            boxShadow: isDark ? '0 4px 12px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.06)'
                        }}>
                            <Title level={4} style={{ marginBottom: '20px', color: isDark ? '#fff' : '#262626' }}>
                                🎉 Recent Achievements
                            </Title>
                            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                                {recentAchievements.map(achievement => (
                                    <div
                                        key={achievement.id}
                                        style={{
                                            background: isDark ? `${achievement.color}15` : `${achievement.color}10`,
                                            borderRadius: '12px',
                                            padding: '16px',
                                            border: `1px solid ${achievement.color}30`
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{
                                                background: `${achievement.color}20`,
                                                borderRadius: '8px',
                                                padding: '8px',
                                                fontSize: '20px'
                                            }}>
                                                {achievement.icon}
                                            </div>
                                            <div>
                                                <Text style={{
                                                    color: isDark ? '#fff' : '#262626',
                                                    fontSize: '14px',
                                                    fontWeight: '600',
                                                    display: 'block'
                                                }}>
                                                    {achievement.title}
                                                </Text>
                                                <Text style={{
                                                    color: isDark ? '#a0aec0' : '#8c8c8c',
                                                    fontSize: '12px'
                                                }}>
                                                    {achievement.description}
                                                </Text>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </Space>
                        </Card>

                        {/* Upcoming Events */}
                        <Card style={{
                            borderRadius: '16px',
                            border: isDark ? '1px solid #2d3748' : '1px solid #f0f0f0',
                            background: isDark ? '#2d3748' : '#ffffff',
                            boxShadow: isDark ? '0 4px 12px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.06)'
                        }}>
                            <Title level={4} style={{ marginBottom: '20px', color: isDark ? '#fff' : '#262626' }}>
                                📅 Upcoming Events
                            </Title>
                            <Timeline
                                items={upcomingEvents.map(event => ({
                                    color: event.type === 'deadline' ? '#ff4d4f' :
                                        event.type === 'workshop' ? '#52c41a' : '#0BC5EA',
                                    children: (
                                        <div>
                                            <Text style={{
                                                color: isDark ? '#fff' : '#262626',
                                                fontSize: '14px',
                                                fontWeight: '500',
                                                display: 'block'
                                            }}>
                                                {event.title}
                                            </Text>
                                            <Text style={{
                                                color: isDark ? '#a0aec0' : '#8c8c8c',
                                                fontSize: '12px'
                                            }}>
                                                {event.time}
                                            </Text>
                                        </div>
                                    )
                                }))}
                            />
                        </Card>

                        {/* Quick Actions */}
                        <Card style={{
                            borderRadius: '16px',
                            border: isDark ? '1px solid #2d3748' : '1px solid #f0f0f0',
                            background: isDark ? '#2d3748' : '#ffffff',
                            boxShadow: isDark ? '0 4px 12px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.06)'
                        }}>
                            <Title level={4} style={{ marginBottom: '20px', color: isDark ? '#fff' : '#262626' }}>
                                ⚡ Quick Actions
                            </Title>
                            <Space direction="vertical" style={{ width: '100%' }}>
                                <Button
                                    block
                                    icon={<BookOutlined />}
                                    style={{
                                        borderRadius: '8px',
                                        height: '40px',
                                        textAlign: 'left',
                                        background: isDark ? '#1a202c' : '#ffffff',
                                        border: isDark ? '1px solid #4a5568' : '1px solid #d9d9d9',
                                        color: isDark ? '#fff' : '#262626'
                                    }}
                                    onClick={() => navigate('/dashboard/courses')}
                                >
                                    Browse All Courses
                                </Button>
                                <Button
                                    block
                                    icon={<TrophyOutlined />}
                                    style={{
                                        borderRadius: '8px',
                                        height: '40px',
                                        textAlign: 'left',
                                        background: isDark ? '#1a202c' : '#ffffff',
                                        border: isDark ? '1px solid #4a5568' : '1px solid #d9d9d9',
                                        color: isDark ? '#fff' : '#262626'
                                    }}
                                >
                                    View Achievements
                                </Button>
                                <Button
                                    block
                                    icon={<CalendarOutlined />}
                                    style={{
                                        borderRadius: '8px',
                                        height: '40px',
                                        textAlign: 'left',
                                        background: isDark ? '#1a202c' : '#ffffff',
                                        border: isDark ? '1px solid #4a5568' : '1px solid #d9d9d9',
                                        color: isDark ? '#fff' : '#262626'
                                    }}
                                >
                                    Schedule Study Time
                                </Button>
                            </Space>
                        </Card>
                    </Space>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;
