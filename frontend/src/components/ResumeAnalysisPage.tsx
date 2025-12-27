import { useState, useRef } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  Brain,
  ArrowLeft,
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  GraduationCap,
  Code,
  TrendingUp,
  Download
} from "lucide-react";
import { Progress } from "./ui/progress";

interface ResumeAnalysisPageProps {
  onNavigate: (page: string) => void;
}

export function ResumeAnalysisPage({ onNavigate }: ResumeAnalysisPageProps) {
  const [isUploaded, setIsUploaded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const uploadResume = async (file: File) => {
    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await fetch(
        "http://localhost:5000/api/resume/analyze",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to analyze resume");
      }

      const data = await response.json();
      console.log("Extracted skills:", data.skills);

    // later: store in state and render nicely
    } catch (error) {
      console.error(error);
    }
  };


  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      uploadResume(file);
      setIsUploaded(true);
    }
  };

  const handleFileSelect = () => {
    setIsUploaded(true);
  };

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
              <span>Resume Analysis</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        {!isUploaded ? (
          /* Upload Section */
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl mb-4">Upload Your Resume</h1>
              <p className="text-xl text-gray-600">
                Get AI-powered insights and recommendations to improve your resume
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
                  <input
                    type="file"
                    accept=".pdf"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={(e) => {
                    if (e.target.files?.[0]) {
                      uploadResume(e.target.files[0]);
                      setIsUploaded(true);
                    }
                    e.target.value = "";
                  }}
                  />
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Select File
                  </Button>
                </div>

                <p className="text-sm text-gray-500">
                  Supports: PDF, DOC, DOCX • Max size: 10MB
                </p>
              </div>
            </Card>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <Card className="p-6 bg-white border-gray-200 text-center">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg mb-2">AI Analysis</h3>
                <p className="text-sm text-gray-600">
                  Advanced AI reviews your resume and provides detailed feedback
                </p>
              </Card>

              <Card className="p-6 bg-white border-gray-200 text-center">
                <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center mx-auto mb-4">
                  <Code className="w-6 h-6 text-violet-600" />
                </div>
                <h3 className="text-lg mb-2">Skills Extraction</h3>
                <p className="text-sm text-gray-600">
                  Automatically identifies your skills and experience level
                </p>
              </Card>

              <Card className="p-6 bg-white border-gray-200 text-center">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg mb-2">Gap Analysis</h3>
                <p className="text-sm text-gray-600">
                  Highlights missing skills and suggests improvements
                </p>
              </Card>
            </div>
          </div>
        ) : (
          /* Analysis Results */
          <div className="space-y-6">
            {/* Success Banner */}
            <Card className="p-6 bg-gradient-to-r from-green-500 to-emerald-500 border-0 text-white">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-2xl text-white mb-1">Resume Analysis Complete!</h2>
                  <p className="text-green-50">
                    Your resume has been successfully analyzed. Here are the results.
                  </p>
                </div>
              </div>
            </Card>

            {/* Overall Score */}
            <Card className="p-6 bg-white border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl mb-2">Resume Score</h2>
                  <p className="text-gray-600">Overall quality and completeness</p>
                </div>
                <div className="text-center">
                  <div className="text-5xl mb-2 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                    82%
                  </div>
                  <p className="text-gray-600">Good</p>
                </div>
              </div>
              <Progress value={82} className="h-3" />
            </Card>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Extracted Information */}
              <Card className="p-6 bg-white border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl">Work Experience</h2>
                    <p className="text-sm text-gray-600">Extracted from resume</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-start justify-between mb-2">
                      <p>Senior Software Engineer</p>
                      <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Current</Badge>
                    </div>
                    <p className="text-sm text-gray-600">Tech Corp Inc. • 2022 - Present</p>
                    <p className="text-sm text-gray-700 mt-2">
                      Led development of cloud-based applications, managed team of 5 engineers
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="mb-2">Software Engineer</p>
                    <p className="text-sm text-gray-600">StartupXYZ • 2020 - 2022</p>
                    <p className="text-sm text-gray-700 mt-2">
                      Full-stack development, implemented CI/CD pipelines
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="mb-2">Junior Developer</p>
                    <p className="text-sm text-gray-600">Digital Agency • 2018 - 2020</p>
                    <p className="text-sm text-gray-700 mt-2">
                      Web development, client projects
                    </p>
                  </div>
                </div>
              </Card>

              {/* Education */}
              <Card className="p-6 bg-white border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-violet-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl">Education</h2>
                    <p className="text-sm text-gray-600">Academic background</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="mb-2">Bachelor of Science in Computer Science</p>
                    <p className="text-sm text-gray-600">University of Technology • 2014 - 2018</p>
                    <p className="text-sm text-gray-700 mt-2">GPA: 3.8/4.0</p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="mb-2">Certifications</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="outline">AWS Certified</Badge>
                      <Badge variant="outline">React Expert</Badge>
                      <Badge variant="outline">Scrum Master</Badge>
                    </div>
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full mt-6 bg-white"
                  onClick={() => onNavigate("dashboard")}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Analysis Report
                </Button>
              </Card>
            </div>

            {/* Skills Analysis */}
            <Card className="p-6 bg-white border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                  <Code className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-2xl">Skills Detected</h2>
                  <p className="text-gray-600">Technical and soft skills found in your resume</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span>React & JavaScript</span>
                    <span className="text-sm text-gray-600">Expert</span>
                  </div>
                  <Progress value={95} className="h-2" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span>Node.js & Backend Development</span>
                    <span className="text-sm text-gray-600">Advanced</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span>Cloud Services (AWS)</span>
                    <span className="text-sm text-gray-600">Intermediate</span>
                  </div>
                  <Progress value={70} className="h-2" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span>Leadership & Team Management</span>
                    <span className="text-sm text-gray-600">Advanced</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span>Agile Methodologies</span>
                    <span className="text-sm text-gray-600">Intermediate</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
              </div>
            </Card>

            {/* Recommendations */}
            <Card className="p-6 bg-white border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl">AI Recommendations</h2>
                  <p className="text-gray-600">Suggestions to improve your resume</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-4 p-4 bg-green-50 rounded-xl border border-green-100">
                  <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="mb-1">Strong Technical Skills</p>
                    <p className="text-sm text-gray-600">
                      Your technical skills are well-documented and relevant to current market demands.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-green-50 rounded-xl border border-green-100">
                  <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="mb-1">Clear Career Progression</p>
                    <p className="text-sm text-gray-600">
                      Your work history shows steady growth and increasing responsibilities.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-orange-50 rounded-xl border border-orange-100">
                  <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="mb-1">Add Quantifiable Achievements</p>
                    <p className="text-sm text-gray-600">
                      Include specific metrics and numbers to demonstrate your impact (e.g., "Reduced load time by 40%", "Managed team of 5 engineers").
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-orange-50 rounded-xl border border-orange-100">
                  <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="mb-1">Missing Skills: Docker, Kubernetes</p>
                    <p className="text-sm text-gray-600">
                      Consider adding containerization skills if you have experience. These are highly sought-after in senior engineering roles.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <TrendingUp className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="mb-1">Optimize for ATS Systems</p>
                    <p className="text-sm text-gray-600">
                      Your resume is 82% optimized for Applicant Tracking Systems. Add keywords from job descriptions to improve visibility.
                    </p>
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
                Start Mock Interview
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white"
                onClick={() => setIsUploaded(false)}
              >
                Upload New Resume
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
