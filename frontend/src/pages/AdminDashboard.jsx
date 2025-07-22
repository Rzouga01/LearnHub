import React, { useEffect, useState } from 'react';
import {
    Table, Button, Tag, Space, Typography, message, Layout, Menu, Card,
    Statistic, Row, Col, Avatar, Dropdown, Input, Select, DatePicker, Modal, Form, Spin, Popconfirm, Tooltip, Descriptions
} from 'antd';
import {
    UserOutlined, DashboardOutlined, TeamOutlined, SettingOutlined,
    FileTextOutlined, BarChartOutlined, BellOutlined, SearchOutlined,
    PlusOutlined, EditOutlined, EyeOutlined, DeleteOutlined
} from '@ant-design/icons';
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js';
Chart.register(LineElement, PointElement, LinearScale, CategoryScale);

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

const AdminDashboard = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [selectedMenuItem, setSelectedMenuItem] = useState('users');
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [viewUser, setViewUser] = useState({});
    const [editForm] = Form.useForm();
    const [addForm] = Form.useForm();
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch('/api/users', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Accept': 'application/json',
            },
            credentials: 'include',
        })
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch users');
                return res.json();
            })
            .then(data => {
                setUsers(data.users || data); // adjust if your API returns a different shape
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                setError('Failed to load users. Please check your login and backend.');
            });
    }, []);

    const user = {
        name: 'Admin User'
    };

    const sidebarItems = [
        {
            key: 'dashboard',
            icon: <DashboardOutlined />,
            label: 'Dashboard'
        },
        {
            key: 'users',
            icon: <TeamOutlined />,
            label: 'Users'
        },
        {
            key: 'reports',
            icon: <FileTextOutlined />,
            label: 'Reports'
        },
        {
            key: 'analytics',
            icon: <BarChartOutlined />,
            label: 'Analytics'
        },
        {
            key: 'settings',
            icon: <SettingOutlined />,
            label: 'Settings'
        }
    ];

    const userMenuItems = [
        {
            key: 'profile',
            label: 'Profile'
        },
        {
            key: 'logout',
            label: 'Logout'
        }
    ];

    const stats = [
        {
            title: 'Total Users',
            value: 1254,
            color: '#2A9D8F'
        },
        {
            title: 'Active Users',
            value: 1023,
            color: '#E76F51'
        },
        {
            title: 'New Users',
            value: 54,
            color: '#F4A261'
        },
        {
            title: 'Inactive Users',
            value: 177,
            color: '#7A706E'
        }
    ];

    const handleDeleteUser = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`/api/users/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Accept': 'application/json',
                },
                credentials: 'include',
            });
            if (!response.ok) throw new Error('Failed to delete user');
            setUsers(prev => prev.filter(u => u.id !== id));
            message.success('User deleted successfully');
        } catch (err) {
            setError('Failed to delete user.');
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Email Verified',
            dataIndex: 'email_verified_at',
            key: 'email_verified_at',
            render: (val) => val ? new Date(val).toLocaleString() : <Tag color="red">Not Verified</Tag>,
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render: (role) => {
                let color = 'geekblue';
                if (role === 'admin') color = 'volcano';
                if (role === 'student') color = 'green';
                if (role === 'trainer') color = 'blue';
                if (role === 'coordinator') color = 'purple';
                return <Tag color={color}>{role ? role.toUpperCase() : 'UNKNOWN'}</Tag>;
            },
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Date of Birth',
            dataIndex: 'dob',
            key: 'dob',
            render: (val) => val ? new Date(val).toLocaleDateString() : '',
        },
        {
            title: 'Phone Number',
            dataIndex: 'phone_number',
            key: 'phone_number',
        },
        {
            title: 'Created At',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (val) => val ? new Date(val).toLocaleString() : '',
        },
        {
            title: 'Updated At',
            dataIndex: 'updated_at',
            key: 'updated_at',
            render: (val) => val ? new Date(val).toLocaleString() : '',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip title="View">
                        <Button
                            type="default"
                            icon={<EyeOutlined />}
                            shape="circle"
                            onClick={() => {
                                setViewUser(record);
                                setIsViewModalOpen(true);
                            }}
                        />
                    </Tooltip>
                    <Tooltip title="Edit">
                        <Button
                            type="primary"
                            icon={<EditOutlined />}
                            shape="circle"
                            onClick={() => openEditModal(record)}
                        />
                    </Tooltip>
                    <Popconfirm
                        title="Are you sure to delete this user?"
                        onConfirm={() => handleDeleteUser(record.id)}
                        okText="Delete"
                        okType="danger"
                        cancelText="Cancel"
                    >
                        <Tooltip title="Delete">
                            <Button
                                type="primary"
                                danger
                                icon={<DeleteOutlined />}
                                shape="circle"
                                loading={loading}
                            />
                        </Tooltip>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const logout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    const mockNotifications = [
        { id: 1, message: 'New user registered: John Doe', time: '2m ago' },
        { id: 2, message: 'System update completed', time: '1h ago' },
        { id: 3, message: 'Trainer application approved', time: '3h ago' },
    ];

    const handleBulkDelete = () => {
        if (!selectedRowKeys.length) return;
        Modal.confirm({
            title: 'Are you sure you want to delete the selected users?',
            content: 'This action cannot be undone.',
            okText: 'Delete',
            okType: 'danger',
            cancelText: 'Cancel',
            onOk: async () => {
                setLoading(true);
                setError(null);
                try {
                    await Promise.all(
                        selectedRowKeys.map(id =>
                            fetch(`/api/users/${id}`, {
                                method: 'DELETE',
                                headers: {
                                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                                    'Accept': 'application/json',
                                },
                                credentials: 'include',
                            })
                        )
                    );
                    setUsers(prev => prev.filter(u => !selectedRowKeys.includes(u.id)));
                    setSelectedRowKeys([]);
                    message.success('Selected users deleted successfully');
                } catch (err) {
                    setError('Failed to delete users.');
                } finally {
                    setLoading(false);
                }
            }
        });
    };

    const handleEditUser = async (values) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`/api/users/${values.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Accept': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    ...values,
                    dob: values.dob && values.dob.format ? values.dob.format('YYYY-MM-DD') : values.dob || null,
                }),
            });
            if (!response.ok) throw new Error('Failed to update user');
            const updatedUser = await response.json();
            setUsers((prev) => prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
            setIsEditModalOpen(false);
            message.success('User updated successfully');
        } catch (err) {
            setError('Failed to update user.');
        } finally {
            setLoading(false);
        }
    };

    const handleAddUser = async (values) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Accept': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    ...values,
                    dob: values.dob && values.dob.format ? values.dob.format('YYYY-MM-DD') : values.dob || null,
                }),
            });
            if (!response.ok) throw new Error('Failed to add user');
            const newUser = await response.json();
            setUsers((prev) => [...prev, newUser]);
            setIsAddModalOpen(false);
            addForm.resetFields();
            message.success('User added successfully');
        } catch (err) {
            setError('Failed to add user.');
        } finally {
            setLoading(false);
        }
    };

    const customStyles = `
        background: #FFFFFF!important;
        border: 1px solid #f0f0f0!important;
    `;

    // Sidebar navigation logic
    const renderContent = () => {
        switch (selectedMenuItem) {
            case 'dashboard':
                return (
                    <div style={{ padding: 24 }}>
                        <Row gutter={[24, 24]}>
                            {stats.map((stat, idx) => (
                                <Col xs={24} sm={12} md={6} key={stat.title}>
                                    <Card style={{
                                        background: `linear-gradient(135deg, ${stat.color}22 0%, #fff 100%)`,
                                        border: 'none',
                                        borderRadius: 16,
                                        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                                        color: stat.color
                                    }}>
                                        <Statistic
                                            title={<span style={{ color: stat.color }}>{stat.title}</span>}
                                            value={stat.value}
                                            valueStyle={{ color: stat.color, fontWeight: 700, fontSize: 28 }}
                                        />
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                        {/* Analytics Chart */}
                        <Card style={{ marginTop: 32, borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
                            <Title level={4} style={{ marginBottom: 16 }}>User Growth Analytics</Title>
                            <Line
                                data={{
                                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                                    datasets: [
                                        {
                                            label: 'Users',
                                            data: [200, 400, 600, 800, 1000, 1200, 1254],
                                            borderColor: '#E76F51',
                                            backgroundColor: 'rgba(231, 111, 81, 0.1)',
                                            tension: 0.4,
                                        },
                                    ],
                                }}
                                options={{
                                    responsive: true,
                                    plugins: { legend: { display: false } },
                                    scales: { y: { beginAtZero: true } }
                                }}
                                height={80}
                            />
                        </Card>
                        {/* Recent Activity */}
                        <Card style={{ marginTop: 32, borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
                            <Title level={5}>Recent Activity</Title>
                            <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
                                {mockNotifications.map(n => (
                                    <li key={n.id} style={{ padding: '12px 0', borderBottom: '1px solid #f0f0f0' }}>
                                        <BellOutlined style={{ color: '#E76F51', marginRight: 8 }} />
                                        <span style={{ color: '#2E2E2E', fontWeight: 500 }}>{n.message}</span>
                                        <span style={{ color: '#7A706E', marginLeft: 12, fontSize: 12 }}>{n.time}</span>
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    </div>
                );
            case 'users':
                return (
                    <div style={{ padding: 24 }}>
                        <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
                            <Col>
                                <Title level={3} style={{ margin: 0 }}>Users</Title>
                            </Col>
                            <Col>
                                <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsAddModalOpen(true)}>
                                    Add User
                                </Button>
                                <Button danger style={{ marginLeft: 8 }} disabled={!selectedRowKeys.length || loading} onClick={handleBulkDelete}>
                                    Delete Selected
                                </Button>
                            </Col>
                        </Row>
                        {error && <div style={{ color: 'red', marginBottom: 16 }}>{error}</div>}
                        {loading ? <Spin size="large" /> : (
                            <Table
                                rowKey="id"
                                dataSource={users}
                                columns={columns}
                                rowSelection={{
                                    selectedRowKeys,
                                    onChange: setSelectedRowKeys
                                }}
                                loading={loading}
                                pagination={{ pageSize: 6 }}
                                bordered
                                style={{ borderRadius: 16, overflow: 'hidden' }}
                            />
                        )}
                    </div>
                );
            case 'reports':
                return (
                    <div style={{ padding: 24 }}>
                        <Title level={3}>Reports</Title>
                        <Card style={{ borderRadius: 16, marginTop: 16 }}>
                            <Text>Download user and activity reports (feature coming soon).</Text>
                        </Card>
                    </div>
                );
            case 'analytics':
                return (
                    <div style={{ padding: 24 }}>
                        <Title level={3}>Analytics</Title>
                        <Card style={{ borderRadius: 16, marginTop: 16 }}>
                            <Text>Advanced analytics and charts (feature coming soon).</Text>
                        </Card>
                    </div>
                );
            case 'settings':
                return (
                    <div style={{ padding: 24 }}>
                        <Title level={3}>Admin Settings</Title>
                        <Card style={{ borderRadius: 16, marginTop: 16 }}>
                            <Text>Settings and preferences (feature coming soon).</Text>
                        </Card>
                    </div>
                );
            default:
                return null;
        }
    };

    // When opening Edit modal, ensure dob is a Moment object
    const openEditModal = (record) => {
        editForm.setFieldsValue({
            ...record,
            dob: record.dob ? moment(record.dob) : null,
        });
        setIsEditModalOpen(true);
    };

    return (
        <>
            <style>{customStyles}</style>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    collapsible
                    collapsed={collapsed}
                    onCollapse={setCollapsed}
                    style={{ background: '#2E2E2E' }}
                >
                    <div style={{
                        height: 64,
                        margin: 16,
                        background: '#E76F51',
                        borderRadius: 8,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Title level={4} style={{ color: '#FFFFFF', margin: 0 }}>
                            {collapsed ? 'A' : 'ADMIN'}
                        </Title>
                    </div>
                    <Menu
                        theme="dark"
                        defaultSelectedKeys={['users']}
                        mode="inline"
                        items={sidebarItems}
                        onSelect={({ key }) => setSelectedMenuItem(key)}
                        style={{ background: '#2E2E2E' }}
                    />
                </Sider>

                <Layout>
                    <Header style={{
                        background: '#FFFFFF',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0 24px'
                    }}>
                        <Title level={3} style={{ margin: 0, color: '#2E2E2E' }}>
                            User Management
                        </Title>
                        <Space>
                            <Button
                                icon={<BellOutlined />}
                                style={{
                                    backgroundColor: '#F4A261',
                                    borderColor: '#F4A261',
                                    color: '#FFFFFF'
                                }}
                            />
                            <Dropdown
                                menu={{
                                    items: userMenuItems,
                                    onClick: ({ key }) => {
                                        if (key === 'logout') {
                                            logout();
                                            message.info('Logged out successfully');
                                        }
                                    }
                                }}
                                trigger={['click']}
                            >
                                <Space style={{ cursor: 'pointer' }}>
                                    <Avatar style={{ backgroundColor: '#2A9D8F' }}>
                                        {user.name.charAt(0)}
                                    </Avatar>
                                    <Text strong style={{ color: '#2E2E2E' }}>{user.name}</Text>
                                </Space>
                            </Dropdown>
                        </Space>
                    </Header>

                    <Content style={{ minHeight: 280, background: '#F9F8F7' }}>
                        {renderContent()}
                    </Content>
                </Layout>
            </Layout>

            {/* Modals for view/edit/add user */}
            <Modal
                title={<span><UserOutlined style={{ marginRight: 8 }} />User Details</span>}
                open={isViewModalOpen}
                onCancel={() => setIsViewModalOpen(false)}
                footer={null}
            >
                {viewUser && (
                    <Descriptions bordered column={1} size="middle">
                        <Descriptions.Item label="ID">{viewUser.id}</Descriptions.Item>
                        <Descriptions.Item label="Name">{viewUser.name}</Descriptions.Item>
                        <Descriptions.Item label="Email">{viewUser.email}</Descriptions.Item>
                        <Descriptions.Item label="Role">{viewUser.role}</Descriptions.Item>
                        <Descriptions.Item label="Address">{viewUser.address}</Descriptions.Item>
                        <Descriptions.Item label="Date of Birth">{viewUser.dob}</Descriptions.Item>
                        <Descriptions.Item label="Phone Number">{viewUser.phone_number}</Descriptions.Item>
                        <Descriptions.Item label="Email Verified At">{viewUser.email_verified_at}</Descriptions.Item>
                        <Descriptions.Item label="Created At">{viewUser.created_at}</Descriptions.Item>
                        <Descriptions.Item label="Updated At">{viewUser.updated_at}</Descriptions.Item>
                    </Descriptions>
                )}
            </Modal>
            <Modal
                title={<span><EditOutlined style={{ marginRight: 8 }} />Edit User</span>}
                open={isEditModalOpen}
                onCancel={() => setIsEditModalOpen(false)}
                onOk={() => editForm.submit()}
                okText="Save"
            >
                <Form form={editForm} layout="vertical" onFinish={handleEditUser}>
                    <Form.Item name="id" hidden><Input /></Form.Item>
                    <Form.Item name="name" label="Name" rules={[{ required: true }]}><Input /></Form.Item>
                    <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}><Input /></Form.Item>
                    <Form.Item name="role" label="Role" rules={[{ required: true }]}>
                        <Select>
                            <Option value="admin">Admin</Option>
                            <Option value="student">Student</Option>
                            <Option value="trainer">Trainer</Option>
                            <Option value="coordinator">Coordinator</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="address" label="Address"><Input /></Form.Item>
                    <Form.Item name="dob" label="Date of Birth"><DatePicker style={{ width: '100%' }} /></Form.Item>
                    <Form.Item name="phone_number" label="Phone Number"><Input /></Form.Item>
                </Form>
            </Modal>
            <Modal
                title={<span><PlusOutlined style={{ marginRight: 8 }} />Add User</span>}
                open={isAddModalOpen}
                onCancel={() => { setIsAddModalOpen(false); addForm.resetFields(); }}
                onOk={() => addForm.submit()}
                okText="Add"
            >
                <Form form={addForm} layout="vertical" onFinish={handleAddUser}>
                    <Form.Item name="name" label="Name" rules={[{ required: true }]}><Input /></Form.Item>
                    <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}><Input /></Form.Item>
                    <Form.Item name="password" label="Password" rules={[{ required: true, min: 8 }]}><Input.Password /></Form.Item>
                    <Form.Item name="role" label="Role" rules={[{ required: true }]}>
                        <Select>
                            <Option value="admin">Admin</Option>
                            <Option value="student">Student</Option>
                            <Option value="trainer">Trainer</Option>
                            <Option value="coordinator">Coordinator</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="address" label="Address"><Input /></Form.Item>
                    <Form.Item name="dob" label="Date of Birth"><DatePicker style={{ width: '100%' }} /></Form.Item>
                    <Form.Item name="phone_number" label="Phone Number"><Input /></Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default AdminDashboard;