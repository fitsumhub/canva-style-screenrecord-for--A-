import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { ArrowLeft, Plus, Edit, Trash2, Book, Settings } from "lucide-react";
import { Question } from "@/data/questions";

interface QuestionFormData {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const Admin = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [formData, setFormData] = useState<QuestionFormData>({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
    explanation: ""
  });

  // Load questions from localStorage or use default
  useEffect(() => {
    const savedQuestions = localStorage.getItem('quiz-questions');
    if (savedQuestions) {
      setQuestions(JSON.parse(savedQuestions));
    } else {
      // Import default questions
      import('@/data/questions').then((module) => {
        setQuestions(module.questions);
        localStorage.setItem('quiz-questions', JSON.stringify(module.questions));
      });
    }
  }, []);

  const saveQuestions = (newQuestions: Question[]) => {
    setQuestions(newQuestions);
    localStorage.setItem('quiz-questions', JSON.stringify(newQuestions));
  };

  const handleAddQuestion = () => {
    const newQuestion: Question = {
      id: Math.max(...questions.map(q => q.id), 0) + 1,
      ...formData
    };
    const updatedQuestions = [...questions, newQuestion];
    saveQuestions(updatedQuestions);
    resetForm();
    setIsAddDialogOpen(false);
  };

  const handleEditQuestion = () => {
    if (!editingQuestion) return;
    
    const updatedQuestions = questions.map(q => 
      q.id === editingQuestion.id 
        ? { ...editingQuestion, ...formData }
        : q
    );
    saveQuestions(updatedQuestions);
    resetForm();
    setIsEditDialogOpen(false);
    setEditingQuestion(null);
  };

  const handleDeleteQuestion = (id: number) => {
    const updatedQuestions = questions.filter(q => q.id !== id);
    saveQuestions(updatedQuestions);
  };

  const resetForm = () => {
    setFormData({
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
      explanation: ""
    });
  };

  const openEditDialog = (question: Question) => {
    setEditingQuestion(question);
    setFormData({
      question: question.question,
      options: [...question.options],
      correctAnswer: question.correctAnswer,
      explanation: question.explanation
    });
    setIsEditDialogOpen(true);
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Quiz
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold text-primary">A+</h1>
              </div>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Question
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Question</DialogTitle>
                  <DialogDescription>
                    Create a new question for the quiz.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="question">Question</Label>
                    <Textarea
                      id="question"
                      value={formData.question}
                      onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                      placeholder="Enter the question..."
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Answer Options</Label>
                    <div className="space-y-2 mt-2">
                      {formData.options.map((option, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input
                            value={option}
                            onChange={(e) => updateOption(index, e.target.value)}
                            placeholder={`Option ${index + 1}`}
                            className="flex-1"
                          />
                          <Button
                            type="button"
                            variant={formData.correctAnswer === index ? "default" : "outline"}
                            size="sm"
                            onClick={() => setFormData({ ...formData, correctAnswer: index })}
                          >
                            Correct
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="explanation">Explanation</Label>
                    <Textarea
                      id="explanation"
                      value={formData.explanation}
                      onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
                      placeholder="Enter explanation for the correct answer..."
                      className="mt-1"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddQuestion}>
                    Add Question
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Questions Management</h2>
          <p className="text-muted-foreground">
            Manage quiz questions. You can add, edit, or delete questions.
          </p>
        </div>

        <div className="grid gap-4">
          {questions.map((question) => (
            <Card key={question.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{question.question}</CardTitle>
                    <CardDescription className="mt-2">
                      {question.options.map((option, index) => (
                        <div key={index} className="flex items-center gap-2 mb-1">
                          <Badge variant={index === question.correctAnswer ? "default" : "secondary"}>
                            {String.fromCharCode(65 + index)}
                          </Badge>
                          <span className={index === question.correctAnswer ? "font-medium" : ""}>
                            {option}
                          </span>
                        </div>
                      ))}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(question)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Question</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this question? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteQuestion(question.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  <strong>Explanation:</strong> {question.explanation}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {questions.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Book className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Questions Yet</h3>
              <p className="text-muted-foreground text-center mb-4">
                Start by adding your first question to create the quiz.
              </p>
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add First Question
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Question</DialogTitle>
            <DialogDescription>
              Update the question details.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-question">Question</Label>
              <Textarea
                id="edit-question"
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                placeholder="Enter the question..."
                className="mt-1"
              />
            </div>
            <div>
              <Label>Answer Options</Label>
              <div className="space-y-2 mt-2">
                {formData.options.map((option, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={option}
                      onChange={(e) => updateOption(index, e.target.value)}
                      placeholder={`Option ${index + 1}`}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant={formData.correctAnswer === index ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFormData({ ...formData, correctAnswer: index })}
                    >
                      Correct
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="edit-explanation">Explanation</Label>
              <Textarea
                id="edit-explanation"
                value={formData.explanation}
                onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
                placeholder="Enter explanation for the correct answer..."
                className="mt-1"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditQuestion}>
              Update Question
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
