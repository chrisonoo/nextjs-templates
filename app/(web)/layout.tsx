import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";
import { Header } from "@/components/web/Header";
import "../globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Next.js Template",
    description: "App and API routes for Next.js",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // Get theme from cookies for server-side rendering
    const cookieStore = await cookies();
    const themeCookie = cookieStore.get("theme");

    // Default to dark theme if no cookie or if cookie value is 'dark'
    const isDarkTheme = !themeCookie || themeCookie.value === "dark";

    // Apply dark theme class by default or based on cookie
    const themeClass = isDarkTheme ? "dark" : "";

    return (
        <html lang="en" className={themeClass}>
            <head></head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black dark:bg-gray-900 dark:text-white`}
            >
                <Header />
                {children}
            </body>
        </html>
    );
}
