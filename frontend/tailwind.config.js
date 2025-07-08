/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    light: '#4B9AFF',
                    DEFAULT: '#1677FF',
                    dark: '#0958D9',
                },
            },
        },
    },
    plugins: [],
    corePlugins: {
        preflight: false, // Disable base styles for compatibility with Ant Design
    },
}
