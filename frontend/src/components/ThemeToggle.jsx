import React from 'react';
import { Button } from 'antd';
import { SunOutlined, MoonOutlined } from '@ant-design/icons';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = ({ className = '', style = {}, inline = false }) => {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    const baseStyle = {
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: isDark ? 'var(--bg-secondary)' : 'var(--bg-primary)',
        border: '2px solid var(--border-color)',
        color: isDark ? 'var(--accent-primary)' : 'var(--accent-secondary)',
        boxShadow: '0 8px 32px var(--shadow-medium)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        fontSize: '20px',
        cursor: 'pointer',
        overflow: 'hidden',
        position: 'relative'
    };

    const fixedStyle = {
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 1000,
    };

    const iconStyle = {
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isDark ? 'rotate(0deg)' : 'rotate(360deg)'
    };

    const rippleStyle = {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        background: isDark 
            ? 'radial-gradient(circle, var(--accent-primary) 0%, transparent 70%)'
            : 'radial-gradient(circle, var(--accent-secondary) 0%, transparent 70%)',
        opacity: 0,
        transform: 'scale(0)',
        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
    };

    const handleClick = () => {
        const ripple = document.querySelector('.theme-toggle-ripple');
        if (ripple) {
            ripple.style.opacity = '0.3';
            ripple.style.transform = 'scale(2)';
            setTimeout(() => {
                ripple.style.opacity = '0';
                ripple.style.transform = 'scale(0)';
            }, 600);
        }
        toggleTheme();
    };

    const combinedStyle = {
        ...baseStyle,
        ...(inline ? {} : fixedStyle),
        ...style,
        '&:hover': {
            transform: 'scale(1.1)',
            boxShadow: '0 12px 40px var(--shadow-medium)',
            backgroundColor: isDark ? 'var(--accent-primary)' : 'var(--accent-secondary)',
            color: 'white'
        }
    };

    return (
        <Button
            className={`theme-toggle ${className}`}
            onClick={handleClick}
            style={combinedStyle}
        >
            <div className="theme-toggle-ripple" style={rippleStyle} />
            {isDark ? (
                <MoonOutlined style={iconStyle} />
            ) : (
                <SunOutlined style={iconStyle} />
            )}
        </Button>
    );
};

export default ThemeToggle;
