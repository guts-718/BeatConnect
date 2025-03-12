import { Card, CardContent } from '@/components/ui/card';
import { axiosInstance } from '@/lib/axios';
import { useUser } from '@clerk/clerk-react';
import { Loader } from 'lucide-react';
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function AuthCallbackPage() {
    const { isLoaded, user } = useUser();
    const navigate = useNavigate();
    const syncAttempted = useRef(false);
    // to make sure that the useEffect does not run twice in development mode...

    useEffect(() => {
        if (!isLoaded || !user || syncAttempted.current) return; // Ensure user is loaded before running the effect

        const syncUser = async () => {
            try {
                syncAttempted.current = true;
                await axiosInstance.post("/auth/callback", {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    imageUrl: user.imageUrl
                });
            } catch (error) {
                console.error("Error in auth callback", error);
            } finally {
                navigate("/");
            }
        };

        syncUser();
    }, [isLoaded, user, navigate]);

    return (
        <div className="h-screen w-full bg-black flex items-center justify-center">
            <Card className="w-[90%] max-w-md bg-zinc-900 border-zinc-800">
                <CardContent className="flex flex-col items-center justify-center gap-4 p-6">
                    <Loader className="size-6 text-emerald-500 animate-spin" />
                    <h3 className="text-zinc-400 text-xl font-bold">Logging you in</h3>
                    <p className="text-zinc-400 text-sm">Redirecting...</p>
                </CardContent>
            </Card>
        </div>
    );
}

export default AuthCallbackPage;
