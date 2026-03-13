import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Hero Section */}
      <div className="bg-[#CCFF00] text-black p-8 lg:p-16 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-64 opacity-20 pointer-events-none">
           <svg viewBox="0 0 1440 320" className="w-full h-full preserve-3d">
              <path fill="#ffffff" fillOpacity="1" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
           </svg>
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-black/70 font-semibold mb-8 hover:text-black transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Back to Waitlist
          </Link>
          <h1 className="text-5xl lg:text-7xl font-extrabold mb-6">About Zysculpt</h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto p-8 lg:p-16">
        <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
          <p>
            <strong>Finding a great job today is harder than it should be.</strong> You can have the skills, the motivation, the ambition and still feel stuck.
          </p>
          <p>
            <strong>Zysculpt was created to make this process easier.</strong>
          </p>
          
          <p>
            We’re building Zysculpt as your <strong>AI career copilot</strong> — designed to help you <strong>navigate the job search with more clarity, structure, and less manual work.</strong>
          </p>

          <p>
            Instead of spending hours rewriting documents, Zysculpt uses AI to help you <strong>quickly generate and tailor your resume and cover letters</strong> to different roles. It can also <strong>create professional resignation letters</strong> when you’re ready to move on to your next opportunity — saving you time on the parts of the process that are repetitive but necessary.
          </p>

          <p>
            Zysculpt also helps you prepare. You’ll be able to <strong>generate practice quizzes and interview preparation materials</strong>, helping you <strong>build confidence</strong> before important conversations.
          </p>

          <p>
            As you search for roles, Zysculpt provides <strong>job match insights</strong>, helping you understand how well a role aligns with your experience. It can also <strong>highlight skill gaps and suggest learning roadmaps</strong> so you know what to focus on to stay competitive.
          </p>

          <p>
            To keep everything organized, Zysculpt includes an <strong>application tracker</strong> and tools to <strong>optimize your professional profiles</strong>, helping you present the strongest version of yourself to recruiters.
          </p>

          <div className="mt-12 space-y-6">
            <p>
              <strong>We’re still building Zysculpt, and this is just the beginning.</strong>
            </p>
            <p>
              Our goal is simple: to help you <strong>spend less time managing the job search — and more time moving forward in your career.</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
