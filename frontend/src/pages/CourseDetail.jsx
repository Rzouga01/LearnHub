import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    Typography,
    Card,
    Descriptions,
    Button,
    Tabs,
    Table,
    Progress,
    List,
    Avatar,
    Tag,
    Space,
    Badge,
    Divider,
    message,
    Modal,
    Form,
    Input,
    DatePicker,
    TimePicker,
    Select
} from 'antd';
import {
    EditOutlined,
    UserOutlined,
    CalendarOutlined,
    ClockCircleOutlined,
    BookOutlined,
    BarChartOutlined,
    TeamOutlined,
    FileTextOutlined,
    PlusOutlined,
    DeleteOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;

const CourseDetail = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('1');
    const [isSessionModalVisible, setIsSessionModalVisible] = useState(false);
    const [isResourceModalVisible, setIsResourceModalVisible] = useState(false);
    const [sessionForm] = Form.useForm();
    const [resourceForm] = Form.useForm();

    // Sample course data - in a real app, you would fetch this from your API
    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setCourse({
                id: 1,
                title: 'Advanced React Patterns',
                description: 'Master advanced React patterns including hooks, context, render props, and more. This course will take your React skills to the next level with practical examples and real-world applications.',
                category: 'Web Development',
                level: 'Advanced',
                trainer: {
                    id: 1,
                    name: 'John Smith',
                    email: 'john.smith@example.com',
                    avatar: null
                },
                duration: '12 hours',
                startDate: '2025-07-15',
                endDate: '2025-07-18',
                enrolledStudents: 18,
                maxStudents: 25,
                status: 'Active',
                price: '$299',
                location: 'Online',
                sessions: [
                    {
                        id: 1,
                        title: 'Introduction to Advanced Patterns',
                        date: '2025-07-15',
                        time: '10:00 AM - 12:00 PM',
                        topics: ['Course Overview', 'Review of React Fundamentals', 'Introduction to Advanced Patterns'],
                        materials: ['Slides', 'Code Examples'],
                        attendance: 18
                    },
                    {
                        id: 2,
                        title: 'Render Props & HOCs',
                        date: '2025-07-16',
                        time: '10:00 AM - 12:00 PM',
                        topics: ['Render Props Pattern', 'Higher Order Components', 'Comparing Approaches'],
                        materials: ['Slides', 'Code Examples', 'Practice Exercises'],
                        attendance: 16
                    },
                    {
                        id: 3,
                        title: 'Hooks & Custom Hooks',
                        date: '2025-07-17',
                        time: '10:00 AM - 12:00 PM',
                        topics: ['Built-in Hooks', 'Creating Custom Hooks', 'Hook Dependencies'],
                        materials: ['Slides', 'Code Examples', 'Practice Exercises'],
                        attendance: 17
                    },
                    {
                        id: 4,
                        title: 'Context & State Management',
                        date: '2025-07-18',
                        time: '10:00 AM - 12:00 PM',
                        topics: ['React Context API', 'State Management Patterns', 'Performance Considerations'],
                        materials: ['Slides', 'Code Examples', 'Final Project'],
                        attendance: 0
                    }
                ],
                students: [
                    {
                        id: 1,
                        name: 'Emily Johnson',
                        email: 'emily.johnson@example.com',
                        progress: 75,
                        attendance: 3,
                        totalSessions: 4
                    },
                    {
                        id: 2,
                        name: 'Michael Smith',
                        email: 'michael.smith@example.com',
                        progress: 60,
                        attendance: 2,
                        totalSessions: 4
                    },
                    {
                        id: 3,
                        name: 'Sophia Martinez',
                        email: 'sophia.martinez@example.com',
                        progress: 90,
                        attendance: 3,
                        totalSessions: 4
                    }
                ],
                resources: [
                    {
                        id: 1,
                        title: 'Course Slides',
                        type: 'PDF',
                        url: '#',
                        uploadDate: '2025-07-01'
                    },
                    {
                        id: 2,
                        title: 'Code Repository',
                        type: 'GitHub',
                        url: '#',
                        uploadDate: '2025-07-01'
                    },
                    {
                        id: 3,
                        title: 'Recommended Reading',
                        type: 'Document',
                        url: '#',
                        uploadDate: '2025-07-02'
                    }
                ]
            });
            setLoading(false);
        }, 500);
    }, [id]);

    const handleTabChange = (key) => {
        setActiveTab(key);
    };

    const showSessionModal = () => {
        setIsSessionModalVisible(true);
    };

    const handleSessionCancel = () => {
        setIsSessionModalVisible(false);
        sessionForm.resetFields();
    };

    const handleSessionOk = () => {
        sessionForm.submit();
    };

    const onSessionFinish = (values) => {
        const newSession = {
            id: course.sessions.length + 1,
            title: values.title,
            date: values.date.format('YYYY-MM-DD'),
            time: `${values.startTime.format('h:mm A')} - ${values.endTime.format('h:mm A')}`,
            topics: values.topics.split(',').map(topic => topic.trim()),
            materials: [],
            attendance: 0
        };

        setCourse({
            ...course,
            sessions: [...course.sessions, newSession]
        });

        setIsSessionModalVisible(false);
        sessionForm.resetFields();
        message.success('Session added successfully!');
    };

    const showResourceModal = () => {
        setIsResourceModalVisible(true);
    };

    const handleResourceCancel = () => {
        setIsResourceModalVisible(false);
        resourceForm.resetFields();
    };

    const handleResourceOk = () => {
        resourceForm.submit();
    };

    const onResourceFinish = (values) => {
        const newResource = {
            id: course.resources.length + 1,
            title: values.title,
            type: values.type,
            url: values.url,
            uploadDate: new Date().toISOString().split('T')[0]
        };

        setCourse({
            ...course,
            resources: [...course.resources, newResource]
        });

        setIsResourceModalVisible(false);
        resourceForm.resetFields();
        message.success('Resource added successfully!');
    };

    const sessionsColumns = [
        {
            title: 'Session',
            dataIndex: 'title',
            key: 'title',
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
            title: 'Topics',
            dataIndex: 'topics',
            key: 'topics',
            render: (topics) => (
                <>
                    {topics.map((topic, index) => (
                        <Tag color="blue" key={index}>
                            {topic}
                        </Tag>
                    ))}
                </>
            ),
        },
        {
            title: 'Attendance',
            key: 'attendance',
            render: (_, record) => (
                <Badge
                    count={`${record.attendance}/${course.enrolledStudents}`}
                    style={{
                        backgroundColor: record.attendance > 0 ? '#52c41a' : '#d9d9d9',
                        color: 'white'
                    }}
                />
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space size="small">
                    <Button
                        type="default"
                        icon={<EditOutlined />}
                        size="small"
                        onClick={() => console.log('Edit session', record.id)}
                    />
                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        size="small"
                        onClick={() => console.log('Delete session', record.id)}
                    />
                </Space>
            ),
        },
    ];

    const studentsColumns = [
        {
            title: 'Student',
            key: 'student',
            render: (_, record) => (
                <Space>
                    <Avatar icon={<UserOutlined />} />
                    <span>{record.name}</span>
                </Space>
            ),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Progress',
            key: 'progress',
            render: (_, record) => (
                <Progress percent={record.progress} size="small" />
            ),
        },
        {
            title: 'Attendance',
            key: 'attendance',
            render: (_, record) => (
                <span>{record.attendance}/{record.totalSessions} sessions</span>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Button
                    type="default"
                    size="small"
                    onClick={() => console.log('View student', record.id)}
                >
                    View Details
                </Button>
            ),
        },
    ];

    if (loading) {
        return <div className="text-center py-10">Loading course details...</div>;
    }

    if (!course) {
        return <div className="text-center py-10">Course not found</div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <div>
                    <Title level={2}>{course.title}</Title>
                    <Space className="mb-2">
                        <Tag color="blue">{course.category}</Tag>
                        <Tag color="purple">{course.level}</Tag>
                        <Tag color={course.status === 'Active' ? 'green' : 'orange'}>{course.status}</Tag>
                    </Space>
                </div>
                <Button type="primary" icon={<EditOutlined />}>
                    Edit Course
                </Button>
            </div>

            <Card className="mb-6">
                <Descriptions
                    bordered
                    column={{ xxl: 4, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }}
                >
                    <Descriptions.Item label="Trainer">{course.trainer.name}</Descriptions.Item>
                    <Descriptions.Item label="Duration">{course.duration}</Descriptions.Item>
                    <Descriptions.Item label="Dates">{course.startDate} to {course.endDate}</Descriptions.Item>
                    <Descriptions.Item label="Location">{course.location}</Descriptions.Item>
                    <Descriptions.Item label="Enrollment">{course.enrolledStudents}/{course.maxStudents} students</Descriptions.Item>
                    <Descriptions.Item label="Price">{course.price}</Descriptions.Item>
                </Descriptions>

                <Divider />

                <Title level={4}>Course Description</Title>
                <Paragraph>{course.description}</Paragraph>
            </Card>

            <Tabs activeKey={activeTab} onChange={handleTabChange} className="mb-6">
                <TabPane
                    tab={
                        <span>
                            <CalendarOutlined />
                            Sessions
                        </span>
                    }
                    key="1"
                >
                    <div className="flex justify-between items-center mb-4">
                        <Title level={4}>Course Sessions</Title>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={showSessionModal}
                        >
                            Add Session
                        </Button>
                    </div>

                    <Table
                        columns={sessionsColumns}
                        dataSource={course.sessions}
                        rowKey="id"
                        pagination={false}
                    />
                </TabPane>

                <TabPane
                    tab={
                        <span>
                            <TeamOutlined />
                            Students
                        </span>
                    }
                    key="2"
                >
                    <div className="flex justify-between items-center mb-4">
                        <Title level={4}>Enrolled Students ({course.students.length})</Title>
                        <Button type="primary" icon={<PlusOutlined />}>
                            Add Student
                        </Button>
                    </div>

                    <Table
                        columns={studentsColumns}
                        dataSource={course.students}
                        rowKey="id"
                        pagination={false}
                    />
                </TabPane>

                <TabPane
                    tab={
                        <span>
                            <FileTextOutlined />
                            Resources
                        </span>
                    }
                    key="3"
                >
                    <div className="flex justify-between items-center mb-4">
                        <Title level={4}>Course Resources</Title>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={showResourceModal}
                        >
                            Add Resource
                        </Button>
                    </div>

                    <List
                        itemLayout="horizontal"
                        dataSource={course.resources}
                        renderItem={item => (
                            <List.Item
                                actions={[
                                    <Button type="link" key="download">Download</Button>,
                                    <Button type="link" key="edit">Edit</Button>,
                                    <Button type="link" danger key="delete">Delete</Button>
                                ]}
                            >
                                <List.Item.Meta
                                    avatar={
                                        <Avatar
                                            icon={<FileTextOutlined />}
                                            style={{ backgroundColor: '#1677ff' }}
                                        />
                                    }
                                    title={<a href={item.url}>{item.title}</a>}
                                    description={
                                        <Space>
                                            <Tag color="blue">{item.type}</Tag>
                                            <Text type="secondary">Uploaded: {item.uploadDate}</Text>
                                        </Space>
                                    }
                                />
                            </List.Item>
                        )}
                    />
                </TabPane>

                <TabPane
                    tab={
                        <span>
                            <BarChartOutlined />
                            Progress
                        </span>
                    }
                    key="4"
                >
                    <Card title="Course Completion">
                        <div className="flex justify-between mb-4">
                            <Text>Overall Course Progress</Text>
                            <Text strong>75%</Text>
                        </div>
                        <Progress percent={75} status="active" />

                        <Divider />

                        <Title level={5} className="mb-4">Student Progress</Title>

                        {course.students.map(student => (
                            <div key={student.id} className="mb-4">
                                <div className="flex justify-between mb-1">
                                    <Space>
                                        <Avatar size="small" icon={<UserOutlined />} />
                                        <Text>{student.name}</Text>
                                    </Space>
                                    <Text>{student.progress}%</Text>
                                </div>
                                <Progress percent={student.progress} size="small" />
                            </div>
                        ))}

                        <Divider />

                        <Title level={5} className="mb-4">Session Attendance</Title>

                        {course.sessions.map(session => (
                            <div key={session.id} className="mb-4">
                                <div className="flex justify-between mb-1">
                                    <Text>{session.title} ({session.date})</Text>
                                    <Text>{session.attendance}/{course.enrolledStudents} students</Text>
                                </div>
                                <Progress
                                    percent={Math.round((session.attendance / course.enrolledStudents) * 100)}
                                    size="small"
                                    status={session.date > new Date().toISOString().split('T')[0] ? 'normal' : 'active'}
                                />
                            </div>
                        ))}
                    </Card>
                </TabPane>
            </Tabs>

            <Modal
                title="Add New Session"
                open={isSessionModalVisible}
                onOk={handleSessionOk}
                onCancel={handleSessionCancel}
                width={600}
            >
                <Form
                    form={sessionForm}
                    layout="vertical"
                    onFinish={onSessionFinish}
                >
                    <Form.Item
                        name="title"
                        label="Session Title"
                        rules={[{ required: true, message: 'Please enter session title' }]}
                    >
                        <Input placeholder="Enter session title" />
                    </Form.Item>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Form.Item
                            name="date"
                            label="Date"
                            rules={[{ required: true, message: 'Please select date' }]}
                        >
                            <DatePicker style={{ width: '100%' }} />
                        </Form.Item>

                        <div className="grid grid-cols-2 gap-2">
                            <Form.Item
                                name="startTime"
                                label="Start Time"
                                rules={[{ required: true, message: 'Required' }]}
                            >
                                <TimePicker format="h:mm A" style={{ width: '100%' }} />
                            </Form.Item>

                            <Form.Item
                                name="endTime"
                                label="End Time"
                                rules={[{ required: true, message: 'Required' }]}
                            >
                                <TimePicker format="h:mm A" style={{ width: '100%' }} />
                            </Form.Item>
                        </div>
                    </div>

                    <Form.Item
                        name="topics"
                        label="Topics (comma-separated)"
                        rules={[{ required: true, message: 'Please enter session topics' }]}
                    >
                        <TextArea
                            placeholder="Enter topics covered in this session, separated by commas"
                            rows={3}
                        />
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title="Add New Resource"
                open={isResourceModalVisible}
                onOk={handleResourceOk}
                onCancel={handleResourceCancel}
                width={600}
            >
                <Form
                    form={resourceForm}
                    layout="vertical"
                    onFinish={onResourceFinish}
                >
                    <Form.Item
                        name="title"
                        label="Resource Title"
                        rules={[{ required: true, message: 'Please enter resource title' }]}
                    >
                        <Input placeholder="Enter resource title" />
                    </Form.Item>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Form.Item
                            name="type"
                            label="Resource Type"
                            rules={[{ required: true, message: 'Please select resource type' }]}
                        >
                            <Select placeholder="Select resource type">
                                <Option value="PDF">PDF</Option>
                                <Option value="Document">Document</Option>
                                <Option value="Video">Video</Option>
                                <Option value="GitHub">GitHub Repository</Option>
                                <Option value="Link">External Link</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="url"
                            label="Resource URL"
                            rules={[{ required: true, message: 'Please enter resource URL' }]}
                        >
                            <Input placeholder="Enter URL or file path" />
                        </Form.Item>
                    </div>

                    <Form.Item
                        name="description"
                        label="Description"
                    >
                        <TextArea
                            placeholder="Enter optional description"
                            rows={3}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default CourseDetail;
