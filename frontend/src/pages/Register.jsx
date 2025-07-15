import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card, Typography, Divider, Select, Checkbox, Alert } from 'antd';
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
                        Create your account
                    </Title>
                    <Text className="text-warm-500 dark:text-warm-300 text-sm">
                        Join thousands of learners today
                    </Text>
                </div>

                {/* Error Message */}
                {error && (
                    <Alert
                        message={error}
                        type="error"
                        className="mb-4 bg-rust-50 dark:bg-rust-900 border-rust-200 dark:border-rust-700"
                        showIcon
                    />
                )}

                {/* Register Form */}
                <Form
                    name="register"
                    onFinish={onFinish}
                    layout="vertical"
                    size="large"
                    className="space-y-4"
                >
                    <Form.Item
                        name="name"
                        rules={[
                            { required: true, message: 'Please input your full name!' },
                            { min: 2, message: 'Name must be at least 2 characters!' }
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined className="text-sage-500" />}
                            placeholder="Full name"
                            className="h-11 rounded-lg text-base bg-white dark:bg-warm-800 border-warm-200 dark:border-warm-600 focus:border-terracotta-500 dark:focus:border-terracotta-500 text-charcoal-500 dark:text-cream-100"
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
                            prefix={<MailOutlined className="text-sage-500" />}
                            placeholder="Email address"
                            className="h-11 rounded-lg text-base bg-white dark:bg-warm-800 border-warm-200 dark:border-warm-600 focus:border-terracotta-500 dark:focus:border-terracotta-500 text-charcoal-500 dark:text-cream-100"
                        />
                    </Form.Item>

                    <Form.Item
                        name="role"
                        rules={[{ required: true, message: 'Please select your role!' }]}
                    >
                        <Select
                            placeholder="I want to..."
                            className="h-11 text-base"
                            suffixIcon={<TeamOutlined className="text-sage-500" />}
                        >
                            <Option value="student">Learn new skills (Student)</Option>
                            <Option value="trainer">Teach others (Trainer)</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            { required: true, message: 'Please input your password!' },
                            { min: 8, message: 'Password must be at least 8 characters!' }
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="text-sage-500" />}
                            placeholder="Password"
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            className="h-11 rounded-lg text-base bg-white dark:bg-warm-800 border-warm-200 dark:border-warm-600 focus:border-terracotta-500 dark:focus:border-terracotta-500 text-charcoal-500 dark:text-cream-100"
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
                                    return Promise.reject(new Error('The passwords do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="text-sage-500" />}
                            placeholder="Confirm password"
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            className="h-11 rounded-lg text-base bg-white dark:bg-warm-800 border-warm-200 dark:border-warm-600 focus:border-terracotta-500 dark:focus:border-terracotta-500 text-charcoal-500 dark:text-cream-100"
                        />
                    </Form.Item>

                    <Form.Item
                        name="terms"
                        valuePropName="checked"
                        rules={[
                            {
                                validator: (_, value) =>
                                    value ? Promise.resolve() : Promise.reject(new Error('Please accept the terms and conditions!')),
                            },
                        ]}
                    >
                        <Checkbox className="text-sm text-charcoal-500 dark:text-cream-100">
                            I agree to the{' '}
                            <Link to="/terms" className="text-sage-500 hover:text-sage-600 dark:text-sage-400 dark:hover:text-sage-300 no-underline">
                                Terms of Service
                            </Link>
                            {' '}and{' '}
                            <Link to="/privacy" className="text-sage-500 hover:text-sage-600 dark:text-sage-400 dark:hover:text-sage-300 no-underline">
                                Privacy Policy
                            </Link>
                        </Checkbox>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            className="w-full h-11 bg-terracotta-500 hover:bg-terracotta-600 border-terracotta-500 hover:border-terracotta-600 rounded-lg text-base font-medium transition-all duration-200 hover:shadow-md"
                        >
                            Create Account
                        </Button>
                    </Form.Item>
                </Form>

                <Divider className="my-5 text-warm-500 dark:text-warm-300 text-sm border-warm-200 dark:border-warm-700">
                    Or sign up with
                </Divider>

                {/* Social Login */}
                <div className="flex gap-3 mb-6">
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

                {/* Sign in link */}
                <div className="text-center">
                    <Text className="text-sm text-warm-500 dark:text-warm-300">
                        Already have an account?{' '}
                        <Link
                            to="/login"
                            className="text-sage-500 hover:text-sage-600 dark:text-sage-400 dark:hover:text-sage-300 font-medium no-underline transition-colors"
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









