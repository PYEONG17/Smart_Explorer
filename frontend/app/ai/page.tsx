"use client";

import { useState, useRef, useEffect } from "react";
import { mockAIChatHistory, mockAIMessages } from "@/lib/mock-data";
import { Bot, Send, User, Menu, X, PlusCircle, MessageSquare, Sparkles, Copy, Check, Calculator, BookOpen, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const quickPrompts = [
  { icon: Calculator, label: "Giải bài toán hình học lớp 8", query: "Hãy giải từng bước bài toán tính diện tích tam giác cân khi biết cạnh đáy và chiều cao." },
  { icon: Lightbulb, label: "Giải thích Định luật Newton", query: "Giải thích Định luật I Newton về quán tính bằng ví dụ dễ hiểu cho học sinh." },
  { icon: BookOpen, label: "Từ vựng STEM Tiếng Anh", query: "Liệt kê 10 từ vựng tiếng Anh chuyên ngành Toán và Khoa học phổ biến lớp 7 kèm nghĩa." },
];

export default function AIPage() {
  const [messages, setMessages] = useState(mockAIMessages);
  const [inputValue, setInputValue] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    const newUserMsg = {
      id: Date.now().toString(),
      role: "user" as const,
      content: text,
    };

    setMessages((prev) => [...prev, newUserMsg]);
    if (!textToSend) setInputValue("");

    // Generate intelligent STEM response simulation
    setTimeout(() => {
      let aiReply = "Tôi là trợ lý AI SmartExplorer. Tôi luôn sẵn sàng đồng hành cùng bạn!";
      
      if (text.toLowerCase().includes("toán") || text.toLowerCase().includes("phương trình") || text.toLowerCase().includes("hình học")) {
        aiReply = `### 📐 Hướng dẫn giải từng bước:\n\n**Bài toán:** ${text}\n\n1. **Bước 1:** Xác định các đại lượng đã biết và chưa biết.\n2. **Bước 2:** Áp dụng công thức chuẩn:\n   $$S = \\frac{1}{2} \\times a \\times h$$\n3. **Bước 3:** Thay số và rút ra đáp số.\n\n💡 **Ghi nhớ:** Luôn đưa phân số về dạng tối giản sau khi thực hiện phép tính!`;
      } else if (text.toLowerCase().includes("newton") || text.toLowerCase().includes("khoa học") || text.toLowerCase().includes("vật lý")) {
        aiReply = `### 🔬 Giải thích Định luật Newton:\n\n**Định luật I (Quán tính):**\nMột vật sẽ giữ nguyên trạng thái đứng yên hoặc chuyển động thẳng đều nếu không chịu tác dụng của lực nào hoặc tổng hợp lực bằng 0.\n\n*Ví dụ thực tế:* Khi xe buýt phanh gấp, người ngồi trên xe sẽ nẩy về phía trước do quán tính.`;
      } else if (text.toLowerCase().includes("từ vựng") || text.toLowerCase().includes("tiếng anh")) {
        aiReply = `### 🇬🇧 Từ vựng STEM Tiếng Anh cơ bản:\n\n- **Numerator**: Tử số\n- **Denominator**: Mẫu số\n- **Fraction**: Phân số\n- **Equation**: Phương trình\n- **Solar System**: Hệ Mặt Trời`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: aiReply,
        },
      ]);
    }, 900);
  };

  const handleCopy = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    toast.success("Đã sao chép nội dung vào bộ nhớ tạm");
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex h-screen bg-background pt-16 overflow-hidden">
      {/* Sidebar - History */}
      <aside className={`absolute lg:static inset-y-0 left-0 z-20 w-72 bg-card border-r border-border transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} flex flex-col pt-4 lg:pt-0`}>
        <div className="p-4 flex items-center justify-between border-b border-border">
          <Button 
            onClick={() => setMessages([])} 
            className="w-full justify-start gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white rounded-xl shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            Đoạn chat mới
          </Button>
          <Button variant="ghost" size="icon" className="lg:hidden ml-2" onClick={() => setIsSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-3">
          <div className="text-xs font-bold text-muted-foreground mb-3 px-2 uppercase tracking-wider">
            Lịch sử trò chuyện
          </div>
          <div className="space-y-1">
            {mockAIChatHistory.map((chat) => (
              <button
                key={chat.id}
                className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm hover:bg-muted/50 transition-colors text-foreground group"
              >
                <MessageSquare className="w-4 h-4 text-muted-foreground group-hover:text-blue-500 shrink-0" />
                <div className="flex-1 truncate font-medium">{chat.title}</div>
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col relative bg-muted/10">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center p-4 border-b border-border bg-card">
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(true)}>
            <Menu className="w-5 h-5" />
          </Button>
          <div className="ml-3 font-bold flex items-center gap-2">
            <Bot className="w-5 h-5 text-blue-500" />
            SmartExplorer AI Tutor
          </div>
        </div>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.length === 0 ? (
              <div className="h-[60vh] flex flex-col items-center justify-center text-center px-4">
                <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-4 text-blue-500">
                  <Bot className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold mb-2 text-foreground">Trợ lý học tập STEM AI</h2>
                <p className="text-muted-foreground max-w-md text-sm mb-8">
                  Hỏi bất kỳ điều gì về môn Toán, Khoa học, từ vựng STEM hoặc bài tập trên lớp.
                </p>

                {/* Quick Prompts */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-2xl">
                  {quickPrompts.map((prompt, idx) => {
                    const Icon = prompt.icon;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(prompt.query)}
                        className="p-4 rounded-2xl border border-border bg-card hover:border-blue-500/40 hover:shadow-md transition-all text-left group"
                      >
                        <Icon className="w-5 h-5 text-blue-500 mb-2 group-hover:scale-110 transition-transform" />
                        <div className="font-semibold text-xs text-foreground">{prompt.label}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`w-9 h-9 shrink-0 rounded-full flex items-center justify-center font-bold ${
                    msg.role === "user" 
                      ? "bg-blue-600 text-white shadow-md" 
                      : "bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md"
                  }`}>
                    {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  
                  <div className={`relative group max-w-[85%] md:max-w-[78%] rounded-2xl px-5 py-4 ${
                    msg.role === "user" 
                      ? "bg-blue-600 text-white rounded-tr-sm" 
                      : "bg-card border border-border shadow-sm rounded-tl-sm text-foreground"
                  }`}>
                    {msg.role === "assistant" && (
                      <button
                        onClick={() => handleCopy(msg.content, msg.id)}
                        className="absolute top-3 right-3 p-1.5 text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Sao chép"
                      >
                        {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    )}

                    <div 
                      className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: msg.content
                          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                          .replace(/### (.*?)\n/g, '<h4 class="font-bold text-base text-foreground mt-1 mb-2">$1</h4>')
                          .replace(/```([\s\S]*?)```/g, '<pre class="bg-muted p-3 rounded-xl font-mono text-xs overflow-x-auto my-2 border border-border"><code>$1</code></pre>')
                      }}
                    />
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 md:p-6 bg-gradient-to-t from-background via-background to-transparent pt-8">
          <div className="max-w-3xl mx-auto relative">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} 
              className="relative flex items-center shadow-xl rounded-2xl overflow-hidden border border-border bg-card"
            >
              <textarea
                className="w-full max-h-36 min-h-[56px] resize-none bg-transparent py-4 pl-4 pr-14 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none scrollbar-hide"
                placeholder="Hỏi AI bất kỳ bài toán hoặc khái niệm STEM nào..."
                rows={1}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <Button 
                type="submit" 
                size="icon" 
                className={`absolute right-2 bottom-2 rounded-xl transition-all ${
                  inputValue.trim() ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-muted text-muted-foreground"
                }`}
                disabled={!inputValue.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
            <div className="text-center mt-2 text-[11px] text-muted-foreground">
              SmartExplorer AI có thể cung cấp gợi ý giải bài tập. Hãy kiểm tra lại kết quả.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
