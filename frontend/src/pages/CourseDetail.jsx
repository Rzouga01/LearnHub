import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import {
    Card,
    Button,
    Typography,
    Row,
    Col,
    Progress,
    Tag,
    Rate,
    Avatar,
    Tabs,
    List,
    Input,
    Space,
    Divider,
    Tooltip,
    Badge
} from 'antd';
import {
    PlayCircleOutlined,
    BookOutlined,
    ClockCircleOutlined,
    UserOutlined,
    StarOutlined,
    DownloadOutlined,
    ShareAltOutlined,
    HeartOutlined,
    MessageOutlined,
    TrophyOutlined,
    CheckCircleOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { TextArea } = Input;

const CourseDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('1');
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [progress, setProgress] = useState(0);
    const [courseData, setCourseData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [enrollLoading, setEnrollLoading] = useState(false);

    useEffect(() => {
        const fetchCourse = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await api.routes.trainings.get(id);
                setCourseData(res.data.data || res.data);
            } catch (err) {
                setError('Failed to load course.');
            } finally {
                setLoading(false);
            }
        };
        fetchCourse();
    }, [id]);

    useEffect(() => {
        const checkEnrollment = async () => {
            if (!user) return;
            try {
                const res = await api.routes.enrollments.getAll();
                const enrolled = (res.data.data || res.data || []).some(e => e.training_id == id && e.user_id == user.id);
                setIsEnrolled(enrolled);
            } catch (err) {
                // ignore
            }
        };
        checkEnrollment();
    }, [id, user]);

    const handleEnroll = async () => {
        setEnrollLoading(true);
        try {
            await api.routes.enrollments.create({ training_id: id });
            setIsEnrolled(true);
            setProgress(0);
        } catch (err) {
            // Optionally show error
        } finally {
            setEnrollLoading(false);
        }
    };

    if (loading) return <div className="p-8 text-center text-lg">Loading course...</div>;
    if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
    if (!courseData) return null;
    return (
        <div className="min-h-screen bg-cream-100 dark:bg-charcoal-500 transition-colors duration-300">
            <div className="max-w-7xl mx-auto p-6 space-y-6">
                <Row gutter={[24, 24]}>
                    <Col xs={24} lg={16}>
                        {/* ...main left content (Tabs, etc.)... */}
                    </Col>
                    <Col xs={24} lg={8}>
                        {/* ...main right content (Instructor, Related Courses, etc.)... */}
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default CourseDetail;
