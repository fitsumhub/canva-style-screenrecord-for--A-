import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import QuizScreen from "@/components/QuizScreen";
import FinishScreen from "@/components/FinishScreen";
import { questions as defaultQuestions } from "@/data/questions";
import { Book, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Question } from "@/data/questions";

const Index = () => {
  const [questions, setQuestions] = useState<Question[]>(defaultQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  // Load questions from localStorage or use default
  useEffect(() => {
    const savedQuestions = localStorage.getItem('quiz-questions');
    if (savedQuestions) {
      setQuestions(JSON.parse(savedQuestions));
    } else {
      setQuestions(defaultQuestions);
      localStorage.setItem('quiz-questions', JSON.stringify(defaultQuestions));
    }
  }, []);

  const handleNextQuestion = (selectedAnswer: number) => {
    setUserAnswers([...userAnswers, selectedAnswer]);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsQuizFinished(true);
    }
  };

  const calculateScore = () => {
    return userAnswers.reduce((score, answer, index) => {
      return answer === questions[index].correctAnswer ? score + 1 : score;
    }, 0);
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setIsQuizFinished(false);
  };

  if (isQuizFinished) {
    return (
      <FinishScreen
        score={calculateScore()}
        totalQuestions={questions.length}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <>
      {/* Title header */}
      <div className="fixed top-0 left-0 right-0 bg-card/80 backdrop-blur-sm border-b border-border z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold text-primary">A+</h1>
            </div>
            <Link to="/admin">
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Admin
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="fixed top-16 left-0 right-0 z-10">
        <div className="w-full bg-secondary h-1">
          <div
            className="bg-primary h-1 transition-all duration-500"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Quiz content */}
      <div className="pt-20">
        <QuizScreen
          question={questions[currentQuestionIndex]}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={questions.length}
          onNext={handleNextQuestion}
        />
      </div>
    </>
  );
};

export default Index;
