import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Form, Input, Button, Card, Typography, Alert, Divider, Checkbox } from 'antd';
import { LockOutlined, MailOutlined, BookOutlined, GoogleOutlined, GithubOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import api from '../services/api';

const { Title, Text } = Typography;

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();
    const { theme } = useTheme();

    const onFinish = async (values) => {
        setLoading(true);
        setError('');

        try {
            const response = await api.routes.auth.login(values);

            if (response.data.status === 'success') {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                login(response.data.user, response.data.token);
                navigate('/dashboard');
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setError('Invalid email or password');
            } else if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError('Something went wrong. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <Card className="auth-card fade-in">
                {/* Logo and Header */}
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <Link to="/" className="auth-logo">
                        <BookOutlined style={{ fontSize: '20px', marginRight: '8px' }} />
                        <span style={{ fontSize: '18px', fontWeight: '600' }}>LearnHub</span>
                    </Link>
                    <Title
                        level={3}
                        style={{
                            margin: '0 0 8px 0',
                            color: 'var(--text-primary)',
                            fontSize: '24px',
                            fontWeight: '600'
                        }}
                    >
                        Welcome back
                    </Title>
                    <Text style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                        Please sign in to your account
                    </Text>
                </div>

                {/* Success/Error Messages */}
                {location.state?.message && (
                    <div className="alert-success">
                        {location.state.message}
                    </div>
                )}

                {error && (
                    <div className="alert-error">
                        {error}
                    </div>
                )}

                {/* Login Form */}
                <Form
                    name="login"
                    onFinish={onFinish}
                    layout="vertical"
                    size="large"
                >
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
                        rules={[{ required: true, message: 'Please input your password!' }]}
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

                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '24px'
                    }}>
                        <Form.Item name="remember" valuePropName="checked" style={{ margin: 0 }}>
                            <Checkbox style={{ fontSize: '14px', color: 'var(--text-primary)' }}>
                                Remember me
                            </Checkbox>
                        </Form.Item>
                        <Link
                            to="/forgot-password"
                            style={{
                                color: 'var(--accent-primary)',
                                fontSize: '14px',
                                textDecoration: 'none'
                            }}
                        >
                            Forgot password?
                        </Link>
                    </div>

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
                            Sign in
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

                {/* Social Login */}
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

                {/* Sign up link */}
                <div style={{ textAlign: 'center' }}>
                    <Text style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                        Don't have an account?{' '}
                        <Link
                            to="/register"
                            style={{
                                color: 'var(--accent-primary)',
                                fontWeight: '500',
                                textDecoration: 'none'
                            }}
                        >
                            Sign up
                        </Link>
                    </Text>
                </div>
            </Card>
        </div>
    );
};

export default Login;
