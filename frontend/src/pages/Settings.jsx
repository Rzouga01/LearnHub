import React, { useState } from 'react';
import {
    Card,
    Form,
    Input,
    Button,
    Switch,
    Select,
    Upload,
    Avatar,
    Typography,
    Row,
    Col,
    Divider,
    message,
    Modal,
    Space,
    Tag,
    Alert
} from 'antd';
import {
    UserOutlined,
    MailOutlined,
    LockOutlined,
    BellOutlined,
    SecurityScanOutlined,
    GlobalOutlined,
    CameraOutlined,
    DeleteOutlined,
    SaveOutlined,
    SunOutlined,
    MoonOutlined
} from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const Settings = () => {
    const { user, updateUser } = useAuth();
    const { theme, toggleTheme, isDark } = useTheme();
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('profile');
    const [form] = Form.useForm();
    const [passwordForm] = Form.useForm();

    const [settings, setSettings] = useState({
        emailNotifications: true,
        pushNotifications: false,
        marketingEmails: false,
        courseReminders: true,
        language: 'en',
        timezone: 'UTC',
        privacy: 'public',
        twoFactorAuth: false
    });

    const handleProfileUpdate = async (values) => {
        setLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            updateUser({ ...user, ...values });
            message.success('Profile updated successfully!');
        } catch (error) {
            message.error('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordChange = async (values) => {
        setLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            message.success('Password changed successfully!');
            passwordForm.resetFields();
        } catch (error) {
            message.error('Failed to change password');
        } finally {
            setLoading(false);
        }
    };

    const handleSettingChange = (key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }));
        message.success('Setting updated successfully!');
    };

    const settingsTabs = [
        {
            key: 'profile',
            title: 'Profile',
            icon: <UserOutlined className="text-terracotta-500" />,
            color: 'bg-terracotta-50 dark:bg-terracotta-900'
        },
        {
            key: 'security',
            title: 'Security',
            icon: <SecurityScanOutlined className="text-sage-500" />,
            color: 'bg-sage-50 dark:bg-sage-900'
        },
        {
            key: 'notifications',
            title: 'Notifications',
            icon: <BellOutlined className="text-mustard-500" />,
            color: 'bg-mustard-50 dark:bg-mustard-900'
        },
        {
            key: 'preferences',
            title: 'Preferences',
            icon: <GlobalOutlined className="text-olive-500" />,
            color: 'bg-olive-50 dark:bg-olive-900'
        }
    ];

    const renderProfileSettings = () => (
        <Card className="bg-white dark:bg-warm-900 border-warm-200 dark:border-warm-700">
            <Title level={4} className="text-charcoal-500 dark:text-cream-100 mb-6">
                <UserOutlined className="text-terracotta-500 mr-3" />
                Profile Information
            </Title>

            <Form
                form={form}
                layout="vertical"
                onFinish={handleProfileUpdate}
                initialValues={user}
                className="space-y-4"
            >
                <div className="text-center mb-6">
                    <div className="relative inline-block">
                        <Avatar
                            size={100}
                            src={user?.avatar}
                            className="bg-terracotta-100 dark:bg-terracotta-900 text-terracotta-500 text-2xl"
                        >
                            {user?.name?.charAt(0)?.toUpperCase()}
                        </Avatar>
                        <Button
                            type="primary"
                            shape="circle"
                            icon={<CameraOutlined />}
                            className="absolute -bottom-2 -right-2 bg-sage-500 hover:bg-sage-600 border-sage-500"
                            size="small"
                        />
                    </div>
                    <Text className="text-warm-500 dark:text-warm-300 block mt-2">
                        Click to change profile picture
                    </Text>
                </div>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="name"
                            label={<span className="text-charcoal-500 dark:text-cream-100 font-medium">Full Name</span>}
                            rules={[{ required: true, message: 'Please enter your name' }]}
                        >
                            <Input
                                prefix={<UserOutlined className="text-sage-500" />}
                                className="h-10 bg-cream-50 dark:bg-warm-800 border-warm-200 dark:border-warm-600"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
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
                                className="h-10 bg-cream-50 dark:bg-warm-800 border-warm-200 dark:border-warm-600"
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item
                    name="bio"
                    label={<span className="text-charcoal-500 dark:text-cream-100 font-medium">Bio</span>}
                >
                    <TextArea
                        rows={4}
                        placeholder="Tell us about yourself..."
                        className="bg-cream-50 dark:bg-warm-800 border-warm-200 dark:border-warm-600"
                    />
                </Form.Item>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="title"
                            label={<span className="text-charcoal-500 dark:text-cream-100 font-medium">Job Title</span>}
                        >
                            <Input
                                placeholder="e.g., Software Developer"
                                className="h-10 bg-cream-50 dark:bg-warm-800 border-warm-200 dark:border-warm-600"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="company"
                            label={<span className="text-charcoal-500 dark:text-cream-100 font-medium">Company</span>}
                        >
                            <Input
                                placeholder="e.g., TechCorp Inc."
                                className="h-10 bg-cream-50 dark:bg-warm-800 border-warm-200 dark:border-warm-600"
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        icon={<SaveOutlined />}
                        className="bg-terracotta-500 hover:bg-terracotta-600 border-terracotta-500"
                    >
                        Save Changes
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );

    const renderSecuritySettings = () => (
        <div className="space-y-6">
            <Card className="bg-white dark:bg-warm-900 border-warm-200 dark:border-warm-700">
                <Title level={4} className="text-charcoal-500 dark:text-cream-100 mb-6">
                    <LockOutlined className="text-sage-500 mr-3" />
                    Change Password
                </Title>

                <Form
                    form={passwordForm}
                    layout="vertical"
                    onFinish={handlePasswordChange}
                    className="space-y-4"
                >
                    <Form.Item
                        name="currentPassword"
                        label={<span className="text-charcoal-500 dark:text-cream-100 font-medium">Current Password</span>}
                        rules={[{ required: true, message: 'Please enter your current password' }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="text-sage-500" />}
                            className="h-10 bg-cream-50 dark:bg-warm-800 border-warm-200 dark:border-warm-600"
                        />
                    </Form.Item>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="newPassword"
                                label={<span className="text-charcoal-500 dark:text-cream-100 font-medium">New Password</span>}
                                rules={[
                                    { required: true, message: 'Please enter new password' },
                                    { min: 8, message: 'Password must be at least 8 characters' }
                                ]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined className="text-sage-500" />}
                                    className="h-10 bg-cream-50 dark:bg-warm-800 border-warm-200 dark:border-warm-600"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="confirmPassword"
                                label={<span className="text-charcoal-500 dark:text-cream-100 font-medium">Confirm Password</span>}
                                dependencies={['newPassword']}
                                rules={[
                                    { required: true, message: 'Please confirm your password' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('newPassword') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Passwords do not match!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined className="text-sage-500" />}
                                    className="h-10 bg-cream-50 dark:bg-warm-800 border-warm-200 dark:border-warm-600"
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            className="bg-sage-500 hover:bg-sage-600 border-sage-500"
                        >
                            Change Password
                        </Button>
                    </Form.Item>
                </Form>
            </Card>

            <Card className="bg-white dark:bg-warm-900 border-warm-200 dark:border-warm-700">
                <Title level={4} className="text-charcoal-500 dark:text-cream-100 mb-6">
                    <SecurityScanOutlined className="text-sage-500 mr-3" />
                    Security Options
                </Title>

                <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-cream-50 dark:bg-warm-800 rounded-lg">
                        <div>
                            <Text className="text-charcoal-500 dark:text-cream-100 font-medium block">
                                Two-Factor Authentication
                            </Text>
                            <Text className="text-warm-500 dark:text-warm-300 text-sm">
                                Add an extra layer of security to your account
                            </Text>
                        </div>
                        <Switch
                            checked={settings.twoFactorAuth}
                            onChange={(value) => handleSettingChange('twoFactorAuth', value)}
                            className="bg-warm-300"
                        />
                    </div>

                    <Alert
                        message="Account Security"
                        description="Your account is currently secure. Last login: 2 hours ago from Chrome on Windows."
                        type="success"
                        className="bg-olive-50 dark:bg-olive-900 border-olive-200 dark:border-olive-700"
                        showIcon
                    />
                </div>
            </Card>
        </div>
    );

    const renderNotificationSettings = () => (
        <Card className="bg-white dark:bg-warm-900 border-warm-200 dark:border-warm-700">
            <Title level={4} className="text-charcoal-500 dark:text-cream-100 mb-6">
                <BellOutlined className="text-mustard-500 mr-3" />
                Notification Preferences
            </Title>

            <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-cream-50 dark:bg-warm-800 rounded-lg">
                    <div>
                        <Text className="text-charcoal-500 dark:text-cream-100 font-medium block">
                            Email Notifications
                        </Text>
                        <Text className="text-warm-500 dark:text-warm-300 text-sm">
                            Receive course updates and announcements via email
                        </Text>
                    </div>
                    <Switch
                        checked={settings.emailNotifications}
                        onChange={(value) => handleSettingChange('emailNotifications', value)}
                        className="bg-warm-300"
                    />
                </div>

                <div className="flex justify-between items-center p-4 bg-cream-50 dark:bg-warm-800 rounded-lg">
                    <div>
                        <Text className="text-charcoal-500 dark:text-cream-100 font-medium block">
                            Push Notifications
                        </Text>
                        <Text className="text-warm-500 dark:text-warm-300 text-sm">
                            Receive notifications in your browser
                        </Text>
                    </div>
                    <Switch
                        checked={settings.pushNotifications}
                        onChange={(value) => handleSettingChange('pushNotifications', value)}
                        className="bg-warm-300"
                    />
                </div>

                <div className="flex justify-between items-center p-4 bg-cream-50 dark:bg-warm-800 rounded-lg">
                    <div>
                        <Text className="text-charcoal-500 dark:text-cream-100 font-medium block">
                            Course Reminders
                        </Text>
                        <Text className="text-warm-500 dark:text-warm-300 text-sm">
                            Get reminded about your ongoing courses
                        </Text>
                    </div>
                    <Switch
                        checked={settings.courseReminders}
                        onChange={(value) => handleSettingChange('courseReminders', value)}
                        className="bg-warm-300"
                    />
                </div>

                <div className="flex justify-between items-center p-4 bg-cream-50 dark:bg-warm-800 rounded-lg">
                    <div>
                        <Text className="text-charcoal-500 dark:text-cream-100 font-medium block">
                            Marketing Emails
                        </Text>
                        <Text className="text-warm-500 dark:text-warm-300 text-sm">
                            Receive promotional content and special offers
                        </Text>
                    </div>
                    <Switch
                        checked={settings.marketingEmails}
                        onChange={(value) => handleSettingChange('marketingEmails', value)}
                        className="bg-warm-300"
                    />
                </div>
            </div>
        </Card>
    );

    const renderPreferencesSettings = () => (
        <div className="space-y-6">
            <Card className="bg-white dark:bg-warm-900 border-warm-200 dark:border-warm-700">
                <Title level={4} className="text-charcoal-500 dark:text-cream-100 mb-6">
                    {isDark ? <MoonOutlined className="text-olive-500 mr-3" /> : <SunOutlined className="text-olive-500 mr-3" />}
                    Appearance & Theme
                </Title>

                <div className="bg-cream-50 dark:bg-warm-800 border border-warm-200 dark:border-warm-600 rounded-lg p-6">
                    <Row justify="space-between" align="middle">
                        <Col>
                            <div>
                                <Text className="text-charcoal-500 dark:text-cream-100 text-lg font-semibold block">
                                    Dark Mode
                                </Text>
                                <Text className="text-warm-500 dark:text-warm-300 text-sm">
                                    Switch between light and dark themes for better viewing experience
                                </Text>
                            </div>
                        </Col>
                        <Col>
                            <Switch
                                checked={isDark}
                                onChange={toggleTheme}
                                className="bg-warm-300"
                                size="large"
                            />
                        </Col>
                    </Row>
                </div>

                <Space direction="vertical" className="w-full mt-6">
                    <Title level={5} className="text-charcoal-500 dark:text-cream-100 mb-2">
                        🎨 Current Theme
                    </Title>
                    <div className="text-center">
                        <Tag
                            className={`text-lg px-4 py-2 rounded-lg border-0 ${isDark
                                ? 'bg-sage-100 dark:bg-sage-900 text-sage-700 dark:text-sage-300'
                                : 'bg-olive-100 dark:bg-olive-900 text-olive-700 dark:text-olive-300'
                                }`}
                        >
                            {isDark ? '🌙 Dark Mode' : '☀️ Light Mode'}
                        </Tag>
                        <Text className="text-warm-500 dark:text-warm-300 text-sm block mt-2">
                            Your theme preference is automatically saved
                        </Text>
                    </div>
                </Space>
            </Card>

            <Card className="bg-white dark:bg-warm-900 border-warm-200 dark:border-warm-700">
                <Title level={4} className="text-charcoal-500 dark:text-cream-100 mb-6">
                    <GlobalOutlined className="text-olive-500 mr-3" />
                    Language & Region
                </Title>

                <div className="space-y-4">
                    <div>
                        <Text className="text-charcoal-500 dark:text-cream-100 font-medium block mb-2">
                            Language
                        </Text>
                        <Select
                            value={settings.language}
                            onChange={(value) => handleSettingChange('language', value)}
                            className="w-full h-10"
                        >
                            <Option value="en">English</Option>
                            <Option value="es">Spanish</Option>
                            <Option value="fr">French</Option>
                            <Option value="de">German</Option>
                        </Select>
                    </div>

                    <div>
                        <Text className="text-charcoal-500 dark:text-cream-100 font-medium block mb-2">
                            Timezone
                        </Text>
                        <Select
                            value={settings.timezone}
                            onChange={(value) => handleSettingChange('timezone', value)}
                            className="w-full h-10"
                        >
                            <Option value="UTC">UTC</Option>
                            <Option value="EST">Eastern Time</Option>
                            <Option value="PST">Pacific Time</Option>
                            <Option value="CET">Central European Time</Option>
                        </Select>
                    </div>
                </div>
            </Card>
        </div>
    );

    const renderContent = () => {
        switch (activeTab) {
            case 'profile':
                return renderProfileSettings();
            case 'security':
                return renderSecuritySettings();
            case 'notifications':
                return renderNotificationSettings();
            case 'preferences':
                return renderPreferencesSettings();
            default:
                return renderProfileSettings();
        }
    };

    return (
        <div className="min-h-screen bg-cream-100 dark:bg-charcoal-500 p-6 transition-colors duration-300">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Header */}
                <Card className="bg-white dark:bg-warm-900 border-warm-200 dark:border-warm-700">
                    <Title level={2} className="text-charcoal-500 dark:text-cream-100 mb-2">
                        ⚙️ Settings
                    </Title>
                    <Text className="text-warm-500 dark:text-warm-300">
                        Manage your account settings and preferences
                    </Text>
                </Card>

                <Row gutter={[24, 24]}>
                    {/* Sidebar */}
                    <Col xs={24} lg={6}>
                        <Card className="bg-white dark:bg-warm-900 border-warm-200 dark:border-warm-700">
                            <div className="space-y-2">
                                {settingsTabs.map((tab) => (
                                    <Button
                                        key={tab.key}
                                        type={activeTab === tab.key ? 'primary' : 'text'}
                                        block
                                        icon={tab.icon}
                                        className={`h-12 text-left justify-start ${activeTab === tab.key
                                            ? 'bg-terracotta-500 hover:bg-terracotta-600 border-terracotta-500'
                                            : 'text-warm-600 dark:text-warm-300 hover:bg-cream-50 dark:hover:bg-warm-800'
                                            }`}
                                        onClick={() => setActiveTab(tab.key)}
                                    >
                                        {tab.title}
                                    </Button>
                                ))}
                            </div>
                        </Card>
                    </Col>

                    {/* Content */}
                    <Col xs={24} lg={18}>
                        {renderContent()}
                    </Col>
                </Row>

                {/* Save Button */}
                <div className="text-center">
                    <Button
                        type="primary"
                        size="large"
                        icon={<SaveOutlined />}
                        className="px-8 bg-terracotta-500 hover:bg-terracotta-600 border-terracotta-500"
                    >
                        Save All Changes
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
