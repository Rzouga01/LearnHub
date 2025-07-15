import React from 'react';
import { ConfigProvider, theme } from 'antd';
import { useTheme } from '../contexts/ThemeContext';

const ThemeProvider = ({ children }) => {
    const { isDark } = useTheme();


    const lightTheme = {
        token: {
            // Primary colors
            colorPrimary: '#E76F51', // Terracotta
            colorPrimaryHover: '#D85D41', // Terracotta 600
            colorPrimaryActive: '#B64A31', // Terracotta 700
            colorPrimaryBg: '#FEF7F5', // Terracotta 50
            colorPrimaryBgHover: '#FDEEE9', // Terracotta 100

            // Secondary colors
            colorSecondary: '#F4A261', // Mustard Yellow

            // Success colors
            colorSuccess: '#6A994E', // Olive Green
            colorSuccessHover: '#5F8A46',
            colorSuccessBg: '#F7FBF5',
            colorSuccessBorder: '#D3EBC5',

            // Warning colors
            colorWarning: '#F6BD60', // Saffron Orange
            colorWarningHover: '#DDA854',
            colorWarningBg: '#FFFCF5',
            colorWarningBorder: '#FDECBF',

            // Error colors
            colorError: '#BC4749', // Rust Red
            colorErrorHover: '#A94041',
            colorErrorBg: '#FDF6F6',
            colorErrorBorder: '#F2CACA',

            // Info colors
            colorInfo: '#2A9D8F', // Sage Green
            colorInfoHover: '#238B7E',
            colorInfoBg: '#F0FFFE',
            colorInfoBorder: '#99FDFC',

            // Text colors
            colorText: '#2E2E2E', // Deep Charcoal
            colorTextSecondary: '#7A706E', // Warm Gray
            colorTextTertiary: '#ADA59D', // Warm 400
            colorTextQuaternary: '#CFCAC5', // Warm 300

            // Background colors
            colorBgContainer: '#FFFFFF', // Soft White
            colorBgElevated: '#FFFFFF',
            colorBgLayout: '#FFF5E1', // Cream
            colorBgSpotlight: '#FEFCF7', // Mustard 50
            colorBgMask: 'rgba(46, 46, 46, 0.45)',

            // Border colors
            colorBorder: '#E0DDD9', // Warm 200
            colorBorderSecondary: '#F1EFED', // Warm 100

            // Fill colors
            colorFill: '#FEFCF7', // Mustard 50
            colorFillSecondary: '#F9F8F7', // Warm 50
            colorFillTertiary: '#F1EFED', // Warm 100
            colorFillQuaternary: '#E0DDD9', // Warm 200

            // Component specific
            controlHeight: 40,
            controlHeightSM: 32,
            controlHeightLG: 48,
            borderRadius: 8,
            borderRadiusLG: 12,
            borderRadiusSM: 6,

            // Remove all blue references
            colorLink: '#2A9D8F', // Sage Green instead of blue
            colorLinkHover: '#238B7E',
            colorLinkActive: '#1D7068',
        },
        components: {
            Button: {
                primaryShadow: '0 2px 8px rgba(231, 111, 81, 0.15)',
                defaultShadow: '0 2px 4px rgba(224, 221, 217, 0.2)',
                colorPrimaryBg: '#E76F51',
                colorPrimaryBgHover: '#D85D41',
                colorPrimaryBorder: '#E76F51',
                colorPrimaryBorderHover: '#D85D41',
                colorPrimaryHover: '#D85D41',
                colorPrimaryActive: '#B64A31',
                defaultBg: '#FFFFFF',
                defaultBorderColor: '#E0DDD9',
                defaultColor: '#2E2E2E',
                defaultHoverBg: '#FEFCF7',
                defaultHoverBorderColor: '#E76F51',
                defaultHoverColor: '#E76F51',
            },
            Input: {
                colorBgContainer: '#FFFFFF',
                colorBorder: '#E0DDD9',
                colorBorderHover: '#E76F51',
                colorPrimaryHover: '#E76F51',
                colorPrimaryBorder: '#E76F51',
                activeBorderColor: '#E76F51',
                activeShadow: '0 0 0 2px rgba(231, 111, 81, 0.1)',
                hoverBorderColor: '#E76F51',
                colorText: '#2E2E2E',
                colorTextPlaceholder: '#7A706E',
            },
            Card: {
                colorBgContainer: '#FFFFFF',
                colorBorderSecondary: '#E0DDD9',
                headerBg: '#FFFFFF',
                headerHeight: 56,
            },
            Menu: {
                itemSelectedBg: 'rgba(231, 111, 81, 0.1)',
                itemSelectedColor: '#E76F51',
                itemHoverBg: 'rgba(231, 111, 81, 0.05)',
                itemHoverColor: '#E76F51',
                itemActiveBg: 'rgba(231, 111, 81, 0.15)',
                colorBgContainer: '#FFFFFF',
                colorText: '#2E2E2E',
                colorTextSecondary: '#7A706E',
            },
            Table: {
                headerBg: '#FEFCF7',
                headerColor: '#2E2E2E',
                colorBgContainer: '#FFFFFF',
                colorText: '#2E2E2E',
                colorTextSecondary: '#7A706E',
                borderColor: '#E0DDD9',
                rowHoverBg: '#FEFCF7',
            },
            Tabs: {
                inkBarColor: '#E76F51',
                itemSelectedColor: '#E76F51',
                itemHoverColor: '#E76F51',
                itemActiveColor: '#E76F51',
                colorText: '#7A706E',
            },
            Progress: {
                defaultColor: '#E76F51',
                remainingColor: '#F1EFED',
            },
            Tag: {
                defaultBg: '#FEFCF7',
                defaultColor: '#2E2E2E',
                colorBorder: '#E0DDD9',
            },
            Select: {
                colorBgContainer: '#FFFFFF',
                colorBorder: '#E0DDD9',
                colorBorderHover: '#E76F51',
                colorPrimaryHover: '#E76F51',
                optionSelectedBg: 'rgba(231, 111, 81, 0.1)',
                optionSelectedColor: '#E76F51',
                optionActiveBg: 'rgba(231, 111, 81, 0.05)',
            },
            Checkbox: {
                colorPrimary: '#E76F51',
                colorPrimaryHover: '#D85D41',
                colorPrimaryBorder: '#E76F51',
            },
            Radio: {
                colorPrimary: '#E76F51',
                colorPrimaryHover: '#D85D41',
                colorPrimaryBorder: '#E76F51',
            },
        },
    };

    const darkTheme = {
        algorithm: theme.darkAlgorithm,
        token: {
            // Primary colors
            colorPrimary: '#E76F51', // Terracotta
            colorPrimaryHover: '#F18A65', // Terracotta 400
            colorPrimaryActive: '#D85D41', // Terracotta 600
            colorPrimaryBg: '#7A2D1B', // Terracotta 900
            colorPrimaryBgHover: '#943821', // Terracotta 800

            // Secondary colors
            colorSecondary: '#F4A261', // Mustard Yellow

            // Success colors
            colorSuccess: '#83C55C', // Olive 400
            colorSuccessHover: '#B8DEA2',
            colorSuccessBg: '#334B26',
            colorSuccessBorder: '#4F733B',

            // Warning colors
            colorWarning: '#F8C84A', // Saffron 400
            colorWarningHover: '#FDECBF',
            colorWarningBg: '#785C2E',
            colorWarningBorder: '#B88C46',

            // Error colors
            colorError: '#DA6A6A', // Rust 400
            colorErrorHover: '#F2CACA',
            colorErrorBg: '#5C2223',
            colorErrorBorder: '#8D3536',

            // Info colors
            colorInfo: '#1FE9E3', // Sage 400
            colorInfoHover: '#99FDFC',
            colorInfoBg: '#134A44',
            colorInfoBorder: '#175A52',

            // Text colors
            colorText: '#FFF5E1', // Cream
            colorTextSecondary: '#CFCAC5', // Warm 300
            colorTextTertiary: '#ADA59D', // Warm 400
            colorTextQuaternary: '#7A706E', // Warm 500

            // Background colors
            colorBgContainer: '#3D3735', // Warm 900
            colorBgElevated: '#4A4341', // Warm 800
            colorBgLayout: '#2E2E2E', // Deep Charcoal
            colorBgSpotlight: '#5C5452', // Warm 700
            colorBgMask: 'rgba(0, 0, 0, 0.65)',

            // Border colors
            colorBorder: '#5C5452', // Warm 700
            colorBorderSecondary: '#4A4341', // Warm 800

            // Fill colors
            colorFill: '#5C5452', // Warm 700
            colorFillSecondary: '#4A4341', // Warm 800
            colorFillTertiary: '#3D3735', // Warm 900
            colorFillQuaternary: '#2E2E2E', // Charcoal 500

            // Component specific
            controlHeight: 40,
            controlHeightSM: 32,
            controlHeightLG: 48,
            borderRadius: 8,
            borderRadiusLG: 12,
            borderRadiusSM: 6,

            // Remove all blue references
            colorLink: '#1FE9E3', // Sage 400 instead of blue
            colorLinkHover: '#66F7F5',
            colorLinkActive: '#99FDFC',
        },
        components: {
            Button: {
                primaryShadow: '0 2px 8px rgba(231, 111, 81, 0.25)',
                defaultShadow: '0 2px 4px rgba(92, 84, 82, 0.3)',
                colorPrimaryBg: '#E76F51',
                colorPrimaryBgHover: '#F18A65',
                colorPrimaryBorder: '#E76F51',
                colorPrimaryBorderHover: '#F18A65',
                colorPrimaryHover: '#F18A65',
                colorPrimaryActive: '#D85D41',
                defaultBg: '#3D3735',
                defaultBorderColor: '#5C5452',
                defaultColor: '#FFF5E1',
                defaultHoverBg: '#4A4341',
                defaultHoverBorderColor: '#E76F51',
                defaultHoverColor: '#E76F51',
            },
            Input: {
                colorBgContainer: '#3D3735',
                colorBorder: '#5C5452',
                colorBorderHover: '#E76F51',
                colorPrimaryHover: '#E76F51',
                colorPrimaryBorder: '#E76F51',
                activeBorderColor: '#E76F51',
                activeShadow: '0 0 0 2px rgba(231, 111, 81, 0.15)',
                hoverBorderColor: '#E76F51',
                colorText: '#FFF5E1',
                colorTextPlaceholder: '#CFCAC5',
            },
            Card: {
                colorBgContainer: '#3D3735',
                colorBorderSecondary: '#5C5452',
                headerBg: '#3D3735',
                headerHeight: 56,
            },
            Menu: {
                itemSelectedBg: 'rgba(231, 111, 81, 0.2)',
                itemSelectedColor: '#E76F51',
                itemHoverBg: 'rgba(231, 111, 81, 0.1)',
                itemHoverColor: '#E76F51',
                itemActiveBg: 'rgba(231, 111, 81, 0.25)',
                colorBgContainer: '#3D3735',
                colorText: '#FFF5E1',
                colorTextSecondary: '#CFCAC5',
            },
            Table: {
                headerBg: '#4A4341',
                headerColor: '#FFF5E1',
                colorBgContainer: '#3D3735',
                colorText: '#FFF5E1',
                colorTextSecondary: '#CFCAC5',
                borderColor: '#5C5452',
                rowHoverBg: '#4A4341',
            },
            Tabs: {
                inkBarColor: '#E76F51',
                itemSelectedColor: '#E76F51',
                itemHoverColor: '#E76F51',
                itemActiveColor: '#E76F51',
                colorText: '#CFCAC5',
            },
            Progress: {
                defaultColor: '#E76F51',
                remainingColor: '#5C5452',
            },
            Tag: {
                defaultBg: '#4A4341',
                defaultColor: '#FFF5E1',
                colorBorder: '#5C5452',
            },
            Select: {
                colorBgContainer: '#3D3735',
                colorBorder: '#5C5452',
                colorBorderHover: '#E76F51',
                colorPrimaryHover: '#E76F51',
                optionSelectedBg: 'rgba(231, 111, 81, 0.2)',
                optionSelectedColor: '#E76F51',
                optionActiveBg: 'rgba(231, 111, 81, 0.1)',
            },
            Checkbox: {
                colorPrimary: '#E76F51',
                colorPrimaryHover: '#F18A65',
                colorPrimaryBorder: '#E76F51',
            },
            Radio: {
                colorPrimary: '#E76F51',
                colorPrimaryHover: '#F18A65',
                colorPrimaryBorder: '#E76F51',
            },
        },
    };

    return (
        <ConfigProvider theme={isDark ? darkTheme : lightTheme}>
            {children}
        </ConfigProvider>
    );
};

export default ThemeProvider;
