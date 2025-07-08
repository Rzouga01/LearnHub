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
    message,
    Avatar,
    Tooltip
} from 'antd';
import {
    SearchOutlined,
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    UserOutlined,
    MailOutlined,
    PhoneOutlined
} from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;

const Students = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(false);

    // Sample data for students
    const initialStudents = [
        {
            id: 1,
            name: 'Emily Johnson',
            email: 'emily.johnson@example.com',
            phone: '(555) 123-4567',
            enrolledCourses: ['Advanced React Patterns', 'UX Design Principles'],
            joinDate: '2023-02-15',
            status: 'Active',
        },
        {
            id: 2,
            name: 'Michael Smith',
            email: 'michael.smith@example.com',
            phone: '(555) 234-5678',
            enrolledCourses: ['Data Science Fundamentals'],
            joinDate: '2023-03-20',
            status: 'Active',
        },
        {
            id: 3,
            name: 'Sophia Martinez',
            email: 'sophia.martinez@example.com',
            phone: '(555) 345-6789',
            enrolledCourses: ['Laravel Performance Optimization', 'Advanced React Patterns'],
            joinDate: '2023-01-10',
            status: 'Active',
        },
        {
            id: 4,
            name: 'William Taylor',
            email: 'william.taylor@example.com',
            phone: '(555) 456-7890',
            enrolledCourses: ['UX Design Principles'],
            joinDate: '2023-04-05',
            status: 'Inactive',
        },
        {
            id: 5,
            name: 'Olivia Brown',
            email: 'olivia.brown@example.com',
            phone: '(555) 567-8901',
            enrolledCourses: [],
            joinDate: '2023-05-12',
            status: 'New',
        }
    ];

    const [students, setStudents] = useState(initialStudents);

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
            const newStudent = {
                id: students.length + 1,
                ...values,
                joinDate: values.joinDate.format('YYYY-MM-DD'),
                enrolledCourses: values.enrolledCourses || [],
                status: 'New',
            };

            setStudents([...students, newStudent]);
            setLoading(false);
            setIsModalVisible(false);
            form.resetFields();
            message.success('Student added successfully!');
        }, 1000);
    };

    const filteredStudents = students.filter(
        student => student.name.toLowerCase().includes(searchText.toLowerCase()) ||
            student.email.toLowerCase().includes(searchText.toLowerCase())
    );

    const getStatusColor = (status) => {
        switch (status) {
            case 'Active': return 'green';
            case 'Inactive': return 'red';
            case 'New': return 'blue';
            default: return 'default';
        }
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <div className="flex items-center">
                    <Avatar
                        icon={<UserOutlined />}
                        className="mr-2"
                        style={{ backgroundColor: '#1677ff' }}
                    />
                    {text}
                </div>
            ),
        },
        {
            title: 'Contact',
            key: 'contact',
            render: (_, record) => (
                <Space direction="vertical" size="small">
                    <div>
                        <MailOutlined className="mr-2" />
                        {record.email}
                    </div>
                    <div>
                        <PhoneOutlined className="mr-2" />
                        {record.phone}
                    </div>
                </Space>
            ),
        },
        {
            title: 'Enrolled Courses',
            dataIndex: 'enrolledCourses',
            key: 'enrolledCourses',
            render: (courses) => (
                <>
                    {courses.length > 0 ? (
                        <div>
                            {courses.slice(0, 1).map((course, index) => (
                                <Tag key={index} color="blue">{course}</Tag>
                            ))}
                            {courses.length > 1 && (
                                <Tooltip title={courses.slice(1).join(', ')}>
                                    <Tag color="blue">+{courses.length - 1} more</Tag>
                                </Tooltip>
                            )}
                        </div>
                    ) : (
                        <span className="text-gray-400">No courses</span>
                    )}
                </>
            ),
        },
        {
            title: 'Join Date',
            dataIndex: 'joinDate',
            key: 'joinDate',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={getStatusColor(status)}>
                    {status}
                </Tag>
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
                        onClick={() => console.log('Edit student', record.id)}
                    />
                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        size="small"
                        onClick={() => console.log('Delete student', record.id)}
                    />
                </Space>
            ),
        },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <Title level={2}>Students</Title>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={showModal}
                >
                    Add Student
                </Button>
            </div>

            <Card>
                <div className="mb-4">
                    <Input
                        placeholder="Search students..."
                        prefix={<SearchOutlined />}
                        value={searchText}
                        onChange={e => setSearchText(e.target.value)}
                        style={{ width: 300 }}
                    />
                </div>

                <Table
                    columns={columns}
                    dataSource={filteredStudents}
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                />
            </Card>

            <Modal
                title="Add New Student"
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                width={600}
                confirmLoading={loading}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Form.Item
                            name="name"
                            label="Full Name"
                            rules={[{ required: true, message: 'Please enter student name' }]}
                        >
                            <Input placeholder="Enter full name" />
                        </Form.Item>

                        <Form.Item
                            name="joinDate"
                            label="Join Date"
                            rules={[{ required: true, message: 'Please select join date' }]}
                        >
                            <DatePicker style={{ width: '100%' }} />
                        </Form.Item>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                                { required: true, message: 'Please enter email' },
                                { type: 'email', message: 'Please enter a valid email' }
                            ]}
                        >
                            <Input placeholder="Enter email address" />
                        </Form.Item>

                        <Form.Item
                            name="phone"
                            label="Phone Number"
                            rules={[{ required: true, message: 'Please enter phone number' }]}
                        >
                            <Input placeholder="Enter phone number" />
                        </Form.Item>
                    </div>

                    <Form.Item
                        name="enrolledCourses"
                        label="Enroll in Courses"
                    >
                        <Select
                            mode="multiple"
                            placeholder="Select courses"
                            optionLabelProp="label"
                        >
                            <Option value="Advanced React Patterns" label="Advanced React Patterns">
                                Advanced React Patterns
                            </Option>
                            <Option value="Laravel Performance Optimization" label="Laravel Performance Optimization">
                                Laravel Performance Optimization
                            </Option>
                            <Option value="UX Design Principles" label="UX Design Principles">
                                UX Design Principles
                            </Option>
                            <Option value="Data Science Fundamentals" label="Data Science Fundamentals">
                                Data Science Fundamentals
                            </Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Students;
