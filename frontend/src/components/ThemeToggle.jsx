import React from 'react';
import { Button } from 'antd';
import { SunOutlined, MoonOutlined } from '@ant-design/icons';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = ({ className = '', style = {}, inline = false }) => {
    const { theme, toggleTheme } = useTheme();

    const baseStyle = {
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--bg-secondary)',
        border: '2px solid var(--border-color)',
        color: 'var(--text-primary)',
        boxShadow: '0 8px 32px var(--shadow-medium)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        fontSize: '18px'
    };

    const fixedStyle = {
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 1000,
    };

    const hoverStyle = {
        transform: 'scale(1.1)',
        backgroundColor: 'var(--accent-primary)',
        borderColor: 'var(--accent-primary)',
        color: 'white',
        boxShadow: '0 12px 40px rgba(11, 197, 234, 0.4)'
    };

    return (
        <Button
            type="text"
            icon={theme === 'light' ? <MoonOutlined /> : <SunOutlined />}
            onClick={toggleTheme}
            className={`theme-toggle ${className}`}
            style={{
                ...baseStyle,
                ...(inline ? {} : fixedStyle),
                ...style
            }}
            onMouseEnter={(e) => {
                Object.assign(e.target.style, hoverStyle);
            }}
            onMouseLeave={(e) => {
                Object.assign(e.target.style, {
                    ...baseStyle,
                    ...(inline ? {} : fixedStyle),
                    ...style
                });
            }}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        />
    );
};

export default ThemeToggle;
