"use client";

import { useState, type ComponentProps } from "react";
import { mock3DModels } from "@/lib/mock-data";
import { Box, Search, Maximize2, Play, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThreeDViewer } from "@/components/ui/ThreeDViewer";

export default function ThreeDPage() {
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  const activeModel = mock3DModels.find((m) => m.id === selectedModel);

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-extrabold text-foreground md:text-4xl flex items-center gap-3">
              <Box className="w-8 h-8 text-blue-500" />
              Thư viện 3D
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
              Khám phá thế giới trực quan qua các mô hình 3D tương tác. Xoay,
              phóng to và tìm hiểu cấu trúc chi tiết.
            </p>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Tìm kiếm mô hình..."
              className="w-full pl-10 pr-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
            />
          </div>
        </div>

        {/* 3D Viewer Area (Shows if a model is selected) */}
        {selectedModel && activeModel && (
          <div className="mb-12 rounded-2xl overflow-hidden border border-border bg-card shadow-2xl animate-in fade-in zoom-in-95 duration-500">
            <div className="aspect-video w-full relative bg-gradient-to-br from-slate-900 to-black group">
              {/* Real 3D Canvas Area */}
              <div className="absolute inset-0">
                <ThreeDViewer
                  modelType={
                    activeModel.modelType as ComponentProps<
                      typeof ThreeDViewer
                    >["modelType"]
                  }
                />
              </div>

              {/* Controls */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/50 backdrop-blur-md rounded-full px-4 py-2 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20 rounded-full w-8 h-8"
                >
                  <Play className="w-4 h-4" />
                </Button>
                <div className="w-px h-4 bg-white/20 mx-1" />
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20 rounded-full w-8 h-8"
                >
                  <span className="text-xs font-bold">360°</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20 rounded-full w-8 h-8"
                >
                  <Maximize2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="p-6 bg-card flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge
                    variant="secondary"
                    className="bg-blue-500/10 text-blue-600 border-0 hover:bg-blue-500/20"
                  >
                    {activeModel.category}
                  </Badge>
                </div>
                <h2 className="text-2xl font-bold text-foreground">
                  {activeModel.title}
                </h2>
                <p className="text-muted-foreground mt-1">
                  {activeModel.description}
                </p>
              </div>
              <Button variant="ghost" onClick={() => setSelectedModel(null)}>
                Đóng mô hình
              </Button>
            </div>
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mock3DModels.map((model) => (
            <div
              key={model.id}
              onClick={() => {
                setSelectedModel(model.id);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`group cursor-pointer overflow-hidden rounded-2xl border transition-all duration-300 ${
                selectedModel === model.id
                  ? "border-blue-500 shadow-[0_0_0_4px_rgba(59,130,246,0.1)] ring-1 ring-blue-500"
                  : "border-border hover:border-blue-500/50 hover:shadow-xl hover:-translate-y-1 bg-card"
              }`}
            >
              <div
                className={`aspect-[4/3] bg-gradient-to-br ${model.color} relative overflow-hidden flex items-center justify-center`}
              >
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,white,transparent)]" />
                <Box className="w-16 h-16 text-white/80 group-hover:scale-110 transition-transform duration-500" />

                <div className="absolute top-3 right-3">
                  <Badge className="bg-black/30 backdrop-blur-md text-white border-white/10 hover:bg-black/40">
                    {model.category}
                  </Badge>
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-bold text-foreground text-lg mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {model.title}
                </h3>
                <p className="text-xs text-muted-foreground mb-4">
                  {model.titleEn}
                </p>
                <div className="flex items-center text-sm text-blue-600 dark:text-blue-400 font-medium opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all">
                  <Play className="w-4 h-4 mr-1.5" />
                  Xem mô hình
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
