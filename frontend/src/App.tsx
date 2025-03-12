
import { Route, Routes } from "react-router-dom";

import AuthCallbackPage from "./pages/auth-callback/AuthCallbackPage.tsx";
import HomePage from "./pages/home/HomePage.tsx";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import MainLayout from "./layout/MainLayout.tsx";
import ChatPage from "./pages/chat/ChatPage.tsx";
import AlbumPage from "./pages/album/AlbumPage.tsx"
function App() {
    return (

        <Routes>

            <Route path="/auth-callback" element={<AuthCallbackPage />} />
            <Route path="/sso-callback" element={<AuthenticateWithRedirectCallback signUpForceRedirectUrl={"/auth-callback"} />} />
            <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/albums/:albumId" element={<AlbumPage />} />


            </Route>
        </Routes>
    );
}

export default App
