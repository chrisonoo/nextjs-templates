"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

interface AuthNavProps {
    isMobile?: boolean;
    onMobileNavClose?: () => void;
}

export function AuthNav({ isMobile = false, onMobileNavClose }: AuthNavProps) {
    const handleSignOut = async () => {
        if (isMobile && onMobileNavClose) {
            onMobileNavClose();
        }
    };

    // TODO: Uncomment this when the admin panel is ready and session is implemented
    // if (session) {
    //     // User is logged in
    //     if (isMobile) {
    //         return (
    //             <>
    //                 <Link
    //                     href="/admin"
    //                     className="flex items-center py-2 px-3 rounded-md hover:bg-muted transition-colors"
    //                     onClick={onMobileNavClose}
    //                 >
    //                     Admin Panel
    //                 </Link>
    //                 <Link
    //                     href="/login"
    //                     className="flex items-center py-2 px-3 rounded-md hover:bg-muted transition-colors"
    //                     onClick={handleSignOut}
    //                 >
    //                     Log Out
    //                 </Link>
    //             </>
    //         );
    //     }

    //     return (
    //         <div className="flex gap-2">
    //             <Button asChild variant="outline" size="sm">
    //                 <Link href="/admin">Admin Panel</Link>
    //             </Button>
    //             <Button variant="outline" size="sm" onClick={handleSignOut}>
    //                 Log Out
    //             </Button>
    //         </div>
    //     );
    // }

    // User is not logged in
    if (isMobile) {
        return (
            <>
                <Link
                    href="/login"
                    className="flex items-center py-2 px-3 rounded-md hover:bg-muted transition-colors"
                    onClick={onMobileNavClose}
                >
                    Login
                </Link>
                <Link
                    href="/signup"
                    className="flex items-center py-2 px-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                    onClick={onMobileNavClose}
                >
                    Sign Up
                </Link>
            </>
        );
    }

    return (
        <div className="flex gap-2">
            <Button asChild variant="outline" size="sm">
                <Link href="/login">Log In</Link>
            </Button>
            <Button asChild size="sm">
                <Link href="/signup">Sign up</Link>
            </Button>
        </div>
    );
}
