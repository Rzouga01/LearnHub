import React from 'react';
import { Typography } from 'antd';
import { useTheme } from '../contexts/ThemeContext';

const { Text } = Typography;

const SkillsMarquee = ({ skills }) => {
  const { theme } = useTheme();

  return (
    <div className="skills-marquee-section" style={{
      padding: '60px 0',
      background: theme === 'dark' 
        ? 'linear-gradient(135deg, #1a1a1a, #0a0a0a)'
        : 'linear-gradient(135deg, #f8f9fa, #ffffff)',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Skills Marquee - WORKING VERSION WITH REVERSE DIRECTION */}
      <div 
        className="skills-marquee-wrapper"
        style={{
          overflow: 'hidden',
          position: 'relative',
          width: '100%',
          mask: 'linear-gradient(90deg, transparent, white 10%, white 90%, transparent)',
          WebkitMask: 'linear-gradient(90deg, transparent, white 10%, white 90%, transparent)'
        }}
      >
        <div 
          className="skills-marquee-track"
          style={{
            display: 'flex',
            width: 'fit-content',
            animation: 'skillsMarqueeMove 45s linear infinite',
            gap: '30px',
            willChange: 'transform'
          }}
        >
          {[...skills, ...skills, ...skills].map((skill, index) => (
            <div
              key={index}
              className="skill-card-enhanced"
              style={{
                minWidth: '320px',
                flexShrink: 0,
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
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer'
              }}
            >
              {/* Skill Icon with Glow Effect */}
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
                {/* Shimmer Effect */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '16px',
                  background: 'linear-gradient(45deg, transparent, rgba(231, 111, 81, 0.1), transparent)',
                  animation: 'shimmer 2s infinite'
                }} />
              </div>
              
              {/* Skill Info */}
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
                    👥 {skill.students} students
                  </Text>
                </div>
              </div>
              
              {/* Progress Bar */}
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

      <style jsx>{`
        .skills-marquee-wrapper:hover .skills-marquee-track {
          animation-play-state: paused !important;
        }
        
        .skill-card-enhanced:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 15px 30px rgba(231, 111, 81, 0.2);
          z-index: 10;
          position: relative;
        }
        
        @keyframes skillsMarqueeMove {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
        
        @media (max-width: 768px) {
          .skills-marquee-track {
            animation-duration: 30s !important;
            gap: 20px;
          }
          
          .skill-card-enhanced {
            min-width: 250px !important;
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .skills-marquee-track {
            animation: none !important;
          }
          
          .skills-marquee-wrapper {
            overflow-x: auto;
            scroll-behavior: smooth;
          }
        }
      `}</style>
    </div>
  );
};

export default SkillsMarquee;