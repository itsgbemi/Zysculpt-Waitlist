/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import WaitlistForm from './components/WaitlistForm';
import PrivacyPolicy from './components/PrivacyPolicy';
import About from './components/About';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Simple client-side routing
  if (currentPath === '/privacy-policy') {
    return <PrivacyPolicy />;
  }
  
  if (currentPath === '/about') {
    return <About />;
  }

  return <WaitlistForm />;
}
