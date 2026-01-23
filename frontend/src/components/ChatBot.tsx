import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Send,
  Bot,
  User,
  Loader2,
  Sparkles,
  MessageSquare,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const API_BASE_URL = "https://sql-agent-vmc.onrender.com";

export function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setIsTyping(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/ask?question=${encodeURIComponent(userMessage.content)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();

      // Extract the actual text content from the API response
      // API returns: { result: { content: "...", ... }, question: "..." }
      const responseContent = typeof data === 'string'
        ? data
        : data?.result?.content || data?.result || data?.content || JSON.stringify(data);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responseContent,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "Sorry, I encountered an error while processing your request. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Page Header */}
      <div className="flex-shrink-0 mb-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg shadow-primary/25">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground">Seva Assistant</h1>
            <p className="text-muted-foreground mt-1">
              Ask questions about civic issues, wards, engineers, and survey data
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Online
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 flex flex-col bg-slate-50 dark:bg-slate-950/50 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-6">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[40vh] text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/20 to-blue-500/20 flex items-center justify-center">
                  <MessageSquare className="w-10 h-10 text-primary" />
                </div>
                <div className="absolute -top-2 -right-2 w-7 h-7 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                How can I help you today?
              </h2>
              <p className="text-muted-foreground max-w-md mb-6">
                I'm your Seva Assistant. Ask me anything about civic issues,
                wards, engineers, and survey data.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
                {[
                  "How many open issues are there?",
                  "Show me issues by ward",
                  "List all engineers",
                  "What are the recent potholes reported?",
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setInput(suggestion)}
                    className="px-4 py-3 text-sm text-left text-muted-foreground hover:text-foreground bg-white dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 transition-all duration-200 hover:shadow-md hover:scale-[1.02]"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-4 animate-in slide-in-from-bottom-4 duration-300",
                    message.role === "user" ? "flex-row-reverse" : "",
                  )}
                >
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    {message.role === "assistant" ? (
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg shadow-primary/20">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center shadow-lg">
                        <User className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={cn(
                      "flex-1 max-w-[80%]",
                      message.role === "user" ? "flex flex-col items-end" : "",
                    )}
                  >
                    <div
                      className={cn(
                        "rounded-2xl px-4 py-3 shadow-sm",
                        message.role === "user"
                          ? "bg-gradient-to-br from-primary to-blue-600 text-white rounded-tr-md"
                          : "bg-white dark:bg-slate-800 text-foreground border border-slate-200/80 dark:border-slate-700 rounded-tl-md",
                      )}
                    >
                      {message.role === "user" ? (
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">
                          {message.content}
                        </p>
                      ) : (
                        <div className="prose prose-sm dark:prose-invert max-w-none prose-headings:font-semibold prose-headings:text-foreground prose-p:my-1 prose-ul:my-1 prose-ol:my-1 prose-li:my-0.5 prose-table:my-2 prose-th:p-2 prose-td:p-2 prose-th:border prose-td:border prose-th:border-slate-300 prose-td:border-slate-300 dark:prose-th:border-slate-600 dark:prose-td:border-slate-600 prose-th:bg-slate-100 dark:prose-th:bg-slate-700 prose-table:border-collapse prose-table:w-full prose-strong:text-foreground">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {message.content}
                          </ReactMarkdown>
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground mt-1.5 px-1">
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex gap-4 animate-in slide-in-from-bottom-4 duration-300">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg shadow-primary/20">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-white dark:bg-slate-800 rounded-2xl rounded-tl-md px-4 py-3 border border-slate-200/80 dark:border-slate-700 shadow-sm">
                    <div className="flex items-center gap-1.5">
                      <div
                        className="w-2 h-2 rounded-full bg-primary/60 animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      />
                      <div
                        className="w-2 h-2 rounded-full bg-primary/60 animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <div
                        className="w-2 h-2 rounded-full bg-primary/60 animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="flex-shrink-0 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
          <form onSubmit={handleSubmit} className="flex items-end gap-3">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about civic issues, wards, engineers..."
                rows={1}
                className="w-full resize-none bg-slate-100 dark:bg-slate-800 border-0 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/30 focus:outline-none placeholder:text-muted-foreground max-h-32"
                style={{
                  height: "auto",
                  minHeight: "48px",
                }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = "auto";
                  target.style.height = `${Math.min(target.scrollHeight, 128)}px`;
                }}
              />
            </div>
            <Button
              type="submit"
              size="icon"
              disabled={!input.trim() || isLoading}
              className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-lg shadow-primary/25 transition-all duration-200 hover:shadow-xl hover:shadow-primary/30 disabled:opacity-50 disabled:shadow-none"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </Button>
          </form>
          <p className="text-xs text-center text-muted-foreground mt-3">
            Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
}

export default ChatBot;
