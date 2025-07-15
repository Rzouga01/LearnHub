/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                terracotta: {
                    50: '#FEF7F5',
                    100: '#FDEEE9',
                    200: '#FAD5C8',
                    300: '#F7BCA7',
                    400: '#F18A65',
                    500: '#E76F51', // Primary
                    600: '#D85D41',
                    700: '#B64A31',
                    800: '#943821',
                    900: '#7A2D1B',
                },
                mustard: {
                    50: '#FEFCF7',
                    100: '#FDF8ED',
                    200: '#FBEFD2',
                    300: '#F8E5B7',
                    400: '#F6D281',
                    500: '#F4A261', // Secondary
                    600: '#E28F4B',
                    700: '#C27A3F',
                    800: '#A26533',
                    900: '#85532A',
                },
                sage: {
                    50: '#F0FFFE',
                    100: '#CCFFFE',
                    200: '#99FDFC',
                    300: '#66F7F5',
                    400: '#1FE9E3',
                    500: '#2A9D8F', // Links/Accents
                    600: '#238B7E',
                    700: '#1D7068',
                    800: '#175A52',
                    900: '#134A44',
                },
                cream: {
                    50: '#FFFEF9',
                    100: '#FFF5E1', // Light bg
                    200: '#FFECC2',
                    300: '#FFE3A3',
                    400: '#FFD165',
                    500: '#FFC83A',
                    600: '#E6B333',
                    700: '#BF942B',
                    800: '#997622',
                    900: '#7D621C',
                },
                charcoal: {
                    50: '#F7F7F7',
                    100: '#E3E3E3',
                    200: '#C8C8C8',
                    300: '#A4A4A4',
                    400: '#717171',
                    500: '#2E2E2E', // Dark bg & primary text
                    600: '#292929',
                    700: '#232323',
                    800: '#1D1D1D',
                    900: '#171717',
                },
                warm: {
                    50: '#F9F8F7',
                    100: '#F1EFED',
                    200: '#E0DDD9',
                    300: '#CFCAC5',
                    400: '#ADA59D',
                    500: '#7A706E', // Secondary text
                    600: '#6E6563',
                    700: '#5C5452',
                    800: '#4A4341',
                    900: '#3D3735',
                },
                olive: {
                    50: '#F7FBF5',
                    100: '#EDF7E8',
                    200: '#D3EBC5',
                    300: '#B8DEA2',
                    400: '#83C55C',
                    500: '#6A994E', // Success
                    600: '#5F8A46',
                    700: '#4F733B',
                    800: '#3F5C2F',
                    900: '#334B26',
                },
                saffron: {
                    50: '#FFFCF5',
                    100: '#FEF7E6',
                    200: '#FDECBF',
                    300: '#FBE098',
                    400: '#F8C84A',
                    500: '#F6BD60', // Warning
                    600: '#E0A956',
                    700: '#BA8E47',
                    800: '#947238',
                    900: '#7A5E2E',
                },
                rust: {
                    50: '#FDF6F6',
                    100: '#FAEAEA',
                    200: '#F2CACA',
                    300: '#EAAAAA',
                    400: '#DA6A6A',
                    500: '#BC4749', // Error
                    600: '#A94041',
                    700: '#8D3536',
                    800: '#712A2B',
                    900: '#5C2223',
                },
            },
            fontFamily: {
                'inter': ['Inter', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.6s ease-out',
                'float': 'float 3s ease-in-out infinite',
                'pulse': 'pulse 2s infinite',
                'bounce': 'bounce 1s infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                pulse: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.7' },
                },
                bounce: {
                    '0%, 100%': { transform: 'translateY(-25%)', animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)' },
                    '50%': { transform: 'translateY(0)', animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)' },
                },
            },
            boxShadow: {
                '3xl': '0 35px 60px -12px rgba(0, 0, 0, 0.25)',
            }
        },
    },
    plugins: [],
    corePlugins: {
        preflight: true,
    },
}
