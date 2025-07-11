import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Button,
    Card,
    Typography,
    Row,
    Col,
    Carousel,
    Select,
    Input,
    Tag,
    Progress,
    Avatar,
    Rate,
    Collapse,
    Menu
} from 'antd';
import {
    BookOutlined,
    UserOutlined,
    ClockCircleOutlined,
    TrophyOutlined,
    TeamOutlined,
    BarChartOutlined,
    PlayCircleOutlined,
    StarOutlined,
    SearchOutlined,
    ArrowRightOutlined,
    CheckCircleOutlined,
    DownOutlined
} from '@ant-design/icons';
import { useTheme } from '../contexts/ThemeContext';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { Panel } = Collapse;

const LandingPage = () => {
    const { theme } = useTheme();
    const [activeSection, setActiveSection] = useState('hero');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    // Sample data for courses
    const courses = [
        {
            id: 1,
            title: 'Web Development Fundamentals',
            category: 'Programming',
            level: 'Beginner',
            duration: '8 weeks',
            students: 1250,
            rating: 4.8,
            price: '$199',
            image: '/api/placeholder/300/200',
            instructor: 'Sarah Johnson'
        },
        {
            id: 2,
            title: 'Data Science & Analytics',
            category: 'Data Science',
            level: 'Intermediate',
            duration: '12 weeks',
            students: 890,
            rating: 4.9,
            price: '$299',
            image: '/api/placeholder/300/200',
            instructor: 'Dr. Michael Chen'
        },
        {
            id: 3,
            title: 'Digital Marketing Mastery',
            category: 'Marketing',
            level: 'Beginner',
            duration: '6 weeks',
            students: 2100,
            rating: 4.7,
            price: '$149',
            image: '/api/placeholder/300/200',
            instructor: 'Emma Rodriguez'
        },
        {
            id: 4,
            title: 'Project Management Professional',
            category: 'Management',
            level: 'Advanced',
            duration: '10 weeks',
            students: 750,
            rating: 4.9,
            price: '$399',
            image: '/api/placeholder/300/200',
            instructor: 'James Wilson'
        }
    ];

    // Sample trainers data
    const trainers = [
        {
            id: 1,
            name: 'Sarah Johnson',
            specialization: 'Web Development',
            experience: '8+ years',
            courses: 12,
            students: 3500,
            rating: 4.9,
            avatar: '/api/placeholder/120/120',
            bio: 'Full-stack developer with expertise in React, Node.js, and cloud technologies.'
        },
        {
            id: 2,
            name: 'Dr. Michael Chen',
            specialization: 'Data Science',
            experience: '12+ years',
            courses: 8,
            students: 2800,
            rating: 4.8,
            avatar: '/api/placeholder/120/120',
            bio: 'PhD in Computer Science, specializing in machine learning and data analytics.'
        },
        {
            id: 3,
            name: 'Emma Rodriguez',
            specialization: 'Digital Marketing',
            experience: '6+ years',
            courses: 15,
            students: 4200,
            rating: 4.9,
            avatar: '/api/placeholder/120/120',
            bio: 'Marketing strategist with proven track record in digital transformation.'
        }
    ];

    // Sample testimonials
    const testimonials = [
        {
            id: 1,
            name: 'Alex Thompson',
            role: 'Software Engineer',
            company: 'TechCorp',
            content: 'LearnHub transformed my career. The web development course was comprehensive and practical.',
            rating: 5,
            avatar: '/api/placeholder/80/80'
        },
        {
            id: 2,
            name: 'Maria Garcia',
            role: 'Data Analyst',
            company: 'DataInsights',
            content: 'The data science program exceeded my expectations. Now I\'m leading analytics projects.',
            rating: 5,
            avatar: '/api/placeholder/80/80'
        },
        {
            id: 3,
            name: 'David Kim',
            role: 'Marketing Manager',
            company: 'GrowthCo',
            content: 'Excellent instructors and real-world projects. Highly recommend for career advancement.',
            rating: 5,
            avatar: '/api/placeholder/80/80'
        }
    ];

    // Scroll to section handler
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Filter courses based on search and category
    const filteredCourses = courses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="theme-container">
            {/* Header Navigation */}
            <header style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                backgroundColor: 'var(--bg-secondary)',
                borderBottom: '1px solid var(--border-color)',
                backdropFilter: 'blur(10px)',
                padding: '12px 0'
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
                    <Row justify="space-between" align="middle">
                        <Col>
                            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                                <BookOutlined style={{ fontSize: '24px', color: 'var(--accent-primary)', marginRight: '8px' }} />
                                <Text style={{ fontSize: '20px', fontWeight: '700', color: 'var(--text-primary)' }}>
                                    LearnHub
                                </Text>
                            </Link>
                        </Col>
                        <Col>
                            <Menu
                                mode="horizontal"
                                style={{ backgroundColor: 'transparent', border: 'none' }}
                                items={[
                                    { key: 'features', label: 'Features', onClick: () => scrollToSection('features') },
                                    { key: 'courses', label: 'Courses', onClick: () => scrollToSection('courses') },
                                    { key: 'trainers', label: 'Trainers', onClick: () => scrollToSection('trainers') },
                                    { key: 'testimonials', label: 'Reviews', onClick: () => scrollToSection('testimonials') }
                                ]}
                            />
                        </Col>
                        <Col>
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                <Button type="text" style={{ color: 'var(--text-primary)' }}>
                                    <Link to="/login" style={{ color: 'inherit', textDecoration: 'none' }}>
                                        Sign In
                                    </Link>
                                </Button>
                                <Button
                                    type="primary"
                                    className="btn-primary cta-button"
                                    style={{
                                        backgroundColor: 'var(--accent-primary)',
                                        borderColor: 'var(--accent-primary)',
                                        height: '40px',
                                        borderRadius: '20px',
                                        fontWeight: '600',
                                        boxShadow: '0 4px 15px rgba(11, 197, 234, 0.3)'
                                    }}
                                >
                                    <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>
                                        Get Started
                                    </Link>
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </div>
            </header>

            {/* Hero Section */}
            <section id="hero" style={{
                minHeight: '100vh',
                background: `
                    radial-gradient(circle at 20% 50%, rgba(11, 197, 234, 0.15) 0%, transparent 50%),
                    radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
                    radial-gradient(circle at 40% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
                    linear-gradient(135deg, ${theme === 'light' ? 'rgba(248, 250, 252, 0.95)' : 'rgba(31, 41, 55, 0.95)'} 0%, ${theme === 'light' ? 'rgba(241, 245, 249, 0.98)' : 'rgba(17, 24, 39, 0.98)'} 100%)
                `,
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                paddingTop: '80px',
                overflow: 'hidden'
            }}>
                {/* Floating Elements */}
                <div style={{
                    position: 'absolute',
                    top: '10%',
                    right: '15%',
                    width: '100px',
                    height: '100px',
                    background: 'linear-gradient(45deg, rgba(11, 197, 234, 0.3), rgba(139, 92, 246, 0.3))',
                    borderRadius: '50%',
                    animation: 'float 6s ease-in-out infinite',
                    zIndex: 1
                }}></div>
                <div style={{
                    position: 'absolute',
                    bottom: '20%',
                    left: '10%',
                    width: '60px',
                    height: '60px',
                    background: 'linear-gradient(45deg, rgba(236, 72, 153, 0.4), rgba(11, 197, 234, 0.4))',
                    borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                    animation: 'float 8s ease-in-out infinite reverse',
                    zIndex: 1
                }}></div>
                <div style={{
                    position: 'absolute',
                    top: '30%',
                    left: '5%',
                    width: '40px',
                    height: '40px',
                    background: 'rgba(11, 197, 234, 0.5)',
                    borderRadius: '50%',
                    animation: 'pulse 4s ease-in-out infinite',
                    zIndex: 1
                }}></div>

                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', width: '100%', position: 'relative', zIndex: 2 }}>
                    <Row align="middle" gutter={[48, 48]}>
                        <Col xs={24} lg={12}>
                            <div className="fade-in" style={{ animationDelay: '0.2s' }}>
                                <div style={{
                                    background: 'linear-gradient(135deg, var(--accent-primary), #8b5cf6, #ec4899)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    textTransform: 'uppercase',
                                    letterSpacing: '2px',
                                    marginBottom: '16px'
                                }}>
                                    🚀 WELCOME TO THE FUTURE OF LEARNING
                                </div>
                                <Title
                                    level={1}
                                    style={{
                                        fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                                        fontWeight: '900',
                                        marginBottom: '24px',
                                        color: 'var(--text-primary)',
                                        lineHeight: 1.1,
                                        background: `linear-gradient(135deg, var(--text-primary) 0%, var(--accent-primary) 100%)`,
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text'
                                    }}
                                >
                                    Transform Your Career with
                                    <br />
                                    <span style={{
                                        color: 'var(--accent-primary)',
                                        background: 'linear-gradient(135deg, var(--accent-primary) 0%, #8b5cf6 50%, #ec4899 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text'
                                    }}>Expert Training</span>
                                </Title>
                                <Paragraph
                                    style={{
                                        fontSize: '1.25rem',
                                        color: 'var(--text-secondary)',
                                        marginBottom: '32px',
                                        lineHeight: 1.7,
                                        fontWeight: '400'
                                    }}
                                >
                                    Join thousands of professionals advancing their skills with our comprehensive training programs.
                                    Learn from industry experts and build the future you deserve. 🎯
                                </Paragraph>
                                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '48px' }}>
                                    <Button
                                        type="primary"
                                        size="large"
                                        className="btn-primary cta-button"
                                        icon={<PlayCircleOutlined />}
                                        style={{
                                            height: '56px',
                                            padding: '0 32px',
                                            fontSize: '16px',
                                            fontWeight: '700',
                                            borderRadius: '28px',
                                            background: 'linear-gradient(135deg, var(--accent-primary) 0%, #0891B2 100%)',
                                            border: 'none',
                                            boxShadow: '0 8px 32px rgba(11, 197, 234, 0.4)',
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>
                                            Start Learning Now
                                        </Link>
                                    </Button>
                                    <Button
                                        size="large"
                                        className="btn-secondary"
                                        icon={<BookOutlined />}
                                        style={{
                                            height: '56px',
                                            padding: '0 32px',
                                            fontSize: '16px',
                                            fontWeight: '600',
                                            borderRadius: '28px',
                                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                            borderColor: 'var(--accent-primary)',
                                            color: 'var(--accent-primary)',
                                            backdropFilter: 'blur(10px)',
                                            transition: 'all 0.3s ease'
                                        }}
                                        onClick={() => scrollToSection('courses')}
                                    >
                                        Browse Courses
                                    </Button>
                                </div>

                                {/* Enhanced Stats */}
                                <div style={{
                                    display: 'flex',
                                    gap: '40px',
                                    flexWrap: 'wrap',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    backdropFilter: 'blur(10px)',
                                    padding: '24px',
                                    borderRadius: '16px',
                                    border: '1px solid rgba(11, 197, 234, 0.2)'
                                }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <Text className="stat-number" style={{
                                            fontSize: '2.5rem',
                                            fontWeight: '800',
                                            background: 'linear-gradient(135deg, var(--accent-primary) 0%, #8b5cf6 100%)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            backgroundClip: 'text',
                                            display: 'block'
                                        }}>
                                            10K+
                                        </Text>
                                        <Text style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>Active Students</Text>
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <Text className="stat-number" style={{
                                            fontSize: '2.5rem',
                                            fontWeight: '800',
                                            background: 'linear-gradient(135deg, var(--accent-primary) 0%, #8b5cf6 100%)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            backgroundClip: 'text',
                                            display: 'block'
                                        }}>
                                            500+
                                        </Text>
                                        <Text style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>Expert Courses</Text>
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <Text className="stat-number" style={{
                                            fontSize: '2.5rem',
                                            fontWeight: '800',
                                            background: 'linear-gradient(135deg, var(--accent-primary) 0%, #8b5cf6 100%)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            backgroundClip: 'text',
                                            display: 'block'
                                        }}>
                                            98%
                                        </Text>
                                        <Text style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>Success Rate</Text>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col xs={24} lg={12}>
                            <div className="fade-in" style={{ animationDelay: '0.4s', textAlign: 'center' }}>
                                <div style={{
                                    position: 'relative',
                                    width: '100%',
                                    maxWidth: '500px',
                                    height: '400px',
                                    margin: '0 auto'
                                }}>
                                    {/* Main Hero Visual */}
                                    <div style={{
                                        width: '100%',
                                        height: '100%',
                                        background: 'linear-gradient(135deg, var(--accent-primary) 0%, #8b5cf6 50%, #ec4899 100%)',
                                        borderRadius: '24px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: '0 32px 64px rgba(11, 197, 234, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        transform: 'rotate(-2deg)',
                                        transition: 'all 0.3s ease'
                                    }}>
                                        {/* Animated Background Pattern */}
                                        <div style={{
                                            position: 'absolute',
                                            inset: 0,
                                            background: `
                                                radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.2) 0%, transparent 50%),
                                                radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)
                                            `,
                                            animation: 'pulse 4s ease-in-out infinite'
                                        }}></div>

                                        <PlayCircleOutlined style={{
                                            fontSize: '100px',
                                            color: 'white',
                                            filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))',
                                            zIndex: 2,
                                            position: 'relative'
                                        }} />
                                    </div>

                                    {/* Floating Cards */}
                                    <div style={{
                                        position: 'absolute',
                                        top: '-20px',
                                        right: '-20px',
                                        width: '80px',
                                        height: '80px',
                                        background: 'rgba(255, 255, 255, 0.9)',
                                        borderRadius: '16px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                                        animation: 'float 3s ease-in-out infinite',
                                        backdropFilter: 'blur(10px)'
                                    }}>
                                        <TrophyOutlined style={{ fontSize: '32px', color: 'var(--accent-primary)' }} />
                                    </div>

                                    <div style={{
                                        position: 'absolute',
                                        bottom: '-10px',
                                        left: '-30px',
                                        width: '100px',
                                        height: '60px',
                                        background: 'rgba(255, 255, 255, 0.9)',
                                        borderRadius: '12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                                        animation: 'float 4s ease-in-out infinite reverse',
                                        backdropFilter: 'blur(10px)',
                                        flexDirection: 'column',
                                        padding: '8px'
                                    }}>
                                        <StarOutlined style={{ fontSize: '20px', color: '#fbbf24', marginBottom: '4px' }} />
                                        <Text style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)' }}>4.9★</Text>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>

                {/* Enhanced Scroll indicator */}
                <div style={{
                    position: 'absolute',
                    bottom: '32px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px'
                }} onClick={() => scrollToSection('features')}>
                    <Text style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '600' }}>SCROLL TO EXPLORE</Text>
                    <DownOutlined style={{
                        fontSize: '24px',
                        color: 'var(--accent-primary)',
                        animation: 'bounce 2s infinite',
                        padding: '8px',
                        borderRadius: '50%',
                        background: 'rgba(11, 197, 234, 0.1)',
                        backdropFilter: 'blur(10px)'
                    }} />
                </div>
            </section>

            {/* Features Section */}
            <section id="features" style={{ padding: '100px 0', backgroundColor: 'var(--bg-primary)' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                        <Title level={2} style={{ color: 'var(--text-primary)', marginBottom: '16px' }}>
                            Why Choose LearnHub?
                        </Title>
                        <Paragraph style={{ fontSize: '18px', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                            We provide comprehensive training solutions designed to accelerate your professional growth
                        </Paragraph>
                    </div>

                    <Row gutter={[32, 32]}>
                        {[
                            {
                                icon: <ClockCircleOutlined />,
                                title: 'Flexible Scheduling',
                                description: 'Learn at your own pace with 24/7 access to course materials and flexible scheduling options.'
                            },
                            {
                                icon: <UserOutlined />,
                                title: 'Expert Instructors',
                                description: 'Learn from industry professionals with years of real-world experience and proven expertise.'
                            },
                            {
                                icon: <TrophyOutlined />,
                                title: 'Certification Programs',
                                description: 'Earn recognized certifications that boost your credentials and career prospects.'
                            },
                            {
                                icon: <BarChartOutlined />,
                                title: 'Progress Tracking',
                                description: 'Monitor your learning journey with detailed analytics and personalized recommendations.'
                            },
                            {
                                icon: <TeamOutlined />,
                                title: 'Community Support',
                                description: 'Connect with peers, mentors, and instructors in our vibrant learning community.'
                            },
                            {
                                icon: <CheckCircleOutlined />,
                                title: 'Hands-on Projects',
                                description: 'Apply your knowledge through real-world projects and build an impressive portfolio.'
                            }
                        ].map((feature, index) => (
                            <Col xs={24} md={12} lg={8} key={index}>
                                <Card
                                    className="theme-card fade-in"
                                    style={{
                                        height: '100%',
                                        textAlign: 'center',
                                        animationDelay: `${index * 0.1}s`,
                                        backgroundColor: 'var(--bg-secondary)',
                                        borderColor: 'var(--border-color)'
                                    }}
                                    hoverable
                                >
                                    <div style={{
                                        fontSize: '48px',
                                        color: 'var(--accent-primary)',
                                        marginBottom: '24px'
                                    }}>
                                        {feature.icon}
                                    </div>
                                    <Title level={4} style={{ color: 'var(--text-primary)', marginBottom: '16px' }}>
                                        {feature.title}
                                    </Title>
                                    <Paragraph style={{ color: 'var(--text-secondary)' }}>
                                        {feature.description}
                                    </Paragraph>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </section>

            {/* Course Catalog Section */}
            <section id="courses" style={{ padding: '100px 0', backgroundColor: 'var(--bg-secondary)' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <Title level={2} style={{ color: 'var(--text-primary)', marginBottom: '16px' }}>
                            Popular Courses
                        </Title>
                        <Paragraph style={{ fontSize: '18px', color: 'var(--text-secondary)', marginBottom: '40px' }}>
                            Discover our most sought-after training programs
                        </Paragraph>

                        {/* Course Filters */}
                        <Row gutter={16} justify="center" style={{ marginBottom: '40px' }}>
                            <Col>
                                <Input
                                    placeholder="Search courses..."
                                    prefix={<SearchOutlined />}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    style={{ width: 250, backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}
                                />
                            </Col>
                            <Col>
                                <Select
                                    defaultValue="all"
                                    style={{ width: 150 }}
                                    onChange={setSelectedCategory}
                                >
                                    <Option value="all">All Categories</Option>
                                    <Option value="Programming">Programming</Option>
                                    <Option value="Data Science">Data Science</Option>
                                    <Option value="Marketing">Marketing</Option>
                                    <Option value="Management">Management</Option>
                                </Select>
                            </Col>
                        </Row>
                    </div>

                    <Row gutter={[24, 24]}>
                        {filteredCourses.map((course, index) => (
                            <Col xs={24} sm={12} lg={6} key={course.id}>
                                <Card
                                    className="theme-card fade-in"
                                    cover={
                                        <div style={{
                                            height: '200px',
                                            backgroundColor: 'var(--accent-primary)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <BookOutlined style={{ fontSize: '48px', color: 'white' }} />
                                        </div>
                                    }
                                    style={{
                                        animationDelay: `${index * 0.1}s`,
                                        backgroundColor: 'var(--bg-primary)',
                                        borderColor: 'var(--border-color)'
                                    }}
                                    hoverable
                                >
                                    <div style={{ marginBottom: '12px' }}>
                                        <Tag color={course.level === 'Beginner' ? 'green' : course.level === 'Intermediate' ? 'orange' : 'red'}>
                                            {course.level}
                                        </Tag>
                                        <Tag color="blue">{course.category}</Tag>
                                    </div>
                                    <Title level={5} style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>
                                        {course.title}
                                    </Title>
                                    <Text style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '12px' }}>
                                        By {course.instructor}
                                    </Text>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                        <Rate disabled defaultValue={course.rating} style={{ fontSize: '14px' }} />
                                        <Text style={{ color: 'var(--text-secondary)' }}>({course.students})</Text>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                        <Text style={{ color: 'var(--text-secondary)' }}>{course.duration}</Text>
                                        <Text style={{ fontSize: '18px', fontWeight: '600', color: 'var(--accent-primary)' }}>
                                            {course.price}
                                        </Text>
                                    </div>
                                    <Button
                                        type="primary"
                                        block
                                        className="btn-primary"
                                        style={{
                                            backgroundColor: 'var(--accent-primary)',
                                            borderColor: 'var(--accent-primary)'
                                        }}
                                    >
                                        Enroll Now
                                    </Button>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </section>

            {/* Trainers Section */}
            <section id="trainers" style={{ padding: '100px 0', backgroundColor: 'var(--bg-primary)' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <Title level={2} style={{ color: 'var(--text-primary)', marginBottom: '16px' }}>
                            Meet Our Expert Trainers
                        </Title>
                        <Paragraph style={{ fontSize: '18px', color: 'var(--text-secondary)' }}>
                            Learn from industry professionals with proven track records
                        </Paragraph>
                    </div>

                    <Row gutter={[32, 32]}>
                        {trainers.map((trainer, index) => (
                            <Col xs={24} md={8} key={trainer.id}>
                                <Card
                                    className="theme-card fade-in"
                                    style={{
                                        textAlign: 'center',
                                        animationDelay: `${index * 0.1}s`,
                                        backgroundColor: 'var(--bg-secondary)',
                                        borderColor: 'var(--border-color)'
                                    }}
                                    hoverable
                                >
                                    <Avatar
                                        size={120}
                                        src={trainer.avatar}
                                        style={{
                                            marginBottom: '24px',
                                            backgroundColor: 'var(--accent-primary)'
                                        }}
                                        icon={<UserOutlined />}
                                    />
                                    <Title level={4} style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>
                                        {trainer.name}
                                    </Title>
                                    <Text style={{ color: 'var(--accent-primary)', display: 'block', marginBottom: '16px', fontWeight: '600' }}>
                                        {trainer.specialization}
                                    </Text>
                                    <Paragraph style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
                                        {trainer.bio}
                                    </Paragraph>

                                    <Row gutter={16} style={{ marginBottom: '20px' }}>
                                        <Col span={8}>
                                            <Text style={{ display: 'block', fontSize: '18px', fontWeight: '600', color: 'var(--accent-primary)' }}>
                                                {trainer.courses}
                                            </Text>
                                            <Text style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>Courses</Text>
                                        </Col>
                                        <Col span={8}>
                                            <Text style={{ display: 'block', fontSize: '18px', fontWeight: '600', color: 'var(--accent-primary)' }}>
                                                {trainer.students}
                                            </Text>
                                            <Text style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>Students</Text>
                                        </Col>
                                        <Col span={8}>
                                            <Text style={{ display: 'block', fontSize: '18px', fontWeight: '600', color: 'var(--accent-primary)' }}>
                                                {trainer.rating}
                                            </Text>
                                            <Text style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>Rating</Text>
                                        </Col>
                                    </Row>

                                    <Button
                                        type="primary"
                                        className="btn-primary"
                                        style={{
                                            backgroundColor: 'var(--accent-primary)',
                                            borderColor: 'var(--accent-primary)'
                                        }}
                                    >
                                        View Profile
                                    </Button>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" style={{ padding: '100px 0', backgroundColor: 'var(--bg-secondary)' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <Title level={2} style={{ color: 'var(--text-primary)', marginBottom: '16px' }}>
                            What Our Students Say
                        </Title>
                        <Paragraph style={{ fontSize: '18px', color: 'var(--text-secondary)' }}>
                            Real success stories from our learning community
                        </Paragraph>
                    </div>

                    <Carousel autoplay dots={{ className: 'custom-dots' }}>
                        {testimonials.map((testimonial) => (
                            <div key={testimonial.id}>
                                <Card
                                    className="theme-card"
                                    style={{
                                        maxWidth: '800px',
                                        margin: '0 auto',
                                        textAlign: 'center',
                                        backgroundColor: 'var(--bg-primary)',
                                        borderColor: 'var(--border-color)'
                                    }}
                                >
                                    <Avatar
                                        size={80}
                                        src={testimonial.avatar}
                                        style={{
                                            marginBottom: '24px',
                                            backgroundColor: 'var(--accent-primary)'
                                        }}
                                        icon={<UserOutlined />}
                                    />
                                    <Rate disabled defaultValue={testimonial.rating} style={{ marginBottom: '20px' }} />
                                    <Paragraph style={{
                                        fontSize: '18px',
                                        color: 'var(--text-primary)',
                                        marginBottom: '24px',
                                        fontStyle: 'italic'
                                    }}>
                                        "{testimonial.content}"
                                    </Paragraph>
                                    <Title level={5} style={{ color: 'var(--text-primary)', marginBottom: '4px' }}>
                                        {testimonial.name}
                                    </Title>
                                    <Text style={{ color: 'var(--text-secondary)' }}>
                                        {testimonial.role} at {testimonial.company}
                                    </Text>
                                </Card>
                            </div>
                        ))}
                    </Carousel>
                </div>
            </section>

            {/* CTA Section */}
            <section style={{
                padding: '100px 0',
                backgroundColor: 'var(--accent-primary)',
                background: 'linear-gradient(135deg, var(--accent-primary) 0%, #0891B2 100%)'
            }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
                    <Title level={2} style={{ color: 'white', marginBottom: '24px' }}>
                        Ready to Transform Your Career?
                    </Title>
                    <Paragraph style={{ fontSize: '20px', color: 'rgba(255, 255, 255, 0.9)', marginBottom: '40px' }}>
                        Join thousands of professionals who have accelerated their careers with LearnHub
                    </Paragraph>
                    <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Button
                            type="primary"
                            size="large"
                            icon={<ArrowRightOutlined />}
                            style={{
                                height: '52px',
                                padding: '0 32px',
                                fontSize: '16px',
                                fontWeight: '600',
                                backgroundColor: 'white',
                                borderColor: 'white',
                                color: 'var(--accent-primary)'
                            }}
                        >
                            <Link to="/register" style={{ color: 'inherit', textDecoration: 'none' }}>
                                Start Your Journey Today
                            </Link>
                        </Button>
                        <Button
                            size="large"
                            style={{
                                height: '52px',
                                padding: '0 32px',
                                fontSize: '16px',
                                fontWeight: '600',
                                backgroundColor: 'transparent',
                                borderColor: 'white',
                                color: 'white'
                            }}
                            onClick={() => scrollToSection('courses')}
                        >
                            Browse All Courses
                        </Button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer style={{
                padding: '60px 0 30px',
                backgroundColor: 'var(--bg-secondary)',
                borderTop: '1px solid var(--border-color)'
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
                    <Row gutter={[32, 32]}>
                        <Col xs={24} md={6}>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                                <BookOutlined style={{ fontSize: '24px', color: 'var(--accent-primary)', marginRight: '8px' }} />
                                <Text style={{ fontSize: '20px', fontWeight: '700', color: 'var(--text-primary)' }}>
                                    LearnHub
                                </Text>
                            </div>
                            <Paragraph style={{ color: 'var(--text-secondary)' }}>
                                Empowering professionals worldwide with cutting-edge training and education.
                            </Paragraph>
                        </Col>
                        <Col xs={24} md={6}>
                            <Title level={5} style={{ color: 'var(--text-primary)', marginBottom: '16px' }}>
                                Quick Links
                            </Title>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <Link style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>About Us</Link>
                                <Link style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Courses</Link>
                                <Link style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Trainers</Link>
                                <Link style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Contact</Link>
                            </div>
                        </Col>
                        <Col xs={24} md={6}>
                            <Title level={5} style={{ color: 'var(--text-primary)', marginBottom: '16px' }}>
                                Support
                            </Title>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <Link style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Help Center</Link>
                                <Link style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Privacy Policy</Link>
                                <Link style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Terms of Service</Link>
                                <Link style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>FAQ</Link>
                            </div>
                        </Col>
                        <Col xs={24} md={6}>
                            <Title level={5} style={{ color: 'var(--text-primary)', marginBottom: '16px' }}>
                                Connect
                            </Title>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <Link style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>LinkedIn</Link>
                                <Link style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Twitter</Link>
                                <Link style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Facebook</Link>
                                <Link style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Instagram</Link>
                            </div>
                        </Col>
                    </Row>
                    <div style={{
                        borderTop: '1px solid var(--border-color)',
                        marginTop: '40px',
                        paddingTop: '20px',
                        textAlign: 'center'
                    }}>
                        <Text style={{ color: 'var(--text-secondary)' }}>
                            © 2024 LearnHub. All rights reserved.
                        </Text>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
