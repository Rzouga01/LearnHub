import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card, Typography, Divider, Select, Checkbox } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, GoogleOutlined, GithubOutlined, TeamOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import Logo from '../components/Logo';
import api from '../services/api';

const { Title, Text } = Typography;
const { Option } = Select;

const Register = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();
    const { theme } = useTheme();

    const onFinish = async (values) => {
        setLoading(true);
        setError('');

        try {
            const response = await api.routes.auth.register(values);

            if (response.data.status === 'success') {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                login(response.data.user, response.data.token);
                navigate('/dashboard');
            }
        } catch (error) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else if (error.response && error.response.data.errors) {
                const errors = error.response.data.errors;
                const firstError = Object.values(errors)[0];
                setError(Array.isArray(firstError) ? firstError[0] : firstError);
            } else {
                setError('Something went wrong. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <Card className="auth-card fade-in" style={{ maxWidth: '420px' }}>
                {/* Logo and Header */}
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <Logo
                        to="/"
                        size="xlarge"
                        className="auth-logo"
                        showText={false}
                    />
                    <Title
                        level={3}
                        style={{
                            margin: '16px 0 8px 0',
                            color: 'var(--text-primary)',
                            fontSize: '24px',
                            fontWeight: '600'
                        }}
                    >
                        Create your account
                    </Title>
                    <Text style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                        Join thousands of learners today
                    </Text>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="alert-error">
                        {error}
                    </div>
                )}

                {/* Register Form */}
                <Form
                    name="register"
                    onFinish={onFinish}
                    layout="vertical"
                    size="large"
                >
                    <Form.Item
                        name="name"
                        rules={[
                            { required: true, message: 'Please input your full name!' },
                            { min: 2, message: 'Name must be at least 2 characters!' }
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined style={{ color: 'var(--text-secondary)' }} />}
                            placeholder="Full name"
                            className="theme-input"
                            style={{
                                height: '44px',
                                borderRadius: '8px',
                                fontSize: '15px',
                                backgroundColor: 'var(--bg-secondary)',
                                borderColor: 'var(--border-color)',
                                color: 'var(--text-primary)'
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: 'Please input your email!' },
                            { type: 'email', message: 'Please enter a valid email!' }
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined style={{ color: 'var(--text-secondary)' }} />}
                            placeholder="Email address"
                            className="theme-input"
                            style={{
                                height: '44px',
                                borderRadius: '8px',
                                fontSize: '15px',
                                backgroundColor: 'var(--bg-secondary)',
                                borderColor: 'var(--border-color)',
                                color: 'var(--text-primary)'
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            { required: true, message: 'Please input your password!' },
                            { min: 8, message: 'Password must be at least 8 characters!' }
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined style={{ color: 'var(--text-secondary)' }} />}
                            placeholder="Password"
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            style={{
                                height: '44px',
                                borderRadius: '8px',
                                fontSize: '15px',
                                backgroundColor: 'var(--bg-secondary)',
                                borderColor: 'var(--border-color)',
                                color: 'var(--text-primary)'
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="password_confirmation"
                        dependencies={['password']}
                        rules={[
                            { required: true, message: 'Please confirm your password!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Passwords do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined style={{ color: 'var(--text-secondary)' }} />}
                            placeholder="Confirm password"
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            style={{
                                height: '44px',
                                borderRadius: '8px',
                                fontSize: '15px',
                                backgroundColor: 'var(--bg-secondary)',
                                borderColor: 'var(--border-color)',
                                color: 'var(--text-primary)'
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="role"
                        rules={[{ required: true, message: 'Please select your role!' }]}
                    >
                        <Select
                            placeholder="Select your role"
                            style={{
                                height: '44px',
                                fontSize: '15px'
                            }}
                        >
                            <Option value="student">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <UserOutlined style={{ color: '#3B82F6' }} />
                                    <span>Student</span>
                                </div>
                            </Option>
                            <Option value="trainer">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <TeamOutlined style={{ color: '#10B981' }} />
                                    <span>Trainer</span>
                                </div>
                            </Option>
                            <Option value="coordinator">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <TeamOutlined style={{ color: '#ED8936' }} />
                                    <span>Coordinator</span>
                                </div>
                            </Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="terms"
                        valuePropName="checked"
                        rules={[
                            {
                                validator: (_, value) =>
                                    value ? Promise.resolve() : Promise.reject(new Error('Please accept the terms and conditions')),
                            },
                        ]}
                        style={{ marginBottom: '24px' }}
                    >
                        <Checkbox style={{ fontSize: '14px', color: 'var(--text-primary)' }}>
                            I agree to the{' '}
                            <Link to="/terms" style={{ color: 'var(--accent-primary)' }}>
                                Terms of Service
                            </Link>{' '}
                            and{' '}
                            <Link to="/privacy" style={{ color: 'var(--accent-primary)' }}>
                                Privacy Policy
                            </Link>
                        </Checkbox>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            className="btn-primary"
                            style={{
                                width: '100%',
                                height: '44px',
                                borderRadius: '8px',
                                fontSize: '15px',
                                fontWeight: '500',
                                backgroundColor: 'var(--accent-primary)',
                                borderColor: 'var(--accent-primary)'
                            }}
                        >
                            Create Account
                        </Button>
                    </Form.Item>
                </Form>

                <Divider style={{
                    margin: '20px 0',
                    color: 'var(--text-secondary)',
                    fontSize: '14px',
                    borderColor: 'var(--border-color)'
                }}>
                    Or continue with
                </Divider>

                {/* Social Registration */}
                <div style={{
                    display: 'flex',
                    gap: '12px',
                    marginBottom: '24px'
                }}>
                    <Button
                        icon={<GoogleOutlined />}
                        className="btn-secondary"
                        style={{
                            flex: 1,
                            height: '40px',
                            borderRadius: '8px',
                            fontSize: '14px',
                            backgroundColor: 'var(--bg-secondary)',
                            borderColor: 'var(--border-color)',
                            color: 'var(--text-primary)'
                        }}
                    >
                        Google
                    </Button>
                    <Button
                        icon={<GithubOutlined />}
                        className="btn-secondary"
                        style={{
                            flex: 1,
                            height: '40px',
                            borderRadius: '8px',
                            fontSize: '14px',
                            backgroundColor: 'var(--bg-secondary)',
                            borderColor: 'var(--border-color)',
                            color: 'var(--text-primary)'
                        }}
                    >
                        GitHub
                    </Button>
                </div>

                {/* Sign in link */}
                <div style={{ textAlign: 'center' }}>
                    <Text style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                        Already have an account?{' '}
                        <Link
                            to="/login"
                            style={{
                                color: 'var(--accent-primary)',
                                fontWeight: '500',
                                textDecoration: 'none'
                            }}
                        >
                            Sign in
                        </Link>
                    </Text>
                </div>
            </Card>
        </div>
    );
};

export default Register;









