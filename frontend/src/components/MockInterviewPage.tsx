import { useState, useEffect, useRef } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { 
  Brain,
  ArrowLeft,
  Mic,
  Send,
  Loader2,
  CheckCircle2,
  Sparkles,
  Upload,
  FileText,
  X
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
  "I see from your resume you worked as a Senior Software Engineer. Can you tell me about a challenging project from that role?",
  "What technologies and skills from your resume are you most proud of?",
  "How do you handle conflict in a team?",
  "Based on your experience, where do you see yourself in 5 years?",
];

export function MockInterviewPage({ onNavigate }: MockInterviewPageProps) {
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    // Initial AI greeting after resume upload
    if (resumeUploaded) {
      setTimeout(() => {
        setMessages([
          {
            role: "ai",
            content: `Hello! I'm your AI interview coach. I've reviewed your resume and I'm impressed with your background! I'll be conducting your mock interview today based on your experience and skills.\n\nWe'll go through 5 personalized questions. Take your time to think about each answer, and remember - there are no wrong answers in practice!\n\nReady to begin?`,
            timestamp: new Date(),
          },
        ]);
      }, 500);
    }
  }, [resumeUploaded]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const analyzeFile = async (file: File) => {
    setUploadedFileName(file.name);
    console.log("Uploading resume for analysis:", file.name);

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const res = await fetch("http://localhost:5000/api/resume/analyze", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: res.statusText }));
        console.error("Resume analysis error:", err);
        return;
      }

      const data = await res.json();
      console.log("Extracted raw keywords:", data.raw_keywords);
      console.log("Refined skills:", data.skills);
      console.log("Text snippet:", data.text_snippet);

      // now reveal the mock interview flow
      setResumeUploaded(true);
    } catch (err) {
      console.error("Error uploading resume:", err);
    }
  };

 

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      analyzeFile(file);
    }
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    analyzeFile(file);
  }; 

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

  // Show resume upload screen if not uploaded yet
  if (!resumeUploaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-violet-50 to-purple-50">
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
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <span>Upload Resume</span>
              </div>
            </div>
          </div>
        </header>

        {/* Upload Content */}
        <div className="max-w-4xl mx-auto p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl mb-4">Before We Start...</h1>
            <p className="text-xl text-gray-600">
              Upload your resume so I can tailor interview questions to your experience
            </p>
          </div>

          <Card
            className={`p-12 border-2 border-dashed transition-all ${
              isDragging
                ? "border-violet-600 bg-violet-50"
                : "border-gray-300 bg-white"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="text-center space-y-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-100 to-violet-100 flex items-center justify-center mx-auto">
                <Upload className="w-10 h-10 text-violet-600" />
              </div>

              <div>
                <h3 className="text-2xl mb-2">Drag and drop your resume</h3>
                <p className="text-gray-600">or click to browse from your device</p>
              </div>

              <div>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700"
                  onClick={handleFileSelect}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Select Resume
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              <p className="text-sm text-gray-500">
                Supports: PDF, DOC, DOCX • Max size: 10MB
              </p>
            </div>
          </Card>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card className="p-6 bg-white border-gray-200 text-center">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <Brain className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg mb-2">Personalized Questions</h3>
              <p className="text-sm text-gray-600">
                Get interview questions tailored to your specific experience and skills
              </p>
            </Card>

            <Card className="p-6 bg-white border-gray-200 text-center">
              <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-violet-600" />
              </div>
              <h3 className="text-lg mb-2">Relevant Scenarios</h3>
              <p className="text-sm text-gray-600">
                Practice with questions based on your actual job history and roles
              </p>
            </Card>

            <Card className="p-6 bg-white border-gray-200 text-center">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg mb-2">Better Feedback</h3>
              <p className="text-sm text-gray-600">
                Receive more accurate feedback by comparing answers to your background
              </p>
            </Card>
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => onNavigate("dashboard")}
              className="text-gray-600 hover:text-gray-900"
            >
              Skip for now and use generic questions
            </button>
          </div>
        </div>
      </div>
    );
  }

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
            {uploadedFileName && (
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <FileText className="w-3 h-3 mr-1" />
                {uploadedFileName}
              </Badge>
            )}
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
