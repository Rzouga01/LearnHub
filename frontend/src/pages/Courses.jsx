import React, { useState } from 'react';
import {
    Table,
    Card,
    Button,
    Typography,
    Input,
    Space,
    Tag,
    Modal,
    Form,
    Select,
    DatePicker,
    InputNumber,
    message,
    Badge,
    Tooltip
} from 'antd';
import {
    SearchOutlined,
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    EyeOutlined,
    UserOutlined,
    CalendarOutlined,
    ClockCircleOutlined
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

const { Title } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const Courses = () => {
    const navigate = useNavigate();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(false);

    // Sample data for courses
    const initialCourses = [
        {
            id: 1,
            title: 'Advanced React Patterns',
            description: 'Master advanced React patterns including hooks, context, render props, and more.',
            category: 'Web Development',
            level: 'Advanced',
            trainer: 'John Smith',
            duration: '12 hours',
            startDate: '2025-07-15',
            endDate: '2025-07-18',
            enrolledStudents: 18,
            maxStudents: 25,
            status: 'Active',
            price: 299,
            location: 'Online',
        },
        {
            id: 2,
            title: 'Laravel Performance Optimization',
            description: 'Learn techniques to optimize Laravel applications for maximum performance.',
            category: 'Web Development',
            level: 'Intermediate',
            trainer: 'Maria Rodriguez',
            duration: '8 hours',
            startDate: '2025-07-20',
            endDate: '2025-07-22',
            enrolledStudents: 12,
            maxStudents: 20,
            status: 'Active',
            price: 249,
            location: 'Hybrid',
        },
        {
            id: 3,
            title: 'UX Design Principles',
            description: 'Understand fundamental UX design principles and implement them in your projects.',
            category: 'Design',
            level: 'Beginner',
            trainer: 'Alex Johnson',
            duration: '10 hours',
            startDate: '2025-08-05',
            endDate: '2025-08-10',
            enrolledStudents: 15,
            maxStudents: 18,
            status: 'Upcoming',
            price: 199,
            location: 'In-person',
        },
        {
            id: 4,
            title: 'Data Science Fundamentals',
            description: 'Introduction to data science concepts, tools, and methodologies.',
            category: 'Data Science',
            level: 'Beginner',
            trainer: 'Robert Chen',
            duration: '16 hours',
            startDate: '2025-08-15',
            endDate: '2025-08-25',
            enrolledStudents: 20,
            maxStudents: 20,
            status: 'Full',
            price: 349,
            location: 'Online',
        },
        {
            id: 5,
            title: 'DevOps Practices',
            description: 'Learn modern DevOps practices, tools, and automation techniques.',
            category: 'DevOps',
            level: 'Intermediate',
            trainer: 'Sarah Williams',
            duration: '14 hours',
            startDate: '2025-07-01',
            endDate: '2025-07-05',
            enrolledStudents: 16,
            maxStudents: 20,
            status: 'Completed',
            price: 299,
            location: 'Online',
        },
    ];

    const [courses, setCourses] = useState(initialCourses);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const handleOk = () => {
        form.submit();
    };

    const onFinish = (values) => {
        setLoading(true);

        setTimeout(() => {
            const dateRange = values.dateRange;
            const newCourse = {
                id: courses.length + 1,
                ...values,
                startDate: dateRange[0].format('YYYY-MM-DD'),
                endDate: dateRange[1].format('YYYY-MM-DD'),
                enrolledStudents: 0,
                status: 'Upcoming',
            };

            delete newCourse.dateRange;

            setCourses([...courses, newCourse]);
            setLoading(false);
            setIsModalVisible(false);
            form.resetFields();
            message.success('Course added successfully!');
        }, 1000);
    };

    const filteredCourses = courses.filter(
        course =>
            course.title.toLowerCase().includes(searchText.toLowerCase()) ||
            course.description.toLowerCase().includes(searchText.toLowerCase()) ||
            course.category.toLowerCase().includes(searchText.toLowerCase()) ||
            course.trainer.toLowerCase().includes(searchText.toLowerCase())
    );

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Active':
                return <Badge status="processing" text="Active" />;
            case 'Upcoming':
                return <Badge status="warning" text="Upcoming" />;
            case 'Completed':
                return <Badge status="default" text="Completed" />;
            case 'Full':
                return <Badge status="success" text="Full" />;
            case 'Cancelled':
                return <Badge status="error" text="Cancelled" />;
            default:
                return <Badge status="default" text={status} />;
        }
    };

    const getCategoryColor = (category) => {
        const categoryColors = {
            'Web Development': 'blue',
            'Design': 'purple',
            'Data Science': 'green',
            'DevOps': 'orange',
            'Mobile Development': 'red',
            'Cloud Computing': 'cyan',
        };

        return categoryColors[category] || 'default';
    };

    const getLevelColor = (level) => {
        const levelColors = {
            'Beginner': 'green',
            'Intermediate': 'blue',
            'Advanced': 'purple',
        };

        return levelColors[level] || 'default';
    };

    const columns = [
        {
            title: 'Course',
            key: 'course',
            render: (_, record) => (
                <div>
                    <div className="font-semibold">{record.title}</div>
                    <div className="text-gray-500 text-sm truncate max-w-xs">
                        {record.description.length > 100
                            ? `${record.description.substring(0, 100)}...`
                            : record.description}
                    </div>
                    <Space className="mt-1">
                        <Tag color={getCategoryColor(record.category)}>{record.category}</Tag>
                        <Tag color={getLevelColor(record.level)}>{record.level}</Tag>
                    </Space>
                </div>
            ),
        },
        {
            title: 'Trainer',
            dataIndex: 'trainer',
            key: 'trainer',
        },
        {
            title: 'Schedule',
            key: 'schedule',
            render: (_, record) => (
                <div>
                    <div className="flex items-center mb-1">
                        <CalendarOutlined className="mr-2" />
                        <span>{record.startDate} to {record.endDate}</span>
                    </div>
                    <div className="flex items-center">
                        <ClockCircleOutlined className="mr-2" />
                        <span>{record.duration}</span>
                    </div>
                </div>
            ),
        },
        {
            title: 'Enrollment',
            key: 'enrollment',
            render: (_, record) => (
                <div>
                    <div className="flex items-center">
                        <UserOutlined className="mr-2" />
                        <span>
                            {record.enrolledStudents}/{record.maxStudents}
                            {record.enrolledStudents === record.maxStudents &&
                                <Tag color="red" className="ml-2">Full</Tag>
                            }
                        </span>
                    </div>
                    <div className="mt-1">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${(record.enrolledStudents / record.maxStudents) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: status => getStatusBadge(status),
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: price => `$${price}`,
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space size="small">
                    <Tooltip title="View Details">
                        <Button
                            type="primary"
                            icon={<EyeOutlined />}
                            size="small"
                            onClick={() => navigate(`/courses/${record.id}`)}
                        />
                    </Tooltip>
                    <Tooltip title="Edit Course">
                        <Button
                            type="default"
                            icon={<EditOutlined />}
                            size="small"
                            onClick={() => console.log('Edit course', record.id)}
                        />
                    </Tooltip>
                    <Tooltip title="Delete Course">
                        <Button
                            danger
                            icon={<DeleteOutlined />}
                            size="small"
                            onClick={() => console.log('Delete course', record.id)}
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <Title level={2}>Courses</Title>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={showModal}
                >
                    Add Course
                </Button>
            </div>

            <Card>
                <div className="mb-4">
                    <Input
                        placeholder="Search courses..."
                        prefix={<SearchOutlined />}
                        value={searchText}
                        onChange={e => setSearchText(e.target.value)}
                        style={{ width: 300 }}
                    />
                </div>

                <Table
                    columns={columns}
                    dataSource={filteredCourses}
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                />
            </Card>

            <Modal
                title="Add New Course"
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                width={800}
                confirmLoading={loading}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Form.Item
                            name="title"
                            label="Course Title"
                            rules={[{ required: true, message: 'Please enter course title' }]}
                        >
                            <Input placeholder="Enter course title" />
                        </Form.Item>

                        <div className="grid grid-cols-2 gap-2">
                            <Form.Item
                                name="category"
                                label="Category"
                                rules={[{ required: true, message: 'Please select category' }]}
                            >
                                <Select placeholder="Select category">
                                    <Option value="Web Development">Web Development</Option>
                                    <Option value="Design">Design</Option>
                                    <Option value="Data Science">Data Science</Option>
                                    <Option value="DevOps">DevOps</Option>
                                    <Option value="Mobile Development">Mobile Development</Option>
                                    <Option value="Cloud Computing">Cloud Computing</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="level"
                                label="Level"
                                rules={[{ required: true, message: 'Please select level' }]}
                            >
                                <Select placeholder="Select level">
                                    <Option value="Beginner">Beginner</Option>
                                    <Option value="Intermediate">Intermediate</Option>
                                    <Option value="Advanced">Advanced</Option>
                                </Select>
                            </Form.Item>
                        </div>
                    </div>

                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{ required: true, message: 'Please enter course description' }]}
                    >
                        <TextArea rows={3} placeholder="Enter course description" />
                    </Form.Item>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Form.Item
                            name="trainer"
                            label="Trainer"
                            rules={[{ required: true, message: 'Please select trainer' }]}
                        >
                            <Select placeholder="Select trainer">
                                <Option value="John Smith">John Smith</Option>
                                <Option value="Maria Rodriguez">Maria Rodriguez</Option>
                                <Option value="Alex Johnson">Alex Johnson</Option>
                                <Option value="Robert Chen">Robert Chen</Option>
                                <Option value="Sarah Williams">Sarah Williams</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="location"
                            label="Location"
                            rules={[{ required: true, message: 'Please select location' }]}
                        >
                            <Select placeholder="Select location">
                                <Option value="Online">Online</Option>
                                <Option value="In-person">In-person</Option>
                                <Option value="Hybrid">Hybrid</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="duration"
                            label="Duration"
                            rules={[{ required: true, message: 'Please enter duration' }]}
                        >
                            <Input placeholder="e.g. 12 hours" addonAfter="hours" />
                        </Form.Item>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Form.Item
                            name="dateRange"
                            label="Course Dates"
                            rules={[{ required: true, message: 'Please select course dates' }]}
                        >
                            <RangePicker style={{ width: '100%' }} />
                        </Form.Item>

                        <div className="grid grid-cols-2 gap-2">
                            <Form.Item
                                name="maxStudents"
                                label="Max Students"
                                rules={[{ required: true, message: 'Please enter max students' }]}
                            >
                                <InputNumber min={1} style={{ width: '100%' }} />
                            </Form.Item>

                            <Form.Item
                                name="price"
                                label="Price ($)"
                                rules={[{ required: true, message: 'Please enter price' }]}
                            >
                                <InputNumber
                                    min={0}
                                    style={{ width: '100%' }}
                                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                />
                            </Form.Item>
                        </div>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};

export default Courses;
