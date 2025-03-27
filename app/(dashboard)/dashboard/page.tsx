import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default async function Home() {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-2 row-start-2 items-center">
                <h2 className="text-4xl font-bold mb-4">Dashboard</h2>
                <Link href="/" className="flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    Back Home
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
