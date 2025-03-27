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
            </main>
        </div>
    );
}
