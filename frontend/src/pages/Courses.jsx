import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
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
    Col,
    Avatar
} from 'antd';
import {
    SearchOutlined,
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    EyeOutlined,
    UserOutlined,
    ClockCircleOutlined,
    FilterOutlined,
    BookOutlined,
    StarOutlined,
    PlayCircleOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const Courses = () => {
    const { user } = useAuth();
    const { isDark } = useTheme();
    const navigate = useNavigate();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedLevel, setSelectedLevel] = useState('all');

    const [courses, setCourses] = useState([]);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [fetching, setFetching] = useState(true);
    const [fetchError, setFetchError] = useState(null);

    // Function to generate AI-powered course thumbnails
    const generateAIThumbnail = async (title, category, description = '') => {
        try {
            // Create a descriptive prompt for AI image generation
            const prompt = createImagePrompt(title, category, description);

            // Try multiple free AI services in order of preference
            return await tryMultipleAIServices(prompt, title, category);

        } catch (error) {
            console.error('Error generating AI thumbnail:', error);
            return generateFallbackImage(title, category);
        }
    };

    // Try multiple AI services with fallbacks (prioritizing realistic contextual images)
    const tryMultipleAIServices = async (prompt, title, category) => {
        const services = [
            () => generateWithUnsplash(prompt),    // Realistic contextual stock photos FIRST
            () => generateFallbackImage(title, category), // Beautiful generated images as backup
            () => generateWithPicsum(prompt),      // Decent fallback
            // () => generateWithHuggingFace(prompt), // AI disabled due to random results
        ];

        for (let i = 0; i < services.length; i++) {
            try {
                console.log(`Trying service ${i + 1}/${services.length}`);
                const result = await services[i]();
                if (result) {
                    console.log(`Successfully generated image with service ${i + 1}`);
                    return result;
                }
            } catch (error) {
                console.log(`Service ${i + 1} failed:`, error.message);
                continue;
            }
        }

        console.log('All services failed, using fallback');
        return generateFallbackImage(title, category);
    };


    const generateWithHuggingFace = async (prompt) => {
        const HF_API_KEY = process.env.REACT_APP_HUGGING_FACE_API_KEY;


        const optimizedPrompt = optimizePromptForAI(prompt);
        console.log('Optimized AI prompt:', optimizedPrompt);

        try {
            const response = await fetch(
                "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1",
                {
                    headers: {
                        Authorization: `Bearer ${HF_API_KEY}`,
                        "Content-Type": "application/json",
                    },
                    method: "POST",
                    body: JSON.stringify({
                        inputs: optimizedPrompt,
                        parameters: {
                            width: 512,
                            height: 320,
                            num_inference_steps: 30,
                            guidance_scale: 9.0,
                            negative_prompt: "blurry, dark, low quality, amateur, cluttered, text, watermark, random, abstract"
                        }
                    }),
                }
            );

            if (!response.ok) {
                const errorText = await response.text();
                console.log('Hugging Face error:', response.status, errorText);
                throw new Error(`Hugging Face API error: ${response.status}`);
            }

            const blob = await response.blob();

            // Validate that we got an actual image
            if (blob.type.startsWith('image/')) {
                return URL.createObjectURL(blob);
            } else {
                console.log('Invalid response type:', blob.type);
                throw new Error('Invalid image response from Hugging Face');
            }
        } catch (error) {
            console.log('Hugging Face generation failed:', error);
            throw error;
        }
    };

    // Optimize prompts for better AI generation results
    const optimizePromptForAI = (complexPrompt) => {
        // Extract the most important keywords from the complex prompt
        const keywords = complexPrompt
            .split(',')
            .slice(0, 6) // Take only first 6 keywords for better focus
            .map(k => k.trim())
            .filter(k => k.length > 0 && !k.includes('NOT'))
            .join(', ');

        return `${keywords}, professional course thumbnail, clean modern design, educational, high quality, well-lit, sharp focus`;
    };

    // Picsum with AI-like filtering (FREE)
    const generateWithPicsum = async (prompt) => {
        // Extract keywords for better image selection
        const keywords = prompt.split(',')[0].trim();
        const seed = Math.abs(hashCode(keywords)) % 1000;

        return `https://picsum.photos/seed/${seed}/400/240?blur=0&grayscale=0`;
    };

    // Unsplash (FREE with rate limits) - Improved contextual search
    const generateWithUnsplash = async (prompt) => {
        // Extract the most relevant keywords for Unsplash
        const keywords = extractKeywordsForUnsplash(prompt);
        console.log('Unsplash keywords:', keywords);
        return `https://source.unsplash.com/400x240/?${encodeURIComponent(keywords)}`;
    };

    // Extract better keywords for Unsplash based on course content
    const extractKeywordsForUnsplash = (prompt) => {
        const lowerPrompt = prompt.toLowerCase();

        // Technology-specific Unsplash keywords that work well
        const techKeywords = {
            'react': 'programming computer code javascript',
            'python': 'programming code computer data science',
            'javascript': 'programming computer code web development',
            'web development': 'computer programming code workspace',
            'design': 'graphic design creative workspace computer',
            'data science': 'data analytics computer charts graphs',
            'marketing': 'business marketing strategy office workspace',
            'mobile': 'mobile phone app development technology',
            'database': 'server computer technology data',
            'ai': 'artificial intelligence technology computer',
            'machine learning': 'computer technology data science',
            'cybersecurity': 'security computer technology network',
            'cloud': 'cloud computing technology server',
            'devops': 'computer server technology infrastructure'
        };

        // Find the best matching keyword
        for (const [tech, keywords] of Object.entries(techKeywords)) {
            if (lowerPrompt.includes(tech)) {
                return keywords;
            }
        }

        // Fallback to generic but relevant terms
        if (lowerPrompt.includes('programming') || lowerPrompt.includes('code')) {
            return 'programming computer code workspace';
        }
        if (lowerPrompt.includes('design')) {
            return 'design creative workspace computer';
        }
        if (lowerPrompt.includes('business') || lowerPrompt.includes('marketing')) {
            return 'business office workspace professional';
        }
        if (lowerPrompt.includes('data')) {
            return 'data analytics computer technology';
        }

        // Default fallback
        return 'education learning computer technology';
    };

    // Hash function for consistent seeds
    const hashCode = (str) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    };

    // Create descriptive prompts for better AI image generation
    // Create highly specific prompts based on course title and description
    const createImagePrompt = (title, category, description = '') => {
        const lowerTitle = title.toLowerCase();
        const lowerDesc = description.toLowerCase();
        const combinedText = `${lowerTitle} ${lowerDesc}`;

        // Technology-specific prompts with logos and visual elements
        const techPrompts = {
            // Frontend Technologies
            'react': 'React logo, JSX code, modern web development workspace, blue React atom symbol, component architecture, hooks, virtual DOM visualization',
            'vue': 'Vue.js logo, green Vue symbol, modern JavaScript framework, component-based architecture, progressive web app',
            'angular': 'Angular logo, red Angular shield, TypeScript code, modern web framework, component architecture',
            'javascript': 'JavaScript logo, JS yellow symbol, modern coding workspace, ES6+ syntax, web development',
            'typescript': 'TypeScript logo, blue TS symbol, typed JavaScript, modern development environment',
            'html': 'HTML5 logo, orange HTML symbol, web markup, semantic elements, modern web structure',
            'css': 'CSS3 logo, blue CSS symbol, stylesheets, responsive design, modern web styling',
            'sass': 'Sass logo, pink Sass symbol, CSS preprocessor, modern styling workflow',
            'tailwind': 'Tailwind CSS logo, utility-first CSS, modern responsive design, component styling',

            // Backend Technologies
            'node': 'Node.js logo, green Node symbol, server-side JavaScript, backend development, npm packages',
            'express': 'Express.js logo, minimalist web framework, Node.js backend, API development',
            'python': 'Python logo, blue and yellow Python symbol, clean code syntax, data science, web development',
            'django': 'Django logo, green Django symbol, Python web framework, rapid development',
            'flask': 'Flask logo, Python microframework, lightweight web development',
            'php': 'PHP logo, purple PHP elephant, server-side scripting, web development',
            'laravel': 'Laravel logo, red Laravel symbol, PHP framework, elegant web development',
            'java': 'Java logo, coffee cup symbol, enterprise development, object-oriented programming',
            'spring': 'Spring Framework logo, green Spring symbol, Java enterprise development',

            // Databases
            'mysql': 'MySQL logo, blue dolphin symbol, relational database, SQL queries',
            'postgresql': 'PostgreSQL logo, blue elephant symbol, advanced database system',
            'mongodb': 'MongoDB logo, green leaf symbol, NoSQL database, document storage',
            'redis': 'Redis logo, red Redis symbol, in-memory data structure, caching',

            // Cloud & DevOps
            'aws': 'AWS logo, orange Amazon Web Services symbol, cloud computing, scalable infrastructure',
            'azure': 'Microsoft Azure logo, blue cloud symbol, enterprise cloud services',
            'docker': 'Docker logo, blue whale symbol, containerization, microservices',
            'kubernetes': 'Kubernetes logo, blue ship wheel symbol, container orchestration',
            'git': 'Git logo, orange branching symbol, version control, collaborative development',
            'github': 'GitHub logo, black cat symbol, code repository, collaboration platform',

            // Design Tools
            'figma': 'Figma logo, colorful design tool interface, UI/UX design, collaborative design',
            'photoshop': 'Adobe Photoshop logo, blue Ps symbol, photo editing, digital art creation',
            'illustrator': 'Adobe Illustrator logo, orange Ai symbol, vector graphics, logo design',
            'sketch': 'Sketch logo, yellow diamond symbol, UI design, Mac design tool',
            'adobe': 'Adobe Creative Suite logos, creative design workspace, professional design tools',

            // Data Science & AI
            'tensorflow': 'TensorFlow logo, orange TF symbol, machine learning, neural networks, AI development',
            'pytorch': 'PyTorch logo, orange flame symbol, deep learning framework, AI research',
            'pandas': 'Pandas logo, Python data analysis, dataframes, data manipulation',
            'numpy': 'NumPy logo, blue scientific computing, mathematical operations, arrays',
            'jupyter': 'Jupyter logo, orange notebook interface, data science workflow, interactive computing',
            'tableau': 'Tableau logo, data visualization, business intelligence, interactive dashboards',
            'powerbi': 'Power BI logo, Microsoft business analytics, data visualization, reporting',

            // Mobile Development
            'flutter': 'Flutter logo, blue Flutter symbol, cross-platform mobile development, Dart language',
            'react native': 'React Native logo, mobile app development, cross-platform, JavaScript',
            'swift': 'Swift logo, orange Swift bird, iOS development, Apple programming language',
            'kotlin': 'Kotlin logo, purple Kotlin symbol, Android development, modern programming',
            'android': 'Android logo, green robot symbol, mobile app development, Google platform',
            'ios': 'iOS logo, Apple symbol, iPhone app development, mobile interface design',

            // Business & Marketing
            'seo': 'SEO symbols, search engine optimization, Google rankings, web traffic analytics',
            'google ads': 'Google Ads logo, PPC advertising, digital marketing campaigns, search marketing',
            'facebook ads': 'Facebook logo, social media advertising, targeted marketing campaigns',
            'analytics': 'Google Analytics logo, web analytics, data tracking, performance metrics',
            'shopify': 'Shopify logo, e-commerce platform, online store development, retail technology',
            'wordpress': 'WordPress logo, blue W symbol, content management, website building',

            // General Categories
            'blockchain': 'Blockchain visualization, cryptocurrency symbols, distributed ledger, decentralized technology',
            'cybersecurity': 'Security shield symbols, lock icons, network protection, ethical hacking',
            'devops': 'DevOps infinity symbol, CI/CD pipeline, automation tools, deployment workflow',
            'api': 'API documentation, REST endpoints, integration symbols, microservices architecture',
            'testing': 'Testing frameworks, bug tracking, quality assurance, automated testing tools',
            'agile': 'Agile methodology, scrum boards, sprint planning, team collaboration tools'
        };

        // Find matching technologies in title and description
        let specificPrompt = '';
        let foundTechs = [];

        for (const [tech, prompt] of Object.entries(techPrompts)) {
            if (combinedText.includes(tech)) {
                foundTechs.push(tech);
                specificPrompt += prompt + ', ';
            }
        }

        // Category-based base prompts
        const categoryPrompts = {
            'Web Development': 'modern coding workspace, multiple monitors, clean desk setup, programming environment, software development',
            'Design': 'creative design studio, design tools, color palettes, modern workspace, artistic environment',
            'Data Science': 'data visualization, charts and graphs, analytics dashboard, scientific computing, research environment',
            'Marketing': 'marketing strategy, business growth, digital campaigns, social media, professional business setting',
            'Mobile Development': 'mobile devices, app interfaces, responsive design, cross-platform development',
            'DevOps': 'server infrastructure, cloud computing, automation tools, deployment pipeline',
            'AI/Machine Learning': 'artificial intelligence, neural networks, data processing, futuristic technology',
            'Cybersecurity': 'network security, digital protection, encryption, secure systems',
            'default': 'professional learning environment, modern technology, educational setting'
        };

        const basePrompt = categoryPrompts[category] || categoryPrompts['default'];

        // Extract key concepts from title for additional context
        const titleWords = title
            .toLowerCase()
            .replace(/[^\w\s]/g, '')
            .split(' ')
            .filter(word => word.length > 2 && !['the', 'and', 'for', 'with', 'course', 'tutorial', 'guide', 'learn', 'learning'].includes(word))
            .slice(0, 4)
            .join(' ');

        // Build comprehensive prompt
        let finalPrompt = '';

        if (specificPrompt) {
            // If we found specific technologies, prioritize them
            finalPrompt = `${specificPrompt}${basePrompt}, ${titleWords}`;
        } else {
            // Generic but contextual prompt
            finalPrompt = `${basePrompt}, ${titleWords}`;
        }

        // Add quality and style modifiers
        finalPrompt += ', professional course thumbnail, clean modern design, high quality, educational, 16:9 aspect ratio, well-lit, sharp focus, vibrant colors, professional photography style';

        // Add negative prompts to avoid unwanted elements
        finalPrompt += ', NOT blurry, NOT dark, NOT cluttered, NOT amateur, NOT low quality';

        return finalPrompt;
    };

    // Fallback image generator (enhanced version of previous canvas approach)
    const generateFallbackImage = (title, category) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 400;
        canvas.height = 240;

        // Enhanced color schemes
        const colorSchemes = {
            'Web Development': {
                gradient: ['#667eea', '#764ba2'],
                icon: '💻',
                accent: '#4facfe'
            },
            'Design': {
                gradient: ['#f093fb', '#f5576c'],
                icon: '🎨',
                accent: '#4facfe'
            },
            'Data Science': {
                gradient: ['#4facfe', '#00f2fe'],
                icon: '📊',
                accent: '#43e97b'
            },
            'Marketing': {
                gradient: ['#43e97b', '#38f9d7'],
                icon: '📈',
                accent: '#667eea'
            },
            'default': {
                gradient: ['#fa709a', '#fee140'],
                icon: '📚',
                accent: '#667eea'
            }
        };

        const scheme = colorSchemes[category] || colorSchemes['default'];

        // Create modern gradient background
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, scheme.gradient[0]);
        gradient.addColorStop(1, scheme.gradient[1]);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Add geometric patterns
        ctx.globalAlpha = 0.1;
        for (let i = 0; i < 15; i++) {
            ctx.fillStyle = 'white';
            const size = Math.random() * 20 + 10;
            ctx.fillRect(
                Math.random() * canvas.width,
                Math.random() * canvas.height,
                size,
                size
            );
        }
        ctx.globalAlpha = 1;

        // Add category icon with glow effect
        ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
        ctx.shadowBlur = 20;
        ctx.font = '64px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = 'white';
        ctx.fillText(scheme.icon, canvas.width / 2, 90);
        ctx.shadowBlur = 0;

        // Add course title with better typography
        const maxTitleLength = 35;
        const displayTitle = title.length > maxTitleLength ?
            title.substring(0, maxTitleLength) + '...' : title;

        ctx.font = 'bold 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';

        // Improved word wrapping
        const words = displayTitle.split(' ');
        let line = '';
        let y = 150;
        const lineHeight = 22;
        const maxWidth = canvas.width - 60;

        for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + ' ';
            const metrics = ctx.measureText(testLine);

            if (metrics.width > maxWidth && n > 0) {
                ctx.fillText(line.trim(), canvas.width / 2, y);
                line = words[n] + ' ';
                y += lineHeight;
                if (y > 200) break; // Prevent overflow
            } else {
                line = testLine;
            }
        }
        ctx.fillText(line.trim(), canvas.width / 2, y);

        // Add modern decorative elements
        ctx.globalAlpha = 0.2;
        ctx.fillStyle = scheme.accent;

        // Top-left circle
        ctx.beginPath();
        ctx.arc(40, 40, 25, 0, 2 * Math.PI);
        ctx.fill();

        // Bottom-right circle
        ctx.beginPath();
        ctx.arc(canvas.width - 40, canvas.height - 40, 20, 0, 2 * Math.PI);
        ctx.fill();

        // Add subtle border
        ctx.globalAlpha = 0.3;
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.strokeRect(0, 0, canvas.width, canvas.height);

        return canvas.toDataURL();
    };

    // State for managing image loading
    const [imageCache, setImageCache] = useState(new Map());

    // CourseImage component for handling AI-generated thumbnails
    const CourseImage = ({ course, imageCache, setImageCache, generateAIThumbnail, generateFallbackImage }) => {
        const [imageUrl, setImageUrl] = useState('');
        const [isLoading, setIsLoading] = useState(true);
        const [hasError, setHasError] = useState(false);

        useEffect(() => {
            const loadImage = async () => {
                const cacheKey = `${course.id}-${course.title}`;

                // Check cache first
                if (imageCache.has(cacheKey)) {
                    setImageUrl(imageCache.get(cacheKey));
                    setIsLoading(false);
                    return;
                }

                try {
                    setIsLoading(true);
                    setHasError(false);

                    // Try to generate AI thumbnail
                    const aiUrl = await generateAIThumbnail(
                        course.title || 'Untitled Course',
                        course.category || course.subject || 'General',
                        course.description || ''
                    );

                    // Test if the image loads successfully
                    const img = new Image();
                    img.onload = () => {
                        setImageUrl(aiUrl);
                        setImageCache(prev => new Map(prev.set(cacheKey, aiUrl)));
                        setIsLoading(false);
                    };
                    img.onerror = () => {
                        // Fallback to generated image
                        const fallbackUrl = generateFallbackImage(
                            course.title || 'Untitled Course',
                            course.category || course.subject || 'General'
                        );
                        setImageUrl(fallbackUrl);
                        setImageCache(prev => new Map(prev.set(cacheKey, fallbackUrl)));
                        setIsLoading(false);
                        setHasError(true);
                    };
                    img.src = aiUrl;

                } catch (error) {
                    console.error('Error loading course image:', error);
                    // Use fallback image
                    const fallbackUrl = generateFallbackImage(
                        course.title || 'Untitled Course',
                        course.category || course.subject || 'General'
                    );
                    setImageUrl(fallbackUrl);
                    setImageCache(prev => new Map(prev.set(cacheKey, fallbackUrl)));
                    setIsLoading(false);
                    setHasError(true);
                }
            };

            loadImage();
        }, [course.id, course.title, course.category, course.subject]);

        if (isLoading) {
            return (
                <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #f0f0f0, #e0e0e0)',
                    animation: 'pulse 2s ease-in-out infinite'
                }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        border: '3px solid #E76F51',
                        borderTop: '3px solid transparent',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                    }} />
                </div>
            );
        }

        return (
            <img
                src={imageUrl}
                alt={course.title || 'Course thumbnail'}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: hasError ? 'none' : 'brightness(1.05) contrast(1.1) saturate(1.1)',
                    transition: 'all 0.3s ease'
                }}
                onError={() => {
                    if (!hasError) {
                        const fallbackUrl = generateFallbackImage(
                            course.title || 'Untitled Course',
                            course.category || course.subject || 'General'
                        );
                        setImageUrl(fallbackUrl);
                        setHasError(true);
                    }
                }}
            />
        );
    };

    const fetchCourses = async () => {
        setFetching(true);
        setFetchError(null);
        try {
            console.log('Fetching courses...');
            const [allRes, enrolledRes] = await Promise.all([
                api.routes.trainings.getAll(),
                user && user.role === 'student' ? api.routes.enrollments.getAll() : Promise.resolve({ data: { data: [] } })
            ]);
            console.log('API Response:', allRes);
            console.log('Courses data:', allRes.data);

            let coursesData = allRes.data.data || allRes.data || [];

            // Filter courses based on user role
            if (user?.role === 'trainer') {
                // Trainers can only see their own courses
                coursesData = coursesData.filter(course => course.trainer_id === user.id);
            }
            // Coordinators and admins can see all courses (no filtering needed)

            setCourses(coursesData);

            // Handle student enrollments
            if (user && user.role === 'student') {
                const enrolled = (enrolledRes.data.data || enrolledRes.data || []).map(e => e.training).filter(Boolean);
                setEnrolledCourses(enrolled);
            }
        } catch (err) {
            console.error('Error fetching courses:', err);
            setFetchError('Failed to load courses: ' + err.message);
        } finally {
            setFetching(false);
        }
    };

    useEffect(() => {
        fetchCourses();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

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
                        {record.thumbnail || '📚'}
                    </div>
                    <div>
                        <div className="font-semibold text-charcoal-500 dark:text-cream-100">{record.title || 'Untitled'}</div>
                        <div className="text-warm-500 dark:text-warm-300 text-sm truncate max-w-xs">
                            {(record.description && record.description.length > 0)
                                ? (record.description.length > 100
                                    ? `${record.description.substring(0, 100)}...`
                                    : record.description)
                                : 'No description'}
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            render: (category, record) => (
                <Tag className={`border-0 ${getCategoryColor(category || record.subject || 'Uncategorized')}`}>
                    {category || record.subject || 'Uncategorized'}
                </Tag>
            ),
            filters: [
                { text: 'Web Development', value: 'Web Development' },
                { text: 'Design', value: 'Design' },
                { text: 'Data Science', value: 'Data Science' },
                { text: 'Marketing', value: 'Marketing' },
            ],
            onFilter: (value, record) => (record.category || record.subject) === value,
        },
        {
            title: 'Level',
            dataIndex: 'level',
            key: 'level',
            render: (level) => (
                <Tag className={`border-0 ${getLevelColor(level || 'N/A')}`}>
                    {level || 'N/A'}
                </Tag>
            ),
        },
        {
            title: 'Trainer',
            dataIndex: 'trainer',
            key: 'trainer',
            render: (trainer, record) => (
                <div className="flex items-center gap-2">
                    <UserOutlined className="text-sage-500" />
                    <span className="text-charcoal-500 dark:text-cream-100">{trainer || record.trainer_name || 'N/A'}</span>
                </div>
            ),
        },
        {
            title: 'Students',
            dataIndex: 'students',
            key: 'students',
            render: (students) => (
                <span className="text-terracotta-500 font-medium">{students !== undefined ? students : 'N/A'}</span>
            ),
            sorter: (a, b) => (a.students || 0) - (b.students || 0),
        },
        {
            title: 'Duration',
            dataIndex: 'duration',
            key: 'duration',
            render: (duration) => (
                <div className="flex items-center gap-1">
                    <ClockCircleOutlined className="text-sage-500" />
                    <span className="text-warm-500 dark:text-warm-300">{duration || 'N/A'}</span>
                </div>
            ),
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (price) => (
                <span className="text-mustard-600 dark:text-mustard-400 font-semibold">{price !== undefined ? `${price}` : 'N/A'}</span>
            ),
            sorter: (a, b) => (a.price || 0) - (b.price || 0),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => getStatusBadge(status || 'Draft'),
            filters: [
                { text: 'Active', value: 'Active' },
                { text: 'Draft', value: 'Draft' },
                { text: 'Archived', value: 'Archived' },
            ],
            onFilter: (value, record) => (record.status || 'Draft') === value,
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

    if (fetching) {
        return <div className="p-8 text-center text-lg">Loading courses...</div>;
    }
    if (fetchError) {
        return <div className="p-8 text-center text-red-500">{fetchError}</div>;
    }

    // Trainer: Management UI
    if (user && user.role === 'trainer') {
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
                    <div style={{
                        background: 'linear-gradient(135deg, #E76F51 0%, #F4A261 50%, #2A9D8F 100%)',
                        borderRadius: '24px',
                        padding: '40px',
                        color: 'white',
                        position: 'relative',
                        overflow: 'hidden',
                        boxShadow: '0 20px 40px rgba(231, 111, 81, 0.3)'
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            width: '300px',
                            height: '300px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: '50%',
                            transform: 'translate(100px, -100px)'
                        }} />

                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                                        <div style={{
                                            width: '60px',
                                            height: '60px',
                                            background: 'rgba(255, 255, 255, 0.2)',
                                            borderRadius: '16px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backdropFilter: 'blur(10px)'
                                        }}>
                                            <BookOutlined style={{ fontSize: '28px' }} />
                                        </div>
                                        <div>
                                            <Title level={1} style={{
                                                color: 'white',
                                                margin: 0,
                                                fontSize: '36px',
                                                fontWeight: '700'
                                            }}>
                                                My Courses
                                            </Title>
                                            <Text style={{
                                                color: 'rgba(255, 255, 255, 0.9)',
                                                fontSize: '18px'
                                            }}>
                                                Create and manage your training courses
                                            </Text>
                                        </div>
                                    </div>
                                </div>
                                <Button
                                    type="primary"
                                    icon={<PlusOutlined />}
                                    size="large"
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.2)',
                                        borderColor: 'rgba(255, 255, 255, 0.4)',
                                        color: 'white',
                                        borderRadius: '12px',
                                        height: '48px',
                                        fontSize: '16px',
                                        fontWeight: '600',
                                        backdropFilter: 'blur(10px)'
                                    }}
                                    onClick={() => {
                                        form.resetFields();
                                        setIsModalVisible(true);
                                    }}
                                >
                                    Add New Course
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="mb-6">
                        <Row gutter={[16, 16]}>
                            <Col xs={24} sm={12} lg={8}>
                                <Input
                                    placeholder="Search courses..."
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
                            <Col xs={24} sm={12} lg={8}>
                                <Select
                                    placeholder="Filter by category"
                                    value={selectedCategory}
                                    onChange={setSelectedCategory}
                                    style={{
                                        width: '100%',
                                        height: '48px'
                                    }}
                                    suffixIcon={<FilterOutlined style={{ color: '#2A9D8F' }} />}
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
                                    style={{
                                        width: '100%',
                                        height: '48px'
                                    }}
                                    suffixIcon={<FilterOutlined style={{ color: '#2A9D8F' }} />}
                                >
                                    <Option value="all">All Levels</Option>
                                    <Option value="Beginner">Beginner</Option>
                                    <Option value="Intermediate">Intermediate</Option>
                                    <Option value="Advanced">Advanced</Option>
                                </Select>
                            </Col>
                        </Row>
                    </div>

                    {/* Courses Table */}
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
                            dataSource={filteredCourses}
                            rowKey="id"
                            pagination={{
                                pageSize: 10,
                                showTotal: (total, range) => (
                                    <span style={{
                                        color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)'
                                    }}>
                                        {`${range[0]}-${range[1]} of ${total} courses`}
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

                    {/* Course Form Modal */}
                    <Modal
                        title={
                            <span className="text-charcoal-500 dark:text-cream-100 text-lg font-semibold">
                                {form.getFieldValue('id') ? 'Edit Course' : 'Add New Course'}
                            </span>
                        }
                        open={isModalVisible}
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
    }

    // Enhanced Student View - Modern Training Platform Style
    if (user?.role === 'student') {
        return (
            <div style={{
                minHeight: '100vh',
                background: isDark
                    ? 'linear-gradient(135deg, #0f172a, #1e293b)'
                    : 'linear-gradient(135deg, #f8f9fa, #ffffff)',
                padding: '24px'
            }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>

                    {/* Hero Section */}
                    <div style={{
                        background: 'linear-gradient(135deg, #E76F51 0%, #F4A261 50%, #2A9D8F 100%)',
                        borderRadius: '24px',
                        padding: '60px 40px',
                        color: 'white',
                        position: 'relative',
                        overflow: 'hidden',
                        boxShadow: '0 20px 40px rgba(231, 111, 81, 0.3)'
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: '-50px',
                            right: '-50px',
                            width: '200px',
                            height: '200px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: '50%',
                            animation: 'pulse 4s ease-in-out infinite'
                        }} />
                        <div style={{
                            position: 'absolute',
                            bottom: '-30px',
                            left: '-30px',
                            width: '150px',
                            height: '150px',
                            background: 'rgba(255, 255, 255, 0.08)',
                            borderRadius: '50%',
                            animation: 'pulse 6s ease-in-out infinite'
                        }} />

                        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                            <Title level={1} style={{
                                color: 'white',
                                fontSize: '48px',
                                fontWeight: '700',
                                marginBottom: '16px',
                                textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                            }}>
                                🚀 Discover Amazing Courses
                            </Title>
                            <Text style={{
                                color: 'rgba(255, 255, 255, 0.9)',
                                fontSize: '20px',
                                display: 'block',
                                marginBottom: '32px'
                            }}>
                                Learn from world-class instructors and advance your career with hands-on projects
                            </Text>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' }}>
                                {[
                                    { icon: '📚', text: `${courses.length} Courses Available` },
                                    { icon: '⭐', text: 'Expert Instructors' },
                                    { icon: '🏆', text: 'Earn Certificates' }
                                ].map((badge, index) => (
                                    <div key={index} style={{
                                        background: 'rgba(255, 255, 255, 0.15)',
                                        backdropFilter: 'blur(10px)',
                                        borderRadius: '50px',
                                        padding: '12px 24px',
                                        border: '1px solid rgba(255, 255, 255, 0.2)'
                                    }}>
                                        <Text style={{ color: 'white', fontWeight: '600', fontSize: '16px' }}>
                                            {badge.icon} {badge.text}
                                        </Text>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Search and Filters */}
                    <div style={{
                        background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.9)',
                        borderRadius: '20px',
                        padding: '32px',
                        border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                        backdropFilter: 'blur(20px)'
                    }}>
                        <Row gutter={[24, 24]}>
                            <Col xs={24} md={12}>
                                <Input
                                    placeholder="Search for courses, skills, or instructors..."
                                    prefix={<SearchOutlined style={{ color: '#2A9D8F', fontSize: '18px' }} />}
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                    style={{
                                        height: '56px',
                                        borderRadius: '16px',
                                        fontSize: '16px',
                                        background: isDark ? 'rgba(255, 255, 255, 0.1)' : '#ffffff',
                                        borderColor: isDark ? 'rgba(255, 255, 255, 0.2)' : '#e2e8f0',
                                        color: isDark ? '#ffffff' : '#000000',
                                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                                    }}
                                />
                            </Col>
                            <Col xs={24} sm={12} md={6}>
                                <Select
                                    placeholder="Category"
                                    value={selectedCategory}
                                    onChange={setSelectedCategory}
                                    style={{ width: '100%', height: '56px' }}
                                    suffixIcon={<FilterOutlined style={{ color: '#2A9D8F' }} />}
                                >
                                    <Option value="all">All Categories</Option>
                                    <Option value="Web Development">💻 Web Development</Option>
                                    <Option value="Design">🎨 Design</Option>
                                    <Option value="Data Science">📊 Data Science</Option>
                                    <Option value="Marketing">📈 Marketing</Option>
                                </Select>
                            </Col>
                            <Col xs={24} sm={12} md={6}>
                                <Select
                                    placeholder="Level"
                                    value={selectedLevel}
                                    onChange={setSelectedLevel}
                                    style={{ width: '100%', height: '56px' }}
                                >
                                    <Option value="all">All Levels</Option>
                                    <Option value="Beginner">🌱 Beginner</Option>
                                    <Option value="Intermediate">🚀 Intermediate</Option>
                                    <Option value="Advanced">⚡ Advanced</Option>
                                </Select>
                            </Col>
                        </Row>
                    </div>

                    {/* Course Cards Grid */}
                    <div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '24px'
                        }}>
                            <Title level={2} style={{
                                color: isDark ? '#ffffff' : '#000000',
                                margin: 0,
                                fontSize: '32px',
                                fontWeight: '700'
                            }}>
                                Featured Courses
                            </Title>
                            <Text style={{
                                color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                                fontSize: '16px'
                            }}>
                                {filteredCourses.length} courses found
                            </Text>
                        </div>

                        <Row gutter={[24, 24]}>
                            {filteredCourses.map((course) => {
                                const isEnrolled = enrolledCourses.some(enrolled => enrolled.id === course.id);
                                return (
                                    <Col xs={24} sm={12} lg={8} xl={6} key={course.id}>
                                        <Card
                                            hoverable
                                            style={{
                                                borderRadius: '20px',
                                                overflow: 'hidden',
                                                background: isDark ? 'rgba(255, 255, 255, 0.05)' : '#ffffff',
                                                border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                                                boxShadow: isDark
                                                    ? '0 8px 32px rgba(0, 0, 0, 0.3)'
                                                    : '0 8px 32px rgba(0, 0, 0, 0.1)',
                                                transition: 'all 0.3s ease',
                                                height: '100%'
                                            }}
                                            className="course-card"
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.transform = 'translateY(-8px)';
                                                e.currentTarget.style.boxShadow = isDark
                                                    ? '0 16px 48px rgba(0, 0, 0, 0.4)'
                                                    : '0 16px 48px rgba(0, 0, 0, 0.15)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.transform = 'translateY(0)';
                                                e.currentTarget.style.boxShadow = isDark
                                                    ? '0 8px 32px rgba(0, 0, 0, 0.3)'
                                                    : '0 8px 32px rgba(0, 0, 0, 0.1)';
                                            }}
                                        >
                                            {/* AI-Generated Course Thumbnail */}
                                            <div style={{
                                                height: '180px',
                                                position: 'relative',
                                                marginBottom: '20px',
                                                borderRadius: '12px 12px 0 0',
                                                overflow: 'hidden',
                                                background: 'linear-gradient(135deg, #f0f0f0, #e0e0e0)'
                                            }}>
                                                <CourseImage
                                                    course={course}
                                                    imageCache={imageCache}
                                                    setImageCache={setImageCache}
                                                    generateAIThumbnail={generateAIThumbnail}
                                                    generateFallbackImage={generateFallbackImage}
                                                />
                                                {isEnrolled && (
                                                    <div style={{
                                                        position: 'absolute',
                                                        top: '12px',
                                                        right: '12px',
                                                        background: 'rgba(106, 153, 78, 0.95)',
                                                        color: 'white',
                                                        padding: '6px 12px',
                                                        borderRadius: '20px',
                                                        fontSize: '12px',
                                                        fontWeight: '600',
                                                        backdropFilter: 'blur(10px)',
                                                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                                                        zIndex: 10
                                                    }}>
                                                        ✓ Enrolled
                                                    </div>
                                                )}
                                                <div style={{
                                                    position: 'absolute',
                                                    top: '12px',
                                                    left: '12px',
                                                    background: 'rgba(0, 0, 0, 0.8)',
                                                    color: 'white',
                                                    padding: '6px 12px',
                                                    borderRadius: '20px',
                                                    fontSize: '12px',
                                                    fontWeight: '600',
                                                    backdropFilter: 'blur(10px)',
                                                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                                                    zIndex: 10
                                                }}>
                                                    {course.level || 'All Levels'}
                                                </div>
                                                {/* Gradient overlay for better text readability */}
                                                <div style={{
                                                    position: 'absolute',
                                                    bottom: 0,
                                                    left: 0,
                                                    right: 0,
                                                    height: '60px',
                                                    background: 'linear-gradient(transparent, rgba(0,0,0,0.4))',
                                                    pointerEvents: 'none',
                                                    zIndex: 5
                                                }} />
                                            </div>

                                            {/* Course Content */}
                                            <div style={{ padding: '0 20px 20px 20px' }}>
                                                {/* Category Tag */}
                                                <Tag style={{
                                                    background: getCategoryColor(course.category || course.subject).includes('terracotta') ? 'rgba(231, 111, 81, 0.1)' :
                                                        getCategoryColor(course.category || course.subject).includes('sage') ? 'rgba(42, 157, 143, 0.1)' :
                                                            getCategoryColor(course.category || course.subject).includes('mustard') ? 'rgba(244, 162, 97, 0.1)' : 'rgba(231, 111, 81, 0.1)',
                                                    color: getCategoryColor(course.category || course.subject).includes('terracotta') ? '#E76F51' :
                                                        getCategoryColor(course.category || course.subject).includes('sage') ? '#2A9D8F' :
                                                            getCategoryColor(course.category || course.subject).includes('mustard') ? '#F4A261' : '#E76F51',
                                                    border: 'none',
                                                    borderRadius: '20px',
                                                    fontSize: '12px',
                                                    fontWeight: '600',
                                                    marginBottom: '12px'
                                                }}>
                                                    {course.category || course.subject || 'General'}
                                                </Tag>

                                                {/* Course Title */}
                                                <Title level={4} style={{
                                                    color: isDark ? '#ffffff' : '#000000',
                                                    marginBottom: '8px',
                                                    fontSize: '18px',
                                                    fontWeight: '600',
                                                    lineHeight: '1.4',
                                                    height: '50px',
                                                    overflow: 'hidden',
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical'
                                                }}>
                                                    {course.title || 'Untitled Course'}
                                                </Title>

                                                {/* Instructor */}
                                                <div style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '8px',
                                                    marginBottom: '12px'
                                                }}>
                                                    <Avatar size={24} icon={<UserOutlined />} style={{
                                                        background: 'linear-gradient(135deg, #E76F51, #F4A261)'
                                                    }} />
                                                    <Text style={{
                                                        color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
                                                        fontSize: '14px'
                                                    }}>
                                                        {course.trainer || course.trainer_name || 'Expert Instructor'}
                                                    </Text>
                                                </div>

                                                {/* Course Stats */}
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    marginBottom: '16px'
                                                }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                        <StarOutlined style={{ color: '#F4A261', fontSize: '14px' }} />
                                                        <Text style={{
                                                            color: isDark ? '#ffffff' : '#000000',
                                                            fontSize: '14px',
                                                            fontWeight: '600'
                                                        }}>
                                                            {course.rating || '4.5'}
                                                        </Text>
                                                        <Text style={{
                                                            color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
                                                            fontSize: '12px'
                                                        }}>
                                                            ({course.students || 0} students)
                                                        </Text>
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                        <ClockCircleOutlined style={{ color: '#2A9D8F', fontSize: '14px' }} />
                                                        <Text style={{
                                                            color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
                                                            fontSize: '14px'
                                                        }}>
                                                            {course.duration || 'Self-paced'}
                                                        </Text>
                                                    </div>
                                                </div>

                                                {/* Price and Action */}
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center'
                                                }}>
                                                    <div>
                                                        <Text style={{
                                                            color: '#E76F51',
                                                            fontSize: '24px',
                                                            fontWeight: '700'
                                                        }}>
                                                            ${course.price || 'Free'}
                                                        </Text>
                                                    </div>
                                                    <Button
                                                        type={isEnrolled ? "default" : "primary"}
                                                        size="large"
                                                        icon={isEnrolled ? <EyeOutlined /> : <PlayCircleOutlined />}
                                                        onClick={() => navigate(`/dashboard/courses/${course.id}`)}
                                                        style={{
                                                            borderRadius: '12px',
                                                            fontWeight: '600',
                                                            ...(isEnrolled ? {
                                                                background: 'rgba(106, 153, 78, 0.1)',
                                                                borderColor: '#6A994E',
                                                                color: '#6A994E'
                                                            } : {
                                                                background: 'linear-gradient(135deg, #E76F51, #F4A261)',
                                                                border: 'none',
                                                                boxShadow: '0 4px 12px rgba(231, 111, 81, 0.3)'
                                                            })
                                                        }}
                                                    >
                                                        {isEnrolled ? 'Continue' : 'Enroll Now'}
                                                    </Button>
                                                </div>
                                            </div>
                                        </Card>
                                    </Col>
                                );
                            })}
                        </Row>

                        {/* Load More Button */}
                        {filteredCourses.length > 8 && (
                            <div style={{ textAlign: 'center', marginTop: '48px' }}>
                                <Button
                                    size="large"
                                    style={{
                                        background: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                                        borderColor: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
                                        color: isDark ? '#ffffff' : '#000000',
                                        borderRadius: '12px',
                                        height: '48px',
                                        fontSize: '16px',
                                        fontWeight: '600',
                                        padding: '0 32px'
                                    }}
                                >
                                    Load More Courses
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // For other roles (coordinators, etc.)
    return (
        <div style={{
            minHeight: '100vh',
            padding: '24px',
            background: isDark
                ? 'linear-gradient(135deg, #0f172a, #1e293b)'
                : 'linear-gradient(135deg, #f8f9fa, #ffffff)'
        }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                <Title level={1} style={{
                    color: isDark ? '#ffffff' : '#000000',
                    marginBottom: '24px'
                }}>
                    Available Courses
                </Title>
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
                        columns={columns.filter(col => col.key !== 'actions')} 
                        dataSource={filteredCourses}
                        rowKey="id"
                        pagination={{
                            pageSize: 10,
                            showTotal: (total, range) => (
                                <span style={{
                                    color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)'
                                }}>
                                    {`${range[0]}-${range[1]} of ${total} courses`}
                                </span>
                            ),
                        }}
                        scroll={{ x: 'max-content' }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Courses;