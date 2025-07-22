import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
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
    const { isDark } = useTheme();
    const { user } = useAuth();
    const [searchText, setSearchText] = useState('');
    const [selectedLevel, setSelectedLevel] = useState('all');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Real data states
    const [studentsData, setStudentsData] = useState([]);

    // Fetch students data
    useEffect(() => {
        const fetchStudents = async () => {
            setLoading(true);
            setError(null);
            
            try {
                let students = [];
                
                if (user.role === 'trainer') {
                    // For trainers: Only get students enrolled in their courses
                    const trainerCoursesResponse = await api.routes.trainings.getAll();
                    const allCourses = trainerCoursesResponse.data || [];
                    const trainerCourses = allCourses.filter(course => course.trainer_id === user.id);
                    
                    // Get enrollments for trainer's courses
                    const enrollmentsResponse = await api.routes.enrollments.getAll();
                    const allEnrollments = enrollmentsResponse.data || [];
                    
                    // Filter enrollments for trainer's courses only
                    const trainerEnrollments = allEnrollments.filter(enrollment => 
                        trainerCourses.some(course => course.id === enrollment.training_id)
                    );
                    
                    // Get unique student IDs from enrollments
                    const studentIds = [...new Set(trainerEnrollments.map(e => e.user_id))];
                    
                    // Fetch student details
                    const studentsResponse = await api.routes.users.getByRole('student');
                    const allStudents = studentsResponse.data || [];
                    
                    // Filter to only include students enrolled in trainer's courses
                    students = allStudents.filter(student => studentIds.includes(student.id));
                    
                    // Add enrollment data to each student
                    students = students.map(student => {
                        const studentEnrollments = trainerEnrollments.filter(e => e.user_id === student.id);
                        return {
                            ...student,
                            enrollments: studentEnrollments,
                            trainerCourses: studentEnrollments.map(e => 
                                trainerCourses.find(c => c.id === e.training_id)
                            ).filter(Boolean)
                        };
                    });
                } else if (user.role === 'coordinator' || user.role === 'admin') {
                    // For coordinators/admins: Get all students
                    const response = await api.routes.users.getByRole('student');
                    students = response.data || [];
                } else {
                    // Other roles shouldn't access this page
                    setError('Access denied');
                    return;
                }
                
                // Transform API data to match our component structure
                const transformedStudents = students.map(student => {
                    const enrollments = student.enrollments || [];
                    const trainerCourses = student.trainerCourses || [];
                    
                    return {
                        id: student.id,
                        name: student.name,
                        email: student.email,
                        avatar: getRandomAvatar(),
                        joinedDate: new Date(student.created_at).toLocaleDateString(),
                        coursesEnrolled: user.role === 'trainer' ? trainerCourses.length : enrollments.length,
                        coursesCompleted: enrollments.filter(e => e.status === 'completed').length,
                        level: calculateLevel(enrollments.length),
                        totalHours: calculateTotalHours(user.role === 'trainer' ? trainerCourses : enrollments),
                        certificates: enrollments.filter(e => e.status === 'completed').length,
                        progress: calculateProgress(enrollments),
                        status: student.last_login_at && new Date(student.last_login_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) ? 'Active' : 'Inactive',
                        lastActivity: formatLastActivity(student.last_login_at),
                        enrolledCourses: user.role === 'trainer' ? trainerCourses : enrollments
                    };
                });
                
                setStudentsData(transformedStudents);
            } catch (err) {
                console.error('Error fetching students:', err);
                setError('Failed to load students data');
                
                // Fallback to sample data if API fails
                setStudentsData([
                    {
                        id: 1,
                        name: 'Alex Thompson',
                        email: 'alex.thompson@email.com',
                        avatar: '👨‍💻',
                        joinedDate: '2024-01-15',
                        coursesEnrolled: user.role === 'trainer' ? 2 : 5,
                        coursesCompleted: 1,
                        level: 'Intermediate',
                        totalHours: 45,
                        certificates: 1,
                        progress: 50,
                        status: 'Active',
                        lastActivity: '2 hours ago'
                    },
                    {
                        id: 2,
                        name: 'Maria Garcia',
                        email: 'maria.garcia@email.com',
                        avatar: '👩‍🎨',
                        joinedDate: '2024-02-01',
                        coursesEnrolled: user.role === 'trainer' ? 1 : 3,
                        coursesCompleted: 1,
                        level: 'Beginner',
                        totalHours: 30,
                        certificates: 1,
                        progress: 75,
                        status: 'Active',
                        lastActivity: '1 day ago'
                    }
                ]);
            } finally {
                setLoading(false);
            }
        };

        if (user && (user.role === 'trainer' || user.role === 'coordinator' || user.role === 'admin')) {
            fetchStudents();
        }
    }, [user]);

    // Helper functions
    const getRandomAvatar = () => {
        const avatars = ['👨‍💻', '👩‍💻', '👨‍🎨', '👩‍🎨', '👨‍🔬', '👩‍🔬', '👨‍💼', '👩‍💼'];
        return avatars[Math.floor(Math.random() * avatars.length)];
    };

    const calculateLevel = (coursesCount) => {
        if (coursesCount >= 10) return 'Advanced';
        if (coursesCount >= 5) return 'Intermediate';
        return 'Beginner';
    };

    const calculateTotalHours = (enrollments) => {
        return enrollments.reduce((total, enrollment) => {
            return total + (enrollment.training?.duration_hours || 0);
        }, 0);
    };

    const calculateProgress = (enrollments) => {
        if (enrollments.length === 0) return 0;
        const completedCount = enrollments.filter(e => e.status === 'completed').length;
        return Math.round((completedCount / enrollments.length) * 100);
    };

    const formatLastActivity = (lastLogin) => {
        if (!lastLogin) return 'Never';
        const now = new Date();
        const loginDate = new Date(lastLogin);
        const diffInHours = Math.floor((now - loginDate) / (1000 * 60 * 60));
        
        if (diffInHours < 1) return 'Just now';
        if (diffInHours < 24) return `${diffInHours} hours ago`;
        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 7) return `${diffInDays} days ago`;
        return `${Math.floor(diffInDays / 7)} weeks ago`;
    };

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
        avgProgress: studentsData.length > 0 ? Math.round(studentsData.reduce((acc, s) => acc + s.progress, 0) / studentsData.length) : 0,
        totalCertificates: studentsData.reduce((acc, s) => acc + s.certificates, 0)
    };

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                background: isDark ? 'linear-gradient(135deg, #0f172a, #1e293b)' : 'linear-gradient(135deg, #f8f9fa, #ffffff)'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '18px', color: isDark ? '#ffffff' : '#000000' }}>
                        Loading students...
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                background: isDark ? 'linear-gradient(135deg, #0f172a, #1e293b)' : 'linear-gradient(135deg, #f8f9fa, #ffffff)'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '18px', color: '#ef4444' }}>
                        {error}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            minHeight: '100vh',
            padding: '24px',
            background: isDark 
                ? 'linear-gradient(135deg, #0f172a, #1e293b)'
                : 'linear-gradient(135deg, #f8f9fa, #ffffff)'
        }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>

                {/* Header */}
                <div className="mb-8">
                    <Title level={1} className="mb-2" style={{ 
                        color: isDark ? '#ffffff' : '#000000',
                        fontSize: '32px',
                        fontWeight: '700'
                    }}>
                        <UserOutlined className="mr-3" style={{ color: '#E76F51' }} />
                        {user?.role === 'trainer' ? 'My Students' : 'Students Management'}
                    </Title>
                    <p className="text-lg" style={{ 
                        color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)' 
                    }}>
                        {user?.role === 'trainer' 
                            ? 'Monitor your students\' progress in your courses' 
                            : 'Monitor student progress and engagement'
                        }
                    </p>
                </div>

                {/* Stats Overview */}
                <Row gutter={[24, 24]} className="mb-8">
                    <Col xs={24} sm={12} lg={6}>
                        <div style={{
                            background: isDark ? '#1e293b' : '#ffffff',
                            borderRadius: '12px',
                            padding: '24px',
                            textAlign: 'center',
                            border: isDark ? '1px solid #334155' : '1px solid #e2e8f0',
                            boxShadow: isDark 
                                ? '0 4px 6px -1px rgba(0, 0, 0, 0.3)' 
                                : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}>
                            <UserOutlined style={{ color: '#E76F51', fontSize: '24px', marginBottom: '12px' }} />
                            <div style={{ color: '#E76F51', fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>
                                {stats.totalStudents}
                            </div>
                            <div style={{ 
                                color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                                fontSize: '14px'
                            }}>
                                Total Students
                            </div>
                        </div>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <div style={{
                            background: isDark ? '#1e293b' : '#ffffff',
                            borderRadius: '12px',
                            padding: '24px',
                            textAlign: 'center',
                            border: isDark ? '1px solid #334155' : '1px solid #e2e8f0',
                            boxShadow: isDark 
                                ? '0 4px 6px -1px rgba(0, 0, 0, 0.3)' 
                                : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}>
                            <UserOutlined style={{ color: '#6A994E', fontSize: '24px', marginBottom: '12px' }} />
                            <div style={{ color: '#6A994E', fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>
                                {stats.activeStudents}
                            </div>
                            <div style={{ 
                                color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                                fontSize: '14px'
                            }}>
                                Active Students
                            </div>
                        </div>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <div style={{
                            background: isDark ? '#1e293b' : '#ffffff',
                            borderRadius: '12px',
                            padding: '24px',
                            textAlign: 'center',
                            border: isDark ? '1px solid #334155' : '1px solid #e2e8f0',
                            boxShadow: isDark 
                                ? '0 4px 6px -1px rgba(0, 0, 0, 0.3)' 
                                : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}>
                            <BookOutlined style={{ color: '#2A9D8F', fontSize: '24px', marginBottom: '12px' }} />
                            <div style={{ color: '#2A9D8F', fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>
                                {stats.avgProgress}%
                            </div>
                            <div style={{ 
                                color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                                fontSize: '14px'
                            }}>
                                Avg Progress
                            </div>
                        </div>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <div style={{
                            background: isDark ? '#1e293b' : '#ffffff',
                            borderRadius: '12px',
                            padding: '24px',
                            textAlign: 'center',
                            border: isDark ? '1px solid #334155' : '1px solid #e2e8f0',
                            boxShadow: isDark 
                                ? '0 4px 6px -1px rgba(0, 0, 0, 0.3)' 
                                : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}>
                            <TrophyOutlined style={{ color: '#F4A261', fontSize: '24px', marginBottom: '12px' }} />
                            <div style={{ color: '#F4A261', fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>
                                {stats.totalCertificates}
                            </div>
                            <div style={{ 
                                color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                                fontSize: '14px'
                            }}>
                                Certificates
                            </div>
                        </div>
                    </Col>
                </Row>

                {/* Search and Filters */}
                <div className="mb-6">
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={16}>
                            <Input
                                placeholder="Search students by name or email..."
                                prefix={<SearchOutlined style={{ color: '#2A9D8F' }} />}
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                style={{
                                    height: '48px',
                                    borderRadius: '8px',
                                    fontSize: '16px',
                                    background: isDark ? '#1e293b' : '#ffffff',
                                    borderColor: isDark ? '#334155' : '#e2e8f0',
                                    color: isDark ? '#ffffff' : '#000000'
                                }}
                            />
                        </Col>
                        <Col xs={24} md={8}>
                            <div className="flex justify-end">
                                <Button
                                    icon={<FilterOutlined />}
                                    style={{
                                        height: '48px',
                                        borderRadius: '8px',
                                        borderColor: '#2A9D8F',
                                        color: '#2A9D8F',
                                        background: 'transparent'
                                    }}
                                >
                                    Advanced Filters
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </div>

                {/* Students Table */}
                <div style={{
                    background: isDark ? '#1e293b' : '#ffffff',
                    borderRadius: '12px',
                    padding: '24px',
                    border: isDark ? '1px solid #334155' : '1px solid #e2e8f0',
                    boxShadow: isDark 
                        ? '0 4px 6px -1px rgba(0, 0, 0, 0.3)' 
                        : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}>
                    <Table
                        columns={columns}
                        dataSource={filteredStudents}
                        rowKey="id"
                        pagination={{
                            pageSize: 10,
                            showTotal: (total, range) => (
                                <span style={{ 
                                    color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)' 
                                }}>
                                    {`${range[0]}-${range[1]} of ${total} students`}
                                </span>
                            ),
                            showSizeChanger: true,
                            showQuickJumper: true
                        }}
                        scroll={{ x: 'max-content' }}
                        style={{
                            background: 'transparent'
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Students;