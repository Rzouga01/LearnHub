import React from 'react';
import { Button } from 'antd';
import { SunOutlined, MoonOutlined } from '@ant-design/icons';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = ({ className = '', style = {} }) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button
            type="text"
            icon={theme === 'light' ? <MoonOutlined /> : <SunOutlined />}
            onClick={toggleTheme}
            className={`theme-toggle ${className}`}
            style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                zIndex: 1000,
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                boxShadow: '0 4px 12px var(--shadow-medium)',
                transition: 'all 0.3s ease',
                ...style
            }}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        />
    );
};

export default ThemeToggle;
