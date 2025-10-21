import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Brain, MessageSquare, TrendingUp, Sparkles, CheckCircle, Target } from "lucide-react";

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-violet-50 to-purple-50">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl">InterviewAI</span>
        </div>
        <Button variant="outline" onClick={() => onNavigate("login")}>
          Sign In
        </Button>
      </nav>

      {/* Hero Section */}
      <section className="px-8 py-20 max-w-7xl mx-auto">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-violet-200">
            <Sparkles className="w-4 h-4 text-violet-600" />
            <span className="text-sm text-violet-700">Powered by Advanced AI Technology</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl tracking-tight bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
            AI-Powered Mock Interview Bot
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Master your interview skills with personalized AI coaching. Practice realistic interviews, 
            get instant feedback, and land your dream job with confidence.
          </p>
          
          <div className="flex gap-4 justify-center pt-4">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700"
              onClick={() => onNavigate("login")}
            >
              Start Mock Interview
            </Button>
            <Button size="lg" variant="outline">
              Watch Demo
            </Button>
          </div>

          {/* Hero Image */}
          <div className="pt-12">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
              <img 
                src="https://images.unsplash.com/photo-1758520144426-edf40a58f299?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMGludGVydmlld3xlbnwxfHx8fDE3NjEwNjcxMTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Professional Interview"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-8 py-20 max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl">Why Choose InterviewAI?</h2>
          <p className="text-xl text-gray-600">
            Everything you need to ace your next interview
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-8 space-y-4 bg-white/60 backdrop-blur-sm border-gray-200 hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <MessageSquare className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl">AI-Generated Questions</h3>
            <p className="text-gray-600">
              Practice with thousands of real interview questions tailored to your role and industry. 
              Our AI adapts to your experience level and provides relevant scenarios.
            </p>
            <ul className="space-y-2 pt-2">
              <li className="flex items-center gap-2 text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Industry-specific questions
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Behavioral & technical scenarios
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Adaptive difficulty levels
              </li>
            </ul>
          </Card>

          <Card className="p-8 space-y-4 bg-white/60 backdrop-blur-sm border-gray-200 hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center">
              <Target className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl">Personalized Feedback</h3>
            <p className="text-gray-600">
              Get detailed analysis of your answers with actionable insights. Understand your strengths 
              and areas for improvement with AI-powered evaluation.
            </p>
            <ul className="space-y-2 pt-2">
              <li className="flex items-center gap-2 text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Instant AI analysis
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Communication tips
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Answer structure guidance
              </li>
            </ul>
          </Card>

          <Card className="p-8 space-y-4 bg-white/60 backdrop-blur-sm border-gray-200 hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
              <TrendingUp className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl">Performance Insights</h3>
            <p className="text-gray-600">
              Track your progress over time with comprehensive analytics. Visualize improvement 
              across different skill areas and stay motivated.
            </p>
            <ul className="space-y-2 pt-2">
              <li className="flex items-center gap-2 text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Performance metrics
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Progress tracking
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Skill gap analysis
              </li>
            </ul>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-8 py-20 max-w-7xl mx-auto">
        <Card className="p-12 bg-gradient-to-br from-blue-600 to-violet-600 border-0 text-white text-center space-y-6">
          <h2 className="text-4xl text-white">Ready to Ace Your Interview?</h2>
          <p className="text-xl text-blue-50 max-w-2xl mx-auto">
            Join thousands of job seekers who have improved their interview skills and landed their dream jobs.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-violet-600 hover:bg-gray-100"
            onClick={() => onNavigate("login")}
          >
            Get Started for Free
          </Button>
        </Card>
      </section>

      {/* Footer */}
      <footer className="px-8 py-8 max-w-7xl mx-auto border-t border-gray-200">
        <div className="text-center text-gray-600">
          <p>© 2025 InterviewAI. Train Smarter. Interview Better.</p>
        </div>
      </footer>
    </div>
  );
}
