import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
    Layout,
    Menu,
    Button,
    theme,
    Dropdown,
    Avatar,
    Breadcrumb
} from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    DashboardOutlined,
    BookOutlined,
    TeamOutlined,
    UserOutlined,
    LogoutOutlined,
    SettingOutlined
} from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const pathname = location.pathname;
    const pathSegments = pathname.split('/').filter(Boolean);

    const items = [
        {
            key: '/dashboard',
            icon: <DashboardOutlined />,
            label: <Link to="/dashboard">Dashboard</Link>,
        },
        {
            key: '/dashboard/courses',
            icon: <BookOutlined />,
            label: <Link to="/dashboard/courses">Courses</Link>,
        },
        {
            key: '/dashboard/students',
            icon: <TeamOutlined />,
            label: <Link to="/dashboard/students">Students</Link>,
        },
        {
            key: '/dashboard/trainers',
            icon: <UserOutlined />,
            label: <Link to="/dashboard/trainers">Trainers</Link>,
        },
    ];

    const userMenuItems = [
        {
            key: '1',
            icon: <UserOutlined />,
            label: 'My Profile',
            onClick: () => navigate('/dashboard/profile')
        },
        {
            key: '2',
            icon: <SettingOutlined />,
            label: 'Account Settings',
        },
        {
            key: '3',
            icon: <LogoutOutlined />,
            label: 'Logout',
            danger: true,
            onClick: async () => {
                await logout();
                navigate('/login');
            }
        },
    ];

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                }}
            >
                <div className="flex items-center justify-center h-16 m-4">
                    <h1 className="text-white text-xl font-bold">
                        {collapsed ? "LH" : "LearnHub"}
                    </h1>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={[pathname]}
                    items={items}
                />
            </Sider>
            <Layout style={{ marginLeft: collapsed ? 80 : 200, transition: 'all 0.2s' }}>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <div className="flex justify-between items-center px-4">
                        <div className="flex items-center">
                            <Button
                                type="text"
                                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                onClick={() => setCollapsed(!collapsed)}
                                style={{ fontSize: '16px', width: 64, height: 64 }}
                            />
                            <Breadcrumb
                                items={[
                                    { title: 'Home' },
                                    ...pathSegments.map(segment => ({
                                        title: segment.charAt(0).toUpperCase() + segment.slice(1)
                                    }))
                                ]}
                            />
                        </div>
                        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
                            <div className="cursor-pointer flex items-center">
                                <div className="mr-3 hidden sm:inline text-right">
                                    <div>{user?.name || 'User'}</div>
                                    <div className="text-xs text-gray-500 capitalize">{user?.role || 'User'}</div>
                                </div>
                                <Avatar icon={<UserOutlined />} />
                            </div>
                        </Dropdown>
                    </div>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
