"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronLeft,
  PlayCircle,
  FileText,
  Download,
  CheckCircle2,
  Lock,
  Menu,
  X,
  HelpCircle,
  Box,
  Bot,
  Sparkles,
  Send,
  Volume2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { mockCourses, mockLessons, mockLessonContent, mockMaterials, mockQuiz } from "@/lib/mock-data";
import { Quiz } from "@/components/lessons/Quiz";
import { ThreeDViewer } from "@/components/ui/ThreeDViewer";
import { saveProgress } from "@/lib/api";
import { toast } from "sonner";

export default function LessonDetailPage({
  params,
}: {
  params: Promise<{ id: string; lessonId: string }>;
}) {
  const { id, lessonId } = use(params);
  
  const course = mockCourses.find((c) => c.id === id);
  const lessons = course?.id === "c1"
    ? mockLessons
    : Array.from({ length: course?.lessonCount || 0 }, (_, i) => ({
        id: `${course?.id}-l${i + 1}`,
        title: `Bài ${i + 1}: Nội dung bài học ${i + 1}`,
        titleEn: `Lesson ${i + 1}: Lesson content ${i + 1}`,
        description: `Mô tả ngắn cho bài học ${i + 1}`,
        descriptionEn: `Short description`,
        order: i + 1,
        duration: "20 phút",
        courseId: course?.id || "",
        isLocked: i > 2,
        isCompleted: i < 2,
        threeDModelType: course?.id === "c2" ? "solar_system" : course?.id === "c9" ? "atom" : course?.subject === "science" ? "dna" : "icosahedron"
      }));
      
  const lesson = lessons.find((l) => l.id === lessonId);
  
  const [activeTab, setActiveTab] = useState<"video" | "content" | "threed" | "materials" | "quiz">("video");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [isLessonCompleted, setIsLessonCompleted] = useState(lesson?.isCompleted || false);
  const [videoCheckpointActive, setVideoCheckpointActive] = useState(false);
  const [aiInput, setAiInput] = useState("");
  const [aiChat, setAiChat] = useState<{ role: "user" | "assistant"; text: string }[]>([
    { role: "assistant", text: `Xin chào! Tôi là Trợ lý AI SmartExplorer. Bạn có thắc mắc gì về bài học "${lesson?.title}" không?` }
  ]);

  if (!course || !lesson) {
    notFound();
  }

  const completedCount = lessons.filter((l) => l.isCompleted || (l.id === lessonId && isLessonCompleted)).length;
  const progressPercent = Math.round((completedCount / lessons.length) * 100);

  const tabs = [
    { id: "video" as const, label: "Video Bài Giảng", icon: PlayCircle },
    { id: "content" as const, label: "Lý Thuyết", icon: FileText },
    { id: "threed" as const, label: "Mô Hình 3D", icon: Box },
    { id: "materials" as const, label: "Tài Liệu", icon: Download },
    { id: "quiz" as const, label: "Bài Tập", icon: HelpCircle },
  ];

  const handleCompleteLesson = async () => {
    setIsLessonCompleted(true);
    await saveProgress({ userId: "u1", lessonId: lesson.id, status: "COMPLETED" });
    toast.success("Đã ghi nhận hoàn thành bài học! Tiến độ của bạn đã được lưu.");
  };

  const handleSendAi = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!aiInput.trim()) return;
    const userMsg = aiInput;
    setAiChat((prev) => [...prev, { role: "user", text: userMsg }]);
    setAiInput("");
    setTimeout(() => {
      setAiChat((prev) => [
        ...prev,
        {
          role: "assistant",
          text: `Về câu hỏi "${userMsg}" liên quan tới bài học ${lesson.title}: Các phép tính phân số cần chú ý quy đồng mẫu số trước. Công thức chính: a/c + b/c = (a+b)/c.`
        }
      ]);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col pt-16">
      {/* Top Navbar for Lesson */}
      <div className="sticky top-16 z-30 flex items-center justify-between px-4 py-3 bg-card/95 backdrop-blur-md border-b border-border">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <Link href={`/courses/${course.id}`} className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Trở về khóa học</span>
          </Link>
          <Separator orientation="vertical" className="h-6 hidden sm:block" />
          <h1 className="text-sm font-semibold truncate max-w-[180px] sm:max-w-md">
            {lesson.title}
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Tiến trình:</span>
            <span className="font-bold text-blue-600 dark:text-blue-400">{progressPercent}%</span>
          </div>
          <Button
            size="sm"
            onClick={handleCompleteLesson}
            className={`${isLessonCompleted ? "bg-emerald-600 hover:bg-emerald-700" : "bg-blue-600 hover:bg-blue-700"} text-white font-medium`}
          >
            {isLessonCompleted ? <CheckCircle2 className="w-4 h-4 mr-1.5" /> : null}
            {isLessonCompleted ? "Đã hoàn thành" : "Hoàn thành bài học"}
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsAiOpen(!isAiOpen)}
            className="rounded-xl border-blue-500/30 text-blue-600 dark:text-blue-400 bg-blue-500/10 hover:bg-blue-500/20"
            title="Trợ lý AI Hỗ trợ"
          >
            <Bot className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar (Lessons List) */}
        <aside className={`absolute lg:static inset-y-0 left-0 z-20 w-80 bg-muted/30 border-r border-border transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} flex flex-col`}>
          <div className="p-4 border-b border-border bg-card">
            <h2 className="font-bold text-foreground line-clamp-2">{course.title}</h2>
            <div className="mt-4 h-2 rounded-full bg-border overflow-hidden">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">{completedCount}/{lessons.length} bài hoàn thành</p>
          </div>
          
          <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
            {lessons.map((l) => {
              const isCurrent = l.id === lessonId;
              const isDone = l.isCompleted || (l.id === lessonId && isLessonCompleted);
              return (
                <Link 
                  key={l.id} 
                  href={l.isLocked ? "#" : `/courses/${course.id}/lessons/${l.id}`}
                  className={`flex items-start gap-3 p-3 rounded-xl transition-all ${
                    isCurrent 
                      ? "bg-blue-500/10 border-blue-500/30 border text-blue-700 dark:text-blue-400 font-medium" 
                      : l.isLocked 
                        ? "opacity-50 cursor-not-allowed hover:bg-transparent"
                        : "hover:bg-muted"
                  }`}
                  onClick={(e) => {
                    if (l.isLocked) e.preventDefault();
                    if (window.innerWidth < 1024) setIsSidebarOpen(false);
                  }}
                >
                  <div className="mt-0.5">
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ) : l.isLocked ? (
                      <Lock className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <PlayCircle className={`w-4 h-4 ${isCurrent ? "text-blue-500" : "text-muted-foreground"}`} />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm leading-snug">
                      {l.title}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{l.duration}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-background p-4 lg:p-8">
          <div className="max-w-4xl mx-auto">
            {/* Tabs Header */}
            <div className="flex overflow-x-auto items-center gap-2 rounded-xl border border-border bg-muted/30 p-1 mb-8 scrollbar-hide">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
                      activeTab === tab.id
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Tab: Video */}
            {activeTab === "video" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black relative shadow-2xl border border-border/50 group">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button 
                      size="lg" 
                      onClick={() => setVideoCheckpointActive(!videoCheckpointActive)}
                      className="rounded-full w-16 h-16 bg-blue-600/90 hover:bg-blue-600 hover:scale-105 transition-all shadow-xl"
                    >
                      <PlayCircle className="w-8 h-8 ml-1 text-white" />
                    </Button>
                  </div>

                  {/* Interactive Video Checkpoint Popup */}
                  {videoCheckpointActive && (
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-20 flex items-center justify-center p-6 animate-in fade-in zoom-in-95">
                      <div className="bg-card border border-border p-6 rounded-2xl max-w-md w-full text-center">
                        <div className="inline-flex p-2 bg-blue-500/10 text-blue-500 rounded-full mb-3">
                          <Sparkles className="w-6 h-6" />
                        </div>
                        <h4 className="font-bold text-lg mb-2">Câu hỏi kiểm tra nhanh (04:20)</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          Phân số nào dưới đây là phân số tối giản của 4/8?
                        </p>
                        <div className="space-y-2 mb-4">
                          {["2/4", "1/2", "3/6"].map((opt, idx) => (
                            <button
                              key={idx}
                              onClick={() => {
                                toast.success("Chính xác! 4/8 rút gọn thành 1/2.");
                                setVideoCheckpointActive(false);
                              }}
                              className="w-full p-3 text-sm rounded-xl border border-border bg-muted/40 hover:bg-blue-500/10 hover:border-blue-500/40 text-left transition-all font-medium"
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Mock Video Control Bar */}
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                    <div className="h-1 bg-white/30 rounded-full w-full mb-3 cursor-pointer">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 w-1/3 rounded-full relative">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow" />
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-white text-xs font-medium">
                      <div className="flex items-center gap-3">
                        <PlayCircle className="w-4 h-4 cursor-pointer" />
                        <Volume2 className="w-4 h-4 cursor-pointer" />
                        <span>04:20 / 20:00</span>
                      </div>
                      <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] font-bold">1080p HD</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 bg-blue-500/10 text-blue-600 rounded-full text-xs font-semibold">Bài {lesson.order}</span>
                    <span className="text-xs text-muted-foreground font-medium">{lesson.duration}</span>
                  </div>
                  <h2 className="text-2xl font-bold mb-2 text-foreground">{lesson.title}</h2>
                  <p className="text-muted-foreground leading-relaxed">{lesson.description}</p>
                </div>
              </div>
            )}

            {/* Tab: Content (Theory) */}
            {activeTab === "content" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl">
                <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
                  <div className="prose prose-blue dark:prose-invert max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: mockLessonContent.contentVi.replace(/\n/g, '<br/>').replace(/## (.*?)<br\/>/g, '<h2 class="text-xl font-bold text-foreground mt-4 mb-2">$1</h2>').replace(/### (.*?)<br\/>/g, '<h3 class="text-lg font-bold text-foreground mt-3 mb-1">$1</h3>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                  </div>
                </div>
              </div>
            )}

            {/* Tab: 3D Model Explorer */}
            {activeTab === "threed" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-xl">
                  <div className="aspect-video w-full relative bg-slate-950">
                    <ThreeDViewer modelType={(lesson as any).threeDModelType || "sphere"} />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-1">Mô hình 3D tương tác bài học</h3>
                    <p className="text-sm text-muted-foreground">Sử dụng chuột trái để xoay 360°, cuộn chuột để phóng to/thu nhỏ vật thể.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Materials */}
            {activeTab === "materials" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h3 className="text-xl font-bold mb-6">Tài liệu đính kèm</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {mockMaterials.map(material => (
                    <div key={material.id} className="flex items-center p-4 border border-border rounded-2xl bg-card hover:border-blue-500/50 hover:shadow-md transition-all group">
                      <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mr-4 text-blue-600 shrink-0">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm truncate group-hover:text-blue-600 transition-colors">{material.title}</h4>
                        <p className="text-xs text-muted-foreground mt-0.5">{material.type} • PDF (1.2 MB)</p>
                      </div>
                      <Button variant="ghost" size="icon" className="shrink-0 text-muted-foreground group-hover:text-blue-600">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Quiz */}
            {activeTab === "quiz" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Quiz quiz={mockQuiz} />
              </div>
            )}
          </div>
        </main>

        {/* Floating AI Assistant Drawer */}
        {isAiOpen && (
          <aside className="w-80 border-l border-border bg-card flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-sm">
                <Bot className="w-5 h-5 text-blue-500" />
                Trợ lý AI Bài Học
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsAiOpen(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
              {aiChat.map((msg, i) => (
                <div key={i} className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`p-3 rounded-xl max-w-[85%] ${msg.role === "user" ? "bg-blue-600 text-white" : "bg-muted text-foreground"}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendAi} className="p-3 border-t border-border flex gap-2">
              <input
                type="text"
                placeholder="Hỏi AI về bài học..."
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                className="flex-1 text-xs bg-muted/50 border border-border rounded-xl px-3 py-2 focus:outline-none"
              />
              <Button type="submit" size="icon" className="bg-blue-600 text-white rounded-xl h-8 w-8">
                <Send className="w-3.5 h-3.5" />
              </Button>
            </form>
          </aside>
        )}
      </div>
    </div>
  );
}
