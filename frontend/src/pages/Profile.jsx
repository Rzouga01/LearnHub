import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Card,
    Form,
    Input,
    Button,
    Typography,
    Row,
    Col,
    Avatar,
    Upload,
    Select,
    Divider,
    notification,
    Tabs
} from 'antd';
import {
    UserOutlined,
    MailOutlined,
    PhoneOutlined,
    EnvironmentOutlined,
    EditOutlined,
    UploadOutlined,
    SaveOutlined,
    KeyOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';
import Logo from '../components/Logo';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

const Profile = () => {
    const { user, logout, updateProfile } = useAuth();
    const [loading, setLoading] = useState(false);
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [form] = Form.useForm();
    const [passwordForm] = Form.useForm();
    const navigate = useNavigate();

    const handleProfileUpdate = async (values) => {
        setLoading(true);
        try {
            await updateProfile(values);
            notification.success({
                message: 'Profile Updated',
                description: 'Your profile has been successfully updated.',
            });
        } catch (error) {
            notification.error({
                message: 'Update Failed',
                description: 'Failed to update profile. Please try again.',
            });
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordChange = async (values) => {
        setPasswordLoading(true);
        try {
            // Add password change logic here
            notification.success({
                message: 'Password Changed',
                description: 'Your password has been successfully changed.',
            });
            passwordForm.resetFields();
        } catch (error) {
            notification.error({
                message: 'Password Change Failed',
                description: 'Failed to change password. Please try again.',
            });
        } finally {
            setPasswordLoading(false);
        }
    };

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    const uploadProps = {
        name: 'avatar',
        listType: 'picture-card',
        showUploadList: false,
        beforeUpload: (file) => {
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isJpgOrPng) {
                notification.error({
                    message: 'Invalid file type',
                    description: 'You can only upload JPG/PNG files!',
                });
            }
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                notification.error({
                    message: 'File too large',
                    description: 'Image must be smaller than 2MB!',
                });
            }
            return isJpgOrPng && isLt2M;
        },
        onChange: (info) => {
            if (info.file.status === 'done') {
                notification.success({
                    message: 'Avatar Updated',
                    description: 'Your profile picture has been updated successfully.',
                });
            }
        },
    };

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: 'var(--bg-primary)',
            padding: '24px'
        }}>
            {/* Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '32px',
                padding: '0 24px'
            }}>
                <Logo to="/" size="large" showText={false} />
                <div style={{ display: 'flex', gap: '12px' }}>
                    <Button onClick={() => navigate('/dashboard')}>
                        Dashboard
                    </Button>
                    <Button onClick={() => navigate('/')} type="text">
                        Back to Home
                    </Button>
                </div>
            </div>

            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <Row gutter={[24, 24]}>
                    {/* Profile Header Card */}
                    <Col span={24}>
                        <Card
                            className="theme-card"
                            style={{
                                backgroundColor: 'var(--bg-secondary)',
                                borderColor: 'var(--border-color)',
                                textAlign: 'center'
                            }}
                        >
                            <div style={{
                                background: 'linear-gradient(135deg, var(--accent-primary) 0%, #0891B2 100%)',
                                height: '120px',
                                borderRadius: '12px 12px 0 0',
                                margin: '-24px -24px 24px -24px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative'
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    bottom: '-40px',
                                    left: '50%',
                                    transform: 'translateX(-50%)'
                                }}>
                                    <Upload {...uploadProps}>
                                        <Avatar
                                            size={80}
                                            icon={<UserOutlined />}
                                            style={{
                                                backgroundColor: 'white',
                                                color: 'var(--accent-primary)',
                                                border: '4px solid white',
                                                cursor: 'pointer'
                                            }}
                                        />
                                    </Upload>
                                </div>
                            </div>
                            <div style={{ marginTop: '40px' }}>
                                <Title level={3} style={{ color: 'var(--text-primary)', margin: '0 0 8px 0' }}>
                                    {user?.name || 'User Name'}
                                </Title>
                                <Text style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
                                    {user?.role || 'Student'} • {user?.email || 'user@example.com'}
                                </Text>
                            </div>
                        </Card>
                    </Col>

                    {/* Profile Management */}
                    <Col span={24}>
                        <Card
                            className="theme-card"
                            style={{
                                backgroundColor: 'var(--bg-secondary)',
                                borderColor: 'var(--border-color)'
                            }}
                        >
                            <Tabs defaultActiveKey="profile" size="large">
                                <TabPane tab="Profile Information" key="profile">
                                    <Form
                                        form={form}
                                        layout="vertical"
                                        onFinish={handleProfileUpdate}
                                        initialValues={{
                                            name: user?.name || '',
                                            email: user?.email || '',
                                            phone: user?.phone || '',
                                            location: user?.location || '',
                                            bio: user?.bio || '',
                                            role: user?.role || 'student'
                                        }}
                                    >
                                        <Row gutter={16}>
                                            <Col span={12}>
                                                <Form.Item
                                                    label="Full Name"
                                                    name="name"
                                                    rules={[{ required: true, message: 'Please input your name!' }]}
                                                >
                                                    <Input
                                                        prefix={<UserOutlined />}
                                                        placeholder="Enter your full name"
                                                        style={{
                                                            height: '44px',
                                                            backgroundColor: 'var(--bg-primary)',
                                                            borderColor: 'var(--border-color)',
                                                            color: 'var(--text-primary)'
                                                        }}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item
                                                    label="Email Address"
                                                    name="email"
                                                    rules={[
                                                        { required: true, message: 'Please input your email!' },
                                                        { type: 'email', message: 'Please enter a valid email!' }
                                                    ]}
                                                >
                                                    <Input
                                                        prefix={<MailOutlined />}
                                                        placeholder="Enter your email"
                                                        style={{
                                                            height: '44px',
                                                            backgroundColor: 'var(--bg-primary)',
                                                            borderColor: 'var(--border-color)',
                                                            color: 'var(--text-primary)'
                                                        }}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item
                                                    label="Phone Number"
                                                    name="phone"
                                                >
                                                    <Input
                                                        prefix={<PhoneOutlined />}
                                                        placeholder="Enter your phone number"
                                                        style={{
                                                            height: '44px',
                                                            backgroundColor: 'var(--bg-primary)',
                                                            borderColor: 'var(--border-color)',
                                                            color: 'var(--text-primary)'
                                                        }}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item
                                                    label="Location"
                                                    name="location"
                                                >
                                                    <Input
                                                        prefix={<EnvironmentOutlined />}
                                                        placeholder="Enter your location"
                                                        style={{
                                                            height: '44px',
                                                            backgroundColor: 'var(--bg-primary)',
                                                            borderColor: 'var(--border-color)',
                                                            color: 'var(--text-primary)'
                                                        }}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item
                                                    label="Role"
                                                    name="role"
                                                >
                                                    <Select
                                                        placeholder="Select your role"
                                                        style={{ height: '44px' }}
                                                        disabled
                                                    >
                                                        <Option value="student">Student</Option>
                                                        <Option value="trainer">Trainer</Option>
                                                        <Option value="coordinator">Coordinator</Option>
                                                        <Option value="admin">Admin</Option>
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            <Col span={24}>
                                                <Form.Item
                                                    label="Bio"
                                                    name="bio"
                                                >
                                                    <Input.TextArea
                                                        rows={4}
                                                        placeholder="Tell us about yourself..."
                                                        style={{
                                                            backgroundColor: 'var(--bg-primary)',
                                                            borderColor: 'var(--border-color)',
                                                            color: 'var(--text-primary)'
                                                        }}
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
                                                style={{
                                                    height: '44px',
                                                    backgroundColor: 'var(--accent-primary)',
                                                    borderColor: 'var(--accent-primary)'
                                                }}
                                            >
                                                Save Changes
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </TabPane>

                                <TabPane tab="Change Password" key="password">
                                    <Form
                                        form={passwordForm}
                                        layout="vertical"
                                        onFinish={handlePasswordChange}
                                    >
                                        <Row gutter={16}>
                                            <Col span={12}>
                                                <Form.Item
                                                    label="Current Password"
                                                    name="currentPassword"
                                                    rules={[{ required: true, message: 'Please input your current password!' }]}
                                                >
                                                    <Input.Password
                                                        prefix={<KeyOutlined />}
                                                        placeholder="Enter current password"
                                                        style={{
                                                            height: '44px',
                                                            backgroundColor: 'var(--bg-primary)',
                                                            borderColor: 'var(--border-color)',
                                                            color: 'var(--text-primary)'
                                                        }}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item
                                                    label="New Password"
                                                    name="newPassword"
                                                    rules={[
                                                        { required: true, message: 'Please input your new password!' },
                                                        { min: 8, message: 'Password must be at least 8 characters!' }
                                                    ]}
                                                >
                                                    <Input.Password
                                                        prefix={<KeyOutlined />}
                                                        placeholder="Enter new password"
                                                        style={{
                                                            height: '44px',
                                                            backgroundColor: 'var(--bg-primary)',
                                                            borderColor: 'var(--border-color)',
                                                            color: 'var(--text-primary)'
                                                        }}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item
                                                    label="Confirm New Password"
                                                    name="confirmPassword"
                                                    dependencies={['newPassword']}
                                                    rules={[
                                                        { required: true, message: 'Please confirm your new password!' },
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
                                                        prefix={<KeyOutlined />}
                                                        placeholder="Confirm new password"
                                                        style={{
                                                            height: '44px',
                                                            backgroundColor: 'var(--bg-primary)',
                                                            borderColor: 'var(--border-color)',
                                                            color: 'var(--text-primary)'
                                                        }}
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Form.Item>
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                                loading={passwordLoading}
                                                icon={<KeyOutlined />}
                                                style={{
                                                    height: '44px',
                                                    backgroundColor: 'var(--accent-primary)',
                                                    borderColor: 'var(--accent-primary)'
                                                }}
                                            >
                                                Change Password
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </TabPane>

                                <TabPane tab="Account Settings" key="settings">
                                    <div style={{ padding: '20px 0' }}>
                                        <Title level={4} style={{ color: 'var(--text-primary)' }}>
                                            Account Actions
                                        </Title>
                                        <Divider />
                                        <div style={{ marginBottom: '24px' }}>
                                            <Title level={5} style={{ color: 'var(--text-primary)' }}>
                                                Sign Out
                                            </Title>
                                            <Paragraph style={{ color: 'var(--text-secondary)' }}>
                                                Sign out of your account on this device.
                                            </Paragraph>
                                            <Button
                                                icon={<LogoutOutlined />}
                                                onClick={handleLogout}
                                                style={{
                                                    height: '44px',
                                                    backgroundColor: 'var(--error-color)',
                                                    borderColor: 'var(--error-color)',
                                                    color: 'white'
                                                }}
                                            >
                                                Sign Out
                                            </Button>
                                        </div>
                                    </div>
                                </TabPane>
                            </Tabs>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default Profile;
