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
    Rate,
    Tooltip,
    Row,
    Col,
    Statistic
} from 'antd';
import {
    SearchOutlined,
    EyeOutlined,
    CheckOutlined,
    CloseOutlined,
    UserOutlined,
    CalendarOutlined,
    MailOutlined,
    PhoneOutlined,
    BookOutlined,
    TrophyOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

const TrainerApplications = () => {
    const [searchText, setSearchText] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState(null);

    // Sample applications data with new color scheme
    const applicationsData = [
        {
            id: 1,
            name: 'John Mitchell',
            email: 'john.mitchell@email.com',
            phone: '+1 (555) 123-4567',
            avatar: '👨‍💻',
            appliedDate: '2024-01-15',
            status: 'Under Review',
            primarySkill: 'Web Development',
            experienceLevel: 'Advanced',
            currentJob: 'Senior Full Stack Developer',
            company: 'TechCorp Inc.',
            location: 'San Francisco, CA',
            skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
            motivation: 'Passionate about sharing knowledge and helping others grow in their careers.',
            teachingExperience: '3 years of mentoring junior developers',
            sampleCourse: 'Building Modern Web Applications with React and Node.js',
            resumeUploaded: true,
            portfolioUrl: 'https://johnmitchell.dev',
            linkedinUrl: 'https://linkedin.com/in/johnmitchell'
        },
        {
            id: 2,
            name: 'Dr. Lisa Chen',
            email: 'lisa.chen@email.com',
            phone: '+1 (555) 987-6543',
            avatar: '👩‍🔬',
            appliedDate: '2024-01-20',
            status: 'Approved',
            primarySkill: 'Data Science',
            experienceLevel: 'Expert',
            currentJob: 'Principal Data Scientist',
            company: 'DataTech Solutions',
            location: 'Seattle, WA',
            skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL'],
            motivation: 'Want to democratize data science education and make it accessible to everyone.',
            teachingExperience: 'University lecturer for 5 years, online course creator',
            sampleCourse: 'Introduction to Machine Learning with Python',
            resumeUploaded: true,
            portfolioUrl: 'https://lisachen-datascience.com',
            linkedinUrl: 'https://linkedin.com/in/lisachen'
        },
        {
            id: 3,
            name: 'Marcus Thompson',
            email: 'marcus.thompson@email.com',
            phone: '+1 (555) 456-7890',
            avatar: '👨‍🎨',
            appliedDate: '2024-01-25',
            status: 'Pending',
            primarySkill: 'Design',
            experienceLevel: 'Advanced',
            currentJob: 'UX Design Manager',
            company: 'Creative Agency',
            location: 'Austin, TX',
            skills: ['Figma', 'Adobe Creative Suite', 'User Research', 'Prototyping'],
            motivation: 'Believe that good design can change the world and want to teach others.',
            teachingExperience: 'Workshop facilitator at design conferences',
            sampleCourse: 'Complete UX Design Process: From Research to Prototype',
            resumeUploaded: true,
            portfolioUrl: 'https://marcusthompson.design',
            linkedinUrl: 'https://linkedin.com/in/marcusthompson'
        },
        {
            id: 4,
            name: 'Sarah Kim',
            email: 'sarah.kim@email.com',
            phone: '+1 (555) 321-0987',
            avatar: '👩‍💼',
            appliedDate: '2024-01-30',
            status: 'Rejected',
            primarySkill: 'DevOps',
            experienceLevel: 'Intermediate',
            currentJob: 'DevOps Engineer',
            company: 'CloudTech Inc.',
            location: 'Denver, CO',
            skills: ['Docker', 'Kubernetes', 'AWS', 'Jenkins'],
            motivation: 'Want to help developers understand the importance of DevOps practices.',
            teachingExperience: 'Internal training sessions at current company',
            sampleCourse: 'Docker and Kubernetes for Developers',
            resumeUploaded: true,
            portfolioUrl: 'https://sarahkim.dev',
            linkedinUrl: 'https://linkedin.com/in/sarahkim'
        }
    ];

    const getStatusColor = (status) => {
        const statusColors = {
            'Pending': 'bg-saffron-100 dark:bg-saffron-900 text-saffron-700 dark:text-saffron-300',
            'Under Review': 'bg-sage-100 dark:bg-sage-900 text-sage-700 dark:text-sage-300',
            'Approved': 'bg-olive-100 dark:bg-olive-900 text-olive-700 dark:text-olive-300',
            'Rejected': 'bg-rust-100 dark:bg-rust-900 text-rust-700 dark:text-rust-300',
        };
        return statusColors[status] || 'bg-warm-100 dark:bg-warm-800 text-warm-600 dark:text-warm-300';
    };

    const getSkillColor = (skill) => {
        const skillColors = {
            'Web Development': 'bg-terracotta-100 dark:bg-terracotta-900 text-terracotta-700 dark:text-terracotta-300',
            'Data Science': 'bg-sage-100 dark:bg-sage-900 text-sage-700 dark:text-sage-300',
            'Design': 'bg-mustard-100 dark:bg-mustard-900 text-mustard-700 dark:text-mustard-300',
            'DevOps': 'bg-olive-100 dark:bg-olive-900 text-olive-700 dark:text-olive-300',
        };
        return skillColors[skill] || 'bg-warm-100 dark:bg-warm-800 text-warm-600 dark:text-warm-300';
    };

    const handleStatusChange = (applicationId, newStatus) => {
        message.success(`Application ${newStatus.toLowerCase()} successfully!`);
        setModalVisible(false);
    };

    const handleViewApplication = (application) => {
        setSelectedApplication(application);
        setModalVisible(true);
    };

    const columns = [
        {
            title: 'Applicant',
            key: 'applicant',
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
            title: 'Primary Skill',
            dataIndex: 'primarySkill',
            key: 'primarySkill',
            render: (skill) => (
                <Tag className={`border-0 ${getSkillColor(skill)}`}>
                    {skill}
                </Tag>
            ),
        },
        {
            title: 'Experience',
            dataIndex: 'experienceLevel',
            key: 'experienceLevel',
            render: (level) => (
                <Tag className={`border-0 ${level === 'Expert' ? 'bg-terracotta-100 dark:bg-terracotta-900 text-terracotta-700 dark:text-terracotta-300' :
                        level === 'Advanced' ? 'bg-rust-100 dark:bg-rust-900 text-rust-700 dark:text-rust-300' :
                            'bg-saffron-100 dark:bg-saffron-900 text-saffron-700 dark:text-saffron-300'
                    }`}>
                    {level}
                </Tag>
            ),
        },
        {
            title: 'Current Role',
            key: 'currentRole',
            render: (_, record) => (
                <div>
                    <div className="text-charcoal-500 dark:text-cream-100 font-medium">{record.currentJob}</div>
                    <div className="text-warm-500 dark:text-warm-300 text-sm">{record.company}</div>
                </div>
            ),
        },
        {
            title: 'Applied Date',
            dataIndex: 'appliedDate',
            key: 'appliedDate',
            render: (date) => (
                <div className="flex items-center gap-1">
                    <CalendarOutlined className="text-sage-500" />
                    <span className="text-warm-500 dark:text-warm-300">{date}</span>
                </div>
            ),
            sorter: (a, b) => new Date(a.appliedDate) - new Date(b.appliedDate),
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
                { text: 'Pending', value: 'Pending' },
                { text: 'Under Review', value: 'Under Review' },
                { text: 'Approved', value: 'Approved' },
                { text: 'Rejected', value: 'Rejected' },
            ],
            onFilter: (value, record) => record.status === value,
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip title="View Application">
                        <Button
                            type="text"
                            icon={<EyeOutlined />}
                            className="text-sage-500 hover:text-sage-600 hover:bg-sage-50 dark:hover:bg-sage-900"
                            onClick={() => handleViewApplication(record)}
                        />
                    </Tooltip>
                    {record.status === 'Pending' || record.status === 'Under Review' ? (
                        <>
                            <Tooltip title="Approve">
                                <Button
                                    type="text"
                                    icon={<CheckOutlined />}
                                    className="text-olive-500 hover:text-olive-600 hover:bg-olive-50 dark:hover:bg-olive-900"
                                    onClick={() => handleStatusChange(record.id, 'Approved')}
                                />
                            </Tooltip>
                            <Tooltip title="Reject">
                                <Button
                                    type="text"
                                    icon={<CloseOutlined />}
                                    className="text-rust-500 hover:text-rust-600 hover:bg-rust-50 dark:hover:bg-rust-900"
                                    onClick={() => handleStatusChange(record.id, 'Rejected')}
                                />
                            </Tooltip>
                        </>
                    ) : null}
                </Space>
            ),
        },
    ];

    const filteredApplications = applicationsData.filter(app => {
        const matchesSearch = app.name.toLowerCase().includes(searchText.toLowerCase()) ||
            app.email.toLowerCase().includes(searchText.toLowerCase()) ||
            app.primarySkill.toLowerCase().includes(searchText.toLowerCase());
        const matchesStatus = selectedStatus === 'all' || app.status === selectedStatus;
        return matchesSearch && matchesStatus;
    });

    const stats = {
        totalApplications: applicationsData.length,
        pending: applicationsData.filter(app => app.status === 'Pending').length,
        underReview: applicationsData.filter(app => app.status === 'Under Review').length,
        approved: applicationsData.filter(app => app.status === 'Approved').length,
        rejected: applicationsData.filter(app => app.status === 'Rejected').length
    };

    return (
        <div className="min-h-screen bg-cream-100 dark:bg-charcoal-500 p-6 transition-colors duration-300">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Header */}
                <Card className="bg-white dark:bg-warm-900 border-warm-200 dark:border-warm-700">
                    <Title level={2} className="text-charcoal-500 dark:text-cream-100 mb-2">
                        <UserOutlined className="text-terracotta-500 mr-3" />
                        Trainer Applications
                    </Title>
                    <Text className="text-warm-500 dark:text-warm-300">
                        Review and manage trainer applications
                    </Text>
                </Card>

                {/* Stats Overview */}
                <Row gutter={[24, 24]}>
                    <Col xs={24} sm={12} lg={6}>
                        <Card className="bg-terracotta-50 dark:bg-terracotta-900 border-terracotta-200 dark:border-terracotta-700 text-center">
                            <Statistic
                                title={<span className="text-warm-500 dark:text-warm-300">Total Applications</span>}
                                value={stats.totalApplications}
                                prefix={<UserOutlined className="text-terracotta-500" />}
                                valueStyle={{ color: '#E76F51' }}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Card className="bg-saffron-50 dark:bg-saffron-900 border-saffron-200 dark:border-saffron-700 text-center">
                            <Statistic
                                title={<span className="text-warm-500 dark:text-warm-300">Pending Review</span>}
                                value={stats.pending + stats.underReview}
                                prefix={<CalendarOutlined className="text-saffron-500" />}
                                valueStyle={{ color: '#F6BD60' }}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Card className="bg-olive-50 dark:bg-olive-900 border-olive-200 dark:border-olive-700 text-center">
                            <Statistic
                                title={<span className="text-warm-500 dark:text-warm-300">Approved</span>}
                                value={stats.approved}
                                prefix={<CheckOutlined className="text-olive-500" />}
                                valueStyle={{ color: '#6A994E' }}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Card className="bg-rust-50 dark:bg-rust-900 border-rust-200 dark:border-rust-700 text-center">
                            <Statistic
                                title={<span className="text-warm-500 dark:text-warm-300">Rejected</span>}
                                value={stats.rejected}
                                prefix={<CloseOutlined className="text-rust-500" />}
                                valueStyle={{ color: '#BC4749' }}
                            />
                        </Card>
                    </Col>
                </Row>

                {/* Search and Filters */}
                <Card className="bg-white dark:bg-warm-900 border-warm-200 dark:border-warm-700">
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                            <Input
                                placeholder="Search applications..."
                                prefix={<SearchOutlined className="text-sage-500" />}
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                className="h-10 bg-cream-50 dark:bg-warm-800 border-warm-200 dark:border-warm-600"
                            />
                        </Col>
                        <Col xs={24} md={12}>
                            <Select
                                placeholder="Filter by status"
                                value={selectedStatus}
                                onChange={setSelectedStatus}
                                className="w-full h-10"
                            >
                                <Option value="all">All Status</Option>
                                <Option value="Pending">Pending</Option>
                                <Option value="Under Review">Under Review</Option>
                                <Option value="Approved">Approved</Option>
                                <Option value="Rejected">Rejected</Option>
                            </Select>
                        </Col>
                    </Row>
                </Card>

                {/* Applications Table */}
                <Card className="bg-white dark:bg-warm-900 border-warm-200 dark:border-warm-700">
                    <Table
                        columns={columns}
                        dataSource={filteredApplications}
                        rowKey="id"
                        pagination={{
                            pageSize: 10,
                            showTotal: (total, range) => (
                                <span className="text-warm-500 dark:text-warm-300">
                                    {`${range[0]}-${range[1]} of ${total} applications`}
                                </span>
                            ),
                        }}
                        className="custom-table"
                        scroll={{ x: 'max-content' }}
                    />
                </Card>

                {/* Application Detail Modal */}
                <Modal
                    title={
                        selectedApplication ? (
                            <div className="flex items-center gap-3">
                                <div className="text-2xl">{selectedApplication.avatar}</div>
                                <div>
                                    <div className="text-charcoal-500 dark:text-cream-100 font-semibold">
                                        {selectedApplication.name}
                                    </div>
                                    <div className="text-warm-500 dark:text-warm-300 text-sm">
                                        Application Details
                                    </div>
                                </div>
                            </div>
                        ) : null
                    }
                    visible={modalVisible}
                    onCancel={() => setModalVisible(false)}
                    footer={null}
                    width={800}
                    className="custom-modal"
                >
                    {selectedApplication && (
                        <div className="space-y-6">
                            {/* Status and Basic Info */}
                            <div className="bg-cream-50 dark:bg-warm-800 p-4 rounded-lg">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <Tag className={`border-0 ${getStatusColor(selectedApplication.status)} mb-2`}>
                                            {selectedApplication.status}
                                        </Tag>
                                        <div className="text-warm-500 dark:text-warm-300 text-sm">
                                            Applied on {selectedApplication.appliedDate}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-charcoal-500 dark:text-cream-100 font-medium">
                                            {selectedApplication.currentJob}
                                        </div>
                                        <div className="text-warm-500 dark:text-warm-300 text-sm">
                                            {selectedApplication.company}
                                        </div>
                                    </div>
                                </div>

                                <Row gutter={[16, 16]}>
                                    <Col span={12}>
                                        <div className="flex items-center gap-2 text-warm-500 dark:text-warm-300">
                                            <MailOutlined className="text-sage-500" />
                                            {selectedApplication.email}
                                        </div>
                                    </Col>
                                    <Col span={12}>
                                        <div className="flex items-center gap-2 text-warm-500 dark:text-warm-300">
                                            <PhoneOutlined className="text-sage-500" />
                                            {selectedApplication.phone}
                                        </div>
                                    </Col>
                                </Row>
                            </div>

                            {/* Skills and Experience */}
                            <div>
                                <Title level={5} className="text-charcoal-500 dark:text-cream-100 mb-3">
                                    Skills & Experience
                                </Title>
                                <div className="space-y-3">
                                    <div>
                                        <Text className="text-warm-500 dark:text-warm-300 text-sm block mb-1">
                                            Primary Skill:
                                        </Text>
                                        <Tag className={`border-0 ${getSkillColor(selectedApplication.primarySkill)}`}>
                                            {selectedApplication.primarySkill}
                                        </Tag>
                                    </div>
                                    <div>
                                        <Text className="text-warm-500 dark:text-warm-300 text-sm block mb-1">
                                            Skills:
                                        </Text>
                                        <div className="flex flex-wrap gap-1">
                                            {selectedApplication.skills.map((skill, index) => (
                                                <Tag key={index} className="bg-mustard-100 dark:bg-mustard-900 text-mustard-700 dark:text-mustard-300 border-0">
                                                    {skill}
                                                </Tag>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <Text className="text-warm-500 dark:text-warm-300 text-sm block mb-1">
                                            Experience Level:
                                        </Text>
                                        <Tag className={`border-0 ${selectedApplication.experienceLevel === 'Expert' ? 'bg-terracotta-100 dark:bg-terracotta-900 text-terracotta-700 dark:text-terracotta-300' :
                                                selectedApplication.experienceLevel === 'Advanced' ? 'bg-rust-100 dark:bg-rust-900 text-rust-700 dark:text-rust-300' :
                                                    'bg-saffron-100 dark:bg-saffron-900 text-saffron-700 dark:text-saffron-300'
                                            }`}>
                                            {selectedApplication.experienceLevel}
                                        </Tag>
                                    </div>
                                </div>
                            </div>

                            {/* Teaching Experience */}
                            <div>
                                <Title level={5} className="text-charcoal-500 dark:text-cream-100 mb-3">
                                    Teaching Experience
                                </Title>
                                <div className="bg-cream-50 dark:bg-warm-800 p-3 rounded-lg">
                                    <Text className="text-warm-600 dark:text-warm-300">
                                        {selectedApplication.teachingExperience}
                                    </Text>
                                </div>
                            </div>

                            {/* Motivation */}
                            <div>
                                <Title level={5} className="text-charcoal-500 dark:text-cream-100 mb-3">
                                    Motivation
                                </Title>
                                <div className="bg-cream-50 dark:bg-warm-800 p-3 rounded-lg">
                                    <Text className="text-warm-600 dark:text-warm-300">
                                        {selectedApplication.motivation}
                                    </Text>
                                </div>
                            </div>

                            {/* Sample Course */}
                            <div>
                                <Title level={5} className="text-charcoal-500 dark:text-cream-100 mb-3">
                                    Sample Course Idea
                                </Title>
                                <div className="bg-cream-50 dark:bg-warm-800 p-3 rounded-lg">
                                    <Text className="text-warm-600 dark:text-warm-300">
                                        {selectedApplication.sampleCourse}
                                    </Text>
                                </div>
                            </div>

                            {/* Links */}
                            <div>
                                <Title level={5} className="text-charcoal-500 dark:text-cream-100 mb-3">
                                    Portfolio & Links
                                </Title>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Text className="text-warm-500 dark:text-warm-300 text-sm">Portfolio:</Text>
                                        <a
                                            href={selectedApplication.portfolioUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sage-500 hover:text-sage-600"
                                        >
                                            {selectedApplication.portfolioUrl}
                                        </a>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Text className="text-warm-500 dark:text-warm-300 text-sm">LinkedIn:</Text>
                                        <a
                                            href={selectedApplication.linkedinUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sage-500 hover:text-sage-600"
                                        >
                                            {selectedApplication.linkedinUrl}
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            {(selectedApplication.status === 'Pending' || selectedApplication.status === 'Under Review') && (
                                <div className="flex justify-end gap-3 pt-4 border-t border-warm-200 dark:border-warm-700">
                                    <Button
                                        icon={<CloseOutlined />}
                                        className="text-rust-500 border-rust-500 hover:bg-rust-50 dark:hover:bg-rust-900"
                                        onClick={() => handleStatusChange(selectedApplication.id, 'Rejected')}
                                    >
                                        Reject
                                    </Button>
                                    <Button
                                        type="primary"
                                        icon={<CheckOutlined />}
                                        className="bg-olive-500 hover:bg-olive-600 border-olive-500"
                                        onClick={() => handleStatusChange(selectedApplication.id, 'Approved')}
                                    >
                                        Approve
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </Modal>
            </div>
        </div>
    );
};

export default TrainerApplications;
