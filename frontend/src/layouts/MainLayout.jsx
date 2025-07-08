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

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
    const location = useLocation();
    const navigate = useNavigate();

    const pathname = location.pathname;
    const pathSegments = pathname.split('/').filter(Boolean);

    const items = [
        {
            key: '/',
            icon: <DashboardOutlined />,
            label: <Link to="/">Dashboard</Link>,
        },
        {
            key: '/courses',
            icon: <BookOutlined />,
            label: <Link to="/courses">Courses</Link>,
        },
        {
            key: '/students',
            icon: <TeamOutlined />,
            label: <Link to="/students">Students</Link>,
        },
        {
            key: '/trainers',
            icon: <UserOutlined />,
            label: <Link to="/trainers">Trainers</Link>,
        },
    ];

    const userMenuItems = [
        {
            key: '1',
            icon: <SettingOutlined />,
            label: 'Account Settings',
        },
        {
            key: '2',
            icon: <LogoutOutlined />,
            label: 'Logout',
            danger: true,
            onClick: () => navigate('/login')
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
                                <span className="mr-3 hidden sm:inline">Admin User</span>
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
