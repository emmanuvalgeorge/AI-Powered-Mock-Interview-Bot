import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { 
  Brain,
  ArrowLeft,
  Mic,
  Send,
  Loader2,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import { Progress } from "./ui/progress";

interface MockInterviewPageProps {
  onNavigate: (page: string) => void;
}

interface Message {
  role: "ai" | "user";
  content: string;
  timestamp: Date;
}

const interviewQuestions = [
  "Tell me about yourself and your background.",
  "Why are you interested in this position?",
  "What are your greatest strengths?",
  "Can you describe a challenging project you worked on?",
  "How do you handle conflict in a team?",
];

export function MockInterviewPage({ onNavigate }: MockInterviewPageProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    // Initial AI greeting
    setTimeout(() => {
      setMessages([
        {
          role: "ai",
          content: "Hello! I'm your AI interview coach. I'll be conducting your mock interview today. We'll go through 5 questions. Take your time to think about each answer, and remember - there are no wrong answers in practice! Ready to begin?",
          timestamp: new Date(),
        },
      ]);
    }, 500);
  }, []);

  const handleStartInterview = () => {
    setIsAiThinking(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: `Great! Let's get started. Question 1 of 5:\n\n${interviewQuestions[0]}`,
          timestamp: new Date(),
        },
      ]);
      setIsAiThinking(false);
    }, 1500);
  };

  const handleSubmitAnswer = () => {
    if (!currentAnswer.trim()) return;

    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: currentAnswer,
        timestamp: new Date(),
      },
    ]);

    setCurrentAnswer("");
    setIsAiThinking(true);

    // Simulate AI processing and next question
    setTimeout(() => {
      const nextIndex = currentQuestionIndex + 1;
      
      if (nextIndex < interviewQuestions.length) {
        setMessages((prev) => [
          ...prev,
          {
            role: "ai",
            content: `Thank you for your answer! Let me analyze that...\n\nGreat response! I can see you've put thought into this. Let's move on to the next question.\n\nQuestion ${nextIndex + 1} of 5:\n\n${interviewQuestions[nextIndex]}`,
            timestamp: new Date(),
          },
        ]);
        setCurrentQuestionIndex(nextIndex);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "ai",
            content: "Excellent work! You've completed all 5 questions. I'm now analyzing your overall performance. Click 'View Feedback' to see your detailed results and personalized improvement suggestions.",
            timestamp: new Date(),
          },
        ]);
      }
      setIsAiThinking(false);
    }, 2000);
  };

  const progress = messages.length > 2 ? (currentQuestionIndex / interviewQuestions.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-violet-50 to-purple-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => onNavigate("dashboard")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="w-px h-6 bg-gray-300" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span>Mock Interview Session</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm text-gray-600">Progress</div>
              <div>{Math.round(progress)}%</div>
            </div>
            {currentQuestionIndex === interviewQuestions.length && (
              <Button 
                className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700"
                onClick={() => onNavigate("feedback")}
              >
                View Feedback
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-2">
        <div className="max-w-7xl mx-auto">
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex max-w-7xl mx-auto w-full p-6 gap-6">
        {/* AI Chat Window */}
        <Card className="flex-1 bg-white border-gray-200 flex flex-col">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl">AI Interview Coach</h2>
                <p className="text-sm text-gray-600">
                  {isAiThinking ? "Analyzing..." : "Online"}
                </p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-auto p-6 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  {message.role === "ai" && (
                    <div className="flex items-center gap-2 mb-2 opacity-70">
                      <Sparkles className="w-4 h-4" />
                      <span className="text-sm">AI Coach</span>
                    </div>
                  )}
                  <p className="whitespace-pre-line">{message.content}</p>
                  <p className={`text-xs mt-2 ${message.role === "user" ? "text-blue-100" : "text-gray-500"}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}

            {isAiThinking && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl px-4 py-3 flex items-center gap-3">
                  <Loader2 className="w-5 h-5 animate-spin text-violet-600" />
                  <span className="text-gray-600">AI is thinking...</span>
                </div>
              </div>
            )}

            {messages.length === 1 && !isAiThinking && (
              <div className="flex justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700"
                  onClick={handleStartInterview}
                >
                  Start Interview
                </Button>
              </div>
            )}
          </div>
        </Card>

        {/* Answer Input Area */}
        <Card className="w-[480px] bg-white border-gray-200 flex flex-col">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl mb-2">Your Answer</h2>
            <p className="text-sm text-gray-600">
              Type or speak your response to the interview question
            </p>
          </div>

          <div className="flex-1 p-6 flex flex-col">
            <Textarea
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              placeholder="Start typing your answer here..."
              className="flex-1 resize-none mb-4 bg-white"
              disabled={messages.length <= 1 || currentQuestionIndex >= interviewQuestions.length}
            />

            <div className="flex gap-3">
              <Button
                variant="outline"
                className={`flex-1 ${isRecording ? "bg-red-50 border-red-300 text-red-600" : "bg-white"}`}
                onClick={() => setIsRecording(!isRecording)}
                disabled={messages.length <= 1 || currentQuestionIndex >= interviewQuestions.length}
              >
                <Mic className={`w-4 h-4 mr-2 ${isRecording ? "animate-pulse" : ""}`} />
                {isRecording ? "Recording..." : "Voice Input"}
              </Button>

              <Button
                className="flex-1 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700"
                onClick={handleSubmitAnswer}
                disabled={!currentAnswer.trim() || messages.length <= 1 || currentQuestionIndex >= interviewQuestions.length}
              >
                <Send className="w-4 h-4 mr-2" />
                Submit Answer
              </Button>
            </div>

            {/* Tips */}
            <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="mb-2">💡 Interview Tips</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Use the STAR method (Situation, Task, Action, Result)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Be specific with examples from your experience</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Take a moment to think before answering</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
