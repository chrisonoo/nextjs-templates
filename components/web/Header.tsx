"use client";

import { useState } from "react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { AuthNav } from "@/components/auth/AuthNav";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetClose,
    SheetTitle,
} from "@/components/ui/sheet";

interface HeaderProps {
    className?: string;
}

export function Header({ className }: HeaderProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 w-full p-4 md:p-8 flex justify-end items-center z-10",
                className
            )}
        >
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
                <ThemeToggle />
                <AuthNav />
            </div>

            {/* Mobile Navigation */}
            <div className="flex md:hidden">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="p-0 border-l">
                        <div className="flex flex-col h-full">
                            <div className="flex items-center justify-between p-4 border-b">
                                <SheetTitle className="text-lg font-semibold">
                                    Menu
                                </SheetTitle>
                                <SheetClose className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                                    <span className="sr-only">Close</span>
                                </SheetClose>
                            </div>
                            <nav className="flex flex-col p-4 space-y-4">
                                <AuthNav
                                    isMobile
                                    onMobileNavClose={() => setIsOpen(false)}
                                />
                            </nav>
                            <div className="mt-auto p-4 border-t">
                                <div className="flex items-center justify-between">
                                    <span>Theme</span>
                                    <ThemeToggle />
                                </div>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}
