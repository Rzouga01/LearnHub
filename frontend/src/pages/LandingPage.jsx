import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  Typography,
  Row,
  Col,
  Avatar,
  Rate,
  Menu,
  Carousel,
  Tag,
  Divider,
  Progress
} from 'antd';
import {
  UserOutlined,
  ClockCircleOutlined,
  TrophyOutlined,
  TeamOutlined,
  BarChartOutlined,
  PlayCircleOutlined,
  StarOutlined,
  ArrowRightOutlined,
  CheckCircleOutlined,
  DownOutlined,
  RocketOutlined,
  FireOutlined,
  ThunderboltOutlined,
  CrownOutlined,
  HeartOutlined,
  BulbOutlined,
  CheckOutlined,
  CalendarOutlined,
  GlobalOutlined,
  LaptopOutlined,
  CodeOutlined,
  DatabaseOutlined,
  CloudOutlined,
  MobileOutlined,
  SafetyOutlined,
  ExperimentOutlined
} from '@ant-design/icons';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import ThemeToggle from '../components/ThemeToggle';
import Logo from '../components/Logo';
import MarqueeReviews from '../components/MarqueeReviews';

const { Title, Text, Paragraph } = Typography;

const LandingPage = () => {
  const { theme } = useTheme();
  const { user, isAuthenticated } = useAuth();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isMarqueePaused, setIsMarqueePaused] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [cursorTrail, setCursorTrail] = useState([]);
  const [isVoiceListening, setIsVoiceListening] = useState(false);
  const [quantumParticles, setQuantumParticles] = useState([]);
  const [neuralNodes, setNeuralNodes] = useState([]);
  const [matrixColumns, setMatrixColumns] = useState([]);
  const heroRef = useRef(null);
  const marqueeRef = useRef(null);
  const voiceRef = useRef(null);

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll tracking for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // AI-Powered Cursor Trail System
  useEffect(() => {
    const createCursorTrail = (e) => {
      const trail = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now()
      };
      
      setCursorTrail(prev => [...prev.slice(-10), trail]);
      
      // Create particle trail element
      const particle = document.createElement('div');
      particle.className = 'cursor-ai-trail';
      particle.style.left = e.clientX + 'px';
      particle.style.top = e.clientY + 'px';
      document.body.appendChild(particle);
      
      setTimeout(() => {
        if (document.body.contains(particle)) {
          document.body.removeChild(particle);
        }
      }, 1000);
    };

    window.addEventListener('mousemove', createCursorTrail);
    return () => window.removeEventListener('mousemove', createCursorTrail);
  }, []);

  // Quantum Particle System
  useEffect(() => {
    const generateQuantumParticles = () => {
      const particles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + Math.random() * 100,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 2 + 1,
        delay: Math.random() * 5
      }));
      setQuantumParticles(particles);
    };

    generateQuantumParticles();
    const interval = setInterval(generateQuantumParticles, 10000);
    return () => clearInterval(interval);
  }, []);

  // Neural Network Background
  useEffect(() => {
    const generateNeuralNodes = () => {
      const nodes = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        connections: Math.floor(Math.random() * 3) + 1
      }));
      setNeuralNodes(nodes);
    };

    generateNeuralNodes();
    window.addEventListener('resize', generateNeuralNodes);
    return () => window.removeEventListener('resize', generateNeuralNodes);
  }, []);

  // Matrix Rain Effect
  useEffect(() => {
    const generateMatrixColumns = () => {
      const columns = Array.from({ length: Math.floor(window.innerWidth / 20) }, (_, i) => ({
        id: i,
        x: i * 20,
        characters: '01LearnHub'.split(''),
        speed: Math.random() * 3 + 1
      }));
      setMatrixColumns(columns);
    };

    generateMatrixColumns();
    window.addEventListener('resize', generateMatrixColumns);
    return () => window.removeEventListener('resize', generateMatrixColumns);
  }, []);

  // Voice Activation System
  const handleVoiceActivation = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      setIsVoiceListening(true);
      recognition.start();

      recognition.onresult = (event) => {
        const command = event.results[0][0].transcript.toLowerCase();
        
        if (command.includes('features')) {
          scrollToSection('features');
        } else if (command.includes('courses')) {
          scrollToSection('courses');
        } else if (command.includes('testimonials') || command.includes('reviews')) {
          scrollToSection('testimonials');
        } else if (command.includes('register') || command.includes('sign up')) {
          window.location.href = '/register';
        } else if (command.includes('login') || command.includes('sign in')) {
          window.location.href = '/login';
        }
        
        setIsVoiceListening(false);
      };

      recognition.onerror = () => {
        setIsVoiceListening(false);
      };

      recognition.onend = () => {
        setIsVoiceListening(false);
      };
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Data arrays
  const marqueeItems = [
    { icon: '🚀', text: 'Launch Your Career' },
    { icon: '💡', text: 'Learn from Experts' },
    { icon: '🎯', text: 'Achieve Your Goals' },
    { icon: '⭐', text: '98% Success Rate' },
    { icon: '🔥', text: 'Hot Courses Available' },
    { icon: '💎', text: 'Premium Quality' },
    { icon: '🌟', text: 'Top Rated Platform' },
    { icon: '🎓', text: 'Get Certified' }
  ];

  const companies = [
    'Google', 'Microsoft', 'Apple', 'Amazon', 'Meta', 'Netflix', 'Tesla', 'Spotify'
  ];

  const features = [
    {
      icon: <RocketOutlined />,
      title: 'Launch Fast',
      description: 'Get started in minutes with our streamlined onboarding process and intuitive learning path',
      color: '#E76F51',
      delay: '0s'
    },
    {
      icon: <FireOutlined />,
      title: 'In-Demand Skills',
      description: 'Master the most sought-after skills that top employers are actively recruiting for',
      color: '#F4A261',
      delay: '0.1s'
    },
    {
      icon: <ThunderboltOutlined />,
      title: 'Accelerated Learning',
      description: 'Learn 3x faster with our proven methodology and bite-sized, focused content',
      color: '#2A9D8F',
      delay: '0.2s'
    },
    {
      icon: <CrownOutlined />,
      title: 'Expert Instructors',
      description: 'Learn directly from industry veterans with real-world experience at top companies',
      color: '#264653',
      delay: '0.3s'
    },
    {
      icon: <GlobalOutlined />,
      title: 'Community Access',
      description: 'Connect with a global network of peers, mentors, and potential employers',
      color: '#E63946',
      delay: '0.4s'
    },
    {
      icon: <LaptopOutlined />,
      title: 'Hands-On Projects',
      description: 'Build a professional portfolio with real-world projects and practical assignments',
      color: '#F77F00',
      delay: '0.5s'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Software Engineer',
      company: 'Google',
      content: 'LearnHub transformed my career completely. The courses are incredibly practical and the instructors are world-class.',
      rating: 5,
      avatar: 'SC'
    },
    {
      name: 'Marcus Johnson',
      role: 'Data Scientist',
      company: 'Microsoft',
      content: 'Best investment I ever made. Landed my dream job within 3 months of completing the program.',
      rating: 5,
      avatar: 'MJ'
    },
    {
      name: 'Elena Rodriguez',
      role: 'Product Manager',
      company: 'Apple',
      content: 'The community support and mentorship made all the difference. Highly recommend to anyone serious about growth.',
      rating: 5,
      avatar: 'ER'
    }
  ];

  const reviewsMarquee = [
    { name: 'Alex Thompson', role: 'Full Stack Developer', company: 'Netflix', review: 'Amazing platform! Got promoted within 6 months.', rating: 5 },
    { name: 'Maria Garcia', role: 'UX Designer', company: 'Airbnb', review: 'The design courses are top-notch. Highly recommend!', rating: 5 },
    { name: 'David Kim', role: 'DevOps Engineer', company: 'Tesla', review: 'Best learning experience ever. Instructors are incredible.', rating: 5 },
    { name: 'Lisa Wang', role: 'Product Manager', company: 'Spotify', review: 'Career-changing courses. Worth every penny!', rating: 5 },
    { name: 'James Wilson', role: 'Data Analyst', company: 'Amazon', review: 'Practical skills that I use daily at work.', rating: 5 },
    { name: 'Sophie Brown', role: 'Marketing Manager', company: 'Meta', review: 'Excellent content and amazing community support.', rating: 5 },
    { name: 'Carlos Rodriguez', role: 'Cloud Architect', company: 'Google', review: 'Advanced courses that actually prepare you for real work.', rating: 5 },
    { name: 'Emma Davis', role: 'Frontend Developer', company: 'Microsoft', review: 'Interactive learning that keeps you engaged.', rating: 5 }
  ];

  const skillsMarquee = [
    { skill: 'React', level: 'Advanced', students: '25K+', icon: '⚛️' },
    { skill: 'Python', level: 'Expert', students: '40K+', icon: '🐍' },
    { skill: 'AWS', level: 'Professional', students: '18K+', icon: '☁️' },
    { skill: 'Machine Learning', level: 'Advanced', students: '15K+', icon: '🤖' },
    { skill: 'Node.js', level: 'Expert', students: '22K+', icon: '🟢' },
    { skill: 'Docker', level: 'Professional', students: '12K+', icon: '🐳' },
    { skill: 'Kubernetes', level: 'Advanced', students: '8K+', icon: '⚙️' },
    { skill: 'GraphQL', level: 'Intermediate', students: '10K+', icon: '📊' }
  ];
  
  const featuredCourses = [
    {
      id: 1,
      title: 'Full-Stack Web Development Bootcamp',
      description: 'Master front-end and back-end technologies to build complete web applications',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
      instructor: 'Alex Johnson',
      rating: 4.9,
      students: 12453,
      price: 129.99,
      duration: '12 weeks',
      level: 'Intermediate',
      tags: ['JavaScript', 'React', 'Node.js', 'MongoDB']
    },
    {
      id: 2,
      title: 'Data Science & Machine Learning',
      description: 'Learn to analyze data and build predictive models with Python and TensorFlow',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
      instructor: 'Maria Rodriguez',
      rating: 4.8,
      students: 9872,
      price: 149.99,
      duration: '10 weeks',
      level: 'Advanced',
      tags: ['Python', 'TensorFlow', 'Data Analysis', 'AI']
    },
    {
      id: 3,
      title: 'UI/UX Design Masterclass',
      description: 'Create beautiful, user-friendly interfaces that drive engagement and conversions',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5',
      instructor: 'David Chen',
      rating: 4.9,
      students: 7845,
      price: 99.99,
      duration: '8 weeks',
      level: 'Beginner to Advanced',
      tags: ['Figma', 'Design Systems', 'User Research', 'Prototyping']
    },
    {
      id: 4,
      title: 'Cloud Architecture with AWS',
      description: 'Design and implement scalable, secure cloud solutions on Amazon Web Services',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa',
      instructor: 'Sarah Williams',
      rating: 4.7,
      students: 6321,
      price: 159.99,
      duration: '9 weeks',
      level: 'Advanced',
      tags: ['AWS', 'DevOps', 'Serverless', 'Microservices']
    }
  ];

  return (
    <div className="landing-page" style={{
      background: theme === 'dark' ? '#0a0a0a' : '#ffffff',
      color: theme === 'dark' ? '#ffffff' : '#000000',
      minHeight: '100vh',
      overflow: 'hidden'
    }}>
      {/* Animated Background */}
      <div className="animated-bg" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        background: theme === 'dark'
          ? `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(231, 111, 81, 0.1) 0%, transparent 50%)`
          : `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(244, 162, 97, 0.05) 0%, transparent 50%)`,
        transition: 'background 0.3s ease'
      }} />

      {/* Floating Particles */}
      <div className="particles" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              position: 'absolute',
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
              borderRadius: '50%',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
              animationDelay: Math.random() * 5 + 's'
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: theme === 'dark'
          ? 'rgba(10, 10, 10, 0.9)'
          : 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
        padding: '16px 0',
        transition: 'all 0.3s ease'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
          <Row justify="space-between" align="middle">
            <Col>
              <Logo size="large" showText={true} />
            </Col>
            <Col>
              <Menu
                mode="horizontal"
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: theme === 'dark' ? '#ffffff' : '#000000'
                }}
                items={[
                  { key: 'features', label: 'Features', onClick: () => scrollToSection('features') },
                  { key: 'courses', label: 'Courses', onClick: () => scrollToSection('courses') },
                  { key: 'testimonials', label: 'Reviews', onClick: () => scrollToSection('testimonials') }
                ]}
              />
            </Col>
            <Col>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <ThemeToggle />
                {isAuthenticated ? (
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <Link to="/dashboard">
                      <Button type="text" style={{ color: theme === 'dark' ? '#ffffff' : '#000000' }}>
                        Dashboard
                      </Button>
                    </Link>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 16px',
                      background: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                      borderRadius: '50px',
                      backdropFilter: 'blur(10px)'
                    }}>
                      <Avatar size="small" style={{ backgroundColor: '#E76F51' }}>
                        {user?.name?.charAt(0) || 'U'}
                      </Avatar>
                      <Text style={{ color: theme === 'dark' ? '#ffffff' : '#000000', fontWeight: '600' }}>
                        {user?.name || 'User'}
                      </Text>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <Link to="/login">
                      <Button type="text" style={{ color: theme === 'dark' ? '#ffffff' : '#000000' }}>
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/register">
                      <Button
                        type="primary"
                        style={{
                          background: 'linear-gradient(135deg, #E76F51, #F4A261)',
                          border: 'none',
                          borderRadius: '50px',
                          padding: '0 24px',
                          height: '40px',
                          fontWeight: '600',
                          boxShadow: '0 4px 20px rgba(231, 111, 81, 0.3)'
                        }}
                      >
                        Get Started
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </div>
      </header>

      {/* Hero Section */}
      <section
        ref={heroRef}
        id="hero"
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          paddingTop: '100px',
          overflow: 'hidden'
        }}
      >
        {/* Animated Gradient Orbs */}
        <div style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '400px',
          height: '400px',
          background: 'linear-gradient(45deg, #E76F51, #F4A261)',
          borderRadius: '50%',
          filter: 'blur(100px)',
          opacity: 0.3,
          animation: 'float 15s ease-in-out infinite'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '20%',
          left: '10%',
          width: '300px',
          height: '300px',
          background: 'linear-gradient(45deg, #2A9D8F, #264653)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          opacity: 0.3,
          animation: 'float 12s ease-in-out infinite reverse'
        }} />

        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          {/* Hero Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            background: theme === 'dark'
              ? 'linear-gradient(135deg, rgba(231, 111, 81, 0.2), rgba(244, 162, 97, 0.2))'
              : 'linear-gradient(135deg, rgba(231, 111, 81, 0.1), rgba(244, 162, 97, 0.1))',
            padding: '12px 24px',
            borderRadius: '50px',
            marginBottom: '32px',
            border: `1px solid ${theme === 'dark' ? 'rgba(231, 111, 81, 0.3)' : 'rgba(231, 111, 81, 0.2)'}`,
            backdropFilter: 'blur(20px)',
            animation: 'fadeIn 1s ease-out'
          }}>
            <RocketOutlined style={{ color: '#E76F51', fontSize: '20px' }} />
            <Text style={{
              color: '#E76F51',
              fontWeight: '600',
              fontSize: '16px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              #1 Learning Platform 2024
            </Text>
          </div>

          {/* Hero Title */}
          <div style={{ marginBottom: '32px' }}>
            <Title
              level={1}
              style={{
                fontSize: 'clamp(3rem, 8vw, 6rem)',
                fontWeight: '900',
                lineHeight: '1.1',
                marginBottom: '16px',
                background: 'linear-gradient(135deg, #E76F51, #F4A261, #2A9D8F)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'fadeIn 1s ease-out 0.2s both'
              }}
            >
              Transform Your
            </Title>
            <Title
              level={1}
              style={{
                fontSize: 'clamp(3rem, 8vw, 6rem)',
                fontWeight: '900',
                lineHeight: '1.1',
                color: theme === 'dark' ? '#ffffff' : '#000000',
                animation: 'fadeIn 1s ease-out 0.4s both'
              }}
            >
              Career Today
            </Title>
          </div>

          {/* Hero Subtitle */}
          <Paragraph style={{
            fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
            color: theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.7)',
            maxWidth: '700px',
            margin: '0 auto 48px',
            lineHeight: '1.6',
            animation: 'fadeIn 1s ease-out 0.6s both'
          }}>
            Join over 100,000 professionals who've accelerated their careers with our
            world-class training programs. Learn from industry experts and land your dream job.
          </Paragraph>

          {/* Hero CTAs */}
          <div style={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            marginBottom: '80px',
            flexWrap: 'wrap',
            animation: 'fadeIn 1s ease-out 0.8s both'
          }}>
            <Link to="/register">
              <Button
                type="primary"
                size="large"
                style={{
                  height: '60px',
                  padding: '0 40px',
                  fontSize: '18px',
                  fontWeight: '700',
                  background: 'linear-gradient(135deg, #E76F51, #F4A261)',
                  border: 'none',
                  borderRadius: '50px',
                  boxShadow: '0 8px 30px rgba(231, 111, 81, 0.4)',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                className="hero-cta-primary liquid-btn breathing-cta"
              >
                Start Learning Free <ArrowRightOutlined />
              </Button>
            </Link>
            <Button
              size="large"
              style={{
                height: '60px',
                padding: '0 40px',
                fontSize: '18px',
                fontWeight: '600',
                background: 'transparent',
                border: `2px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'}`,
                color: theme === 'dark' ? '#ffffff' : '#000000',
                borderRadius: '50px',
                backdropFilter: 'blur(20px)',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
              className="hero-cta-secondary magnetic-enhanced ripple-effect"
              onClick={() => scrollToSection('features')}
            >
              <PlayCircleOutlined /> Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '32px',
            maxWidth: '800px',
            margin: '0 auto',
            animation: 'fadeIn 1s ease-out 1s both'
          }}>
            {[
              { number: '100K+', label: 'Students Worldwide', icon: '👥' },
              { number: '500+', label: 'Expert Courses', icon: '📚' },
              { number: '98%', label: 'Success Rate', icon: '🎯' },
              { number: '50+', label: 'Industry Partners', icon: '🤝' }
            ].map((stat, index) => (
              <div key={index} style={{
                textAlign: 'center',
                padding: '24px',
                background: theme === 'dark'
                  ? 'rgba(255, 255, 255, 0.05)'
                  : 'rgba(0, 0, 0, 0.05)',
                borderRadius: '20px',
                backdropFilter: 'blur(20px)',
                border: `1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                transition: 'transform 0.3s ease',
                cursor: 'pointer'
              }}
                className="stat-card"
              >
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>{stat.icon}</div>
                <Title level={3} style={{
                  color: '#E76F51',
                  margin: '0 0 8px 0',
                  fontSize: '2rem',
                  fontWeight: '800'
                }}>
                  {stat.number}
                </Title>
                <Text style={{
                  color: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                  fontSize: '16px',
                  fontWeight: '500'
                }}>
                  {stat.label}
                </Text>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            cursor: 'pointer',
            animation: 'bounce 2s infinite'
          }}
          onClick={() => scrollToSection('marquee')}
        >
          <DownOutlined style={{
            fontSize: '24px',
            color: theme === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)'
          }} />
        </div>
      </section>

      {/* Marquee Section */}
      <section id="marquee" style={{
        padding: '60px 0',
        background: theme === 'dark'
          ? 'linear-gradient(135deg, #1a1a1a, #2a2a2a)'
          : 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <div className="marquee-container" style={{
          display: 'flex',
          animation: 'marquee 30s linear infinite',
          gap: '60px'
        }}>
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              whiteSpace: 'nowrap',
              fontSize: '24px',
              fontWeight: '700',
              color: theme === 'dark' ? '#ffffff' : '#000000'
            }}>
              <span style={{ fontSize: '32px' }}>{item.icon}</span>
              {item.text}
            </div>
          ))}
        </div>
      </section>

      {/* Companies Section */}
      <section style={{
        padding: '80px 0',
        textAlign: 'center',
        background: theme === 'dark' ? '#0a0a0a' : '#ffffff'
      }}>
        <Text style={{
          fontSize: '18px',
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
          marginBottom: '40px',
          display: 'block',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          fontWeight: '600'
        }}>
          Trusted by professionals at
        </Text>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '60px',
          flexWrap: 'wrap',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px'
        }}>
          {companies.map((company, index) => (
            <div key={index} style={{
              fontSize: '28px',
              fontWeight: '800',
              color: theme === 'dark' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)',
              transition: 'color 0.3s ease',
              cursor: 'pointer'
            }}
              className="company-logo"
            >
              {company}
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{
        padding: '120px 0',
        background: theme === 'dark'
          ? 'linear-gradient(135deg, #1a1a1a, #0a0a0a)'
          : 'linear-gradient(135deg, #f8f9fa, #ffffff)',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <Title level={2} style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: '900',
              marginBottom: '24px',
              background: 'linear-gradient(135deg, #E76F51, #F4A261)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Why Choose LearnHub?
            </Title>
            <Paragraph style={{
              fontSize: '20px',
              color: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Experience the difference with our cutting-edge learning platform
            </Paragraph>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '32px'
          }}>
            {features.map((feature, index) => (
              <Card
                key={index}
                style={{
                  background: theme === 'dark'
                    ? 'rgba(255, 255, 255, 0.05)'
                    : 'rgba(255, 255, 255, 0.8)',
                  border: `1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                  borderRadius: '24px',
                  backdropFilter: 'blur(20px)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  animation: `fadeIn 0.8s ease-out ${feature.delay} both`
                }}
                className="feature-card-modern"
                bodyStyle={{ padding: '40px' }}
              >
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '20px',
                  background: `linear-gradient(135deg, ${feature.color}, ${feature.color}aa)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '24px',
                  fontSize: '32px',
                  color: '#ffffff'
                }}>
                  {feature.icon}
                </div>
                <Title level={4} style={{
                  color: theme === 'dark' ? '#ffffff' : '#000000',
                  marginBottom: '16px',
                  fontSize: '24px',
                  fontWeight: '700'
                }}>
                  {feature.title}
                </Title>
                <Paragraph style={{
                  color: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                  fontSize: '16px',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  {feature.description}
                </Paragraph>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* BULLETPROOF Reviews Marquee SSection */}
      <section style={{
        padding: '120px 0',
        background: theme === 'dark'
          ? 'radial-gradient(ellipse at center, #2a2a2a 0%, #1a1a1a 100%)'
          : 'radial-gradient(ellipse at center, #f8f9fa 0%, #e9ecef 100%)',
        overflow: 'hidden',
        position: 'relative'
      }}>
        {/* Morphing Background Blobs */}
        <div className="morphing-blob" style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '300px',
          height: '300px',
          background: theme === 'dark'
            ? 'linear-gradient(45deg, rgba(231, 111, 81, 0.1), rgba(244, 162, 97, 0.1))'
            : 'linear-gradient(45deg, rgba(231, 111, 81, 0.05), rgba(244, 162, 97, 0.05))',
          filter: 'blur(40px)',
          zIndex: 0
        }} />
        <div className="morphing-blob" style={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: '250px',
          height: '250px',
          background: theme === 'dark'
            ? 'linear-gradient(45deg, rgba(42, 157, 143, 0.1), rgba(38, 70, 83, 0.1))'
            : 'linear-gradient(45deg, rgba(42, 157, 143, 0.05), rgba(38, 70, 83, 0.05))',
          filter: 'blur(40px)',
          zIndex: 0,
          animationDelay: '10s'
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <div style={{
              display: 'inline-block',
              padding: '8px 24px',
              background: theme === 'dark'
                ? 'rgba(231, 111, 81, 0.1)'
                : 'rgba(231, 111, 81, 0.05)',
              borderRadius: '50px',
              border: `1px solid ${theme === 'dark' ? 'rgba(231, 111, 81, 0.3)' : 'rgba(231, 111, 81, 0.2)'}`,
              marginBottom: '24px',
              backdropFilter: 'blur(10px)'
            }}>
              <Text style={{
                color: '#E76F51',
                fontWeight: '600',
                fontSize: '14px',
                textTransform: 'uppercase',
                letterSpacing: '2px'
              }}>
                ✨ Student Success Stories
              </Text>
            </div>

            <Title level={2} className="holographic-text" style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: '900',
              marginBottom: '24px',
              lineHeight: '1.2'
            }}>
              Transforming Careers Daily
            </Title>

            <Paragraph style={{
              fontSize: '18px',
              color: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
              maxWidth: '600px',
              margin: '0 auto 16px',
              lineHeight: '1.6'
            }}>
              Real stories from real students who've accelerated their careers with LearnHub
            </Paragraph>

            <Text style={{
              fontSize: '14px',
              color: theme === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              fontWeight: '500'
            }}>
              🎯 Hover any card to pause and read
            </Text>
          </div>

          {/* BULLETPROOF Reviews Marquee - GUARANTEED TO PAUSE ON HOVER */}
          <div className="reviews-marquee-wrapper" style={{ marginBottom: '60px', position: 'relative' }}>
            {/* Pause Indicator */}
            <div className="marquee-pause-indicator">
              ⏸️ PAUSED - Hover to read
            </div>
            <div className="reviews-marquee-track">
              {[...reviewsMarquee, ...reviewsMarquee, ...reviewsMarquee].map((review, index) => (
                <div
                  key={index}
                  className="review-card-enhanced neo-card glass-ultra neon-card"
                  style={{
                    padding: '32px',
                    borderRadius: '24px',
                    background: theme === 'dark'
                      ? 'rgba(255, 255, 255, 0.05)'
                      : 'rgba(255, 255, 255, 0.8)',
                    border: `1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  {/* Floating Rating Stars */}
                  <div style={{
                    marginBottom: '20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <Rate
                      disabled
                      defaultValue={review.rating}
                      style={{
                        color: '#FFB800',
                        fontSize: '18px'
                      }}
                    />
                    <div style={{
                      background: 'linear-gradient(135deg, #E76F51, #F4A261)',
                      borderRadius: '50px',
                      padding: '4px 12px',
                      fontSize: '12px',
                      color: 'white',
                      fontWeight: '600'
                    }}>
                      Verified
                    </div>
                  </div>

                  <Paragraph style={{
                    fontSize: '18px',
                    color: theme === 'dark' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.9)',
                    lineHeight: '1.6',
                    marginBottom: '24px',
                    fontStyle: 'italic',
                    fontWeight: '400'
                  }}>
                    "{review.review}"
                  </Paragraph>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ position: 'relative' }}>
                      <Avatar size={50} style={{
                        background: 'linear-gradient(135deg, #E76F51, #F4A261)',
                        fontSize: '18px',
                        fontWeight: '700',
                        border: '3px solid rgba(231, 111, 81, 0.2)'
                      }}>
                        {review.name.split(' ').map(n => n[0]).join('')}
                      </Avatar>
                      <div style={{
                        position: 'absolute',
                        bottom: -2,
                        right: -2,
                        width: '16px',
                        height: '16px',
                        background: '#00D084',
                        borderRadius: '50%',
                        border: '2px solid white'
                      }} />
                    </div>
                    <div>
                      <Text style={{
                        color: theme === 'dark' ? '#ffffff' : '#000000',
                        fontWeight: '700',
                        fontSize: '16px',
                        display: 'block',
                        marginBottom: '4px'
                      }}>
                        {review.name}
                      </Text>
                      <Text style={{
                        color: '#E76F51',
                        fontSize: '14px',
                        fontWeight: '600',
                        display: 'block'
                      }}>
                        {review.role}
                      </Text>
                      <Text style={{
                        color: theme === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
                        fontSize: '12px'
                      }}>
                        @ {review.company}
                      </Text>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BULLETPROOF Skills Marquee - REVERSE DIRECTION */}
          <div className="skills-marquee-wrapper" style={{ position: 'relative' }}>
            {/* Pause Indicator */}
            <div className="marquee-pause-indicator">
              ⏸️ PAUSED - Hover to read
            </div>
            <div className="skills-marquee-track">
              {[...skillsMarquee, ...skillsMarquee, ...skillsMarquee].map((skill, index) => (
                <div
                  key={index}
                  className="skill-card-enhanced tilt-3d magnetic-enhanced"
                  style={{
                    background: theme === 'dark'
                      ? 'linear-gradient(135deg, rgba(231, 111, 81, 0.15), rgba(244, 162, 97, 0.15))'
                      : 'linear-gradient(135deg, rgba(231, 111, 81, 0.08), rgba(244, 162, 97, 0.08))',
                    borderRadius: '20px',
                    padding: '24px',
                    border: `2px solid ${theme === 'dark' ? 'rgba(231, 111, 81, 0.3)' : 'rgba(231, 111, 81, 0.2)'}`,
                    backdropFilter: 'blur(25px)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* Skill Icon with Glow */}
                  <div style={{
                    fontSize: '40px',
                    width: '70px',
                    height: '70px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: theme === 'dark'
                      ? 'rgba(255, 255, 255, 0.1)'
                      : 'rgba(0, 0, 0, 0.1)',
                    borderRadius: '16px',
                    position: 'relative',
                    boxShadow: '0 8px 32px rgba(231, 111, 81, 0.2)'
                  }}>
                    {skill.icon}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '16px',
                      background: 'linear-gradient(45deg, transparent, rgba(231, 111, 81, 0.1), transparent)',
                      animation: 'shimmer 2s infinite'
                    }} />
                  </div>

                  <div style={{ flex: 1 }}>
                    <Text style={{
                      color: theme === 'dark' ? '#ffffff' : '#000000',
                      fontWeight: '800',
                      fontSize: '20px',
                      display: 'block',
                      marginBottom: '4px'
                    }}>
                      {skill.skill}
                    </Text>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <Text style={{
                        color: '#E76F51',
                        fontSize: '14px',
                        fontWeight: '600',
                        background: 'rgba(231, 111, 81, 0.1)',
                        padding: '2px 8px',
                        borderRadius: '12px'
                      }}>
                        {skill.level}
                      </Text>
                      <Text style={{
                        color: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                        fontSize: '14px',
                        fontWeight: '500'
                      }}>
                        {skill.students} students
                      </Text>
                    </div>
                  </div>

                  {/* Progress Indicator */}
                  <div style={{
                    width: '4px',
                    height: '60px',
                    background: 'linear-gradient(to bottom, #E76F51, #F4A261)',
                    borderRadius: '2px',
                    position: 'relative'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '80%',
                      background: 'linear-gradient(to bottom, #E76F51, transparent)',
                      borderRadius: '2px',
                      animation: 'pulse 2s infinite'
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" style={{
        padding: '120px 0',
        background: theme === 'dark' ? '#0a0a0a' : '#ffffff',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <Title level={2} style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: '900',
              marginBottom: '24px',
              color: theme === 'dark' ? '#ffffff' : '#000000'
            }}>
              Success Stories
            </Title>
            <Paragraph style={{
              fontSize: '20px',
              color: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              See how our students transformed their careers
            </Paragraph>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '32px'
          }}>
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                style={{
                  background: theme === 'dark'
                    ? 'linear-gradient(135deg, rgba(231, 111, 81, 0.1), rgba(244, 162, 97, 0.1))'
                    : 'linear-gradient(135deg, rgba(231, 111, 81, 0.05), rgba(244, 162, 97, 0.05))',
                  border: `1px solid ${theme === 'dark' ? 'rgba(231, 111, 81, 0.2)' : 'rgba(231, 111, 81, 0.1)'}`,
                  borderRadius: '24px',
                  backdropFilter: 'blur(20px)',
                  transition: 'transform 0.3s ease',
                  cursor: 'pointer',
                  animation: `fadeIn 0.8s ease-out ${index * 0.2}s both`
                }}
                className="testimonial-card"
                bodyStyle={{ padding: '40px' }}
              >
                <div style={{ marginBottom: '24px' }}>
                  <Rate disabled defaultValue={testimonial.rating} style={{ color: '#FFB800' }} />
                </div>
                <Paragraph style={{
                  fontSize: '18px',
                  color: theme === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
                  lineHeight: '1.6',
                  marginBottom: '32px',
                  fontStyle: 'italic'
                }}>
                  "{testimonial.content}"
                </Paragraph>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <Avatar size={60} style={{
                    backgroundColor: '#E76F51',
                    fontSize: '24px',
                    fontWeight: '700'
                  }}>
                    {testimonial.avatar}
                  </Avatar>
                  <div>
                    <Title level={5} style={{
                      color: theme === 'dark' ? '#ffffff' : '#000000',
                      margin: '0 0 4px 0',
                      fontSize: '18px',
                      fontWeight: '700'
                    }}>
                      {testimonial.name}
                    </Title>
                    <Text style={{
                      color: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                      fontSize: '14px'
                    }}>
                      {testimonial.role} at {testimonial.company}
                    </Text>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '120px 0',
        background: theme === 'dark'
          ? 'linear-gradient(135deg, #E76F51, #F4A261)'
          : 'linear-gradient(135deg, #E76F51, #F4A261)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)`,
          zIndex: 1
        }} />

        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2 }}>
          <Title level={2} style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: '900',
            color: '#ffffff',
            marginBottom: '24px'
          }}>
            Ready to Transform Your Career?
          </Title>
          <Paragraph style={{
            fontSize: '20px',
            color: 'rgba(255, 255, 255, 0.9)',
            marginBottom: '48px',
            lineHeight: '1.6'
          }}>
            Join thousands of professionals who've already started their journey to success.
            Your dream career is just one click away.
          </Paragraph>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register">
              <Button
                type="primary"
                size="large"
                style={{
                  height: '60px',
                  padding: '0 40px',
                  fontSize: '18px',
                  fontWeight: '700',
                  background: '#ffffff',
                  color: '#E76F51',
                  border: 'none',
                  borderRadius: '50px',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
                  transition: 'all 0.3s ease'
                }}
                className="cta-button-white"
              >
                Start Your Journey Now
              </Button>
            </Link>
            <Button
              size="large"
              style={{
                height: '60px',
                padding: '0 40px',
                fontSize: '18px',
                fontWeight: '600',
                background: 'transparent',
                color: '#ffffff',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '50px',
                backdropFilter: 'blur(20px)',
                transition: 'all 0.3s ease'
              }}
              className="cta-button-outline"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '60px 0 40px',
        background: theme === 'dark' ? '#0a0a0a' : '#f8f9fa',
        borderTop: `1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <Logo size="large" showText={true} />
            <Paragraph style={{
              color: theme === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
              marginTop: '16px',
              fontSize: '16px'
            }}>
              Empowering careers through world-class education
            </Paragraph>
          </div>
          <div style={{
            textAlign: 'center',
            paddingTop: '40px',
            borderTop: `1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`
          }}>
            <Text style={{
              color: theme === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
              fontSize: '14px'
            }}>
              © 2024 LearnHub. All rights reserved.
            </Text>
          </div>
        </div>
      </footer>

      {/* Scroll Progress Bar */}
      <div className="scroll-progress">
        <div
          className="scroll-progress-bar"
          style={{
            width: `${(scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100}%`
          }}
        />
      </div>

      {/* Floating Action Button */}
      <div
        className="floating-action custom-tooltip"
        data-tooltip="Back to Top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{
          opacity: scrollY > 500 ? 1 : 0,
          visibility: scrollY > 500 ? 'visible' : 'hidden'
        }}
      >
        <ArrowRightOutlined style={{ transform: 'rotate(-90deg)' }} />
      </div>

      {/* Notification Badge for New Features */}
      {!isAuthenticated && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            right: '20px',
            transform: 'translateY(-50%)',
            background: theme === 'dark'
              ? 'rgba(255, 255, 255, 0.1)'
              : 'rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '50px',
            padding: '16px',
            border: `1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'}`,
            zIndex: 999,
            animation: 'float 3s ease-in-out infinite'
          }}
          className="side-cta"
        >
          <div style={{ position: 'relative' }}>
            <Link to="/register">
              <Button
                type="primary"
                style={{
                  background: 'linear-gradient(135deg, #E76F51, #F4A261)',
                  border: 'none',
                  borderRadius: '50px',
                  padding: '0 20px',
                  height: '40px',
                  fontWeight: '600',
                  boxShadow: '0 4px 20px rgba(231, 111, 81, 0.3)'
                }}
              >
                Join Now
              </Button>
            </Link>
            <div className="notification-badge">
              <FireOutlined style={{ fontSize: '10px' }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;