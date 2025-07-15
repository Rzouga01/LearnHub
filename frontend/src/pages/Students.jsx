import React, { useState } from 'react';
import {
    Table,
    Card,
    Button,
    Typography,
    Input,
    Space,
    Tag,
    Avatar,
    Rate,
    Progress,
    Tooltip,
    Modal,
    Row,
    Col,
    Statistic
} from 'antd';
import {
    SearchOutlined,
    UserOutlined,
    MailOutlined,
    CalendarOutlined,
    TrophyOutlined,
    BookOutlined,
    EyeOutlined,
    MessageOutlined,
    FilterOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

const Students = () => {
    const [searchText, setSearchText] = useState('');
    const [selectedLevel, setSelectedLevel] = useState('all');

    // Sample students data with new color scheme
    const studentsData = [
        {
            id: 1,
            name: 'Alex Thompson',
            email: 'alex.thompson@email.com',
            avatar: '👨‍💻',
            joinedDate: '2024-01-15',
            coursesEnrolled: 5,
            coursesCompleted: 3,
            level: 'Intermediate',
            totalHours: 127,
            certificates: 3,
            progress: 78,
            status: 'Active',
            lastActivity: '2 hours ago'
        },
        {
            id: 2,
            name: 'Maria Garcia',
            email: 'maria.garcia@email.com',
            avatar: '👩‍🎨',
            joinedDate: '2024-02-01',
            coursesEnrolled: 3,
            coursesCompleted: 2,
            level: 'Beginner',
            totalHours: 84,
            certificates: 2,
            progress: 65,
            status: 'Active',
            lastActivity: '1 day ago'
        },
        {
            id: 3,
            name: 'David Kim',
            email: 'david.kim@email.com',
            avatar: '👨‍🔬',
            joinedDate: '2023-12-10',
            coursesEnrolled: 8,
            coursesCompleted: 7,
            level: 'Advanced',
            totalHours: 298,
            certificates: 7,
            progress: 92,
            status: 'Active',
            lastActivity: '5 minutes ago'
        },
        {
            id: 4,
            name: 'Sarah Wilson',
            email: 'sarah.wilson@email.com',
            avatar: '👩‍💼',
            joinedDate: '2024-01-28',
            coursesEnrolled: 4,
            coursesCompleted: 1,
            level: 'Beginner',
            totalHours: 45,
            certificates: 1,
            progress: 25,
            status: 'Inactive',
            lastActivity: '1 week ago'
        }
    ];

    const getLevelColor = (level) => {
        const levelColors = {
            'Beginner': 'bg-olive-100 dark:bg-olive-900 text-olive-700 dark:text-olive-300',
            'Intermediate': 'bg-saffron-100 dark:bg-saffron-900 text-saffron-700 dark:text-saffron-300',
            'Advanced': 'bg-rust-100 dark:bg-rust-900 text-rust-700 dark:text-rust-300',
        };
        return levelColors[level] || 'bg-warm-100 dark:bg-warm-800 text-warm-600 dark:text-warm-300';
    };

    const getStatusColor = (status) => {
        return status === 'Active'
            ? 'bg-olive-100 dark:bg-olive-900 text-olive-700 dark:text-olive-300'
            : 'bg-warm-200 dark:bg-warm-700 text-warm-600 dark:text-warm-300';
    };

    const columns = [
        {
            title: 'Student',
            key: 'student',
            render: (_, record) => (
                <div className="flex items-center gap-3">
                    <div className="text-2xl">{record.avatar}</div>
                    <div>
                        <div className="font-semibold text-charcoal-500 dark:text-cream-100">{record.name}</div>
                        <div className="text-warm-500 dark:text-warm-300 text-sm">{record.email}</div>
                    </div>
                </div>
            ),
        },
        {
            title: 'Level',
            dataIndex: 'level',
            key: 'level',
            render: (level) => (
                <Tag className={`border-0 ${getLevelColor(level)}`}>
                    {level}
                </Tag>
            ),
            filters: [
                { text: 'Beginner', value: 'Beginner' },
                { text: 'Intermediate', value: 'Intermediate' },
                { text: 'Advanced', value: 'Advanced' },
            ],
            onFilter: (value, record) => record.level === value,
        },
        {
            title: 'Progress',
            dataIndex: 'progress',
            key: 'progress',
            render: (progress) => (
                <div className="w-24">
                    <Progress
                        percent={progress}
                        size="small"
                        strokeColor="#E76F51"
                        trailColor="#F1EFED"
                    />
                </div>
            ),
            sorter: (a, b) => a.progress - b.progress,
        },
        {
            title: 'Courses',
            key: 'courses',
            render: (_, record) => (
                <div className="text-center">
                    <div className="text-terracotta-500 font-semibold">
                        {record.coursesCompleted}/{record.coursesEnrolled}
                    </div>
                    <div className="text-warm-500 dark:text-warm-300 text-xs">completed</div>
                </div>
            ),
        },
        {
            title: 'Learning Hours',
            dataIndex: 'totalHours',
            key: 'totalHours',
            render: (hours) => (
                <div className="flex items-center gap-1">
                    <CalendarOutlined className="text-sage-500" />
                    <span className="text-sage-600 dark:text-sage-400 font-medium">{hours}h</span>
                </div>
            ),
            sorter: (a, b) => a.totalHours - b.totalHours,
        },
        {
            title: 'Certificates',
            dataIndex: 'certificates',
            key: 'certificates',
            render: (certificates) => (
                <div className="flex items-center gap-1">
                    <TrophyOutlined className="text-mustard-500" />
                    <span className="text-mustard-600 dark:text-mustard-400 font-medium">{certificates}</span>
                </div>
            ),
            sorter: (a, b) => a.certificates - b.certificates,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag className={`border-0 ${getStatusColor(status)}`}>
                    {status}
                </Tag>
            ),
            filters: [
                { text: 'Active', value: 'Active' },
                { text: 'Inactive', value: 'Inactive' },
            ],
            onFilter: (value, record) => record.status === value,
        },
        {
            title: 'Last Activity',
            dataIndex: 'lastActivity',
            key: 'lastActivity',
            render: (activity) => (
                <span className="text-warm-500 dark:text-warm-300 text-sm">{activity}</span>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip title="View Profile">
                        <Button
                            type="text"
                            icon={<EyeOutlined />}
                            className="text-sage-500 hover:text-sage-600 hover:bg-sage-50 dark:hover:bg-sage-900"
                        />
                    </Tooltip>
                    <Tooltip title="Send Message">
                        <Button
                            type="text"
                            icon={<MessageOutlined />}
                            className="text-mustard-500 hover:text-mustard-600 hover:bg-mustard-50 dark:hover:bg-mustard-900"
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    const filteredStudents = studentsData.filter(student =>
        student.name.toLowerCase().includes(searchText.toLowerCase()) ||
        student.email.toLowerCase().includes(searchText.toLowerCase())
    );

    const stats = {
        totalStudents: studentsData.length,
        activeStudents: studentsData.filter(s => s.status === 'Active').length,
        avgProgress: Math.round(studentsData.reduce((acc, s) => acc + s.progress, 0) / studentsData.length),
        totalCertificates: studentsData.reduce((acc, s) => acc + s.certificates, 0)
    };

    return (
        <div className="min-h-screen bg-cream-100 dark:bg-charcoal-500 p-6 transition-colors duration-300">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Header */}
                <Card className="bg-white dark:bg-warm-900 border-warm-200 dark:border-warm-700">
                    <Title level={2} className="text-charcoal-500 dark:text-cream-100 mb-2">
                        <UserOutlined className="text-terracotta-500 mr-3" />
                        Students Management
                    </Title>
                    <Text className="text-warm-500 dark:text-warm-300">
                        Monitor student progress and engagement
                    </Text>
                </Card>

                {/* Stats Overview */}
                <Row gutter={[24, 24]}>
                    <Col xs={24} sm={12} lg={6}>
                        <Card className="bg-terracotta-50 dark:bg-terracotta-900 border-terracotta-200 dark:border-terracotta-700 text-center">
                            <Statistic
                                title={<span className="text-warm-500 dark:text-warm-300">Total Students</span>}
                                value={stats.totalStudents}
                                prefix={<UserOutlined className="text-terracotta-500" />}
                                valueStyle={{ color: '#E76F51' }}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Card className="bg-olive-50 dark:bg-olive-900 border-olive-200 dark:border-olive-700 text-center">
                            <Statistic
                                title={<span className="text-warm-500 dark:text-warm-300">Active Students</span>}
                                value={stats.activeStudents}
                                prefix={<UserOutlined className="text-olive-500" />}
                                valueStyle={{ color: '#6A994E' }}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Card className="bg-sage-50 dark:bg-sage-900 border-sage-200 dark:border-sage-700 text-center">
                            <Statistic
                                title={<span className="text-warm-500 dark:text-warm-300">Avg Progress</span>}
                                value={stats.avgProgress}
                                suffix="%"
                                prefix={<BookOutlined className="text-sage-500" />}
                                valueStyle={{ color: '#2A9D8F' }}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Card className="bg-mustard-50 dark:bg-mustard-900 border-mustard-200 dark:border-mustard-700 text-center">
                            <Statistic
                                title={<span className="text-warm-500 dark:text-warm-300">Certificates</span>}
                                value={stats.totalCertificates}
                                prefix={<TrophyOutlined className="text-mustard-500" />}
                                valueStyle={{ color: '#F4A261' }}
                            />
                        </Card>
                    </Col>
                </Row>

                {/* Search and Filters */}
                <Card className="bg-white dark:bg-warm-900 border-warm-200 dark:border-warm-700">
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                            <Input
                                placeholder="Search students by name or email..."
                                prefix={<SearchOutlined className="text-sage-500" />}
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                className="h-10 bg-cream-50 dark:bg-warm-800 border-warm-200 dark:border-warm-600"
                            />
                        </Col>
                        <Col xs={24} md={12}>
                            <div className="flex justify-end">
                                <Button
                                    icon={<FilterOutlined />}
                                    className="text-sage-500 border-sage-500 hover:bg-sage-50 dark:hover:bg-sage-900"
                                >
                                    Advanced Filters
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Card>

                {/* Students Table */}
                <Card className="bg-white dark:bg-warm-900 border-warm-200 dark:border-warm-700">
                    <Table
                        columns={columns}
                        dataSource={filteredStudents}
                        rowKey="id"
                        pagination={{
                            pageSize: 10,
                            showTotal: (total, range) => (
                                <span className="text-warm-500 dark:text-warm-300">
                                    {`${range[0]}-${range[1]} of ${total} students`}
                                </span>
                            ),
                        }}
                        className="custom-table"
                        scroll={{ x: 'max-content' }}
                    />
                </Card>
            </div>
        </div>
    );
};

export default Students;
