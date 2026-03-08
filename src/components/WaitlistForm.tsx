import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, Loader2 } from 'lucide-react';

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'duplicate'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, firstName, lastName }),
      });

      if (response.ok) {
        setStatus('success');
      } else if (response.status === 409) {
        setStatus('duplicate');
      } else {
        const data = await response.json().catch(() => ({}));
        console.error('Failed to join waitlist:', data.error);
        setStatus('idle');
        alert(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('idle');
      alert('Network error. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white font-sans">
      {/* Left Section - Form */}
      <div className="lg:w-[45%] flex items-center justify-center p-8 bg-white relative order-2 lg:order-1">
        {/* Top right corner decoration matching the image style if needed, but keeping it clean for now */}
        
        <div className="w-full max-w-md">
          {status === 'success' || status === 'duplicate' ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`border rounded-2xl p-8 text-center ${status === 'success' ? 'bg-green-50 border-green-100' : 'bg-blue-50 border-blue-100'}`}
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${status === 'success' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {status === 'success' ? "You're on the list!" : "You're already on our list!"}
              </h3>
              <p className="text-gray-600">
                {status === 'success' 
                  ? `Thanks for joining, ${firstName}. We'll notify you as soon as early access opens.`
                  : `Good news, ${firstName}! You've already secured your spot. We'll be in touch soon.`
                }
              </p>
              <button 
                onClick={() => setStatus('idle')}
                className="mt-6 text-[#99CC00] font-semibold hover:underline"
              >
                Register another email
              </button>
            </motion.div>
          ) : (
            <motion.form 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div>
                <h1 className="text-5xl font-crimson font-normal text-gray-900 tracking-tight mb-3">
                  Get hired, <span className="italic font-bold">faster</span>
                </h1>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Join the waitlist for <span className="font-bold">Zysculpt</span>, the AI career assistant that helps you become the candidate recruiters want.
                </p>
              </div>

              <div className="flex gap-4">
                <div className="w-1/2">
                  <label htmlFor="firstName" className="block text-sm font-bold text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#CCFF00] focus:ring-2 focus:ring-[#CCFF00]/50 outline-none transition-all"
                    placeholder="Alex"
                  />
                </div>
                <div className="w-1/2">
                  <label htmlFor="lastName" className="block text-sm font-bold text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#CCFF00] focus:ring-2 focus:ring-[#CCFF00]/50 outline-none transition-all"
                    placeholder="Chen"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#CCFF00] focus:ring-2 focus:ring-[#CCFF00]/50 outline-none transition-all"
                  placeholder="name@email.com"
                />
              </div>

              {/* Consent Checkbox */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="relative flex items-center">
                    <input 
                      type="checkbox" 
                      required 
                      id="human"
                      className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-300 bg-white transition-all checked:border-[#CCFF00] checked:bg-[#CCFF00] hover:border-[#CCFF00] hover:ring-2 hover:ring-[#CCFF00]/50 focus:outline-none focus:ring-2 focus:ring-[#CCFF00]/50 mt-0.5" 
                    />
                    <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-black opacity-0 peer-checked:opacity-100 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <label htmlFor="human" className="text-xs text-gray-600 select-none cursor-pointer leading-relaxed">
                    By submitting this form, you consent to receive marketing and product-related emails from Zysculpt, including waitlist updates, launch announcements, and special offers. You may withdraw your consent at any time by clicking the unsubscribe link in our emails. Your information will be handled in accordance with our <a href="/privacy-policy" className="underline font-bold hover:text-[#99CC00]">privacy policy</a>.
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-[#CCFF00] hover:bg-[#B2D900] text-black font-bold py-4 rounded-full text-lg transition-colors shadow-lg shadow-lime-500/20 flex items-center justify-center gap-2"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Join Waitlist'
                )}
              </button>

              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
                <a href="/about" className="text-gray-600 font-semibold text-sm hover:text-[#99CC00] hover:underline">
                  Learn more about Zysculpt
                </a>

              </div>
            </motion.form>
          )}
        </div>
      </div>

      {/* Right Section - Image */}
      <div className="lg:w-[55%] relative overflow-hidden min-h-[400px] lg:min-h-screen order-1 lg:order-2">
        <img 
          src="https://res.cloudinary.com/dqhawdcol/image/upload/v1772652870/epcarz1lri97pkfsjuc6.png" 
          alt="Zysculpt AI Career Assistant" 
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  );
}
