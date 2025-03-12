import { SignedIn, SignedOut, SignOutButton } from '@clerk/clerk-react'
import { LayoutDashboardIcon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom';
import SignInOAuthButtons from './SignInOAuthButtons';

function TopBar() {
    const isAdmin = true;
    return (
        <div className="flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 backdrop-blur-md z-10">
            <div className="flex gap-2 items-center">
                BeatConnect
            </div>
            <div className="flex items-center gap-4">
                {isAdmin && (
                    <Link to={"/admin"}>
                        <LayoutDashboardIcon className="size-4 mr-2" />
                        Admin Dashboard
                    </Link>
                )}
                <SignedOut>
                    <SignInOAuthButtons />
                </SignedOut>
                <SignedIn>
                    <SignOutButton />
                </SignedIn>
            </div>

        </div>
    )
}

export default TopBar