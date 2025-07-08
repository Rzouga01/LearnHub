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
    Rate,
    message,
    Avatar,
    Tooltip,
    Divider
} from 'antd';
import {
    SearchOutlined,
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    UserOutlined,
    MailOutlined,
    PhoneOutlined,
    BookOutlined,
    TrophyOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const Trainers = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(false);

    // Sample data for trainers
    const initialTrainers = [
        {
            id: 1,
            name: 'John Smith',
            email: 'john.smith@example.com',
            phone: '(555) 111-2222',
            specialization: ['React', 'JavaScript', 'TypeScript'],
            courses: ['Advanced React Patterns'],
            bio: 'Senior React developer with 10+ years of experience in web development.',
            rating: 4.8,
            status: 'Active',
        },
        {
            id: 2,
            name: 'Maria Rodriguez',
            email: 'maria.rodriguez@example.com',
            phone: '(555) 222-3333',
            specialization: ['Laravel', 'PHP', 'MySQL'],
            courses: ['Laravel Performance Optimization'],
            bio: 'Full-stack developer specializing in Laravel and modern PHP practices.',
            rating: 4.7,
            status: 'Active',
        },
        {
            id: 3,
            name: 'Alex Johnson',
            email: 'alex.johnson@example.com',
            phone: '(555) 333-4444',
            specialization: ['UI/UX', 'Figma', 'Design Systems'],
            courses: ['UX Design Principles'],
            bio: 'UX design lead with experience in creating user-centered digital products.',
            rating: 4.9,
            status: 'Active',
        },
        {
            id: 4,
            name: 'Robert Chen',
            email: 'robert.chen@example.com',
            phone: '(555) 444-5555',
            specialization: ['Python', 'Data Science', 'Machine Learning'],
            courses: ['Data Science Fundamentals'],
            bio: 'Data scientist with background in machine learning and statistical analysis.',
            rating: 4.6,
            status: 'On Leave',
        }
    ];

    const [trainers, setTrainers] = useState(initialTrainers);

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
            const newTrainer = {
                id: trainers.length + 1,
                ...values,
                courses: [],
                rating: 0,
                status: 'Active',
            };

            setTrainers([...trainers, newTrainer]);
            setLoading(false);
            setIsModalVisible(false);
            form.resetFields();
            message.success('Trainer added successfully!');
        }, 1000);
    };

    const filteredTrainers = trainers.filter(
        trainer => trainer.name.toLowerCase().includes(searchText.toLowerCase()) ||
            trainer.email.toLowerCase().includes(searchText.toLowerCase()) ||
            trainer.specialization.some(spec => spec.toLowerCase().includes(searchText.toLowerCase()))
    );

    const getStatusColor = (status) => {
        switch (status) {
            case 'Active': return 'green';
            case 'On Leave': return 'orange';
            case 'Inactive': return 'red';
            default: return 'default';
        }
    };

    const columns = [
        {
            title: 'Trainer',
            key: 'trainer',
            render: (_, record) => (
                <div>
                    <div className="flex items-center">
                        <Avatar
                            icon={<UserOutlined />}
                            className="mr-2"
                            size="large"
                            style={{ backgroundColor: '#1677ff' }}
                        />
                        <div>
                            <div className="font-semibold">{record.name}</div>
                            <div className="text-gray-500 text-sm">{record.email}</div>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: 'Specialization',
            dataIndex: 'specialization',
            key: 'specialization',
            render: (tags) => (
                <>
                    {tags.map((tag) => (
                        <Tag color="blue" key={tag}>
                            {tag}
                        </Tag>
                    ))}
                </>
            ),
        },
        {
            title: 'Courses',
            key: 'courses',
            render: (_, record) => (
                <Space>
                    <BookOutlined />
                    <span>{record.courses.length} course(s)</span>
                </Space>
            ),
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
            render: (rating) => (
                <Space>
                    <Rate disabled defaultValue={rating} allowHalf style={{ fontSize: '14px' }} />
                    <span>{rating}/5</span>
                </Space>
            ),
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
                        onClick={() => console.log('Edit trainer', record.id)}
                    />
                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        size="small"
                        onClick={() => console.log('Delete trainer', record.id)}
                    />
                </Space>
            ),
        },
    ];

    const expandedRowRender = (record) => (
        <div className="pl-12 py-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Text strong>Bio:</Text>
                    <p>{record.bio}</p>

                    <Divider orientation="left" plain>Contact Details</Divider>

                    <div className="flex items-center mb-2">
                        <MailOutlined className="mr-2" />
                        <Text>{record.email}</Text>
                    </div>

                    <div className="flex items-center">
                        <PhoneOutlined className="mr-2" />
                        <Text>{record.phone}</Text>
                    </div>
                </div>

                <div>
                    <Divider orientation="left" plain>Courses</Divider>

                    {record.courses.length > 0 ? (
                        <ul className="pl-6 list-disc">
                            {record.courses.map((course, index) => (
                                <li key={index}>{course}</li>
                            ))}
                        </ul>
                    ) : (
                        <Text type="secondary">No courses assigned yet</Text>
                    )}

                    <Divider orientation="left" plain>Achievements</Divider>

                    <div className="flex items-center">
                        <TrophyOutlined className="mr-2 text-yellow-500" />
                        <Text>Top Trainer of the Month (June 2025)</Text>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <Title level={2}>Trainers</Title>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={showModal}
                >
                    Add Trainer
                </Button>
            </div>

            <Card>
                <div className="mb-4">
                    <Input
                        placeholder="Search trainers..."
                        prefix={<SearchOutlined />}
                        value={searchText}
                        onChange={e => setSearchText(e.target.value)}
                        style={{ width: 300 }}
                    />
                </div>

                <Table
                    columns={columns}
                    dataSource={filteredTrainers}
                    rowKey="id"
                    expandable={{
                        expandedRowRender,
                        expandRowByClick: true,
                    }}
                    pagination={{ pageSize: 10 }}
                />
            </Card>

            <Modal
                title="Add New Trainer"
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                width={700}
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
                            rules={[{ required: true, message: 'Please enter trainer name' }]}
                        >
                            <Input placeholder="Enter full name" />
                        </Form.Item>

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
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Form.Item
                            name="phone"
                            label="Phone Number"
                            rules={[{ required: true, message: 'Please enter phone number' }]}
                        >
                            <Input placeholder="Enter phone number" />
                        </Form.Item>

                        <Form.Item
                            name="specialization"
                            label="Specialization"
                            rules={[{ required: true, message: 'Please select at least one specialization' }]}
                        >
                            <Select
                                mode="tags"
                                placeholder="Add specializations"
                                tokenSeparators={[',']}
                            >
                                <Option value="React">React</Option>
                                <Option value="JavaScript">JavaScript</Option>
                                <Option value="TypeScript">TypeScript</Option>
                                <Option value="Laravel">Laravel</Option>
                                <Option value="PHP">PHP</Option>
                                <Option value="MySQL">MySQL</Option>
                                <Option value="UI/UX">UI/UX</Option>
                                <Option value="Figma">Figma</Option>
                                <Option value="Python">Python</Option>
                                <Option value="Data Science">Data Science</Option>
                            </Select>
                        </Form.Item>
                    </div>

                    <Form.Item
                        name="bio"
                        label="Bio"
                        rules={[{ required: true, message: 'Please enter trainer bio' }]}
                    >
                        <TextArea rows={4} placeholder="Enter professional bio" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Trainers;
