import React from 'react';
import { Avatar, Rate, Typography } from 'antd';
import { useTheme } from '../contexts/ThemeContext';

const { Text, Paragraph } = Typography;

const MarqueeReviews = ({ reviews }) => {
    const { theme } = useTheme();

    return (
        <div className="reviews-marquee-section" style={{
            padding: '80px 0',
            background: theme === 'dark'
                ? 'linear-gradient(135deg, #2a2a2a, #1a1a1a)'
                : 'linear-gradient(135deg, #e9ecef, #f8f9fa)',
            overflow: 'hidden',
            position: 'relative'
        }}>
            {/* Section Header */}
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
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

                <h2 style={{
                    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                    fontWeight: '900',
                    marginBottom: '24px',
                    lineHeight: '1.2',
                    background: 'linear-gradient(135deg, #E76F51, #F4A261, #2A9D8F)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                }}>
                    What Our Students Say
                </h2>

                <Text style={{
                    fontSize: '16px',
                    color: theme === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    display: 'block'
                }}>
                    🎯 Hover to pause and read
                </Text>
            </div>

            {/* Reviews Marquee - WORKING VERSION */}
            <div
                className="reviews-marquee-wrapper"
                style={{
                    overflow: 'hidden',
                    position: 'relative',
                    width: '100%',
                    mask: 'linear-gradient(90deg, transparent, white 10%, white 90%, transparent)',
                    WebkitMask: 'linear-gradient(90deg, transparent, white 10%, white 90%, transparent)',
                    marginBottom: '40px'
                }}
            >
                <div
                    className="reviews-marquee-track"
                    style={{
                        display: 'flex',
                        width: 'fit-content',
                        animation: 'reviewsMarqueeMove 60s linear infinite',
                        gap: '40px',
                        willChange: 'transform'
                    }}
                >
                    {[...reviews, ...reviews, ...reviews].map((review, index) => (
                        <div
                            key={index}
                            className="review-card-enhanced"
                            style={{
                                minWidth: '420px',
                                flexShrink: 0,
                                padding: '32px',
                                borderRadius: '24px',
                                background: theme === 'dark'
                                    ? 'rgba(255, 255, 255, 0.05)'
                                    : 'rgba(255, 255, 255, 0.8)',
                                border: `1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                                backdropFilter: 'blur(20px)',
                                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                cursor: 'pointer'
                            }}
                        >
                            {/* Rating and Verified Badge */}
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
                                    ✓ Verified
                                </div>
                            </div>

                            {/* Review Text */}
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

                            {/* User Info */}
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
                                    {/* Online Status */}
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

            <style jsx>{`
        .reviews-marquee-wrapper:hover .reviews-marquee-track {
          animation-play-state: paused !important;
        }
        
        .review-card-enhanced:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(231, 111, 81, 0.25);
          z-index: 10;
          position: relative;
        }
        
        @keyframes reviewsMarqueeMove {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        @media (max-width: 768px) {
          .reviews-marquee-track {
            animation-duration: 40s !important;
            gap: 20px;
          }
          
          .review-card-enhanced {
            min-width: 300px !important;
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .reviews-marquee-track {
            animation: none !important;
          }
          
          .reviews-marquee-wrapper {
            overflow-x: auto;
            scroll-behavior: smooth;
          }
        }
      `}</style>
        </div>
    );
};

export default MarqueeReviews;