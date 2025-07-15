import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Form, Input, Button, Card, Typography, Alert, Divider, Checkbox } from 'antd';
import { LockOutlined, MailOutlined, GoogleOutlined, GithubOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import Logo from '../components/Logo';
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
        <div className="min-h-screen bg-cream-100 dark:bg-charcoal-500 flex items-center justify-center p-6 transition-colors duration-300">
            <Card className="w-full max-w-md bg-white dark:bg-warm-900 border-warm-200 dark:border-warm-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                {/* Logo and Header */}
                <div className="text-center mb-8">
                    <Logo
                        to="/"
                        size="xlarge"
                        className="inline-flex items-center px-4 py-2 bg-terracotta-500 hover:bg-terracotta-600 rounded-xl text-white transition-all duration-200"
                        showText={false}
                    />
                    <Title
                        level={3}
                        className="mt-4 mb-2 text-charcoal-500 dark:text-cream-100 text-2xl font-semibold"
                    >
                        Welcome back
                    </Title>
                    <Text className="text-warm-500 dark:text-warm-300 text-sm">
                        Please sign in to your account
                    </Text>
                </div>

                {/* Success/Error Messages */}
                {location.state?.message && (
                    <Alert
                        message={location.state.message}
                        type="success"
                        className="mb-4 bg-olive-50 dark:bg-olive-900 border-olive-200 dark:border-olive-700"
                        showIcon
                    />
                )}

                {error && (
                    <Alert
                        message={error}
                        type="error"
                        className="mb-4 bg-rust-50 dark:bg-rust-900 border-rust-200 dark:border-rust-700"
                        showIcon
                    />
                )}

                {/* Login Form */}
                <Form
                    name="login"
                    onFinish={onFinish}
                    layout="vertical"
                    size="large"
                    className="space-y-4"
                >
                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: 'Please input your email!' },
                            { type: 'email', message: 'Please enter a valid email!' }
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined className="text-sage-500" />}
                            placeholder="Email address"
                            className="h-11 rounded-lg text-base bg-white dark:bg-warm-800 border-warm-200 dark:border-warm-600 focus:border-terracotta-500 dark:focus:border-terracotta-500 text-charcoal-500 dark:text-cream-100"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="text-sage-500" />}
                            placeholder="Password"
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            className="h-11 rounded-lg text-base bg-white dark:bg-warm-800 border-warm-200 dark:border-warm-600 focus:border-terracotta-500 dark:focus:border-terracotta-500 text-charcoal-500 dark:text-cream-100"
                        />
                    </Form.Item>

                    <div className="flex justify-between items-center mb-6">
                        <Form.Item name="remember" valuePropName="checked" className="mb-0">
                            <Checkbox className="text-sm text-charcoal-500 dark:text-cream-100">
                                Remember me
                            </Checkbox>
                        </Form.Item>
                        <Link
                            to="/forgot-password"
                            className="text-sm text-sage-500 hover:text-sage-600 dark:text-sage-400 dark:hover:text-sage-300 no-underline transition-colors"
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
                        className="flex-1 h-10 rounded-lg text-sm bg-white dark:bg-warm-800 border-warm-200 dark:border-warm-600 text-charcoal-500 dark:text-cream-100 hover:border-mustard-500 dark:hover:border-mustard-500 hover:text-mustard-600 dark:hover:text-mustard-400 transition-all duration-200"
                    >
                        Google
                    </Button>
                    <Button
                        icon={<GithubOutlined />}
                        className="flex-1 h-10 rounded-lg text-sm bg-white dark:bg-warm-800 border-warm-200 dark:border-warm-600 text-charcoal-500 dark:text-cream-100 hover:border-mustard-500 dark:hover:border-mustard-500 hover:text-mustard-600 dark:hover:text-mustard-400 transition-all duration-200"
                    >
                        GitHub
                    </Button>
                </div>

                {/* Sign up link */}
                <div className="text-center">
                    <Text className="text-sm text-warm-500 dark:text-warm-300">
                        Don't have an account?{' '}
                        <Link
                            to="/register"
                            className="text-sage-500 hover:text-sage-600 dark:text-sage-400 dark:hover:text-sage-300 font-medium no-underline transition-colors"
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
