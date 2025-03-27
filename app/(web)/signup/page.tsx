import { SignupForm } from "@/components/auth/SignupForm";
import { AuthIllustration } from "@/components/auth/AuthIllustration"

export default function SignupPage() {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <SignupForm />
                    </div>
                </div>
            </div>
            <div>
                <AuthIllustration />
            </div>
        </div>
    );
}
