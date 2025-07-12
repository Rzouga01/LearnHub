import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Card,
    Form,
    Input,
    Button,
    Avatar,
    Upload,
    Row,
    Col,
    Tabs,
    Table,
    Tag,
    Progress,
    Statistic,
    message,
    Space,
    Typography,
    Divider,
    Modal,
    List,
    Rate,
    Timeline,
    Badge,
    Tooltip,
    Switch,
    Slider,
    Calendar
} from 'antd';
import {
    UserOutlined,
    EditOutlined,
    UploadOutlined,
    BookOutlined,
    TrophyOutlined,
    ClockCircleOutlined,
    SettingOutlined,
    LockOutlined,
    BellOutlined,
    EyeOutlined,
    DeleteOutlined,
    CameraOutlined,
    SaveOutlined,
    StarOutlined,
    FireOutlined,
    ThunderboltOutlined,
    CrownOutlined,
    GiftOutlined,
    CalendarOutlined,
    LineChartOutlined,
    RiseOutlined,
    HeartOutlined,
    ShareAltOutlined,
    DownloadOutlined,
    LinkOutlined,
    MailOutlined,
    PhoneOutlined,
    EnvironmentOutlined,
    GlobalOutlined,
    LinkedinOutlined,
    GithubOutlined,
    TwitterOutlined
} from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;
const { TextArea } = Input;

const StunningProfilePage = () => {
    const { user, updateUser } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [profileForm] = Form.useForm();
    const [passwordForm] = Form.useForm();
    const [editMode, setEditMode] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');

    // Enhanced user data with more engaging stats
    const [profileData, setProfileData] = useState({
        enrollments: [],
        achievements: [],
        stats: {
            coursesCompleted: 12,
            coursesInProgress: 4,
            totalHours: 387,
            certificates: 12,
            rank: 'Knowledge Master',
            level: 47,
            xp: 18750,
            nextLevelXp: 20000,
            streak: 23,
            averageScore: 96.8,
            skillPoints: 2847,
            projectsCompleted: 18
        },
        skills: [
            { name: 'React', level: 95, category: 'Frontend' },
            { name: 'Node.js', level: 88, category: 'Backend' },
            { name: 'Python', level: 92, category: 'Programming' },
            { name: 'AI/ML', level: 85, category: 'Data Science' },
            { name: 'UI/UX Design', level: 78, category: 'Design' },
            { name: 'DevOps', level: 74, category: 'Operations' },
            { name: 'Blockchain', level: 81, category: 'Web3' },
            { name: 'TypeScript', level: 90, category: 'Programming' }
        ],
        recentActivity: [
            {
                id: 1,
                type: 'achievement',
                title: 'Earned "AI Master" Badge',
                description: 'Completed advanced machine learning certification',
                date: '2024-01-15',
                icon: '🤖',
                color: '#1890ff'
            },
            {
                id: 2,
                type: 'course_completed',
                title: 'Advanced React Patterns',
                description: 'Perfect score: 100%',
                date: '2024-01-14',
                icon: '⚛️',
                color: '#52c41a'
            },
            {
                id: 3,
                type: 'project',
                title: 'Built E-commerce Platform',
                description: 'Full-stack project with React & Node.js',
                date: '2024-01-12',
                icon: '🛍️',
                color: '#722ed1'
            },
            {
                id: 4,
                type: 'streak',
                title: '20-Day Learning Streak',
                description: 'Consistent daily learning achievement',
                date: '2024-01-10',
                icon: '🔥',
                color: '#ff4d4f'
            }
        ],
        certificates: [
            {
                id: 1,
                title: 'Advanced React Development',
                issuer: 'LearnHub',
                date: '2024-01-15',
                score: 98,
                credentialId: 'LH-2024-001',
                skills: ['React', 'Redux', 'TypeScript']
            },
            {
                id: 2,
                title: 'AI & Machine Learning',
                issuer: 'LearnHub',
                date: '2024-01-10',
                score: 95,
                credentialId: 'LH-2024-002',
                skills: ['Python', 'TensorFlow', 'Deep Learning']
            },
            {
                id: 3,
                title: 'Full-Stack Web Development',
                issuer: 'LearnHub',
                date: '2024-01-05',
                score: 97,
                credentialId: 'LH-2024-003',
                skills: ['Node.js', 'MongoDB', 'Express']
            }
        ],
        learningGoals: [
            { title: 'Master Kubernetes', progress: 65, target: '2024-02-28' },
            { title: 'Complete AWS Certification', progress: 42, target: '2024-03-15' },
            { title: 'Build 5 Web3 Projects', progress: 80, target: '2024-04-01' },
            { title: 'Learn Advanced AI', progress: 55, target: '2024-05-01' }
        ]
    });

    useEffect(() => {
        if (user) {
            profileForm.setFieldsValue({
                name: user.name,
                email: user.email,
                bio: user.bio || '',
                location: user.location || '',
                website: user.website || '',
                linkedin: user.linkedin || '',
                github: user.github || '',
                twitter: user.twitter || ''
            });
            fetchUserData();
        }
    }, [user, profileForm]);

    const fetchUserData = async () => {
        try {
            setLoading(true);
            // In a real app, you'd fetch this data from your API
            // const response = await api.routes.users.getProfile();
            // setProfileData(response.data);
        } catch (error) {
            message.error('Failed to fetch user data');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateProfile = async (values) => {
        try {
            setLoading(true);
            // const response = await api.routes.users.updateProfile(values);
            // updateUser(response.data);
            message.success('Profile updated successfully');
            setEditMode(false);
        } catch (error) {
            message.error('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdatePassword = async (values) => {
        try {
            setLoading(true);
            // await api.routes.users.updatePassword(values);
            message.success('Password updated successfully');
            passwordForm.resetFields();
        } catch (error) {
            message.error('Failed to update password');
        } finally {
            setLoading(false);
        }
    };

    const getSkillColor = (level) => {
        if (level >= 90) return '#52c41a';
        if (level >= 80) return '#1890ff';
        if (level >= 70) return '#faad14';
        return '#ff4d4f';
    };

    const getLevelProgress = () => {
        return ((profileData.stats.xp - (profileData.stats.level * 400)) / 400) * 100;
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: `
                radial-gradient(circle at 20% 50%, rgba(11, 197, 234, 0.08) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.08) 0%, transparent 50%),
                radial-gradient(circle at 40% 80%, rgba(236, 72, 153, 0.06) 0%, transparent 50%),
                var(--bg-primary)
            `,
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Animated Background Elements */}
            <div style={{
                position: 'absolute',
                top: '5%',
                right: '8%',
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(11, 197, 234, 0.06) 0%, transparent 70%)',
                borderRadius: '50%',
                animation: 'float 12s ease-in-out infinite',
                zIndex: 0
            }} />
            <div style={{
                position: 'absolute',
                bottom: '10%',
                left: '5%',
                width: '250px',
                height: '250px',
                background: 'radial-gradient(circle, rgba(139, 92, 246, 0.05) 0%, transparent 70%)',
                borderRadius: '50%',
                animation: 'float 15s ease-in-out infinite reverse',
                zIndex: 0
            }} />

            <div style={{ position: 'relative', zIndex: 1, padding: '24px' }}>
                {/* Glass Header */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '32px',
                    padding: '20px 32px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                }}>
                    <Title level={2} style={{
                        color: 'var(--text-primary)',
                        margin: 0,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px'
                    }}>
                        👤 My Profile
                    </Title>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                        <Button
                            onClick={() => navigate('/dashboard')}
                            style={{
                                background: 'linear-gradient(135deg, var(--accent-primary) 0%, #8b5cf6 100%)',
                                border: 'none',
                                borderRadius: '16px',
                                color: 'white',
                                fontWeight: '600',
                                height: '44px',
                                paddingInline: '24px'
                            }}
                        >
                            🏠 Back to Dashboard
                        </Button>
                    </div>
                </div>

                <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                    {/* Profile Hero Section */}
                    <div style={{
                        background: 'linear-gradient(135deg, rgba(11, 197, 234, 0.1) 0%, rgba(139, 92, 246, 0.1) 50%, rgba(236, 72, 153, 0.1) 100%)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '32px',
                        padding: '48px',
                        marginBottom: '32px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        {/* Pattern Background */}
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundImage: `
                                radial-gradient(circle at 25px 25px, rgba(11, 197, 234, 0.08) 2px, transparent 2px),
                                radial-gradient(circle at 75px 75px, rgba(139, 92, 246, 0.06) 2px, transparent 2px)
                            `,
                            backgroundSize: '100px 100px',
                            animation: 'backgroundShift 25s linear infinite',
                            opacity: 0.5
                        }} />

                        <Row align="middle" style={{ position: 'relative', zIndex: 1 }}>
                            <Col xs={24} lg={8} style={{ textAlign: 'center', marginBottom: { xs: '32px', lg: 0 } }}>
                                <div style={{ position: 'relative', display: 'inline-block' }}>
                                    <Avatar
                                        size={180}
                                        src={user?.avatar}
                                        icon={<UserOutlined />}
                                        style={{
                                            border: '6px solid rgba(255, 255, 255, 0.2)',
                                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                                            background: 'linear-gradient(135deg, var(--accent-primary) 0%, #8b5cf6 100%)'
                                        }}
                                    />
                                    <Button
                                        shape="circle"
                                        icon={<CameraOutlined />}
                                        style={{
                                            position: 'absolute',
                                            bottom: '10px',
                                            right: '10px',
                                            background: 'linear-gradient(135deg, var(--accent-primary) 0%, #8b5cf6 100%)',
                                            border: 'none',
                                            color: 'white',
                                            boxShadow: '0 4px 12px rgba(11, 197, 234, 0.3)'
                                        }}
                                    />
                                </div>

                                {/* Level & XP */}
                                <div style={{
                                    marginTop: '24px',
                                    padding: '16px 24px',
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    borderRadius: '16px',
                                    backdropFilter: 'blur(10px)'
                                }}>
                                    <Text style={{
                                        color: 'var(--text-secondary)',
                                        fontSize: '14px',
                                        display: 'block',
                                        marginBottom: '8px'
                                    }}>
                                        Level {profileData.stats.level}
                                    </Text>
                                    <Progress
                                        percent={getLevelProgress()}
                                        strokeColor={{
                                            '0%': 'var(--accent-primary)',
                                            '100%': '#8b5cf6',
                                        }}
                                        trailColor="rgba(255, 255, 255, 0.1)"
                                        strokeWidth={8}
                                        showInfo={false}
                                    />
                                    <Text style={{
                                        color: 'var(--text-muted)',
                                        fontSize: '12px',
                                        marginTop: '8px',
                                        display: 'block'
                                    }}>
                                        {profileData.stats.nextLevelXp - profileData.stats.xp} XP to Level {profileData.stats.level + 1}
                                    </Text>
                                </div>
                            </Col>

                            <Col xs={24} lg={16}>
                                <div style={{ paddingLeft: { lg: '48px' } }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                                        <Title level={1} style={{
                                            color: 'var(--text-primary)',
                                            margin: 0,
                                            background: 'linear-gradient(135deg, var(--accent-primary) 0%, #8b5cf6 50%, #ec4899 100%)',
                                            backgroundClip: 'text',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            fontSize: '3rem',
                                            fontWeight: '800'
                                        }}>
                                            {user?.name || 'User'}
                                        </Title>
                                        <Badge count={profileData.stats.rank} style={{
                                            background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                                            color: '#000',
                                            fontWeight: '600',
                                            fontSize: '12px'
                                        }} />
                                    </div>

                                    <Text style={{
                                        fontSize: '18px',
                                        color: 'var(--text-secondary)',
                                        display: 'block',
                                        marginBottom: '16px',
                                        lineHeight: '1.6'
                                    }}>
                                        {user?.bio || 'Passionate learner exploring the frontiers of technology and innovation. Constantly evolving, constantly growing. 🚀'}
                                    </Text>

                                    <Space size="large" wrap style={{ marginBottom: '24px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <EnvironmentOutlined style={{ color: 'var(--accent-primary)' }} />
                                            <Text style={{ color: 'var(--text-secondary)' }}>San Francisco, CA</Text>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <CalendarOutlined style={{ color: 'var(--accent-primary)' }} />
                                            <Text style={{ color: 'var(--text-secondary)' }}>Joined January 2023</Text>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <FireOutlined style={{ color: '#ff4d4f' }} />
                                            <Text style={{ color: 'var(--text-secondary)' }}>{profileData.stats.streak} day streak</Text>
                                        </div>
                                    </Space>

                                    {/* Social Links */}
                                    <Space size="middle">
                                        <Button
                                            icon={<LinkedinOutlined />}
                                            shape="circle"
                                            size="large"
                                            style={{
                                                background: 'rgba(0, 119, 181, 0.1)',
                                                border: '1px solid rgba(0, 119, 181, 0.3)',
                                                color: '#0077b5'
                                            }}
                                        />
                                        <Button
                                            icon={<GithubOutlined />}
                                            shape="circle"
                                            size="large"
                                            style={{
                                                background: 'rgba(255, 255, 255, 0.1)',
                                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                                color: 'var(--text-primary)'
                                            }}
                                        />
                                        <Button
                                            icon={<TwitterOutlined />}
                                            shape="circle"
                                            size="large"
                                            style={{
                                                background: 'rgba(29, 161, 242, 0.1)',
                                                border: '1px solid rgba(29, 161, 242, 0.3)',
                                                color: '#1da1f2'
                                            }}
                                        />
                                        <Button
                                            icon={<GlobalOutlined />}
                                            shape="circle"
                                            size="large"
                                            style={{
                                                background: 'rgba(139, 92, 246, 0.1)',
                                                border: '1px solid rgba(139, 92, 246, 0.3)',
                                                color: '#8b5cf6'
                                            }}
                                        />
                                    </Space>

                                    {/* Quick Actions */}
                                    <div style={{ marginTop: '32px' }}>
                                        <Space size="middle" wrap>
                                            <Button
                                                type="primary"
                                                icon={<EditOutlined />}
                                                onClick={() => setEditMode(true)}
                                                style={{
                                                    background: 'linear-gradient(135deg, var(--accent-primary) 0%, #8b5cf6 100%)',
                                                    border: 'none',
                                                    borderRadius: '16px',
                                                    height: '44px',
                                                    fontWeight: '600'
                                                }}
                                            >
                                                Edit Profile
                                            </Button>
                                            <Button
                                                icon={<ShareAltOutlined />}
                                                style={{
                                                    borderRadius: '16px',
                                                    height: '44px',
                                                    background: 'rgba(255, 255, 255, 0.1)',
                                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                                    color: 'var(--text-primary)'
                                                }}
                                            >
                                                Share Profile
                                            </Button>
                                            <Button
                                                icon={<DownloadOutlined />}
                                                style={{
                                                    borderRadius: '16px',
                                                    height: '44px',
                                                    background: 'rgba(255, 255, 255, 0.1)',
                                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                                    color: 'var(--text-primary)'
                                                }}
                                            >
                                                Export CV
                                            </Button>
                                        </Space>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>

                    {/* Stats Overview Cards */}
                    <Row gutter={[24, 24]} style={{ marginBottom: '32px' }}>
                        <Col xs={12} sm={8} lg={4}>
                            <Card style={{
                                background: 'linear-gradient(135deg, rgba(11, 197, 234, 0.1) 0%, rgba(11, 197, 234, 0.05) 100%)',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid rgba(11, 197, 234, 0.2)',
                                borderRadius: '20px',
                                textAlign: 'center',
                                padding: '8px',
                                transition: 'all 0.3s ease'
                            }}>
                                <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🎯</div>
                                <Statistic
                                    title={<span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Completed</span>}
                                    value={profileData.stats.coursesCompleted}
                                    valueStyle={{ color: 'var(--accent-primary)', fontSize: '24px', fontWeight: '800' }}
                                />
                            </Card>
                        </Col>
                        <Col xs={12} sm={8} lg={4}>
                            <Card style={{
                                background: 'linear-gradient(135deg, rgba(82, 196, 26, 0.1) 0%, rgba(82, 196, 26, 0.05) 100%)',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid rgba(82, 196, 26, 0.2)',
                                borderRadius: '20px',
                                textAlign: 'center',
                                padding: '8px',
                                transition: 'all 0.3s ease'
                            }}>
                                <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>⏱️</div>
                                <Statistic
                                    title={<span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Hours</span>}
                                    value={profileData.stats.totalHours}
                                    valueStyle={{ color: '#52c41a', fontSize: '24px', fontWeight: '800' }}
                                />
                            </Card>
                        </Col>
                        <Col xs={12} sm={8} lg={4}>
                            <Card style={{
                                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid rgba(139, 92, 246, 0.2)',
                                borderRadius: '20px',
                                textAlign: 'center',
                                padding: '8px',
                                transition: 'all 0.3s ease'
                            }}>
                                <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🏆</div>
                                <Statistic
                                    title={<span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Certificates</span>}
                                    value={profileData.stats.certificates}
                                    valueStyle={{ color: '#8b5cf6', fontSize: '24px', fontWeight: '800' }}
                                />
                            </Card>
                        </Col>
                        <Col xs={12} sm={8} lg={4}>
                            <Card style={{
                                background: 'linear-gradient(135deg, rgba(255, 77, 79, 0.1) 0%, rgba(255, 77, 79, 0.05) 100%)',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid rgba(255, 77, 79, 0.2)',
                                borderRadius: '20px',
                                textAlign: 'center',
                                padding: '8px',
                                transition: 'all 0.3s ease'
                            }}>
                                <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🔥</div>
                                <Statistic
                                    title={<span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Streak</span>}
                                    value={profileData.stats.streak}
                                    suffix="days"
                                    valueStyle={{ color: '#ff4d4f', fontSize: '24px', fontWeight: '800' }}
                                />
                            </Card>
                        </Col>
                        <Col xs={12} sm={8} lg={4}>
                            <Card style={{
                                background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(236, 72, 153, 0.05) 100%)',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid rgba(236, 72, 153, 0.2)',
                                borderRadius: '20px',
                                textAlign: 'center',
                                padding: '8px',
                                transition: 'all 0.3s ease'
                            }}>
                                <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>📊</div>
                                <Statistic
                                    title={<span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Avg Score</span>}
                                    value={profileData.stats.averageScore}
                                    suffix="%"
                                    valueStyle={{ color: '#ec4899', fontSize: '24px', fontWeight: '800' }}
                                />
                            </Card>
                        </Col>
                        <Col xs={12} sm={8} lg={4}>
                            <Card style={{
                                background: 'linear-gradient(135deg, rgba(250, 173, 20, 0.1) 0%, rgba(250, 173, 20, 0.05) 100%)',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid rgba(250, 173, 20, 0.2)',
                                borderRadius: '20px',
                                textAlign: 'center',
                                padding: '8px',
                                transition: 'all 0.3s ease'
                            }}>
                                <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>⚡</div>
                                <Statistic
                                    title={<span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Skill Points</span>}
                                    value={profileData.stats.skillPoints}
                                    valueStyle={{ color: '#faad14', fontSize: '24px', fontWeight: '800' }}
                                />
                            </Card>
                        </Col>
                    </Row>

                    {/* Main Content Tabs */}
                    <Card style={{
                        background: 'rgba(255, 255, 255, 0.08)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '24px',
                        padding: '8px'
                    }}>
                        <Tabs
                            activeKey={activeTab}
                            onChange={setActiveTab}
                            size="large"
                            style={{
                                '.ant-tabs-tab': {
                                    fontSize: '16px',
                                    fontWeight: '600'
                                }
                            }}
                        >
                            <TabPane tab={<span><TrophyOutlined /> Skills & Achievements</span>} key="skills">
                                <Row gutter={[32, 32]}>
                                    {/* Skills */}
                                    <Col xs={24} lg={14}>
                                        <Title level={4} style={{ color: 'var(--text-primary)', marginBottom: '24px' }}>
                                            🎯 Skills Mastery
                                        </Title>
                                        <Row gutter={[16, 16]}>
                                            {profileData.skills.map((skill, index) => (
                                                <Col xs={24} sm={12} key={index}>
                                                    <div style={{
                                                        background: 'rgba(255, 255, 255, 0.05)',
                                                        borderRadius: '16px',
                                                        padding: '20px',
                                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                                        transition: 'all 0.3s ease'
                                                    }}>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                                            <Text style={{ color: 'var(--text-primary)', fontWeight: '600' }}>
                                                                {skill.name}
                                                            </Text>
                                                            <Text style={{ color: getSkillColor(skill.level), fontWeight: '700' }}>
                                                                {skill.level}%
                                                            </Text>
                                                        </div>
                                                        <Progress
                                                            percent={skill.level}
                                                            strokeColor={getSkillColor(skill.level)}
                                                            trailColor="rgba(255, 255, 255, 0.1)"
                                                            strokeWidth={8}
                                                            showInfo={false}
                                                        />
                                                        <Text style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
                                                            {skill.category}
                                                        </Text>
                                                    </div>
                                                </Col>
                                            ))}
                                        </Row>
                                    </Col>

                                    {/* Recent Activity */}
                                    <Col xs={24} lg={10}>
                                        <Title level={4} style={{ color: 'var(--text-primary)', marginBottom: '24px' }}>
                                            🎉 Recent Activity
                                        </Title>
                                        <Timeline>
                                            {profileData.recentActivity.map(activity => (
                                                <Timeline.Item
                                                    key={activity.id}
                                                    dot={
                                                        <div style={{
                                                            background: activity.color,
                                                            borderRadius: '50%',
                                                            width: '32px',
                                                            height: '32px',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            fontSize: '16px'
                                                        }}>
                                                            {activity.icon}
                                                        </div>
                                                    }
                                                >
                                                    <div style={{
                                                        background: 'rgba(255, 255, 255, 0.05)',
                                                        borderRadius: '12px',
                                                        padding: '16px',
                                                        marginBottom: '12px'
                                                    }}>
                                                        <Text style={{
                                                            color: 'var(--text-primary)',
                                                            fontWeight: '600',
                                                            display: 'block',
                                                            marginBottom: '4px'
                                                        }}>
                                                            {activity.title}
                                                        </Text>
                                                        <Text style={{
                                                            color: 'var(--text-secondary)',
                                                            fontSize: '14px',
                                                            display: 'block',
                                                            marginBottom: '8px'
                                                        }}>
                                                            {activity.description}
                                                        </Text>
                                                        <Text style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
                                                            {activity.date}
                                                        </Text>
                                                    </div>
                                                </Timeline.Item>
                                            ))}
                                        </Timeline>
                                    </Col>
                                </Row>
                            </TabPane>

                            <TabPane tab={<span><BookOutlined /> Certificates</span>} key="certificates">
                                <Title level={4} style={{ color: 'var(--text-primary)', marginBottom: '24px' }}>
                                    🏆 Earned Certificates
                                </Title>
                                <Row gutter={[24, 24]}>
                                    {profileData.certificates.map(cert => (
                                        <Col xs={24} sm={12} lg={8} key={cert.id}>
                                            <Card style={{
                                                background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 165, 0, 0.05) 100%)',
                                                border: '2px solid rgba(255, 215, 0, 0.3)',
                                                borderRadius: '20px',
                                                padding: '8px',
                                                transition: 'all 0.3s ease',
                                                cursor: 'pointer'
                                            }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.transform = 'translateY(-4px)';
                                                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(255, 215, 0, 0.2)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.transform = 'translateY(0)';
                                                    e.currentTarget.style.boxShadow = 'none';
                                                }}
                                            >
                                                <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                                                    <div style={{
                                                        fontSize: '3rem',
                                                        marginBottom: '12px',
                                                        background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                                                        borderRadius: '50%',
                                                        width: '80px',
                                                        height: '80px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        margin: '0 auto',
                                                        boxShadow: '0 4px 16px rgba(255, 215, 0, 0.3)'
                                                    }}>
                                                        🏆
                                                    </div>
                                                </div>
                                                <Title level={5} style={{
                                                    color: 'var(--text-primary)',
                                                    textAlign: 'center',
                                                    marginBottom: '8px'
                                                }}>
                                                    {cert.title}
                                                </Title>
                                                <Text style={{
                                                    color: 'var(--text-secondary)',
                                                    display: 'block',
                                                    textAlign: 'center',
                                                    marginBottom: '12px'
                                                }}>
                                                    {cert.issuer} • {cert.date}
                                                </Text>
                                                <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                                                    <Tag color="gold">Score: {cert.score}%</Tag>
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
                                                    {cert.skills.map(skill => (
                                                        <Tag key={skill} color="blue" style={{ margin: '2px' }}>
                                                            {skill}
                                                        </Tag>
                                                    ))}
                                                </div>
                                                <div style={{ textAlign: 'center', marginTop: '16px' }}>
                                                    <Button size="small" icon={<DownloadOutlined />}>
                                                        Download
                                                    </Button>
                                                </div>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            </TabPane>

                            <TabPane tab={<span><RiseOutlined /> Learning Goals</span>} key="goals">
                                <Title level={4} style={{ color: 'var(--text-primary)', marginBottom: '24px' }}>
                                    🎯 Learning Goals & Progress
                                </Title>
                                <Row gutter={[24, 24]}>
                                    {profileData.learningGoals.map((goal, index) => (
                                        <Col xs={24} sm={12} key={index}>
                                            <Card style={{
                                                background: 'rgba(255, 255, 255, 0.05)',
                                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                                borderRadius: '16px',
                                                padding: '8px'
                                            }}>
                                                <div style={{ marginBottom: '16px' }}>
                                                    <Text style={{
                                                        color: 'var(--text-primary)',
                                                        fontSize: '16px',
                                                        fontWeight: '600',
                                                        display: 'block',
                                                        marginBottom: '8px'
                                                    }}>
                                                        {goal.title}
                                                    </Text>
                                                    <Text style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                                                        Target: {goal.target}
                                                    </Text>
                                                </div>
                                                <Progress
                                                    percent={goal.progress}
                                                    strokeColor={{
                                                        '0%': 'var(--accent-primary)',
                                                        '100%': '#8b5cf6',
                                                    }}
                                                    trailColor="rgba(255, 255, 255, 0.1)"
                                                    strokeWidth={12}
                                                />
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            </TabPane>

                            <TabPane tab={<span><SettingOutlined /> Settings</span>} key="settings">
                                <Row gutter={[32, 32]}>
                                    <Col xs={24} lg={12}>
                                        <Title level={4} style={{ color: 'var(--text-primary)', marginBottom: '24px' }}>
                                            👤 Profile Information
                                        </Title>
                                        <Form
                                            form={profileForm}
                                            layout="vertical"
                                            onFinish={handleUpdateProfile}
                                            disabled={!editMode}
                                        >
                                            <Form.Item label="Full Name" name="name">
                                                <Input size="large" className="theme-input" />
                                            </Form.Item>
                                            <Form.Item label="Email" name="email">
                                                <Input size="large" className="theme-input" disabled />
                                            </Form.Item>
                                            <Form.Item label="Bio" name="bio">
                                                <TextArea rows={4} className="theme-input" />
                                            </Form.Item>
                                            <Form.Item label="Location" name="location">
                                                <Input size="large" className="theme-input" />
                                            </Form.Item>
                                            <Form.Item label="Website" name="website">
                                                <Input size="large" className="theme-input" />
                                            </Form.Item>

                                            {editMode && (
                                                <Space>
                                                    <Button
                                                        type="primary"
                                                        htmlType="submit"
                                                        loading={loading}
                                                        icon={<SaveOutlined />}
                                                        style={{
                                                            background: 'linear-gradient(135deg, var(--accent-primary) 0%, #8b5cf6 100%)',
                                                            border: 'none',
                                                            borderRadius: '12px'
                                                        }}
                                                    >
                                                        Save Changes
                                                    </Button>
                                                    <Button onClick={() => setEditMode(false)}>
                                                        Cancel
                                                    </Button>
                                                </Space>
                                            )}
                                        </Form>
                                    </Col>

                                    <Col xs={24} lg={12}>
                                        <Title level={4} style={{ color: 'var(--text-primary)', marginBottom: '24px' }}>
                                            🔒 Security & Privacy
                                        </Title>
                                        <Form
                                            form={passwordForm}
                                            layout="vertical"
                                            onFinish={handleUpdatePassword}
                                        >
                                            <Form.Item
                                                label="Current Password"
                                                name="currentPassword"
                                                rules={[{ required: true, message: 'Please enter current password' }]}
                                            >
                                                <Input.Password size="large" className="theme-input" />
                                            </Form.Item>
                                            <Form.Item
                                                label="New Password"
                                                name="newPassword"
                                                rules={[{ required: true, message: 'Please enter new password' }]}
                                            >
                                                <Input.Password size="large" className="theme-input" />
                                            </Form.Item>
                                            <Form.Item
                                                label="Confirm New Password"
                                                name="confirmPassword"
                                                dependencies={['newPassword']}
                                                rules={[
                                                    { required: true, message: 'Please confirm new password' },
                                                    ({ getFieldValue }) => ({
                                                        validator(_, value) {
                                                            if (!value || getFieldValue('newPassword') === value) {
                                                                return Promise.resolve();
                                                            }
                                                            return Promise.reject(new Error('Passwords do not match'));
                                                        },
                                                    }),
                                                ]}
                                            >
                                                <Input.Password size="large" className="theme-input" />
                                            </Form.Item>
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                                loading={loading}
                                                icon={<LockOutlined />}
                                                style={{
                                                    background: 'linear-gradient(135deg, #ff4d4f 0%, #ff7875 100%)',
                                                    border: 'none',
                                                    borderRadius: '12px'
                                                }}
                                            >
                                                Update Password
                                            </Button>
                                        </Form>

                                        <Divider />

                                        <Title level={5} style={{ color: 'var(--text-primary)', marginBottom: '16px' }}>
                                            🔔 Notification Preferences
                                        </Title>
                                        <Space direction="vertical" style={{ width: '100%' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Text style={{ color: 'var(--text-primary)' }}>Email Notifications</Text>
                                                <Switch defaultChecked />
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Text style={{ color: 'var(--text-primary)' }}>Course Reminders</Text>
                                                <Switch defaultChecked />
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Text style={{ color: 'var(--text-primary)' }}>Achievement Alerts</Text>
                                                <Switch defaultChecked />
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Text style={{ color: 'var(--text-primary)' }}>Marketing Emails</Text>
                                                <Switch />
                                            </div>
                                        </Space>
                                    </Col>
                                </Row>
                            </TabPane>
                        </Tabs>
                    </Card>
                </div>
            </div>

            {/* Edit Profile Modal */}
            <Modal
                title="✨ Edit Profile"
                open={editMode}
                onCancel={() => setEditMode(false)}
                footer={null}
                width={600}
                style={{
                    top: 50
                }}
            >
                <Form
                    form={profileForm}
                    layout="vertical"
                    onFinish={handleUpdateProfile}
                    style={{ marginTop: '24px' }}
                >
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={12}>
                            <Form.Item label="Full Name" name="name">
                                <Input size="large" className="theme-input" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                            <Form.Item label="Email" name="email">
                                <Input size="large" className="theme-input" disabled />
                            </Form.Item>
                        </Col>
                        <Col xs={24}>
                            <Form.Item label="Bio" name="bio">
                                <TextArea rows={3} className="theme-input" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                            <Form.Item label="Location" name="location">
                                <Input size="large" className="theme-input" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                            <Form.Item label="Website" name="website">
                                <Input size="large" className="theme-input" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <div style={{ textAlign: 'right', marginTop: '24px' }}>
                        <Space>
                            <Button onClick={() => setEditMode(false)}>
                                Cancel
                            </Button>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                icon={<SaveOutlined />}
                                style={{
                                    background: 'linear-gradient(135deg, var(--accent-primary) 0%, #8b5cf6 100%)',
                                    border: 'none',
                                    borderRadius: '12px'
                                }}
                            >
                                Save Changes
                            </Button>
                        </Space>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};

export default StunningProfilePage;
