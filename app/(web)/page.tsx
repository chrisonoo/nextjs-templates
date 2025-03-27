import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-2 row-start-2 items-center">
                <Image
                    className="dark:invert mb-4"
                    src="/next.svg"
                    alt="Next.js logo"
                    width={180}
                    height={38}
                    priority
                />
                <Link href="/dashboard" className="flex items-center gap-2">
                    Dashboard
                    <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                    href="/api/tips"
                    target="_blank"
                    className="flex items-center gap-2"
                >
                    API Tips
                    <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                    href="/api/tips/1"
                    target="_blank"
                    className="flex items-center gap-2"
                >
                    API Tip 1
                    <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                    href="/api/hello"
                    target="_blank"
                    className="flex items-center gap-2"
                >
                    API Hello
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </main>
        </div>
    );
}
