import React, { useState, useEffect } from 'react';
import {
    Card,
    Row,
    Col,
    Avatar,
    Typography,
    Button,
    Rate,
    Tag,
    Input,
    Select,
    Space,
    Statistic,
    List,
    Badge,
    Spin,
    message
} from 'antd';
import {
    SearchOutlined,
    UserOutlined,
    BookOutlined,
    StarOutlined,
    TeamOutlined,
    FilterOutlined,
    EyeOutlined,
    MessageOutlined,
    PlusOutlined
} from '@ant-design/icons';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const Trainers = () => {
    const { isDark } = useTheme();
    const { user } = useAuth();
    const [searchText, setSearchText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('rating');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Real data states
    const [trainersData, setTrainersData] = useState([]);

    // Fetch trainers data
    useEffect(() => {
        const fetchTrainers = async () => {
            setLoading(true);
            setError(null);
            
            try {
                const response = await api.routes.users.getByRole('trainer');
                const trainers = response.data || [];
                
                // Transform API data to match our component structure
                const transformedTrainers = await Promise.all(trainers.map(async (trainer) => {
                    try {
                        // Fetch trainer's courses and stats
                        const coursesResponse = await api.routes.trainings.getAll();
                        const allCourses = coursesResponse.data || [];
                        const trainerCourses = allCourses.filter(course => course.trainer_id === trainer.id);
                        
                        // Calculate stats
                        const totalStudents = trainerCourses.reduce((sum, course) => sum + (course.enrolled_count || 0), 0);
                        const totalHours = trainerCourses.reduce((sum, course) => sum + (course.duration_hours || 0), 0);
                        const avgRating = trainerCourses.length > 0 
                            ? trainerCourses.reduce((sum, course) => sum + (course.rating || 0), 0) / trainerCourses.length 
                            : 0;
                        
                        return {
                            id: trainer.id,
                            name: trainer.name,
                            title: trainer.title || 'Trainer',
                            company: trainer.company || '',
                            avatar: getRandomAvatar(),
                            bio: trainer.bio || 'Passionate educator dedicated to sharing knowledge.',
                            rating: parseFloat(avgRating.toFixed(1)),
                            totalStudents: totalStudents,
                            totalCourses: trainerCourses.length,
                            categories: getTrainerCategories(trainerCourses),
                            status: trainer.status || 'Active',
                            joinedDate: new Date(trainer.created_at).toLocaleDateString(),
                            totalHours: totalHours,
                            expertise: calculateExpertise(trainerCourses.length, totalHours),
                            location: trainer.location || 'Remote',
                            languages: trainer.languages ? trainer.languages.split(',') : ['English']
                        };
                    } catch (err) {
                        console.error(`Error processing trainer ${trainer.id}:`, err);
                        return {
                            id: trainer.id,
                            name: trainer.name,
                            title: trainer.title || 'Trainer',
                            company: trainer.company || '',
                            avatar: getRandomAvatar(),
                            bio: trainer.bio || 'Passionate educator dedicated to sharing knowledge.',
                            rating: 4.5,
                            totalStudents: 0,
                            totalCourses: 0,
                            categories: ['General'],
                            status: 'Active',
                            joinedDate: new Date(trainer.created_at).toLocaleDateString(),
                            totalHours: 0,
                            expertise: 'Beginner',
                            location: 'Remote',
                            languages: ['English']
                        };
                    }
                }));
                
                setTrainersData(transformedTrainers);
            } catch (err) {
                console.error('Error fetching trainers:', err);
                setError('Failed to load trainers data');
                
                // Fallback to sample data if API fails
                setTrainersData([
                    {
                        id: 1,
                        name: 'Sarah Johnson',
                        title: 'Senior Frontend Developer',
                        company: 'TechCorp Inc.',
                        avatar: '👩‍💻',
                        bio: 'Passionate React developer with 8+ years of experience. Love teaching and sharing knowledge with the community.',
                        rating: 4.9,
                        totalStudents: 15420,
                        totalCourses: 12,
                        categories: ['Web Development', 'React', 'JavaScript'],
                        status: 'Active',
                        joinedDate: '2022-01-15',
                        totalHours: 240,
                        expertise: 'Advanced',
                        location: 'San Francisco, CA',
                        languages: ['English', 'Spanish']
                    },
                    {
                        id: 2,
                        name: 'Dr. Michael Chen',
                        title: 'AI Research Scientist',
                        company: 'AI Labs',
                        avatar: '👨‍🔬',
                        bio: 'PhD in Computer Science specializing in Machine Learning and AI. Published researcher with 10+ years in academia.',
                        rating: 4.8,
                        totalStudents: 8920,
                        totalCourses: 8,
                        categories: ['Data Science', 'Machine Learning', 'Python'],
                        status: 'Active',
                        joinedDate: '2021-09-20',
                        totalHours: 180,
                        expertise: 'Expert',
                        location: 'Boston, MA',
                        languages: ['English', 'Mandarin']
                    }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchTrainers();
    }, []);

    // Helper functions
    const getRandomAvatar = () => {
        const avatars = ['👩‍💻', '👨‍💻', '👩‍🔬', '👨‍🔬', '👩‍🎨', '👨‍🎨', '👩‍💼', '👨‍💼'];
        return avatars[Math.floor(Math.random() * avatars.length)];
    };

    const getTrainerCategories = (courses) => {
        const categories = courses.map(course => course.category || course.subject).filter(Boolean);
        return [...new Set(categories)].slice(0, 3); // Get unique categories, max 3
    };

    const calculateExpertise = (coursesCount, totalHours) => {
        if (coursesCount >= 15 || totalHours >= 200) return 'Expert';
        if (coursesCount >= 10 || totalHours >= 100) return 'Advanced';
        if (coursesCount >= 5 || totalHours >= 50) return 'Intermediate';
        return 'Beginner';
    };

    const getCategoryColor = (category) => {
        const categoryColors = {
            'Web Development': 'bg-terracotta-100 dark:bg-terracotta-900 text-terracotta-700 dark:text-terracotta-300',
            'Data Science': 'bg-sage-100 dark:bg-sage-900 text-sage-700 dark:text-sage-300',
            'Design': 'bg-mustard-100 dark:bg-mustard-900 text-mustard-700 dark:text-mustard-300',
            'Blockchain': 'bg-olive-100 dark:bg-olive-900 text-olive-700 dark:text-olive-300',
            'React': 'bg-terracotta-100 dark:bg-terracotta-900 text-terracotta-700 dark:text-terracotta-300',
            'Machine Learning': 'bg-sage-100 dark:bg-sage-900 text-sage-700 dark:text-sage-300',
            'UX/UI': 'bg-mustard-100 dark:bg-mustard-900 text-mustard-700 dark:text-mustard-300',
        };
        return categoryColors[category] || 'bg-warm-100 dark:bg-warm-800 text-warm-600 dark:text-warm-300';
    };

    const getExpertiseColor = (expertise) => {
        const expertiseColors = {
            'Beginner': 'bg-olive-100 dark:bg-olive-900 text-olive-700 dark:text-olive-300',
            'Intermediate': 'bg-saffron-100 dark:bg-saffron-900 text-saffron-700 dark:text-saffron-300',
            'Advanced': 'bg-rust-100 dark:bg-rust-900 text-rust-700 dark:text-rust-300',
            'Expert': 'bg-terracotta-100 dark:bg-terracotta-900 text-terracotta-700 dark:text-terracotta-300',
        };
        return expertiseColors[expertise] || 'bg-warm-100 dark:bg-warm-800 text-warm-600 dark:text-warm-300';
    };

    const filteredTrainers = trainersData.filter(trainer => {
        const matchesSearch = trainer.name.toLowerCase().includes(searchText.toLowerCase()) ||
            trainer.title.toLowerCase().includes(searchText.toLowerCase()) ||
            trainer.categories.some(cat => cat.toLowerCase().includes(searchText.toLowerCase()));
        const matchesCategory = selectedCategory === 'all' ||
            trainer.categories.some(cat => cat.toLowerCase().includes(selectedCategory.toLowerCase()));
        return matchesSearch && matchesCategory;
    });

    const stats = {
        totalTrainers: trainersData.length,
        activeTrainers: trainersData.filter(t => t.status === 'Active').length,
        avgRating: (trainersData.reduce((acc, t) => acc + t.rating, 0) / trainersData.length).toFixed(1),
        totalStudents: trainersData.reduce((acc, t) => acc + t.totalStudents, 0)
    };

    return (
        <div className="min-h-screen bg-cream-100 dark:bg-charcoal-500 p-6 transition-colors duration-300">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Header */}
                <Card className="bg-white dark:bg-warm-900 border-warm-200 dark:border-warm-700">
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
                        <div>
                            <Title level={2} className="text-charcoal-500 dark:text-cream-100 mb-2">
                                <TeamOutlined className="text-terracotta-500 mr-3" />
                                Our Expert Trainers
                            </Title>
                            <Text className="text-warm-500 dark:text-warm-300">
                                Meet our world-class instructors who are passionate about teaching
                            </Text>
                        </div>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            size="large"
                            className="bg-terracotta-500 hover:bg-terracotta-600 border-terracotta-500"
                        >
                            Become a Trainer
                        </Button>
                    </div>
                </Card>

                {/* Stats Overview */}
                <Row gutter={[24, 24]}>
                    <Col xs={24} sm={12} lg={6}>
                        <Card className="bg-terracotta-50 dark:bg-terracotta-900 border-terracotta-200 dark:border-terracotta-700 text-center">
                            <Statistic
                                title={<span className="text-warm-500 dark:text-warm-300">Total Trainers</span>}
                                value={stats.totalTrainers}
                                prefix={<TeamOutlined className="text-terracotta-500" />}
                                valueStyle={{ color: '#E76F51' }}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Card className="bg-olive-50 dark:bg-olive-900 border-olive-200 dark:border-olive-700 text-center">
                            <Statistic
                                title={<span className="text-warm-500 dark:text-warm-300">Active Trainers</span>}
                                value={stats.activeTrainers}
                                prefix={<UserOutlined className="text-olive-500" />}
                                valueStyle={{ color: '#6A994E' }}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Card className="bg-sage-50 dark:bg-sage-900 border-sage-200 dark:border-sage-700 text-center">
                            <Statistic
                                title={<span className="text-warm-500 dark:text-warm-300">Average Rating</span>}
                                value={stats.avgRating}
                                prefix={<StarOutlined className="text-sage-500" />}
                                valueStyle={{ color: '#2A9D8F' }}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Card className="bg-mustard-50 dark:bg-mustard-900 border-mustard-200 dark:border-mustard-700 text-center">
                            <Statistic
                                title={<span className="text-warm-500 dark:text-warm-300">Total Students</span>}
                                value={stats.totalStudents}
                                prefix={<BookOutlined className="text-mustard-500" />}
                                valueStyle={{ color: '#F4A261' }}
                            />
                        </Card>
                    </Col>
                </Row>

                {/* Search and Filters */}
                <Card className="bg-white dark:bg-warm-900 border-warm-200 dark:border-warm-700">
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={12} lg={8}>
                            <Input
                                placeholder="Search trainers..."
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
                                <Option value="web development">Web Development</Option>
                                <Option value="data science">Data Science</Option>
                                <Option value="design">Design</Option>
                                <Option value="blockchain">Blockchain</Option>
                            </Select>
                        </Col>
                        <Col xs={24} sm={12} lg={8}>
                            <Select
                                placeholder="Sort by"
                                value={sortBy}
                                onChange={setSortBy}
                                className="w-full h-10"
                            >
                                <Option value="rating">Rating</Option>
                                <Option value="students">Students</Option>
                                <Option value="courses">Courses</Option>
                                <Option value="experience">Experience</Option>
                            </Select>
                        </Col>
                    </Row>
                </Card>

                {/* Trainers Grid */}
                <Row gutter={[24, 24]}>
                    {filteredTrainers.map((trainer) => (
                        <Col key={trainer.id} xs={24} sm={12} lg={8}>
                            <Card
                                className="bg-white dark:bg-warm-900 border-warm-200 dark:border-warm-700 hover:shadow-xl transition-all duration-300 h-full"
                                actions={[
                                    <Button
                                        type="text"
                                        icon={<EyeOutlined />}
                                        className="text-sage-500 hover:text-sage-600"
                                    >
                                        View Profile
                                    </Button>,
                                    <Button
                                        type="text"
                                        icon={<MessageOutlined />}
                                        className="text-mustard-500 hover:text-mustard-600"
                                    >
                                        Contact
                                    </Button>
                                ]}
                            >
                                <div className="text-center space-y-4">
                                    <div className="relative">
                                        <div className="text-6xl mb-3">{trainer.avatar}</div>
                                        <Badge
                                            status="success"
                                            className="absolute top-0 right-1/4"
                                        />
                                    </div>

                                    <div>
                                        <Title level={4} className="text-charcoal-500 dark:text-cream-100 mb-1">
                                            {trainer.name}
                                        </Title>
                                        <Text className="text-sage-600 dark:text-sage-400 font-medium block">
                                            {trainer.title}
                                        </Text>
                                        <Text className="text-warm-500 dark:text-warm-300 text-sm">
                                            {trainer.company}
                                        </Text>
                                    </div>

                                    <div className="flex justify-center items-center gap-2">
                                        <Rate disabled value={trainer.rating} allowHalf className="text-sm" />
                                        <Text className="text-terracotta-500 font-semibold">
                                            {trainer.rating}
                                        </Text>
                                    </div>

                                    <Paragraph className="text-warm-600 dark:text-warm-300 text-sm text-center line-clamp-3">
                                        {trainer.bio}
                                    </Paragraph>

                                    <div className="space-y-3">
                                        <div className="flex justify-between text-sm">
                                            <div className="text-center">
                                                <div className="text-terracotta-500 font-semibold">
                                                    {trainer.totalStudents.toLocaleString()}
                                                </div>
                                                <div className="text-warm-500 dark:text-warm-300">Students</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-sage-500 font-semibold">
                                                    {trainer.totalCourses}
                                                </div>
                                                <div className="text-warm-500 dark:text-warm-300">Courses</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-mustard-500 font-semibold">
                                                    {trainer.totalHours}h
                                                </div>
                                                <div className="text-warm-500 dark:text-warm-300">Content</div>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-1 justify-center">
                                            {trainer.categories.slice(0, 3).map((category) => (
                                                <Tag
                                                    key={category}
                                                    className={`border-0 text-xs ${getCategoryColor(category)}`}
                                                >
                                                    {category}
                                                </Tag>
                                            ))}
                                        </div>

                                        <div className="flex justify-center">
                                            <Tag className={`border-0 ${getExpertiseColor(trainer.expertise)}`}>
                                                {trainer.expertise}
                                            </Tag>
                                        </div>

                                        <div className="text-center text-xs text-warm-500 dark:text-warm-300">
                                            📍 {trainer.location} • 🗣️ {trainer.languages.join(', ')}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>

                {/* Call to Action */}
                <Card className="bg-gradient-to-r from-terracotta-500 to-sage-500 border-0 text-white text-center">
                    <div className="py-8">
                        <Title level={2} className="text-white mb-4">
                            Want to Join Our Team?
                        </Title>
                        <Text className="text-white/90 text-lg mb-6 block">
                            Share your expertise with thousands of eager learners worldwide
                        </Text>
                        <Button
                            type="primary"
                            size="large"
                            className="bg-white text-terracotta-500 border-white hover:bg-cream-100 hover:border-cream-100 px-8"
                        >
                            Apply to Become a Trainer
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Trainers;
