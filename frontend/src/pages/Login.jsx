import React from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const Login = () => {
    const navigate = useNavigate();

    const onFinish = (values) => {
        // In a real app, you would call your API here
        console.log('Login values:', values);
        message.success('Login successful!');
        navigate('/');
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-md shadow-md">
                <div className="text-center mb-6">
                    <Title level={2} className="!mb-0">🎓 LearnHub</Title>
                    <p className="text-gray-500">Professional Training Management Platform</p>
                </div>

                <Form
                    name="login"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    layout="vertical"
                    size="large"
                >
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Email" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                    </Form.Item>

                    <Form.Item>
                        <div className="flex justify-between">
                            <a href="#" className="text-primary">Forgot password?</a>
                        </div>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="w-full">
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Login;
