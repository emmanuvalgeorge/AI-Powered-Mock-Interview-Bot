import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  TrendingUp, 
  User, 
  Play,
  Eye,
  Brain,
  LogOut,
  Award,
  Target,
  Clock
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface DashboardPageProps {
  onNavigate: (page: string) => void;
}

const performanceData = [
  { name: 'Mon', score: 65 },
  { name: 'Tue', score: 72 },
  { name: 'Wed', score: 68 },
  { name: 'Thu', score: 78 },
  { name: 'Fri', score: 82 },
  { name: 'Sat', score: 85 },
  { name: 'Sun', score: 88 },
];

export function DashboardPage({ onNavigate }: DashboardPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-violet-50 to-purple-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl">InterviewAI</span>
        </div>

        <nav className="space-y-2 flex-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-blue-50 to-violet-50 text-violet-700 transition-colors">
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </button>
          <button 
            onClick={() => onNavigate("resume")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
          >
            <FileText className="w-5 h-5" />
            <span>Resume Upload</span>
          </button>
          <button 
            onClick={() => onNavigate("interview")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
          >
            <MessageSquare className="w-5 h-5" />
            <span>Mock Interview</span>
          </button>
          <button 
            onClick={() => onNavigate("feedback")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
          >
            <TrendingUp className="w-5 h-5" />
            <span>Feedback</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors">
            <User className="w-5 h-5" />
            <span>Profile</span>
          </button>
        </nav>

        <button 
          onClick={() => onNavigate("landing")}
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors mt-4"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl mb-2">Welcome back, Alex! 👋</h1>
          <p className="text-gray-600">Here's your interview preparation progress</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-white border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 mb-1">Total Interviews</p>
                <p className="text-3xl">24</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <p className="text-sm text-green-600 mt-4">+3 this week</p>
          </Card>

          <Card className="p-6 bg-white border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 mb-1">Average Score</p>
                <p className="text-3xl">85%</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center">
                <Award className="w-6 h-6 text-violet-600" />
              </div>
            </div>
            <p className="text-sm text-green-600 mt-4">+12% improvement</p>
          </Card>

          <Card className="p-6 bg-white border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 mb-1">Practice Hours</p>
                <p className="text-3xl">18h</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <p className="text-sm text-green-600 mt-4">5h this week</p>
          </Card>

          <Card className="p-6 bg-white border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 mb-1">Goals Achieved</p>
                <p className="text-3xl">12</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <Target className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-sm text-green-600 mt-4">3 left this month</p>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Performance Chart */}
          <Card className="lg:col-span-2 p-6 bg-white border-gray-200">
            <div className="mb-6">
              <h2 className="text-2xl mb-2">Performance Trends</h2>
              <p className="text-gray-600">Your progress over the last 7 days</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px' 
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="url(#colorGradient)" 
                  strokeWidth={3}
                  dot={{ fill: '#8b5cf6', r: 5 }}
                />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6 bg-white border-gray-200 space-y-4">
            <div className="mb-4">
              <h2 className="text-2xl mb-2">Quick Actions</h2>
              <p className="text-gray-600">Start practicing now</p>
            </div>

            <Button 
              className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 justify-start h-auto py-4"
              onClick={() => onNavigate("interview")}
            >
              <Play className="w-5 h-5 mr-3" />
              <div className="text-left">
                <div>Start Interview</div>
                <div className="text-xs text-blue-100">Begin a new mock session</div>
              </div>
            </Button>

            <Button 
              variant="outline" 
              className="w-full justify-start h-auto py-4 bg-white"
              onClick={() => onNavigate("feedback")}
            >
              <Eye className="w-5 h-5 mr-3" />
              <div className="text-left">
                <div>View Feedback</div>
                <div className="text-xs text-gray-500">Review past performances</div>
              </div>
            </Button>

            <Button 
              variant="outline" 
              className="w-full justify-start h-auto py-4 bg-white"
              onClick={() => onNavigate("resume")}
            >
              <FileText className="w-5 h-5 mr-3" />
              <div className="text-left">
                <div>Upload Resume</div>
                <div className="text-xs text-gray-500">Analyze your skills</div>
              </div>
            </Button>
          </Card>

          {/* Current Goals */}
          <Card className="lg:col-span-2 p-6 bg-white border-gray-200">
            <div className="mb-6">
              <h2 className="text-2xl mb-2">Current Goals</h2>
              <p className="text-gray-600">Track your learning objectives</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span>Communication Skills</span>
                  <span className="text-sm text-gray-600">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span>Technical Knowledge</span>
                  <span className="text-sm text-gray-600">72%</span>
                </div>
                <Progress value={72} className="h-2" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span>Confidence Level</span>
                  <span className="text-sm text-gray-600">90%</span>
                </div>
                <Progress value={90} className="h-2" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span>Problem Solving</span>
                  <span className="text-sm text-gray-600">68%</span>
                </div>
                <Progress value={68} className="h-2" />
              </div>
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="p-6 bg-white border-gray-200">
            <div className="mb-6">
              <h2 className="text-2xl mb-2">Recent Activity</h2>
              <p className="text-gray-600">Your latest sessions</p>
            </div>

            <div className="space-y-4">
              <div className="flex gap-3 p-3 rounded-lg bg-blue-50 border border-blue-100">
                <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="mb-1">Technical Interview</p>
                  <p className="text-sm text-gray-600">Score: 88% • 2 hours ago</p>
                </div>
              </div>

              <div className="flex gap-3 p-3 rounded-lg bg-violet-50 border border-violet-100">
                <div className="w-10 h-10 rounded-lg bg-violet-600 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="mb-1">Resume Updated</p>
                  <p className="text-sm text-gray-600">New skills added • 1 day ago</p>
                </div>
              </div>

              <div className="flex gap-3 p-3 rounded-lg bg-purple-50 border border-purple-100">
                <div className="w-10 h-10 rounded-lg bg-purple-600 flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="mb-1">Achievement Unlocked</p>
                  <p className="text-sm text-gray-600">10 interviews completed</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
