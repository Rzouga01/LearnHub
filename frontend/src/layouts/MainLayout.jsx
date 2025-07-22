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

    // Role-based menu items
    let items = [
        {
            key: '/dashboard',
            icon: <DashboardOutlined />,
            label: <Link to="/dashboard">Dashboard</Link>,
        }
    ];

    // Role-specific menu items
    if (user?.role === 'trainer') {
        // Trainers can only see Students and Courses
        items.push(
            {
                key: '/dashboard/students',
                icon: <TeamOutlined />,
                label: <Link to="/dashboard/students">My Students</Link>,
            },
            {
                key: '/dashboard/courses',
                icon: <BookOutlined />,
                label: <Link to="/dashboard/courses">My Courses</Link>,
            }
        );
    } else if (user?.role === 'coordinator') {
        // Coordinators can only see Trainers and Trainer Applications
        items.push(
            {
                key: '/dashboard/trainers',
                icon: <UserOutlined />,
                label: <Link to="/dashboard/trainers">Trainers</Link>,
            },
            {
                key: '/dashboard/trainer-applications',
                icon: <FileTextOutlined />,
                label: <Link to="/dashboard/trainer-applications">Trainer Applications</Link>,
            }
        );
    } else if (user?.role === 'admin') {
        // Admins can see everything
        items.push(
            {
                key: '/dashboard/courses',
                icon: <BookOutlined />,
                label: <Link to="/dashboard/courses">All Courses</Link>,
            },
            {
                key: '/dashboard/students',
                icon: <TeamOutlined />,
                label: <Link to="/dashboard/students">All Students</Link>,
            },
            {
                key: '/dashboard/trainers',
                icon: <UserOutlined />,
                label: <Link to="/dashboard/trainers">All Trainers</Link>,
            },
            {
                key: '/dashboard/trainer-applications',
                icon: <FileTextOutlined />,
                label: <Link to="/dashboard/trainer-applications">Trainer Applications</Link>,
            }
        );
    } else if (user?.role === 'student') {
        // Students can only see courses
        items.push({
            key: '/dashboard/courses',
            icon: <BookOutlined />,
            label: <Link to="/dashboard/courses">Browse Courses</Link>,
        });
    }

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
                        ? 'linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)'
                        : 'linear-gradient(180deg, #f8f9fa 0%, #ffffff 50%, #f8f9fa 100%)',
                    boxShadow: '4px 0 24px rgba(0, 0, 0, 0.15)',
                    borderRight: isDark 
                        ? '1px solid rgba(148, 163, 184, 0.2)' 
                        : '1px solid rgba(231, 111, 81, 0.1)',
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
                    border: isDark 
                        ? '1px solid rgba(100, 116, 139, 0.3)' 
                        : '1px solid rgba(231, 111, 81, 0.1)',
                    background: isDark 
                        ? 'rgba(30, 41, 59, 0.8)' 
                        : 'rgba(231, 111, 81, 0.05)',
                    backdropFilter: 'blur(20px)',
                    margin: '0 12px',
                    marginTop: '12px',
                    borderRadius: '16px',
                    marginBottom: '24px'
                }}>
                    {collapsed ? (
                        <Logo
                            to="/dashboard"
                            size="small"
                            showText={false}
                            style={{ color: '#E76F51' }}
                        />
                    ) : (
                        <Logo
                            to="/dashboard"
                            size="medium"
                            showText={true}
                            style={{ color: '#E76F51' }}
                        />
                    )}
                </div>

                {/* User Profile Section */}
                {!collapsed && (
                    <div style={{
                        padding: '20px',
                        marginBottom: '24px',
                        background: isDark 
                            ? 'rgba(244, 162, 97, 0.15)' 
                            : 'rgba(244, 162, 97, 0.08)',
                        margin: '0 12px 24px 12px',
                        borderRadius: '16px',
                        border: isDark 
                            ? '1px solid rgba(244, 162, 97, 0.3)' 
                            : '1px solid rgba(244, 162, 97, 0.2)',
                        backdropFilter: 'blur(20px)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <Avatar
                                size={48}
                                icon={<UserOutlined />}
                                style={{
                                    background: isDark 
                                        ? 'linear-gradient(135deg, #64748b 0%, #94a3b8 100%)' 
                                        : 'linear-gradient(135deg, #E76F51 0%, #F4A261 100%)',
                                    border: isDark 
                                        ? '2px solid rgba(148, 163, 184, 0.4)' 
                                        : '2px solid rgba(231, 111, 81, 0.3)'
                                }}
                            />
                            <div>
                                <div style={{
                                    color: isDark ? '#ffffff' : '#000000',
                                    fontWeight: '600',
                                    fontSize: '16px',
                                    marginBottom: '2px'
                                }}>
                                    {user?.name || 'User'}
                                </div>
                                <div style={{
                                    color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
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
                        theme={isDark ? "dark" : "light"}
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
                                    (isDark 
                                        ? 'linear-gradient(135deg, #475569 0%, #64748b 100%)' 
                                        : 'linear-gradient(135deg, #E76F51 0%, #F4A261 100%)') :
                                    'transparent',
                                border: pathname === item.key ?
                                    (isDark 
                                        ? '1px solid rgba(100, 116, 139, 0.5)' 
                                        : '1px solid rgba(231, 111, 81, 0.3)') :
                                    '1px solid transparent',
                                color: pathname === item.key ? 
                                    'white' : 
                                    (isDark ? '#cbd5e1' : 'rgba(0, 0, 0, 0.8)'),
                                fontWeight: pathname === item.key ? '600' : '500'
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
                        background: isDark 
                            ? 'rgba(42, 157, 143, 0.15)' 
                            : 'rgba(42, 157, 143, 0.08)',
                        borderRadius: '16px',
                        border: isDark 
                            ? '1px solid rgba(42, 157, 143, 0.3)' 
                            : '1px solid rgba(42, 157, 143, 0.2)',
                        backdropFilter: 'blur(20px)'
                    }}>
                        <div style={{ 
                            color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)', 
                            fontSize: '12px', 
                            marginBottom: '8px',
                            fontWeight: '600'
                        }}>
                            Quick Stats
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ color: '#E76F51', fontSize: '16px', fontWeight: '600' }}>8</div>
                                <div style={{ 
                                    color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)', 
                                    fontSize: '10px' 
                                }}>Courses</div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ color: '#6A994E', fontSize: '16px', fontWeight: '600' }}>18</div>
                                <div style={{ 
                                    color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)', 
                                    fontSize: '10px' 
                                }}>Streak</div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ color: '#F4A261', fontSize: '16px', fontWeight: '600' }}>42</div>
                                <div style={{ 
                                    color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)', 
                                    fontSize: '10px' 
                                }}>Level</div>
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
                        ? 'rgba(15, 23, 42, 0.95)'
                        : 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    borderBottom: isDark
                        ? '1px solid rgba(51, 65, 85, 0.6)'
                        : '1px solid rgba(231, 111, 81, 0.1)',
                    boxShadow: isDark
                        ? '0 4px 20px rgba(0, 0, 0, 0.4)'
                        : '0 2px 8px rgba(231, 111, 81, 0.1)',
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
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: isDark 
                                        ? 'rgba(51, 65, 85, 0.6)' 
                                        : 'rgba(231, 111, 81, 0.08)',
                                    color: isDark ? '#94a3b8' : '#E76F51',
                                    border: isDark 
                                        ? '1px solid rgba(100, 116, 139, 0.4)' 
                                        : '1px solid rgba(231, 111, 81, 0.2)',
                                    transition: 'all 0.2s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.background = isDark 
                                        ? 'rgba(71, 85, 105, 0.8)' 
                                        : 'rgba(231, 111, 81, 0.15)';
                                    e.target.style.transform = 'scale(1.05)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.background = isDark 
                                        ? 'rgba(51, 65, 85, 0.6)' 
                                        : 'rgba(231, 111, 81, 0.08)';
                                    e.target.style.transform = 'scale(1)';
                                }}
                            />
                            <div style={{
                                background: isDark 
                                    ? 'rgba(244, 162, 97, 0.15)' 
                                    : 'rgba(244, 162, 97, 0.08)',
                                border: isDark 
                                    ? '1px solid rgba(244, 162, 97, 0.3)' 
                                    : '1px solid rgba(244, 162, 97, 0.2)',
                                borderRadius: '12px',
                                padding: '8px 16px',
                                backdropFilter: 'blur(10px)'
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
                                    background: isDark 
                                        ? 'rgba(30, 41, 59, 0.9)' 
                                        : 'rgba(42, 157, 143, 0.08)',
                                    border: isDark 
                                        ? '1px solid rgba(71, 85, 105, 0.6)' 
                                        : '1px solid rgba(42, 157, 143, 0.2)',
                                    position: 'relative',
                                    zIndex: 1,
                                    backdropFilter: 'blur(10px)'
                                }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = isDark 
                                            ? 'rgba(51, 65, 85, 0.9)' 
                                            : 'rgba(42, 157, 143, 0.15)';
                                        e.currentTarget.style.transform = 'translateY(-1px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = isDark 
                                            ? 'rgba(30, 41, 59, 0.9)' 
                                            : 'rgba(42, 157, 143, 0.08)';
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
                                            background: isDark 
                                                ? 'linear-gradient(135deg, #64748b 0%, #94a3b8 100%)' 
                                                : 'linear-gradient(135deg, #E76F51 0%, #F4A261 100%)',
                                            border: isDark 
                                                ? '2px solid rgba(148, 163, 184, 0.4)' 
                                                : '2px solid rgba(231, 111, 81, 0.3)'
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
                        background: isDark 
                            ? 'linear-gradient(135deg, #0f172a, #1e293b)'
                            : 'linear-gradient(135deg, #f8f9fa, #ffffff)',
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
