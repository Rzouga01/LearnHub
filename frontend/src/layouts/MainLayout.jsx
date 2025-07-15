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
    SettingOutlined,
    FileTextOutlined
} from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import Logo from '../components/Logo';

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const { isDark } = useTheme();

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
        {
            key: '/dashboard/trainer-applications',
            icon: <FileTextOutlined />,
            label: <Link to="/dashboard/trainer-applications">Trainer Applications</Link>,
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
            onClick: () => navigate('/dashboard/settings')
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
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                width={280}
                collapsedWidth={80}
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    background: isDark
                        ? 'linear-gradient(180deg, #001529 0%, #0d1b2a 50%, #001529 100%)'
                        : 'linear-gradient(180deg, #001529 0%, #1c3a52 50%, #001529 100%)',
                    boxShadow: '4px 0 24px rgba(0, 0, 0, 0.15)',
                    borderRight: '1px solid rgba(255, 255, 255, 0.06)',
                    transition: 'all 0.3s ease',
                    zIndex: 1000
                }}
            >
                {/* Logo Section */}
                <div style={{
                    height: '80px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    background: 'rgba(255, 255, 255, 0.02)',
                    backdropFilter: 'blur(10px)',
                    margin: '0 12px',
                    marginTop: '12px',
                    borderRadius: '12px',
                    marginBottom: '24px'
                }}>
                    {collapsed ? (
                        <Logo
                            to="/dashboard"
                            size="small"
                            showText={false}
                            style={{ color: '#0BC5EA' }}
                        />
                    ) : (
                        <Logo
                            to="/dashboard"
                            size="medium"
                            showText={true}
                            style={{ color: '#0BC5EA' }}
                        />
                    )}
                </div>

                {/* User Profile Section */}
                {!collapsed && (
                    <div style={{
                        padding: '20px',
                        marginBottom: '24px',
                        background: 'rgba(11, 197, 234, 0.08)',
                        margin: '0 12px 24px 12px',
                        borderRadius: '16px',
                        border: '1px solid rgba(11, 197, 234, 0.2)',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <Avatar
                                size={48}
                                icon={<UserOutlined />}
                                style={{
                                    background: 'linear-gradient(135deg, #0BC5EA 0%, #40a9ff 100%)',
                                    border: '2px solid rgba(255, 255, 255, 0.2)'
                                }}
                            />
                            <div>
                                <div style={{
                                    color: 'white',
                                    fontWeight: '600',
                                    fontSize: '16px',
                                    marginBottom: '2px'
                                }}>
                                    {user?.name || 'User'}
                                </div>
                                <div style={{
                                    color: 'rgba(255, 255, 255, 0.6)',
                                    fontSize: '12px',
                                    textTransform: 'capitalize'
                                }}>
                                    {user?.role || 'Student'}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Navigation Menu */}
                <div style={{ padding: '0 12px' }}>
                    <Menu
                        theme="dark"
                        mode="inline"
                        selectedKeys={[pathname]}
                        style={{
                            background: 'transparent',
                            border: 'none',
                        }}
                        items={items.map(item => ({
                            ...item,
                            style: {
                                margin: '4px 0',
                                borderRadius: '12px',
                                height: '48px',
                                lineHeight: '48px',
                                background: pathname === item.key ?
                                    'linear-gradient(135deg, #0BC5EA 0%, #40a9ff 100%)' :
                                    'transparent',
                                border: pathname === item.key ?
                                    '1px solid rgba(11, 197, 234, 0.3)' :
                                    '1px solid transparent',
                            }
                        }))}
                    />
                </div>

                {/* Quick Stats (when not collapsed) */}
                {!collapsed && (
                    <div style={{
                        position: 'absolute',
                        bottom: '20px',
                        left: '12px',
                        right: '12px',
                        padding: '16px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: '12px',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                    }}>
                        <div style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '12px', marginBottom: '8px' }}>
                            Quick Stats
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ color: '#0BC5EA', fontSize: '16px', fontWeight: '600' }}>8</div>
                                <div style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '10px' }}>Courses</div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ color: '#52c41a', fontSize: '16px', fontWeight: '600' }}>18</div>
                                <div style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '10px' }}>Streak</div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ color: '#faad14', fontSize: '16px', fontWeight: '600' }}>42</div>
                                <div style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '10px' }}>Level</div>
                            </div>
                        </div>
                    </div>
                )}
            </Sider>

            <Layout style={{
                marginLeft: collapsed ? 80 : 280,
                transition: 'all 0.3s ease',
                minHeight: '100vh'
            }}>
                <Header style={{
                    padding: 0,
                    background: isDark
                        ? 'rgba(26, 32, 44, 0.95)'
                        : 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    borderBottom: isDark
                        ? '1px solid rgba(255, 255, 255, 0.08)'
                        : '1px solid rgba(0, 0, 0, 0.06)',
                    boxShadow: isDark
                        ? '0 2px 8px rgba(0, 0, 0, 0.3)'
                        : '0 2px 8px rgba(0, 0, 0, 0.06)',
                    position: 'sticky',
                    top: 0,
                    zIndex: 100,
                    height: '72px'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0 32px',
                        height: '72px'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                            <Button
                                type="text"
                                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                onClick={() => setCollapsed(!collapsed)}
                                style={{
                                    fontSize: '18px',
                                    width: 44,
                                    height: 44,
                                    borderRadius: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
                                    color: isDark ? '#fff' : '#262626',
                                    transition: 'all 0.2s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.background = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)';
                                    e.target.style.transform = 'scale(1.05)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.background = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)';
                                    e.target.style.transform = 'scale(1)';
                                }}
                            />
                            <div style={{
                                background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
                                borderRadius: '12px',
                                padding: '8px 16px'
                            }}>
                                <Breadcrumb
                                    style={{
                                        fontSize: '14px',
                                        fontWeight: '500'
                                    }}
                                    items={[
                                        {
                                            title: (
                                                <span style={{
                                                    color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)'
                                                }}>
                                                    LearnHub
                                                </span>
                                            )
                                        },
                                        ...pathSegments.map(segment => ({
                                            title: (
                                                <span style={{
                                                    color: isDark ? '#fff' : '#262626',
                                                    fontWeight: '600'
                                                }}>
                                                    {segment.charAt(0).toUpperCase() + segment.slice(1)}
                                                </span>
                                            )
                                        }))
                                    ]}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <Dropdown
                                menu={{ items: userMenuItems }}
                                placement="bottomRight"
                                getPopupContainer={() => document.body}
                                overlayStyle={{ zIndex: 9999 }}
                            >
                                <div style={{
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '8px 16px',
                                    borderRadius: '12px',
                                    transition: 'all 0.2s ease',
                                    background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
                                    border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)',
                                    position: 'relative',
                                    zIndex: 1
                                }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)';
                                        e.currentTarget.style.transform = 'translateY(-1px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                >
                                    <div style={{
                                        marginRight: '12px',
                                        textAlign: 'right',
                                        display: window.innerWidth > 640 ? 'block' : 'none'
                                    }}>
                                        <div style={{
                                            fontSize: '14px',
                                            fontWeight: '600',
                                            color: isDark ? '#fff' : '#262626',
                                            lineHeight: '1.2'
                                        }}>
                                            {user?.name || 'User'}
                                        </div>
                                        <div style={{
                                            fontSize: '12px',
                                            color: isDark ? 'rgba(255, 255, 255, 0.6)' : '#8c8c8c',
                                            textTransform: 'capitalize',
                                            lineHeight: '1.2'
                                        }}>
                                            {user?.role || 'Student'}
                                        </div>
                                    </div>
                                    <Avatar
                                        size={40}
                                        icon={<UserOutlined />}
                                        style={{
                                            background: 'linear-gradient(135deg, #0BC5EA 0%, #40a9ff 100%)',
                                            border: '2px solid rgba(11, 197, 234, 0.2)'
                                        }}
                                    />
                                </div>
                            </Dropdown>
                        </div>
                    </div>
                </Header>

                <Content
                    style={{
                        margin: 0,
                        padding: 0,
                        minHeight: 'calc(100vh - 72px)',
                        background: isDark ? '#1a202c' : '#f5f5f5',
                        overflow: 'auto'
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
