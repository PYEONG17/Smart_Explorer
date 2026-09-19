"use client";

import { useState } from "react";
import { CheckCircle2, ChevronRight, FileText, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuizQuestion {
  id: string;
  question: string;
  questionEn: string;
  type: "MULTIPLE_CHOICE" | "TRUE_FALSE" | "FILL_IN_BLANK";
  answers: {
    id: string;
    content: string;
    contentEn: string;
    isCorrect: boolean;
  }[];
  explanation?: string;
  explanationEn?: string;
}

interface QuizProps {
  quiz: {
    id: string;
    title: string;
    questions: QuizQuestion[];
  };
}

export function Quiz({ quiz }: QuizProps) {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const question = quiz.questions[currentQuestionIdx];

  const handleSelectAnswer = (answerId: string) => {
    if (showResult) return;
    setSelectedAnswer(answerId);
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;
    
    const isCorrect = question.answers.find(a => a.id === selectedAnswer)?.isCorrect;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentQuestionIdx < quiz.questions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setIsQuizFinished(true);
      const finalPercentage = Math.round((score / quiz.questions.length) * 100);
      if (finalPercentage >= 80) {
        import("canvas-confetti").then((confetti) => {
          confetti.default({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
          });
        });
        import("sonner").then(({ toast }) => {
          toast.success("Tuyệt vời! Bạn đã hoàn thành xuất sắc bài kiểm tra.");
        });
      } else {
        import("sonner").then(({ toast }) => {
          toast.info("Hoàn thành! Hãy xem lại các câu sai để nắm vững kiến thức nhé.");
        });
      }
    }
  };

  if (isQuizFinished) {
    const percentage = Math.round((score / quiz.questions.length) * 100);
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-center max-w-2xl mx-auto">
        <div className="mx-auto w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Hoàn thành bài kiểm tra!</h3>
        <p className="text-muted-foreground mb-6">Bạn đã hoàn thành bài kiểm tra "{quiz.title}"</p>
        
        <div className="flex justify-center items-center gap-4 mb-8">
          <div className="text-center p-4 rounded-xl bg-muted/50 w-32">
            <div className="text-3xl font-bold text-foreground">{score}/{quiz.questions.length}</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Điểm số</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-muted/50 w-32">
            <div className={`text-3xl font-bold ${percentage >= 80 ? 'text-emerald-500' : percentage >= 50 ? 'text-amber-500' : 'text-red-500'}`}>
              {percentage}%
            </div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Độ chính xác</div>
          </div>
        </div>

        <Button onClick={() => {
          setIsQuizFinished(false);
          setCurrentQuestionIdx(0);
          setScore(0);
          setSelectedAnswer(null);
          setShowResult(false);
        }}>
          Làm lại bài kiểm tra
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <h3 className="text-xl font-bold">{quiz.title}</h3>
        <div className="text-sm font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full">
          Câu {currentQuestionIdx + 1} / {quiz.questions.length}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
        <h4 className="text-lg font-medium text-foreground mb-6 leading-relaxed">
          {question.question}
        </h4>

        <div className="space-y-3 mb-8">
          {question.answers.map((answer) => {
            const isSelected = selectedAnswer === answer.id;
            let answerClass = "border-border bg-card hover:bg-muted/50";
            
            if (showResult) {
              if (answer.isCorrect) {
                answerClass = "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400";
              } else if (isSelected && !answer.isCorrect) {
                answerClass = "border-red-500 bg-red-500/10 text-red-700 dark:text-red-400";
              } else {
                answerClass = "border-border bg-card opacity-50";
              }
            } else if (isSelected) {
              answerClass = "border-blue-500 bg-blue-500/10 text-blue-700 dark:text-blue-400";
            }

            return (
              <button
                key={answer.id}
                onClick={() => handleSelectAnswer(answer.id)}
                disabled={showResult}
                className={`w-full text-left p-4 rounded-xl border transition-all ${answerClass}`}
              >
                <div className="flex items-center justify-between">
                  <span>{answer.content}</span>
                  {showResult && answer.isCorrect && <CheckCircle2 className="w-5 h-5" />}
                </div>
              </button>
            );
          })}
        </div>

        {showResult && question.explanation && (
          <div className="mb-8 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-800 dark:text-blue-200 text-sm">
            <span className="font-semibold block mb-1">Giải thích:</span>
            {question.explanation}
          </div>
        )}

        <div className="flex justify-end border-t border-border pt-6">
          {!showResult ? (
            <Button 
              onClick={handleSubmit} 
              disabled={!selectedAnswer}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Kiểm tra
            </Button>
          ) : (
            <Button onClick={handleNext}>
              {currentQuestionIdx < quiz.questions.length - 1 ? 'Câu tiếp theo' : 'Xem kết quả'}
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
