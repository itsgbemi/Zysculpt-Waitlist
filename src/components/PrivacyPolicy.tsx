import React from 'react';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white font-sans p-8 lg:p-16">
      <div className="max-w-3xl mx-auto">
        <a href="/" className="inline-flex items-center gap-2 text-[#99CC00] font-semibold mb-8 hover:underline">
          <ArrowLeft className="w-5 h-5" />
          Back to Waitlist
        </a>
        
        <h1 className="text-4xl font-extrabold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg text-gray-700">
          <p className="mb-6">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Introduction</h2>
          <p className="mb-4">
            Welcome to Zysculpt. We respect your privacy and are committed to protecting your personal data. 
            This privacy policy will inform you as to how we look after your personal data when you visit our website 
            and tell you about your privacy rights and how the law protects you.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Data We Collect</h2>
          <p className="mb-4">
            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
            <li><strong>Contact Data</strong> includes email address and telephone number.</li>
            <li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform and other technology on the devices you use to access this website.</li>
            <li><strong>Usage Data</strong> includes information about how you use our website, products and services.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. How We Use Your Data</h2>
          <p className="mb-4">
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
            <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
            <li>Where we need to comply with a legal or regulatory obligation.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Data Security</h2>
          <p className="mb-4">
            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Contact Us</h2>
          <p className="mb-4">
            If you have any questions about this privacy policy or our privacy practices, please contact us at: support@zysculpt.com
          </p>
        </div>
      </div>
    </div>
  );
}
