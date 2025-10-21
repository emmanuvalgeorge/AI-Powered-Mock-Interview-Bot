import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { 
  Brain,
  ArrowLeft,
  TrendingUp,
  MessageSquare,
  Award,
  Lightbulb,
  CheckCircle2,
  AlertCircle,
  Download,
  Share2
} from "lucide-react";
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

interface FeedbackPageProps {
  onNavigate: (page: string) => void;
}

const skillsData = [
  { skill: 'Communication', score: 85 },
  { skill: 'Technical', score: 78 },
  { skill: 'Confidence', score: 90 },
  { skill: 'Clarity', score: 82 },
  { skill: 'Problem Solving', score: 76 },
];

const questionsData = [
  { question: 'Q1', score: 88 },
  { question: 'Q2', score: 82 },
  { question: 'Q3', score: 90 },
  { question: 'Q4', score: 78 },
  { question: 'Q5', score: 85 },
];

export function FeedbackPage({ onNavigate }: FeedbackPageProps) {
  const overallScore = 85;

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
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span>Performance Feedback</span>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" className="bg-white">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" className="bg-white">
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Overall Score Banner */}
        <Card className="p-8 bg-gradient-to-br from-blue-600 to-violet-600 border-0 text-white">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Award className="w-8 h-8" />
                <h1 className="text-3xl text-white">Great Performance!</h1>
              </div>
              <p className="text-blue-100">
                Mock Interview Session • Completed on October 21, 2025
              </p>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-2">{overallScore}%</div>
              <p className="text-blue-100">Overall Score</p>
            </div>
          </div>
        </Card>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 bg-white border-gray-200">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gray-600 mb-1">Communication</p>
                <p className="text-3xl">85/100</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <Progress value={85} className="h-2 mb-2" />
            <p className="text-sm text-green-600">Excellent verbal expression</p>
          </Card>

          <Card className="p-6 bg-white border-gray-200">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gray-600 mb-1">Technical Score</p>
                <p className="text-3xl">78/100</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center">
                <Brain className="w-6 h-6 text-violet-600" />
              </div>
            </div>
            <Progress value={78} className="h-2 mb-2" />
            <p className="text-sm text-blue-600">Good technical knowledge</p>
          </Card>

          <Card className="p-6 bg-white border-gray-200">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gray-600 mb-1">Confidence Level</p>
                <p className="text-3xl">90/100</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <Progress value={90} className="h-2 mb-2" />
            <p className="text-sm text-green-600">Very confident delivery</p>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Skills Radar Chart */}
          <Card className="p-6 bg-white border-gray-200">
            <h2 className="text-2xl mb-2">Skills Analysis</h2>
            <p className="text-gray-600 mb-6">Your performance across different competencies</p>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={skillsData}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="skill" tick={{ fill: '#6b7280' }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#6b7280' }} />
                <Radar
                  name="Score"
                  dataKey="score"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </Card>

          {/* Questions Bar Chart */}
          <Card className="p-6 bg-white border-gray-200">
            <h2 className="text-2xl mb-2">Question-by-Question Breakdown</h2>
            <p className="text-gray-600 mb-6">Individual scores for each question</p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={questionsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="question" stroke="#9ca3af" />
                <YAxis domain={[0, 100]} stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="score" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* AI Feedback */}
        <Card className="p-6 bg-white border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl">AI-Generated Feedback</h2>
              <p className="text-gray-600">Personalized insights from your interview session</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Strengths */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <h3 className="text-xl">Strengths</h3>
              </div>
              <div className="space-y-3 pl-7">
                <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                  <p className="mb-1">Excellent Communication Skills</p>
                  <p className="text-sm text-gray-600">
                    You demonstrated strong verbal communication throughout the interview. Your answers were well-structured 
                    and easy to follow, showing clear articulation of your thoughts.
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                  <p className="mb-1">High Confidence Level</p>
                  <p className="text-sm text-gray-600">
                    Your confident delivery was impressive. You maintained composure and showed enthusiasm when 
                    discussing your experiences and skills.
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                  <p className="mb-1">STAR Method Application</p>
                  <p className="text-sm text-gray-600">
                    You effectively used the STAR (Situation, Task, Action, Result) method in your behavioral answers, 
                    providing concrete examples from your experience.
                  </p>
                </div>
              </div>
            </div>

            {/* Areas for Improvement */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                <h3 className="text-xl">Areas for Improvement</h3>
              </div>
              <div className="space-y-3 pl-7">
                <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
                  <p className="mb-1">Technical Depth</p>
                  <p className="text-sm text-gray-600">
                    While your technical answers were good, consider diving deeper into the specific technologies and 
                    methodologies you've used. Providing more technical details would strengthen your responses.
                  </p>
                </div>
                <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
                  <p className="mb-1">Answer Length</p>
                  <p className="text-sm text-gray-600">
                    Some answers could be more concise. Aim for 1-2 minute responses that cover key points without 
                    becoming too lengthy or losing focus.
                  </p>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-5 h-5 text-violet-600" />
                <h3 className="text-xl">Recommendations</h3>
              </div>
              <div className="space-y-3 pl-7">
                <div className="p-4 bg-violet-50 rounded-xl border border-violet-100">
                  <p className="mb-1">Practice Technical Scenarios</p>
                  <p className="text-sm text-gray-600">
                    Focus on practicing more technical interview questions to improve your depth of knowledge. 
                    Consider preparing detailed explanations of your past projects.
                  </p>
                </div>
                <div className="p-4 bg-violet-50 rounded-xl border border-violet-100">
                  <p className="mb-1">Prepare Industry-Specific Examples</p>
                  <p className="text-sm text-gray-600">
                    Research common challenges in your target industry and prepare specific examples of how you've 
                    addressed similar situations.
                  </p>
                </div>
                <div className="p-4 bg-violet-50 rounded-xl border border-violet-100">
                  <p className="mb-1">Continue Mock Interviews</p>
                  <p className="text-sm text-gray-600">
                    Regular practice is key to improvement. Schedule 2-3 mock interviews per week to maintain and 
                    enhance your skills.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700"
            onClick={() => onNavigate("interview")}
          >
            Start Another Interview
          </Button>
          <Button 
            size="lg"
            variant="outline"
            className="bg-white"
            onClick={() => onNavigate("dashboard")}
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
