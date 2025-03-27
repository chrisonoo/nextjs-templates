"use client";

import { cn } from "@/lib/utils";

export function AuthIllustration({ className }: { className?: string }) {
    return (
        <div
            className={cn(
                "relative w-full h-full bg-muted hidden lg:flex items-center justify-center p-6 overflow-hidden",
                className
            )}
        >
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 800 600"
                xmlns="http://www.w3.org/2000/svg"
                className="max-w-[1000px] max-h-[750px]"
                preserveAspectRatio="xMidYMid meet"
            >
                <rect width="100%" height="100%" fill="transparent" />

                {/* Background Grid Pattern */}
                <path
                    d="M0 0h800v600H0z"
                    fill="url(#grid-pattern)"
                    opacity="0.15"
                />

                {/* Main Computer Shape - Scaled up */}
                <rect
                    x="200"
                    y="120"
                    width="400"
                    height="280"
                    rx="12"
                    fill="#e2e8f0"
                />
                <rect
                    x="212"
                    y="132"
                    width="376"
                    height="256"
                    rx="6"
                    fill="#1e293b"
                />

                {/* Computer Stand - Scaled up and repositioned */}
                <path d="M350 400l100 0l30 60l-160 0z" fill="#94a3b8" />
                <rect
                    x="300"
                    y="460"
                    width="200"
                    height="15"
                    rx="3"
                    fill="#64748b"
                />

                {/* Code on Screen - Scaled up and repositioned */}
                <g className="code-elements">
                    <rect
                        x="240"
                        y="160"
                        width="80"
                        height="12"
                        rx="2"
                        fill="#3b82f6"
                    />
                    <rect
                        x="330"
                        y="160"
                        width="60"
                        height="12"
                        rx="2"
                        fill="#ec4899"
                    />
                    <rect
                        x="400"
                        y="160"
                        width="140"
                        height="12"
                        rx="2"
                        fill="#a855f7"
                    />

                    <rect
                        x="240"
                        y="190"
                        width="60"
                        height="12"
                        rx="2"
                        fill="#ec4899"
                    />
                    <rect
                        x="310"
                        y="190"
                        width="100"
                        height="12"
                        rx="2"
                        fill="#3b82f6"
                    />
                    <rect
                        x="420"
                        y="190"
                        width="50"
                        height="12"
                        rx="2"
                        fill="#84cc16"
                    />

                    <rect
                        x="270"
                        y="220"
                        width="120"
                        height="12"
                        rx="2"
                        fill="#a855f7"
                    />
                    <rect
                        x="400"
                        y="220"
                        width="70"
                        height="12"
                        rx="2"
                        fill="#ec4899"
                    />

                    <rect
                        x="240"
                        y="250"
                        width="90"
                        height="12"
                        rx="2"
                        fill="#84cc16"
                    />
                    <rect
                        x="340"
                        y="250"
                        width="160"
                        height="12"
                        rx="2"
                        fill="#3b82f6"
                    />

                    <rect
                        x="270"
                        y="280"
                        width="130"
                        height="12"
                        rx="2"
                        fill="#ec4899"
                    />
                    <rect
                        x="410"
                        y="280"
                        width="80"
                        height="12"
                        rx="2"
                        fill="#84cc16"
                    />

                    <rect
                        x="240"
                        y="310"
                        width="100"
                        height="12"
                        rx="2"
                        fill="#3b82f6"
                    />
                    <rect
                        x="350"
                        y="310"
                        width="60"
                        height="12"
                        rx="2"
                        fill="#a855f7"
                    />
                    <rect
                        x="420"
                        y="310"
                        width="90"
                        height="12"
                        rx="2"
                        fill="#ec4899"
                    />

                    <rect
                        x="270"
                        y="340"
                        width="140"
                        height="12"
                        rx="2"
                        fill="#84cc16"
                    />
                    <rect
                        x="420"
                        y="340"
                        width="50"
                        height="12"
                        rx="2"
                        fill="#3b82f6"
                    />
                </g>

                {/* Cursor Blinking Animation - Repositioned */}
                <rect
                    x="480"
                    y="340"
                    width="6"
                    height="12"
                    rx="1"
                    fill="#fff"
                    className="cursor-blink"
                />

                {/* CSS Definitions */}
                <defs>
                    <pattern
                        id="grid-pattern"
                        width="20"
                        height="20"
                        patternUnits="userSpaceOnUse"
                    >
                        <path d="M0 0h20v20H0z" fill="none" />
                        <path
                            d="M0 0h1v1H0zM10 0h1v1h-1zM0 10h1v1H0zM10 10h1v1h-1z"
                            fill="#cbd5e1"
                        />
                    </pattern>
                    <style>
                        {`
              .cursor-blink {
                animation: blink 1s step-end infinite;
              }
              @keyframes blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0; }
              }
              
              @media (max-width: 1024px) {
                .code-elements {
                  transform: scale(0.9);
                  transform-origin: center;
                }
              }
            `}
                    </style>
                </defs>
            </svg>
        </div>
    );
}
