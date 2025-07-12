import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../assets/images/logo.png';

const Logo = ({
    to = "/",
    size = "medium",
    showText = true,
    className = "",
    style = {},
    onClick = null
}) => {
    const sizes = {
        small: { width: 24, height: 24, fontSize: '16px' },
        medium: { width: 32, height: 32, fontSize: '18px' },
        large: { width: 48, height: 48, fontSize: '24px' },
        xlarge: { width: 70, height: 70, fontSize: '32px' },
        xxlarge: { width: 120, height: 120, fontSize: '48px' }
    };

    const logoStyle = {
        ...sizes[size],
        objectFit: 'contain',
        ...style
    };

    const LogoContent = () => (
        <div className={`flex items-center ${className}`} style={style}>
            <img
                src={logoImage}
                alt="LearnHub Logo"
                style={logoStyle}
                className="transition-transform duration-300 hover:scale-110"
            />
            {showText && (
                <span
                    style={{
                        fontSize: sizes[size].fontSize,
                        fontWeight: '700',
                        marginLeft: '8px',
                        color: 'inherit'
                    }}
                >
                    LearnHub
                </span>
            )}
        </div>
    );

    if (onClick) {
        return (
            <button
                onClick={onClick}
                className="bg-transparent border-none cursor-pointer"
                style={{ textDecoration: 'none', color: 'inherit' }}
            >
                <LogoContent />
            </button>
        );
    }

    return (
        <Link
            to={to}
            style={{ textDecoration: 'none', color: 'inherit' }}
            className="hover:opacity-80 transition-opacity duration-300"
        >
            <LogoContent />
        </Link>
    );
};

export default Logo;
