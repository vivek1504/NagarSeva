import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { MessageCircle, Sparkles } from "lucide-react";

export function ChatBotWidget() {
    const navigate = useNavigate();
    const location = useLocation();

    // Don't show the widget on the chat page itself
    if (location.pathname === "/chat") {
        return null;
    }

    const handleClick = () => {
        navigate("/chat");
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Floating Action Button */}
            <button
                onClick={handleClick}
                className="group relative w-14 h-14 rounded-full bg-gradient-to-br from-primary to-blue-600 text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 hover:scale-105 flex items-center justify-center"
                aria-label="Open Seva Assistant"
            >
                <div className="absolute inset-0 flex items-center justify-center">
                    <MessageCircle className="w-6 h-6" />
                </div>

                {/* Sparkle indicator */}
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                    <Sparkles className="w-3 h-3 text-white" />
                </div>

                {/* Pulse Animation Ring */}
                <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping opacity-75" />

                {/* Tooltip */}
                <span className="absolute right-full mr-3 px-3 py-1.5 bg-slate-900 dark:bg-slate-700 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    Seva Assistant
                </span>
            </button>
        </div>
    );
}

export default ChatBotWidget;
