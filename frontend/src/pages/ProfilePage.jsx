import React, { useState, useEffect } from 'react';
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
    List
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
    DeleteOutlined
} from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

const ProfilePage = () => {
    const { user, updateUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [profileForm] = Form.useForm();
    const [passwordForm] = Form.useForm();
    const [enrollments, setEnrollments] = useState([]);
    const [achievements, setAchievements] = useState([]);
    const [stats, setStats] = useState({
        coursesCompleted: 0,
        coursesInProgress: 0,
        totalHours: 0,
        certificates: 0
    });

    useEffect(() => {
        if (user) {
            profileForm.setFieldsValue({
                name: user.name,
                email: user.email,
                role: user.role
            });
            fetchUserData();
        }
    }, [user, profileForm]);

    const fetchUserData = async () => {
        try {
            setLoading(true);
            // Fetch user enrollments
            const enrollmentsResponse = await api.routes.enrollments.getAll();
            setEnrollments(enrollmentsResponse.data.filter(e => e.user_id === user.id));

            // Calculate stats
            const completed = enrollmentsResponse.data.filter(e => e.status === 'completed').length;
            const inProgress = enrollmentsResponse.data.filter(e => e.status === 'in_progress').length;

            setStats({
                coursesCompleted: completed,
                coursesInProgress: inProgress,
                totalHours: completed * 20 + inProgress * 10, // Mock calculation
                certificates: completed
            });
        } catch (error) {
            message.error('Failed to fetch user data');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateProfile = async (values) => {
        try {
            setLoading(true);
            const response = await api.routes.users.updateProfile(values);
            updateUser(response.data);
            message.success('Profile updated successfully');
        } catch (error) {
            message.error('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdatePassword = async (values) => {
        try {
            setLoading(true);
            await api.routes.users.updatePassword(values);
            message.success('Password updated successfully');
            passwordForm.resetFields();
        } catch (error) {
            message.error('Failed to update password');
        } finally {
            setLoading(false);
        }
    };

    const handleAvatarUpload = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            message.success('Avatar updated successfully');
            setLoading(false);
        }
    };

    const enrollmentColumns = [
        {
            title: 'Course',
            dataIndex: 'course_name',
            key: 'course_name',
            render: (text) => <Text strong>{text}</Text>
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                const color = status === 'completed' ? 'green' :
                    status === 'in_progress' ? 'blue' : 'orange';
                return <Tag color={color}>{status.replace('_', ' ').toUpperCase()}</Tag>;
            }
        },
        {
            title: 'Progress',
            dataIndex: 'progress',
            key: 'progress',
            render: (progress) => <Progress percent={progress || 0} size="small" />
        },
        {
            title: 'Enrolled Date',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (date) => new Date(date).toLocaleDateString()
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button icon={<EyeOutlined />} size="small">View</Button>
                    <Button icon={<DeleteOutlined />} size="small" danger>Unenroll</Button>
                </Space>
            )
        }
    ];

    const mockAchievements = [
        { id: 1, title: 'First Course Completed', description: 'Completed your first course', icon: '🎉', date: '2024-01-15' },
        { id: 2, title: 'Quick Learner', description: 'Completed 3 courses in a month', icon: '⚡', date: '2024-02-20' },
        { id: 3, title: 'Dedicated Student', description: 'Logged in for 30 consecutive days', icon: '🔥', date: '2024-03-10' },
    ];

    return (
        <div className="max-w-7xl mx-auto p-6">
            <div className="mb-6">
                <Title level={2}>My Profile</Title>
                <Paragraph>Manage your account settings and track your learning progress</Paragraph>
            </div>

            <Row gutter={[24, 24]}>
                {/* Profile Summary Card */}
                <Col xs={24} lg={8}>
                    <Card>
                        <div className="text-center mb-6">
                            <Avatar size={100} icon={<UserOutlined />} className="mb-4" />
                            <Upload
                                name="avatar"
                                listType="picture"
                                className="avatar-uploader"
                                showUploadList={false}
                                onChange={handleAvatarUpload}
                            >
                                <Button icon={<UploadOutlined />} size="small">
                                    Change Avatar
                                </Button>
                            </Upload>
                            <div className="mt-4">
                                <Title level={4} className="mb-1">{user?.name}</Title>
                                <Text type="secondary" className="text-sm">
                                    {user?.email}
                                </Text>
                                <div className="mt-2">
                                    <Tag color="blue">{user?.role?.toUpperCase()}</Tag>
                                </div>
                            </div>
                        </div>

                        <Divider />

                        {/* Quick Stats */}
                        <Row gutter={[16, 16]}>
                            <Col span={12}>
                                <Statistic
                                    title="Completed"
                                    value={stats.coursesCompleted}
                                    prefix={<TrophyOutlined />}
                                    valueStyle={{ color: '#52c41a' }}
                                />
                            </Col>
                            <Col span={12}>
                                <Statistic
                                    title="In Progress"
                                    value={stats.coursesInProgress}
                                    prefix={<ClockCircleOutlined />}
                                    valueStyle={{ color: '#1890ff' }}
                                />
                            </Col>
                            <Col span={12}>
                                <Statistic
                                    title="Total Hours"
                                    value={stats.totalHours}
                                    suffix="hrs"
                                    valueStyle={{ color: '#722ed1' }}
                                />
                            </Col>
                            <Col span={12}>
                                <Statistic
                                    title="Certificates"
                                    value={stats.certificates}
                                    prefix={<BookOutlined />}
                                    valueStyle={{ color: '#fa8c16' }}
                                />
                            </Col>
                        </Row>
                    </Card>
                </Col>

                {/* Main Content */}
                <Col xs={24} lg={16}>
                    <Card>
                        <Tabs defaultActiveKey="profile" type="card">
                            <TabPane tab={<span><UserOutlined />Profile Settings</span>} key="profile">
                                <Form
                                    form={profileForm}
                                    layout="vertical"
                                    onFinish={handleUpdateProfile}
                                    className="max-w-lg"
                                >
                                    <Form.Item
                                        label="Full Name"
                                        name="name"
                                        rules={[{ required: true, message: 'Please input your name!' }]}
                                    >
                                        <Input size="large" />
                                    </Form.Item>

                                    <Form.Item
                                        label="Email"
                                        name="email"
                                        rules={[
                                            { required: true, message: 'Please input your email!' },
                                            { type: 'email', message: 'Please enter a valid email!' }
                                        ]}
                                    >
                                        <Input size="large" />
                                    </Form.Item>

                                    <Form.Item
                                        label="Role"
                                        name="role"
                                    >
                                        <Input size="large" disabled />
                                    </Form.Item>

                                    <Form.Item
                                        label="Bio"
                                        name="bio"
                                    >
                                        <Input.TextArea rows={4} placeholder="Tell us about yourself..." />
                                    </Form.Item>

                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" loading={loading} size="large">
                                            <EditOutlined /> Update Profile
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </TabPane>

                            <TabPane tab={<span><LockOutlined />Security</span>} key="security">
                                <div className="max-w-lg">
                                    <Title level={4}>Change Password</Title>
                                    <Form
                                        form={passwordForm}
                                        layout="vertical"
                                        onFinish={handleUpdatePassword}
                                    >
                                        <Form.Item
                                            label="Current Password"
                                            name="current_password"
                                            rules={[{ required: true, message: 'Please input your current password!' }]}
                                        >
                                            <Input.Password size="large" />
                                        </Form.Item>

                                        <Form.Item
                                            label="New Password"
                                            name="new_password"
                                            rules={[
                                                { required: true, message: 'Please input your new password!' },
                                                { min: 8, message: 'Password must be at least 8 characters!' }
                                            ]}
                                        >
                                            <Input.Password size="large" />
                                        </Form.Item>

                                        <Form.Item
                                            label="Confirm New Password"
                                            name="confirm_password"
                                            rules={[
                                                { required: true, message: 'Please confirm your new password!' },
                                                ({ getFieldValue }) => ({
                                                    validator(_, value) {
                                                        if (!value || getFieldValue('new_password') === value) {
                                                            return Promise.resolve();
                                                        }
                                                        return Promise.reject(new Error('Passwords do not match!'));
                                                    },
                                                }),
                                            ]}
                                        >
                                            <Input.Password size="large" />
                                        </Form.Item>

                                        <Form.Item>
                                            <Button type="primary" htmlType="submit" loading={loading} size="large">
                                                <LockOutlined /> Update Password
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </div>
                            </TabPane>

                            <TabPane tab={<span><BookOutlined />My Courses</span>} key="courses">
                                <Table
                                    columns={enrollmentColumns}
                                    dataSource={enrollments}
                                    rowKey="id"
                                    loading={loading}
                                    pagination={{ pageSize: 10 }}
                                />
                            </TabPane>

                            <TabPane tab={<span><TrophyOutlined />Achievements</span>} key="achievements">
                                <List
                                    itemLayout="horizontal"
                                    dataSource={mockAchievements}
                                    renderItem={(item) => (
                                        <List.Item>
                                            <List.Item.Meta
                                                avatar={<div className="text-2xl">{item.icon}</div>}
                                                title={<Text strong>{item.title}</Text>}
                                                description={
                                                    <div>
                                                        <Paragraph className="mb-1">{item.description}</Paragraph>
                                                        <Text type="secondary" className="text-sm">
                                                            Earned on {new Date(item.date).toLocaleDateString()}
                                                        </Text>
                                                    </div>
                                                }
                                            />
                                        </List.Item>
                                    )}
                                />
                            </TabPane>

                            <TabPane tab={<span><SettingOutlined />Preferences</span>} key="preferences">
                                <div className="max-w-lg">
                                    <Title level={4}>Notification Settings</Title>
                                    <Form layout="vertical">
                                        <Form.Item name="email_notifications" valuePropName="checked">
                                            <Button type="text" icon={<BellOutlined />} className="text-left p-0">
                                                Email Notifications
                                            </Button>
                                        </Form.Item>
                                        <Form.Item name="course_reminders" valuePropName="checked">
                                            <Button type="text" icon={<ClockCircleOutlined />} className="text-left p-0">
                                                Course Reminders
                                            </Button>
                                        </Form.Item>
                                        <Form.Item name="marketing_emails" valuePropName="checked">
                                            <Button type="text" icon={<BookOutlined />} className="text-left p-0">
                                                Marketing Emails
                                            </Button>
                                        </Form.Item>
                                    </Form>

                                    <Divider />

                                    <Title level={4}>Privacy Settings</Title>
                                    <Form layout="vertical">
                                        <Form.Item name="profile_visibility" valuePropName="checked">
                                            <Button type="text" icon={<EyeOutlined />} className="text-left p-0">
                                                Make Profile Public
                                            </Button>
                                        </Form.Item>
                                        <Form.Item name="show_progress" valuePropName="checked">
                                            <Button type="text" icon={<TrophyOutlined />} className="text-left p-0">
                                                Show Learning Progress
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </div>
                            </TabPane>
                        </Tabs>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default ProfilePage;
