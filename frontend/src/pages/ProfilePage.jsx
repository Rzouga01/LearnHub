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
    LineChartOutlined
} from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const ProfilePage = () => {
    const { user, updateUser } = useAuth();
    const { isDark } = useTheme();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [activeTab, setActiveTab] = useState('1');

    const [profileData, setProfileData] = useState(null);
    const [loadingProfile, setLoadingProfile] = useState(true);
    const [profileError, setProfileError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            setLoadingProfile(true);
            setProfileError(null);
            try {
                const res = await api.routes.users.getProfile();
                setProfileData(res.data.data || res.data);
            } catch (err) {
                setProfileError('Failed to load profile.');
            } finally {
                setLoadingProfile(false);
            }
        };
        fetchProfile();
    }, []);

    const [recentActivity, setRecentActivity] = useState([]);
    useEffect(() => {
        const fetchActivity = async () => {
            try {
                const res = await api.routes.dashboard.getRecentActivity();
                setRecentActivity(res.data.data || res.data || []);
            } catch (err) {
                setRecentActivity([]);
            }
        };
        fetchActivity();
    }, []);

    const skillsData = profileData?.skills || [];

    const achievementsData = profileData?.achievements || [];

    const learningGoals = [
        { id: 1, title: 'Complete React Advanced Course', progress: 75, target: 100, color: '#E76F51' },
        { id: 2, title: 'Learn TypeScript', progress: 45, target: 100, color: '#2A9D8F' },
        { id: 3, title: 'Build 3 Projects', progress: 2, target: 3, color: '#F4A261' },
        { id: 4, title: 'Earn 5 Certificates', progress: 3, target: 5, color: '#6A994E' }
    ];

    const handleSave = async (values) => {
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            updateUser({ ...user, ...values });
            message.success('Profile updated successfully!');
            setEditMode(false);
        } catch (error) {
            message.error('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const renderProfileHeader = () => (
        <Card className="bg-gradient-to-r from-terracotta-500 to-sage-500 border-0 text-white mb-6">
            <Row align="middle" gutter={[32, 32]}>
                <Col xs={24} md={8}>
                    <div className="text-center">
                        <div className="relative inline-block">
                            <Avatar
                                size={120}
                                src={profileData.avatar}
                                className="bg-white/20 text-white text-4xl"
                            >
                                {profileData.name?.charAt(0)?.toUpperCase()}
                            </Avatar>
                            <Button
                                type="primary"
                                shape="circle"
                                icon={<CameraOutlined />}
                                className="absolute -bottom-2 -right-2 bg-white/20 border-white/40 text-white hover:bg-white/30"
                                size="small"
                            />
                        </div>
                        <Title level={2} className="text-white mt-4 mb-1">
                            {profileData.name}
                        </Title>
                        <Text className="text-white/90 text-lg">
                            {profileData.title}
                        </Text>
                        <br />
                        <Text className="text-white/80">
                            {profileData.company}
                        </Text>
                        <div className="mt-4">
                            <Text className="text-white/80">
                                📍 {profileData.location} • 📅 Joined {profileData.joinedDate}
                            </Text>
                        </div>
                    </div>
                </Col>

                <Col xs={24} md={16}>
                    <div className="space-y-4">
                        <Paragraph className="text-white/90 text-lg">
                            {profileData.bio}
                        </Paragraph>

                        <Row gutter={16}>
                            <Col xs={12} sm={6}>
                                <div className="bg-white/20 rounded-lg p-4 text-center backdrop-blur-sm">
                                    <div className="text-2xl font-bold text-white">
                                        Level {profileData.level}
                                    </div>
                                    <div className="text-white/80 text-sm">
                                        {profileData.totalXP} XP
                                    </div>
                                </div>
                            </Col>
                            <Col xs={12} sm={6}>
                                <div className="bg-white/20 rounded-lg p-4 text-center backdrop-blur-sm">
                                    <div className="text-2xl font-bold text-white flex items-center justify-center gap-1">
                                        <FireOutlined className="text-saffron-300" />
                                        {profileData.currentStreak}
                                    </div>
                                    <div className="text-white/80 text-sm">Day Streak</div>
                                </div>
                            </Col>
                            <Col xs={12} sm={6}>
                                <div className="bg-white/20 rounded-lg p-4 text-center backdrop-blur-sm">
                                    <div className="text-2xl font-bold text-white">
                                        {profileData.completedCourses}
                                    </div>
                                    <div className="text-white/80 text-sm">Completed</div>
                                </div>
                            </Col>
                            <Col xs={12} sm={6}>
                                <div className="bg-white/20 rounded-lg p-4 text-center backdrop-blur-sm">
                                    <div className="text-2xl font-bold text-white">
                                        {profileData.certificates}
                                    </div>
                                    <div className="text-white/80 text-sm">Certificates</div>
                                </div>
                            </Col>
                        </Row>

                        <div className="flex gap-3">
                            <Button
                                icon={<EditOutlined />}
                                onClick={() => setEditMode(true)}
                                className="bg-white/20 border-white/40 text-white hover:bg-white/30"
                            >
                                Edit Profile
                            </Button>
                            <Button
                                icon={<SettingOutlined />}
                                onClick={() => navigate('/settings')}
                                className="bg-white/20 border-white/40 text-white hover:bg-white/30"
                            >
                                Settings
                            </Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </Card>
    );

    const renderStatsOverview = () => (
        <Row gutter={[24, 24]} className="mb-6">
            <Col xs={24} sm={12} lg={6}>
                <Card className="bg-terracotta-50 dark:bg-terracotta-900 border-terracotta-200 dark:border-terracotta-700 text-center">
                    <Statistic
                        title={<span className="text-warm-500 dark:text-warm-300">Learning Hours</span>}
                        value={profileData.learningHours}
                        prefix={<ClockCircleOutlined className="text-terracotta-500" />}
                        suffix="h"
                        valueStyle={{ color: '#E76F51' }}
                    />
                </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
                <Card className="bg-sage-50 dark:bg-sage-900 border-sage-200 dark:border-sage-700 text-center">
                    <Statistic
                        title={<span className="text-warm-500 dark:text-warm-300">Skills Mastered</span>}
                        value={profileData.skillsCount}
                        prefix={<ThunderboltOutlined className="text-sage-500" />}
                        valueStyle={{ color: '#2A9D8F' }}
                    />
                </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
                <Card className="bg-mustard-50 dark:bg-mustard-900 border-mustard-200 dark:border-mustard-700 text-center">
                    <Statistic
                        title={<span className="text-warm-500 dark:text-warm-300">Projects Built</span>}
                        value={profileData.projectsCount}
                        prefix={<BookOutlined className="text-mustard-500" />}
                        valueStyle={{ color: '#F4A261' }}
                    />
                </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
                <Card className="bg-olive-50 dark:bg-olive-900 border-olive-200 dark:border-olive-700 text-center">
                    <Statistic
                        title={<span className="text-warm-500 dark:text-warm-300">Mentorship Hours</span>}
                        value={profileData.mentorshipHours}
                        prefix={<UserOutlined className="text-olive-500" />}
                        suffix="h"
                        valueStyle={{ color: '#6A994E' }}
                    />
                </Card>
            </Col>
        </Row>
    );

    const renderSkillsProgress = () => (
        <Card
            title={<Title level={4} className="text-charcoal-500 dark:text-cream-100 mb-0">Skills Progress</Title>}
            className="bg-white dark:bg-warm-900 border-warm-200 dark:border-warm-700"
        >
            <Row gutter={[16, 16]}>
                {skillsData.map((skill, index) => (
                    <Col key={index} xs={24} sm={12} lg={8}>
                        <div className="bg-cream-50 dark:bg-warm-800 p-4 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                                <Text className="text-charcoal-500 dark:text-cream-100 font-medium">
                                    {skill.name}
                                </Text>
                                <Text className="text-warm-500 dark:text-warm-300">
                                    {skill.level}%
                                </Text>
                            </div>
                            <Progress
                                percent={skill.level}
                                strokeColor={skill.color}
                                trailColor={isDark ? '#4A4341' : '#F1EFED'}
                                size="small"
                                showInfo={false}
                            />
                        </div>
                    </Col>
                ))}
            </Row>
        </Card>
    );

    const renderLearningGoals = () => (
        <Card
            title={<Title level={4} className="text-charcoal-500 dark:text-cream-100 mb-0">Learning Goals</Title>}
            className="bg-white dark:bg-warm-900 border-warm-200 dark:border-warm-700"
        >
            <div className="space-y-4">
                {learningGoals.map((goal) => (
                    <div key={goal.id} className="bg-cream-50 dark:bg-warm-800 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                            <Text className="text-charcoal-500 dark:text-cream-100 font-medium">
                                {goal.title}
                            </Text>
                            <Text className="text-warm-500 dark:text-warm-300">
                                {goal.progress}/{goal.target}
                            </Text>
                        </div>
                        <Progress
                            percent={Math.round((goal.progress / goal.target) * 100)}
                            strokeColor={goal.color}
                            trailColor={isDark ? '#4A4341' : '#F1EFED'}
                            size="small"
                        />
                    </div>
                ))}
            </div>
        </Card>
    );

    const renderAchievements = () => (
        <Card
            title={<Title level={4} className="text-charcoal-500 dark:text-cream-100 mb-0">Achievements</Title>}
            className="bg-white dark:bg-warm-900 border-warm-200 dark:border-warm-700"
        >
            <Row gutter={[16, 16]}>
                {achievementsData.map((achievement) => (
                    <Col key={achievement.id} xs={24} sm={12} lg={6}>
                        <Card
                            className={`text-center ${achievement.color} border-0 ${achievement.earned ? 'shadow-md' : 'opacity-75'
                                }`}
                            size="small"
                        >
                            <div className="text-4xl mb-2">{achievement.icon}</div>
                            <Title level={5} className="text-charcoal-500 dark:text-cream-100 mb-1">
                                {achievement.title}
                            </Title>
                            <Text className="text-warm-600 dark:text-warm-300 text-sm block mb-2">
                                {achievement.description}
                            </Text>
                            {achievement.earned ? (
                                <Badge
                                    status="success"
                                    text={<span className="text-olive-500">Earned</span>}
                                />
                            ) : (
                                <Progress
                                    percent={achievement.progress}
                                    size="small"
                                    strokeColor="#E76F51"
                                />
                            )}
                        </Card>
                    </Col>
                ))}
            </Row>
        </Card>
    );

    const renderRecentActivity = () => (
        <Card
            title={<Title level={4} className="text-charcoal-500 dark:text-cream-100 mb-0">Recent Activity</Title>}
            className="bg-white dark:bg-warm-900 border-warm-200 dark:border-warm-700"
        >
            <Timeline>
                {recentActivity.map((activity) => (
                    <Timeline.Item key={activity.id} dot={activity.icon}>
                        <div className={`p-3 rounded-lg ${activity.color}`}>
                            <Text className="text-charcoal-500 dark:text-cream-100 font-medium block">
                                {activity.title}
                            </Text>
                            <Text className="text-warm-600 dark:text-warm-300 text-sm block">
                                {activity.description}
                            </Text>
                            <Text className="text-warm-500 dark:text-warm-300 text-xs">
                                {activity.timestamp}
                            </Text>
                        </div>
                    </Timeline.Item>
                ))}
            </Timeline>
        </Card>
    );

    if (loadingProfile) return <div className="p-8 text-center text-lg">Loading profile...</div>;
    if (profileError) return <div className="p-8 text-center text-red-500">{profileError}</div>;
    if (!profileData) return null;
    return (
        <div className="min-h-screen bg-cream-100 dark:bg-charcoal-500 p-6 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                {renderProfileHeader()}
                {renderStatsOverview()}

                <Row gutter={[24, 24]}>
                    <Col xs={24} lg={16}>
                        <div className="space-y-6">
                            {renderSkillsProgress()}
                            {renderLearningGoals()}
                            {renderAchievements()}
                        </div>
                    </Col>

                    <Col xs={24} lg={8}>
                        {renderRecentActivity()}
                    </Col>
                </Row>

                {/* Edit Profile Modal */}
                <Modal
                    title="Edit Profile"
                    visible={editMode}
                    onCancel={() => setEditMode(false)}
                    footer={null}
                    width={600}
                >
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSave}
                        initialValues={profileData}
                    >
                        <Form.Item
                            name="name"
                            label={<span className="text-charcoal-500 dark:text-cream-100">Full Name</span>}
                            rules={[{ required: true, message: 'Please enter your name' }]}
                        >
                            <Input className="h-10 bg-cream-50 dark:bg-warm-800 border-warm-200 dark:border-warm-600" />
                        </Form.Item>
                        <Form.Item
                            name="address"
                            label={<span className="text-charcoal-500 dark:text-cream-100">Address</span>}
                        >
                            <Input className="h-10 bg-cream-50 dark:bg-warm-800 border-warm-200 dark:border-warm-600" />
                        </Form.Item>
                        <Form.Item
                            name="dob"
                            label={<span className="text-charcoal-500 dark:text-cream-100">Date of Birth</span>}
                        >
                            <Input type="date" className="h-10 bg-cream-50 dark:bg-warm-800 border-warm-200 dark:border-warm-600" />
                        </Form.Item>
                        <Form.Item
                            name="phone_number"
                            label={<span className="text-charcoal-500 dark:text-cream-100">Phone Number</span>}
                        >
                            <Input className="h-10 bg-cream-50 dark:bg-warm-800 border-warm-200 dark:border-warm-600" />
                        </Form.Item>

                        <Form.Item
                            name="title"
                            label={<span className="text-charcoal-500 dark:text-cream-100">Job Title</span>}
                        >
                            <Input className="h-10 bg-cream-50 dark:bg-warm-800 border-warm-200 dark:border-warm-600" />
                        </Form.Item>

                        <Form.Item
                            name="company"
                            label={<span className="text-charcoal-500 dark:text-cream-100">Company</span>}
                        >
                            <Input className="h-10 bg-cream-50 dark:bg-warm-800 border-warm-200 dark:border-warm-600" />
                        </Form.Item>

                        <Form.Item
                            name="bio"
                            label={<span className="text-charcoal-500 dark:text-cream-100">Bio</span>}
                        >
                            <Input.TextArea
                                rows={4}
                                className="bg-cream-50 dark:bg-warm-800 border-warm-200 dark:border-warm-600"
                            />
                        </Form.Item>

                        <Form.Item
                            name="location"
                            label={<span className="text-charcoal-500 dark:text-cream-100">Location</span>}
                        >
                            <Input className="h-10 bg-cream-50 dark:bg-warm-800 border-warm-200 dark:border-warm-600" />
                        </Form.Item>

                        <div className="flex justify-end gap-3">
                            <Button onClick={() => setEditMode(false)}>
                                Cancel
                            </Button>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                className="bg-terracotta-500 hover:bg-terracotta-600 border-terracotta-500"
                            >
                                Save Changes
                            </Button>
                        </div>
                    </Form>
                </Modal>
            </div>
        </div>
    );
};

export default ProfilePage;
