import React, { useState } from 'react';
import {
    Card,
    Row,
    Col,
    Typography,
    Switch,
    Select,
    Button,
    Divider,
    Avatar,
    Upload,
    Form,
    Input,
    message,
    Space,
    Tag
} from 'antd';
import {
    UserOutlined,
    UploadOutlined,
    MoonOutlined,
    SunOutlined,
    SettingOutlined,
    BellOutlined,
    SecurityScanOutlined,
    GlobalOutlined,
    SaveOutlined,
    EyeOutlined,
    EyeInvisibleOutlined
} from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const Settings = () => {
    const { user } = useAuth();
    const { theme, toggleTheme, isDark } = useTheme();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [preferences, setPreferences] = useState({
        emailNotifications: true,
        pushNotifications: false,
        courseReminders: true,
        weeklyProgress: true,
        language: 'en',
        timezone: 'UTC',
        autoPlay: false,
        quality: 'auto'
    });

    const handlePreferenceChange = (key, value) => {
        setPreferences(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleSaveSettings = async () => {
        try {
            setLoading(true);
            // Here you would typically save to your backend
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
            message.success('Settings saved successfully!');
        } catch (error) {
            message.error('Failed to save settings');
        } finally {
            setLoading(false);
        }
    };

    const handleAvatarUpload = (info) => {
        if (info.file.status === 'done') {
            message.success('Profile picture updated successfully!');
        } else if (info.file.status === 'error') {
            message.error('Failed to upload profile picture');
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: isDark ? '#1a202c' : '#f5f5f5',
            padding: '24px'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {/* Header */}
                <div style={{ marginBottom: '32px' }}>
                    <Title level={2} style={{
                        margin: 0,
                        color: isDark ? '#fff' : '#262626',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                    }}>
                        <SettingOutlined style={{ color: '#0BC5EA' }} />
                        Account Settings
                    </Title>
                    <Paragraph style={{
                        color: isDark ? '#a0aec0' : '#8c8c8c',
                        fontSize: '16px',
                        margin: '8px 0 0 0'
                    }}>
                        Manage your account preferences and privacy settings
                    </Paragraph>
                </div>

                <Row gutter={[24, 24]}>
                    {/* Profile Settings */}
                    <Col xs={24} lg={16}>
                        <Space direction="vertical" size="large" style={{ width: '100%' }}>
                            {/* Profile Information */}
                            <Card style={{
                                borderRadius: '16px',
                                border: isDark ? '1px solid #2d3748' : '1px solid #f0f0f0',
                                background: isDark ? '#2d3748' : '#ffffff',
                                boxShadow: isDark ? '0 4px 12px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.06)'
                            }}>
                                <Title level={4} style={{
                                    marginBottom: '24px',
                                    color: isDark ? '#fff' : '#262626',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}>
                                    <UserOutlined style={{ color: '#0BC5EA' }} />
                                    Profile Information
                                </Title>

                                <Row gutter={[24, 24]} align="middle">
                                    <Col flex="none">
                                        <div style={{ textAlign: 'center' }}>
                                            <Avatar
                                                size={120}
                                                icon={<UserOutlined />}
                                                style={{
                                                    background: 'linear-gradient(135deg, #0BC5EA 0%, #40a9ff 100%)',
                                                    border: '4px solid rgba(11, 197, 234, 0.2)',
                                                    marginBottom: '16px'
                                                }}
                                            />
                                            <Upload
                                                accept="image/*"
                                                showUploadList={false}
                                                onChange={handleAvatarUpload}
                                            >
                                                <Button
                                                    icon={<UploadOutlined />}
                                                    style={{
                                                        background: isDark ? '#1a202c' : '#ffffff',
                                                        border: isDark ? '1px solid #4a5568' : '1px solid #d9d9d9',
                                                        color: isDark ? '#fff' : '#262626'
                                                    }}
                                                >
                                                    Change Photo
                                                </Button>
                                            </Upload>
                                        </div>
                                    </Col>
                                    <Col flex="auto">
                                        <Form
                                            form={form}
                                            layout="vertical"
                                            initialValues={{
                                                name: user?.name || '',
                                                email: user?.email || '',
                                                role: user?.role || 'student'
                                            }}
                                        >
                                            <Row gutter={[16, 16]}>
                                                <Col xs={24} sm={12}>
                                                    <Form.Item
                                                        label={<span style={{ color: isDark ? '#fff' : '#262626' }}>Full Name</span>}
                                                        name="name"
                                                    >
                                                        <Input
                                                            style={{
                                                                background: isDark ? '#1a202c' : '#ffffff',
                                                                border: isDark ? '1px solid #4a5568' : '1px solid #d9d9d9',
                                                                color: isDark ? '#fff' : '#262626'
                                                            }}
                                                        />
                                                    </Form.Item>
                                                </Col>
                                                <Col xs={24} sm={12}>
                                                    <Form.Item
                                                        label={<span style={{ color: isDark ? '#fff' : '#262626' }}>Email</span>}
                                                        name="email"
                                                    >
                                                        <Input
                                                            style={{
                                                                background: isDark ? '#1a202c' : '#ffffff',
                                                                border: isDark ? '1px solid #4a5568' : '1px solid #d9d9d9',
                                                                color: isDark ? '#fff' : '#262626'
                                                            }}
                                                        />
                                                    </Form.Item>
                                                </Col>
                                                <Col xs={24} sm={12}>
                                                    <Form.Item
                                                        label={<span style={{ color: isDark ? '#fff' : '#262626' }}>Role</span>}
                                                        name="role"
                                                    >
                                                        <Select
                                                            disabled
                                                            style={{
                                                                background: isDark ? '#1a202c' : '#ffffff',
                                                            }}
                                                        >
                                                            <Option value="student">Student</Option>
                                                            <Option value="instructor">Instructor</Option>
                                                            <Option value="admin">Admin</Option>
                                                        </Select>
                                                    </Form.Item>
                                                </Col>
                                                <Col xs={24} sm={12}>
                                                    <Form.Item
                                                        label={<span style={{ color: isDark ? '#fff' : '#262626' }}>New Password</span>}
                                                        name="password"
                                                    >
                                                        <Input.Password
                                                            placeholder="Leave blank to keep current"
                                                            iconRender={visible => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                                                            style={{
                                                                background: isDark ? '#1a202c' : '#ffffff',
                                                                border: isDark ? '1px solid #4a5568' : '1px solid #d9d9d9',
                                                                color: isDark ? '#fff' : '#262626'
                                                            }}
                                                        />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </Col>
                                </Row>
                            </Card>

                            {/* Appearance Settings */}
                            <Card style={{
                                borderRadius: '16px',
                                border: isDark ? '1px solid #2d3748' : '1px solid #f0f0f0',
                                background: isDark ? '#2d3748' : '#ffffff',
                                boxShadow: isDark ? '0 4px 12px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.06)'
                            }}>
                                <Title level={4} style={{
                                    marginBottom: '24px',
                                    color: isDark ? '#fff' : '#262626',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}>
                                    {isDark ? <MoonOutlined style={{ color: '#0BC5EA' }} /> : <SunOutlined style={{ color: '#0BC5EA' }} />}
                                    Appearance & Theme
                                </Title>

                                <div style={{
                                    background: isDark ? 'rgba(11, 197, 234, 0.1)' : 'rgba(11, 197, 234, 0.05)',
                                    borderRadius: '12px',
                                    padding: '24px',
                                    border: '1px solid rgba(11, 197, 234, 0.2)'
                                }}>
                                    <Row justify="space-between" align="middle">
                                        <Col>
                                            <div>
                                                <Text style={{
                                                    color: isDark ? '#fff' : '#262626',
                                                    fontSize: '16px',
                                                    fontWeight: '600',
                                                    display: 'block'
                                                }}>
                                                    Dark Mode
                                                </Text>
                                                <Text style={{
                                                    color: isDark ? '#a0aec0' : '#8c8c8c',
                                                    fontSize: '14px'
                                                }}>
                                                    Switch between light and dark themes for better viewing experience
                                                </Text>
                                            </div>
                                        </Col>
                                        <Col>
                                            <Switch
                                                checked={isDark}
                                                onChange={toggleTheme}
                                                size="large"
                                                checkedChildren={<MoonOutlined />}
                                                unCheckedChildren={<SunOutlined />}
                                                style={{
                                                    background: isDark ? '#0BC5EA' : '#bfbfbf'
                                                }}
                                            />
                                        </Col>
                                    </Row>

                                    <Divider style={{
                                        borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                                        margin: '20px 0'
                                    }} />

                                    <Row gutter={[16, 16]}>
                                        <Col xs={24} sm={12}>
                                            <div style={{ marginBottom: '8px' }}>
                                                <Text style={{ color: isDark ? '#fff' : '#262626', fontWeight: '500' }}>
                                                    Language
                                                </Text>
                                            </div>
                                            <Select
                                                value={preferences.language}
                                                onChange={(value) => handlePreferenceChange('language', value)}
                                                style={{ width: '100%' }}
                                            >
                                                <Option value="en">English</Option>
                                                <Option value="fr">Français</Option>
                                                <Option value="es">Español</Option>
                                                <Option value="ar">العربية</Option>
                                            </Select>
                                        </Col>
                                        <Col xs={24} sm={12}>
                                            <div style={{ marginBottom: '8px' }}>
                                                <Text style={{ color: isDark ? '#fff' : '#262626', fontWeight: '500' }}>
                                                    Timezone
                                                </Text>
                                            </div>
                                            <Select
                                                value={preferences.timezone}
                                                onChange={(value) => handlePreferenceChange('timezone', value)}
                                                style={{ width: '100%' }}
                                            >
                                                <Option value="UTC">UTC</Option>
                                                <Option value="America/New_York">Eastern Time</Option>
                                                <Option value="America/Los_Angeles">Pacific Time</Option>
                                                <Option value="Europe/London">London</Option>
                                                <Option value="Europe/Paris">Paris</Option>
                                            </Select>
                                        </Col>
                                    </Row>
                                </div>
                            </Card>
                        </Space>
                    </Col>

                    {/* Notification & Privacy Settings */}
                    <Col xs={24} lg={8}>
                        <Space direction="vertical" size="large" style={{ width: '100%' }}>
                            {/* Notifications */}
                            <Card style={{
                                borderRadius: '16px',
                                border: isDark ? '1px solid #2d3748' : '1px solid #f0f0f0',
                                background: isDark ? '#2d3748' : '#ffffff',
                                boxShadow: isDark ? '0 4px 12px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.06)'
                            }}>
                                <Title level={4} style={{
                                    marginBottom: '20px',
                                    color: isDark ? '#fff' : '#262626',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}>
                                    <BellOutlined style={{ color: '#0BC5EA' }} />
                                    Notifications
                                </Title>

                                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '12px 0'
                                    }}>
                                        <div>
                                            <Text style={{
                                                color: isDark ? '#fff' : '#262626',
                                                fontWeight: '500',
                                                display: 'block'
                                            }}>
                                                Email Notifications
                                            </Text>
                                            <Text style={{
                                                color: isDark ? '#a0aec0' : '#8c8c8c',
                                                fontSize: '12px'
                                            }}>
                                                Course updates & announcements
                                            </Text>
                                        </div>
                                        <Switch
                                            checked={preferences.emailNotifications}
                                            onChange={(checked) => handlePreferenceChange('emailNotifications', checked)}
                                        />
                                    </div>

                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '12px 0'
                                    }}>
                                        <div>
                                            <Text style={{
                                                color: isDark ? '#fff' : '#262626',
                                                fontWeight: '500',
                                                display: 'block'
                                            }}>
                                                Push Notifications
                                            </Text>
                                            <Text style={{
                                                color: isDark ? '#a0aec0' : '#8c8c8c',
                                                fontSize: '12px'
                                            }}>
                                                Browser notifications
                                            </Text>
                                        </div>
                                        <Switch
                                            checked={preferences.pushNotifications}
                                            onChange={(checked) => handlePreferenceChange('pushNotifications', checked)}
                                        />
                                    </div>

                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '12px 0'
                                    }}>
                                        <div>
                                            <Text style={{
                                                color: isDark ? '#fff' : '#262626',
                                                fontWeight: '500',
                                                display: 'block'
                                            }}>
                                                Course Reminders
                                            </Text>
                                            <Text style={{
                                                color: isDark ? '#a0aec0' : '#8c8c8c',
                                                fontSize: '12px'
                                            }}>
                                                Deadline & schedule reminders
                                            </Text>
                                        </div>
                                        <Switch
                                            checked={preferences.courseReminders}
                                            onChange={(checked) => handlePreferenceChange('courseReminders', checked)}
                                        />
                                    </div>

                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '12px 0'
                                    }}>
                                        <div>
                                            <Text style={{
                                                color: isDark ? '#fff' : '#262626',
                                                fontWeight: '500',
                                                display: 'block'
                                            }}>
                                                Weekly Progress
                                            </Text>
                                            <Text style={{
                                                color: isDark ? '#a0aec0' : '#8c8c8c',
                                                fontSize: '12px'
                                            }}>
                                                Weekly learning summary
                                            </Text>
                                        </div>
                                        <Switch
                                            checked={preferences.weeklyProgress}
                                            onChange={(checked) => handlePreferenceChange('weeklyProgress', checked)}
                                        />
                                    </div>
                                </Space>
                            </Card>

                            {/* Privacy & Security */}
                            <Card style={{
                                borderRadius: '16px',
                                border: isDark ? '1px solid #2d3748' : '1px solid #f0f0f0',
                                background: isDark ? '#2d3748' : '#ffffff',
                                boxShadow: isDark ? '0 4px 12px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.06)'
                            }}>
                                <Title level={4} style={{
                                    marginBottom: '20px',
                                    color: isDark ? '#fff' : '#262626',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}>
                                    <SecurityScanOutlined style={{ color: '#0BC5EA' }} />
                                    Privacy & Security
                                </Title>

                                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                                    <div style={{
                                        background: isDark ? 'rgba(82, 196, 26, 0.1)' : 'rgba(82, 196, 26, 0.05)',
                                        borderRadius: '8px',
                                        padding: '12px',
                                        border: '1px solid rgba(82, 196, 26, 0.2)'
                                    }}>
                                        <Text style={{
                                            color: '#52c41a',
                                            fontSize: '14px',
                                            fontWeight: '500'
                                        }}>
                                            ✓ Account Secured
                                        </Text>
                                        <Text style={{
                                            color: isDark ? '#a0aec0' : '#8c8c8c',
                                            fontSize: '12px',
                                            display: 'block',
                                            marginTop: '4px'
                                        }}>
                                            Your account is protected with strong security measures
                                        </Text>
                                    </div>

                                    <Button
                                        block
                                        style={{
                                            background: isDark ? '#1a202c' : '#ffffff',
                                            border: isDark ? '1px solid #4a5568' : '1px solid #d9d9d9',
                                            color: isDark ? '#fff' : '#262626',
                                            height: '40px'
                                        }}
                                    >
                                        Change Password
                                    </Button>

                                    <Button
                                        block
                                        style={{
                                            background: isDark ? '#1a202c' : '#ffffff',
                                            border: isDark ? '1px solid #4a5568' : '1px solid #d9d9d9',
                                            color: isDark ? '#fff' : '#262626',
                                            height: '40px'
                                        }}
                                    >
                                        Two-Factor Authentication
                                    </Button>

                                    <Button
                                        block
                                        style={{
                                            background: isDark ? '#1a202c' : '#ffffff',
                                            border: isDark ? '1px solid #4a5568' : '1px solid #d9d9d9',
                                            color: isDark ? '#fff' : '#262626',
                                            height: '40px'
                                        }}
                                    >
                                        Download My Data
                                    </Button>
                                </Space>
                            </Card>

                            {/* Current Theme Status */}
                            <Card style={{
                                borderRadius: '16px',
                                border: isDark ? '1px solid #2d3748' : '1px solid #f0f0f0',
                                background: isDark ? '#2d3748' : '#ffffff',
                                boxShadow: isDark ? '0 4px 12px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.06)'
                            }}>
                                <Title level={4} style={{
                                    marginBottom: '16px',
                                    color: isDark ? '#fff' : '#262626',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}>
                                    🎨 Current Theme
                                </Title>

                                <div style={{ textAlign: 'center' }}>
                                    <Tag
                                        color={isDark ? '#0BC5EA' : '#52c41a'}
                                        style={{
                                            fontSize: '16px',
                                            padding: '8px 16px',
                                            borderRadius: '8px',
                                            border: 'none'
                                        }}
                                    >
                                        {isDark ? '🌙 Dark Mode' : '☀️ Light Mode'}
                                    </Tag>
                                    <Text style={{
                                        color: isDark ? '#a0aec0' : '#8c8c8c',
                                        fontSize: '12px',
                                        display: 'block',
                                        marginTop: '8px'
                                    }}>
                                        Your theme preference is automatically saved
                                    </Text>
                                </div>
                            </Card>
                        </Space>
                    </Col>
                </Row>

                {/* Save Button */}
                <div style={{ textAlign: 'center', marginTop: '32px' }}>
                    <Button
                        type="primary"
                        size="large"
                        icon={<SaveOutlined />}
                        loading={loading}
                        onClick={handleSaveSettings}
                        style={{
                            background: 'linear-gradient(135deg, #0BC5EA 0%, #40a9ff 100%)',
                            border: 'none',
                            borderRadius: '8px',
                            height: '48px',
                            fontSize: '16px',
                            fontWeight: '600',
                            paddingInline: '32px'
                        }}
                    >
                        Save All Settings
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
