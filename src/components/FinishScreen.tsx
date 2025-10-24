import { Button } from "@/components/ui/button";
import { RefreshCw, Trophy, Target } from "lucide-react";

interface FinishScreenProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

const FinishScreen = ({ score, totalQuestions, onRestart }: FinishScreenProps) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  const getPerformanceMessage = () => {
    if (percentage === 100) return "Perfect Score! 🎉";
    if (percentage >= 80) return "Excellent Work! 🌟";
    if (percentage >= 60) return "Good Job! 👏";
    if (percentage >= 40) return "Keep Practicing! 💪";
    return "Try Again! 📚";
  };

  const getPerformanceColor = () => {
    if (percentage >= 80) return "text-success";
    if (percentage >= 60) return "text-primary";
    return "text-destructive";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 animate-fade-in">
      <div className="w-full max-w-2xl text-center space-y-8">
        {/* Trophy icon */}
        <div className="flex justify-center animate-scale-in">
          <div className="p-8 rounded-full bg-primary/10">
            <Trophy className="w-20 h-20 text-primary" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2 animate-scale-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
            Quiz Complete!
          </h1>
          <p className={`text-2xl md:text-3xl font-semibold ${getPerformanceColor()}`}>
            {getPerformanceMessage()}
          </p>
        </div>

        {/* Score display */}
        <div className="bg-card rounded-3xl p-8 md:p-12 shadow-[0_4px_16px_rgba(0,0,0,0.08)] space-y-6 animate-scale-in">
          <div className="flex items-center justify-center gap-3 text-muted-foreground">
            <Target className="w-6 h-6" />
            <p className="text-lg font-medium">Your Score</p>
          </div>
          
          <div className="space-y-2">
            <p className="text-6xl md:text-7xl font-bold text-primary">
              {score}/{totalQuestions}
            </p>
            <p className="text-2xl font-semibold text-foreground">
              {percentage}% Correct
            </p>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
            <div
              className={`h-3 rounded-full transition-all duration-1000 ${
                percentage >= 80 ? "bg-success" : percentage >= 60 ? "bg-primary" : "bg-destructive"
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="p-4 bg-success/10 rounded-xl">
              <p className="text-sm text-muted-foreground mb-1">Correct</p>
              <p className="text-2xl font-bold text-success">{score}</p>
            </div>
            <div className="p-4 bg-destructive/10 rounded-xl">
              <p className="text-sm text-muted-foreground mb-1">Incorrect</p>
              <p className="text-2xl font-bold text-destructive">{totalQuestions - score}</p>
            </div>
          </div>
        </div>

        {/* Restart button */}
        <div className="pt-4 animate-scale-in">
          <Button
            onClick={onRestart}
            size="lg"
            className="px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            <RefreshCw className="mr-2 h-5 w-5" />
            Start New Quiz
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FinishScreen;
