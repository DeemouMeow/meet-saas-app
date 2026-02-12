import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { APP_ROUTES } from "@/lib/routes";

type SocialProvider = "google" | "github";

const socialLogin = (provider: SocialProvider) => {
    return function () {
        authClient.signIn.social({
            provider,
            callbackURL: APP_ROUTES.dashbaord
        });  
    }
};

const githubLogin = socialLogin("github");
const googleLogin = socialLogin("google");

export default function Social() {
    return (
        <div className="flex flex-col space-y-4 mt-4">
            <div className="relative text-center text-sm after:border-border after:absolute after:insert-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="relative text-muted-foreground z-10 px-2">
                    Or continue with
                </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <Button
                    onClick={googleLogin}
                    type="button"
                    variant="outline" 
                    className="w-full"
                >
                    Google
                </Button>
                <Button
                    onClick={githubLogin}
                    type="button"
                    variant="outline" 
                    className="w-full"
                >
                    GitHub
                </Button>
            </div>
        </div>
    );
}