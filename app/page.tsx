import Image from "next/image";
import { tipsService } from "@/services";
import Link from "next/link";

export default async function Home() {
    const tips = await tipsService.getAll();

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <Image
                    className="dark:invert"
                    src="/next.svg"
                    alt="Next.js logo"
                    width={180}
                    height={38}
                    priority
                />
                <div className="bg-black/5 dark:bg-white/5 p-4 rounded-lg border border-black/10 dark:border-white/10">
                    <h2 className="text-base font-semibold mb-2">
                        Improved Database Connections
                    </h2>
                    <p className="text-sm mb-2">This application now uses:</p>
                    <ul className="list-disc list-inside text-sm space-y-1">
                        <li>Connection pool for efficient data queries</li>
                        <li>
                            On-demand connections for migrations and admin tasks
                        </li>
                        <li>
                            Proper connection management following best
                            practices
                        </li>
                    </ul>
                </div>
                <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
                    {tips.map((tip) => (
                        <li
                            key={tip.id}
                            className="mb-2 tracking-[-.01em]"
                            dangerouslySetInnerHTML={{ __html: tip.content }}
                        />
                    ))}
                </ol>

                <div className="flex w-full gap-4 justify-center items-center flex-col sm:flex-row">
                    <Link
                        className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
                        href="/api/hello"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Image
                            className="dark:invert"
                            src="/api.svg"
                            alt="API logomark"
                            width={24}
                            height={24}
                        />
                        Hello
                    </Link>
                    <Link
                        className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
                        href="/api/tips"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Image
                            className="dark:invert"
                            src="/api.svg"
                            alt="API logomark"
                            width={24}
                            height={24}
                        />
                        Tips
                    </Link>
                    <Link
                        className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center gap-2 hover:bg-[#444141] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto"
                        href="/link"
                    >
                        <Image
                            className="dark:invert"
                            src="/link.svg"
                            alt="Link logomark"
                            width={24}
                            height={24}
                        />
                        Link
                    </Link>
                </div>
            </main>
        </div>
    );
}
