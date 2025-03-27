"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
    // Don't initialize with any theme yet - we'll set it after checking
    const [theme, setTheme] = useState<"light" | "dark" | null>(null);

    // Load theme on component mount
    useEffect(() => {
        // Check for theme cookie
        const getCookie = (name: string) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop()?.split(";").shift();
            return null;
        };

        const cookieTheme = getCookie("theme");
        // Set theme based on cookie, default to dark
        setTheme(!cookieTheme || cookieTheme === "dark" ? "dark" : "light");
    }, []);

    // Apply theme when it changes
    useEffect(() => {
        // Only proceed if theme is set (not null)
        if (theme === null) return;

        // Set the cookie for server-side rendering
        document.cookie = `theme=${theme};path=/;max-age=31536000`;

        // Apply the theme to the document
        document.documentElement.classList.toggle("dark", theme === "dark");
    }, [theme]);

    /**
     * Toggles between light and dark themes
     */
    function toggleTheme() {
        if (theme !== null) {
            setTheme(theme === "dark" ? "light" : "dark");
        }
    }

    // SVG icon components
    const DarkIcon = () => (
        <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            height="1.5em"
            width="1.5em"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"></path>
        </svg>
    );

    const LightIcon = () => (
        <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            height="1.5em"
            width="1.5em"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 0 0 0-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"></path>
        </svg>
    );

    // Return the appropriate icon based on current theme
    const ThemeIcon = () => {
        // Don't render anything until theme is determined
        if (theme === null) return null;
        return theme === "dark" ? <DarkIcon /> : <LightIcon />;
    };

    return (
        <button
            onClick={toggleTheme}
            className="fixed top-8 right-8 text-gray-800 dark:text-gray-200"
            aria-label="Toggle theme"
            title={`Current theme: ${theme || "loading..."}`}
        >
            <ThemeIcon />
        </button>
    );
}
