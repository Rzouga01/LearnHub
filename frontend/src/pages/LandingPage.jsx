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
import { useAuth } from '../contexts/AuthContext';
import ThemeToggle from '../components/ThemeToggle';
import Logo from '../components/Logo';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { Panel } = Collapse;

const LandingPage = () => {
  const { theme } = useTheme();
  const { user, isAuthenticated } = useAuth();
  const [activeSection, setActiveSection] = useState('hero');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');


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
      image: null, // Will show logo instead
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
      image: null, // Will show logo instead
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
      image: null,
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
      image: null,
      instructor: 'James Wilson'
    }
  ];

  const trainers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      specialization: 'Web Development',
      experience: '8+ years',
      courses: 12,
      students: 3500,
      rating: 4.9,
      avatar: null,
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
      avatar: null,
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
      avatar: null,
      bio: 'Marketing strategist with proven track record in digital transformation.'
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Alex Thompson',
      role: 'Software Engineer',
      company: 'TechCorp',
      content: 'LearnHub transformed my career. The web development course was comprehensive and practical.',
      rating: 5,
      avatar: null
    },
    {
      id: 2,
      name: 'Maria Garcia',
      role: 'Data Analyst',
      company: 'DataInsights',
      content: 'The data science program exceeded my expectations. Now I\'m leading analytics projects.',
      rating: 5,
      avatar: null
    },
    {
      id: 3,
      name: 'David Kim',
      role: 'Marketing Manager',
      company: 'GrowthCo',
      content: 'Excellent instructors and real-world projects. Highly recommend for career advancement.',
      rating: 5,
      avatar: null
    }
  ];


  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };


  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="theme-container" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', minHeight: '100vh', fontFamily: 'Inter, sans-serif', transition: 'background 0.3s, color 0.3s', position: 'relative' }}>
      {/* Header Navigation */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: theme === 'dark' ? 'rgba(46, 46, 46, 0.85)' : 'rgba(255, 255, 255, 0.85)',
        borderBottom: `1px solid ${theme === 'dark' ? 'var(--border-color)' : 'rgba(231, 111, 81, 0.1)'}`,
        backdropFilter: 'blur(16px)',
        padding: '16px 0',
        boxShadow: theme === 'dark' ? '0 2px 16px rgba(0, 0, 0, 0.4)' : '0 2px 16px rgba(231, 111, 81, 0.1)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <Row justify="space-between" align="middle">
            <Col>
              <Logo
                to="/"
                size="xxlarge"
                showText={false}
                style={{ color: 'var(--text-primary)' }}
              />
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
                <ThemeToggle />
                {isAuthenticated ? (
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <Button
                      type="text"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      <Link to="/dashboard" style={{ color: 'inherit', textDecoration: 'none' }}>
                        Dashboard
                      </Link>
                    </Button>
                    <Button
                      type="text"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      <Link to="/profile" style={{ color: 'inherit', textDecoration: 'none' }}>
                        Profile
                      </Link>
                    </Button>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 16px',
                      backgroundColor: 'var(--bg-secondary)',
                      borderRadius: '20px',
                      border: '1px solid var(--border-color)'
                    }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--accent-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: '600',
                        fontSize: '14px'
                      }}>
                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <Text style={{
                          color: 'var(--text-primary)',
                          fontSize: '14px',
                          fontWeight: '600',
                          lineHeight: 1.2
                        }}>
                          {user?.name || 'User'}
                        </Text>
                        <Text style={{
                          color: 'var(--text-secondary)',
                          fontSize: '12px',
                          lineHeight: 1.2
                        }}>
                          {user?.role || 'Student'}
                        </Text>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Not logged in menu
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
                )}
              </div>
            </Col>
          </Row>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" style={{
        minHeight: '100vh',
        background: theme === 'dark' 
          ? `linear-gradient(135deg, #1a2236 0%, #2d364c 100%)`
          : `linear-gradient(135deg, var(--bg-primary) 0%, var(--accent-secondary) 100%)`,
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        paddingTop: '120px',
        paddingBottom: '60px',
        overflow: 'hidden',
        transition: 'background 0.3s'
      }}>
        {/* Background gradient overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: theme === 'dark' 
            ? 'radial-gradient(circle at 30% 30%, rgba(231, 111, 81, 0.1) 0%, transparent 60%)'
            : 'radial-gradient(circle at 30% 30%, rgba(244, 162, 97, 0.1) 0%, transparent 60%)',
          zIndex: 0
        }}></div>

        {/* Floating Elements */}
        <div style={{
          position: 'absolute',
          top: '15%',
          right: '10%',
          width: '300px',
          height: '300px',
          background: theme === 'dark'
            ? 'radial-gradient(circle at center, rgba(231, 111, 81, 0.15) 0%, transparent 70%)'
            : 'radial-gradient(circle at center, rgba(244, 162, 97, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          animation: 'float 10s ease-in-out infinite',
          zIndex: 1
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '20%',
          left: '5%',
          width: '250px',
          height: '250px',
          background: theme === 'dark'
            ? 'radial-gradient(circle at center, rgba(244, 162, 97, 0.15) 0%, transparent 70%)'
            : 'radial-gradient(circle at center, rgba(231, 111, 81, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          animation: 'float 8s ease-in-out infinite reverse',
          zIndex: 1
        }}></div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', width: '100%', position: 'relative', zIndex: 2 }}>
          <Row align="middle" gutter={[48, 48]} style={{ rowGap: '32px' }}>
            <Col xs={24} lg={12}>
              <div className="fade-in" style={{ animationDelay: '0.2s' }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(231, 111, 81, 0.1)',
                  padding: '8px 16px',
                  borderRadius: '100px',
                  marginBottom: '24px',
                  border: '1px solid rgba(231, 111, 81, 0.2)',
                  backdropFilter: 'blur(10px)'
                }}>
                  <span style={{ color: 'var(--accent-primary)' }}>🚀</span>
                  <Text style={{ 
                    color: 'var(--accent-primary)',
                    fontSize: '14px',
                    fontWeight: '500',
                    letterSpacing: '1px',
                    textTransform: 'uppercase'
                  }}>
                    Welcome to the future of learning
                  </Text>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <Text style={{
                    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                    fontWeight: '700',
                    lineHeight: '1.2',
                    display: 'block',
                    marginBottom: '16px',
                    background: theme === 'dark'
                      ? 'linear-gradient(to right, var(--accent-primary), var(--accent-secondary))'
                      : 'linear-gradient(to right, var(--accent-primary), var(--accent-secondary))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    Transform Your Career with
                  </Text>
                  <Text style={{
                    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                    fontWeight: '700',
                    lineHeight: '1.2',
                    display: 'block',
                    color: theme === 'dark' ? '#fff' : 'var(--text-primary)',
                  }}>
                    Expert Training
                  </Text>
                </div>

                <Paragraph style={{
                  fontSize: '1.125rem',
                  color: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'var(--text-secondary)',
                  marginBottom: '32px',
                  lineHeight: '1.7',
                  maxWidth: '600px'
                }}>
                  Join thousands of professionals advancing their skills with our comprehensive training programs. Learn from industry experts and build the future you deserve. 🎯
                </Paragraph>

                <div style={{ display: 'flex', gap: '16px', marginBottom: '48px' }}>
                  <Button
                    type="primary"
                    size="large"
                    style={{
                      height: '56px',
                      padding: '0 32px',
                      fontSize: '16px',
                      fontWeight: '600',
                      background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                      border: 'none',
                      borderRadius: '100px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                    className="glow-button"
                  >
                    Start Learning Now <ArrowRightOutlined />
                  </Button>
                  <Button
                    size="large"
                    style={{
                      height: '56px',
                      padding: '0 32px',
                      fontSize: '16px',
                      fontWeight: '600',
                      background: 'rgba(231, 111, 81, 0.1)',
                      border: '1px solid rgba(231, 111, 81, 0.2)',
                      color: theme === 'dark' ? '#fff' : 'var(--text-primary)',
                      borderRadius: '100px',
                      backdropFilter: 'blur(10px)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                    className="glass-button"
                  >
                    Browse Courses <ArrowRightOutlined />
                  </Button>
                </div>

                {/* Stats */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '24px',
                  padding: '24px',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <Row gutter={[32, 16]}>
                    {[
                      { number: '10K+', label: 'Active Students' },
                      { number: '500+', label: 'Expert Courses' },
                      { number: '98%', label: 'Success Rate' }
                    ].map((stat, index) => (
                      <Col xs={8} key={index}>
                        <div style={{ textAlign: 'center' }}>
                          <Text style={{
                            fontSize: '28px',
                            fontWeight: '700',
                            color: 'var(--accent-primary)',
                            display: 'block',
                            marginBottom: '4px'
                          }}>
                            {stat.number}
                          </Text>
                          <Text style={{
                            fontSize: '14px',
                            color: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'var(--text-secondary)',
                            display: 'block'
                          }}>
                            {stat.label}
                          </Text>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </div>
              </div>
            </Col>

            <Col xs={24} lg={12}>
              <div style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16/9',
                background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {/* Video card decorative elements */}
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '12px',
                  padding: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backdropFilter: 'blur(10px)'
                }}>
                  <TrophyOutlined style={{ fontSize: '24px', color: 'var(--accent-primary)' }} />
                </div>
                <div style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  background: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '12px',
                  padding: '8px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backdropFilter: 'blur(10px)'
                }}>
                  <StarOutlined style={{ color: '#FFB800' }} />
                  <Text style={{ color: 'var(--text-primary)', fontWeight: '600' }}>4.9</Text>
                </div>

                {/* Play button */}
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.9)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease',
                  backdropFilter: 'blur(10px)'
                }} className="play-button">
                  <PlayCircleOutlined style={{ fontSize: '32px', color: 'var(--accent-primary)' }} />
                </div>
              </div>
            </Col>
          </Row>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          zIndex: 2
        }} onClick={() => scrollToSection('features')}>
          <Text style={{
            fontSize: '12px',
            color: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'var(--text-secondary)',
            letterSpacing: '2px',
            textTransform: 'uppercase'
          }}>
            Scroll to explore
          </Text>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'rgba(231, 111, 81, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(10px)'
          }}>
            <DownOutlined style={{ color: 'var(--accent-primary)' }} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{ 
        padding: '80px 0', 
        backgroundColor: 'var(--bg-primary)', 
        transition: 'background 0.3s',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background decoration */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '300px',
          height: '300px',
          background: theme === 'dark' 
            ? 'radial-gradient(circle, rgba(244, 162, 97, 0.1) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(231, 111, 81, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          zIndex: 0
        }} />
        <div style={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: '250px',
          height: '250px',
          background: theme === 'dark'
            ? 'radial-gradient(circle, rgba(231, 111, 81, 0.1) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(244, 162, 97, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          zIndex: 0
        }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: '20px',
              backgroundColor: theme === 'dark' ? 'rgba(244, 162, 97, 0.1)' : 'rgba(231, 111, 81, 0.1)',
              marginBottom: '16px'
            }}>
              <span style={{ color: 'var(--accent-primary)' }}>✨</span>
              <Text style={{ 
                color: 'var(--accent-primary)',
                fontWeight: '600',
                fontSize: '14px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                Why Choose Us
              </Text>
            </div>
            <Title level={2} style={{ 
              color: 'var(--text-primary)', 
              marginBottom: '16px',
              fontSize: 'clamp(2rem, 4vw, 2.5rem)',
              fontWeight: '800'
            }}>
              Elevate Your Professional Journey
            </Title>
            <Paragraph style={{ 
              fontSize: '18px', 
              color: 'var(--text-secondary)', 
              maxWidth: '600px', 
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Discover why thousands of professionals trust LearnHub for their career development
            </Paragraph>
          </div>

          <Row gutter={[32, 32]}>
            {[
              {
                icon: <ClockCircleOutlined />,
                title: 'Flexible Learning',
                description: 'Learn at your own pace with 24/7 access to course materials and flexible scheduling options.',
                color: '#E76F51'
              },
              {
                icon: <UserOutlined />,
                title: 'Expert Instructors',
                description: 'Learn from industry professionals with years of real-world experience and proven expertise.',
                color: '#F4A261'
              },
              {
                icon: <TrophyOutlined />,
                title: 'Certification',
                description: 'Earn recognized certifications that boost your credentials and career prospects.',
                color: '#2A9D8F'
              },
              {
                icon: <BarChartOutlined />,
                title: 'Progress Tracking',
                description: 'Monitor your learning journey with detailed analytics and personalized recommendations.',
                color: '#264653'
              },
              {
                icon: <TeamOutlined />,
                title: 'Community',
                description: 'Connect with peers, mentors, and instructors in our vibrant learning community.',
                color: '#8B5CF6'
              },
              {
                icon: <CheckCircleOutlined />,
                title: 'Practical Projects',
                description: 'Apply your knowledge through real-world projects and build an impressive portfolio.',
                color: '#EC4899'
              }
            ].map((feature, index) => (
              <Col xs={24} md={12} lg={8} key={index}>
                <Card
                  className="feature-card"
                  style={{
                    height: '100%',
                    backgroundColor: theme === 'dark' ? 'rgba(61, 55, 53, 0.5)' : 'rgba(255, 255, 255, 0.5)',
                    borderColor: 'var(--border-color)',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  bodyStyle={{ 
                    padding: '32px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    zIndex: 2
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `linear-gradient(135deg, ${feature.color}15 0%, transparent 100%)`,
                    zIndex: 1
                  }} />
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '20px',
                    backgroundColor: theme === 'dark' ? 'rgba(244, 162, 97, 0.1)' : 'rgba(231, 111, 81, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '24px',
                    fontSize: '28px',
                    color: feature.color,
                    transition: 'all 0.3s ease'
                  }}>
                    {feature.icon}
                  </div>
                  <Title level={4} style={{ 
                    color: 'var(--text-primary)', 
                    marginBottom: '16px',
                    fontSize: '20px',
                    fontWeight: '700'
                  }}>
                    {feature.title}
                  </Title>
                  <Paragraph style={{ 
                    color: 'var(--text-secondary)',
                    fontSize: '16px',
                    lineHeight: '1.6',
                    margin: 0,
                    flex: 1
                  }}>
                    {feature.description}
                  </Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Course Catalog Section */}
      <section id="courses" style={{ 
        padding: '80px 0', 
        backgroundColor: 'var(--bg-secondary)', 
        transition: 'background 0.3s',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background decoration */}
        <div style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '400px',
          height: '400px',
          background: theme === 'dark'
            ? 'radial-gradient(circle, rgba(244, 162, 97, 0.1) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(231, 111, 81, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          zIndex: 0
        }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: '20px',
              backgroundColor: theme === 'dark' ? 'rgba(244, 162, 97, 0.1)' : 'rgba(231, 111, 81, 0.1)',
              marginBottom: '16px'
            }}>
              <span style={{ color: 'var(--accent-primary)' }}>📚</span>
              <Text style={{ 
                color: 'var(--accent-primary)',
                fontWeight: '600',
                fontSize: '14px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                Featured Courses
              </Text>
            </div>
            <Title level={2} style={{ 
              color: 'var(--text-primary)', 
              marginBottom: '16px',
              fontSize: 'clamp(2rem, 4vw, 2.5rem)',
              fontWeight: '800'
            }}>
              Popular Learning Paths
            </Title>
            <Paragraph style={{ 
              fontSize: '18px', 
              color: 'var(--text-secondary)', 
              marginBottom: '40px',
              maxWidth: '600px',
              margin: '0 auto 40px',
              lineHeight: '1.6'
            }}>
              Explore our most sought-after courses designed to help you achieve your career goals
            </Paragraph>

            {/* Course Filters */}
            <Row gutter={[16, 16]} justify="center" style={{ marginBottom: '40px' }}>
              <Col>
                <Input
                  placeholder="Search courses..."
                  prefix={<SearchOutlined style={{ color: 'var(--text-secondary)' }} />}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ 
                    width: 250, 
                    height: '44px',
                    borderRadius: '22px',
                    backgroundColor: theme === 'dark' ? 'rgba(61, 55, 53, 0.5)' : 'rgba(255, 255, 255, 0.5)',
                    borderColor: 'var(--border-color)',
                    padding: '0 20px'
                  }}
                />
              </Col>
              <Col>
                <Select
                  defaultValue="all"
                  style={{ 
                    width: 150,
                    height: '44px'
                  }}
                  onChange={setSelectedCategory}
                  dropdownStyle={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderColor: 'var(--border-color)'
                  }}
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
                  className="course-card"
                  hoverable
                  cover={
                    <div style={{
                      height: '200px',
                      background: `linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderTopLeftRadius: '16px',
                      borderTopRightRadius: '16px',
                      position: 'relative',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.2) 0%, transparent 50%)',
                      }} />
                      <img
                        src="/src/assets/images/logo.png"
                        alt="Course Logo"
                        style={{
                          width: '64px',
                          height: '64px',
                          objectFit: 'contain',
                          filter: 'brightness(0) invert(1)',
                          transform: 'scale(1)',
                          transition: 'transform 0.3s ease'
                        }}
                      />
                    </div>
                  }
                  style={{
                    backgroundColor: theme === 'dark' ? 'rgba(61, 55, 53, 0.5)' : 'rgba(255, 255, 255, 0.5)',
                    borderColor: 'var(--border-color)',
                    borderRadius: '16px',
                    overflow: 'hidden'
                  }}
                  bodyStyle={{ padding: '24px' }}
                >
                  <Tag color={theme === 'dark' ? 'warning' : 'success'} style={{ marginBottom: '12px' }}>
                    {course.level}
                  </Tag>
                  <Title level={4} style={{ 
                    color: 'var(--text-primary)',
                    marginBottom: '8px',
                    fontSize: '18px',
                    fontWeight: '600',
                    lineHeight: '1.4'
                  }}>
                    {course.title}
                  </Title>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    marginBottom: '16px',
                    color: 'var(--text-secondary)'
                  }}>
                    <UserOutlined /> {course.instructor}
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: '16px'
                  }}>
                    <Text style={{ color: 'var(--text-secondary)' }}>
                      <ClockCircleOutlined style={{ marginRight: '4px' }} />
                      {course.duration}
                    </Text>
                    <Text style={{ color: 'var(--text-secondary)' }}>
                      <TeamOutlined style={{ marginRight: '4px' }} />
                      {course.students}
                    </Text>
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center'
                  }}>
                    <Rate disabled defaultValue={course.rating} style={{ fontSize: '14px' }} />
                    <Text strong style={{ 
                      color: 'var(--accent-primary)',
                      fontSize: '18px'
                    }}>
                      {course.price}
                    </Text>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Trainers Section */}
      <section id="trainers" style={{ padding: '80px 0', backgroundColor: 'var(--bg-primary)', transition: 'background 0.3s' }}>
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
      <section id="testimonials" style={{ padding: '80px 0', backgroundColor: 'var(--bg-secondary)', transition: 'background 0.3s' }}>
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
        padding: '80px 0',
        background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
        boxShadow: '0 8px 32px var(--shadow-medium)'
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
        padding: '48px 0 24px',
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-color)',
        transition: 'background 0.3s',
        boxShadow: '0 -2px 16px var(--shadow-medium)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <Row gutter={[32, 32]}>
            <Col xs={24} md={6}>
              <Logo
                to="/"
                size="large"
                showText={true}
                style={{ color: 'var(--text-primary)', marginBottom: '16px' }}
              />
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