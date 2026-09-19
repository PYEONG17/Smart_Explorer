"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ChevronLeft, Plus, Video, FileText, ExternalLink, Upload, Sparkles, X, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { mockCourses, mockLessons, mockMaterials } from "@/lib/mock-data";
import { createLesson } from "@/lib/api";
import { toast } from "sonner";
import type { MaterialType } from "@/types";
import { VideoUploadModal } from "@/components/lessons/VideoUploadModal";

export default function CourseEditStudioPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const course = mockCourses.find((c) => c.id === id) || {
    id,
    title: "Khóa học STEM Mới Tạo",
    titleEn: "Newly Created STEM Course",
    description: "Khóa học mới được khởi tạo bởi Giáo viên.",
    subject: "math",
    subjectLabel: "Toán học",
    level: "8",
    lessonCount: 4,
    color: "from-blue-600 to-indigo-700",
  };

  const [lessons, setLessons] = useState(mockLessons);
  const [materials, setMaterials] = useState(mockMaterials);

  // Modals state
  const [isAddLessonOpen, setIsAddLessonOpen] = useState(false);
  const [isUploadVideoOpen, setIsUploadVideoOpen] = useState<string | null>(null);
  const [isUploadMaterialOpen, setIsUploadMaterialOpen] = useState<string | null>(null);

  // Form states
  const [newLessonTitle, setNewLessonTitle] = useState("");
  const [newLessonDuration, setNewLessonDuration] = useState("20 phút");

  // Per-lesson video list: { lessonId -> [{title, url}] }
  const [lessonVideos, setLessonVideos] = useState<Record<string, {title: string; url: string}[]>>({});

  const [materialTitle, setMaterialTitle] = useState("");
  const [materialType, setMaterialType] = useState<MaterialType>("PDF");
  const [materialUrl, setMaterialUrl] = useState("");

  const handleAddLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLessonTitle.trim()) return;

    const res = await createLesson({
      courseId: course.id,
      title: newLessonTitle,
      order: lessons.length + 1,
      duration: newLessonDuration,
    });

    if (res.success && res.data) {
      setLessons((prev) => [...prev, res.data as any]);
      setNewLessonTitle("");
      setIsAddLessonOpen(false);
      toast.success("Đã thêm bài học mới vào khóa học!");
    }
  };

  const handleVideoSaved = (lessonId: string, title: string, url: string) => {
    setLessonVideos((prev) => ({
      ...prev,
      [lessonId]: [...(prev[lessonId] || []), { title, url }],
    }));
    setIsUploadVideoOpen(null);
  };

  const handleUploadMaterial = (e: React.FormEvent, lessonId: string) => {
    e.preventDefault();
    if (!materialTitle.trim() || !materialUrl.trim()) return;
    const newMat = {
      id: `m-${Date.now()}`,
      title: materialTitle,
      titleEn: materialTitle,
      type: materialType,
      url: materialUrl,
      lessonId,
    };
    setMaterials((prev) => [...prev, newMat as any]);
    setMaterialTitle("");
    setMaterialUrl("");
    setIsUploadMaterialOpen(null);
    toast.success(`Đã tải lên tài liệu ${materialType} thành công!`);
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex items-center justify-between mb-6">
          <Link 
            href="/teacher" 
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
          >
            <ChevronLeft className="w-4 h-4" />
            Trở về Studio Giáo viên
          </Link>

          <Button variant="outline" size="sm" className="rounded-xl border-border" asChild>
            <Link href={`/courses/${course.id}`} target="_blank">
              <ExternalLink className="w-4 h-4 mr-1.5 text-blue-500" />
              Xem giao diện học sinh
            </Link>
          </Button>
        </div>

        {/* Course Header Card */}
        <div className="rounded-2xl border border-border bg-card p-6 md:p-8 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="bg-blue-500/10 text-blue-600 border-0">
                  {course.subjectLabel || "STEM"}
                </Badge>
                <Badge variant="outline">Lớp {course.level}</Badge>
              </div>
              <h1 className="text-2xl font-extrabold text-foreground">{course.title}</h1>
              <p className="text-sm text-muted-foreground mt-1 max-w-2xl">{course.description}</p>
            </div>

            <Button 
              onClick={() => setIsAddLessonOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md font-semibold shrink-0"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              Thêm bài học mới
            </Button>
          </div>
        </div>

        {/* Add Lesson Modal */}
        {isAddLessonOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-card border border-border p-6 rounded-2xl max-w-md w-full shadow-2xl animate-in zoom-in-95">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">Thêm bài học mới</h3>
                <Button variant="ghost" size="icon" onClick={() => setIsAddLessonOpen(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <form onSubmit={handleAddLesson} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-foreground mb-1 block">Tên bài học</label>
                  <input
                    type="text"
                    placeholder="Ví dụ: Bài 4: Nhân và chia phân số"
                    value={newLessonTitle}
                    onChange={(e) => setNewLessonTitle(e.target.value)}
                    className="w-full px-4 py-2 bg-background border border-border rounded-xl text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground mb-1 block">Thời lượng bài học</label>
                  <input
                    type="text"
                    placeholder="25 phút"
                    value={newLessonDuration}
                    onChange={(e) => setNewLessonDuration(e.target.value)}
                    className="w-full px-4 py-2 bg-background border border-border rounded-xl text-sm focus:outline-none"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <Button variant="ghost" onClick={() => setIsAddLessonOpen(false)}>Hủy</Button>
                  <Button type="submit" className="bg-blue-600 text-white">Thêm bài học</Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Lessons Accordion / List */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground mb-4">Danh sách bài học & Tài liệu đã đính kèm</h2>

          {lessons.map((lesson, idx) => {
            const lessonMats = materials.filter((m) => m.lessonId === lesson.id);
            return (
              <div key={lesson.id} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-600 font-bold text-sm flex items-center justify-center shrink-0">
                      {idx + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground text-base">{lesson.title}</h3>
                      <p className="text-xs text-muted-foreground">{lesson.duration || "20 phút"}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setIsUploadVideoOpen(lesson.id)}
                      className="rounded-xl border-blue-500/30 text-blue-600 hover:bg-blue-500/10 text-xs font-semibold"
                    >
                      <Video className="w-3.5 h-3.5 mr-1" />
                      Upload Video
                    </Button>

                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setIsUploadMaterialOpen(lesson.id)}
                      className="rounded-xl border-purple-500/30 text-purple-600 hover:bg-purple-500/10 text-xs font-semibold"
                    >
                      <Upload className="w-3.5 h-3.5 mr-1" />
                      Upload Tài liệu/PDF
                    </Button>
                  </div>
                </div>

                {/* Video Upload Modal – full drag-and-drop experience */}
                {isUploadVideoOpen === lesson.id && (
                  <VideoUploadModal
                    lessonId={lesson.id}
                    lessonTitle={lesson.title}
                    onClose={() => setIsUploadVideoOpen(null)}
                    onSave={handleVideoSaved}
                  />
                )}

                {/* Attached Videos list */}
                {(lessonVideos[lesson.id] || []).length > 0 && (
                  <div className="mb-4 space-y-1.5">
                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Video đính kèm ({(lessonVideos[lesson.id] || []).length}):</div>
                    {(lessonVideos[lesson.id] || []).map((v, vi) => (
                      <div key={vi} className="flex items-center gap-2 p-2.5 rounded-xl bg-blue-500/5 border border-blue-500/20 text-xs">
                        <PlayCircle className="w-4 h-4 text-blue-500 shrink-0" />
                        <span className="font-semibold text-foreground truncate">{v.title}</span>
                        <a href={v.url} target="_blank" rel="noopener noreferrer" className="ml-auto text-blue-500 hover:underline font-mono text-[10px] truncate max-w-[180px]">{v.url}</a>
                      </div>
                    ))}
                  </div>
                )}

                {/* Upload Material Modal */}
                {isUploadMaterialOpen === lesson.id && (
                  <div className="mb-4 p-4 rounded-xl bg-purple-500/5 border border-purple-500/20 text-xs animate-in fade-in">
                    <h4 className="font-bold text-sm mb-2 text-purple-600 flex items-center gap-1.5">
                      <Upload className="w-4 h-4" /> Upload Tài liệu PDF / File 3D cho "{lesson.title}"
                    </h4>
                    <form onSubmit={(e) => handleUploadMaterial(e, lesson.id)} className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="Tên tài liệu (ví dụ: Tóm tắt lý thuyết PDF)"
                          value={materialTitle}
                          onChange={(e) => setMaterialTitle(e.target.value)}
                          className="w-full px-3 py-2 bg-background border border-border rounded-xl"
                        />
                        <select
                          value={materialType}
                          onChange={(e: any) => setMaterialType(e.target.value)}
                          className="w-full px-3 py-2 bg-background border border-border rounded-xl font-medium"
                        >
                          <option value="PDF">Tài liệu PDF</option>
                          <option value="DOCUMENT">Tài liệu DOCX</option>
                          <option value="MODEL_3D">Mô hình 3D (GLTF/OBJ)</option>
                          <option value="OTHER">Tài liệu khác</option>
                        </select>
                      </div>
                      <input
                        type="text"
                        placeholder="Đường dẫn URL File tài liệu (https://example.com/document.pdf)"
                        value={materialUrl}
                        onChange={(e) => setMaterialUrl(e.target.value)}
                        className="w-full px-3 py-2 bg-background border border-border rounded-xl"
                      />
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => setIsUploadMaterialOpen(null)}>Hủy</Button>
                        <Button type="submit" size="sm" className="bg-purple-600 text-white">Upload Tài Liệu</Button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Attached Materials list */}
                <div className="space-y-2">
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Tài liệu đã đính kèm ({lessonMats.length}):</div>
                  {lessonMats.length === 0 ? (
                    <div className="text-xs text-muted-foreground italic py-1">Chưa có tài liệu đính kèm cho bài học này.</div>
                  ) : (
                    lessonMats.map((m) => (
                      <div key={m.id} className="flex items-center justify-between p-2.5 rounded-xl bg-muted/30 border border-border text-xs">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-blue-500" />
                          <span className="font-semibold text-foreground">{m.title}</span>
                          <span className="px-2 py-0.5 bg-blue-500/10 text-blue-600 rounded text-[10px] font-bold">{m.type}</span>
                        </div>
                        <span className="text-muted-foreground font-mono">{m.url}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
