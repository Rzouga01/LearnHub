import React from 'react';
import { Row, Col, Card, Statistic, Table, Typography, Progress, Calendar } from 'antd';
import { UserOutlined, BookOutlined, ClockCircleOutlined, TrophyOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Dashboard = () => {
    // Sample data for the dashboard
    const upcomingClasses = [
        {
            key: '1',
            title: 'Advanced React Patterns',
            trainer: 'John Smith',
            date: '2025-07-10',
            time: '10:00 AM - 12:00 PM',
            participants: 18,
        },
        {
            key: '2',
            title: 'Laravel Performance Optimization',
            trainer: 'Maria Rodriguez',
            date: '2025-07-11',
            time: '2:00 PM - 4:00 PM',
            participants: 12,
        },
        {
            key: '3',
            title: 'UX Design Principles',
            trainer: 'Alex Johnson',
            date: '2025-07-12',
            time: '9:00 AM - 11:00 AM',
            participants: 15,
        },
    ];

    const columns = [
        {
            title: 'Course',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Trainer',
            dataIndex: 'trainer',
            key: 'trainer',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: 'Participants',
            dataIndex: 'participants',
            key: 'participants',
        },
    ];

    const coursesCompletion = [
        { name: 'Web Development', percent: 80 },
        { name: 'Data Science', percent: 65 },
        { name: 'UX Design', percent: 90 },
        { name: 'DevOps', percent: 45 },
    ];

    return (
        <div>
            <Title level={2}>Dashboard</Title>

            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Total Students"
                            value={156}
                            prefix={<UserOutlined />}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Active Courses"
                            value={24}
                            prefix={<BookOutlined />}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Training Hours"
                            value={420}
                            prefix={<ClockCircleOutlined />}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Certificates Issued"
                            value={95}
                            prefix={<TrophyOutlined />}
                        />
                    </Card>
                </Col>
            </Row>

            <Row gutter={[16, 16]} className="mt-6">
                <Col xs={24} lg={16}>
                    <Card title="Upcoming Classes">
                        <Table
                            dataSource={upcomingClasses}
                            columns={columns}
                            pagination={false}
                            size="middle"
                        />
                    </Card>
                </Col>
                <Col xs={24} lg={8}>
                    <Card title="Course Completion Rates">
                        {coursesCompletion.map((course, index) => (
                            <div key={index} className="mb-4">
                                <div className="flex justify-between mb-1">
                                    <span>{course.name}</span>
                                    <span>{course.percent}%</span>
                                </div>
                                <Progress percent={course.percent} strokeColor="#1677ff" />
                            </div>
                        ))}
                    </Card>
                </Col>
            </Row>

            <Row gutter={[16, 16]} className="mt-6">
                <Col xs={24}>
                    <Card title="Training Calendar">
                        <Calendar fullscreen={false} />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;
