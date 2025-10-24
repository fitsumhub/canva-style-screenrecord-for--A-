import { useState } from "react";
import { Question } from "@/data/questions";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, XCircle } from "lucide-react";

interface QuizScreenProps {
  question: Question;
  currentQuestionIndex: number;
  totalQuestions: number;
  onNext: (selectedAnswer: number) => void;
}

const QuizScreen = ({
  question,
  currentQuestionIndex,
  totalQuestions,
  onNext,
}: QuizScreenProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAnswerClick = (index: number) => {
    if (!isAnimating && !showFeedback) {
      setSelectedAnswer(index);
      setShowFeedback(true);
    }
  };

  const handleNext = () => {
    if (selectedAnswer !== null && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        onNext(selectedAnswer);
        setSelectedAnswer(null);
        setShowFeedback(false);
        setIsAnimating(false);
      }, 300);
    }
  };

  const answerLabels = ["A", "B", "C", "D"];
  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 animate-fade-in">
      <div className="w-full max-w-4xl space-y-8">
        {/* Question number badge */}
        <div className="flex justify-center">
          <div className="bg-primary text-primary-foreground px-6 py-2 rounded-full font-semibold text-lg">
            Question {currentQuestionIndex + 1}
          </div>
        </div>

        {/* Question */}
        <div className="text-center animate-scale-in">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-12">
            {question.question}
          </h1>
        </div>

        {/* Answer options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrectAnswer = index === question.correctAnswer;
            const showCorrect = showFeedback && isCorrectAnswer;
            const showIncorrect = showFeedback && isSelected && !isCorrect;

            return (
              <button
                key={index}
                onClick={() => handleAnswerClick(index)}
                disabled={showFeedback}
                className={`
                  relative group p-6 md:p-8 rounded-2xl text-left transition-all duration-300
                  ${
                    showCorrect
                      ? "bg-success text-success-foreground shadow-[0_8px_24px_rgba(0,0,0,0.12)] scale-[1.02]"
                      : showIncorrect
                      ? "bg-destructive text-destructive-foreground shadow-[0_8px_24px_rgba(0,0,0,0.12)] scale-[1.02]"
                      : isSelected && !showFeedback
                      ? "bg-primary text-primary-foreground shadow-[0_8px_24px_rgba(0,0,0,0.12)] scale-[1.02]"
                      : "bg-card text-card-foreground shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:scale-[1.02]"
                  }
                  ${showFeedback ? "cursor-default" : ""}
                `}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`
                      flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold
                      ${
                        showCorrect || showIncorrect
                          ? "bg-white/20 text-white"
                          : isSelected
                          ? "bg-primary-foreground/20 text-primary-foreground"
                          : "bg-primary/10 text-primary"
                      }
                    `}
                  >
                    {answerLabels[index]}
                  </div>
                  <p className="text-lg md:text-xl font-medium flex-1">{option}</p>
                  {showCorrect && <CheckCircle2 className="w-6 h-6 flex-shrink-0" />}
                  {showIncorrect && <XCircle className="w-6 h-6 flex-shrink-0" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation section */}
        {showFeedback && (
          <div className="animate-scale-in">
            <div
              className={`p-6 rounded-2xl ${
                isCorrect
                  ? "bg-success/10 border-2 border-success"
                  : "bg-destructive/10 border-2 border-destructive"
              }`}
            >
              <div className="flex items-start gap-3 mb-3">
                {isCorrect ? (
                  <CheckCircle2 className="w-6 h-6 text-success flex-shrink-0 mt-1" />
                ) : (
                  <XCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
                )}
                <div className="flex-1">
                  <h3 className={`text-xl font-bold mb-2 ${isCorrect ? "text-success" : "text-destructive"}`}>
                    {isCorrect ? "Correct!" : "Incorrect"}
                  </h3>
                  <p className="text-foreground leading-relaxed">{question.explanation}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Next button */}
        <div className="flex justify-center pt-4">
          <Button
            onClick={handleNext}
            disabled={!showFeedback || isAnimating}
            size="lg"
            className="px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentQuestionIndex === totalQuestions - 1 ? "Finish Quiz" : "Next Question"}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizScreen;
