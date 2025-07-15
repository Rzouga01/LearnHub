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
    Tooltip,
    Row,
    Col
} from 'antd';
import {
    SearchOutlined,
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    EyeOutlined,
    UserOutlined,
    CalendarOutlined,
    ClockCircleOutlined,
    FilterOutlined,
    BookOutlined
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
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedLevel, setSelectedLevel] = useState('all');

    // Sample data for courses with new color scheme
    const initialCourses = [
        {
            id: 1,
            title: 'Advanced React Patterns',
            description: 'Master advanced React patterns including hooks, context, render props, and more.',
            category: 'Web Development',
            level: 'Advanced',
            trainer: 'John Smith',
            students: 245,
            duration: '12 hours',
            price: 149,
            status: 'Active',
            rating: 4.8,
            thumbnail: '⚛️',
            enrolledAt: '2024-01-15',
            completionRate: 87
        },
        {
            id: 2,
            title: 'UI/UX Design Fundamentals',
            description: 'Learn the principles of user interface and user experience design.',
            category: 'Design',
            level: 'Beginner',
            trainer: 'Sarah Johnson',
            students: 312,
            duration: '8 hours',
            price: 99,
            status: 'Active',
            rating: 4.9,
            thumbnail: '🎨',
            enrolledAt: '2024-02-10',
            completionRate: 92
        },
        {
            id: 3,
            title: 'Machine Learning with Python',
            description: 'Introduction to machine learning concepts and implementation with Python.',
            category: 'Data Science',
            level: 'Intermediate',
            trainer: 'Dr. Michael Chen',
            students: 189,
            duration: '16 hours',
            price: 199,
            status: 'Active',
            rating: 4.7,
            thumbnail: '🤖',
            enrolledAt: '2024-01-28',
            completionRate: 65
        },
        {
            id: 4,
            title: 'Digital Marketing Strategy',
            description: 'Comprehensive guide to modern digital marketing techniques.',
            category: 'Marketing',
            level: 'Intermediate',
            trainer: 'Emma Rodriguez',
            students: 156,
            duration: '10 hours',
            price: 129,
            status: 'Draft',
            rating: 4.6,
            thumbnail: '📱',
            enrolledAt: '2024-03-05',
            completionRate: 78
        }
    ];

    const [courses, setCourses] = useState(initialCourses);

    const getStatusBadge = (status) => {
        const statusConfig = {
            'Active': { color: 'bg-olive-100 dark:bg-olive-900 text-olive-700 dark:text-olive-300', text: 'Active' },
            'Draft': { color: 'bg-saffron-100 dark:bg-saffron-900 text-saffron-700 dark:text-saffron-300', text: 'Draft' },
            'Archived': { color: 'bg-warm-200 dark:bg-warm-700 text-warm-600 dark:text-warm-300', text: 'Archived' }
        };

        const config = statusConfig[status] || statusConfig['Draft'];
        return <Badge className={config.color} text={config.text} />;
    };

    const getCategoryColor = (category) => {
        const categoryColors = {
            'Web Development': 'bg-terracotta-100 dark:bg-terracotta-900 text-terracotta-700 dark:text-terracotta-300',
            'Design': 'bg-mustard-100 dark:bg-mustard-900 text-mustard-700 dark:text-mustard-300',
            'Data Science': 'bg-sage-100 dark:bg-sage-900 text-sage-700 dark:text-sage-300',
            'Marketing': 'bg-olive-100 dark:bg-olive-900 text-olive-700 dark:text-olive-300',
        };
        return categoryColors[category] || 'bg-warm-100 dark:bg-warm-800 text-warm-600 dark:text-warm-300';
    };

    const getLevelColor = (level) => {
        const levelColors = {
            'Beginner': 'bg-olive-100 dark:bg-olive-900 text-olive-700 dark:text-olive-300',
            'Intermediate': 'bg-saffron-100 dark:bg-saffron-900 text-saffron-700 dark:text-saffron-300',
            'Advanced': 'bg-rust-100 dark:bg-rust-900 text-rust-700 dark:text-rust-300',
        };
        return levelColors[level] || 'bg-warm-100 dark:bg-warm-800 text-warm-600 dark:text-warm-300';
    };

    const columns = [
        {
            title: 'Course',
            key: 'course',
            render: (_, record) => (
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-cream-100 dark:bg-warm-800 rounded-lg flex items-center justify-center text-xl">
                        {record.thumbnail}
                    </div>
                    <div>
                        <div className="font-semibold text-charcoal-500 dark:text-cream-100">{record.title}</div>
                        <div className="text-warm-500 dark:text-warm-300 text-sm truncate max-w-xs">
                            {record.description.length > 100
                                ? `${record.description.substring(0, 100)}...`
                                : record.description}
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            render: (category) => (
                <Tag className={`border-0 ${getCategoryColor(category)}`}>
                    {category}
                </Tag>
            ),
            filters: [
                { text: 'Web Development', value: 'Web Development' },
                { text: 'Design', value: 'Design' },
                { text: 'Data Science', value: 'Data Science' },
                { text: 'Marketing', value: 'Marketing' },
            ],
            onFilter: (value, record) => record.category === value,
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
        },
        {
            title: 'Trainer',
            dataIndex: 'trainer',
            key: 'trainer',
            render: (trainer) => (
                <div className="flex items-center gap-2">
                    <UserOutlined className="text-sage-500" />
                    <span className="text-charcoal-500 dark:text-cream-100">{trainer}</span>
                </div>
            ),
        },
        {
            title: 'Students',
            dataIndex: 'students',
            key: 'students',
            render: (students) => (
                <span className="text-terracotta-500 font-medium">{students}</span>
            ),
            sorter: (a, b) => a.students - b.students,
        },
        {
            title: 'Duration',
            dataIndex: 'duration',
            key: 'duration',
            render: (duration) => (
                <div className="flex items-center gap-1">
                    <ClockCircleOutlined className="text-sage-500" />
                    <span className="text-warm-500 dark:text-warm-300">{duration}</span>
                </div>
            ),
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (price) => (
                <span className="text-mustard-600 dark:text-mustard-400 font-semibold">${price}</span>
            ),
            sorter: (a, b) => a.price - b.price,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => getStatusBadge(status),
            filters: [
                { text: 'Active', value: 'Active' },
                { text: 'Draft', value: 'Draft' },
                { text: 'Archived', value: 'Archived' },
            ],
            onFilter: (value, record) => record.status === value,
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip title="View Details">
                        <Button
                            type="text"
                            icon={<EyeOutlined />}
                            className="text-sage-500 hover:text-sage-600 hover:bg-sage-50 dark:hover:bg-sage-900"
                            onClick={() => navigate(`/courses/${record.id}`)}
                        />
                    </Tooltip>
                    <Tooltip title="Edit Course">
                        <Button
                            type="text"
                            icon={<EditOutlined />}
                            className="text-mustard-500 hover:text-mustard-600 hover:bg-mustard-50 dark:hover:bg-mustard-900"
                            onClick={() => handleEdit(record)}
                        />
                    </Tooltip>
                    <Tooltip title="Delete Course">
                        <Button
                            type="text"
                            icon={<DeleteOutlined />}
                            className="text-rust-500 hover:text-rust-600 hover:bg-rust-50 dark:hover:bg-rust-900"
                            onClick={() => handleDelete(record.id)}
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    const handleEdit = (course) => {
        form.setFieldsValue(course);
        setIsModalVisible(true);
    };

    const handleDelete = (courseId) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this course?',
            content: 'This action cannot be undone.',
            okText: 'Yes, Delete',
            okType: 'danger',
            cancelText: 'Cancel',
            onOk() {
                setCourses(courses.filter(course => course.id !== courseId));
                message.success('Course deleted successfully');
            },
        });
    };

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            if (values.id) {
                // Update existing course
                setCourses(courses.map(course =>
                    course.id === values.id ? { ...course, ...values } : course
                ));
                message.success('Course updated successfully');
            } else {
                // Add new course
                const newCourse = {
                    ...values,
                    id: Math.max(...courses.map(c => c.id)) + 1,
                    students: 0,
                    rating: 0,
                    thumbnail: '📚'
                };
                setCourses([...courses, newCourse]);
                message.success('Course created successfully');
            }

            setIsModalVisible(false);
            form.resetFields();
        } catch (error) {
            message.error('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const filteredCourses = courses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchText.toLowerCase()) ||
            course.description.toLowerCase().includes(searchText.toLowerCase()) ||
            course.trainer.toLowerCase().includes(searchText.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
        const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;

        return matchesSearch && matchesCategory && matchesLevel;
    });

    return (
        <div className="min-h-screen bg-cream-100 dark:bg-charcoal-500 p-6 transition-colors duration-300">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Header */}
                <Card className="bg-white dark:bg-warm-900 border-warm-200 dark:border-warm-700">
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
                        <div>
                            <Title level={2} className="text-charcoal-500 dark:text-cream-100 mb-2">
                                <BookOutlined className="text-terracotta-500 mr-3" />
                                Course Management
                            </Title>
                            <p className="text-warm-500 dark:text-warm-300">
                                Manage and organize your learning courses
                            </p>
                        </div>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            size="large"
                            className="bg-terracotta-500 hover:bg-terracotta-600 border-terracotta-500"
                            onClick={() => {
                                form.resetFields();
                                setIsModalVisible(true);
                            }}
                        >
                            Add New Course
                        </Button>
                    </div>
                </Card>

                {/* Filters */}
                <Card className="bg-white dark:bg-warm-900 border-warm-200 dark:border-warm-700">
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={12} lg={8}>
                            <Input
                                placeholder="Search courses..."
                                prefix={<SearchOutlined className="text-sage-500" />}
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                className="h-10 bg-cream-50 dark:bg-warm-800 border-warm-200 dark:border-warm-600"
                            />
                        </Col>
                        <Col xs={24} sm={12} lg={8}>
                            <Select
                                placeholder="Filter by category"
                                value={selectedCategory}
                                onChange={setSelectedCategory}
                                className="w-full h-10"
                                suffixIcon={<FilterOutlined className="text-sage-500" />}
                            >
                                <Option value="all">All Categories</Option>
                                <Option value="Web Development">Web Development</Option>
                                <Option value="Design">Design</Option>
                                <Option value="Data Science">Data Science</Option>
                                <Option value="Marketing">Marketing</Option>
                            </Select>
                        </Col>
                        <Col xs={24} sm={12} lg={8}>
                            <Select
                                placeholder="Filter by level"
                                value={selectedLevel}
                                onChange={setSelectedLevel}
                                className="w-full h-10"
                                suffixIcon={<FilterOutlined className="text-sage-500" />}
                            >
                                <Option value="all">All Levels</Option>
                                <Option value="Beginner">Beginner</Option>
                                <Option value="Intermediate">Intermediate</Option>
                                <Option value="Advanced">Advanced</Option>
                            </Select>
                        </Col>
                    </Row>
                </Card>

                {/* Courses Table */}
                <Card className="bg-white dark:bg-warm-900 border-warm-200 dark:border-warm-700">
                    <Table
                        columns={columns}
                        dataSource={filteredCourses}
                        rowKey="id"
                        pagination={{
                            pageSize: 10,
                            showTotal: (total, range) => (
                                <span className="text-warm-500 dark:text-warm-300">
                                    {`${range[0]}-${range[1]} of ${total} courses`}
                                </span>
                            ),
                        }}
                        className="custom-table"
                        scroll={{ x: 'max-content' }}
                    />
                </Card>

                {/* Course Form Modal */}
                <Modal
                    title={
                        <span className="text-charcoal-500 dark:text-cream-100 text-lg font-semibold">
                            {form.getFieldValue('id') ? 'Edit Course' : 'Add New Course'}
                        </span>
                    }
                    visible={isModalVisible}
                    onCancel={() => {
                        setIsModalVisible(false);
                        form.resetFields();
                    }}
                    footer={null}
                    width={600}
                    className="custom-modal"
                >
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmit}
                        className="space-y-4"
                    >
                        <Form.Item name="id" hidden>
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="title"
                            label={<span className="text-charcoal-500 dark:text-cream-100 font-medium">Course Title</span>}
                            rules={[{ required: true, message: 'Please enter course title' }]}
                        >
                            <Input
                                placeholder="Enter course title"
                                className="h-10 bg-cream-50 dark:bg-warm-800 border-warm-200 dark:border-warm-600"
                            />
                        </Form.Item>

                        <Form.Item
                            name="description"
                            label={<span className="text-charcoal-500 dark:text-cream-100 font-medium">Description</span>}
                            rules={[{ required: true, message: 'Please enter description' }]}
                        >
                            <TextArea
                                rows={4}
                                placeholder="Enter course description"
                                className="bg-cream-50 dark:bg-warm-800 border-warm-200 dark:border-warm-600"
                            />
                        </Form.Item>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="category"
                                    label={<span className="text-charcoal-500 dark:text-cream-100 font-medium">Category</span>}
                                    rules={[{ required: true, message: 'Please select category' }]}
                                >
                                    <Select placeholder="Select category" className="h-10">
                                        <Option value="Web Development">Web Development</Option>
                                        <Option value="Design">Design</Option>
                                        <Option value="Data Science">Data Science</Option>
                                        <Option value="Marketing">Marketing</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="level"
                                    label={<span className="text-charcoal-500 dark:text-cream-100 font-medium">Level</span>}
                                    rules={[{ required: true, message: 'Please select level' }]}
                                >
                                    <Select placeholder="Select level" className="h-10">
                                        <Option value="Beginner">Beginner</Option>
                                        <Option value="Intermediate">Intermediate</Option>
                                        <Option value="Advanced">Advanced</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="trainer"
                                    label={<span className="text-charcoal-500 dark:text-cream-100 font-medium">Trainer</span>}
                                    rules={[{ required: true, message: 'Please enter trainer name' }]}
                                >
                                    <Input
                                        placeholder="Enter trainer name"
                                        className="h-10 bg-cream-50 dark:bg-warm-800 border-warm-200 dark:border-warm-600"
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="duration"
                                    label={<span className="text-charcoal-500 dark:text-cream-100 font-medium">Duration</span>}
                                    rules={[{ required: true, message: 'Please enter duration' }]}
                                >
                                    <Input
                                        placeholder="e.g., 12 hours"
                                        className="h-10 bg-cream-50 dark:bg-warm-800 border-warm-200 dark:border-warm-600"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="price"
                                    label={<span className="text-charcoal-500 dark:text-cream-100 font-medium">Price ($)</span>}
                                    rules={[{ required: true, message: 'Please enter price' }]}
                                >
                                    <InputNumber
                                        placeholder="Enter price"
                                        className="w-full h-10 bg-cream-50 dark:bg-warm-800 border-warm-200 dark:border-warm-600"
                                        min={0}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="status"
                                    label={<span className="text-charcoal-500 dark:text-cream-100 font-medium">Status</span>}
                                    rules={[{ required: true, message: 'Please select status' }]}
                                >
                                    <Select placeholder="Select status" className="h-10">
                                        <Option value="Active">Active</Option>
                                        <Option value="Draft">Draft</Option>
                                        <Option value="Archived">Archived</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>

                        <div className="flex justify-end gap-3 pt-4 border-t border-warm-200 dark:border-warm-700">
                            <Button
                                onClick={() => {
                                    setIsModalVisible(false);
                                    form.resetFields();
                                }}
                                className="text-warm-500 border-warm-300 hover:border-warm-400"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                className="bg-terracotta-500 hover:bg-terracotta-600 border-terracotta-500"
                            >
                                {form.getFieldValue('id') ? 'Update Course' : 'Create Course'}
                            </Button>
                        </div>
                    </Form>
                </Modal>
            </div>
        </div>
    );
};

export default Courses;
